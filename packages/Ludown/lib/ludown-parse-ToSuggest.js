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
    .name("ludown parse ToSuggest")
    .description(`Looks at your .lu and .qna files and suggests one or more LUIS and/or QnA maker applications. \nOutputs a luconfig.json config and suggested model files for LUIS and QnA.`)
    .usage('--config <path to lusuggest.json> | --lu_folder <inputFolder> --root_dialog <rootDialogName> [-o] [-c] [-e] [-q] [-u]')
    .option('-f, --lu_folder <inputFolder>', '[Required] Folder that has the .lu files. By default ludown will only look at the current folder. You can also specify this using --config option.')
    .option('-r, --root_dialog <rootDialogName>', '[Required] Name of folder that contains the root dialog. You can also specify this using --config option. ')
    .option('-o, --out_folder <outputFolder>', '[Optional] Output folder for all files the tool will generate')
    .option('-c, --luis_culture <luis_appCulture>', '[Optional] LUIS app culture of the rootDialog. Defaults to en-us if not specified.', 'en-us')
    .option('-e, --cross_feed_models', '[Optional] When set, child models will be cross trained with other trigger intents. Intent name set via -ei <intent name>, defaults to "None" intent')
    .option('--cross_train_intent_name <interruption_intent_name>', '[Optional] Used with -e --cross_feed_models option to denote the Intent name to use for the cross fed utterances into child models.', 'None')
    .option('-q, --add_qna_pairs', '[Optional] Instructs parser to add questions to the suggested LUIS application. Intent name set via -')
    .option('--qna_intent_name <qna_intent_name>', '[Optional] Used with -q --add_qna_pairs option to denote the Intent name to use under which questions from QnA pairs are added.', 'QnA')
    .option('-u, --auto_add_qna_metadata', '[Optional] Automatically set QnA meta data to include child dialog name')
    .option('--config <config_file_path>', 'lusuggest.json config file that contains the configuration for the suggest command.')
    .option('-k, --keep_child', '[Optional] Keep child models even if they only have the trigger intent')
    .option('--verbose', '[Optional] Get verbose messages from parser')
    .parse(process.argv);

    fParser.handleFile(program, cmdEnum.suggestModels)
        .then(function () {
            process.exit(retCode.errorCode.SUCCESS);
        })
        .catch(function (err) {
            if (err.errCode !== undefined && err.errCode === retCode.errorCode.UNKNOWN_OPTIONS) {
                process.stderr.write(chalk.default.redBright(err.text + '\n'));
                program.help();
            } else {
                process.stderr.write(chalk.default.redBright(err.text + '\n'));
                process.stderr.write(chalk.default.redBright('Stopping further processing. \n'));
            }
            process.exit(err.errCode);
        });

