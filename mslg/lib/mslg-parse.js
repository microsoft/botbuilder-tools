/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const program = require('commander');
const fParser = require('../lib/parser');
const chalk = require('chalk');
const retCode = require('ludown').helperEnums.errorCodes;
program.Command.prototype.unknownOption = function (flag) {
    process.stderr.write(chalk.default.redBright(`\n  Unknown arguments: ${process.argv.slice(2).join(' ')}\n`));
    program.help();
};
program
    .name("MSLG parse and collate")
    .description(`Parses .lg file(s) into a single .lg file.`)
    .usage('--lg_folder <inputFolder> [-s]')
    .option('-l, --lg_folder <inputFolder>', '[Optional] Folder that has the .lg file. By default ludown will only look at the current folder. To look at all subfolders, include -s')
    .option('-s, --subfolder', '[Optional] Include sub-folders as well when looking for .lg files')
    .option('-o, --out_folder <outputFolder>', '[Optional] Output folder for all files the tool will generate')
    .option('-n, --lg_app_name <lg_app_name>', '[Optional] Output LG app name')
    .option('--verbose', '[Optional] Get verbose messages from parser')
    .parse(process.argv);

    if (!program.lg_folder) {
        process.stderr.write(chalk.default.redBright(`\n  No input folder specified.\n`));
        program.help();
    } 
    fParser.parseCollateAndWriteOut(program.lg_folder, program.subfolder, program.out_folder, program.lg_app_name, program.verbose)
        .then(function(){
            process.exit(retCode.SUCCESS);
        })
        .catch(function(err) {
            process.stderr.write(chalk.default.redBright(err.text + '\n'));
            process.stderr.write(chalk.default.redBright('Stopping further processing. \n'));
            process.exit(err.errCode);
        });  

