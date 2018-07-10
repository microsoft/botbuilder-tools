#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const LUISObjNameEnum = require('./enums/luisobjenum');
const PARSERCONSTS = require('./enums/parserconsts');
const builtInTypes = require('./enums/luisbuiltintypes');
const helpers = require('./helpers');
const chalk = require('chalk');
const url = require('url');
const retCode = require('./enums/CLI-errors');
const parserObj = require('./classes/parserObject');
const qnaListObj = require('./classes/qnaList');
const qnaMetaDataObj = require('./classes/qnaMetaData');
const helperClass = require('./classes/hclasses');
/**
 * Main parser code to parse current file contents into LUIS and QNA sections.
 *
 * @param {string} fileContent current file content
 * @param {boolean} log indicates if we need verbose logging.
 * @param {string} locale LUIS locale code
 * @returns {object} Object with that contains list of additional files to parse, parsed LUIS object and parsed QnA object
 * @throws {object} Throws on errors. Object includes errCode and text. 
 */
module.exports.parseFile = function(fileContent, log, locale) 
{
    let parsedContent = new parserObj();
    /*var additionalFilesToParse = new Array();
    var LUISJsonStruct = {
        "intents": new Array(),
        "entities": new Array(),
        "composites": new Array(),
        "closedLists": new Array(),
        "regex_entities": new Array(),
        "model_features": new Array(),
        "regex_features": new Array(),
        "utterances": new Array(),
        "patterns": new Array(),
        "patternAnyEntities": new Array(),
        "prebuiltEntities": new Array()
    };
    var qnaJsonStruct = {
        "qnaList": new Array(),
        "urls": new Array()
    };*/
    let splitOnBlankLines = '';
    try {
        splitOnBlankLines = helpers.splitFileBySections(fileContent.toString(),log);
    } catch (err) {
        throw(err);
    }

    // loop through every chunk of information
    splitOnBlankLines.forEach(function(chunk) {
        chunk = chunk.trim();
        let chunkSplitByLine = chunk.split(/\r\n|\r|\n/g);
        if(chunk.indexOf(PARSERCONSTS.URLREF) === 0) {
            try {
                parseURLOrFileRef(parsedContent, PARSERCONSTS.URLREF,chunkSplitByLine)
            } catch (err) {
                throw (err);
            }
        } else if(chunk.indexOf(PARSERCONSTS.FILEREF) === 0) {
            try {
                parseURLOrFileRef(parsedContent, PARSERCONSTS.FILEREF,chunkSplitByLine)
            } catch (err) {
                throw (err);
            }
        } else if(chunk.indexOf(PARSERCONSTS.URLORFILEREF) === 0) {
            try {
                parseURLOrFileRef(parsedContent, PARSERCONSTS.URLORFILEREF, chunkSplitByLine)
            } catch (err) {
                throw (err);
            }
        } else if(chunk.indexOf(PARSERCONSTS.INTENT) === 0) {
            try {
                parseAndHandleIntent(parsedContent, chunkSplitByLine);
            } catch (err) {
                throw (err);
            }
        } else if(chunk.indexOf(PARSERCONSTS.ENTITY) === 0) {
            try {
                parseAndHandleEntity(parsedContent, chunkSplitByLine, locale, log);
            } catch (err) {
                throw (err);
            }
            
        } else if(chunk.indexOf(PARSERCONSTS.QNA) === 0) {
            parsedContent.qnaJsonStructure.qnaList.push(new qnaListObj(0, chunkSplitByLine[1], 'custom editorial', [chunkSplitByLine[0].replace(PARSERCONSTS.QNA, '').trim()], []));
        } 
    });
    return parsedContent;

    /*return {
        "fParse": additionalFilesToParse,
        "LUISBlob": LUISJsonStruct,
        "QnABlob": qnaJsonStruct
    };*/
    
};
/**
 * 
 * @param {parserObj} parsedContent parserObj containing current parsed content
 * @param {Array} chunkSplitByLine Array of text lines in the current parsed section
 * @returns {void} Nothing
 * @throws {object} Throws on errors. Object includes errCode and text. 
 */
