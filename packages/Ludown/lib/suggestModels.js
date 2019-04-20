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
        // out_folder
        // cross_feed_models
        // use_qna_pairs
        // auto_add_qna_metadata
        // verbose
        if (program.verbose) process.stdout.write(chalk.default.whiteBright("Analyzing parsed files... \n"));
        let crossFeedModels = program.cross_feed_models
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
        await updateRootDialogModelWithTriggerIntents(rootDialogModels.LUISContent, collatedObj.LUISContent);
        
        // Rule 3 - remove trigger model from child dialogs

        // Rule 4 - remove child model suggestion if the only intent in the child is the trigger intent

        // Rule 5 - With cross_feed_models option specified, all child model's NONE intent has all other child model's trigger intents

        // Rule 6 - with use_qna_pairs, all questions for that lang's model is automatically added to none intent of all models

        // Rule 7 - with auto_add_qna_metadata, all qna pairs for .qna found under a dialog folder automatically have dialogName = folderName added as meta-data.
        
        // Generate .lu file for each collated json
        // End result 
        // One QnA model suggested per Bot x lang
        // One LUIS model suggested per Dialog x lang (if applicable)

        // Delete 'triggerIntent' property from all LUIS models
        
        // Write out .lu or .qna file for each collated json
    }
};

module.exports = suggestModels;

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

            // Examine utterances in child models and pull entities referred to in utterances to root (simple, composite entities).


            // Pre-built entities in child model can be safely pulled up to root.
            // All entity names are treated globally unique and they need to be namespaced if they require to be distinct between root and child.
            // List entities in child model can be safely pulled up to root and namespaced as 'child'.'name'
            // RegEx entities in child model can be safely pulled up to root and namespaced as 'child'.'name'
            // Phraselist entities in child model can be safely pulled up to root and namespaced as 'child'.'name'
            // Examining patterns in child models can pull any and all type of entities with role definitions.
            
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
                    LUISContentCollection[fKey][lKey].triggerIntent = intentExists;
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
