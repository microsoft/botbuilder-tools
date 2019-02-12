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
import * as indexer from './cogIndex';

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
    .description(`Take JSON .cog files created for Bot Framework and index $id, $type and $ref to identify errors. See  readme.md for more information.`)
    .parse(process.argv);

doIndexing();

async function doIndexing() {
    const refs = await indexer.index(program.args,
        (file) => logger(MsgKind.msg, `Parsing ${file}`),
        (error) => {
            logger(MsgKind.error, error.message);
            return true;
        });
    let index = refs.result;

    for (let defs of index.multipleDefinitions()) {
        let def = (<indexer.Definition[]>defs)[0];
        console.log("");
        logger(MsgKind.error, `Multiple definitions for ${def.id} ${def.usedByString()}`);
        for (let def of defs) {
            logger(MsgKind.error, `  ${def.toString()}`);
        }
    }

    console.log("");
    for (let def of index.missingDefinitions()) {
        logger(MsgKind.error, `Missing definition for ${def.toString()} ${def.usedByString()}`);
    }

    console.log("");
    for (let def of index.missingTypes) {
        logger(MsgKind.error, `Missing $type for ${def.toString()}`);
    }

    console.log("");
    for (let [type, definitions] of index.typeTo) {
        logger(MsgKind.msg, `Instances of ${type}`);
        for (let def of definitions) {
            logger(MsgKind.msg, `  ${def.toString()}`);
        }
    }
}

export const enum MsgKind {
    msg,
    warning,
    error
}

function logger(kind: MsgKind, msg: string): void {
    switch (kind) {
        case MsgKind.error: console.log(chalk.default.redBright(msg)); break;
        case MsgKind.msg: console.log(chalk.default.gray(msg)); break;
        case MsgKind.warning: console.log(chalk.default.yellowBright(msg)); break;
    }
}

interface IPackage {
    version: string;
    engines: { node: string };
}

