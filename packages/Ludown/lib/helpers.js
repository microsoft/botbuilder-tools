#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
require('./utils');
const fs = require('fs');
const path = require('path');
const PARSERCONSTS = require('./enums/parserconsts');
const chalk = require('chalk');
const retCode = require('./enums/CLI-errors');
const exception = require('./classes/exception');
const LUISBuiltInTypes = require('./enums/luisbuiltintypes').consolidatedList;
const NEWLINE = require('os').EOL;
const ANY_NEWLINE = /\r\n|\r|\n/g;
const url = require('url');
const helpers = {

    /**
     * 
     * @param {string} fileContent string content of file may contain any new line chars.
     * @returns {string} string content of file using current OS new line char
     */
    sanitizeNewLines(fileContent) {
        return fileContent.replace(ANY_NEWLINE, NEWLINE);
    },

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
     * Helper function to parse link URIs in utterances
     * @param {String} utterance
     * @returns {Object} Object that contains luFile and ref. ref can be Intent-Name or ? or * or **
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    parseLinkURI : function(utterance) {
        let reference = '';
        let luFileInRef = '';
        let linkValueList = utterance.trim().match(new RegExp(/\(.*?\)/g));
        let linkValue = linkValueList[0].replace('(', '').replace(')', '');
        if (linkValue === '') throw (new exception(retCode.errorCode.INVALID_LU_FILE_REF, `[ERROR]: Invalid LU File Ref: "${utterance}"`));
        let parseUrl = url.parse(linkValue);
        if (parseUrl.host || parseUrl.hostname) throw (new exception(retCode.errorCode.INVALID_LU_FILE_REF, `[ERROR]: Invalid LU File Ref: "${utterance}". \n Reference cannot be a URI`));
        // reference can either be #<Intent-Name> or #? or /*#? or /**#?
        let splitReference = linkValue.split(new RegExp(/(.*?)(#|\*+)/g));
        if(splitReference.length === 1) throw (new exception(retCode.errorCode.INVALID_LU_FILE_REF, `[ERROR]: Invalid LU File Ref: "${utterance}".\n Reference needs a qualifier - either a #Intent-Name or #?`));
        luFileInRef = splitReference[1];
        switch(splitReference[2]) {
            case '#':{
                reference = splitReference[3];
                break;
            }
            case '**': 
            case '*': {
                if(splitReference[6] !== '?') throw (new exception(retCode.errorCode.INVALID_LU_FILE_REF, `[ERROR]: Invalid LU File Ref: "${utterance}".\n '*' and '**' can only be used with QnA qualitifier. e.g. *#? and **#?`));
                reference = splitReference[6];
                luFileInRef = luFileInRef + '*';
                break;
            }
            default:
            throw (new exception(retCode.errorCode.INVALID_LU_FILE_REF, `[ERROR]: Invalid LU File Ref: "${utterance}".\n Unsupported syntax. Not expecting ${splitReference[2]}`));
        }
        if (reference === "" && splitReference.length >= 7 && splitReference[7].toLowerCase() === 'utterances') reference = splitReference[7].toLowerCase();
        if (reference === "" && splitReference.length >= 7 && splitReference[7].toLowerCase() === 'patterns') reference = splitReference[7].toLowerCase();
        if (reference === "" && splitReference.length >= 7 && splitReference[7].toLowerCase() === 'utterancesandpatterns') reference = splitReference[7].toLowerCase();

        return {
            luFile: luFileInRef,
            ref: reference
        }
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
        fileContent = helpers.sanitizeNewLines(fileContent);
        let linesInFile = fileContent.split(NEWLINE);
        let currentSection = '';
        let middleOfSection = false;
        let sectionsInFile = [];
        let currentSectionType = null; //PARSERCONSTS
        let inQnAAnswer = false;
        let lineIndex = 0;
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
            if(currentLine.indexOf(PARSERCONSTS.COMMENT) === 0) {
                // Add support to parse application metadata if found
                let info = currentLine.split(/>[ ]*!#/g);
                if (info === undefined || info.length === 1) continue;
                if (currentSection !== null) {
                    let previousSection = currentSection.substring(0, currentSection.lastIndexOf(NEWLINE));
                    try {
                        sectionsInFile = validateAndPushCurrentBuffer(previousSection, sectionsInFile, currentSectionType, lineIndex, log);
                    } catch (err) {
                        throw (err);
                    }
                }
                currentSection = PARSERCONSTS.MODELINFO + info[1].trim() + NEWLINE;
                currentSectionType = PARSERCONSTS.MODELINFO;
                continue;
            }

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
                // is this a valid entity definition? 
                // Entities must have $<entityName>:<entityType> format
                // List entities have $<entityName>:<normalizedvalue>= format
                // Phrase list entities have $<entityName>:phraseList format
                // only list entity and phrase list entity types can have multi-line definition
                if(currentLine.toLowerCase().includes(':')) {
                    // get entity name and type
                    // Fix for #1137. 
                    // Current code did not account for ':' in normalized values of list entities
                    let entityDef = currentLine.replace(PARSERCONSTS.ENTITY, '');
                    let entityType = entityDef.slice(entityDef.indexOf(':') + 1).trim();
                    // is entityType a phraseList? 
                    if(entityType.trim().toLowerCase().includes('phraselist') || entityType.trim().toLowerCase().includes('qna-alterations')) {
                        middleOfSection = true;
                        currentSectionType = PARSERCONSTS.ENTITY;
                        currentSection = currentLine + NEWLINE;
                    } else if(LUISBuiltInTypes.includes(entityType.trim()) || entityType.trim().toLowerCase() === 'simple') {
                        // this is a built in type definition. Just add it.
                        sectionsInFile.push(currentLine);
                        middleOfSection = false;
                        currentSection = null;
                    } else if((currentLine.indexOf('=') >= 0)) {
                        let getRolesAndType = this.getRolesAndType(entityType);
                        // this is a list entity type
                        if(getRolesAndType.entityType.trim().endsWith('=')){
                            middleOfSection = true;
                            currentSectionType = PARSERCONSTS.ENTITY;
                            currentSection = currentLine + NEWLINE;
                        } else {
                            // this has inline role definition
                            sectionsInFile.push(currentLine);
                            middleOfSection = false;
                            currentSection = null;
                        }
                    } else if (entityType.startsWith('/') && entityType.endsWith('/')) {
                        // this is a regex entity.
                        sectionsInFile.push(currentLine);
                        middleOfSection = false;
                        currentSection = null;
                    } else if (entityType.startsWith('[') && entityType.endsWith(']')) {
                        // this is a composite entity.
                        sectionsInFile.push(currentLine);
                        middleOfSection = false;
                        currentSection = null;
                    } else {
                        throw (new exception(retCode.errorCode.INVALID_INPUT, '[ERROR] Invalid entity definition for ' + currentLine));
                    }
                } else {
                    throw (new exception(retCode.errorCode.INVALID_INPUT, '[ERROR] Invalid entity definition for ' + currentLine));
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
            let previousSection = currentSection.substring(0, currentSection.lastIndexOf(NEWLINE));
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
    },
    /**
     * Helper function to get roles if defined via the entity type definition
     * @param {String} entityType entity type definition passed in.
     * @returns {Object} roles and entityType parsed out. roles is always a list even if no role definitions are found
     */
    getRolesAndType : function (entityType) {
        let returnValue = {
            roles : [],
            entityType : ''
        };
        let RoleDetectionRegEx = new RegExp(/[Rr]ole[s]*[\s?]*=/g);
        let RolesSplitRegEx = new RegExp(/[;,]/g);
        let [parsedEntityType, parsedRoleDefinition] = entityType.split(RoleDetectionRegEx).map(item => item.trim());
        returnValue.entityType = parsedEntityType;
        if (parsedRoleDefinition !== undefined) {
            returnValue.roles = parsedRoleDefinition.replace('[', '').replace(']', '').split(RolesSplitRegEx).map(item => item.trim());
        }
        return returnValue;
    },

    /**
     * Custom implementation of the String.split() function that does not drop parts of the string if a limit is used.
     * If a string can be split into more substrings than the provided limit,
     * the left-over text is returned as part of the last array element.
     * @param {String} string The string to split.
     * @param {String} separator The separator string to split on.
     * @param {Number} limit The maximum number of substrings to return.
     */
    split: function (string, separator, limit) {
        const parts = [];
        let i = 0;
        if (separator.length === 0) {
            while (i < string.length && (limit === undefined || parts.length < limit)) {
                parts.push(string.substring(i, i + 1));
                ++i;
            }
            if (i < string.length && parts.length !== 0) {
                parts[parts.length - 1] += string.substring(i);
            }
        } else {
            let found;
            while (i < string.length
                    && (limit === undefined || parts.length < limit)
                    && (found = string.indexOf(separator, i)) >= 0) {
                parts.push(string.substring(i, found));
                i = found + separator.length;
            }
            if (limit === undefined || parts.length < limit) {
                parts.push(string.substring(i));
            } else if (parts.length !== 0) {
                parts[parts.length - 1] += string.substring(i - separator.length);
            }
        }
        return parts;
    },
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
    previousSection = helpers.sanitizeNewLines(previousSection);
    switch(currentSectionType) {
    case PARSERCONSTS.INTENT:
        // warn if there isnt at least one utterance in an intent
        if(previousSection.split(NEWLINE).length === 1)  {
            ++lineIndex;
            if(previousSection.split(NEWLINE)[0].includes('?')) {
                throw(new exception(retCode.errorCode.INVALID_LINE, 'Line #' + lineIndex + ': [ERR] No answer found for question: ' + previousSection.split(NEWLINE)[0]));
            } else {
                if(log) process.stdout.write(chalk.yellow('Line #' + lineIndex + ': [WARN] No utterances found for intent: ' + previousSection.split(NEWLINE)[0] + NEWLINE));
            }
            --lineIndex;
        }
        sectionsInFile.push(previousSection);
        break;
    case PARSERCONSTS.ENTITY:
        // warn if there isnt at least one synonym for a list entity
        if(previousSection.split(NEWLINE).length === 1)  {
            ++lineIndex;
            if(log) process.stdout.write(chalk.yellow('Line #' + lineIndex + ': [WARN] No synonyms list found for list entity:' + previousSection.split(NEWLINE)[0] + NEWLINE));
            --lineIndex;
        }
        sectionsInFile.push(previousSection);
        break;
    case PARSERCONSTS.MODELINFO:
        sectionsInFile.push(previousSection);
        break;
    }
    return sectionsInFile;
};

module.exports = helpers;
