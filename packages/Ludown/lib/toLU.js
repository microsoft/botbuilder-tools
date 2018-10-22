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
const toLUHelpers = require('./toLU-helpers');
const helperClasses = require('./classes/hclasses');
const exception = require('./classes/exception');
const utils = require('./utils');
const toLUModules = {
    /**
     * Function to take commander program object and construct markdown file for specified input
     * @param {object} program parsed commander program object
     * @returns {void} nothing
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    generateMarkdown: async function(program) {
        let outFolder = process.cwd();
        let LUISJSON = new helperClasses.readerObject();
        let QnAJSON = new helperClasses.readerObject();
        let QnAAltJSON = new helperClasses.readerObject();
        let outFileContent;
        let outFileName = '';
        if(program.out_folder) {
            if(path.isAbsolute(program.out_folder)) {
                outFolder = program.out_folder;
            } else {
                outFolder = path.resolve('', program.out_folder);
            }
            if(!fs.existsSync(outFolder)) {
                throw(new exception(retCode.errorCode.OUTPUT_FOLDER_INVALID, 'Output folder ' + outFolder + ' does not exist'));
            }
        }
        // Do we have a LUIS file? If so, get that and load into memory
        if(program.LUIS_File) {
            try {
                LUISJSON.model = await parseLUISFile(program.LUIS_File);
            } catch (err) {
                throw(err);
            }
            LUISJSON.sourceFile = program.LUIS_File;
        }

        //do we have a QnA JSON file? If so, get that and load into memory
        if(program.QNA_FILE) {
            try {
                QnAJSON.model = await parseQnAJSONFile(program.QNA_FILE);
            } catch (err) {
                throw (err);
            }
            QnAJSON.sourceFile = program.QNA_FILE;
        }

        //do we have a QnA alterations file? If so, get that and load into memory
        if(program.QNA_ALTERATION_FILE) {
            try {
                QnAAltJSON.model = await parseQnAJSONFile(program.QNA_ALTERATION_FILE);
            } catch (err) {
                throw (err);
            }
            QnAAltJSON.sourceFile = program.QNA_ALTERATION_FILE;
        }
        // construct the markdown file content
        outFileContent = await toLUHelpers.constructMdFileHelper(LUISJSON, QnAJSON, QnAAltJSON, program.LUIS_File, program.QNA_FILE, program.skip_header)
        if(!outFileContent) {
            throw(new exception(retCode.errorCode.UNKNOWN_ERROR,'Sorry, Unable to generate .lu file content!'));
        }
        // write out the file
        if(!program.lu_File) {
            if(LUISJSON.sourceFile) {
                outFileName += path.basename(LUISJSON.sourceFile, path.extname(LUISJSON.sourceFile));
            }
            if(QnAJSON.sourceFile) {
                outFileName += path.basename(QnAJSON.sourceFile, path.extname(QnAJSON.sourceFile));
            }   
            program.lu_File = outFileName + '.lu'; 
        } else {
            if(program.lu_File.lastIndexOf('.lu') === -1) {
                program.lu_File += '.lu';
            }
        }
        outFileName = path.join(outFolder, program.lu_File);
        try {
            fs.writeFileSync(outFileName, outFileContent, 'utf-8');
        } catch (err) {
            throw(new exception(retCode.errorCode.UNABLE_TO_WRITE_FILE, 'Unable to write LU file - ' + outFileName));
        }
        if(program.verbose) process.stdout.write(chalk.default.italic('Successfully wrote to ' + path.join(outFolder, program.lu_File)));
    }
};
/**
 * Helper function to read a file and return file content
 * @param {string} file Input file name
 * @returns {string} File content
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const openFileAndReadContent = async function(file) {
    // catch if input file is a folder
    if(fs.lstatSync(file).isDirectory()) {
        throw (new exception(retCode.errorCode.FILE_OPEN_ERROR, 'Sorry, "' + file + '" is a directory! Please try a LUIS/ QnA Maker JSON file as input.'));
    }
    if(!fs.existsSync(path.resolve(file))) {
        throw(new exception(retCode.errorCode.FILE_OPEN_ERROR, 'Sorry unable to open [' + file + ']'));
    }
    let fileContent = txtfile.readSync(file);
    if (!fileContent) {
        throw(new exception(retCode.errorCode.FILE_OPEN_ERROR, 'Sorry, error reading file: ' + file));
    }
    return fileContent;
};
/**
 * Helper function to parse QnAMaker TSV file into a JSON object
 * @param {String} file input LUIS JSON file name
 * @returns {object} LUIS JSON object
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const parseLUISFile = async function(file) {
    let LUISFileContent, LUISJSON;
    try {
        LUISFileContent = await openFileAndReadContent(file);
    } catch (err) {
        throw(err);
    }
    try {
        LUISJSON = JSON.parse(LUISFileContent);
    } catch (err) {
        throw (new exception(retCode.errorCode.INVALID_INPUT_FILE, 'Sorry, error parsing file as LUIS JSON: ' + file));
    }

    if(LUISJSON.composites && LUISJSON.composites.length !== 0) {
        throw(new exception(retCode.errorCode.INVALID_INPUT_FILE, 'Sorry, input LUIS JSON file has references to composite entities. Cannot convert to .lu file.'));
    }
    if(LUISJSON.regex_entities && LUISJSON.regex_entities.length !== 0) {
        throw(new exception(retCode.errorCode.INVALID_INPUT_FILE, 'Sorry, input LUIS JSON file has references to regular expression entities. Cannot convert to .lu file.'));
    }
    if(LUISJSON.regex_features && LUISJSON.regex_features.length !== 0) {
        throw(new exception(retCode.errorCode.INVALID_INPUT_FILE, 'Sorry, input LUIS JSON file has references to regex_features. Cannot convert to .lu file.'));
    }
    return LUISJSON;
};
/**
 * Helper function to parse LUIS JSON file into a JSON object
 * @param {String} file Input QnA TSV file name
 * @returns {object} LUIS JSON object
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const parseQnAJSONFile = async function(file){
    let QnAFileContent, QnAJSON;
    try {
        QnAFileContent = await openFileAndReadContent(file);
    } catch (err) {
        throw(err);
    }
    try {
        QnAJSON = JSON.parse(QnAFileContent);
    } catch (err) {
        throw (new exception(retCode.errorCode.INVALID_INPUT_FILE, 'Sorry, error parsing file as QnA JSON: ' + file));
    }
    return QnAJSON;
}

module.exports = toLUModules;