const parseAndHandleEntity = function(parsedContent, chunkSplitByLine, locale, log) {
    // we have an entity definition
    let entityDef = chunkSplitByLine[0].replace(PARSERCONSTS.ENTITY, '').split(':');
    let entityName = entityDef[0];
    let entityType = entityDef[1];
    
    // see if we already have this as Pattern.Any entity
    // see if we already have this in patternAny entity collection; if so, remove it
    for(let i in LUISJsonStruct.patternAnyEntities) {
        if(parsedContent.LUISJsonStructure.patternAnyEntities[i].name === entityName) {
            if(entityType.toLowerCase().trim().indexOf('phraselist') === 0) {
                throw({
                    errCode: retCode.errorCode.INVALID_INPUT, 
                    text: '[ERROR]: Phrase lists cannot be used as an entity in a pattern "' + entityName
                })
            }
            parsedContent.LUISJsonStructure.patternAnyEntities.splice(i, 1);
            break;
        }
    }
    // add this entity to appropriate place
    // is this a builtin type? 
    if(builtInTypes.consolidatedList.includes(entityType)) {
        if(!locale) locale = 'en-us';
        // verify if the requested entityType is available in the requested locale
        let prebuiltCheck = builtInTypes.perLocaleAvailability[locale][entityType];
        if(prebuiltCheck === null) {
            if(log) {
                process.stdout.write(chalk.default.yellowBright('[WARN]: Requested PREBUILT entity "' + entityType + ' is not available for the requested locale: ' + locale + '\n'));
                process.stdout.write(chalk.default.yellowBright('  Skipping this prebuilt entity..\n'));
            }
        } else if (prebuiltCheck && prebuiltCheck.includes('datetime')) {
            if(log) {
                process.stdout.write(chalk.default.yellowBright('[WARN]: PREBUILT entity "' + entityType + ' is not available for the requested locale: ' + locale + '\n'));
                process.stdout.write(chalk.default.yellowBright('  Switching to ' + builtInTypes.perLocaleAvailability[locale][entityType] + ' instead.\n'));
            }
            entityType = builtInTypes.perLocaleAvailability[locale][entityType];
            addItemIfNotPresent(parsedContent.LUISJsonStructure, LUISObjNameEnum.PREBUILT, entityType);
        } else {
            // add to prebuiltEntities if it does not exist there.
            addItemIfNotPresent(parsedContent.LUISJsonStructure, LUISObjNameEnum.PREBUILT, entityType);
        }
        if(entityName !== "PREBUILT") {
            // add to prebuilt entities if this does not already exist there and if this is not PREBUILT
            let lMatch = true;
            for(let i in parsedContent.LUISJsonStructure.prebuiltEntities) {
                if(parsedContent.LUISJsonStructure.prebuiltEntities[i].type === entityType) {
                    // add the entityName as a role if it does not already exist
                    if(!parsedContent.LUISJsonStructure.prebuiltEntities[i].roles.includes(entityName)) {
                        parsedContent.LUISJsonStructure.prebuiltEntities[i].roles.push(entityName);
                    } 
                    lMatch = false;
                    break;
                }
            }
            if(lMatch) {
                let prebuiltEntitesObj = {
                    "type": entityType,
                    "roles": [entityName]
                };
                parsedContent.LUISJsonStructure.prebuiltEntities.push(prebuiltEntitesObj);
            } 
        }
    } else if(entityType.indexOf('=', entityType.length - 1) >= 0) 
    {
        // is this a list type?  
      
        // get normalized value
        var normalizedValue = entityType.substring(0, entityType.length - 1);

        // remove the first entity declaration line
        chunkSplitByLine.splice(0,1);
        
        

        var synonymsList = new Array();
        
        // go through the list chunk and parse. Add these as synonyms
        chunkSplitByLine.forEach(function(listLine) {
            if((listLine.indexOf('-') !== 0) &&
            (listLine.indexOf('*') !== 0) && 
            (listLine.indexOf('+') !== 0)) {
                process.stderr.write(chalk.default.redBright('[ERROR]: Synonyms list value: "' + listLine + '" does not have list decoration. Prefix line with "-" or "+" or "*"\n'));
                process.stderr.write(chalk.default.redBright('Stopping further processing.\n'));
                process.exit(retCode.errorCode.SYNONYMS_NOT_A_LIST);
            }
            listLine = listLine.slice(1).trim();       
            synonymsList.push(listLine.trim());
        });

        

        var closedListExists = LUISJsonStruct.closedLists.filter(function(item) {
            return item.name == entityName;
        });
        if(closedListExists.length === 0) {
            LUISJsonStruct.closedLists.push({
                "name": entityName,
                "subLists": [
                    {
                        "canonicalForm": normalizedValue,
                        "list": synonymsList
                    }
                ],
                "roles": []
            });
        } else {
            // closed list with this name already exists
            var subListExists = closedListExists[0].subLists.filter(function(item){
                return item.canonicalForm == normalizedValue;
            });

            if(subListExists.length === 0) {
                closedListExists[0].subLists.push({
                    "canonicalForm": normalizedValue,
                    "list": synonymsList
                });
            } else {
                synonymsList.forEach(function(listItem) {
                    if(!subListExists[0].list.includes(listItem)) subListExists[0].list.push(listItem);
                })
            }
        }

    } else if(entityType.toLowerCase() === 'simple') {
        // add this to entities if it doesnt exist
        addItemIfNotPresent(LUISJsonStruct, LUISObjNameEnum.ENTITIES, entityName);
    } else if(entityType.toLowerCase().trim().indexOf('phraselist') === 0) {
        // is this interchangeable? 
        var intc = false;
        if(entityType.toLowerCase().includes('interchangeable')) intc = true;
        // add this to phraseList if it doesnt exist
        chunkSplitByLine.splice(0,1);
        var pLValues = new Array();
        var plValuesList = "";
        chunkSplitByLine.forEach(function(phraseListValues) {
            if((phraseListValues.indexOf('-') !== 0) &&
            (phraseListValues.indexOf('*') !== 0) && 
            (phraseListValues.indexOf('+') !== 0)) {
                process.stderr.write(chalk.default.redBright('[ERROR]: Phrase list value: "' + phraseListValues + '" does not have list decoration. Prefix line with "-" or "+" or "*"\n'));
                process.stderr.write(chalk.default.redBright('Stopping further processing.\n'));
                process.exit(retCode.errorCode.PHRASELIST_NOT_A_LIST);
            }
            phraseListValues = phraseListValues.slice(1).trim();
            pLValues.push(phraseListValues.split(','));
            plValuesList = plValuesList + phraseListValues + ',';
        });
        // remove the last ','
        plValuesList = plValuesList.substring(0, plValuesList.lastIndexOf(','));
        var modelExists = false;
        if(LUISJsonStruct.model_features.length > 0) {
            var modelIdx = 0;
            for(modelIdx in LUISJsonStruct.model_features) {
                if(LUISJsonStruct.model_features[modelIdx].name === entityName) {
                    modelExists = true;
                    break;
                }
            }
            if(modelExists) {
                if(LUISJsonStruct.model_features[modelIdx].mode === intc) {
                    // for each item in plValues, see if it already exists
                    pLValues.forEach(function(plValueItem) {
                        if(!LUISJsonStruct.model_features[modelIdx].words[0].includes(plValueItem)) LUISJsonStruct.model_features[modelIdx].words += ',' + pLValues;
                    })
                } else {
                    process.stderr.write(chalk.default.redBright('[ERROR]: Phrase list : "' + entityName + '" has conflicting definitions. One marked interchangeable and another not interchangeable \n'));
                    process.stderr.write(chalk.default.redBright('Stopping further processing.\n'));
                    process.exit(retCode.errorCode.INVALID_INPUT);
                }
                
            } else {
                var modelObj = {
                    "name": entityName,
                    "mode": intc,
                    "words": plValuesList,
                    "activated": true
                };
                LUISJsonStruct.model_features.push(modelObj);
            }
        } else {
            var modelObj = {
                "name": entityName,
                "mode": intc,
                "words": plValuesList,
                "activated": true
            };
            LUISJsonStruct.model_features.push(modelObj);
        }
    }
}
/**
 * 
 * @param {parserObj} parsedContent parserObj containing current parsed content
 * @param {Array} chunkSplitByLine Array of text lines in the current parsed section
 * @returns {void} Nothing
 * @throws {object} Throws on errors. Object includes errCode and text. 
 */
