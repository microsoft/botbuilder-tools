#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
import * as chalk from 'chalk';
import * as program from 'commander';
import * as process from 'process';
import * as semver from 'semver';

// tslint:disable-next-line:no-var-requires no-require-imports
const pkg: IPackage = require('../package.json');
const requiredVersion: string = pkg.engines.node;
if (!semver.satisfies(process.version, requiredVersion)) {
    console.error(`Required node version ${requiredVersion} not satisfied with current version ${process.version}.`);
    process.exit(1);
}

program.Command.prototype.unknownOption = function (): void {
    console.error(chalk.default.redBright(`Unknown arguments: ${process.argv.slice(2).join(' ')}`));
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
};

program
    .version(pkg.version, '-V, --Version')
    .description(`The msbot program makes it easy to manipulate .bot files for Microsoft Bot Framework tools.`);

program
    .command('init', 'create a new .bot file');

program
    .command('secret', 'set or clear the secret for a .bot file');

program
    .command('get', 'get a connected service');

program
    .command('list', 'list all connected services');

// program
//     .command('export', 'export all connected services');

// program
//     .command('clone', 'create a new .bot file based on another .bot file');

program
    .command('connect <service>', 'connect to a resource (Luis/Qna/Azure/...) used by the bot');

program
    .command('disconnect <service>', 'disconnect from a resource used by the bot');

const args: program.Command = program.parse(process.argv);

// args should be undefined is subcommand is executed
if (args) {
    const unknownArgs: string[] = process.argv.slice(2);
    console.error(chalk.default.redBright(`Unknown arguments: ${unknownArgs.join(' ')}`));
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
}

interface IPackage {
    version: string;
    engines: { node: string };
}
