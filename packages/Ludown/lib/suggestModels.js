#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
require('./utils');
const path = require('path');
const hClasses = require('./classes/hclasses');
const parseFileContents = require('./parseFileContents');
const haveLUISContent = require('./classes/LUIS').haveLUISContent;
const retCode = require('./enums/CLI-errors');
const exception = require('./classes/exception');
const chalk = require('chalk');
const LUIS = require('./classes/LUIS');
const addItemOrRoleIfNotPresent = require('./parseFileContents').addItemOrRoleIfNotPresent;
const LUISObjEnum = require('./enums/luisobjenum');
const utterance = require('./classes/hclasses').uttereances;
const getOutputFolder = require('./helpers').getOutputFolder;
const toLUHelpers = require('./toLU-helpers');
const haveQnAContent = require('./classes/qna').haveQnAContent;
const suggestModels = {
    /**
     * 
     * @param {Object} allParsedContent 
     * @param {object} program Content flushed out by commander
     * @param {cmdEnum} cmd Parse to either LUIS or QnA 
     * @returns {void}
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    suggestModelsAndWriteToDisk : async function(allParsedContent, program, cmd) {
        if (program.verbose) process.stdout.write(chalk.default.whiteBright("Analyzing parsed files... \n"));
        let crossFeedModelsReq = program.cross_feed_models;
        let add_qna_pairs = program.add_qna_pairs;
        let auto_add_qna_metadata = program.auto_add_qna_metadata;
        let rootDialogFolderName = program.root_dialog ? program.root_dialog : undefined;
        let baseFolderPath = path.resolve(program.lu_folder);
        let groupedObject = await groupFilesByHierarchy(allParsedContent, baseFolderPath, program);
        if (program.verbose) process.stdout.write(chalk.default.whiteBright("Grouped files by folder x lang hierarchy... \n"));
        
        // Collate and validate root as well as all child models
        let collatedObj = await collateAndValidateByFolderAndLang(groupedObject);

        // Extract rootDialog from collection
        let rootDialogModels = {
            "LUISContent": Object.assign({}, collatedObj.LUISContent[rootDialogFolderName]),
            "QnAContent": Object.assign({}, collatedObj.QnAContent[rootDialogFolderName]),
            "QnAAlterations": Object.assign({}, collatedObj.QnAAlterations[rootDialogFolderName])
        };

        // delete root dialog from groupedObject
        try {
            delete collatedObj.LUISContent[rootDialogFolderName];
            delete collatedObj.QnAContent[rootDialogFolderName];
            delete collatedObj.QnAAlterations[rootDialogFolderName];
        } catch (err) { /* rootDialog folder does not have to exist. So skip throwing an exception */}
        
        // Apply each rule as enabled to update two sets of objects - rootDialog and [childDialog]

        // Rule 1 - identify triggerIntent from each child model collection.
        await identifyTriggerIntentForAllChildren(collatedObj.LUISContent);

        // Rule 2 - rootDialog model has all trigger intents + referenced entities from all child models, de-duped
        // Rule 3 - remove trigger model from child dialogs
        await updateRootDialogModelWithTriggerIntents(rootDialogModels.LUISContent, collatedObj.LUISContent);

        // Rule 5 - With cross_feed_models option specified, all child model's NONE intent has all other child model's trigger intents
        if (crossFeedModelsReq) {
            await crossFeedModels(rootDialogModels.LUISContent, collatedObj.LUISContent);
        }
        // Rule 6 - with use_qna_pairs, all questions for that lang's model is automatically 
        // added to 'QnA' intent of all models including the root model.
        if (add_qna_pairs) {
            await addQnAPairsToModels(rootDialogModels, collatedObj);
        }

        // Rule 7 - with auto_add_qna_metadata, all qna pairs for .qna found under a dialog folder automatically have dialogName = folderName added as meta-data.
        if (auto_add_qna_metadata) {
            await autoAddQnAMetaData(rootDialogModels.QnAContent, collatedObj.QnAContent);
        }

        // Remove *ludown* markers from root models
        await removeLUDownMarkers(rootDialogModels.LUISContent);

        // Rule 4 - remove child model suggestion if the only intent in the child is the trigger intent
        await cleanUpChildWithNoIntentsLeft(collatedObj.LUISContent);

        // Delete 'triggerIntent' property from all LUIS models
        await deleteTriggerIntent(rootDialogModels.LUISContent, collatedObj.LUISContent);

        // Collate all child QnA models to one per lang
        await collateQnAModelsToOnePerLang(rootDialogModels.QnAContent, collatedObj.QnAContent);
        
        // Collate all child QnA alternations to one per lang
        await collateQnAAlterationsPerLang(rootDialogModels.QnAAlterations, collatedObj.QnAAlterations);
        
        // Final content structure for lufiles and luisModels is folder x lang
        // Final content structure for all qna is one per lang
        let contentToFlushToDisk = {
            "luFiles" : {},
            "qnaFiles": {},
            "qnaAlterationFiles": {},
            "luisModels": {},
            "qnaModels": {},
            "qnaAlterations": {}
        }
        await getModelsAsLUContent(rootDialogModels, collatedObj, contentToFlushToDisk, rootDialogFolderName);

        // Write out .lu or .qna file for each collated json
        // Generate .lu file for each collated json
        // End result 
        // One QnA model suggested per lang
        // One LUIS model suggested per Dialog x lang (if applicable)

        await writeModelsToDisk(rootDialogModels, collatedObj, program);
    }
};

