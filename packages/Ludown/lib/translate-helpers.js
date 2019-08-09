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
const MAX_CHAR_IN_REQUEST = 4990;

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
                    this.addSegment(linesToTranslate, currentLine, true);
                    this.addSegment(linesToTranslate, NEWLINE, false);
                    continue;
                }
                if(translate_comments) {
                    this.addSegment(linesToTranslate, currentLine, true);
                } else {
                    this.addSegment(linesToTranslate, currentLine, false);
                }
            } else if (currentLine.indexOf(PARSERCONSTS.FILTER) === 0) {
                this.addSegment(linesToTranslate, currentLine, false);
                currentSectionType = PARSERCONSTS.FILTER;
            } else if (currentLine.indexOf(PARSERCONSTS.INTENT) === 0) {
                if (inAnswer) {
                    this.addSegment(linesToTranslate, currentLine, true);
                    this.addSegment(linesToTranslate, NEWLINE, false);
                    continue;
                }
                let intentName = currentLine.substring(currentLine.indexOf(' ') + 1).trim();
                //is this a QnA? 
                if(intentName.indexOf(PARSERCONSTS.QNA) === 0) {
                    let beforeQuestion = currentLine.substring(0, currentLine.indexOf(' ') + 1);
                    let question = intentName.slice(1).trim();
                    this.addSegment(linesToTranslate, beforeQuestion + '? ', false);
                    this.addSegment(linesToTranslate, question, true);
                    currentSectionType = PARSERCONSTS.QNA;
                } else {
                    // we would not localize intent name but remember we are under intent section
                    currentSectionType = PARSERCONSTS.INTENT;
                    this.addSegment(linesToTranslate, currentLine, false);
                }
            } else if(currentLine.indexOf('-') === 0 || 
                    currentLine.indexOf('*') === 0 || 
                    currentLine.indexOf('+') === 0 ) {
                if (inAnswer) {
                    this.addSegment(linesToTranslate, currentLine, true);
                    this.addSegment(linesToTranslate, NEWLINE, false);
                    continue;
                }
                // Fix for #1191. Do not localize meta-data filters for QnA.
                if (currentSectionType === PARSERCONSTS.FILTER) {
                    this.addSegment(linesToTranslate, currentLine, false);
                    this.addSegment(linesToTranslate, NEWLINE, false);
                    continue;
                }
                let listSeparator = '';
                let content = '';
                switch (currentSectionType) {
                case PARSERCONSTS.INTENT: {
                    // strip line of the list separator
                    listSeparator = currentLine.charAt(0);
                    this.addSegment(linesToTranslate, listSeparator + ' ', false);
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
                    let candidateText = '';
                    // Tokenize the input utterance.
                    for (var idx in entitiesList) {
                        let entity = entitiesList[idx];
                        if (entity.start < 0) entity.start = 0;
                        if (entity.start !== offset) {
                            candidateText = content.substring(offset, entity.start);
                            if (candidateText.trim() !== '') {
                                this.addSegment(linesToTranslate, candidateText, true);
                            } else {
                                this.addSegment(linesToTranslate, candidateText, false);
                            }
                        }
                        if (entity.value !== '') {
                            this.addSegment(linesToTranslate, ' {' + entity.entity + '=', false);
                            this.addSegment(linesToTranslate, content.substring(entity.start, entity.end + 1).trim(), true);
                            this.addSegment(linesToTranslate, '} ', false);
                        } else {
                            this.addSegment(linesToTranslate, ' {' + entity.entity + '} ', false);
                        }
                        offset = entity.end + 1;
                    }
                    if (offset !== content.length) {
                        candidateText = content.substring(offset);
                        if (candidateText.trim() !== '') {
                            this.addSegment(linesToTranslate, candidateText.trim(), true);
                        } else {
                            this.addSegment(linesToTranslate, candidateText, false);
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
                    this.addSegment(linesToTranslate, listSeparator + ' ', false);
                    this.addSegment(linesToTranslate, content, true);
                    break;
                }
            } else if(currentLine.indexOf(PARSERCONSTS.ENTITY) === 0) {
                if (inAnswer) {
                    this.addSegment(linesToTranslate, currentLine, true);
                    this.addSegment(linesToTranslate, NEWLINE, false);
                    continue;
                }
                // we need to localize qna alterations if specified.
                let entityDef = currentLine.replace(PARSERCONSTS.ENTITY, '').split(':');
                let entityName = entityDef[0];
                let entityType = entityDef[1];
                if(entityType.includes(PARSERCONSTS.QNAALTERATIONS)) {
                    this.addSegment(linesToTranslate, '$', false);
                    this.addSegment(linesToTranslate, entityName.trim(), true);
                    this.addSegment(linesToTranslate, ' : ' + PARSERCONSTS.QNAALTERATIONS + ' = ', false);
                    currentSectionType = PARSERCONSTS.ENTITY;
                } else {
                    // we would not localize entity line but remember we are under entity section for list entities
                    this.addSegment(linesToTranslate, currentLine, false);
                }
            } else if(currentLine.indexOf(PARSERCONSTS.ANSWER) === 0) {
                if (inAnswer) {
                    answerData = '';
                }
                this.addSegment(linesToTranslate, currentLine, false);
                inAnswer = !inAnswer;
                currentSectionType = PARSERCONSTS.ANSWER;
            } else if (currentLine.indexOf(PARSERCONSTS.URLORFILEREF) ===0) {
                if (inAnswer) {
                    this.addSegment(linesToTranslate, currentLine, true);
                    this.addSegment(linesToTranslate, NEWLINE, false);
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
                    this.addSegment(linesToTranslate, '[', false);
                    this.addSegment(linesToTranslate, linkTextValue, true);
                    this.addSegment(linesToTranslate, ']', false);
                    this.addSegment(linesToTranslate, '(' + linkValue + ')', false);
                } else {
                    this.addSegment(linesToTranslate, currentLine, false);
                }
            } else if(currentLine === '') {
                if (inAnswer) {
                    this.addSegment(linesToTranslate, NEWLINE, false);
                    continue;
                }
            } else {
                if (inAnswer) {
                    this.addSegment(linesToTranslate, currentLine, true);
                    this.addSegment(linesToTranslate, NEWLINE, false);
                    continue;
                } else {
                    throw(new exception(retCode.errorCode.INVALID_INPUT_FILE, 'Error: Unexpected line encountered when parsing \n' + '[' + lineIndex + ']:' + currentLine));
                }
            }
            this.addSegment(linesToTranslate, NEWLINE, false);
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
     * Helper function to break down input string if it is longer than MAX_CHAR_IN_REQUEST to translate API
     * @param {translateLine []} linesToTranslate Array of translateLine objects
     * @param {string} text text to translate
     * @param {boolean} localize indicates if the request should be localized or not.
     * @returns {void} 
     */
    addSegment: function (linesToTranslate, text, localize) {
        if (text.length >= MAX_CHAR_IN_REQUEST) {
            // break it up into smaller segments and add it to the batchRequest payload
            let splitRegExp = new RegExp(`(.{${MAX_CHAR_IN_REQUEST}})`);
            let splitLine = text.split(splitRegExp).filter(O => O);
            splitLine.forEach(item => {
                linesToTranslate.push(new helperClasses.translateLine(item, localize));
            })
        } else {
            linesToTranslate.push(new helperClasses.translateLine(text, localize));
        }
    },
    /**
     * Helper function to batch calls to translate API
     * @param {translateLine []} linesToTranslate Array of translateLine objects
     * @param {string} subscriptionKey translate text API key
     * @param {string} to_lang language code to translate content to
     * @param {string} src_lang language code for source content
     * @param {boolean} log indicates if this function should write verbose messages to process.stdout
     * @returns {string} translated content
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    batchTranslateText: async function(linesToTranslate, subscriptionKey, to_lang, src_lang, log) {
        // responsible for breaking localizable text into chunks that are 
        // - not more than 5000 characters in combined length 
        // - not more than 25 segments in one chunk
        let retValue = '';
        if (!Array.isArray(linesToTranslate) || linesToTranslate.length === 0) return retValue;
        let charCountInChunk = 0;
        let batchTranslate = [];
        for (var idx in linesToTranslate) {
            let item = linesToTranslate[idx];
            if (item.text.length + charCountInChunk >= MAX_CHAR_IN_REQUEST) {
                await this.translateAndMap(batchTranslate, subscriptionKey, to_lang, src_lang, linesToTranslate);
                batchTranslate = [];
                charCountInChunk = 0;
            }
            let currentBatchSize = batchTranslate.length > 0 ? batchTranslate.length : 1;
            if (currentBatchSize % MAX_TRANSLATE_BATCH_SIZE === 0) {
                await this.translateAndMap(batchTranslate, subscriptionKey, to_lang, src_lang, linesToTranslate);
                batchTranslate = [];
                charCountInChunk = 0;
            }
            if (item.localize) {
                item.idx = batchTranslate.length; 
                batchTranslate.push({'Text': item.text});
                charCountInChunk += item.text.length;
            }
        }
        if (batchTranslate.length !== 0) {
            await this.translateAndMap(batchTranslate, subscriptionKey, to_lang, src_lang, linesToTranslate);
            batchTranslate = [];
            charCountInChunk = 0;
        }
        linesToTranslate.forEach(item => retValue += item.text);
        if(log) process.stdout.write(chalk.default.gray(retValue));
        return retValue;
    },
    /**
     * Helper function to call translate and update text with localized result
     * @param {object []} batchRequest Array of {'Text':'value'} objects
     * @param {string} subscriptionKey translate text API key
     * @param {string} to_lang language code to translate content to
     * @param {string} src_lang language code for source content
     * @param {translateLine []} linesToTranslateCopy Array of translateLine objects
     * @returns {void} 
     */
    translateAndMap: async function (batchRequest, subscriptionKey, to_lang, src_lang, linesToTranslateCopy) {
        if (batchRequest.length === 0) return;
        let data;
        try {
            data = await this.translateText(batchRequest, subscriptionKey, to_lang, src_lang);
        } catch (err) {
            throw (err);
        }
        data.forEach((item, idx) => {
            // find the correponding item in linesToTranslate
            let itemInLine = linesToTranslateCopy.find(item => item.idx === idx);
            itemInLine.text = item.translations[0].text;
            itemInLine.idx = -1;
        });
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
