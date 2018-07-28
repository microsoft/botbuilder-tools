/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const retCode = require('./enums/errorCodes');
const parserConsts = require('./enums/parserconsts');
const exception = require('ludown').helperClasses.Exception;
const parserHelper = {
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
            // skip line if it is just a comment
            if(currentLine.indexOf(parserConsts.COMMENT) === 0) continue;

            // skip line if it is blank
            if(currentLine === '') continue;

            // is this a FILEREF or URLREF section? 
            if((currentLine.indexOf(parserConsts.FILEREF) === 0)) {
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
            } else if((currentLine.indexOf(parserConsts.INTENT) === 0)) {
                if(currentLine.indexOf(' ') === -1) {
                    ++lineIndex;
                    throw(new exception(retCode.INVALID_TEMPLATE, 'Error: Line #' + lineIndex + '. "' + currentLine + '" does not have valid template definition'));
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
                currentSectionType = parserConsts.INTENT;
                currentSection = currentLine + NEWLINE;
            } else if((currentLine.indexOf(parserConsts.ENTITY) === 0)) {
                // handle anything in currentSection buffer
                if(currentSection !== null) {
                    let previousSection = currentSection.substring(0, currentSection.lastIndexOf(NEWLINE));
                    try {
                        sectionsInFile = validateAndPushCurrentBuffer(previousSection, sectionsInFile, currentSectionType, lineIndex, log);
                    } catch (err) {
                        throw(err);
                    }
                } 
                if(currentLine.toLowerCase().includes(':')) {
                    currentSectionType = parserConsts.ENTITY;
                    currentSection = currentLine + NEWLINE;
                } else {
                    ++lineIndex;
                    throw (new exception(retCode.INVALID_ENTITY_DEFINITION, 'Error: Line #' + lineIndex + ' does not have a valid entity definition. "' + currentLine + '"'));
                }
            } else {
                if(middleOfSection) {
                    currentSection += currentLine + NEWLINE;
                } else {
                    ++lineIndex;
                    throw(new exception(retCode.INVALID_INPUT,'Error: Line #' + lineIndex + ' is not part of a Template or entity definition'));
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
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
var validateAndPushCurrentBuffer = function(previousSection, sectionsInFile, currentSectionType, lineIndex, log) {
    switch(currentSectionType) {
        case parserConsts.INTENT:
            // warn if there isnt at least one utterance in an intent
            if(previousSection.split(/\r\n/).length === 1)  {
                ++lineIndex;
                throw(new exception(retCode.INVALID_INPUT, 'Line #' + lineIndex + ': [ERR] No variations or conditions found for template: ' + previousSection.split(/\r\n/)[0]));
            }
            sectionsInFile.push(previousSection);
            break;
        case parserConsts.ENTITY:
        default: 
            sectionsInFile.push(previousSection);   
            break;
    }
    return sectionsInFile;
};