module.exports = suggestModels;

const getModelsAsLUContent = async function(rootModels, childModels, retPayload, rootDialogName) {
    for (let rlKey in rootModels.LUISContent) {
        if (haveLUISContent(rootModels.LUISContent[rlKey])) {
            retPayload.luFiles[rlKey] = new Array({
                "DialogName" : rootDialogName,
                "payload" : await toLUHelpers.constructMdFromLUISJSON(rootModels.LUISContent[rlKey])
            });
            retPayload.luisModels[rlKey] = new Array({
                "DialogName": rootDialogName,
                "payload": rootModels.LUISContent[rlKey]
            })
        }
    }

    for (let rqKey in rootModels.QnAContent) {
        if (haveQnAContent(rootModels.QnAContent[rqKey])) {
            retPayload.qnaFiles[rqKey] = new Array(await toLUHelpers.constructMdFromQnAJSON(rootModels.QnAContent[rqKey]))
            retPayload.qnaModels[rqKey] = new Array(rootModels.QnAContent[rqKey])
        }
    }

    for (let rAKey in rootModels.QnAAlterations) {
        if (rootModels.QnAAlterations[rAKey].wordAlterations.length > 0) {
            retPayload.qnaAlterationFiles[rAKey] = new Array(await toLUHelpers.constructMdFromQnAAlterationJSON(rootModels.QnAAlterations[rAKey]))
            retPayload.qnaAlterations[rAKey] = new Array(rootModels.QnAAlterations[rAKey])
        }
    }

    for (let cFKey in childModels.LUISContent) {
        for (let clKey in childModels.LUISContent[cFKey]) {
            if (haveLUISContent(childModels.LUISContent[cFKey][clKey])) {
                let luPayload = {
                    "DialogName" : rootDialogName,
                    "payload" : await toLUHelpers.constructMdFromLUISJSON(childModels.LUISContent[cFKey][clKey])
                }
                if (retPayload.luFiles[clKey] === undefined) {
                    retPayload.luFiles[clKey] = new Array(luPayload);
                } else {
                    retPayload.luFiles[clKey].push(luPayload);
                }
                if (retPayload.luisModels[clKey] === undefined) {
                    retPayload.luisModels[clKey] = new Array({
                        "DialogName": rootDialogName,
                        "payload": childModels.LUISContent[cFKey][clKey]
                    })
                } else {
                    retPayload.luisModels[clKey].push({
                        "DialogName": rootDialogName,
                        "payload": childModels.LUISContent[cFKey][clKey]
                    })
                }                
            }
        }
    }
}
/**
 * Helper to write files to disk.
 * @param {Object} rootModels 
 * @param {Object} childModels 
 * @param {Object} program 
 */
const writeModelsToDisk = async function(rootModels, childModels, program) {
    let outFolder;
    try {
        outFolder = getOutputFolder(program)
    } catch (err) {
        throw (err);
    }
    let versionId = "0.1";
    let luis_schema_version = "3.0.0";
    
    // name
    // desc
    // culture

    // QnA - name

    
}
/**
 * Helper to collate QnA alternations to one per lang.
 * @param {Object} rootQnAModels 
 * @param {Object} childQnAModels 
 */
