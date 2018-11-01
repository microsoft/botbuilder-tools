#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
require('./utils');
const fetch = require('node-fetch');
const PARSERCONSTS = require('./enums/parserconsts');
const retCode = require('./enums/CLI-errors');
const chalk = require('chalk');
const helperClasses = require('./classes/hclasses');
const exception = require('./classes/exception');
const helpers = require('./helpers');
const NEWLINE = require('os').EOL;
const MAX_TRANSLATE_BATCH_SIZE = 25;
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
     * @param {number} batch_translate indicates number of input lines to batch up before calling translation API
     * @returns {string} Localized file content
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    parseAndTranslate : async function(fileContent, subscriptionKey, to_lang, src_lang, translate_comments, translate_link_text, log, batch_translate) {
        let batch_translate_size = batch_translate ? parseInt(batch_translate) : MAX_TRANSLATE_BATCH_SIZE;
        fileContent = helpers.sanitizeNewLines(fileContent);
        let linesInFile = fileContent.split(NEWLINE);
        let linesToTranslate = [];
        let localizedContent = '';
        let currentSectionType = '';
        let inAnswer = false;
        let lineCtr = 0;
        for(let lineIndex in linesInFile) {
            lineCtr++;
            let currentLine = linesInFile[lineIndex].trim();
            // is current line a comment? 
            if(currentLine.indexOf(PARSERCONSTS.COMMENT) === 0) {
                if (inAnswer) {
                    linesToTranslate.push(new helperClasses.translateLine(currentLine, true));
                    linesToTranslate.push(new helperClasses.translateLine(NEWLINE, false));
                    continue;
                }
                if(translate_comments) {
                    linesToTranslate.push(new helperClasses.translateLine(currentLine, true));
                } else {
                    linesToTranslate.push(new helperClasses.translateLine(currentLine, false));
                }
            } else if (currentLine.indexOf(PARSERCONSTS.FILTER) === 0) {
                linesToTranslate.push(new helperClasses.translateLine(currentLine, false));
                currentSectionType = PARSERCONSTS.FILTER;
            } else if (currentLine.indexOf(PARSERCONSTS.INTENT) === 0) {
                if (inAnswer) {
                    linesToTranslate.push(new helperClasses.translateLine(currentLine, true));
                    linesToTranslate.push(new helperClasses.translateLine(NEWLINE, false));
                    continue;
                }
                let intentName = currentLine.substring(currentLine.indexOf(' ') + 1).trim();
                //is this a QnA? 
                if(intentName.indexOf(PARSERCONSTS.QNA) === 0) {
                    let beforeQuestion = currentLine.substring(0, currentLine.indexOf(' ') + 1);
                    let question = intentName.slice(1).trim();
                    linesToTranslate.push(new helperClasses.translateLine(beforeQuestion + '? ', false));
                    linesToTranslate.push(new helperClasses.translateLine(question, true));
                    currentSectionType = PARSERCONSTS.QNA;
                } else {
                    // we would not localize intent name but remember we are under intent section
                    currentSectionType = PARSERCONSTS.INTENT;
                    linesToTranslate.push(new helperClasses.translateLine(currentLine, false));
                }
            } else if(currentLine.indexOf('-') === 0 || 
                    currentLine.indexOf('*') === 0 || 
                    currentLine.indexOf('+') === 0 ) {
                if (inAnswer) {
                    linesToTranslate.push(new helperClasses.translateLine(currentLine, true));
                    linesToTranslate.push(new helperClasses.translateLine(NEWLINE, false));
                    continue;
                }
                let listSeparator = '';
                let content = '';
                switch (currentSectionType) {
                case PARSERCONSTS.INTENT: {
                    // strip line of the list separator
                    listSeparator = currentLine.charAt(0);
                    linesToTranslate.push(new helperClasses.translateLine(listSeparator + ' ', false));
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
                                linesToTranslate.push(new helperClasses.translateLine(candidateText, true));
                            } else {
                                linesToTranslate.push(new helperClasses.translateLine(candidateText, false));
                                localizedUtterance += candidateText;
                            }
                        }
                        if (entity.value !== '') {
                            linesToTranslate.push(new helperClasses.translateLine(' {' + entity.entity + '=', false));
                            linesToTranslate.push(new helperClasses.translateLine(content.substring(entity.start, entity.end + 1).trim(), true));
                            linesToTranslate.push(new helperClasses.translateLine('} ', false));
                        } else {
                            linesToTranslate.push(new helperClasses.translateLine(' {' + entity.entity + '} ', false));
                        }
                        offset = entity.end + 1;
                    }
                    if (offset !== content.length) {
                        candidateText = content.substring(offset);
                        if (candidateText.trim() !== '') {
                            linesToTranslate.push(new helperClasses.translateLine(candidateText.trim(), true));
                        } else {
                            linesToTranslate.push(new helperClasses.translateLine(candidateText, false));
                        }
                    }
                }
                break;
                case PARSERCONSTS.ENTITY:
                case PARSERCONSTS.QNA:
                default:
                    // strip line of the list separator
                    listSeparator = currentLine.charAt(0);
                    content = currentLine.slice(1).trim();
                    linesToTranslate.push(new helperClasses.translateLine(listSeparator + ' ', false));
                    linesToTranslate.push(new helperClasses.translateLine(content, true));
                    break;
                }
            } else if(currentLine.indexOf(PARSERCONSTS.ENTITY) === 0) {
                if (inAnswer) {
                    linesToTranslate.push(new helperClasses.translateLine(currentLine, true));
                    linesToTranslate.push(new helperClasses.translateLine(NEWLINE, false));
                    continue;
                }
                // we need to localize qna alterations if specified.
                let entityDef = currentLine.replace(PARSERCONSTS.ENTITY, '').split(':');
                let entityName = entityDef[0];
                let entityType = entityDef[1];
                if(entityType.includes(PARSERCONSTS.QNAALTERATIONS)) {
                    linesToTranslate.push(new helperClasses.translateLine('$', false));
                    linesToTranslate.push(new helperClasses.translateLine(entityName.trim(), true));
                    linesToTranslate.push(new helperClasses.translateLine(' : ' + PARSERCONSTS.QNAALTERATIONS + ' = ', false));
                    currentSectionType = PARSERCONSTS.ENTITY;
                } else {
                    // we would not localize entity line but remember we are under entity section for list entities
                    linesToTranslate.push(new helperClasses.translateLine(currentLine, false));
                }
            } else if(currentLine.indexOf(PARSERCONSTS.ANSWER) === 0) {
                if (inAnswer) {
                    answerData = '';
                }
                linesToTranslate.push(new helperClasses.translateLine(currentLine, false));
                inAnswer = !inAnswer;
                currentSectionType = PARSERCONSTS.ANSWER;
            } else if (currentLine.indexOf(PARSERCONSTS.URLORFILEREF) ===0) {
                if (inAnswer) {
                    linesToTranslate.push(new helperClasses.translateLine(currentLine, true));
                    linesToTranslate.push(new helperClasses.translateLine(NEWLINE, false));
                    //answerData += currentLine + NEWLINE;
                    continue;
                }
                currentSectionType = PARSERCONSTS.URLORFILEREF;
                if(translate_link_text) {
                    const linkValueRegEx = new RegExp(/\(.*?\)/g);
                    let linkValueList = currentLine.trim().match(linkValueRegEx);
                    let linkValue = linkValueList[0].replace('(','').replace(')','');
                    const linkTextRegEx = new RegExp(/\[.*\]/g);
                    let linkTextList = currentLine.trim().match(linkTextRegEx);
                    let linkTextValue = linkTextList[0].replace('[','').replace(']','');
                    // try {
                    //     data = await translateHelpers.translateText(linkTextValue, subscriptionKey, to_lang, src_lang);
                    // } catch (err) {
                    //     throw(err);
                    // }
                    // lText = data[0].translations[0].text;
                    linesToTranslate.push(new helperClasses.translateLine('[', false));
                    linesToTranslate.push(new helperClasses.translateLine(linkTextValue, true));
                    linesToTranslate.push(new helperClasses.translateLine(']', false));
                    linesToTranslate.push(new helperClasses.translateLine('(' + linkValue + ')', false));
                    // localizedContent += '[' + lText + ']' + '(' + linkValue + ')' + NEWLINE;
                    // if(log) process.stdout.write(chalk.default.gray('[' + lText + ']' + '(' + linkValue + ')' + NEWLINE));
                } else {
                    linesToTranslate.push(new helperClasses.translateLine(currentLine, false));
                    // localizedContent += currentLine + NEWLINE;
                    // if(log) process.stdout.write(chalk.default.gray(currentLine + NEWLINE));
                }
            } else if(currentLine === '') {
                if (inAnswer) {
                    linesToTranslate.push(new helperClasses.translateLine(NEWLINE, false));
                    continue;
                }
            } else {
                if (inAnswer) {
                    linesToTranslate.push(new helperClasses.translateLine(currentLine, true));
                    linesToTranslate.push(new helperClasses.translateLine(NEWLINE, false));
                    continue;
                } else {
                    throw(new exception(retCode.errorCode.INVALID_INPUT_FILE, 'Error: Unexpected line encountered when parsing \n' + '[' + lineIndex + ']:' + currentLine));
                }
            }
            linesToTranslate.push(new helperClasses.translateLine(NEWLINE, false));
            // do we have any payload to localize? and have we hit the batch size limit?
            if ((linesToTranslate.length !== 0) && (lineCtr % batch_translate_size === 0)) {
                try {
                    localizedContent += await this.batchTranslateText(linesToTranslate, subscriptionKey, to_lang, src_lang, log);
                    linesToTranslate = [];
                } catch (err) {
                    throw (err)
                }
            }
        }
        if (linesToTranslate.length !== 0) {
            try {
                localizedContent += await this.batchTranslateText(linesToTranslate, subscriptionKey, to_lang, src_lang, log);
                linesToTranslate = [];
            } catch (err) {
                throw (err)
            }
        }
        return localizedContent;
    },
    /**
     * Helper function to batch translate 
     * @param {translateLine []} linesToTranslate translaste line objects of lines to translate
     * @param {string} subscriptionKey translate text API key
     * @param {string} to_lang language code to translate content to
     * @param {string} src_lang language code for source content
     * @param {boolean} log indicates if this function should write verbose messages to process.stdout
     * @returns {string} Localized file content
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    batchTranslateText: async function(linesToTranslate, subscriptionKey, to_lang, src_lang, log) {
        let retValue = '';
        if (linesToTranslate.length === 0) return retValue;
        let batchTranslateText = [];
        for (var itemIdx in linesToTranslate) {
            let item = linesToTranslate[itemIdx];
            if (item.localize) {
                item.idx = batchTranslateText.length;
                batchTranslateText.push({'Text' : item.text});
                if(batchTranslateText.length >= MAX_TRANSLATE_BATCH_SIZE) {
                    let data;
                    try {
                        data = await this.translateText(batchTranslateText, subscriptionKey, to_lang, src_lang);
                    } catch (err) {
                        throw (err);
                    }
                    data.forEach((item, idx) => {
                        // find the correponding item in linesToTranslate
                        let itemInLine = linesToTranslate.find(item => item.idx === idx);
                        itemInLine.text = item.translations[0].text;
                        itemInLine.idx = -1;
                    });
                    batchTranslateText = [];
                }
            }
        }
        if (batchTranslateText.length !== 0) {
            let data;
            try {
                data = await this.translateText(batchTranslateText, subscriptionKey, to_lang, src_lang);
            } catch (err) {
                throw (err);
            }
            data.forEach((item, idx) => {
                // find the correponding item in linesToTranslate
                let itemInLine = linesToTranslate.find(item => item.idx === idx);
                itemInLine.text = item.translations[0].text;
            });
        }
        linesToTranslate.forEach(item => retValue += item.text);
        if(log) process.stdout.write(chalk.default.gray(retValue));
        return retValue;
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
        let payload = Array.isArray(text) ? text : [{'Text' : text}];
        let tUri = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=' + to_lang + '&includeAlignment=true';
        if(from_lang) tUri += '&from=' + from_lang;
        const options = {
            method: 'POST',
            body: JSON.stringify (payload),
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