const parseAndHandleIntent = function(parsedContent, chunkSplitByLine) {
    let intentName = chunkSplitByLine[0].substring(chunkSplitByLine[0].indexOf(' ') + 1);
    // is this a QnA section? Qna sections have intent names that begin with ?
    if(intentName.trim().indexOf(PARSERCONSTS.QNA) === 0) {
        const NEWLINE = '\r\n';
        let questions = [];
        let answer = "";
        let InanswerSection = false;
        let InFiltersSection = false;
        let metadata = [];
        questions.push(intentName.replace('?', '').trim());
        chunkSplitByLine.splice(0,1);
        chunkSplitByLine.forEach(function(utterance) {
            // do we have a filter section? 
            if(utterance.toLowerCase().indexOf('**filters:**') === 0) {
                InFiltersSection = true;
            } else if(InanswerSection) {
                // are we already in an answer section? 
                answer += utterance + NEWLINE;
            } else {
                // we need either another question here or a start of answer section
                if(utterance.trim().indexOf(PARSERCONSTS.ANSWER) === 0)
                {
                    InFiltersSection = false;
                    if(InanswerSection) {
                        answer += utterance + NEWLINE;
                    } else {
                        // do not add the line that includes the beginning of answer
                        answer = "";
                        InanswerSection = true;
                    }
                } else {
                    // do we have another question or Filter? 
                    if(InFiltersSection) {
                        if((utterance.indexOf('-') !== 0) &&
                        (utterance.indexOf('*') !== 0) && 
                        (utterance.indexOf('+') !== 0)) {
                            throw({
                                errCode: retCode.errorCode.INVALID_QNA_FILTER_DEF, 
                                text: 'Filter: "' + utterance + '" does not have list decoration. Prefix line with "-" or "+" or "*"'
                            })
                        }
                        utterance = utterance.slice(1).trim();
                        let kp = utterance.split('=');
                        if(kp.length !== 2) {
                            throw({
                                errCode: retCode.errorCode.INVALID_QNA_FILTER_DEF, 
                                text: 'Filter: "' + utterance + '" does not have a name = value pair.'
                            })
                        }
                        metadata.push(new qnaMetaDataObj(kp[0].trim(),kp[1].trim()));
                    } else {
                        // we have a question
                        if((utterance.indexOf('-') !== 0) &&
                        (utterance.indexOf('*') !== 0) && 
                        (utterance.indexOf('+') !== 0)) {
                            throw({
                                errCode: retCode.errorCode.INVALID_QNA_QUESTION_DEF, 
                                text: 'Question: "' + utterance + '" does not have list decoration. Prefix line with "-" or "+" or "*"'
                            })
                        }
                        utterance = utterance.slice(1).trim();
                        questions.push(utterance.trim());
                    }
                }
            }
        });
        let finalAnswer = answer.substring(0, answer.lastIndexOf(NEWLINE));
        parsedContent.qnaJsonStructure.qnaList.push(new qnaListObj(0, finalAnswer.substring(0, finalAnswer.lastIndexOf('```')), 'custom editorial', questions, metadata));
    } else {
        // insert only if the intent is not already present.
        addItemIfNotPresent(parsedContent.LUISJsonStructure, LUISObjNameEnum.INTENT, intentName);
        // remove first line from chunk
        chunkSplitByLine.splice(0,1);
        chunkSplitByLine.forEach(function(utterance)
        {
            // remove the list decoration from line.
            if((utterance.indexOf('-') !== 0) &&
                (utterance.indexOf('*') !== 0) && 
                (utterance.indexOf('+') !== 0)) {
                    throw ({
                        errCode: retCode.errorCode.INVALID_UTTERANCE_DEF, 
                        text: 'Utterance: "' + utterance + '" does not have list decoration. Prefix line with "-" or "+" or "*"'
                    })
                }
            utterance = utterance.slice(1).trim();
             // handle entities in the utterance
            if(utterance.includes("{")) {
                let entityRegex = new RegExp(/\{(.*?)\}/g);
                let entitiesFound = utterance.match(entityRegex);
                let updatedUtterance = utterance;
                let entitiesInUtterance = new Array();
                let havePatternAnyEntitiesInUtterance = false;
                // treat this as labelled utterance
                entitiesFound.forEach(function(entity) {
                    let labelledValue = "";
                    let srcEntityStructure = entity;
                    entity = entity.replace("{", "").replace("}", "");
                    // see if this is a trained simple entity of format {entityName=labelled value}
                    if(entity.includes("=")) {
                        let entitySplit = entity.split("=");
                        if(entitySplit.length > 2) {
                            throw ({
                                errCode: retCode.errorCode.INVALID_INPUT, 
                                text: '[ERROR]: Nested entity references are not supported in utterance: ' + utterance
                            })
                        }
                        entity = entitySplit[0].trim();
                        labelledValue = entitySplit[1].trim();
                        if(labelledValue !== "") {
                            // add this to entities collection unless it already exists
                            addItemIfNotPresent(parsedContent.LUISJsonStructure, LUISObjNameEnum.ENTITIES, entity);
                            // clean up uttearnce to only include labelledentityValue and add to utterances collection
                            let startPos = updatedUtterance.indexOf(srcEntityStructure);
                            let endPos = startPos + labelledValue.length - 1;
                            let utteranceLeft = updatedUtterance.substring(0, updatedUtterance.indexOf("{" + entity));
                            let utteranceRight = updatedUtterance.substring(updatedUtterance.indexOf(labelledValue + "}") + labelledValue.length + 1);
                            updatedUtterance = utteranceLeft + labelledValue + utteranceRight;
                            entitiesInUtterance.push({
                                "type": "simple",
                                "value": {
                                    "entity": entity,
                                    "startPos": startPos,
                                    "endPos": endPos
                                }
                            });
                        } else {
                            throw ({
                                errCode: retCode.errorCode.MISSING_LABELLED_VALUE, 
                                text: '[ERROR]: No labelled value found for entity: ' + entity + ' in utterance: ' + utterance
                            })
                        }
                    } else {
                        // push this utterance to patterns
                        
                        // if this intent does not have any utterances, push this pattern as an utterance as well. 
                        let intentInUtterance = helpers.filterMatch(parsedContent.LUISJsonStructure.utterances, 'intent', intentName);
                        if(intentInUtterance.length === 0) {
                            parsedContent.LUISJsonStructure.utterances.push(new helperClass.uttereances(utterance, intentName, []));
                        }
                        
                        if(utterance.includes("{")) {
                            // handle entities
                            let entityRegex = new RegExp(/\{(.*?)\}/g);
                            let entitiesFound = utterance.match(entityRegex);
                            entitiesFound.forEach(function(entity) {
                                entity = entity.replace("{", "").replace("}", "");
                                havePatternAnyEntitiesInUtterance = true;
                                addItemIfNotPresent(parsedContent.LUISJsonStructure, LUISObjNameEnum.PATTERNANYENTITY, entity);
                            });
                        }
                    }
                });
                if(entitiesInUtterance.length !== 0) {
                    // examine entities and push
                    let utteranceObject = new helperClass.uttereances(updatedUtterance,intentName,[]);
                    entitiesInUtterance.forEach(function(lEntity){
                        utteranceObject.entities.push(lEntity.value);
                    });
                    parsedContent.LUISJsonStructure.utterances.push(utteranceObject);
                }

                if(havePatternAnyEntitiesInUtterance) {
                    parsedContent.LUISJsonStructure.patterns.push(new helperClass.pattern(utterance, intentName));
                }
                
            } else {
                // push this to utterances
                parsedContent.LUISJsonStructure.utterances.push(new helperClass.uttereances(utterance, intentName, []));
            }
        });
    }
}
/**
 * 
 * @param {parserObj} parsedContent parserObj containing current parsed content
 * @param {PARSERCONSTS} type type can either be URLREF or FILEREF
 * @param {Array} chunkSplitByLine Array of text lines in the current parsed section
 * @returns {void} Nothing
 * @throws {object} Throws on errors. Object includes errCode and text. 
 */