const collateQnAAlterationsPerLang = async function(rootQnAModels, childQnAModels) {
    let QnACollectionPerLang = {};
    for (let fKey in childQnAModels) {
        for (let lKey in childQnAModels[fKey]) {
            if (QnACollectionPerLang[lKey] === undefined) {
                QnACollectionPerLang[lKey] = [{"qnaAlterations": childQnAModels[fKey][lKey]}];
            } else {
                QnACollectionPerLang[lKey].push({"qnaAlterations": childQnAModels[fKey][lKey]});
            }
        }
    }

    for (let rlKey in rootQnAModels) {
        if (QnACollectionPerLang[rlKey] === undefined) {
            QnACollectionPerLang[rlKey] = [{"qnaAlterations": rootQnAModels[rlKey]}];
        } else {
            QnACollectionPerLang[rlKey].push({"qnaAlterations": rootQnAModels[rlKey]});
        }
    }

    for (let clKey in QnACollectionPerLang) {
        if (QnACollectionPerLang[clKey].length !== 1) {
            // Collate and flatten collection per lang.
            QnACollectionPerLang[clKey] = await parseFileContents.collateQnAAlterations(QnACollectionPerLang[clKey]);
        } else {
            QnACollectionPerLang[clKey] = QnACollectionPerLang[clKey][0].qnaAlterations;
        }
    }
    Object.assign(rootQnAModels, QnACollectionPerLang);
    childQnAModels = undefined;
}

/**
 * Helper function to collate all QnA models to one per lang.
 * @param {Object} rootQnAModels 
 * @param {Object} childQnAModels 
 */
const collateQnAModelsToOnePerLang = async function(rootQnAModels, childQnAModels) {
    let QnACollectionPerLang = {};
    for (let fKey in childQnAModels) {
        for (let lKey in childQnAModels[fKey]) {
            if (QnACollectionPerLang[lKey] === undefined) {
                QnACollectionPerLang[lKey] = [{"qnaJsonStructure": childQnAModels[fKey][lKey]}];
            } else {
                QnACollectionPerLang[lKey].push({"qnaJsonStructure": childQnAModels[fKey][lKey]});
            }
        }
    }

    for (let rlKey in rootQnAModels) {
        if (QnACollectionPerLang[rlKey] === undefined) {
            QnACollectionPerLang[rlKey] = [{"qnaJsonStructure": rootQnAModels[rlKey]}];
        } else {
            QnACollectionPerLang[rlKey].push({"qnaJsonStructure": rootQnAModels[rlKey]});
        }
    }

    for (let clKey in QnACollectionPerLang) {
        if (QnACollectionPerLang[clKey].length !== 1) {
            // Collate and flatten collection per lang.
            QnACollectionPerLang[clKey] = await parseFileContents.collateQnAFiles(QnACollectionPerLang[clKey]);
        } else {
            QnACollectionPerLang[clKey] = QnACollectionPerLang[clKey][0].qnaJsonStructure;
        }
    }
    Object.assign(rootQnAModels, QnACollectionPerLang);
    childQnAModels = undefined;
}

/**
 * Helper to remove *ludown* off root model's intent markers
 * @param {Object} rootModels 
 */
const removeLUDownMarkers = async function(rootModels) {
    for (let lKey in rootModels) {
        rootModels[lKey].intents.forEach(intent => {
            if (intent.name.includes("*ludown*")) {
                intent.name = intent.name.replace("*ludown*", '');
            }
        })

        rootModels[lKey].utterances.forEach(utterance => {
            if (utterance.intent.includes("*ludown*")) {
                utterance.intent = utterance.intent.replace("*ludown*", "");
            }
        })
    }

}
/**
 * Helper to delete trigger intent property off all child models and root models.
 * @param {Object} childLUISContent 
 */
const deleteTriggerIntent = async function(rootModels, childLUISContent) {
    for (let fKey in childLUISContent) {
        for (let lKey in childLUISContent[fKey]) {
            if (childLUISContent[fKey][lKey].triggerIntent !== undefined) {
                delete childLUISContent[fKey][lKey].triggerIntent;
            }
        }
    }

    for (let rlKey in rootModels) {
        if (rootModels[rlKey].triggerIntent != undefined) {
            delete rootModels[rlKey].triggerIntent;
        }
    }
}
/**
 * Helper to automatically add 'dialogName':'folderName' to qna pairs found under a specific folder.
 * @param {Object} rootQnAContent 
 * @param {Object} childQnACollection 
 */
