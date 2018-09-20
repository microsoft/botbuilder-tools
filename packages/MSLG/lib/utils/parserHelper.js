/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const txtfile = require('read-text-file');
const Exception = require('./exception');
const retCode = require('../enums/errorCodes');
const parserConsts = require('../enums/parserConsts');

const parserHelper = {
     /**
     * Helper function to recursively get all files of a specific file extension
     * @param {string} inputfolder input folder name
     * @param {boolean} getSubFolder indicates if we should recursively look in sub-folders as well
     * @param {string} fileExt file type extension to look for
     * @returns {Array} list of files found by fileExtension files found
    */
   findFiles: function(inputFolder, getSubFolders, fileExt) {
        let results = [];
        const lgExt = fileExt?fileExt:lgFileExt
        fs.readdirSync(inputFolder).forEach(function(dirContent) {
            const resolvedDirContent = path.resolve(inputFolder,dirContent);
            if(getSubFolders && fs.statSync(resolvedDirContent).isDirectory()) {
                results = results.concat(parserHelper.findFiles(resolvedDirContent, getSubFolders, fileExt));
            }
            if(fs.statSync(resolvedDirContent).isFile()) {
                if(resolvedDirContent.endsWith(lgExt)) {
                    results.push(resolvedDirContent);
                }
            }
        });
        return results;
    },

    /**
     * Helper function to split current file content by sections. Each section needs a parser delimiter
     *
     * @param {string} fileContent string content of current file being parsed
     * @param {boolean} log indicates if this function should write verbose messages to process.stdout
     * @returns {string[]} List of parsed LUIS/ QnA sections in current file
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    splitFileBySections : function(fileContent, log) {
        const linesInFile = fileContent.split(/\n|\r\n/);
        let currentSection = null;
        let middleOfSection = false;
        let sectionsInFile = [];
        let currentSectionType = null; //PARSERCONSTS
        const NEWLINE = '\r\n';

        for(lineIndex in linesInFile) {
            const currentLine = linesInFile[lineIndex].trim();
            // skip line if it is just a comment
            if(currentLine.indexOf(parserConsts.COMMENT) === 0) continue;

            // skip line if it is blank
            if(currentLine === '') continue;

            // is this a FILEREF or URLREF section? 
            if((currentLine.indexOf(parserConsts.FILEREF) === 0)) {
                // handle anything in currentSection buffer
                if(currentSection !== null) {
                    var previousSection = currentSection.substring(0, currentSection.lastIndexOf(NEWLINE));
                    sectionsInFile = validateAndPushCurrentBuffer(previousSection, sectionsInFile, currentSectionType, lineIndex, log);
                }
                currentSection = null;
                sectionsInFile.push(currentLine);
                middleOfSection = false;
            } else if((currentLine.indexOf(parserConsts.INTENT) === 0)) {
                if(currentLine.indexOf(' ') === -1) {
                    throw new Exception(retCode.INVALID_TEMPLATE, `Error: Line # ${lineIndex+1}. "${currentLine}" does not have valid template definition`);
                }
                // handle anything in currentSection buffer
                if(currentSection !== null) {
                    const previousSection = currentSection.substring(0, currentSection.lastIndexOf(NEWLINE));
                    sectionsInFile = validateAndPushCurrentBuffer(previousSection, sectionsInFile, currentSectionType, lineIndex, log);
                }
                middleOfSection = true;
                currentSectionType = parserConsts.INTENT;
                currentSection = currentLine + NEWLINE;
            } else if((currentLine.indexOf(parserConsts.ENTITY) === 0)) {
                // handle anything in currentSection buffer
                if(currentSection !== null) {
                    const previousSection = currentSection.substring(0, currentSection.lastIndexOf(NEWLINE));
                    sectionsInFile = validateAndPushCurrentBuffer(previousSection, sectionsInFile, currentSectionType, lineIndex, log);
                } 
                if(currentLine.toLowerCase().includes(':')) {
                    currentSectionType = parserConsts.ENTITY;
                    currentSection = currentLine + NEWLINE;
                } else {
                    throw new Exception(retCode.INVALID_ENTITY_DEFINITION, 'Error: Line #' + lineIndex+1 + ' does not have a valid entity definition. "' + currentLine + '"');
                }
            } else {
                if(middleOfSection) {
                    currentSection += currentLine + NEWLINE;
                } else {
                    throw new Exception(retCode.INVALID_INPUT,'Error: Line #' + lineIndex+1 + ' is not part of a Template or entity definition');
                }
            }
        }
        // handle anything in currentSection buffer
        if(currentSection !== null) {
            const previousSection = currentSection.substring(0, currentSection.lastIndexOf('\r\n'));
            sectionsInFile = validateAndPushCurrentBuffer(previousSection, sectionsInFile, currentSectionType, lineIndex, log);
        }
        return sectionsInFile;
    },
    /**
     * Helper function to write content out to disk
     * 
     * @param {string} fileContent File content to write out to disk 
     * @param {string} fileName Output file name
     * @param {string} filePath Output file path
     * @param {boolean} verboseLog If true, write verbose log messages to console.log
     * @returns {void} Nothing
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    writeToDisk : function(fileContent, fileName, filePath, verboseLog) {
        try
        {
            fs.mkdirSync(filePath);
        } catch(Exception) {
            if(Exception.code != 'EEXIST') {
                throw(new Exception(retCode.errorCode.UNABLE_TO_WRITE_FILE, 'Unable to create folder - ' + Exception));
            }
        }

        const outFile = path.join(filePath, fileName);

        // write out the final LUIS Json
        try {
            fs.writeFileSync(outFile, fileContent, 'utf-8');
        } catch (err) {
            throw new Exception(retCode.UNABLE_TO_WRITE_FILE, 'Unable to write LG file - ' + outFile);
        }

        if(verboseLog) 
            console.log(chalk.default.italic('Successfully wrote LG file to ' + outFile + '\n'));
    },
    /**
     * Helper function to get output folder
     * @param {object} program Parsed program object from commander
     * @returns {string} Output folder
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    getOutputFolder : function(outFolderPath) {
        let outFolder = process.cwd();
        if(outFolderPath) {
            outFolder = path.isAbsolute(outFolderPath) ? outFolderPath:path.resolve('', outFolderPath);
            if(!fs.existsSync(outFolder)) 
                throw new Exception(retCode.NO_LG_FILES_FOUND, 'Output folder ' + outFolder + ' does not exist');     
        }
        return outFolder;
    },
    /**
     * Helper function to get file content
     * @param {string} file File path
     * @returns {string} file content
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    getFileContent : function(file) {
        if(!fs.existsSync(path.resolve(file))) 
            throw new Exception(retCode.FILE_OPEN_ERROR, 'Sorry unable to open [' + file + ']');     
        let fileContent = txtfile.readSync(file);
        if (!fileContent) 
            throw new Exception(retCode.FILE_OPEN_ERROR,'Sorry, error reading file:' + file);
        return fileContent;
    }
};

module.exports = parserHelper;

/**
 * Internal helper function to examine type of content in the current buffer and provide validation errors based on content type
 *
 * @param {string} previousSection Contents of of the prior section being parsed
 * @param {string[]} sectionsInFile array of strings of prior sections parsed in current file
 * @param {PARSERCONSTS} currentSectionType type of current section parsed
 * @param {int} lineIndex current line index being parsed
 * @param {boolean} log indicates if this function should write verbose messages to process.stdout
 * @returns {string[]} updated sections in current file being parsed.
 * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
 */
const validateAndPushCurrentBuffer = function(previousSection, sectionsInFile, currentSectionType, lineIndex, log) {
    switch(currentSectionType) {
        case parserConsts.INTENT:
            // warn if there isnt at least one utterance in an intent
            if(previousSection.split(/\r\n/).length === 1)  
                throw new Exception(retCode.INVALID_INPUT, 'Line #' + lineIndex+1 + ': [ERR] No variations or conditions found for template: ' + previousSection.split(/\r\n/)[0]);  
            sectionsInFile.push(previousSection);
            break;
        case parserConsts.ENTITY:
        default: 
            sectionsInFile.push(previousSection);   
            break;
    }
    return sectionsInFile;
};