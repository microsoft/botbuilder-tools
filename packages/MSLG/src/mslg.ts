#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import * as chalk from 'chalk';
import * as program from 'commander';

const pkg: IPackage = require('../package.json');

program.Command.prototype.unknownOption = function () {
    process.stderr.write(chalk.default.redBright(`\n  Unknown arguments: ${process.argv.slice(2).join(' ')}\n`));
    program.help();
};

program
    .version(pkg.version, '-v, --Version')
    .usage('mslg [commander] [options]')
    .description('MSLG is a command tool to take .lg files as input to parse lg files or collate and expand lg templates.')
    .option('-g, --get', '1', null)
    .command('parse', 'Parse any provided .lg file and collate all .lg files into a single file.')
    .alias('p')
    .command('expand', 'Expand one or all templates found in a .lg file.')
    .alias('e')
    .parse(process.argv);

const commands = ['parse', 'p', 'expand', 'e'];

if (!commands.includes(process.argv[2].toLowerCase())) {
    process.stderr.write(chalk.default.redBright(`\n  Unknown command: ${process.argv.slice(2).join(' ')}\n`));
    program.help();
}

if (program.get) {
    console.log(program.get)
}

interface IPackage {
    version: string;
}