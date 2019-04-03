#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import * as chalk from 'chalk';
import * as program from 'commander';
import { Parser } from './Parser';

program.Command.prototype.unknownOption = function () {
    process.stderr.write(chalk.default.redBright(`\n  Unknown arguments: ${process.argv.slice(2).join(' ')}\n`));
    program.help();
};

program
    .name("mslg parse")
    .description(`Parse any provided .lg file and collate all .lg files into a single file.`)
    .usage('--in <.lg file> | --lg_folder <inputFolder> [-s] [-o <outputFolder>] [--out <outputFileName>] [--verbose]')
    .option('--in <lgFile>', '.lg file to parse')
    .option('-l, --lg_folder <inputFolder>', '[Optional] Folder that has the .lg file. By default mslg will only look at the current folder. To look at all subfolders, include -s')
    .option('-s, --subfolder', '[Optional] Include sub-folders as well when looking for .lg files')
    .option('--out <outputFileName>','[Optional] Output .lg file name.')
    .option('-o, --out_folder <outputFolder>', '[Optional] Output folder for all files the tool will generate')
    .option('--stdin', '[Optional] Read .lg file as stream from stdin to validate and collate')
    .option('--stdout', '[Optional] when set, write out the final file to stdout')
    .option('--verbose', '[Optional] Flag option used to request verbose output. With this option set, additional useful parse, validate and collate logs are written to stdout')
    .option('-c, --collate', '[Optional] Collate and merge same templates across the .lg files into a single .lg file. If not set, same template name defintions across .lg files will throw exceptions.')
    .parse(process.argv);
   
if (process.argv.length < 3) {
    program.help();
} else {
    let parser: any = new Parser();
    parser.Parser(program);
}