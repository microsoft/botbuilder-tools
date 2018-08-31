/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
import * as chalk from 'chalk';
import * as program from 'commander';

program.Command.prototype.unknownOption = (): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${process.argv.slice(2).join(' ')}`));
    program.help();
};

program
    .name('msbot clone')
    .option('-bot, -b', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .description('allows you to clone a bot with a new configuration')
    .action((cmd: program.Command, actions: program.Command) => undefined);
program.parse(process.argv);

console.error('not implemented yet');
