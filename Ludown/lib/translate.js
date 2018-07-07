#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const retCode = require('./enums/CLI-errors');
const txtfile = require('read-text-file');
const helpers = require('./helpers');
const translateHelpers = require('./translate-helpers');
const translateModule = {
    /**
     * Helper function to parse, translate and write out localized lu files
     * @param {object} program parsed program object from commander
     * @returns {void} nothing
     * @throws {object} Throws on errors. Object includes errCode and text. 
     */
    translateContent: async function(program) {
        let filesToParse = [];
        let folderStat = '';
        if(program.in) {
            filesToParse.push(program.in);
        }
        // do we have a folder passed in?
        if(program.lu_folder) {
            try
            {
                folderStat = fs.statSync(program.lu_folder);
            } catch (err) {
                throw({
                    errCode: retCode.errorCode.OUTPUT_FOLDER_INVALID, 
                    text: 'Sorry, ' + program.lu_folder + ' is not a folder or does not exist'
                });
            }
            if(!folderStat.isDirectory()) {
                throw({
                    errCode: retCode.errorCode.OUTPUT_FOLDER_INVALID, 
                    text: 'Sorry, ' + program.lu_folder + ' is not a folder or does not exist'
                });
            }
            if(program.subfolder) {
                filesToParse = helpers.findLUFiles(program.lu_folder, true); 
            } else {
                filesToParse = helpers.findLUFiles(program.lu_folder, false); 
            }
            if(filesToParse.length === 0) {
                throw({
                    errCode: retCode.errorCode.NO_LU_FILES_FOUND, 
                    text: 'Sorry, no .lu files found in the specified folder.'
                });
            }
        }
        // is there an output folder?
        let outFolder = process.cwd();
        if(program.out_folder) {
            if(path.isAbsolute(program.out_folder)) {
                outFolder = program.out_folder;
            } else {
                outFolder = path.resolve('', program.out_folder);
            }
            if(!fs.existsSync(outFolder)) {
                throw({
                    errCode: retCode.errorCode.OUTPUT_FOLDER_INVALID, 
                    text: 'Output folder ' + outFolder + ' does not exist'
                });
            }
        }
        while(filesToParse.length > 0) {
            let file = filesToParse[0];
            try {
                await parseFile(file, outFolder, program.translate_key, program.to_lang, program.src_lang, program.translate_comments, program.translate_link_text, program.verbose);
            } catch (err) {
                throw(err);
            }
            filesToParse.splice(0,1);
         }
    }
}

/**
 * Helper function to parse, translate and write out localized lu files
 * @param {string} file file name
 * @param {string} outFolder output folder path
 * @param {string} translate_key translate text API key
 * @param {string} to_lang language code to translate content to
 * @param {string} src_lang language code for source content
 * @param {boolean} translate_comments translate comments in .lu files if this is set to true
 * @param {boolean} translate_link_text translate URL or LU reference link text in .lu files if this is set to true
 * @param {boolean} log indicates if this function should write verbose messages to process.stdout
 * @returns {void} nothing
 */
async function parseFile(file, outFolder, translate_key, to_lang, src_lang, translate_comments, translate_link_text, log) {
    let fileName = path.basename(file);
    if(!fs.existsSync(path.resolve(file))) {
        throw({
            errCode: retCode.errorCode.FILE_OPEN_ERROR, 
            text: 'Sorry unable to open [' + file + ']'
        });
    }
    let fileContent = txtfile.readSync(file);
    if (!fileContent) {
        throw({
            errCode: retCode.errorCode.FILE_OPEN_ERROR, 
            text: 'Sorry, error reading file:' + file
        });
    }
    if(log) process.stdout.write(chalk.default.whiteBright('Parsing file: ' + file + '\n'));
    let parsedLocContent = '';
    try {
        parsedLocContent = await translateHelpers.parseAndTranslate(fileContent, translate_key, to_lang, src_lang, translate_comments, translate_link_text, log)
    } catch (err) {
        throw(err);
    }
    
    if (!parsedLocContent) {
        throw({
            errCode: retCode.errorCode.INVALID_INPUT_FILE, 
            text: 'Sorry, file : ' + file + 'had invalid content'
        });
    } else {
        // write out file
        outFolder = path.join(outFolder, to_lang);
        try
        {
            fs.mkdirSync(outFolder);
        } catch(exception) {
            if(exception.code != 'EEXIST') {
                throw({
                    errCode: retCode.errorCode.UNABLE_TO_WRITE_FILE, 
                    text: 'Unable to create folder - ' + exception
                });
            }
        }
        let outFileName = path.join(outFolder, fileName);
        try {
            fs.writeFileSync(outFileName, parsedLocContent, 'utf-8');
        } catch (err) {
            throw({
                errCode: retCode.errorCode.UNABLE_TO_WRITE_FILE, 
                text: 'Unable to write LU file - ' + outFileName
            });
        }
        if(log) process.stdout.write(chalk.default.italic('Successfully wrote to ' + outFileName + '\n\n'));
    }
}

module.exports = translateModule; 