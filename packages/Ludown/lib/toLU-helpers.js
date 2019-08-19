#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
require('./utils');
const helperClasses = require('./classes/hclasses');
const helpers = require('./helpers');
const NEWLINE = require('os').EOL;
const exception = require('./classes/exception');
const toLUHelpers = {
    /**
     * Helper function to construct model description information from LUIS JSON
     * @param {Object} LUISJSON 
     * @returns {string} model description
     */
    constructModelDescFromLUISJSON : async function(LUISJSON) {
        let modelDesc = NEWLINE;
        modelDesc += '> LUIS application information' + NEWLINE;
        modelDesc += '> !# @app.name = ' + LUISJSON.name + NEWLINE;
        modelDesc += '> !# @app.desc = ' + LUISJSON.desc + NEWLINE;
        modelDesc += '> !# @app.culture = ' + LUISJSON.culture + NEWLINE;
        modelDesc += '> !# @app.versionId = ' + LUISJSON.versionId + NEWLINE;
        modelDesc += '> !# @app.luis_schema_version = ' + LUISJSON.luis_schema_version + NEWLINE;
        return modelDesc;
    },
    /**
     * Helper function to construct model description information from QnA JSON
     * @param {Object} QnAJSON 
     * @returns {string} model description
     */
    constructModelDescFromQnAJSON : async function(QnAJSON) {
        let modelDesc = NEWLINE;
        modelDesc += '> QnA KB information' + NEWLINE;
        modelDesc += '> !# @kb.name = ' + QnAJSON.name + NEWLINE;
        return modelDesc;
    },
    /**
     * Construct lu file content from LUIS JSON object
     * @param {object} LUISJSON LUIS JSON object
     * @returns {String} Generated lu content 
     */
    constructMdFromLUISJSON : async function(LUISJSON) {
        let fileContent = '';
        let luisObj = new helperClasses.rLuisObj();
        (LUISJSON.intents || []).forEach(function(intent) {
            luisObj.intents.push(new helperClasses.intent(intent, []));
        });
        // add utterances to luisObj
        updateUtterancesList(LUISJSON.utterances, luisObj.intents, 'text');
        // add patterns to luisObj
        updateUtterancesList(LUISJSON.patterns, luisObj.intents, 'pattern');
        if(luisObj.intents.length >= 0) {
            fileContent += NEWLINE;
            fileContent += '> # Intent definitions' + NEWLINE + NEWLINE;
            // write out intents and utterances..
            luisObj.intents.forEach(function(intent) {
                // Add inherits information if any
                if (intent.intent.inherits !== undefined) {
                    // > !# @intent.inherits = {name = Web.WebSearch; domain_name = Web; model_name = WebSearch}
                    fileContent += '> !# @intent.inherits = name : ' + intent.intent.name;
                    if (intent.intent.inherits.domain_name !== undefined) {
                        fileContent += '; domain_name : ' + intent.intent.inherits.domain_name;
                    }
                    if (intent.intent.inherits.model_name !== undefined) {
                        fileContent += '; model_name : ' + intent.intent.inherits.model_name;
                    }
                    fileContent += NEWLINE + NEWLINE;
                }
                fileContent += '## ' + intent.intent.name + NEWLINE;
                intent.utterances.forEach(function(utterance) {
                    let updatedText = utterance.text;
                    if(utterance.entities.length >= 0) {
                        // update utterance for each entity
                        let text = utterance.text;
                        let sortedEntitiesList = objectSortByStartPos(utterance.entities);
                        let tokenizedText = text.split('');
                        let nonCompositesInUtterance = sortedEntitiesList.filter(entity => LUISJSON.composites.find(composite => composite.name == entity.entity) == undefined);
                        nonCompositesInUtterance.forEach(entity => {
                            if (entity.role !== undefined) {
                                tokenizedText[parseInt(entity.startPos)] = `{${entity.entity}:${entity.role}=${tokenizedText[parseInt(entity.startPos)]}`;    
                            } else {
                                tokenizedText[parseInt(entity.startPos)] = `{${entity.entity}=${tokenizedText[parseInt(entity.startPos)]}`;    
                            }
                            tokenizedText[parseInt(entity.endPos)] += `}`;
                        })
                        let compositeEntitiesInUtterance = sortedEntitiesList.filter(entity => LUISJSON.composites.find(composite => composite.name == entity.entity) != undefined);
                        compositeEntitiesInUtterance.forEach(entity => {
                            if (entity.role !== undefined) {
                                tokenizedText[parseInt(entity.startPos)] = `{${entity.entity}:${entity.role}=${tokenizedText[parseInt(entity.startPos)]}`;
                            } else {
                                tokenizedText[parseInt(entity.startPos)] = `{${entity.entity}=${tokenizedText[parseInt(entity.startPos)]}`;
                            }
                            tokenizedText[parseInt(entity.endPos)] += `}`;
                        })
                        updatedText = tokenizedText.join(''); 
                    }
                    if(updatedText) fileContent += '- ' + updatedText + NEWLINE;
                });
                fileContent += NEWLINE + NEWLINE;
            });
        }
        
        if(LUISJSON.entities && LUISJSON.entities.length >= 0) {
            fileContent += '> # Entity definitions' + NEWLINE + NEWLINE;
            LUISJSON.entities.forEach(function(entity) {
                // Add inherits information if any
                if (entity.inherits !== undefined) {
                    // > !# @intent.inherits = {name = Web.WebSearch; domain_name = Web; model_name = WebSearch}
                    fileContent += '> !# @entity.inherits = name : ' + entity.name;
                    if (entity.inherits.domain_name !== undefined) {
                        fileContent += '; domain_name : ' + entity.inherits.domain_name;
                    }
                    if (entity.inherits.model_name !== undefined) {
                        fileContent += '; model_name : ' + entity.inherits.model_name;
                    }
                    fileContent += NEWLINE + NEWLINE;
                }
                fileContent += '$' + entity.name + ':simple';
                if (entity.roles.length > 0) {
                    fileContent += ` Roles=${entity.roles.join(', ')}`;
                }
                fileContent += NEWLINE + NEWLINE;
            });
            fileContent += NEWLINE;
        }
    
        if(LUISJSON.prebuiltEntities && LUISJSON.prebuiltEntities.length >= 0){
            fileContent += '> # PREBUILT Entity definitions' + NEWLINE + NEWLINE;
            LUISJSON.prebuiltEntities.forEach(function(entity) {
                fileContent += '$PREBUILT:' + entity.name;
                if (entity.roles.length > 0) {
                    fileContent += ` Roles=${entity.roles.join(', ')}`;
                }
                fileContent += NEWLINE + NEWLINE;
            });
            fileContent += NEWLINE;
        }
        
        if(LUISJSON.model_features && LUISJSON.model_features.length >= 0) {
            fileContent += '> # Phrase list definitions' + NEWLINE + NEWLINE;
            LUISJSON.model_features.forEach(function(entity) {
                fileContent += '$' + entity.name + ':phraseList' + (entity.mode ? ' interchangeable' : '') + NEWLINE;
                fileContent += '- ' + entity.words + NEWLINE;
            });
            fileContent += NEWLINE;
        }
        if(LUISJSON.closedLists && LUISJSON.closedLists.length >= 0){
            fileContent += '> # List entities' + NEWLINE + NEWLINE;
            LUISJSON.closedLists.forEach(function(ListItem) {
                ListItem.subLists.forEach(function(list) {
                    fileContent += '$' + ListItem.name + ':' + list.canonicalForm + '=';
                    if (ListItem.roles.length > 0) {
                        fileContent += ` Roles=${ListItem.roles.join(', ')}`;
                    }
                    fileContent += NEWLINE;
                    list.list.forEach(function(listItem) {
                        fileContent += '- ' + listItem + NEWLINE;
                    });
                    fileContent += NEWLINE;
                });
                fileContent += NEWLINE + NEWLINE;
            });
        }

        if(LUISJSON.regex_entities && LUISJSON.regex_entities.length >= 0) {
            fileContent += '> # RegEx entities' + NEWLINE + NEWLINE; 
            LUISJSON.regex_entities.forEach(function(regExEntity) {
                fileContent += '$' + regExEntity.name + ':/' + regExEntity.regexPattern + '/';
                if (regExEntity.roles.length > 0) {
                    fileContent += ` Roles=${regExEntity.roles.join(', ')}`;
                }
                fileContent += NEWLINE;
            });
            fileContent += NEWLINE;
        }

        // add composite entities if found in source LUIS JSON
        if(LUISJSON.composites && LUISJSON.composites.length > 0) {
            fileContent += '> # Composite entities' + NEWLINE + NEWLINE; 
            LUISJSON.composites.forEach(composite => {
                fileContent += '$' + composite.name + ':[' + composite.children.join(', ') + ']';
                if (composite.roles.length > 0) {
                    fileContent += ` Roles=${composite.roles.join(', ')}`;
                }
                fileContent += NEWLINE;
            })
        }
        return fileContent;
    },
    /**
     * Construct lu file content from QnA Alteration JSON object
     * @param {object} QnAAltJSON QnA Alteration JSON object
     * @returns {String} Generated lu content 
     */
    constructMdFromQnAAlterationJSON: function(QnAAltJSON) {
        let fileContent = '> # QnA Alterations' + NEWLINE + NEWLINE;
        if(QnAAltJSON.wordAlterations.length > 0) {
            QnAAltJSON.wordAlterations.forEach(function(alteration) {
                fileContent += '$' + alteration.alterations[0] + ' : ' + 'qna-alterations = ' + NEWLINE;
                alteration.alterations.splice(0, 1);
                alteration.alterations.forEach(function(item) {
                    fileContent += '- ' + item + NEWLINE;
                })
                fileContent += NEWLINE;
            });
        }
        return fileContent;
    },
    /**
     * Construct lu file content from QnA JSON object
     * @param {object} QnAJSON QnA JSON object
     * @returns {String} Generated lu content 
     */
    constructMdFromQnAJSON: function(QnAJSON) {
        let fileContent = '> # QnA pairs' + NEWLINE + NEWLINE;
        let root = null;
        if(QnAJSON.qnaDocuments) {
            root = QnAJSON.qnaDocuments;
        } else {
            root = QnAJSON.qnaList;
        }
        if(root.length > 0) {
            root.forEach(function(qnaItem) {
                fileContent += '> Source: ' + qnaItem.source + NEWLINE;
                fileContent += '## ? ' + qnaItem.questions[0] + NEWLINE;
                qnaItem.questions.splice(0,1);
                qnaItem.questions.forEach(function(question) {
                    fileContent += '- ' + question + NEWLINE;
                })
                fileContent += NEWLINE;
                if(qnaItem.metadata.length > 0) {
                    fileContent += NEWLINE + '**Filters:**' + NEWLINE;
                    qnaItem.metadata.forEach(function(filter) {
                        fileContent += '- ' + filter.name + ' = ' + filter.value + NEWLINE;    
                    });
                    fileContent += NEWLINE;
                }
                fileContent += '```markdown' + NEWLINE;
                fileContent += qnaItem.answer + NEWLINE;
                fileContent += '```' + NEWLINE + NEWLINE;
            });

        }
        return fileContent;
    },
    /**
     * Helper function to construct the file content based on parsed luis and qna objects
     * 
     * @param {object} LUISJSON LUIS JSON file content
     * @param {object} QnAJSONFromTSV QnA JSON file content
     * @param {object} QnAAltJSON QnA Alteration JSON file
     * @param {String} luisFile input LUIS JSON file name
     * @param {String} QnAFile input QnA TSV file name
     * @param {boolean} skip_header If true, header information in the generated output text will be skipped. 
     * @param {boolean} include_model_info If true, information about the LUIS/ QnA models are included.
     * @returns {String} Generated Markdown file content to flush to disk
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    constructMdFileHelper : async function(LUISJSON, QnAJSONFromTSV, QnAAltJSON, luisFile, QnAFile, skip_header, include_model_info) {
        let fileContent = '';
        let modelDesc = '';
        let fileHeader = '';
        let now = new Date();
        fileHeader += '> ! Automatically generated by [LUDown CLI](https://github.com/Microsoft/botbuilder-tools/tree/master/Ludown), ' + now.toString() + NEWLINE + NEWLINE;
        fileHeader += '> ! Source LUIS JSON file: ' + (LUISJSON.sourceFile?LUISJSON.sourceFile:'Not Specified') + NEWLINE + NEWLINE;
        fileHeader += '> ! Source QnA TSV file: ' + (QnAJSONFromTSV.sourceFile?QnAJSONFromTSV.sourceFile:'Not Specified') + NEWLINE + NEWLINE;
        fileHeader += '> ! Source QnA Alterations file: ' + (QnAAltJSON.sourceFile?QnAAltJSON.sourceFile:'Not Specified') + NEWLINE + NEWLINE;

        if(LUISJSON.sourceFile) {
            fileContent += await toLUHelpers.constructMdFromLUISJSON(LUISJSON.model);
            modelDesc += await toLUHelpers.constructModelDescFromLUISJSON(LUISJSON.model);
        }
        if(QnAJSONFromTSV.sourceFile) {
            fileContent += await toLUHelpers.constructMdFromQnAJSON(QnAJSONFromTSV.model)
            modelDesc += await toLUHelpers.constructModelDescFromQnAJSON(QnAJSONFromTSV.model);
        }
        if(QnAAltJSON.sourceFile) {
            fileContent += await toLUHelpers.constructMdFromQnAAlterationJSON(QnAAltJSON.model)
        }
        if(fileContent) {
            if (include_model_info) {
                fileContent = modelDesc + fileContent;
            }
            if(skip_header) {
                return fileContent
            } else {
                return fileHeader + fileContent;
            }
        }
        return fileContent;
    },
    /**
     * Sorts all collectios within LUIS, QnA and QnA alteration models.
     * @param {object} LUISJSON 
     * @param {object} QnAJSON 
     * @param {object} QnAAltJSON 
     */
    sortCollections : async function(LUISJSON, QnAJSON, QnAAltJSON) {
        // sort respective collections LUIS model
        if (LUISJSON.model != "") await sortLUISJSON(LUISJSON.model);
        if (QnAJSON.model != "") await sortQnAJSON(QnAJSON.model);
        if (QnAAltJSON.model != "") await sortQnAAltJSON(QnAAltJSON.model);
    }
};