const parseURLOrFileRef = function(parsedContent, type, chunkSplitByLine) {
    let urlRef_regex = chunkSplitByLine[0].trim().replace(type, '').split(/\(['"](.*?)['"]\)/g);
    switch(type) {
        case PARSERCONSTS.URLREF: 
            if(urlRef_regex.length !== 3 || urlRef_regex[1].trim() === '') {
                throw({
                    errCode: retCode.errorCode.INVALID_URL_REF, 
                    text: '[ERROR]: ' + 'Invalid URL Ref: ' + chunkSplitByLine[0]
                })
            }
            parsedContent.qnaJsonStructure.urls.push(urlRef_regex[1]);
        break;
        case PARSERCONSTS.FILEREF:
            if(urlRef_regex.length !== 3 || urlRef_regex[1].trim() === '') {
                throw({
                    errCode: retCode.errorCode.INVALID_LU_FILE_REF, 
                    text: '[ERROR]: ' + 'Invalid LU File Ref: ' + chunkSplitByLine[0]
                })
            }
            parsedContent.additionalFilesToParse.push(urlRef_regex[1]);
        break;
        case PARSERCONSTS.URLORFILEREF:
            let linkValueRegEx = new RegExp(/\(.*?\)/g);
            let linkValueList = chunkSplitByLine[0].trim().match(linkValueRegEx);
            let linkValue = linkValueList[0].replace('(','').replace(')','');
            let parseUrl = url.parse(linkValue);
            if (parseUrl.host || parseUrl.hostname) {
                parsedContent.qnaJsonStructure.urls.push(linkValue);
            } else {
                parsedContent.additionalFilesToParse.push(linkValue);
            }
        break;
    }
}

/**
 * Helper function to add an item to collection if it does not exist
 *
 * @param {object} collection contents of the current collection
 * @param {LUISObjNameEnum} type item type
 * @param {object} value value of the current item to examine and add
 * @returns {void} nothing
 */
const addItemIfNotPresent = function(collection, type, value) {
    let hasValue = false;
    for(let i in collection[type]) {
        if(collection[type][i].name === value) {
            hasValue = true;
            break;
        }
    }
    if(!hasValue) {
        let itemObj = {};
        itemObj.name = value;
        if(type == LUISObjNameEnum.PATTERNANYENTITY) {
            itemObj.explicitList = [];
        }
        if(type !== LUISObjNameEnum.INTENT) {
            itemObj.roles = [];
        } 
        collection[type].push(itemObj);
    }  
};

