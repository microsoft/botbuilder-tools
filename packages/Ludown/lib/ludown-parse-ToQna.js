#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const program = require('commander');
const fParser = require('../lib/parser');
const chalk = require('chalk');
const retCode = require('../lib/enums/CLI-errors');
const cmdEnum = require('../lib/enums/parsecommands');
const utils = require('./utils');
program.Command.prototype.unknownOption = function () {
    process.stderr.write(chalk.default.redBright(`\n  Unknown arguments: ${process.argv.slice(2).join(' ')}\n`));
    program.help();
};
program
    .name("ludown parse ToQna")
    .description(`Convert .lu file(s) into QnA Maker JSON file`)
    .usage('--in <luFile> | --lu_folder <inputFolder> [-s]')
    .option('--in <luFile>', '.lu file to parse')
    .option('-l, --lu_folder <inputFolder>', '[Optional] Folder with .lu file(s). By default ludown will only look at the current folder. -s to include subfolders')
    .option('-o, --out_folder <outputFolder>', '[Optional] Output folder for all files the tool will generate')
    .option('-s, --subfolder', '[Optional] Include sub-folders as well when looking for .lu files')
    .option('-n, --qna_name <QnA_KB_Name>', '[Optional] QnA KB name')
    .option('-a, --write_qna_alterations', '[Optional] QnA Maker alterations')
    .option('--out <OutFileName>', '[Optional] Output file name for the LUIS model')
    .option('--verbose', '[Optional] Get verbose messages from parser')
    .parse(process.argv);
    
if (process.argv.length < 4) {
    program.help();
} else {
    if (!program.in && !program.lu_folder) {
        process.stderr.write(chalk.default.redBright(`\n  No .lu file or folder specified.\n`));
        program.help();
    }
    fParser.handleFile(program, cmdEnum.qna)
        .then(function () {
            process.exit(retCode.errorCode.SUCCESS);
        })
        .catch(function (err) {
            process.stderr.write(chalk.default.redBright(err.text + '\n'));
            process.stderr.write(chalk.default.redBright('Stopping further processing. \n'));
            process.exit(err.errCode);
        });
}
