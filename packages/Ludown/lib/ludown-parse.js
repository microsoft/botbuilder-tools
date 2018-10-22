#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
require('./utils');
const program = require('commander');
const chalk = require('chalk');
program.Command.prototype.unknownOption = function () {
    process.stderr.write(chalk.default.redBright(`\n  Unknown arguments: ${process.argv.slice(2).join(' ')}\n`));
    program.help();
};
program
    .name("ludown parse")
    .description(`Convert .lu file(s) into LUIS JSON, QnA Maker JSON files.`)
    .command('ToLuis', 'Convert .lu file(s) into LUIS JSON file.')
    .alias('toluis')
    .command('ToQna', 'Convert .lu file(s) into QnA Maker JSON files.')
    .alias('toqna')
    .parse(process.argv);
   
const commands = ['toluis', 'toqna']
if (!commands.includes(process.argv[2].toLowerCase())) {
    process.stderr.write(chalk.default.redBright(`\n  Unknown command: ${process.argv.slice(2).join(' ')}\n`));
    program.help();
}
