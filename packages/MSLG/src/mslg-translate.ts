#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import * as chalk from 'chalk';
import * as program from 'commander';
import { Translator } from './Translator';

program.Command.prototype.unknownOption = function () {
    process.stderr.write(chalk.default.redBright(`\n  Unknown arguments: ${process.argv.slice(2).join(' ')}\n`));
    program.help();
};

program
    .name("mslg translate")
    .description(`Translate .lg files to a target language by microsoft translation API.`)
    .usage('-k <translate_key> -t <targetLang> --in <.lg file> [-l <lgFolder>] [-s] [-o <outputFolder>] [-c] [--verbose]')
    .option('-k, --translate_key <translatorKey>', 'Microsoft translation API key')
    .option('-t, --target_lang <targetLang>', 'Target language to localize content to. See https://aka.ms/translate-langs for list of supported languages and codes. You can also specify comma or space delimited list of target languages.')
    .option('--in <lgFile>', 'A direct .lg file passed in')
    .option('-l, --lg_folder <folder_name>', '[Optional] Relative or absolute path to a folder containing .lg files')
    .option('-s, --subfolder', '[Optional] Flag option used to denote that subfolders need to be recursively checked to find .lg files')
    .option('-o, --out_folder <output_folder>', '[Optional] output folder to write out the final .lg file')
    .option('-c, --translate_comments', '[Optional] Flag option to indicate if comments in the input file is also translated. Default is set to false')
    .option('--verbose', '[Optional] Flag option used to request verbose output. With this option set, additional useful parse, validate and collate logs are written to stdout')
    .parse(process.argv);
   
if (process.argv.length < 3) {
    program.help();
} else {
    if (!process.argv[2].startsWith('-') && !process.argv[2].startsWith('--')) {
        process.stderr.write(chalk.default.redBright(`\n  Unknown command: ${process.argv.slice(2).join(' ')}\n`));
        program.help();
    }

    if (!program.translate_key) {
        process.stderr.write(chalk.default.redBright(`\n  No translate key provided.\n`));
        program.help();
    }

    if (!program.target_lang) {
        process.stderr.write(chalk.default.redBright(`\n  No target language provided.\n`));
        program.help();
    }

    if (!program.in && !program.lg_folder) {
        process.stderr.write(chalk.default.redBright(`\n  No lg file or folder specified.\n`));
        program.help();
    }

    try {
        let translator: Translator = new Translator();
        translator.Translate(program);
    } catch(e) {
        process.stderr.write(chalk.default.redBright('\n[ERROR]: ' + e.message + '\n'));
        process.stderr.write(chalk.default.redBright('Stopping further processing. \n'));
        process.exit();
    }
}