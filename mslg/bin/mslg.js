#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const program = require('commander');
const chalk = require('chalk');
const pjson = require('../package.json');
program.Command.prototype.unknownOption = function (flag) {
    process.stderr.write(chalk.default.redBright(`\n  Unknown arguments: ${process.argv.slice(2).join(' ')}\n`));
    program.help();
};
program
    .version(pjson.version, '-v, --Version')
    .description(`MSLG is a command line tool to bootstrap language generation models from .lg files`)
    .command('parse', 'Parse and collates .lg file(s) into a single .lg application.')
    .alias('p')
    .command('create', 'Create a new LG application')
    .alias('c')
    .command('import', 'Import collated .lg file into an LG application')
    .alias('i')
    .command('train', 'Train the LG model')
    .alias('t')
    .command('publish', 'Publish the LG application')
    .alias('u')
    .command('query', 'Query an LG application for results')
    .alias('q')
    .command('translate', 'Translate .lg file(s). Uses the Microsoft translator text API. ')
    .alias('r')
    .parse(process.argv);
    const commands = ['parse', 'p', 'create', 'c', 'import', 'i', 'train', 't', 'publish', 'u', 'query', 'q', 'translate', 'r'];
    if (!commands.includes(process.argv[2].toLowerCase())) {
        process.stderr.write(chalk.default.redBright(`\n  Unknown command: ${process.argv.slice(2).join(' ')}\n`));
        program.help();
    }