const autoAddQnAMetaData = async function(rootQnAContent, childQnACollection) {
    for (let fKey in childQnACollection) {
        for (let lKey in childQnACollection[fKey]) {
            (childQnACollection[fKey][lKey].qnaList || []).forEach(qaPair => {
                let mdExists = qaPair.metadata.find(item => item.name == 'dialogName');
                if (mdExists === undefined) {
                    qaPair.metadata.push({"name": "dialogName", "value": fKey});
                }
            })
        }
    }
}
/**
 * Helper to add QnA pairs found under a dialog x lang automatically to 'QnA' intent for that child.
 * 
 * @param {Object} rootDialogModels 
 * @param {Object} collatedObj 
 */
const addQnAPairsToModels = async function(rootDialogModels, collatedObj) {
    let rootLUISModels = rootDialogModels.LUISContent;
    let rootQnAModels = rootDialogModels.QnAContent;
    let childLUISModels = collatedObj.LUISContent;
    let childQnAModels = collatedObj.QnAContent;

    
    for (let lKey in rootQnAModels) {
        if (rootQnAModels[lKey].qnaList.length !== 0) {
            let questions = [];
            rootQnAModels[lKey].qnaList.forEach(item => item.questions.forEach(q => questions.push(q)));
            if (rootLUISModels[lKey] !== undefined) {
                questions.forEach(question => {
                    rootLUISModels[lKey].utterances.push(new utterance(question, 'QnA', []));
                })
            }
        }
    }

    for (let cfKey in childQnAModels) {
        for (let clKey in childQnAModels[cfKey]) {
            if (childQnAModels[cfKey][clKey].qnaList.length !== 0) {
                let questions = [];
                childQnAModels[cfKey][clKey].qnaList.forEach(item => item.questions.forEach(q => questions.push(q)));
                if (childLUISModels[cfKey][clKey] !== undefined) {
                    questions.forEach(question => {
                        childLUISModels[cfKey][clKey].utterances.push(new utterance(question, 'QnA', []));
                    })
                }
            }
        }
    }
}
/**
 * Helper to cross feed models. All child model's None intent will have all trigger utterances of all other models.
 * @param {Object} rootLUISModel 
 * @param {Object} childLUISModelCollection 
 */
const crossFeedModels = async function(rootLUISModel, childLUISModelCollection) {
    for (let fKey in childLUISModelCollection) {
        for (let lKey in childLUISModelCollection[fKey]) {

            // Find all utterances in root model that is not the child's trigger intent
            let otherTriggerUtterancesInRoot = rootLUISModel[lKey].utterances.filter(item => {
                if (!(item.intent.includes('*ludown*'))) return false;
                return item.intent != childLUISModelCollection[fKey][lKey].triggerIntent + '*ludown*';
            });

            (otherTriggerUtterancesInRoot || []).forEach(utterance => {
                utterance.intent = "None";
                utterance.entities = [];
                if (utterance.role !== undefined) utterance.role = '';
                childLUISModelCollection[fKey][lKey].utterances.push(utterance);
            })
        }
    }
}
/**
 * Helper function to clear out child with no intents
 * @param {Object} childLUISModelCollection 
 */
const cleanUpChildWithNoIntentsLeft = async function(childLUISModelCollection) {
    for (let fKey in childLUISModelCollection) {
        for (let lKey in childLUISModelCollection[fKey]) {
            if (childLUISModelCollection[fKey][lKey].intents.length === 0) {
                // delete this child model
                delete childLUISModelCollection[fKey][lKey]
            }
        }
        if (Object.keys(childLUISModelCollection[fKey]).length === 0) {
            delete childLUISModelCollection[fKey];
        }
    }
}
/**
 * Helper to update rootLUIS model with trigger intents and related entities from all child models
 * @param {Object} rootLUISModel 
 * @param {Object} childLUISModelCollection 
 */
