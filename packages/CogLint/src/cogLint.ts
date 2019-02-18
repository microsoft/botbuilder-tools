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
import * as indexer from './cogTracker';

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
    const tracker = new indexer.CogTracker();
    await tracker.addCogFiles(program.args);

    for(let cog of tracker.cogs) {
        if (cog.errors.length == 0) {
            logger(MsgKind.msg, `Processed ${cog}`);
        } else {
            logger(MsgKind.error, `Errors processing ${cog}`);
            for(let error of cog.errors) {
                logger(MsgKind.error, `  ${error.message}`);
            }
        }
    }

    for (let defs of tracker.multipleDefinitions()) {
        let def = (<indexer.Definition[]>defs)[0];
        logger(MsgKind.error, `Multiple definitions for ${def} ${def.usedByString()}`);
        for (let def of defs) {
            logger(MsgKind.error, `  ${def.pathString()}`);
        }
    }

    for (let def of tracker.missingDefinitions()) {
        logger(MsgKind.error, `Missing definition for ${def} ${def.usedByString()}`);
    }

    for (let def of tracker.missingTypes) {
        logger(MsgKind.error, `Missing $type for ${def}`);
    }

    for (let def of tracker.unusedIDs()) {
        logger(MsgKind.warning, `Unused id ${def}`);
    }

    for (let [type, definitions] of tracker.typeTo) {
        logger(MsgKind.msg, `Instances of ${type}`);
        for (let def of definitions) {
            logger(MsgKind.msg, `  ${def.locatorString()}`);
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

