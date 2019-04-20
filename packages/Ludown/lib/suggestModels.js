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
        
        let dx = 10;

        // Apply each rule as enabled to update two sets of objects - rootDialog and [childDialog]

        // Collate all files in rootDialog and [childDialog] collections

        // Generate .lu file for each collated json

        // Delete 'triggerIntent' property from all LUIS models
        
        // Write out .lu or .qna file for each collated json
    }
};

module.exports = suggestModels;

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

    for (var fKeys in groupedObject.LUISContent) {
        for (let lKeys in groupedObject.LUISContent[fKeys]) {
            let collectionPerLang = groupedObject.LUISContent[fKeys][lKeys];
            let filterdItemsToCollate = collectionPerLang.filter(item => item.parsedObject.includeInCollate);
            let itemsToCollate = [];
            let triggerIntent = (filterdItemsToCollate || []).filter(item => item.parsedObject.triggerIntent != undefined);
            if (triggerIntent.length > 1) {
                throw (new exception(retCode.errorCode.INVALID_INPUT, `Multiple trigger intents found for '${fKeys}' for language '${lKeys}. \n ${triggerIntent.forEach(item => process.stdout.write(item.srcFile + '\n'))}`));
            } 
            (filterdItemsToCollate || []).forEach(item => itemsToCollate.push(item.parsedObject));
            let finalLUISJSON = await parseFileContents.collateLUISFiles(itemsToCollate);
            if (haveLUISContent(finalLUISJSON)) await parseFileContents.validateLUISBlob(finalLUISJSON);
            if (triggerIntent.length === 1) {
                finalLUISJSON['triggerIntent'] = triggerIntent[0].parsedObject.triggerIntent;
            }
            if (retContent.LUISContent[fKeys] === undefined) {
                retContent.LUISContent[fKeys] = {};
            }
            retContent.LUISContent[fKeys][lKeys] = finalLUISJSON;
        } 
    }

    for (fkeys in groupedObject.QnAContent) {
        for (let lKeys in groupedObject.QnAContent[fKeys]) {
            let collectionPerLang = groupedObject.LUISContent[fKeys][lKeys];
            let filterdItemsToCollate = collectionPerLang.filter(item => item.parsedObject.includeInCollate);
            let itemsToCollate = [];
            (filterdItemsToCollate || []).forEach(item => itemsToCollate.push(item.parsedObject));
            let finalQnAJSON = await parseFileContents.collateQnAFiles(itemsToCollate);
            if (retContent.QnAContent[fKeys] === undefined) {
                retContent.QnAContent[fKeys] = {};
            }
            retContent.QnAContent[fKeys][lKeys] = finalQnAJSON;
        }
    }

    for (fkeys in groupedObject.QnAAlterations) {
        for (let lKeys in groupedObject.QnAAlterations[fKeys]) {
            let collectionPerLang = groupedObject.LUISContent[fKeys][lKeys];
            let filterdItemsToCollate = collectionPerLang.filter(item => item.parsedObject.includeInCollate);
            let itemsToCollate = [];
            (filterdItemsToCollate || []).forEach(item => itemsToCollate.push(item.parsedObject));
            let finalQnAAlterations = await parseFileContents.collateQnAAlterations(itemsToCollate);
            if (retContent.QnAAlterations[fKeys] === undefined) {
                retContent.QnAAlterations[fKeys] = {};
            }
            retContent.QnAAlterations[fKeys][lKeys] = finalQnAAlterations;
        }
    }

    return retContent;
}
