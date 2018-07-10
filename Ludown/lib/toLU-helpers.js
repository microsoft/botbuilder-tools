#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const helperClasses = require('./enums/classes');
const toLUHelpers = {
    /**
     * Helper function to construct the file content based on parsed luis and qna objects
     * 
     * @param {object} LUISJSON Path to the root file passed in command line
     * @param {object} QnAJSONFromTSV content flushed out by commander
     * @param {String} luisFile input LUIS JSON file name
     * @param {String} QnAFile input QnA TSV file name
     * @param {boolean} skip_header If true, header information in the generated output text will be skipped. 
     * @returns {String} Generated Markdown file content to flush to disk
     * @throws {obejct} Throws on errors. Object includes errCode and text. 
     */
    constructMdFile : async function(LUISJSON, QnAJSONFromTSV, luisFile, QnAFile, skip_header) {
        let fileContent = '';
        const NEWLINE = '\r\n';
        if(LUISJSON.sourceFile) {
            let luisObj = new helperClasses.rLuisObj();
            let intentInObj;
            // go through LUIS stuff
            if(LUISJSON.model.intents.length >= 0) {
                LUISJSON.model.intents.forEach(function(intent) {
                    luisObj.intents.push(new helperClasses.intent(intent, []));
                });
            }
            if(LUISJSON.model.utterances.length >= 0) {
                LUISJSON.model.utterances.forEach(function(utteranceObj) {
                    intentInObj = luisObj.intents.filter(function(item) {
                        return item.intent.name == utteranceObj.intent;
                    });
                    intentInObj[0].utterances.push(utteranceObj);
                });
            }
            if(LUISJSON.model.patterns.length >= 0) {
                LUISJSON.model.patterns.forEach(function(patternObj) {
                    intentInObj = luisObj.intents.filter(function(item) {
                        return item.intent.name == patternObj.intent;
                    });
                    // only push this utterance if it does not already exist
                    let utteranceExists = intentInObj[0].utterances.filter(function(utterance) {
                        return utterance.text == patternObj.pattern;
                    });
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
            
            if(LUISJSON.model.entities && LUISJSON.model.entities.length >= 0) {
                fileContent += '> # Entity definitions' + NEWLINE + NEWLINE;
                LUISJSON.model.entities.forEach(function(entity) {
                    fileContent += '$' + entity.name + ':simple' + NEWLINE + NEWLINE;
                });
                fileContent += NEWLINE;
            }
        
            if(LUISJSON.model.prebuiltEntities && LUISJSON.model.prebuiltEntities.length >= 0){
                fileContent += '> # PREBUILT Entity definitions' + NEWLINE + NEWLINE;
                LUISJSON.model.prebuiltEntities.forEach(function(entity) {
                    fileContent += '$PREBUILT:' + entity.name + NEWLINE + NEWLINE;
                });
                fileContent += NEWLINE;
            }
            
            if(LUISJSON.model.model_features && LUISJSON.model.model_features.length >= 0) {
                fileContent += '> # Phrase list definitions' + NEWLINE + NEWLINE;
                LUISJSON.model.model_features.forEach(function(entity) {
                    fileContent += '$' + entity.name + ':phraseList' + NEWLINE;
                    fileContent += '- ' + entity.words + NEWLINE;
                });
                fileContent += NEWLINE;
            }
            if(LUISJSON.model.closedLists && LUISJSON.model.closedLists.length >= 0){
                fileContent += '> # List entities' + NEWLINE + NEWLINE;
                LUISJSON.model.closedLists.forEach(function(ListItem) {
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
        }
        // handle QnA stuff
        if(QnAJSONFromTSV.sourceFile) {
            // go through anything in QnAJSONFromTSV .. 
            fileContent += '> # QnA pairs' + NEWLINE + NEWLINE;
            let root = null;
            if(QnAJSONFromTSV.model.qnaDocuments) {
                root = QnAJSONFromTSV.model.qnaDocuments;
            } else {
                root = QnAJSONFromTSV.model.qnaList;
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
        }
        if(fileContent) {
            let now = new Date();
            if(skip_header) return fileContent
            fileContent = '> ! Automatically generated by [LUDown CLI](https://github.com/Microsoft/botbuilder-tools/tree/master/Ludown), ' + now.toString() + NEWLINE + NEWLINE + 
                          '> ! Source LUIS JSON file: ' + (LUISJSON.sourceFile?LUISJSON.sourceFile:'Not Specified') + NEWLINE + NEWLINE +
                          '> ! Source QnA TSV file: ' + (QnAJSONFromTSV.sourceFile?QnAJSONFromTSV.sourceFile:'Not Specified') + NEWLINE + NEWLINE + fileContent;
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