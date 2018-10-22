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
const deepEqual = require('deep-equal');
const qna = require('./classes/qna');
const exception = require('./classes/exception');
const qnaAlterations = require('./classes/qnaAlterations');
const NEWLINE = require('os').EOL;
const fetch = require('node-fetch');
const qnaFile = require('../lib/classes/qnaFiles');
const fileToParse = require('../lib/classes/filesToParse');
const utils = require('./utils');
const parseFileContentsModule = {
    /**
     * Helper function to validate parsed LUISJsonblob
     * @param {Object} LUISJSONBlob input LUIS Json blob
     * @returns {Boolean} True if validation succeeds.
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    validateLUISBlob : async function(LUISJSONBlob) {
        // patterns can have references to any other entity types. 
        // So if there is a pattern.any entity that is also defined as another type, remove the pattern.any entity
        LUISJSONBlob.patternAnyEntities = (LUISJSONBlob.patternAnyEntities || []).filter(entity => {
            if(itemExists(LUISJSONBlob.entities, entity.name, entity.roles)) return false;
            if(itemExists(LUISJSONBlob.closedLists, entity.name, entity.roles)) return false;
            if(itemExists(LUISJSONBlob.model_features, entity.name, entity.roles)) return false;
            if(itemExists(LUISJSONBlob.prebuiltEntities, entity.name, entity.roles)) return false;
            return true;
        });
        
        // look for entity name collisions - list, simple, patternAny, phraselist
        // look for list entities labelled
        // look for prebuilt entity labels in utterances
        
        let entitiesList = [];
        let entityFound = '';
        if(LUISJSONBlob.entities.length > 0) {
            LUISJSONBlob.entities.forEach(function(entity) {
                entitiesList.push(new helperClass.validateLUISBlobEntity(entity.name,['simple']));
            });
        }
        if(LUISJSONBlob.closedLists.length > 0){
            LUISJSONBlob.closedLists.forEach(function(entity) {
                entityFound = helpers.filterMatch(entitiesList, 'name', entity.name);
                if(entityFound.length === 0) {
                    entitiesList.push(new helperClass.validateLUISBlobEntity(entity.name,['list']));
                } else {
                    entityFound[0].type.push('list');
                }
            });
        }
        if(LUISJSONBlob.patternAnyEntities.length > 0) {
            LUISJSONBlob.patternAnyEntities.forEach(function(entity) {
                entityFound = helpers.filterMatch(entitiesList, 'name', entity.name);
                if(entityFound.length === 0) {
                    entitiesList.push(new helperClass.validateLUISBlobEntity(entity.name,['patternAny']));
                } else {
                    entityFound[0].type.push('patternAny');
                }
            });
        }
        if(LUISJSONBlob.model_features.length > 0) {
            LUISJSONBlob.model_features.forEach(function(entity) {
                entityFound = helpers.filterMatch(entitiesList, 'name', entity.name);
                if(entityFound.length === 0) {
                    entitiesList.push(new helperClass.validateLUISBlobEntity(entity.name,['phraseList']));
                } else {
                    entityFound[0].type.push('phraseList');
                }
            });
        }
        // for each entityFound, see if there are duplicate definitions
        entitiesList.forEach(function(entity) {
            if(entity.type.length > 1) {
                throw(new exception(retCode.errorCode.DUPLICATE_ENTITIES, 'Entity "' + entity.name + '" has duplicate definitions.\r\n\t' + JSON.stringify(entity.type, 2, null)));
            }
        });

        // do we have utterances with labelled list entities or phraselist entities? 
        if(LUISJSONBlob.utterances.length > 0) {
            LUISJSONBlob.utterances.forEach(function(utterance) {
                if(utterance.entities.length > 0) {
                    utterance.entities.forEach(function(entity) {
                        let entityInList = helpers.filterMatch(entitiesList, 'name', entity.entity);
                        if(entityInList.length > 0) {
                            if(entityInList[0].type.includes('list')) {
                                throw(new exception(retCode.errorCode.INVALID_INPUT, 'Utterance "' + utterance.text + '", has reference to List entity type. \r\n\t' + 'You cannot have utterances with List entity type references in them'));
                            }
                            if(entityInList[0].type.includes('phraseList')) {
                                throw(new exception(retCode.errorCode.INVALID_INPUT, 'Utterance "' + utterance.text + '", has reference to PhraseList. \r\n\t' + 'You cannot have utterances with phraselist references in them'));
                            }
                        }
                    });
                }
            });
        }
        return true;
    },
    /**
     * Main parser code to parse current file contents into LUIS and QNA sections.
     * @param {string} fileContent current file content
     * @param {boolean} log indicates if we need verbose logging.
     * @param {string} locale LUIS locale code
     * @returns {parserObj} Object with that contains list of additional files to parse, parsed LUIS object and parsed QnA object
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    parseFile : async function(fileContent, log, locale) 
    {
        fileContent = helpers.sanitizeNewLines(fileContent);
        let parsedContent = new parserObj();
        let splitOnBlankLines = '';
        try {
            splitOnBlankLines = helpers.splitFileBySections(fileContent.toString(),log);
        } catch (err) {
            throw(err);
        }
        // loop through every chunk of information
        for(let chunkIdx in splitOnBlankLines) {
            chunk = splitOnBlankLines[chunkIdx];
            let chunkSplitByLine = chunk.split(NEWLINE);
            if(chunk.indexOf(PARSERCONSTS.URLORFILEREF) === 0) {
                try {
                    await parseURLOrFileRef(parsedContent, chunkSplitByLine)
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
        };
        return parsedContent;
    },
    /**
     * Handle collating all QnA sections across all parsed files into one QnA collection
     *
     * @param {qna []} parsedQnAList Array of parsed QnA blobs
     * @returns {qna} Collated qna object
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    collateQnAFiles : async function(parsedQnAList) {
        let FinalQnAJSON = new qna();
        parsedQnAList.forEach(function(blob) {
            blob = blob.qnaJsonStructure;
            // does this blob have URLs?
            if(blob.urls.length > 0) {
                // add this url if this does not already exist in finaljson
                blob.urls.forEach(function(qnaUrl) {
                    if(!FinalQnAJSON.urls.includes(qnaUrl)) {
                        FinalQnAJSON.urls.push(qnaUrl);
                    }
                });
            }
            // does this blob have files?
            if(blob.files.length > 0) {
                // add this url if this does not already exist in finaljson
                blob.files.forEach(function(qnaFile) {
                    if(FinalQnAJSON.files.filter(item => {return item.fileUri == qnaFile.fileUri}).length === 0) {
                        FinalQnAJSON.files.push(qnaFile);
                    }
                });
            }
            // does this blob have qnapairs?
            if(blob.qnaList.length > 0) {
                // walk through each qnaPair and add it if it does not exist
                blob.qnaList.forEach(function(newQnAItem) {
                    if(FinalQnAJSON.qnaList.length == 0) {
                        FinalQnAJSON.qnaList.push(newQnAItem);
                    } else {
                        let qnaExists = false;
                        let fIndex = 0;
                        for(fIndex in FinalQnAJSON.qnaList) {
                            if(deepEqual(FinalQnAJSON.qnaList[fIndex], newQnAItem)) {
                                qnaExists = true;
                                break;
                            }
                        }
                        if(!qnaExists) FinalQnAJSON.qnaList.push(newQnAItem);
                    }
                });
            }
        });
        return FinalQnAJSON;
    },
    /**
     * Collate LUIS sections across parsed files into one LUIS collection
     * @param {LUIS []} parsedLUISList Contents of all parsed file blobs
     * @returns {LUIS} Collated LUIS json contents
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    collateLUISFiles : async function(parsedLUISList) {
        if (parsedLUISList.length === 0) return undefined;
        let FinalLUISJSON = parsedLUISList[0].LUISJsonStructure;
        parsedLUISList.splice(0,1);
        parsedLUISList.forEach(function(blob) {
            blob = blob.LUISJsonStructure;
            mergeResults(blob, FinalLUISJSON, LUISObjNameEnum.INTENT);
            mergeResults(blob, FinalLUISJSON, LUISObjNameEnum.ENTITIES);
            mergeResults_closedlists(blob, FinalLUISJSON, LUISObjNameEnum.CLOSEDLISTS);
            mergeResults(blob, FinalLUISJSON, LUISObjNameEnum.UTTERANCE);
            mergeResults(blob, FinalLUISJSON, LUISObjNameEnum.PATTERNS);
            mergeResults(blob, FinalLUISJSON, LUISObjNameEnum.PATTERNANYENTITY);
            // do we have prebuiltEntities here?
            if (blob.prebuiltEntities.length > 0) {
                blob.prebuiltEntities.forEach(function(prebuiltEntity){
                    let prebuiltTypeExists = false;
                    for (let fIndex in FinalLUISJSON.prebuiltEntities) {
                        if (prebuiltEntity.name === FinalLUISJSON.prebuiltEntities[fIndex].name) {
                            // do we have all the roles? if not, merge the roles
                            prebuiltEntity.roles.forEach(function(role) {
                                if (!FinalLUISJSON.prebuiltEntities[fIndex].roles.includes(role)) {
                                    FinalLUISJSON.prebuiltEntities[fIndex].roles.push(role);
                                }
                            });
                            prebuiltTypeExists = true;
                            break;
                        }
                    }
                    if(!prebuiltTypeExists) {
                        FinalLUISJSON.prebuiltEntities.push(prebuiltEntity);
                    }
                });
            }
            // do we have model_features?
            if(blob.model_features.length > 0) {
                blob.model_features.forEach(function(modelFeature) {
                    let modelFeatureInMaster = helpers.filterMatch(FinalLUISJSON.model_features, 'name', modelFeature.name);
                    if(modelFeatureInMaster.length === 0){
                        FinalLUISJSON.model_features.push(modelFeature);
                    } else {
                        if(modelFeatureInMaster[0].mode !== modelFeature.mode) {
                            // error.
                            throw(new exception(retCode.errorCode.INVALID_INPUT, '[ERROR]: Phrase list : "' + modelFeature.name + '" has conflicting definitions. One marked interchangeable and another not interchangeable'));
                        } else {
                            modelFeature.words.split(',').forEach(function(word) {
                                if(!modelFeatureInMaster[0].words.includes(word)) modelFeatureInMaster[0].words += "," + word;
                            })
                        }
                    }
                });
            }
        }); 
        return FinalLUISJSON;
    },
    /**
     * Collate QnA maker alterations sections across parsed files into one collection
     * @param {qnaAlterations []} allParsedQnAAlterations Contents of all parsed file blobs
     * @returns {qnaAlterations} Collated QnA maker alterations json contents
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    collateQnAAlterations : async function(allParsedQnAAlterations) {
        let finalQnAAlterationsList = new qnaAlterations.qnaAlterations();
        allParsedQnAAlterations.forEach(function(alterationList) {
            alterationList = alterationList.qnaAlterations;
            if(alterationList.wordAlterations) {
                alterationList.wordAlterations.forEach(function(alteration) {
                    finalQnAAlterationsList.wordAlterations.push(alteration);
                })
            } 
        });
        return finalQnAAlterationsList; 
    }
};
/**
 * Helper function to merge item if it does not already exist
 *
 * @param {object} blob Contents of all parsed file blobs
 * @param {object} finalCollection Reference to the final collection of items
 * @param {LUISObjNameEnum} type Enum type of possible LUIS object types
 * @returns {void} Nothing
 */
const mergeResults = function(blob, finalCollection, type) {
    if(blob[type].length > 0) {
        blob[type].forEach(function(blobItem) {
            if(finalCollection[type].length === 0) {
                finalCollection[type].push(blobItem);
                return;
            }
            // add if this item if it does not already exist in final collection
            let itemExists = false;
            for(let fIndex in finalCollection[type]) {
                if(deepEqual(finalCollection[type][fIndex],blobItem)){
                    itemExists = true;
                    break;
                }
            }
            if(!itemExists) {
                finalCollection[type].push(blobItem);
            }
        });
    }
};
/**
 * Helper function to merge closed list item if it does not already exist
 *
 * @param {object} blob Contents of all parsed file blobs
 * @param {object} finalCollection Reference to the final collection of items
 * @param {LUISObjNameEnum} type Enum type of possible LUIS object types
 * @returns {void} nothing
 */
const mergeResults_closedlists = function(blob, finalCollection, type) {
    if(blob[type].length > 0) {
        blob[type].forEach(function(blobItem) {
            let listInFinal = helpers.filterMatch(finalCollection[type], 'name', blobItem.name);
            if(listInFinal.length === 0) {
                finalCollection[type].push(blobItem);
            } else {
                blobItem.subLists.forEach(function(blobSLItem) {
                    // see if there is a sublist match in listInFinal
                    let slInFinal = helpers.filterMatch(listInFinal[0].subLists, 'canonicalForm', blobSLItem.canonicalForm);
                    if(slInFinal.length === 0) {
                        listInFinal[0].subLists.push(blobSLItem);
                    } else {
                        // there is a canonical form match. See if the values all exist
                        blobSLItem.list.forEach(function(listItem) {
                            if(!slInFinal[0].list.includes(listItem)) slInFinal[0].list.push(listItem);
                        })
                    }
                });
            }
        });
    }
};
/**
 * Helper function to parse and handle LUIS entities
 * @param {parserObj} parsedContent parserObj containing current parsed content
 * @param {Array} chunkSplitByLine Array of text lines in the current parsed section
 * @param {string} locale LUIS locale information
 * @param {boolean} log indicates if this function should write verbose messages to process.stdout
 * @returns {void} Nothing
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const parseAndHandleEntity = function(parsedContent, chunkSplitByLine, locale, log) {
    // we have an entity definition
    let entityDef = chunkSplitByLine[0].replace(PARSERCONSTS.ENTITY, '').split(':');
    let entityName = entityDef[0].trim();
    let entityType = entityDef[1].trim();
    let entityRoles = [];
    let pEntityName = (entityName === 'PREBUILT')?entityType:entityName;
    // see if we already have this as Pattern.Any entity
    // see if we already have this in patternAny entity collection; if so, remove it but remember the roles (if any)
    for(let i in parsedContent.LUISJsonStructure.patternAnyEntities) {
        if(parsedContent.LUISJsonStructure.patternAnyEntities[i].name === pEntityName) {
            if(entityType.toLowerCase().trim().includes('phraselist')) {
                throw(new exception(retCode.errorCode.INVALID_INPUT,'[ERROR]: Phrase lists cannot be used as an entity in a pattern "' + pEntityName));
            }
            if(parsedContent.LUISJsonStructure.patternAnyEntities[i].roles.length !== 0) entityRoles = parsedContent.LUISJsonStructure.patternAnyEntities[i].roles;
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
            addItemOrRoleIfNotPresent(parsedContent.LUISJsonStructure, LUISObjNameEnum.PREBUILT, entityType, entityRoles);
        } else {
            // add to prebuiltEntities if it does not exist there.
            addItemOrRoleIfNotPresent(parsedContent.LUISJsonStructure, LUISObjNameEnum.PREBUILT, entityType, entityRoles);
        }
        
    } else if(entityType.endsWith('=')) 
    {
        // is this qna maker alterations list? 
        if(entityType.includes(PARSERCONSTS.QNAALTERATIONS)) {
            try {
                parseAndHandleQnAAlterations(parsedContent, chunkSplitByLine)
            } catch (err) {
                throw(err);
            }
        } else {
            // treat this as a LUIS list entity type
            try {
                parseAndHandleListEntity(parsedContent, chunkSplitByLine, entityRoles);
            } catch (err) {
                throw (err);
            }
        }        
    } else if(entityType.toLowerCase() === 'simple') {
        // add this to entities if it doesnt exist
        addItemOrRoleIfNotPresent(parsedContent.LUISJsonStructure, LUISObjNameEnum.ENTITIES, entityName, entityRoles);
    } else if(entityType.toLowerCase().trim().indexOf('phraselist') === 0) {
        // is this interchangeable? 
        let intc = false;
        if(entityType.toLowerCase().includes('interchangeable')) intc = true;
        // add this to phraseList if it doesnt exist
        chunkSplitByLine.splice(0,1);
        let pLValues = new Array();
        let plValuesList = "";
        chunkSplitByLine.forEach(function(phraseListValues) {
            if((phraseListValues.indexOf('-') !== 0) &&
            (phraseListValues.indexOf('*') !== 0) && 
            (phraseListValues.indexOf('+') !== 0)) {
                throw(new exception(retCode.errorCode.PHRASELIST_NOT_A_LIST, '[ERROR]: Phrase list value: "' + phraseListValues + '" does not have list decoration. Prefix line with "-" or "+" or "*"'));
            }
            phraseListValues = phraseListValues.slice(1).trim();
            pLValues.push(phraseListValues.split(','));
            plValuesList = plValuesList + phraseListValues + ',';
        });
        // remove the last ','
        plValuesList = plValuesList.substring(0, plValuesList.lastIndexOf(','));
        let modelExists = false;
        if(parsedContent.LUISJsonStructure.model_features.length > 0) {
            let modelIdx = 0;
            for(modelIdx in parsedContent.LUISJsonStructure.model_features) {
                if(parsedContent.LUISJsonStructure.model_features[modelIdx].name === entityName) {
                    modelExists = true;
                    break;
                }
            }
            if(modelExists) {
                if(parsedContent.LUISJsonStructure.model_features[modelIdx].mode === intc) {
                    // for each item in plValues, see if it already exists
                    pLValues.forEach(function(plValueItem) {
                        if(!parsedContent.LUISJsonStructure.model_features[modelIdx].words[0].includes(plValueItem)) parsedContent.LUISJsonStructure.model_features[modelIdx].words += ',' + pLValues;
                    })
                } else {
                    throw(new exception(retCode.errorCode.INVALID_INPUT, '[ERROR]: Phrase list : "' + entityName + '" has conflicting definitions. One marked interchangeable and another not interchangeable'));
                }
                
            } else {
                parsedContent.LUISJsonStructure.model_features.push(new helperClass.modelObj(entityName, intc, plValuesList, true));
            }
        } else {
            parsedContent.LUISJsonStructure.model_features.push(new helperClass.modelObj(entityName, intc, plValuesList, true));
        }
    }
};
/**
 * Helper function to parse and handle QnA Maker alterations
 * @param {parserObj} parsedContent parserObj containing current parsed content
 * @param {Array} chunkSplitByLine Array of text lines in the current parsed section
 * @returns {void} Nothing
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const parseAndHandleQnAAlterations = function(parsedContent, chunkSplitByLine) {
    let alterationlist = [chunkSplitByLine[0].replace(PARSERCONSTS.ENTITY, '').split(':')[0].trim()];
    // remove the first entity declaration line
    chunkSplitByLine.splice(0,1);
    chunkSplitByLine.forEach(function(alterationLine) {
        if((alterationLine.indexOf('-') !== 0) &&
        (alterationLine.indexOf('*') !== 0) && 
        (alterationLine.indexOf('+') !== 0)) {
            throw(new exception(retCode.errorCode.SYNONYMS_NOT_A_LIST, '[ERROR]: QnA alteration list value: "' + alterationLine + '" does not have list decoration. Prefix line with "-" or "+" or "*"'));
        }
        alterationLine = alterationLine.slice(1).trim();       
        alterationlist.push(alterationLine.trim());
    });
    parsedContent.qnaAlterations.wordAlterations.push(new qnaAlterations.alterations(alterationlist));
}
/**
 * Helper function to parse and handle list entities
 * @param {parserObj} parsedContent parserObj containing current parsed content
 * @param {Array} chunkSplitByLine Array of text lines in the current parsed section
 * @param {string []} entityRoles Array of possible roles for this entity.
 * @returns {void} Nothing
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const parseAndHandleListEntity = function(parsedContent, chunkSplitByLine, entityRoles) {
    const [entityName, entityType] = chunkSplitByLine[0].replace(PARSERCONSTS.ENTITY, '').split(':');
    // get normalized value
    let normalizedValue = entityType.substring(0, entityType.length - 1);
    // remove the first entity declaration line
    chunkSplitByLine.splice(0,1);
    let synonymsList = [];
    
    // go through the list chunk and parse. Add these as synonyms
    chunkSplitByLine.forEach(function(listLine) {
        if((listLine.indexOf('-') !== 0) &&
        (listLine.indexOf('*') !== 0) && 
        (listLine.indexOf('+') !== 0)) {
            throw(new exception(retCode.errorCode.SYNONYMS_NOT_A_LIST, '[ERROR]: Synonyms list value: "' + listLine + '" does not have list decoration. Prefix line with "-" or "+" or "*"'));
        }
        listLine = listLine.slice(1).trim();       
        synonymsList.push(listLine.trim());
    });

    let closedListExists = helpers.filterMatch(parsedContent.LUISJsonStructure.closedLists, 'name', entityName);
    if(closedListExists.length === 0) {
        parsedContent.LUISJsonStructure.closedLists.push(new helperClass.closedLists(entityName, [new helperClass.subList(normalizedValue,synonymsList)], entityRoles));
    } else {
        // closed list with this name already exists
        let subListExists = helpers.filterMatch(closedListExists[0].subLists, 'canonicalForm', normalizedValue);
        if(subListExists.length === 0) {
            closedListExists[0].subLists.push(new helperClass.subList(normalizedValue, synonymsList));
        } else {
            synonymsList.forEach(function(listItem) {
                if(!subListExists[0].list.includes(listItem)) subListExists[0].list.push(listItem);
            })
        }
        // see if the roles all exist and if not, add them
        mergeRoles(closedListExists[0].roles, entityRoles);
    }
}
/**
 * Helper function to parse and handle LUIS intents
 * @param {parserObj} parsedContent parserObj containing current parsed content
 * @param {Array} chunkSplitByLine Array of text lines in the current parsed section
 * @returns {void} Nothing
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const parseAndHandleIntent = function(parsedContent, chunkSplitByLine) {
    let intentName = chunkSplitByLine[0].substring(chunkSplitByLine[0].indexOf(' ') + 1);
    // is this a QnA section? Qna sections have intent names that begin with ?
    if(intentName.trim().indexOf(PARSERCONSTS.QNA) === 0) {
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
                            throw(new exception(retCode.errorCode.INVALID_QNA_FILTER_DEF, 'Filter: "' + utterance + '" does not have list decoration. Prefix line with "-" or "+" or "*"'));
                        }
                        utterance = utterance.slice(1).trim();
                        let kp = utterance.split('=');
                        if(kp.length !== 2) {
                            throw(new exception(retCode.errorCode.INVALID_QNA_FILTER_DEF, 'Filter: "' + utterance + '" does not have a name = value pair.'));
                        }
                        metadata.push(new qnaMetaDataObj(kp[0].trim(),kp[1].trim()));
                    } else {
                        // we have a question
                        if((utterance.indexOf('-') !== 0) &&
                        (utterance.indexOf('*') !== 0) && 
                        (utterance.indexOf('+') !== 0)) {
                            throw(new exception(retCode.errorCode.INVALID_QNA_QUESTION_DEF, 'Question: "' + utterance + '" does not have list decoration. Prefix line with "-" or "+" or "*"'));
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
            // see if this utterance has a reference to LU section. 
            // Deep references must have [link name](link-value) notation
            if (utterance.indexOf('[') == 0) {
                let linkExp = (utterance || '').trim().match(new RegExp(/\(.*?\)/g));
                if(linkExp && linkExp.length !== 0) {
                    let parsedLinkUriInUtterance = helpers.parseLinkURI(utterance);
                    // examine and add these to filestoparse list.
                    parsedContent.additionalFilesToParse.push(new fileToParse(parsedLinkUriInUtterance.luFile, false));
                }
            }
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
                                if(entity.includes(':')) {
                                    // this is an entity with role
                                    const [entityName, roleName] = entity.split(':');
                                    havePatternAnyEntitiesInUtterance = true;
                                    addItemOrRoleIfNotPresent(parsedContent.LUISJsonStructure, LUISObjNameEnum.PATTERNANYENTITY, entityName, [roleName])
                                } else {
                                    havePatternAnyEntitiesInUtterance = true;
                                    addItemIfNotPresent(parsedContent.LUISJsonStructure, LUISObjNameEnum.PATTERNANYENTITY, entity);
                                }
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
 * Helper function to parse and handle URL or file references in lu files
 * @param {parserObj} parsedContent parserObj containing current parsed content
 * @param {Array} chunkSplitByLine Array of text lines in the current parsed section
 * @returns {void} Nothing
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const parseURLOrFileRef = async function(parsedContent, chunkSplitByLine) {
    let linkValueRegEx = new RegExp(/\(.*?\)/g);
    let linkValueList = chunkSplitByLine[0].trim().match(linkValueRegEx);
    let linkValueText = chunkSplitByLine[0].trim().split(linkValueRegEx)[0].replace('[', '').replace(']', '');
    let linkValue = linkValueList[0].replace('(', '').replace(')', '');
    if (linkValue === '') {
        throw (new exception(retCode.errorCode.INVALID_LU_FILE_REF, '[ERROR]: Invalid LU File Ref: ' + chunkSplitByLine[0]));
    }
    let parseUrl = url.parse(linkValue);
    if (parseUrl.host || parseUrl.hostname) {
        let options = { method: 'HEAD'};
        let response;
        try {
            response = await fetch(linkValue, options);
        } catch (err) {
            // throw, invalid URI
            throw(new exception(retCode.errorCode.INVALID_URI, 'URI: "' + linkValue + '" appears to be invalid. Please double check the URI or re-try this parse when you are connected to the internet.'));
        }
        if(!response.ok) throw(new exception(retCode.errorCode.INVALID_URI, 'URI: "' + linkValue + '" appears to be invalid. Please double check the URI or re-try this parse when you are connected to the internet.'));
        let contentType = response.headers.get('content-type');
        if(!contentType.includes('text/html')) {
            parsedContent.qnaJsonStructure.files.push(new qnaFile(linkValue, linkValueText));
        } else {
            parsedContent.qnaJsonStructure.urls.push(linkValue);
        }
        
    } else {
        parsedContent.additionalFilesToParse.push(new fileToParse(linkValue));
    }
}
/**
 * Helper function to add an item to collection if it does not exist
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
/**
 * Helper function to add an item to collection if it does not exist
 * @param {object} collection contents of the current collection
 * @param {LUISObjNameEnum} type item type
 * @param {object} value value of the current item to examine and add
 * @param {string []} roles possible roles to add to the item
 * @returns {void} nothing
 */
const addItemOrRoleIfNotPresent = function(collection, type, value, roles) {
    let existingItem = collection[type].filter(item => item.name == value);
    if(existingItem.length !== 0) {
        // see if the role exists and if so, merge
        mergeRoles(existingItem[0].roles, roles);
    } else {
        let itemObj = {};
        itemObj.name = value;
        if(type == LUISObjNameEnum.PATTERNANYENTITY) {
            itemObj.explicitList = [];
        }
        if(type !== LUISObjNameEnum.INTENT) {
            itemObj.roles = roles;
        } 
        collection[type].push(itemObj);
    }
}
/**
 * Helper function merge roles
 * @param {string []} srcEntityRoles contents of the current collection
 * @param {string []} tgtEntityRoles target entity roles collection to merge
 * @returns {void} nothing
 */
const mergeRoles = function(srcEntityRoles, tgtEntityRoles) {
    const rolesMap = srcEntityRoles.reduce((map, role) => (map[role] = true, map), {});
    tgtEntityRoles.forEach(role => {
        if (!rolesMap[role]) {
            srcEntityRoles.push(role);
        }
    });
}
/**
 * Helper function that returns true if the item exists. Merges roles before returning 
 * @param {Object} collection contents of the current collection
 * @param {string} entityName name of entity to look for in the current collection
 * @param {string []} entityRoles target entity roles collection to merge
 * @returns {void} nothing
 */
const itemExists = function(collection, entityName, entityRoles) {
    let matchInClosedLists = helpers.filterMatch(collection, 'name', entityName);
    if(matchInClosedLists.length !== 0) {
        // merge roles if there are any roles in the pattern entity
        if(entityRoles.length !== 0) {
            mergeRoles(matchInClosedLists[0].roles, entityRoles);
        }
        return true;
    }
    return false;
}
module.exports = parseFileContentsModule;
