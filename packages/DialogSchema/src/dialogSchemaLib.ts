#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import * as chalk from 'chalk';
import * as fs from 'fs-extra';
import glob from 'globby';
import * as os from 'os';
import * as ppath from 'path';
import * as semver from 'semver';
import * as xp from 'xml2js';
import * as Validator from 'ajv';

let allof: any = require('json-schema-merge-allof');
let clone = require('clone');
let parser: any = require('json-schema-ref-parser');

let util: any = require('util');
let exec: any = util.promisify(require('child_process').exec);

const jsonOptions = { spaces: 4, EOL: os.EOL };

let failed = false;
let missingTypes = new Set();

let progress = (msg: string) => console.log(chalk.default.grey(msg));
let warning = (msg: string) => console.log(chalk.default.yellowBright(msg));
let result = (msg: string) => console.log(msg);

/** Merge together .schema files to make a custom schema.
 * @param patterns Glob patterns for the .schema files to combine.
 * @param output The output file to create.  app.schema by default.
 * @param branch Branch to use for where to find component.schema.
 * @param update True to update .schema files to point to branch component.schema files.
 */
export async function mergeSchemas(patterns: string[], output?: string, branch?: string, update?: boolean): Promise<boolean> {
    failed = false;
    missingTypes = new Set();
    try {
        let schemaPaths = [];
        if (update) {
            if (!branch) {
                warning(`Must specify -branch <branch> in order to use -update`);
                return false;
            }
            await updateMetaSchema(branch);
            progress(`Updating component.schema references to branch ${branch}`)
        }

        for await (const path of expandPackages(await glob(patterns), progress)) {
            schemaPaths.push(path);
        }
        if (schemaPaths.length == 0) {
            return false;
        } else {
            let metaSchema: any;
            let definitions: any = {};
            let validator = new Validator();

            if (fs.pathExistsSync("component.schema")) {
                // Use a local component.schema file if present in the assumption it will be checked into branch
                metaSchema = await fs.readJSON("component.schema");
            } else if (!metaSchema && branch) {
                // Find branch specific schema
                let path = `https://raw.githubusercontent.com/Microsoft/botbuilder-dotnet/${branch}/schemas/component.schema`;
                metaSchema = await fs.readJSON(path);
            }

            if (metaSchema) {
                validator.addSchema(metaSchema, 'componentSchema');
            }

            for (let schemaPath of schemaPaths) {
                progress(`Parsing ${schemaPath}`);
                if (update) {
                    let schema = await fs.readJSON(schemaPath);
                    if (!schema.$id) {
                        schema.$schema = schema.$schema.replace(/botbuilder-dotnet\/[^/]*\//, `botbuilder-dotnet/${branch}/`);
                        await fs.writeJSON(schemaPath, schema, jsonOptions);
                    }
                }
                let noref = await parser.dereference(schemaPath);
                if (noref.$id) {
                    warning(`  Skipping because of top-level $id:${noref.$id}.`);
                } else {
                    let schema = allof(noref);
                    // Pick up meta-schema from first .dialog file
                    if (!metaSchema) {
                        metaSchema = JSON.parse(await getURL(schema.$schema));
                        validator.addSchema(metaSchema, 'componentSchema');
                        progress(`  Using component.schema ${metaSchema.$id}`);
                    } else if (schema.$schema != metaSchema.$id) {
                        warning(`  ${schema.$schema} does not match component.schema ${metaSchema.$id}`);
                    }
                    delete schema.$schema;
                    if (!validator.validate('componentSchema', schema)) {
                        for (let error of <Validator.ErrorObject[]>validator.errors) {
                            schemaError(error);
                        }
                    }
                    let filename = <string>schemaPath.split(/[\\\/]/).pop();
                    let type = filename.substr(0, filename.lastIndexOf("."));
                    if (!schema.type && !isUnionType(schema)) {
                        schema.type = "object";
                    }
                    definitions[type] = schema;
                }
            }
            fixDefinitionReferences(definitions);
            processRoles(definitions, metaSchema);
            addTypeTitles(definitions);
            expandTypes(definitions);
            addStandardProperties(definitions, metaSchema);
            sortUnions(definitions);
            if (!output) {
                output = "app.schema";
            }
            let finalDefinitions: any = {};
            for (let key of Object.keys(definitions).sort()) {
                finalDefinitions[key] = definitions[key];
            }
            let finalSchema = {
                $schema: metaSchema.$id,
                $id: ppath.basename(output),
                type: "object",
                title: "Component types",
                description: "These are all of the types that can be created by the loader.",
                oneOf: Object.keys(definitions)
                    .filter((schemaName) => !isUnionType(definitions[schemaName]))
                    .sort()
                    .map((schemaName) => {
                        return {
                            title: schemaName,
                            description: definitions[schemaName].description || "",
                            $ref: "#/definitions/" + schemaName
                        };
                    }),
                definitions: finalDefinitions
            };

            if (!failed) {
                result(`Writing ${output}`);
                await fs.writeJSON(output, finalSchema, jsonOptions);
                console.log("");
            } else {
                console.log(chalk.default.redBright("Could not merge schemas"));
            }
        }
    }
    catch (e) {
        thrownError(e);
    }
    return true;
}

/** Expand package.json, package.config or *.csproj to look for .schema below referenced packages. */
async function* expandPackages(paths: string[], progress: (msg: string) => void): AsyncIterable<string> {
    for (let path of paths) {
        if (path.endsWith(".schema")) {
            yield prettyPath(path);
        } else {
            let references: string[] = [];
            let name = ppath.basename(path);
            progress(`Following ${path}`);
            if (name.endsWith(".csproj")) {
                references.push(ppath.join(ppath.dirname(path), "/**/*.schema"));
                let json = await xmlToJSON(path);
                let packages = await findGlobalNuget();
                if (packages) {
                    walkJSON(json, (elt) => {
                        let done = false;
                        if (elt.PackageReference) {
                            for (let pkgRef of elt.PackageReference) {
                                let pkg = pkgRef.$;
                                let pkgName = pkg.Include;
                                let pkgPath = ppath.join(packages, pkgName);
                                let versions: string[] = [];
                                for (let version of fs.readdirSync(pkgPath)) {
                                    versions.push(version.toLowerCase());
                                }
                                let baseVersion = pkg.Version || "0.0.0";
                                let version = semver.minSatisfying(versions, `>=${baseVersion.toLowerCase()}`);
                                references.push(ppath.join(packages, pkgName, version, "/**/*.schema"));
                            }
                            done = true;
                        }
                        return done;
                    });
                }
            } else if (name === "packages.config") {
                let json = await xmlToJSON(path);
                let packages = await findParentDirectory(ppath.dirname(path), "packages");
                if (packages) {
                    walkJSON(json, (elt) => {
                        let done = false;
                        if (elt.package) {
                            for (let info of elt.package) {
                                let id = `${info.$.id}.${info.$.version}`;
                                references.push(ppath.join(packages, `${id}/**/*.schema`));
                            }
                            done = true;
                        }
                        return done;
                    });
                }
            } else if (name === "package.json") {
                let json = await fs.readJSON(path);
                for (let pkg in json.dependencies) {
                    references.push(ppath.join(ppath.dirname(path), `node_modules/${pkg}/**/*.schema`));
                }
            } else {
                throw new Error(`Unknown package type ${path}`);
            }
            for (let ref of references) {
                for (let expandedRef of await glob(ref)) {
                    yield prettyPath(expandedRef);
                }
            }
        }
    }
    return [];
}

function prettyPath(path: string): string {
    var newPath = ppath.relative(process.cwd(), path);
    if (newPath.startsWith('..')) {
        newPath = path;
    }
    return newPath;
}

async function findGlobalNuget(): Promise<string> {
    let result = "";
    try {
        const { stdout } = await exec(`dotnet nuget locals global-packages --list`);
        const name = "global-packages:";
        let start = stdout.indexOf(name);
        if (start > -1) {
            result = stdout.substring(start + name.length).trim();
        }
    } catch (err) {
        warning(`Cannot find global nuget packages so skipping .csproj\n{err}`);
    }
    return result;
}

async function xmlToJSON(path: string): Promise<string> {
    let xml = (await fs.readFile(path)).toString();
    return new Promise((resolve, reject) =>
        xp.parseString(xml, (err: Error, result: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        }));
}

async function findParentDirectory(path: string, dir: string): Promise<string> {
    path = ppath.resolve(path);
    let result = "";
    if (path) {
        result = ppath.join(path, dir);
        if (!await fs.pathExists(result)) {
            result = await findParentDirectory(ppath.dirname(path), dir);
        }
    }
    return result;
}

// Update component.schema to a specific branch version
async function updateMetaSchema(branch: string): Promise<void> {
    if (fs.existsSync("baseComponent.schema")) {
        console.log(`Generating component.schema for branch ${branch}`);
        let schema = await fs.readJSON("baseComponent.schema");
        let metaSchemaName = schema.$schema;
        let metaSchemaDef = await getURL(metaSchemaName);
        let metaSchema = JSON.parse(metaSchemaDef);
        for (let prop in schema) {
            let propDef = schema[prop];
            if (typeof propDef === "string") {
                metaSchema[prop] = propDef;
            } else {
                for (let subProp in propDef) {
                    metaSchema[prop][subProp] = propDef[subProp];
                }
            }
        }
        metaSchema.$id = metaSchema.$id.replace("{branch}", branch);
        metaSchema.$comment = `File generated by: "dialogSchema -u -b ${branch}.`;
        await fs.writeJSON("component.schema", metaSchema, jsonOptions);
    }
}

function processRoles(definitions: any, metaSchema: any): void {
    for (let type in definitions) {
        walkJSON(definitions[type], (val: any, _obj, key) => {
            if (val.$role) {
                if (typeof val.$role === "string") {
                    processRole(val.$role, val, type, definitions, metaSchema, key);
                } else {
                    for (let role of val.$role) {
                        processRole(role, val, type, definitions, metaSchema, key);
                    }
                }
            }
            return false;
        });
    }
}

function processRole(role: string, elt: any, type: string, definitions: any, metaSchema: any, key?: string): void {
    const prefix = "unionType(";
    if (role === "expression" || role === "lg" || role === "memoryPath") {
        if (elt.type) {
            errorMsg(type, `$role ${role} must not have a type.`);
        }
        for (let prop in metaSchema.definitions[role]) {
            if (!elt[prop]) {
                elt[prop] = metaSchema.definitions[role][prop];
            }
        }
    } else if (role === "unionType") {
        if (key) {
            errorMsg(type, "unionType $role can only be defined at the top of the schema definition.");
        }
    } else if (role.startsWith(prefix) && role.endsWith(")")) {
        let unionType = role.substring(prefix.length, role.length - 1);
        if (!definitions[unionType]) {
            errorMsg(type, `union type ${unionType} is not defined.`);
        } else if (!isUnionType(definitions[unionType])) {
            errorMsg(unionType, `is missing $role of unionType.`);
        } else {
            let definition = definitions[type];
            let unionDefinition = definitions[unionType];
            if (!unionDefinition.oneOf) {
                unionDefinition.oneOf = [];
            }
            unionDefinition.oneOf.push({
                title: type,
                description: definition.description || "",
                $ref: `#/definitions/${type}`
            });
        }
    } else {
        errorMsg(type, "Unknown $role");
    }
}

function addTypeTitles(definitions: any): void {
    walkJSON(definitions, (val) => {
        if (val.oneOf) {
            walkJSON(val.oneOf, (def) => {
                if (def.type) {
                    // NOTE: This overrides any existing title but prevents namespace collision
                    def.title = def.type;
                }
                return false;
            });
        }
        return false;
    });
}

function fixDefinitionReferences(definitions: any): void {
    for (let type in definitions) {
        walkJSON(definitions[type], (val: any) => {
            if (val.$ref && typeof val.$ref === "string") {
                let ref: string = val.$ref;
                if (ref.startsWith("#/definitions/")) {
                    val.$ref = "#/definitions/" + type + "/definitions" + ref.substr(ref.indexOf('/'));
                }
            }
            return false;
        });
    }
}

function expandTypes(definitions: any): void {
    walkJSON(definitions, (val) => {
        if (val.$type) {
            if (definitions.hasOwnProperty(val.$type)) {
                val.$ref = "#/definitions/" + val.$type;
            } else {
                missing(val.$type);
            }
        }
        return false;
    });
}

function addStandardProperties(definitions: any, dialogSchema: any): void {
    for (let type in definitions) {
        let definition = definitions[type];
        if (!isUnionType(definition)) {
            // Reorder properties to put $ first.
            let props: any = {
                $type: clone(dialogSchema.definitions.type),
                $copy: dialogSchema.definitions.copy,
                $id: dialogSchema.definitions.id,
                $designer: dialogSchema.definitions.designer
            };
            props.$type.const = type;
            if (definition.properties) {
                for (let prop in definition.properties) {
                    props[prop] = definition.properties[prop];
                }
            }
            definition.properties = props;
            definition.additionalProperties = false;
            definition.patternProperties = { "^\\$": { type: "string" } };
            let required = definition.required;
            if (required) {
                required.push("$type");
            } else {
                required = ["$type"];
            }
            delete definition.required;
            definition.anyOf = [
                {
                    title: "Reference",
                    required: ["$copy"]
                },
                {
                    title: "Type",
                    required: required
                }
            ];
        }
    }
}

function sortUnions(definitions: any): void {
    for (let key in definitions) {
        let definition = definitions[key];
        if (isUnionType(definition) && definition.oneOf) {
            definition.oneOf = definition.oneOf.sort((a: any, b: any) => a.title.localeCompare(b.title));
        }
    }
}

function walkJSON(elt: any, fun: (val: any, obj?: any, key?: string) => boolean, obj?: any, key?: any): boolean {
    let done = fun(elt, obj, key);
    if (!done) {
        if (Array.isArray(elt)) {
            for (let val of elt) {
                done = walkJSON(val, fun);
                if (done) break;
            }
        }
        else if (typeof elt === 'object') {
            for (let val in elt) {
                done = walkJSON(elt[val], fun, elt, val);
                if (done) break;
            }
        }
    }
    return done;
}

async function getURL(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const http = require('http'),
            https = require('https');

        let client = http;

        if (url.toString().indexOf("https") === 0) {
            client = https;
        }

        client.get(url, (resp: any) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk: any) => {
                data += chunk;
            });

            // The whole response has been received. 
            resp.on('end', () => {
                resolve(data);
            });

        }).on("error", (err: any) => {
            reject(err);
        });
    });
};

function isUnionType(schema: any): boolean {
    return schema.$role === "unionType";
}

function missing(type: string): void {
    if (!missingTypes.has(type)) {
        console.log(chalk.default.redBright("Missing " + type + " schema file from merge."));
        missingTypes.add(type);
        failed = true;
    }
}

function schemaError(error: Validator.ErrorObject): void {
    console.log(chalk.default.redBright(`  ${error.dataPath} ${error.message}`));
    failed = true;
}

function thrownError(error: Error): void {
    console.log(chalk.default.redBright("  " + error.message));
    failed = true;
}

function errorMsg(type: string, message: string): void {
    console.log(chalk.default.redBright(`${type}: ${message}`));
    failed = true;
}


