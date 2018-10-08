#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const fetch = require('node-fetch');
const PARSERCONSTS = require('./enums/parserconsts');
const retCode = require('./enums/CLI-errors');
const chalk = require('chalk');
const helperClasses = require('./classes/hclasses');
const exception = require('./classes/exception');
const helpers = require('./helpers');
const NEWLINE = require('os').EOL;
const utils = require('./utils');
const translateHelpers = {
    /**
     * Helper function to parseAndTranslate lu file content
     * @param {string} fileContent file content
     * @param {string} subscriptionKey translate text API key
     * @param {string} to_lang language code to translate content to
     * @param {string} src_lang language code for source content
     * @param {boolean} translate_comments translate comments in .lu files if this is set to true
     * @param {boolean} translate_link_text translate URL or LU reference link text in .lu files if this is set to true
     * @param {boolean} log indicates if this function should write verbose messages to process.stdout
     * @returns {string} Localized file content
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    parseAndTranslate : async function(fileContent, subscriptionKey, to_lang, src_lang, translate_comments, translate_link_text, log) {
        fileContent = helpers.sanitizeNewLines(fileContent);
        let linesInFile = fileContent.split(NEWLINE);
        let localizedContent = '';
        let currentSectionType = '';
        let data = '';
        let lText = '';
        for(let lineIndex in linesInFile) {
            let currentLine = linesInFile[lineIndex].trim();
            // is current line a comment? 
            if(currentLine.indexOf(PARSERCONSTS.COMMENT) === 0) {
                if(translate_comments) {
                    try {
                        data = await translateHelpers.translateText(currentLine, subscriptionKey, to_lang, src_lang);
                    } catch (err) {
                        throw(err);
                    }
                    localizedContent += data[0].translations[0].text + NEWLINE;
                    if(log) process.stdout.write(chalk.default.gray(data[0].translations[0].text + NEWLINE));
                } else {
                    localizedContent += currentLine + NEWLINE;
                    if(log) process.stdout.write(chalk.default.gray(currentLine + NEWLINE));
                }
            } else if (currentLine.indexOf(PARSERCONSTS.INTENT) === 0) {
                let intentName = currentLine.substring(currentLine.indexOf(' ') + 1).trim();
                //is this a QnA? 
                if(intentName.indexOf(PARSERCONSTS.QNA) === 0) {
                    let beforeQuestion = currentLine.substring(0, currentLine.indexOf(' ') + 1);
                    let question = intentName.slice(1).trim();
                    try {
                        data = await translateHelpers.translateText(question, subscriptionKey, to_lang, src_lang);
                    } catch (err) {
                        throw(err);
                    }
                    lText = data[0].translations[0].text;
                    localizedContent += beforeQuestion + '? ' + lText + NEWLINE;
                    if(log) process.stdout.write(chalk.default.gray(beforeQuestion + '? ' + lText + NEWLINE));
                    currentSectionType = PARSERCONSTS.QNA;
                } else {
                    // we would not localize intent name but remember we are under intent section
                    currentSectionType = PARSERCONSTS.INTENT;
                    localizedContent += currentLine + NEWLINE;
                    if(log) process.stdout.write(chalk.default.gray(currentLine + NEWLINE));
                }
                
            } else if(currentLine.indexOf('-') === 0 || 
                    currentLine.indexOf('*') === 0 || 
                    currentLine.indexOf('+') === 0 ) {
                let listSeparator = '';
                let content = '';
                switch (currentSectionType) {
                case PARSERCONSTS.INTENT: {
                    // strip line of the list separator
                    listSeparator = currentLine.charAt(0);
                    content = currentLine.slice(1).trim();
                    let entitiesList = [];
                    // strip line off labelled entity values,mark pattern any entities as not to localize
                    if (content.includes('{')) {
                        const entityRegex = new RegExp(/\{(.*?)\}/g);
                        let entitiesFound = content.match(entityRegex);
                        let eStartIndex = -1;
                        let eEndIndex = -1;
                        let entity;
                        for (var entityIdx in entitiesFound) {
                            entity = entitiesFound[entityIdx];
                            let lEntity = entity.replace('{', '').replace('}', '');
                            let labelledValue = '';
                            let updatedUtteranceLeft = content.substring(0, content.indexOf(entity));
                            let updatedUtteranceRight = content.substring(content.indexOf(entity) + entity.length);
                            // is this a labelled value? 
                            if (lEntity.includes('=')) {
                                let entitySplit = lEntity.split('=');
                                if (entitySplit.length > 2) {
                                    throw (new exception(retCode.errorCode.INVALID_INPUT, '[ERROR]: Nested entity references are not supported in utterance: ' + content));
                                }
                                lEntity = entitySplit[0].trim();
                                labelledValue = entitySplit[1].trim();
                                eStartIndex = content.indexOf(entity);
                                eEndIndex = eStartIndex + labelledValue.length - 1;
                                content = updatedUtteranceLeft + labelledValue + updatedUtteranceRight;
                                entitiesList.push(new helperClasses.entity(lEntity, labelledValue, eStartIndex, eEndIndex));
                            } else {
                                // This is a pattern entity without a labelled value. Do not localize this.
                                eStartIndex = content.indexOf(lEntity) - 1;
                                eEndIndex = eStartIndex + lEntity.length - 1;
                                content = updatedUtteranceLeft + lEntity + updatedUtteranceRight;
                                entitiesList.push(new helperClasses.entity(lEntity, null, eStartIndex, eEndIndex));
                            }
                        }
                    }
                    let offset = 0;
                    let localizedUtterance = '';
                    let candidateText = '';
                    // Tokenize the input utterance.
                    for (var idx in entitiesList) {
                        let entity = entitiesList[idx];
                        if (entity.start < 0) entity.start = 0;
                        if (entity.start !== offset) {
                            candidateText = content.substring(offset, entity.start);
                            if (candidateText.trim() !== '') {
                                try {
                                    data = await translateHelpers.translateText(candidateText, subscriptionKey, to_lang, src_lang);
                                } catch (err) {
                                    throw (err);
                                }
                                localizedUtterance += data[0].translations[0].text;
                            } else {
                                localizedUtterance += candidateText;
                            }
                        }
                        try {
                            if (entity.value !== '') {
                                data = await translateHelpers.translateText(content.substring(entity.start, entity.end + 1), subscriptionKey, to_lang, src_lang);
                            }
                        } catch (err) {
                            throw (err);
                        }
                        if (entity.value !== '') {
                            localizedUtterance += '{' + entity.entity + '=' + data[0].translations[0].text + '}';
                        } else {
                            localizedUtterance += '{' + entity.entity + '}';
                        }
                        offset = entity.end + 1;
                    }
                    if (offset !== content.length) {
                        candidateText = content.substring(offset);
                        if (candidateText.trim() !== '') {
                            try {
                                data = await translateHelpers.translateText(candidateText, subscriptionKey, to_lang, src_lang);
                            } catch (err) {
                                throw (err);
                            }
                            localizedUtterance += data[0].translations[0].text;
                        } else {
                            localizedUtterance += candidateText;
                        }
                    }
                    localizedContent += listSeparator + ' ' + localizedUtterance + NEWLINE;
                    if (log) process.stdout.write(chalk.default.gray(listSeparator + ' ' + localizedUtterance + NEWLINE));
                }
                break;
                case PARSERCONSTS.ENTITY:
                    // strip line of the list separator
                    listSeparator = currentLine.charAt(0);
                    content = currentLine.slice(1).trim();
                    try {
                        data = await translateHelpers.translateText(content, subscriptionKey, to_lang, src_lang);
                    } catch (err) {
                        throw (err);
                    }
                    lText = data[0].translations[0].text;
                    localizedContent += listSeparator + ' ' + lText + NEWLINE;
                    if (log) process.stdout.write(chalk.default.gray(listSeparator + ' ' + lText + NEWLINE));
                    break;
                case PARSERCONSTS.QNA:
                default:
                    // strip line of the list separator
                    listSeparator = currentLine.charAt(0);
                    content = currentLine.slice(1).trim();
                    try {
                        data = await translateHelpers.translateText(content, subscriptionKey, to_lang, src_lang);
                    } catch (err) {
                        throw (err);
                    }
                    lText = data[0].translations[0].text;
                    localizedContent += listSeparator + ' ' + lText + NEWLINE;
                    if (log) process.stdout.write(chalk.default.gray(listSeparator + ' ' + lText + NEWLINE));
                    break;
                }
            } else if(currentLine.indexOf(PARSERCONSTS.ENTITY) === 0) {
                // we need to localize qna alterations if specified.
                let entityDef = currentLine.replace(PARSERCONSTS.ENTITY, '').split(':');
                let entityName = entityDef[0];
                let entityType = entityDef[1];
                if(entityType.includes(PARSERCONSTS.QNAALTERATIONS)) {
                    // localize entityName
                    try {
                        data = await translateHelpers.translateText(entityName.trim(), subscriptionKey, to_lang, src_lang);
                    } catch (err) {
                        throw(err);
                    }
                    lText = data[0].translations[0].text;
                    localizedContent += '$' + lText + ' : ' + PARSERCONSTS.QNAALTERATIONS + ' = ' + NEWLINE;
                    currentSectionType = PARSERCONSTS.ENTITY;
                    if(log) process.stdout.write(chalk.default.gray('$' + lText + ' : ' + PARSERCONSTS.QNAALTERATIONS + ' = ' + NEWLINE));
                } else {
                    // we would not localize entity line but remember we are under entity section for list entities
                    currentSectionType = PARSERCONSTS.ENTITY;
                    localizedContent += currentLine + NEWLINE;
                    if(log) process.stdout.write(chalk.default.gray(currentLine + NEWLINE));
                }
            } else if(currentLine.indexOf(PARSERCONSTS.ANSWER) === 0) {
                localizedContent += currentLine + NEWLINE;
                if(log) process.stdout.write(chalk.default.gray(currentLine + NEWLINE));
                currentSectionType = PARSERCONSTS.ANSWER;
            } else if (currentLine.indexOf(PARSERCONSTS.URLORFILEREF) ===0) {
                currentSectionType = PARSERCONSTS.URLORFILEREF;
                if(translate_link_text) {
                    const linkValueRegEx = new RegExp(/\(.*?\)/g);
                    let linkValueList = currentLine.trim().match(linkValueRegEx);
                    let linkValue = linkValueList[0].replace('(','').replace(')','');
                    const linkTextRegEx = new RegExp(/\[.*\]/g);
                    let linkTextList = currentLine.trim().match(linkTextRegEx);
                    let linkTextValue = linkTextList[0].replace('[','').replace(']','');
                    try {
                        data = await translateHelpers.translateText(linkTextValue, subscriptionKey, to_lang, src_lang);
                    } catch (err) {
                        throw(err);
                    }
                    lText = data[0].translations[0].text;
                    localizedContent += '[' + lText + ']' + '(' + linkValue + ')' + NEWLINE;
                    if(log) process.stdout.write(chalk.default.gray('[' + lText + ']' + '(' + linkValue + ')' + NEWLINE));
                } else {
                    localizedContent += currentLine + NEWLINE;
                    if(log) process.stdout.write(chalk.default.gray(currentLine + NEWLINE));
                }
            } else if(currentLine === '') {
                localizedContent += NEWLINE;
                if(log) process.stdout.write(chalk.default.gray(NEWLINE));
            } else {
                if(currentSectionType === PARSERCONSTS.ANSWER) {
                    try {
                        data = await translateHelpers.translateText(currentLine, subscriptionKey, to_lang, src_lang);
                    } catch (err) {
                        throw(err);
                    }
                    lText = data[0].translations[0].text;
                    localizedContent += lText + NEWLINE;
                    if(log) process.stdout.write(chalk.default.gray(lText + NEWLINE));
                } else {
                    throw(new exception(retCode.errorCode.INVALID_INPUT_FILE, 'Error: Unexpected line encountered when parsing \n' + '[' + lineIndex + ']:' + currentLine));
                }
            }
        }
        return localizedContent;
    },
    /**
     * Helper function to call MT rest API to translate content
     * @param {string} text Text to translate
     * @param {string} subscriptionKey user provided subscription to text translation API
     * @param {string} to_lang target language to localize to
     * @param {string} from_lang source language of text
     * @returns {object} response from MT call.
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    translateText: async function(text, subscriptionKey, to_lang, from_lang) {
        let tUri = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=' + to_lang + '&includeAlignment=true';
        if(from_lang) tUri += '&from=' + from_lang;
        const options = {
            method: 'POST',
            body: JSON.stringify ([{'Text' : text}]),
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key' : subscriptionKey,
                'X-ClientTraceId' : get_guid (),
            }
        };
        const res = await fetch(tUri, options);
        if (!res.ok) {
            throw(new exception(retCode.errorCode.TRANSLATE_SERVICE_FAIL,'Text translator service call failed with [' + res.status + '] : ' + res.statusText + '.\nPlease check key & language code validity'));
        }
        let data = await res.json();
        return data;
    }
}

/**
 * Helper function to create a random guid
  * @returns {string} GUID
 */
const get_guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = translateHelpers;
