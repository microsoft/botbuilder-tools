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
const latestVersion = require('latest-version');

program
    .option('--prefix', 'Append [msbot] prefix to all messages')
    .on('option:prefix', () => process.env.PREFIX = 'prefix');

// tslint:disable-next-line:no-var-requires no-require-imports
const pkg: IPackage = require('../package.json');
// tslint:disable-next-line:no-var-requires no-require-imports
require('./utils');
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
    .description(`The msbot program makes it easy to manipulate .bot files for Microsoft Bot Framework tools.`);

program
    .command('list', 'list available conversations');

program
    .command('get', 'get a transcript file for a conversation');

program
    .command('delete', 'delete conversation');

(async () => {
    const latest = await latestVersion(pkg.name, { version: `>${pkg.version}` })
        .catch(() => pkg.version);
    if (semver.gt(latest, pkg.version)) {
        process.stderr.write(chalk.default.white(`\n     Update available `));
        process.stderr.write(chalk.default.grey(`${pkg.version}`));
        process.stderr.write(chalk.default.white(` -> `));
        process.stderr.write(chalk.default.greenBright(`${latest}\n`));
        process.stderr.write(chalk.default.white(`     Run `));
        process.stderr.write(chalk.default.blueBright(`npm i -g ${pkg.name} `));
        process.stderr.write(chalk.default.white(`to update.\n\n`));
    }

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
})();

interface IPackage {
    name: string;
    version: string;
    engines: { node: string };
}
