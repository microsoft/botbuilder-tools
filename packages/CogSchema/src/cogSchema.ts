#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import * as Validator from 'ajv';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as fs from 'fs-extra';
import * as glob from 'globby';
import * as path from 'path';
import * as process from 'process';
import * as semver from 'semver';
let parser: any = require('json-schema-ref-parser');
let allof: any = require('json-schema-merge-allof');

// tslint:disable-next-line:no-let-requires no-require-imports
const pkg: IPackage = require('../package.json');
const requiredVersion: string = pkg.engines.node;
if (!semver.satisfies(process.version, requiredVersion)) {
    console.error(`Required node version ${requiredVersion} not satisfied with current version ${process.version}.`);
    process.exit(1);
}

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    program.outputHelp((str: string) => {
        console.error(chalk.default.redBright(str));
        return '';
    });
    process.exit(1);
};

program
    .version(pkg.version, '-v, --Version')
    .usage("[options] <fileRegex ...>")
    .option("-o, output <path>", "Output path and filename for unified schema.")
    .description(`Take JSON Schema files and merge them into a single schema file where $ref are included and allOf are merged.  Also supports component merging using $implements and oneOf, see readme.md for more information.`)
    .parse(process.argv);

let failed = false;
mergeSchemas();

async function mergeSchemas() {
    let schemaPaths = glob.sync(program.args);
    if (schemaPaths.length == 0) {
        program.help();
    }
    else {
        let definitions: any = {};
        let validator = new Validator();
        var metaSchema = await fs.readJSON(path.join(__dirname, "../src/cogSchema.schema"));
        validator.addSchema(metaSchema, 'cogSchema');
        for (let path of schemaPaths) {
            console.log(chalk.default.grey(`Parsing ${path}`));
            try {
                var schema = allof(await parser.dereference(path));
                delete schema.$schema;
                if (!validator.validate('cogSchema', schema)) {
                    for (let error of <Validator.ErrorObject[]>validator.errors) {
                        schemaError(error);
                    }
                }
                var filename = <string>path.split(/[\\\/]/).pop();
                var type = filename.substr(0, filename.lastIndexOf("."));
                if (!schema.type && !isUnionType(schema)) {
                    schema.type = "object";
                }
                definitions[type] = schema;
            } catch (e) {
                thrownError(e);
            }
        }
        fixDefinitionReferences(schema);
        findImplements(definitions);
        addTypeTitles(definitions);
        expandTypes(definitions);
        addStandardProperties(definitions, metaSchema);
        let finalSchema = {
            $schema: "http://json-schema.org/draft-07/schema#",
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
            definitions: definitions
        };
        if (!program.output) {
            program.output = "app.schema";
        }
        if (!failed) {
            console.log("Writing " + program.output);
            fs.writeFileSync(program.output, JSON.stringify(finalSchema, null, 4));
        } else {
            console.log("Could not merge schemas");
        }
    }
}

function findImplements(definitions: any): void {
    for (let type in definitions) {
        walkSchema(definitions[type], (val: any) => {
            let done: any = val.$implements;
            if (done) {
                for (let unionName of val.$implements) {
                    if (definitions.hasOwnProperty(unionName)) {
                        let unionType = definitions[unionName];
                        if (!isUnionType(unionType)) {
                            badUnion(type, unionName);
                        } else {
                            if (!unionType.oneOf) {
                                unionType.oneOf = [];
                            }
                            unionType.oneOf.push({
                                // NOTE: This overrides any existing title to prevent namespace collisions
                                title: type,
                                description: definitions[type].description || type,
                                $ref: "#/definitions/" + type
                            });
                        }
                    } else {
                        missing(unionName)
                    }
                }
            }
            return done;
        });
    }
}

function addTypeTitles(definitions: any): void {
    walkSchema(definitions, (val) => {
        if (val.oneOf) {
            walkSchema(val.oneOf, (def) => {
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
        walkSchema(definitions[type], (val: any) => {
            if (val.$ref) {
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
    walkSchema(definitions, (val) => {
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

function addStandardProperties(definitions: any, cogSchema: any): void {
    for (let type in definitions) {
        let definition = definitions[type];
        if (!isUnionType(definition)) {
            // Reorder properties to put $ first.
            let props: any = {
                $type: cogSchema.definitions.type,
                $copy: cogSchema.definitions.copy,
                $id: cogSchema.definitions.id,
                $role: cogSchema.definitions.role
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
            if (definition.required) {
                let required = definition.required;
                definition.required = ["$type"];
                definition.anyOf = [
                    {
                        title: "Reference",
                        required: ["$ref"]
                    },
                    {
                        title: "Type",
                        required: required
                    }
                ];
            } else {
                definition.required = ["$type"];
            }
        }
    }
}

function walkSchema(schema: any, fun: (val: any, obj?: any, key?: string) => boolean, obj?: any, key?: any): boolean {
    let done = fun(schema, obj, key);
    if (!done) {
        if (Array.isArray(schema)) {
            for (let val of schema) {
                done = walkSchema(val, fun);
                if (done) break;
            }
        }
        else if (typeof schema === 'object') {
            for (let val in schema) {
                done = walkSchema(schema[val], fun, schema, val);
                if (done) break;
            }
        }
    }
    return done;
}

function isUnionType(schema: any): boolean {
    return schema.$role === "unionType";
}

let missingTypes = new Set();
function missing(type: string): void {
    if (!missingTypes.has(type)) {
        console.log(chalk.default.redBright("Missing " + type + " schema file from merge."));
        missingTypes.add(type);
        failed = true;
    }
}

function badUnion(type: string, union: string): void {
    console.log(chalk.default.redBright(type + " $implements " + union + " which does not use oneOf."));
    failed = true;
}

function schemaError(error: Validator.ErrorObject): void {
    console.log(chalk.default.redBright(error.message || ""));
    failed = true;
}

function thrownError(error: Error): void {
    console.log(chalk.default.redBright(error.message || ""));
    failed = true;
}

interface IPackage {
    version: string;
    engines: { node: string };
}

