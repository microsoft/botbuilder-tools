#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/*eslint no-console: ["error", { allow: ["log"] }] */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const txtfile = require('read-text-file');
const LUISObjNameEnum = require('./enums/luisobjenum');
const parseFileContents = require('./parseFileContents');
const retCode = require('./enums/CLI-errors');
const helpers = require('./helpers');
const cmdEnum = require('./enums/parsecommands');
const exception = require('./classes/exception');
const parser = {
    /**
     * Handle parsing the root file that was passed in command line args
     *
     * @param {object} program Content flushed out by commander
     * @param {cmdEnum} cmd Parse to either LUIS or QnA 
     * @returns {void} Nothing
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    handleFile: async function(program, cmd) {
        let filesToParse;
        try {
            filesToParse = await getFilesToParse(program);
        } catch (err) {
            throw (err);
        }
        let rootFile = filesToParse[0];
        let allParsedContent = '';
        try {
            allParsedContent = await parseAllFiles(filesToParse, program.verbose, program.luis_culture);
        } catch (err) {
            throw (err);
        }
        let allParsedLUISContent = allParsedContent.LUISContent;
        let allParsedQnAContent = allParsedContent.QnAContent;
        let allParsedQnAAlterations = allParsedContent.QnAAlterations;
        let finalLUISJSON, finalQnAJSON, finalQnAAlterations; 
        try {
            finalLUISJSON = await parseFileContents.collateLUISFiles(allParsedLUISContent);
            if(haveLUISContent(finalLUISJSON)) await parseFileContents.validateLUISBlob(finalLUISJSON);
            finalQnAJSON = await parseFileContents.collateQnAFiles(allParsedQnAContent);
            finalQnAAlterations = await parseFileContents.collateQnAAlterations(allParsedQnAAlterations);
        } catch (err) {
            throw (err);
        }
        try {
            writeOutFiles(program,finalLUISJSON,finalQnAJSON, finalQnAAlterations, rootFile, cmd); 
        } catch (err) {
            throw(err);
        }
    }
};
/**
 * Helper function to write out contents to disk
 * @param {object} program Parsed program object from commander
 * @param {LUIS} finalLUISJSON Collated final LUIS JSON structure to write out to disk
 * @param {QnA} finalQnAJSON Collated final QnA JSON structure to write out to disk\
 * @param {qnaAlterations} finalQnAAlterations Collated final QnA Alterations JSON structure to write out to disk\
 * @param {string} rootFile Root file name and path
 * @param {cmdEnum} cmd Command to instruct if LUIS or QnA content should be written out to disk
 * @returns {void} Nothing
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const writeOutFiles = function(program,finalLUISJSON,finalQnAJSON, finalQnAAlterations, rootFile, cmd) {
    let outFolder;
    try {
        outFolder = getOutputFolder(program)
    } catch (err) {
        throw (err);
    }
    if(!program.luis_versionId) program.luis_versionId = "0.1";
    if(!program.luis_schema_version) program.luis_schema_version = "3.0.0";
    if(!program.luis_name) program.luis_name = path.basename(rootFile, path.extname(rootFile));
    if(!program.luis_desc) program.luis_desc = "";
    if(!program.luis_culture) program.luis_culture = "en-us";   
    if(!program.qna_name) program.qna_name = path.basename(rootFile, path.extname(rootFile));
    if(program.luis_culture) program.luis_culture = program.luis_culture.toLowerCase();

    if(finalLUISJSON) {
        finalLUISJSON.luis_schema_version = program.luis_schema_version;
        finalLUISJSON.versionId = program.luis_versionId;
        finalLUISJSON.name = program.luis_name,
        finalLUISJSON.desc = program.luis_desc;
        finalLUISJSON.culture = program.luis_culture;
        finalQnAJSON.name = program.qna_name;
    }
    
    var writeQnAFile = (finalQnAJSON.qnaList.length > 0) || 
                        (finalQnAJSON.urls.length > 0) || 
                        (finalQnAJSON.files.length > 0);

    var  writeLUISFile = finalLUISJSON?true:false;

    if(!writeLUISFile && program.verbose) {
        process.stdout.write(chalk.default.yellowBright('No LUIS content found in .lu file(s)! \n'));
    }

    if(!writeQnAFile && program.verbose) {
        process.stdout.write(chalk.default.yellowBright('No QnA Maker content found in .lu file(s)! \n'));
    }

    if(program.verbose) {
        if((cmd == cmdEnum.luis) && writeLUISFile) {
            process.stdout.write(JSON.stringify(finalLUISJSON, null, 2) + '\n');
        }
        if((cmd == cmdEnum.qna) && writeQnAFile) {
            process.stdout.write(JSON.stringify(finalQnAJSON, null, 2) + '\n');
        }
    }
    
    if(!program.lOutFile) {
        if(!program.luis_name) {
            program.lOutFile = path.basename(rootFile, path.extname(rootFile)) + "_LUISApp.json";  
        } else {
            program.lOutFile = program.luis_name.includes('.')?program.luis_name:program.luis_name + ".json";
        }
    }
    if(!program.qOutFile) {
        if(!program.qna_name) {
            program.qOutFile = path.basename(rootFile, path.extname(rootFile)) + "_qnaKB.json";
        } else {
            program.qOutFile = program.qna_name.includes('.')?program.qna_name:program.qna_name + ".json";
        }
    }
    if((cmd == cmdEnum.luis) && writeLUISFile) {
        var fLuisJson = JSON.stringify(finalLUISJSON, null, 2);
        var luisFilePath = path.join(outFolder, program.lOutFile);
        // write out the final LUIS Json
        try {
            fs.writeFileSync(luisFilePath, fLuisJson, 'utf-8');
        } catch (err) {
            throw(new exception(retCode.errorCode.UNABLE_TO_WRITE_FILE,'Unable to write LUIS JSON file - ' + path.join(outFolder, program.lOutFile)));
        }
        if(program.verbose) process.stdout.write(chalk.default.italic('Successfully wrote LUIS model to ' + path.join(outFolder, program.lOutFile) + '\n'));
    }
    if((cmd == cmdEnum.qna) && writeQnAFile) {
        let qnaJson = JSON.stringify(finalQnAJSON, null, 2);
        let qnaFilePath = path.join(outFolder, program.qOutFile);
        // write out the final LUIS Json
        try {
            fs.writeFileSync(qnaFilePath, qnaJson, 'utf-8');
        } catch (err) {
            throw(new exception(retCode.errorCode.UNABLE_TO_WRITE_FILE,'Unable to write QnA JSON file - ' + path.join(outFolder, program.qOutFile)));
        }
        if(program.verbose) process.stdout.write(chalk.default.italic('Successfully wrote QnA KB to ' + path.join(outFolder, program.qOutFile) + '\n'));
    }
    // write luis batch test file if requested
    if((cmd == cmdEnum.luis) && program.write_luis_batch_tests) {
        let lBatchFile = JSON.stringify(finalLUISJSON.utterances, null, 2);
        let LUISBatchFileName = program.lOutFile.endsWith('.json')?program.lOutFile.replace('.json','_LUISBatchTest.json'):program.lOutFile + '_LUISBatchTest.json';
        let lBFileName = path.join(outFolder, LUISBatchFileName);
        // write out the final LUIS Json
        try {
            fs.writeFileSync(lBFileName, lBatchFile, 'utf-8');
        } catch (err) {
            throw(new exception(retCode.errorCode.UNABLE_TO_WRITE_FILE, 'Unable to write LUIS batch test JSON file - ' + path.join(outFolder, LUISBatchFileName)));
        }
        if(program.verbose) console.log(chalk.default.italic('Successfully wrote LUIS batch test JSON file to ' + path.join(outFolder, LUISBatchFileName) + '\n'));
    }

    // write out QnA Alterations if requested
    if((cmd == cmdEnum.qna) && program.write_qna_alterations) {
        let qAlterationsFileContent = JSON.stringify(finalQnAAlterations, null, 2);
        let qAlterationsFileName = program.qOutFile.endsWith('.json')?program.qOutFile.replace('.json','_Alterations.json'):program.qOutFile + '_Alterations.json';
        let qAFileName = path.join(outFolder, qAlterationsFileName);
        // write out the final QnA alterations file
        try {
            fs.writeFileSync(qAFileName, qAlterationsFileContent, 'utf-8');
        } catch (err) {
            throw(new exception(retCode.errorCode.UNABLE_TO_WRITE_FILE, 'Unable to write QnA Alterations JSON file - ' + qAFileName));
        }
        if(program.verbose) console.log(chalk.default.italic('Successfully wrote QnA Alterations JSON file to ' + qAFileName + '\n'));
    }
}
/**
 * Helper function to get output folder
 * @param {object} program Parsed program object from commander
 * @returns {string} Output folder
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const getOutputFolder = function(program) {
    let outFolder = process.cwd();
    if(program.out_folder) {
        if(path.isAbsolute(program.out_folder)) {
            outFolder = program.out_folder;
        } else {
            outFolder = path.resolve('', program.out_folder);
        }
        if(!fs.existsSync(outFolder)) {
            throw(new exception(retCode.errorCode.NO_LU_FILES_FOUND, 'Output folder ' + outFolder + ' does not exist'));     
        }
    }
    return outFolder;
}
/**
 * Helper function to get list of lu files to parse
 * @param {object} program Parsed program object from commander
 * @returns {Array} Array of .lu files found to parse
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const getFilesToParse = async function(program) {
    let filesToParse = [];
    if(program.in) {
        filesToParse.push(program.in);
    }
    if(program.lu_folder) {
        // is this a folder? 
        try
        {
            var folderStat = fs.statSync(program.lu_folder);
        } catch (err) {
            throw(new exception(retCode.errorCode.OUTPUT_FOLDER_INVALID, 'Sorry, ' + program.lu_folder + ' is not a folder or does not exist'));
        }
        if(!folderStat.isDirectory()) {
            throw(new exception(retCode.errorCode.OUTPUT_FOLDER_INVALID, 'Sorry, ' + program.lu_folder + ' is not a folder or does not exist'));
        }
        if(program.subfolder) {
            filesToParse = helpers.findLUFiles(program.lu_folder, true); 
        } else {
            filesToParse = helpers.findLUFiles(program.lu_folder, false); 
        }
        if(filesToParse.length === 0) {
            throw(new exception(retCode.errorCode.NO_LU_FILES_FOUND, 'Sorry, no .lu files found in the specified folder.'));                
        }
    }
    return filesToParse;
}
/**
 * Helper function to loop through and parse all files
 * @param {Array} filesToParse List of input .lu files to parse
 * @param {boolean} log If true, write verbose log messages to stdout
 * @param {string} luis_culture LUIS language code
 * @returns {object} Object cotaining arrays of all parsed LUIS and QnA content found in the files
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const parseAllFiles = async function(filesToParse, log, luis_culture) {
    let parsedContent = '';
    let allParsedLUISContent = [];
    let allParsedQnAContent = [];
    let allParsedAlterationsContent = [];
    while(filesToParse.length > 0) {
        let file = filesToParse[0];
        if(!fs.existsSync(path.resolve(file))) {
            throw(new exception(retCode.errorCode.FILE_OPEN_ERROR, 'Sorry unable to open [' + file + ']'));     
        }
        let fileContent = txtfile.readSync(file);
        if (!fileContent) {
            throw(new exception(retCode.errorCode.FILE_OPEN_ERROR,'Sorry, error reading file:' + file));
        }
        if(log) process.stdout.write(chalk.default.whiteBright('Parsing file: ' + file + '\n'));
        try {
            parsedContent = await parseFileContents.parseFile(fileContent, log, luis_culture);
        } catch (err) {
            throw(err);
        }
        if (!parsedContent) {
            throw(new exception(retCode.errorCode.INVALID_INPUT_FILE, 'Sorry, file ' + file + 'had invalid content'));
        } 
        try {
            if(haveLUISContent(parsedContent.LUISJsonStructure) && await parseFileContents.validateLUISBlob(parsedContent.LUISJsonStructure)) allParsedLUISContent.push(parsedContent.LUISJsonStructure);
        } catch (err) {
            throw (err);
        }
        allParsedQnAContent.push(parsedContent.qnaJsonStructure);
        allParsedAlterationsContent.push(parsedContent.qnaAlterations);
        // remove this file from the list
        let parentFile = filesToParse.splice(0,1);
        let parentFilePath = path.parse(path.resolve(parentFile[0])).dir;
        // add additional files to parse to the list
        if(parsedContent.additionalFilesToParse.length > 0) {
            parsedContent.additionalFilesToParse.forEach(function(file) {
                // Support wild cards at the end of a relative .LU file path. 
                // './bar/*' should look for all .lu files under the specified folder.
                // './bar/**' should recursively look for .lu files under sub-folders as well.
                if(file.endsWith('*')) {
                    const isRecursive = file.endsWith('**');
                    const rootFolder = file.replace(/\*/g, '');
                    let rootPath = rootFolder;
                    if(!path.isAbsolute(rootFolder)) {
                        rootPath = path.resolve(parentFilePath, rootFolder);
                    } 
                    // Get LU files in this location
                    const luFilesToAdd = helpers.findLUFiles(rootPath, isRecursive);
                    if(luFilesToAdd.length !== 0) {
                        // add these to filesToParse
                        filesToParse = filesToParse.concat(luFilesToAdd);
                    }
                } else if(path.isAbsolute(file)) {
                    filesToParse.push(file);
                } else {
                    filesToParse.push(path.resolve(parentFilePath, file));
                }
            });
        }
    }
    return {
        LUISContent: allParsedLUISContent,
        QnAContent: allParsedQnAContent,
        QnAAlterations: allParsedAlterationsContent
    };
}
/**
 * Helper function to see if we have any luis content in the blob
 * @param {object} blob Contents of parsed luis blob
 * @returns {boolean} true if there is any luis content in the blob
 */
const haveLUISContent = function(blob) {
    if(!blob) return false;
    return ((blob[LUISObjNameEnum.INTENT].length > 0) ||
    (blob[LUISObjNameEnum.ENTITIES].length > 0) || 
    (blob[LUISObjNameEnum.CLOSEDLISTS].length > 0) ||
    (blob[LUISObjNameEnum.PATTERNANYENTITY].length > 0) ||
    (blob.patterns.length > 0) ||
    (blob[LUISObjNameEnum.UTTERANCE].length > 0) ||
    (blob.prebuiltEntities.length > 0) ||
    (blob.model_features.length > 0));
};

module.exports = parser;
