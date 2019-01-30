#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import * as chalk from 'chalk';
import * as program from 'commander';
import * as process from 'process';
import * as semver from 'semver';
import * as  glob from 'globby';
import * as fs from 'fs';
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
        console.error(str);
        return '';
    });
    process.exit(1);
};

program
    .version(pkg.version, '-v, --Version')
    .usage("[options] <fileRegex ...>")
    .option("-o, output <path>", "Output path for where to put unified schemas.")
    .description(`Take JSON Schema files that match a regex and merge into a single .schema file after following all $ref and allof.`)
    .parse(process.argv);

mergeSchemas();

// Read schema files, follow $ref and remove allOf
async function mergeSchemas() {
    let schemaPaths = glob.sync(program.args);
    let schemas: any = {};
    let implementations: any = {};
    let definitions: any = {};
    for (let path of schemaPaths) {
        var schema = allof(await parser.dereference(path));
        schemas[typeName(schema)] = schema;
        findImplements(schema, implementations);
        findDefintions(schema, definitions);
    }
    let finalSchema = { schemas: schemas };
    fs.writeFileSync("c:/tmp/all.schema", JSON.stringify(finalSchema, null, 4));
}

// Desired structure
// Definitions
// <each top-level definition from a file>
// <each implements with $ref to defintions>
// <union of all types>
// type:object
// $ref to all type

function typeName(schema: any) {
    return schema.properties.$type.const;
}

function findImplements(schema: any, implementations: any) {
    for (let name in schema) {
        let val = schema[name];
        if (name === "$implements") {
            for (let iname of val) {
                if (implementations.hasOwnProperty(iname)) {
                    implementations[iname].push(typeName(schema));
                } else {
                    implementations[iname] = [typeName(schema)];
                }
            }
        }
        else if (typeof val === 'object') {
            findImplements(val, implementations);
        }
    }
}

function findSection(schema: any, key: string): any {
    let section = null;
    if (Array.isArray(schema)) {
        for (let val of schema)
        {
            section = findSection(val, key);
            if (section != null)
        }
        for (let name in schema) {
            let val = schema[name];
            if (name === key) {
                return val;
            }
            else if (typeof val === 'object') {
                findSection(val, key);
            }
        }
    } else if (typeof val === '')
}

interface IPackage {
    version: string;
    engines: { node: string };
}