/**
 * Helper function to return sorted LUIS JSON model
 * @param {Object} LUISJSON 
 */
const sortLUISJSON = async function(LUISJSON) {
    // sort intents first
    LUISJSON.intents.sort(sortComparers.compareNameFn);
    LUISJSON.composites.sort(sortComparers.compareNameFn);
    LUISJSON.entities.sort(sortComparers.compareNameFn);
    LUISJSON.closedLists.sort(sortComparers.compareNameFn);
    LUISJSON.regex_entities.sort(sortComparers.compareNameFn);
    LUISJSON.model_features.sort(sortComparers.compareNameFn);
    LUISJSON.patternAnyEntities.sort(sortComparers.compareNameFn);
    LUISJSON.prebuiltEntities.sort(sortComparers.compareNameFn);
    LUISJSON.utterances.sort(sortComparers.compareIntentFn);
};

/**
 * Helper function to return sorted QnA JSON model
 * @param {Object} QnAJSON 
 */
const sortQnAJSON = async function(QnAJSON) {
    (QnAJSON.qnaList || []).forEach(pair => {
        pair.questions.sort(sortComparers.compareFn);
    });
    QnAJSON.qnaList.sort(sortComparers.compareQn);
};

/**
 * Helper function to return sorted QnA Alterations pair
 * @param {Object} QnAAltJSON 
 */
