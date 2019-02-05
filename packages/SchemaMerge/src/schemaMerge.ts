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

mergeSchemas();

async function mergeSchemas() {
    let schemaPaths = glob.sync(program.args);
    if (schemaPaths.length == 0) {
        program.help();
    }
    else {
        let implementations: any = {};
        let definitions: any = {};
        for (let path of schemaPaths) {
            console.log(chalk.default.grey(`parsing: ${path}`));
            var schema = allof(await parser.dereference(path));
            var type = typeName(schema);
            delete schema.$schema;
            if (type) {
                findImplements(schema, implementations);
                // TODO: Check for compatibility?
                fixDefinitionReferences(schema);
                definitions[type] = schema;
            } else if (!schema.$defines) {
                // $defines will be found if included
                console.warn(chalk.default.yellowBright("WARNING: " + path + " does not have $type or $defines and so is not a component schema."));
            }
        }
        extractDefines(definitions);
        expandProviders(definitions, implementations);
        let finalSchema = {
            $schema: "http://json-schema.org/draft-07/schema#",
            oneOf: Object.keys(definitions)
                .filter((schemaName) => !definitions[schemaName].$defines)
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
        fs.writeFileSync(program.output, JSON.stringify(finalSchema, null, 4));
    }
}

function typeName(schema: any): string {
    return (schema.properties && schema.properties.$type)
        ? schema.properties.$type.const
        : undefined;
}

function findImplements(schema: any, definitions: any): void {
    walkSchema(schema, (val: any) => {
        let done: any = val.$implements;
        if (done) {
            for (let iname of val.$implements) {
                if (definitions.hasOwnProperty(iname)) {
                    definitions[iname].push(typeName(schema));
                } else {
                    definitions[iname] = [typeName(schema)];
                }
            }
        }
        return done;
    })
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
    let type = typeName(schema);
    walkSchema(schema, (val: any) => {
        if (val.$ref) {
            let ref: string = val.$ref;
            if (ref.startsWith("#/definitions/")) {
                val.$ref = "#/definitions/" + type + "/definitions" + ref.substr(ref.indexOf('/'));
            }
        }
        return false;
    });
}

// Expand provider definitions with implementations
function expandProviders(definitions: any, implementations: any): void {
    for (let type in implementations) {
        let provider = definitions[type];
        if (provider) {
            let providerDefinitions = implementations[type];
            for (let implementation of providerDefinitions) {
                provider.oneOf.push({ $ref: "#/definitions/" + implementation })
            }
        }
        // Ignore if no provider since that means no one actually uses type
    }
}

function extractDefines(definitions: any): void {
    walkSchema(definitions, (val) => {
        let done = val.properties;
        if (done) {
            walkSchema(val, (inner) => {
                let done = inner.$defines;
                if (done) {
                    if (!definitions.hasOwnProperty(inner.$defines)) {
                        definitions[inner.$defines] = { oneOf: inner.oneOf };
                    }
                    inner.$ref = "#/definitions/" + inner.$defines;
                    delete inner.oneOf;
                    delete inner.$schema;
                    delete inner.$defines;
                }
                return false;
            });
        }
        return false;
    });
}

interface IPackage {
    version: string;
    engines: { node: string };
}