const updateRootDialogModelWithTriggerIntents = async function(rootLUISModel, childLUISModelCollection) {
    if (!(rootLUISModel instanceof Object)) return;
    if (!(childLUISModelCollection instanceof Object)) return;

    // rootDialog model has all trigger intents + referenced entities from all child models, de-duped
    for (let fKey in childLUISModelCollection) {
        for (let lKey in childLUISModelCollection[fKey]) {
            if (rootLUISModel[lKey] === undefined) {
                // Add a blank model for this lang to root.
                rootLUISModel[lKey] = new LUIS();
            }

            // Add Child's trigger intent to root if it does not exist
            let triggerIntentInRoot = rootLUISModel[lKey].intents.find(item => item.name == childLUISModelCollection[fKey][lKey].triggerIntent);
            if (triggerIntentInRoot === undefined) {
                rootLUISModel[lKey].intents.push({"name": childLUISModelCollection[fKey][lKey].triggerIntent + '*ludown*'});
            }

            // Examine utterances in child models and add them to root dialog. For each labelled utterance, add simple and composite entities to parent
            let triggerUtterancesInChild = childLUISModelCollection[fKey][lKey].utterances.filter(utterance => utterance.intent == childLUISModelCollection[fKey][lKey].triggerIntent);

            triggerUtterancesInChild.forEach(utterance => {
                // Add *ludown* marker so we know this intent was added by ludown.
                // This will be removed before the models are written out.
                utterance.intent += '*ludown*';
                rootLUISModel[lKey].utterances.push(utterance);
                if (utterance.entities.length !== 0) {
                    utterance.entities.forEach(entityInUtterance => {
                        // Find the labelled entity in simple or composite
                        let simpleEntityMatch = childLUISModelCollection[fKey][lKey].entities.find(entity => entity.name == entityInUtterance.entity);
                        if (simpleEntityMatch !== undefined) {
                            addItemOrRoleIfNotPresent(rootLUISModel[lKey], LUISObjEnum.ENTITIES, entityInUtterance.entity, (entityInUtterance.role === undefined ? [] : entityInUtterance.role));
                        } else {
                            // Find the composite entity and add it.
                            let compositeEntityMatch = childLUISModelCollection[fKey][lKey].composites.find(entity => entity.name == entityInUtterance.entity);
                            if (compositeEntityMatch !== undefined) {
                                addItemOrRoleIfNotPresent(rootLUISModel[lKey], LUISObjEnum.COMPOSITES, entityInUtterance.entity, (entityInUtterance.role === undefined ? [] : entityInUtterance.role));
                            } else {
                                // see if we have a new role
                                if (!compositeEntityMatch[0].roles.includes(entityInUtterance.role)) {
                                    compositeEntityMatch[0].roles.push(entityInUtterance.role);
                                } else {
                                    throw (new exception(retCode.errorCode.INVALID_COMPOSITE_ENTITY, `No matching entity definition found for '${entityInUtterance.entity}' under '${fKey}' for language '${lKey}'.`));
                                }
                                // throw
                            }
                        }
                    })
                }
            });

            // Examine and pull patterns forward.
            let patternsForTriggerIntent = childLUISModelCollection[fKey][lKey].patterns.filter(item => 
                item.intent == childLUISModelCollection[fKey][lKey].triggerIntent);

            if (patternsForTriggerIntent.length !== 0) {
                patternsForTriggerIntent.forEach(cPattern => {
                    //cPattern.intent += '*ludown*';
                    let patternExistsInRoot = rootLUISModel[lKey].patterns.find(item => item.pattern == cPattern.pattern);
                    if (patternExistsInRoot === undefined) {
                        rootLUISModel[lKey].patterns.push(cPattern);
                    } else {
                        if (cPattern.intent !== patternExistsInRoot.intent) {
                            throw (new exception(retCode.errorCode.INVALID_INPUT, `Pattern '${cPattern.pattern}' has duplicate intent definitions. '${patternExistsInRoot.intent}' in rootDialog and '${cPattern.intent}' in child dialog.`));
                        }
                    }
                });
            } else {
                if (triggerUtterancesInChild.length === 0) {
                    // No utterances found in child.
                    throw (new exception(retCode.errorCode.INVALID_INPUT, `No utterances or patterns found for trigger intent ${childLUISModelCollection[fKey][lKey].triggerIntent}`));
                }
            }

            // Handle all other entities in child model
            // Pre-built entities in child model can be safely pulled up to root.
            (childLUISModelCollection[fKey][lKey].prebuiltEntities || []).forEach(prebuiltEntity => {
                addItemOrRoleIfNotPresent(rootLUISModel[lKey], LUISObjEnum.PREBUILT, prebuiltEntity.name, prebuiltEntity.roles);
            });
            
            // Pull up List entities
            (childLUISModelCollection[fKey][lKey].closedLists || []).forEach(listEntity => {
                let rootHasListEntity = (rootLUISModel[lKey].closedLists || []).find(item => item.name == listEntity.name);
                if (rootHasListEntity === undefined) {
                    rootLUISModel[lKey].closedLists.push(listEntity);
                } else {
                    // Deal with sub-list match and synonyms match
                    listEntity.subLists.forEach(subList => {
                        let subListExists = rootHasListEntity.subLists.find(item => item.canonicalForm == subList.canonicalForm);
                        if (subListExists === undefined) {
                            rootHasListEntity.subLists.push(subList);
                        } else {
                            subList.list.forEach(synonym => {
                                if (!subListExists.list.includes(synonym)){
                                    subListExists.list.push(synonym);
                                }
                            })
                        }
                    });

                    // Add roles if needed
                    listEntity.roles.forEach(role => {
                        if(!rootHasListEntity.roles.includes(role)) {
                            rootHasListEntity.roles.push(role);
                        }
                    })
                }
            });

            // Handle regex entities
            (childLUISModelCollection[fKey][lKey].regex_entities || []).forEach(regexEntity => {
                let rootHasRegExEntity = rootLUISModel[lKey].regex_entities.find(item => item.name == regexEntity.name);
                if (rootHasRegExEntity === undefined) {
                    rootLUISModel[lKey].regex_entities.push(regexEntity);
                } else {
                    // throw an error if patterns are different
                    if (regexEntity.regexPattern !== rootHasRegExEntity.regexPattern) {
                        throw (new exception(retCode.errorCode.INVALID_INPUT, `Regex entity '${regexEntity.name}' has invalid definition '${regexEntity.regexPattern}' under '${fKey}' for language '${lKey}' and '${rootHasRegExEntity.regexPattern}' under rootDialog.`));
                    } else {
                        // verify roles are pulled up
                        regexEntity.roles.forEach(role => {
                            if (!rootHasRegExEntity.roles.includes(role)) {
                                rootHasRegExEntity.roles.push(role);
                            }
                        })
                    }
                }
            });

            // Handle pattern.any entities
            (childLUISModelCollection[fKey][lKey].patternAnyEntities || []).forEach(paEntity => {
                let rootHasPAEntity = rootLUISModel[lKey].patternAnyEntities.find(item => item.name == paEntity.name);
                if (rootHasPAEntity === undefined) {
                    rootLUISModel[lKey].patternAnyEntities.push(paEntity);
                } else {
                    paEntity.roles.forEach(role => {
                        if (!rootHasPAEntity.roles.includes(role)) {
                            rootHasPAEntity.roles.push(role);
                        }
                    })
                }
            });

            // Handle Phraselist entities
            (childLUISModelCollection[fKey][lKey].model_features || []).forEach(plEntity => {
                let rootHasPlEntity = rootLUISModel[lKey].model_features.find(item => item.name == plEntity.name);
                if (rootHasPlEntity === undefined) {
                    rootLUISModel[lKey].model_features.push(plEntity);
                } else {
                    // verify words are same
                    let rootwords = rootHasPlEntity.words.split(',').map(item => item.trim());
                    let childwords = plEntity.words.split(',').map(item => item.trim());
                    (childwords || []).forEach(word => {
                        if (!rootwords.includes(word)) {
                            rootHasPlEntity.words += `,${word}`;
                        }
                    });
                }
            });

            // Remove trigger intent from child model
            let childIdx = -1;
            childLUISModelCollection[fKey][lKey].intents.find((item, idx) => {
                if (item.name === childLUISModelCollection[fKey][lKey].triggerIntent) {
                    childIdx = idx;
                    return true;
                }
                return false;
            });

            childLUISModelCollection[fKey][lKey].intents.splice(childIdx, 1);

            // Remove all utterances that refer to trigger model in child
            childLUISModelCollection[fKey][lKey].utterances = childLUISModelCollection[fKey][lKey].utterances.filter(utterance => 
                utterance.intent != childLUISModelCollection[fKey][lKey].triggerIntent + '*ludown*');

            // Remove all patterns that refer to trigger intent in child
            childLUISModelCollection[fKey][lKey].patterns = childLUISModelCollection[fKey][lKey].patterns.filter(item => 
                item.intent != childLUISModelCollection[fKey][lKey].triggerIntent);
        }
    }
}
/**
 * Helper function that identifies trigger intent for each parsed child model.
 * @param {Object} LUISContentCollection 
 */
