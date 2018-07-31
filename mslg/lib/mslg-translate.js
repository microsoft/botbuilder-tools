/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const program = require('commander');
const chalk = require('chalk');
const translate = require('../lib/translate');
const retCode = require('../lib/enums/errorCodes');

program.Command.prototype.unknownOption = function (flag) {
    process.stderr.write(chalk.default.redBright(`\n  Unknown arguments: ${process.argv.slice(2).join(' ')}\n`));
    program.help();
};
program
    .name("MSLG translate")
    .description(`Translate .lg files from one language to another. Uses the Microsoft translator text API.`)
    .usage('-k <translate_key> --in <lgFile> | -k <translate_key> --lg_folder <inputFolder> [-s]')
    .option('--in <lgFile>', '.lu file to parse')
    .option('-t, --to_lang <tgtLang>', 'Target language to translate to. See https://aka.ms/translate-langs for list of supported langauges and codes.')
    .option('-k, --translate_key <trKey>', 'Your translation key. See https://aka.ms/translate-key to get your key')
    .option('-l, --lg_folder <inputFolder>', '[Optional] Folder that has .lg files. By default ludown will only look at the current folder. To look at all subfolders, include -s')
    .option('-o, --out_folder <outputFolder>', '[Optional] Output folder for all files the tool will generate')
    .option('-f, --src_lang <srcLang>', '[Optional] Source language. When omitted, source language is automatically detected. See https://aka.ms/translate-langs for list of supported languages and codes')
    .option('-s, --subfolder', '[Optional] Include sub-folders as well when looking for .lg files')
    .option('-n, --lg_File <LG_File>', '[Optional] Output .lg file name')
    .option('-c, --translate_comments', '[Optional] Translate comments in .lg files')
    .option('-u, --translate_link_text', '[Optional] Translate link text for .lg file references')
    .option('--verbose', '[Optional] Get verbose messages from parser')
    .parse(process.argv);

    if (!program.in && !program.lg_folder) {
        process.stderr.write(chalk.default.redBright(`\n  No .lg file or folder specified.\n`));
        program.help();
    } 
    if(!program.translate_key) {
        process.stderr.write(chalk.default.redBright(`\n  No translate key provided.\n`));
        program.help();
    }
    if(!program.to_lang) {
        process.stderr.write(chalk.default.redBright(`\n  No target language provided.\n`));
        program.help();
    }
    translate.translateContent(program.in, program.to_lang, program.translate_key, program.lg_folder, program.out_folder, program.src_lang, program.subfolder, program.lg_file, program.translate_comments, program.translate_link_text, program.verbose)
        .then(function(){
            process.exit(retCode.SUCCESS);
        })
        .catch(function(err) {
            process.stderr.write(chalk.default.redBright(err.text + '\n'));
            process.stderr.write(chalk.default.redBright('Stopping further processing. \n'));
            process.exit(err.errCode);
        });        
   
