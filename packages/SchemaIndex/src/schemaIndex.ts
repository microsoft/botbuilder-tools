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
import * as indexer from './index';

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
    .description(`Take JSON files created for Bot Framework and index their id's and references to ensure they are consistent.  See  readme.md for more information.`)
    .parse(process.argv);

doIndexing();

async function doIndexing() {
    const refs = await indexer.index(program.args, logger);
    if (refs.success) {
        let index = refs.result;
        for (let def of index.missingDefinitions()) {
            logger(indexer.MsgKind.error, `Missing definition for ${def.toString()} used by`);
            for (let used of def.usedBy) {
                logger(indexer.MsgKind.error, `  ${used.locator()}`);
            }
        }
        for (let def of index.missingTypes()) {
            logger(indexer.MsgKind.error, `Missing type for ${def.toString()}`);
        }
        for (let [type, definitions] of index.typeTo) {
            logger(indexer.MsgKind.msg, `${type}`);
            for(let def of definitions) {
                logger(indexer.MsgKind.msg, `  ${def.toString()}`);
            }
        }
    }
}

function logger(kind: indexer.MsgKind, msg: string): void {
    switch (kind) {
        case indexer.MsgKind.error: console.log(chalk.default.redBright(msg)); break;
        case indexer.MsgKind.msg: console.log(chalk.default.gray(msg)); break;
        case indexer.MsgKind.warning: console.log(chalk.default.yellowBright(msg)); break;
    }
}

interface IPackage {
    version: string;
    engines: { node: string };
}

