#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const helperClasses = require('./classes/hclasses');
const helpers = require('./helpers');
const NEWLINE = require('os').EOL;
const toLUHelpers = {
    /**
     * Construct lu file content from LUIS JSON object
     * @param {object} LUISJSON LUIS JSON object
     * @returns {String} Generated lu content 
     */
    constructMdFromLUISJSON : async function(LUISJSON) {
        let fileContent = '';
        let luisObj = new helperClasses.rLuisObj();
        let intentInObj;
        if(LUISJSON.intents.length >= 0) {
            LUISJSON.intents.forEach(function(intent) {
                luisObj.intents.push(new helperClasses.intent(intent, []));
            });
        }
        if(LUISJSON.utterances.length >= 0) {
            LUISJSON.utterances.forEach(function(utteranceObj) {
                intentInObj = luisObj.intents.filter(function(item) {
                    return item.intent.name == utteranceObj.intent;
                });
                intentInObj[0].utterances.push(utteranceObj);
            });
        }
        if(LUISJSON.patterns.length >= 0) {
            LUISJSON.patterns.forEach(function(patternObj) {
                intentInObj = luisObj.intents.filter(function(item) {
                    return item.intent.name == patternObj.intent;
                });
                // only push this utterance if it does not already exist
                let utteranceExists = helpers.filterMatch(intentInObj[0].utterances, 'text', patternObj.pattern)
                if(utteranceExists.length === 0) {
                    intentInObj[0].utterances.push(new helperClasses.uttereances(patternObj.pattern,patternObj.intent,[]));
                }
            });
        }
        if(luisObj.intents.length >= 0) {
            fileContent += NEWLINE;
            fileContent += '> # Intent definitions' + NEWLINE + NEWLINE;
            // write out intents and utterances..
            luisObj.intents.forEach(function(intent) {
                fileContent += '## ' + intent.intent.name + NEWLINE;
                intent.utterances.forEach(function(utterance) {
                    let updatedText = utterance.text;
                    if(utterance.entities.length >= 0) {
                        // update utterance for each entity
                        let text = utterance.text;
                        let offSet = 0;
                        let sortedEntitiesList = objectSortByStartPos(utterance.entities);
                        sortedEntitiesList.forEach(function(entity) {
                            let label = text.substring(entity.startPos, entity.endPos + 1);
                            let entityWithLabel = '{' + entity.entity + '=' + label + '}';
                            let leftText = updatedText.substring(0, entity.startPos + offSet);
                            let rightText = updatedText.substring(entity.endPos + 1 + offSet);
                            updatedText = leftText + entityWithLabel + rightText;
                            offSet += entityWithLabel.length - label.length;
                        })
                    }
                    if(updatedText) fileContent += '- ' + updatedText + NEWLINE;
                });
                fileContent += NEWLINE + NEWLINE;
            });
        }
        
        if(LUISJSON.entities && LUISJSON.entities.length >= 0) {
            fileContent += '> # Entity definitions' + NEWLINE + NEWLINE;
            LUISJSON.entities.forEach(function(entity) {
                fileContent += '$' + entity.name + ':simple' + NEWLINE + NEWLINE;
            });
            fileContent += NEWLINE;
        }
    
        if(LUISJSON.prebuiltEntities && LUISJSON.prebuiltEntities.length >= 0){
            fileContent += '> # PREBUILT Entity definitions' + NEWLINE + NEWLINE;
            LUISJSON.prebuiltEntities.forEach(function(entity) {
                fileContent += '$PREBUILT:' + entity.name + NEWLINE + NEWLINE;
            });
            fileContent += NEWLINE;
        }
        
        if(LUISJSON.model_features && LUISJSON.model_features.length >= 0) {
            fileContent += '> # Phrase list definitions' + NEWLINE + NEWLINE;
            LUISJSON.model_features.forEach(function(entity) {
                fileContent += '$' + entity.name + ':phraseList' + NEWLINE;
                fileContent += '- ' + entity.words + NEWLINE;
            });
            fileContent += NEWLINE;
        }
        if(LUISJSON.closedLists && LUISJSON.closedLists.length >= 0){
            fileContent += '> # List entities' + NEWLINE + NEWLINE;
            LUISJSON.closedLists.forEach(function(ListItem) {
                ListItem.subLists.forEach(function(list) {
                    fileContent += '$' + ListItem.name + ':' + list.canonicalForm + '=' + NEWLINE;
                    list.list.forEach(function(listItem) {
                        fileContent += '- ' + listItem + NEWLINE;
                    });
                    fileContent += NEWLINE;
                });
                fileContent += NEWLINE + NEWLINE;
            });
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
     * @returns {String} Generated Markdown file content to flush to disk
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    constructMdFileHelper : async function(LUISJSON, QnAJSONFromTSV, QnAAltJSON, luisFile, QnAFile, skip_header) {
        let fileContent = '';
        if(LUISJSON.sourceFile) {
            fileContent += await toLUHelpers.constructMdFromLUISJSON(LUISJSON.model);
        }
        if(QnAJSONFromTSV.sourceFile) {
            fileContent += await toLUHelpers.constructMdFromQnAJSON(QnAJSONFromTSV.model)
        }
        if(QnAAltJSON.sourceFile) {
            fileContent += await toLUHelpers.constructMdFromQnAAlterationJSON(QnAAltJSON.model)
        }
        if(fileContent) {
            let now = new Date();
            if(skip_header) return fileContent
            let t = fileContent; 
            fileContent = '> ! Automatically generated by [LUDown CLI](https://github.com/Microsoft/botbuilder-tools/tree/master/Ludown), ' + now.toString() + NEWLINE + NEWLINE;
            fileContent += '> ! Source LUIS JSON file: ' + (LUISJSON.sourceFile?LUISJSON.sourceFile:'Not Specified') + NEWLINE + NEWLINE;
            fileContent += '> ! Source QnA TSV file: ' + (QnAJSONFromTSV.sourceFile?QnAJSONFromTSV.sourceFile:'Not Specified') + NEWLINE + NEWLINE;
            fileContent += '> ! Source QnA Alterations file: ' + (QnAAltJSON.sourceFile?QnAAltJSON.sourceFile:'Not Specified') + NEWLINE + NEWLINE;
            fileContent += t;
        }
        return fileContent;
    }
};
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

module.exports = toLUHelpers;