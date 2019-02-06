#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import * as chalk from 'chalk';
import * as program from 'commander';
import * as fs from 'fs';
import * as glob from 'globby';
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
    .description(`Take JSON Schema files and merge them into a single schema file where $ref are included and allOf are merged.  Also supports component merging using $defines, $implements and $type, see readme.md for more information.`)
    .parse(process.argv);

let failed = false;
mergeSchemas();

async function mergeSchemas() {
    let schemaPaths = glob.sync(program.args);
    if (schemaPaths.length == 0) {
        program.help();
    }
    else {
        let defines = new Set();
        let definitions: any = {};
        for (let path of schemaPaths) {
            console.log(chalk.default.grey(`parsing: ${path}`));
            var schema = allof(await parser.dereference(path));
            var filename = <string>path.split(/[\\\/]/).pop();
            var type = filename.substr(0, filename.lastIndexOf("."));
            delete schema.$schema;
            fixDefinitionReferences(schema);
            definitions[type] = schema;
        }
        findImplements(definitions, defines);
        expandTypes(definitions);
        addStandardProperties(definitions, defines);
        let finalSchema = {
            $schema: "http://json-schema.org/draft-07/schema#",
            oneOf: Object.keys(definitions)
                .filter((schemaName) => !defines.has(schemaName))
                .map(
                    // (schemaName) => definitions[schemaName]),
                    (schemaName) => {
                        let ref = { $ref: "#/definitions/" + schemaName };
                        return ref;
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

function findImplements(definitions: any, defines: Set<string>): void {
    for (let type in definitions) {
        walkSchema(definitions[type], (val: any) => {
            let done: any = val.$implements;
            if (done) {
                for (let iname of val.$implements) {
                    if (definitions.hasOwnProperty(iname)) {
                        let definition = definitions[iname];
                        let oneOf = definition.oneOf;
                        if (!oneOf) {
                            let constraints: any = {};
                            for (let prop in definition) {
                                if (prop != "title" && prop != "description" && prop != "$schema") {
                                    constraints[prop] = definition[prop];
                                    delete definition[prop];
                                }
                            }
                            oneOf = [constraints];
                            definition.oneOf = oneOf;
                        }
                        oneOf.push(type);
                        defines.add(iname);
                    } else {
                        missing(iname)
                    }
                }
            }
            return done;
        });
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

function fixDefinitionReferences(schema: any): void {
    walkSchema(schema, (val: any) => {
        if (val.$ref) {
            let ref: string = val.$ref;
            if (ref.startsWith("#/definitions/")) {
                val.$ref = "#/definitions/" + schema.$type + "/definitions" + ref.substr(ref.indexOf('/'));
            }
        }
        return false;
    });
}

function expandTypes(definitions: any): void {
    walkSchema(definitions, (val) => {
        if (val.properties) {
            walkSchema(val.properties, (val) => {
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
        return false;
    });
}

function addStandardProperties(definitions: any, defines: Set<string>): void {
    for (let type in definitions) {
        let definition = definitions[type];
        if (!defines.has(type)) {
            let props = definition.properties;
            if (!props) {
                props = {};
                definition.properties = props;
            }
            props.$type = { type: "string", const: type };
            props.$id = { type: "string" };
            props.$ref = { type: "string" };
            definition.additionalProperties = false;
            definition.patternProperties = { "^\\$": { type: "string" } };
            if (!definition.required) {
                definition.required = [];
            }
            if (!definition.required.includes("$type")) {
                definition.required.push("$type");
            }
        }
    }
}

let missingTypes = new Set();
function missing(type: string): void {
    if (!missingTypes.has(type)) {
        console.log(chalk.default.redBright("Missing " + type + " schema file from merge."));
        missingTypes.add(type);
        failed = true;
    }
}

interface IPackage {
    version: string;
    engines: { node: string };
}