const identifyTriggerIntentForAllChildren = async function(LUISContentCollection) {
    // Trigger intent is identified by DialogName.lu (or a .lu file in this folder) that has 
    /// either an intent named 'DialogName' or an intent definition that includes "[trigger intent]".
    if (!(LUISContentCollection instanceof Object)) return;
    for (let fKey in LUISContentCollection) {
        for (let lKey in LUISContentCollection[fKey]) {
            // Examine if this payload already has a trigger intent identied by parser.
            if (LUISContentCollection[fKey][lKey].triggerIntent === undefined) {
                // Accomodate for intent names in .lu files containing spaces. 
                // Spaces are replaced with _ to match SDK behavior for intent names
                // So folder root_dialog is same as # root dialog in an .lu file
                // This match is case insensitive
                let intentExists = (LUISContentCollection[fKey][lKey].intents || []).find(intent => {
                    return intent.name.replace(/ /g, '_').toLowerCase() == fKey.toLowerCase()
                });
                if (intentExists === undefined) {
                    // No trigger intent found. 
                    throw (new exception(retCode.errorCode.INVALID_INPUT, `No trigger intent found under '${fKey}' for language '${lKey}'. \n Trigger intent is identified by a .lu file under the '${fKey}' folder with '*.${lKey}.lu' in file name that has either - \n    an intent named '${fKey}' or \n    an intent definition that includes "[trigger intent]"\n Note: Spaces in an intent definition in your .lu file are replaced with '_'.`));
                } else {
                    LUISContentCollection[fKey][lKey].triggerIntent = intentExists.name;
                }
            }
        }
    }
}
/**
 * Helper to gather and group files based on requested type of content.
 * @param {Object} parsedObject 
 * @param {Object} groupedFiles 
 * @param {String} contentType 
 * @param {String} baseFolderPath 
 * @param {Object} program 
 * @returns {void}
 */
