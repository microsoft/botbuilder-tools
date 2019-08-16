#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
require('./utils');
const program = require('commander');
const chalk = require('chalk');
const toLU = require('../lib/toLU');
const retCode = require('../lib/enums/CLI-errors');
program.Command.prototype.unknownOption = function () {
    process.stderr.write(chalk.default.redBright(`\n  Unknown arguments: ${process.argv.slice(2).join(' ')}\n`));
    program.help();
};
program
    .name("ludown refresh")
    .description(`Convert LUIS JSON and/ or QnAMaker JSON file into .lu file`)
    .usage('-i <LUISJsonFile> | -q <QnAJSONFile>')
    .option('-i, --LUIS_File <LUIS_JSON_File>', '[Optional] LUIS JSON input file name')
    .option('-q, --QNA_FILE <QNA_FILE>', '[Optional] QnA Maker JSON input file name')
    .option('-a, --QNA_ALTERATION_FILE <QNA_ALT_FILE>', '[Optional] QnA Maker Alteration input file name')
    .option('-o, --out_folder <outputFolder> [optional]', '[Optional] Output folder for all files the tool will generate')
    .option('-n, --lu_File <LU_File>', '[Optional] Output .lu file name')
    .option('--verbose', '[Optional] Get verbose messages from parser')
    .option('-s, --skip_header', '[Optional] Generate .lu file without the header comment')
    .option('-r, --sort', '[Optional] When set, intent, utterances, entities, questions collections are alphabetically sorted')
    .option('-m, --model_info', '[Optional] When set, include model information in the output .lu file')
    .option('--stdin', '[Optional] Read input from stdin')
    .option('--stdout', '[Optional] Write output to stdout only. Specifying this option will not write any generated content to disk')
    .parse(process.argv);

if (process.argv.length < 3) {
    program.help();
} else {
    if (!program.LUIS_File && !program.QNA_FILE && !program.QNA_ALTERATION_FILE && !program.stdin) {
        process.stderr.write(chalk.default.redBright(`\n  No LUIS input file or QnA Maker JSON or QnA Alteration file specified.`));
        program.help();
    }
    toLU.generateMarkdown(program)
        .then(function () {
            process.exit(retCode.errorCode.SUCCESS);
        })
        .catch(function (err) {
            process.stderr.write(chalk.default.redBright(err.text + '\n'));
            process.stderr.write(chalk.default.redBright('Stopping further processing. \n'));
            process.exit(err.errCode);
        });
}
