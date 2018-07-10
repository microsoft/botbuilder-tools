#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const fs = require('fs');
const path = require('path');
const PARSERCONSTS = require('./enums/parserconsts');
const chalk = require('chalk');
const retCode = require('./enums/CLI-errors');

const helpers = {
    /**
     * Helper function to recursively get all .lu files
     * @param {string} inputfolder input folder name
     * @param {boolean} getSubFolder indicates if we should recursively look in sub-folders as well
     * @returns {Array} Array of .lu files found
    */
    findLUFiles: function(inputFolder, getSubFolders) {
        let results = [];
        const luExt = '.lu';
        fs.readdirSync(inputFolder).forEach(function(dirContent) {
            dirContent = path.resolve(inputFolder,dirContent);
            if(getSubFolders && fs.statSync(dirContent).isDirectory()) {
                results = results.concat(helpers.findLUFiles(dirContent, getSubFolders));
            }
            if(fs.statSync(dirContent).isFile()) {
                if(dirContent.endsWith(luExt)) {
                    results.push(dirContent);
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
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    splitFileBySections : function(fileContent, log) {
        let linesInFile = fileContent.split(/\n|\r\n/);
        let currentSection = null;
        let middleOfSection = false;
        let sectionsInFile = [];
        let currentSectionType = null; //PARSERCONSTS
        let inQnAAnswer = false;
        const NEWLINE = '\r\n';
        for(lineIndex in linesInFile) {
            let currentLine = linesInFile[lineIndex].trim();
            // QnA answer can be multi-line markdown. So (re)set the in answer flag
            if(currentLine.indexOf(PARSERCONSTS.ANSWER) === 0) {
                inQnAAnswer = !inQnAAnswer;
            }
            // if in QnA answer, just add the new line.
            if(inQnAAnswer) {
                currentSection += currentLine + NEWLINE;
                continue;
            }
            // skip line if it is just a comment
            if(currentLine.indexOf(PARSERCONSTS.COMMENT) === 0) continue;

            // skip line if it is blank
            if(currentLine === '') continue;

            // is this a FILEREF or URLREF section? 
            if((currentLine.indexOf(PARSERCONSTS.FILEREF) === 0) ||
            (currentLine.indexOf(PARSERCONSTS.URLREF) === 0)  ||
            (currentLine.indexOf(PARSERCONSTS.URLORFILEREF) === 0)) {
                // handle anything in currentSection buffer
                if(currentSection !== null) {
                    var previousSection = currentSection.substring(0, currentSection.lastIndexOf(NEWLINE));
                    try {
                        sectionsInFile = validateAndPushCurrentBuffer(previousSection, sectionsInFile, currentSectionType, lineIndex, log);
                    } catch (err) {
                        throw(err);
                    }
                }
                currentSection = null;
                sectionsInFile.push(currentLine);
                middleOfSection = false;
            } else if((currentLine.indexOf(PARSERCONSTS.INTENT) === 0)) {
                if(currentLine.indexOf(' ') === -1) {
                    ++lineIndex;
                    throw(new exception(retCode.errorCode.INVALID_INTENT, 'Error: Line #' + lineIndex + '. "' + currentLine + '" does not have valid intent definition'));
                }
                // handle anything in currentSection buffer
                if(currentSection !== null) {
                    let previousSection = currentSection.substring(0, currentSection.lastIndexOf(NEWLINE));
                    try {
                        sectionsInFile = validateAndPushCurrentBuffer(previousSection, sectionsInFile, currentSectionType, lineIndex, log);
                    } catch (err) {
                        throw(err);
                    }
                }
                middleOfSection = true;
                currentSectionType = PARSERCONSTS.INTENT;
                currentSection = currentLine + NEWLINE;
            } else if((currentLine.indexOf(PARSERCONSTS.ENTITY) === 0)) {
                // handle anything in currentSection buffer
                if(currentSection !== null) {
                    let previousSection = currentSection.substring(0, currentSection.lastIndexOf(NEWLINE));
                    try {
                        sectionsInFile = validateAndPushCurrentBuffer(previousSection, sectionsInFile, currentSectionType, lineIndex, log);
                    } catch (err) {
                        throw(err);
                    }
                } 
                // only list entity types can have multi-line definition
                let isListEntity = (currentLine.indexOf('=', currentLine.length - 1) >= 0)?true:false;
                if(isListEntity || currentLine.toLowerCase().includes(':phraselist')){
                    middleOfSection = true;
                    currentSectionType = PARSERCONSTS.ENTITY;
                    currentSection = currentLine + NEWLINE;
                } else {
                    sectionsInFile.push(currentLine);
                    middleOfSection = false;
                    currentSection = null;
                }
            } else {
                if(middleOfSection) {
                    currentSection += currentLine + NEWLINE;
                } else {
                    ++lineIndex;
                    throw(new exception(retCode.errorCode.INVALID_LINE,'Error: Line #' + lineIndex + ' is not part of a Intent/ Entity/ QnA'));
                }
            }
        }
        // handle anything in currentSection buffer
        if(currentSection !== null) {
            let previousSection = currentSection.substring(0, currentSection.lastIndexOf('\r\n'));
            try {
                sectionsInFile = validateAndPushCurrentBuffer(previousSection, sectionsInFile, currentSectionType, lineIndex, log);
            } catch (err) {
                throw (err);
            }
        }
        return sectionsInFile;
    },
    /**
     * Helper function to do a filter operation based search over an Array
     * @param {Array} srcList Object to filter on
     * @param {string} property Property to evaluate
     * @param {string} searchValue Target value to compare
     * @returns {Array} Array of matching values
     */
    filterMatch : function (srcList, property, searchValue) {
        return srcList.filter(function(item) {
            return item[property] == searchValue;
        });
    }
};

/**
 * Internal helper function to examine type of content in the current buffer and provide validation errors based on content type
 *
 * @param {string} previousSection Contents of of the prior section being parsed
 * @param {string[]} sectionsInFile array of strings of prior sections parsed in current file
 * @param {PARSERCONSTS} currentSectionType type of current section parsed
 * @param {int} lineIndex current line index being parsed
 * @param {boolean} log indicates if this function should write verbose messages to process.stdout
 * @returns {string[]} updated sections in current file being parsed.
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
var validateAndPushCurrentBuffer = function(previousSection, sectionsInFile, currentSectionType, lineIndex, log) {
    switch(currentSectionType) {
        case PARSERCONSTS.INTENT:
            // warn if there isnt at least one utterance in an intent
            if(previousSection.split(/\r\n/).length === 1)  {
                ++lineIndex;
                if(previousSection.split(/\r\n/)[0].includes('?')) {
                    throw(new exception(retCode.errorCode.INVALID_LINE, 'Line #' + lineIndex + ': [ERR] No answer found for question: ' + previousSection.split(/\r\n/)[0]));
                } else {
                    if(log) process.stdout.write(chalk.yellow('Line #' + lineIndex + ': [WARN] No utterances found for intent: ' + previousSection.split(/\r\n/)[0] + '\n'));
                }
                --lineIndex;
            }
            sectionsInFile.push(previousSection);
            break;
        case PARSERCONSTS.QNA:
            // warn if there isnt at least one utterance in an intent
            if(previousSection.split(/\r\n/).length === 1)  {
                ++lineIndex;
                throw(new exception(retCode.errorCode.INVALID_LINE, 'Line #' + lineIndex + ': [ERR] No answer found for question' + previousSection.split(/\r\n/)[0]));
            }
            sectionsInFile.push(previousSection);
            break;
        case PARSERCONSTS.ENTITY:
            // warn if there isnt at least one utterance in an intent
            if(previousSection.split(/\r\n/).length === 1)  {
                ++lineIndex;
                if(log) process.stdout.write(chalk.yellow('Line #' + lineIndex + ': [WARN] No list entity definition found for entity:' + previousSection.split(/\r\n/)[0] + '\n'));
                --lineIndex;
            }
            sectionsInFile.push(previousSection);
            break;
    }
    return sectionsInFile;
};

module.exports = helpers;