const gatherAndGroupFiles = function(parsedObject, groupedFiles, contentType, baseFolderPath, program) {
    //let folderScope = parsedObject.srcFile.replace(baseFolderPath, '');
    let relPath = path.relative(baseFolderPath, parsedObject.srcFile);
    let relBaseFolder = relPath.split(new RegExp(/[\/\\]/g))[0];
    // get lang code for file 
    let tokenizedFileName = path.basename(parsedObject.srcFile).split('.');
    let lang = '';
    if (tokenizedFileName.length === 2) {
        // Go with the lang code passed in or default.
        lang = program.luis_culture;
    } else {
        lang = tokenizedFileName[1];
    }
    let fParsed = new hClasses.fileParsedContent(parsedObject.srcFile, parsedObject);
    if (groupedFiles[contentType].hasOwnProperty(relBaseFolder)) {
        // See if we already have a section for this lang
        if (groupedFiles[contentType][relBaseFolder][lang] === undefined) {
            groupedFiles[contentType][relBaseFolder][lang] = [fParsed];
        } else {
            // see if we have the specific file
            let fileExits = (groupedFiles[contentType][relBaseFolder][lang] || []).forEach(item => item[parsedObject.srcFile] == item[parsedObject.srcFile]);
            if (fileExits === undefined)  {
                groupedFiles[contentType][relBaseFolder][lang].push(fParsed);
            }
        }
    } else {
        groupedFiles[contentType][relBaseFolder] = {};
        groupedFiles[contentType][relBaseFolder][lang] = [fParsed];
    }
}
/**
 * Helper function to group parsed content by relative folder paths. 
 * @param {Object} allParsedContent 
 * @param {String} baseFolderPath 
 * @param {Object} program
 * @returns {Object} grouped collection of files by folder hierarchy x language code.
 */
