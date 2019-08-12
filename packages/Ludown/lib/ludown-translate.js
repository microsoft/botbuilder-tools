#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
require('./utils');
const program = require('commander');
const chalk = require('chalk');
const translate = require('../lib/translate');
const retCode = require('../lib/enums/CLI-errors');
program.Command.prototype.unknownOption = function () {
    process.stderr.write(chalk.default.redBright(`\n  Unknown arguments: ${process.argv.slice(2).join(' ')}\n`));
    program.help();
};
program
    .name("ludown translate")
    .description(`Translate .lu files from one language to another. Uses the Microsoft translator text API.`)
    .usage('-k <translate_key> --in <luFile> | -k <translate_key> --lu_folder <inputFolder> [-s]')
    .option('--in <luFile>', '.lu file to parse')
    .option('-t, --to_lang <tgtLang>', 'Target language to translate to. See https://aka.ms/translate-langs for list of supported languages and codes. You can also specify comma or space delimited list of target languages.')
    .option('-k, --translate_key <trKey>', 'Your translation key. See https://aka.ms/translate-key to get your key')
    .option('-l, --lu_folder <inputFolder>', '[Optional] Folder that has the .lu file. By default ludown will only look at the current folder. To look at all subfolders, include -s')
    .option('-o, --out_folder <outputFolder>', '[Optional] Output folder for all files the tool will generate')
    .option('-f, --src_lang <srcLang>', '[Optional] Source language. When omitted, source language is automatically detected. See https://aka.ms/translate-langs for list of supported languages and codes')
    .option('-s, --subfolder', '[Optional] Include sub-folders as well when looking for .lu files')
    .option('-n, --lu_file <lu file name>', '[Optional] Output .lu file name')
    .option('-c, --translate_comments', '[Optional] Translate comments in .lu files')
    .option('-u, --translate_link_text', '[Optional] Translate URL or .lu file reference link text')
    .option('-b, --batch_translate <linesToBatch>', '[Optional] Batch up <x> (1-25) number of lines before calling translation API. Defaults to 25.')
    .option('--verbose', '[Optional] Get verbose messages from parser')
    .parse(process.argv);

if (program.batch_translate) {
    if (parseInt(program.batch_translate) > 25 || parseInt(program.batch_translate) < 0) { 
        process.stderr.write(chalk.default.redBright(`\n  Batch translate size needs to be a number between 1 - 25\n`));
        program.help();
    }
}
if (!program.in && !program.lu_folder) {
    process.stderr.write(chalk.default.redBright(`\n  No .lu file or folder specified.\n`));
    program.help();
}
if (!program.translate_key) {
    process.stderr.write(chalk.default.redBright(`\n  No translate key provided.\n`));
    program.help();
}
if (!program.to_lang) {
    process.stderr.write(chalk.default.redBright(`\n  No target language provided.\n`));
    program.help();
}
translate.translateContent(program)
    .then(function () {
        process.exit(retCode.errorCode.SUCCESS);
    })
    .catch(function (err) {
        process.stderr.write(chalk.default.redBright(err.text + '\n'));
        process.stderr.write(chalk.default.redBright('Stopping further processing. \n'));
        process.exit(err.errCode);
    });
