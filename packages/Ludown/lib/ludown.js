#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const program = require('commander');
const chalk = require('chalk');
const pkg = require('../package.json');
const utils = require('./utils');
const semver = require('semver');
const getLatestVersion = require('latest-version');
getLatestVersion(pkg.name, { version: `>${pkg.version}` })
    .catch((error) => pkg.version)
    .then((latest) => {
        if (semver.gt(latest, pkg.version)) {
            process.stderr.write(chalk.default.white(`\n     Update available `));
            process.stderr.write(chalk.default.grey(`${pkg.version}`));
            process.stderr.write(chalk.default.white(` -> `));
            process.stderr.write(chalk.default.greenBright(`${latest}\n`));
            process.stderr.write(chalk.default.white(`     Run `));
            process.stderr.write(chalk.default.blueBright(`npm i -g ${pkg.name} `));
            process.stderr.write(chalk.default.white(`to update.\n`));
        }


        program
            .option('--prefix', 'Add [ludown] prefix to all messages')
            .on('option:prefix', () => process.env.PREFIX = 'prefix');
        program.Command.prototype.unknownOption = function () {
            process.stderr.write(chalk.default.redBright(`\n  Unknown arguments: ${process.argv.slice(2).join(' ')}\n`));
            program.help();
        };

        program
            .version(pkg.version, '-v, --Version')
            .description(`Ludown is a command line tool to bootstrap language understanding models from .lu files`)
            .command('parse', 'Convert .lu file(s) into LUIS JSON OR QnA Maker JSON files.')
            .alias('p')
            .command('refresh', 'Convert LUIS JSON and/ or QnAMaker JSON file into .lu file')
            .alias('d')
            .command('translate', 'Translate .lu files')
            .alias('t')
            .parse(process.argv);
        const commands = ['parse', 'p', 'refresh', 'd', 'translate', 't'];

        if (!commands.includes(process.argv[2].toLowerCase())) {
            process.stderr.write(chalk.default.redBright(`\n  Unknown command: ${process.argv.slice(2).join(' ')}\n`));
            program.help();
        }
    });

