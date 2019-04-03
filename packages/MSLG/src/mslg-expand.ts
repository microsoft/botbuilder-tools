#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import * as chalk from 'chalk';
import * as program from 'commander';
import { Expander } from './Expander';

program.Command.prototype.unknownOption = function () {
    process.stderr.write(chalk.default.redBright(`\n  Unknown arguments: ${process.argv.slice(2).join(' ')}\n`));
    program.help();
};

program
    .name("mslg expand")
    .description(`Expand one or all templates found in a .lg file.`)
    .usage('--in <.lg file name> -t <templateName> [-e <inlineExpression>] [-j <testInputJSONFile>] [-i] [--all]')
    .option('--in <lgFile>', 'lg file to expand')
    .option('-t, --template <templateName>', 'Name of the template to expand. Template names with spaces must be enclosed in quotes.')
    .option('-e, --inline <expression>', '[Optional] Inline expression provided as a string to evaluate.')
    .option('--all', '[Optional] Flag option to request that all templates in the .lg file be expanded.')
    .option('-i, --interactive', '[Optional] Flag option to request that all missing entity value references be obtained through interactive prompts.')
    .option('-j, --testInput <testInputJSONFile>', '[Optional] full or relative path to a JSON file containing test input for all variable references.')
    .option('-o, --out_folder <outputFolder>', '[Optional] Output folder for all files the tool will generate')
    .parse(process.argv);
   
if (process.argv.length < 3) {
    program.help();
} else {
    let expander: any = new Expander();
    expander.Expand(program);
}