const sortQnAAltJSON = async function(QnAAltJSON) {
    (QnAAltJSON.wordAlterations || []).forEach(word => {
        word.alterations.sort(sortComparers.compareFn);
    });
    QnAAltJSON.wordAlterations.sort(sortComparers.compareAltName);
}; 

/**
 * Helper set of comparer functions that help with sort by examining a specific comparison logic.
 */
const sortComparers = {
    
    compareAltName : function(a, b) {
        return a.alterations[0].toUpperCase() > b.alterations[0].toUpperCase();
    },    
    compareFn : function(a, b) {
        return a.toUpperCase() > b.toUpperCase();
    },    
    compareQn : function(a, b) {
        return a.questions[0].toUpperCase() > b.questions[0].toUpperCase();
    },    
    compareNameFn : function(a, b) {
        return a.name.toUpperCase() > b.name.toUpperCase();
    },    
    compareIntentFn : function(a, b) {
        return a.intent.toUpperCase() > b.intent.toUpperCase();
    }
}


/**
 * helper function sort entities list by starting position
 * @param {object} objectArray array of entity objects
 * @returns {object} sorted entities array by start position
 */
const objectSortByStartPos = function (objectArray) {
    let ObjectByStartPos = objectArray.slice(0);
    ObjectByStartPos.sort(function(a,b) {
        return a.startPos - b.startPos;
    });
    return ObjectByStartPos;
};
/**
 * helper function to add utterances to collection if it does not exist
 * @param {object[]} tgtCollection target collection of utterance objects
 * @param {object []} srcCollection source collection of utterance objects
 * @param {string} attribute attribute to check on and copy over
 * @returns {void}
 */
const updateUtterancesList = function (srcCollection, tgtCollection, attribute) {
    (srcCollection || []).forEach(srcItem => {
        let matchInTarget = tgtCollection.find(item => item.intent.name == srcItem.intent);
        if(matchInTarget.utterances.length === 0) {
            addUtteranceToCollection(attribute, srcItem, matchInTarget);
            return;
        }
        if(!matchInTarget.utterances.find(item => item.text == srcItem[attribute])) {
            addUtteranceToCollection(attribute, srcItem, matchInTarget);
            return;
        }
    });
}
/**
 * helper function to add utterances to collection based on src type (pattern or utterance)
 * @param {string} attribute attribute to check on and copy over
 * @param {object} srcItem source object
 * @param {object []} matchInTarget target collection of objects
 * @returns {void}
 */
const addUtteranceToCollection = function (attribute, srcItem, matchInTarget) {
    if(attribute === 'text') {
        matchInTarget.utterances.push(srcItem); 
    } else {
        matchInTarget.utterances.push(new helperClasses.uttereances(srcItem.pattern,srcItem.intent,[]));
    }
}

module.exports = toLUHelpers;