#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
require('./utils');
const program = require('commander');
const fParser = require('./parser');
const chalk = require('chalk');
const retCode = require('./enums/CLI-errors');
const cmdEnum = require('./enums/parsecommands.js');
program.Command.prototype.unknownOption = function () {
    process.stderr.write(chalk.default.redBright(`\n  Unknown arguments: ${process.argv.slice(2).join(' ')}\n`));
    program.help();
};
program
    .name("ludown parse ToLUBuild")
    .description(`Looks at your .lu and .qna files and suggests one or more LUIS and/or QnA maker applications. Outputs a lubuild.json config and suggested model files for LUIS and QnA.`)
    .usage('--lu_folder <inputFolder> --root_dialog <rootDialogName> [-s] [-o] [-c] [-e] [-q] [-u]')
    .option('-f, --lu_folder <inputFolder>', '[Required] Folder that has the .lu files. By default ludown will only look at the current folder. To look at all subfolders, include -s')
    .option('-r, --root_dialog <rootDialogName>', '[Required] Name of folder that contains the root dialog')
    .option('-s, --subfolder', '[Optional] Include sub-folders as well when looking for .lu files')
    .option('-o, --out_folder <outputFolder>', '[Optional] Output folder for all files the tool will generate')
    .option('-c, --luis_culture <luis_appCulture>', '[Optional] LUIS app culture of the rootDialog. Defaults to en-us if not specified.', 'en-us')
    .option('-e, --cross_feed_models', '[Optional] When set, NONE intent for child models will be cross trained with other trigger intents.')
    .option('-q, --use_qna_pairs', '[Optional] Instructs parser to add questions to QnA or None intent')
    .option('-u, --auto_add_qna_metadata', '[Optional] Automatically set QnA meta data to include child dialog name')
    .option('--verbose', '[Optional] Get verbose messages from parser')
    .parse(process.argv);

if (process.argv.length < 5) {
    program.help();
} else {
    if (program.luis_culture) {
        // List of supported LUIS.ai locales. 
        // From: https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-language-support
        const LUISLocales = ['en-us', 'fr-ca', 'zh-cn', 'nl-nl', 'fr-fr', 'de-de', 'it-it', 'ja-jp', 'ko-kr', 'pt-br', 'es-es', 'es-mx'];
        if (!(LUISLocales.includes(program.luis_culture.toLowerCase()))) {
            process.stderr.write(chalk.default.yellowBright(`\nWARN: Unrecognized LUIS locale. Supported locales are - ${LUISLocales.toString()} \n\n`));
        }
    }
    if (!program.lu_folder || !program.root_dialog) {
        process.stderr.write(chalk.default.redBright(`\n  No .lu file or folder specified.\n`));
        program.help();
    }
    fParser.handleFile(program, cmdEnum.suggestModels)
        .then(function () {
            process.exit(retCode.errorCode.SUCCESS);
        })
        .catch(function (err) {
            process.stderr.write(chalk.default.redBright(err.text + '\n'));
            process.stderr.write(chalk.default.redBright('Stopping further processing. \n'));
            process.exit(err.errCode);
        });
}