const groupFilesByHierarchy = async function(allParsedContent, baseFolderPath, program) {
    let groupedFiles = {
        "LUISContent": {},
        "QnAContent": {},
        "QnAAlterations": {}
    };
    (allParsedContent.LUISContent || []).forEach(parsedObject => {
         gatherAndGroupFiles(parsedObject, groupedFiles, "LUISContent", baseFolderPath, program);
    });
    (allParsedContent.QnAContent || []).forEach(parsedObject => {
         gatherAndGroupFiles(parsedObject, groupedFiles, "QnAContent", baseFolderPath, program);
    });
    (allParsedContent.QnAAlterations || []).forEach(parsedObject => {
         gatherAndGroupFiles(parsedObject, groupedFiles, "QnAAlterations", baseFolderPath, program);
    });
    return groupedFiles;
};
/**
 * Helper to collate and validate all content. Returns an object of collated content per type
 * per folder, per lang
 * @param {Object} groupedObject 
 */
const collateAndValidateByFolderAndLang = async function(groupedObject) {
    let retContent = {
        "LUISContent": {},
        "QnAContent": {},
        "QnAAlterations": {}
    };

    for (var fLKeys in groupedObject.LUISContent) {
        for (let lKeys in groupedObject.LUISContent[fLKeys]) {
            let collectionPerLang = groupedObject.LUISContent[fLKeys][lKeys];
            let filterdItemsToCollate = collectionPerLang.filter(item => item.parsedObject.includeInCollate);
            let itemsToCollate = [];
            let triggerIntent = (filterdItemsToCollate || []).filter(item => item.parsedObject.triggerIntent != undefined);
            if (triggerIntent.length > 1) {
                let filesList = '    ';
                triggerIntent.forEach(item => filesList += item.fileName + '\n    ');
                throw (new exception(retCode.errorCode.INVALID_INPUT, `Multiple trigger intents found under '${fLKeys}' for language '${lKeys}'. \n${filesList}`));
            } 
            (filterdItemsToCollate || []).forEach(item => itemsToCollate.push(item.parsedObject));
            let finalLUISJSON = await parseFileContents.collateLUISFiles(itemsToCollate);
            if (haveLUISContent(finalLUISJSON)) await parseFileContents.validateLUISBlob(finalLUISJSON);
            if (triggerIntent.length === 1) {
                finalLUISJSON['triggerIntent'] = triggerIntent[0].parsedObject.triggerIntent;
            }
            // Set correct locale on this LUIS json to be specific to lang
            // This is required because the parse command does not provide a locale
            finalLUISJSON.culture = lKeys.toLowerCase();
            if (retContent.LUISContent[fLKeys] === undefined) {
                retContent.LUISContent[fLKeys] = {};
            }
            retContent.LUISContent[fLKeys][lKeys] = finalLUISJSON;
        } 
    }

    for (var fQKeys in groupedObject.QnAContent) {
        for (let lKeys in groupedObject.QnAContent[fQKeys]) {
            let collectionPerLang = groupedObject.QnAContent[fQKeys][lKeys];
            let filterdItemsToCollate = collectionPerLang.filter(item => item.parsedObject.includeInCollate);
            let itemsToCollate = [];
            (filterdItemsToCollate || []).forEach(item => itemsToCollate.push(item.parsedObject));
            let finalQnAJSON = await parseFileContents.collateQnAFiles(itemsToCollate);
            if (retContent.QnAContent[fQKeys] === undefined) {
                retContent.QnAContent[fQKeys] = {};
            }
            retContent.QnAContent[fQKeys][lKeys] = finalQnAJSON;
        }
    }

    for (var fAKeys in groupedObject.QnAAlterations) {
        for (let lKeys in groupedObject.QnAAlterations[fAKeys]) {
            let collectionPerLang = groupedObject.QnAAlterations[fAKeys][lKeys];
            let filterdItemsToCollate = collectionPerLang.filter(item => item.parsedObject.includeInCollate);
            let itemsToCollate = [];
            (filterdItemsToCollate || []).forEach(item => itemsToCollate.push(item.parsedObject));
            let finalQnAAlterations = await parseFileContents.collateQnAAlterations(itemsToCollate);
            if (retContent.QnAAlterations[fAKeys] === undefined) {
                retContent.QnAAlterations[fAKeys] = {};
            }
            retContent.QnAAlterations[fAKeys][lKeys] = finalQnAAlterations;
        }
    }

    return retContent;
}
