#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/*eslint no-console: ["error", { allow: ["log"] }] */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const LUISObjNameEnum = require('./enums/luisobjenum');
const parseFileContents = require('./parseFileContents');
const retCode = require('./enums/CLI-errors');
const helpers = require('./helpers');
const cmdEnum = require('./enums/parsecommands');
const exception = require('./classes/exception');
const filesToParseClass = require('./classes/filesToParse');
const parserObject = require('./classes/parserObject');
const hClasses = require('./classes/hclasses');
const deepEqual = require('deep-equal');
const txtfile = require('./read-text-file');
const BuildDiagnostic = require('./diagnostic').BuildDiagnostic;
const parser = {
    /**
     * Handle parsing the root file that was passed in command line args
     *
     * @param {object} program Content flushed out by commander
     * @param {cmdEnum} cmd Parse to either LUIS or QnA 
     * @returns {void} Nothing
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    handleFile: async function(program, cmd) {
        let filesToParse;
        try {
            filesToParse = await getFilesToParse(program);
        } catch (err) {
            throw (err);
        }
        let rootFile = filesToParse[0];
        let allParsedContent = '';
        try {
            allParsedContent = await parseAllFiles(filesToParse, program.verbose, program.luis_culture);
        } catch (err) {
            throw (err);
        }
        // resolve uttereance deep references
        await resolveReferencesInUtterances(allParsedContent);
        let finalLUISJSON, finalQnAJSON, finalQnAAlterations; 
        try {
            // pass only files that need to be collated.
            finalLUISJSON = await parseFileContents.collateLUISFiles(allParsedContent.LUISContent.filter(item => item.includeInCollate));
            if(haveLUISContent(finalLUISJSON)) await parseFileContents.validateLUISBlob(finalLUISJSON);
            finalQnAJSON = await parseFileContents.collateQnAFiles(allParsedContent.QnAContent.filter(item => item.includeInCollate));
            finalQnAAlterations = await parseFileContents.collateQnAAlterations(allParsedContent.QnAAlterations.filter(item => item.includeInCollate));
        } catch (err) {
            throw (err);
        }
        try {
            writeOutFiles(program,finalLUISJSON,finalQnAJSON, finalQnAAlterations, rootFile, cmd); 
        } catch (err) {
            throw(err);
        }
    }
};
/**
 * Helper function to write out contents to disk
 * @param {object} program Parsed program object from commander
 * @param {LUIS} finalLUISJSON Collated final LUIS JSON structure to write out to disk
 * @param {QnA} finalQnAJSON Collated final QnA JSON structure to write out to disk\
 * @param {qnaAlterations} finalQnAAlterations Collated final QnA Alterations JSON structure to write out to disk\
 * @param {string} rootFile Root file name and path
 * @param {cmdEnum} cmd Command to instruct if LUIS or QnA content should be written out to disk
 * @returns {void} Nothing
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const writeOutFiles = function(program,finalLUISJSON,finalQnAJSON, finalQnAAlterations, rootFile, cmd) {
    let outFolder;
    try {
        outFolder = getOutputFolder(program)
    } catch (err) {
        throw (err);
    }

    if(finalLUISJSON) {
        finalLUISJSON.luis_schema_version = program.luis_schema_version || finalLUISJSON.luis_schema_version || "3.2.0";
        finalLUISJSON.versionId = program.luis_versionId || finalLUISJSON.versionId || "0.1";
        finalLUISJSON.name = program.luis_name || finalLUISJSON.name || path.basename(rootFile, path.extname(rootFile)),
        finalLUISJSON.desc = program.luis_desc || finalLUISJSON.desc || "";
        finalLUISJSON.culture = program.luis_culture || finalLUISJSON.culture || "en-us";
        finalLUISJSON.culture = finalLUISJSON.culture.toLowerCase();
    }

    if (!program.luis_name && finalLUISJSON && finalLUISJSON.name) program.luis_name = finalLUISJSON.name;    

    if (finalQnAJSON) finalQnAJSON.name = program.qna_name || finalQnAJSON.name || path.basename(rootFile, path.extname(rootFile));

    if (!program.qna_name && finalQnAJSON && finalQnAJSON.name) program.qna_name = finalQnAJSON.name || '';

    var writeQnAFile = (finalQnAJSON.qnaList.length > 0) || 
                        (finalQnAJSON.urls.length > 0) || 
                        (finalQnAJSON.files.length > 0);

    var  writeLUISFile = finalLUISJSON?true:false;

    if(!writeLUISFile && program.verbose) {
        process.stdout.write(chalk.default.yellowBright('No LUIS content found in .lu file(s)! \n'));
    }

    if(!writeQnAFile && program.verbose) {
        process.stdout.write(chalk.default.yellowBright('No QnA Maker content found in .lu file(s)! \n'));
    }

    if(program.verbose) {
        if((cmd == cmdEnum.luis) && writeLUISFile) {
            process.stdout.write(JSON.stringify(finalLUISJSON, null, 2) + '\n');
        }
        if((cmd == cmdEnum.qna) && writeQnAFile) {
            process.stdout.write(JSON.stringify(finalQnAJSON, null, 2) + '\n');
        }
    }
    
    if (!program.lOutFile) {
        if (program.out) {
            program.lOutFile = program.out.includes('.') ? program.out : program.out + ".json"
        } else {
            if (!program.luis_name) {
                program.lOutFile = path.basename(rootFile, path.extname(rootFile)) + "_LUISApp.json";  
            } else {
                program.lOutFile = program.luis_name.includes('.') ? program.luis_name : program.luis_name + ".json";
            }
        }
    }
    if (!program.qOutFile) {
        if (program.out) {
            program.qOutFile = program.out.includes('.') ? program.out : program.out + ".json"
        } else {
            if (!program.qna_name) {
                program.qOutFile = path.basename(rootFile, path.extname(rootFile)) + "_qnaKB.json";
            } else {
                program.qOutFile = program.qna_name.includes('.') ? program.qna_name : program.qna_name + ".json";
            }
        }
    }
    if((cmd == cmdEnum.luis) && writeLUISFile) {
        var fLuisJson = JSON.stringify(finalLUISJSON, null, 2);
        var luisFilePath = path.join(outFolder, program.lOutFile);
        // write out the final LUIS Json
        try {
            fs.writeFileSync(luisFilePath, fLuisJson, 'utf-8');
        } catch (err) {
            throw(new exception(retCode.errorCode.UNABLE_TO_WRITE_FILE,'Unable to write LUIS JSON file - ' + path.join(outFolder, program.lOutFile)));
        }
        if(program.verbose) process.stdout.write(chalk.default.italic('Successfully wrote LUIS model to ' + path.join(outFolder, program.lOutFile) + '\n'));
    }
    if((cmd == cmdEnum.qna) && writeQnAFile) {
        let qnaJson = JSON.stringify(finalQnAJSON, null, 2);
        let qnaFilePath = path.join(outFolder, program.qOutFile);
        // write out the final QnA Json
        try {
            fs.writeFileSync(qnaFilePath, qnaJson, 'utf-8');
        } catch (err) {
            throw(new exception(retCode.errorCode.UNABLE_TO_WRITE_FILE,'Unable to write QnA JSON file - ' + path.join(outFolder, program.qOutFile)));
        }
        if(program.verbose) process.stdout.write(chalk.default.italic('Successfully wrote QnA KB to ' + path.join(outFolder, program.qOutFile) + '\n'));
    }
    // write luis batch test file if requested
    if((cmd == cmdEnum.luis) && program.write_luis_batch_tests) {
        // catch and label list entities in utterances
        let batchTestJson = tagListEntities(finalLUISJSON);
        let lBatchFile = JSON.stringify(batchTestJson.utterances, null, 2);
        let LUISBatchFileName = program.lOutFile.endsWith('.json')?program.lOutFile.replace('.json','_LUISBatchTest.json'):program.lOutFile + '_LUISBatchTest.json';
        let lBFileName = path.join(outFolder, LUISBatchFileName);
        // write out the final LUIS Json
        try {
            fs.writeFileSync(lBFileName, lBatchFile, 'utf-8');
        } catch (err) {
            throw(new exception(retCode.errorCode.UNABLE_TO_WRITE_FILE, 'Unable to write LUIS batch test JSON file - ' + path.join(outFolder, LUISBatchFileName)));
        }
        if(program.verbose) console.log(chalk.default.italic('Successfully wrote LUIS batch test JSON file to ' + path.join(outFolder, LUISBatchFileName) + '\n'));
    }

    // write out QnA Alterations if requested
    if((cmd == cmdEnum.qna) && program.write_qna_alterations) {
        let qAlterationsFileContent = JSON.stringify(finalQnAAlterations, null, 2);
        let qAlterationsFileName = program.qOutFile.endsWith('.json')?program.qOutFile.replace('.json','_Alterations.json'):program.qOutFile + '_Alterations.json';
        let qAFileName = path.join(outFolder, qAlterationsFileName);
        // write out the final QnA alterations file
        try {
            fs.writeFileSync(qAFileName, qAlterationsFileContent, 'utf-8');
        } catch (err) {
            throw(new exception(retCode.errorCode.UNABLE_TO_WRITE_FILE, 'Unable to write QnA Alterations JSON file - ' + qAFileName));
        }
        if(program.verbose) console.log(chalk.default.italic('Successfully wrote QnA Alterations JSON file to ' + qAFileName + '\n'));
    }
}
/**
 * Helper function to get output folder
 * @param {object} program Parsed program object from commander
 * @returns {string} Output folder
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const getOutputFolder = function(program) {
    let outFolder = process.cwd();
    if(program.out_folder) {
        if(path.isAbsolute(program.out_folder)) {
            outFolder = program.out_folder;
        } else {
            outFolder = path.resolve('', program.out_folder);
        }
        if(!fs.existsSync(outFolder)) {
            throw(new exception(retCode.errorCode.NO_LU_FILES_FOUND, 'Output folder ' + outFolder + ' does not exist'));     
        }
    }
    return outFolder;
}
/**
 * Helper function to get list of lu files to parse
 * @param {object} program Parsed program object from commander
 * @returns {Array} Array of .lu files found to parse
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const getFilesToParse = async function(program) {
    let filesToParse = [];
    if(program.in) {
        filesToParse.push(program.in);
    }
    if(program.lu_folder) {
        // is this a folder? 
        try
        {
            var folderStat = fs.statSync(program.lu_folder);
        } catch (err) {
            throw(new exception(retCode.errorCode.OUTPUT_FOLDER_INVALID, 'Sorry, ' + program.lu_folder + ' is not a folder or does not exist'));
        }
        if(!folderStat.isDirectory()) {
            throw(new exception(retCode.errorCode.OUTPUT_FOLDER_INVALID, 'Sorry, ' + program.lu_folder + ' is not a folder or does not exist'));
        }
        if(program.subfolder) {
            filesToParse = helpers.findLUFiles(program.lu_folder, true); 
        } else {
            filesToParse = helpers.findLUFiles(program.lu_folder, false); 
        }
        if(filesToParse.length === 0) {
            throw(new exception(retCode.errorCode.NO_LU_FILES_FOUND, 'Sorry, no .lu files found in the specified folder.'));                
        }
    }
    return filesToParse;
}

/**
 * Helper function to loop through and parse all files
 * @param {Array} filesToParse List of input .lu files to parse
 * @param {boolean} log If true, write verbose log messages to stdout
 * @param {string} luis_culture LUIS language code
 * @returns {object} Object cotaining arrays of all parsed LUIS and QnA content found in the files
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const parseAllFiles = async function(filesToParse, log, luis_culture) {
    let parsedContent = '';
    let allParsedLUISContent = [];
    let allParsedQnAContent = [];
    let allParsedAlterationsContent = [];
    filesToParse = filesToParseClass.stringArrayToFileToParseList(filesToParse);
    let parsedFiles = [];
    while (filesToParse.length > 0) {
        let file = filesToParse[0].filePath;
        // skip this file if we have parsed it already
        if (parsedFiles.includes(file)) {
            filesToParse.splice(0,1)
            continue;
        }
        if(!fs.existsSync(path.resolve(file))) {
            let error = BuildDiagnostic({
                message: `Sorry unable to open [${file}]`
            });

            throw(new exception(retCode.errorCode.FILE_OPEN_ERROR, error.toString()));     
        }
      
        let fileContent = txtfile.readSync(file);

        if (!fileContent) {
            let error = BuildDiagnostic({
                message: `Sorry, error reading file: ${file}`
            });

            throw(new exception(retCode.errorCode.FILE_OPEN_ERROR, error.toString()));
        }
        if(log) process.stdout.write(chalk.default.whiteBright('Parsing file: ' + file + '\n'));
        try {
            parsedContent = await parseFileContents.parseFile(fileContent, log, luis_culture);
        } catch (err) {
            throw(err);
        }
        if (!parsedContent) {
            let error = BuildDiagnostic({
                message: `Sorry, file ${file} had invalid content`
            });

            throw(new exception(retCode.errorCode.INVALID_INPUT_FILE, error.toString()));
        } 
        parsedFiles.push(file);
        try {
            if (haveLUISContent(parsedContent.LUISJsonStructure) && await parseFileContents.validateLUISBlob(parsedContent.LUISJsonStructure)) allParsedLUISContent.push(parserObject.create(parsedContent.LUISJsonStructure, undefined, undefined, file, filesToParse[0].includeInCollate));
        } catch (err) {
            throw (err);
        }
        allParsedQnAContent.push(parserObject.create(undefined, parsedContent.qnaJsonStructure, undefined, file, filesToParse[0].includeInCollate));
        allParsedAlterationsContent.push(parserObject.create(undefined, undefined, parsedContent.qnaAlterations, file, filesToParse[0].includeInCollate));
        // remove this file from the list
        let parentFile = filesToParse.splice(0,1);
        let parentFilePath = path.parse(path.resolve(parentFile[0].filePath)).dir;
        // add additional files to parse to the list
        if(parsedContent.additionalFilesToParse.length > 0) {
            parsedContent.additionalFilesToParse.forEach(function(file) {
                // Support wild cards at the end of a relative .LU file path. 
                // './bar/*' should look for all .lu files under the specified folder.
                // './bar/**' should recursively look for .lu files under sub-folders as well.
                if(file.filePath.endsWith('*')) {
                    const isRecursive = file.filePath.endsWith('**');
                    const rootFolder = file.filePath.replace(/\*/g, '');
                    let rootPath = rootFolder;
                    if(!path.isAbsolute(rootFolder)) {
                        rootPath = path.resolve(parentFilePath, rootFolder);
                    } 
                    // Get LU files in this location
                    const luFilesToAdd = helpers.findLUFiles(rootPath, isRecursive);
                    if(luFilesToAdd.length !== 0) {
                        // add these to filesToParse
                        luFilesToAdd.forEach(addFile => filesToParse.push(new filesToParseClass(addFile, file.includeInCollate)));
                    }
                } else {
                    if(!path.isAbsolute(file.filePath)) file.filePath = path.resolve(parentFilePath, file.filePath);
                    // avoid parsing files that have been parsed already
                    if(parsedFiles.includes(file.filePath)) {
                        // find matching parsed files and ensure includeInCollate is updated if needed.
                        updateParsedFiles(allParsedLUISContent, allParsedQnAContent, allParsedAlterationsContent, file);
                    } else {
                        filesToParse.push(new filesToParseClass(file.filePath, file.includeInCollate));
                    }
                }
            });
        }
    }
    return {
        LUISContent: allParsedLUISContent,
        QnAContent: allParsedQnAContent,
        QnAAlterations: allParsedAlterationsContent
    };
}
/**
 * Helper function to resolve lu file references in utterances
 * @param {Object} allParsedContent 
 * @returns {void} Nothing
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const resolveReferencesInUtterances = async function(allParsedContent) {
    // find LUIS utterances that have references
    (allParsedContent.LUISContent || []).forEach(luisModel => {
        if (!luisModel.includeInCollate) return;
        let newUtterancesToAdd = [];
        let newPatternsToAdd = [];
        let spliceList = [];
        (luisModel.LUISJsonStructure.utterances || []).forEach((utterance,idx) => {
            // Deep references must have [link name](link-value) notation
            if (utterance.text.indexOf('[') !== 0) return;
            // does this utterance have a deep link uri? 
            let linkExp = (utterance.text || '').trim().match(new RegExp(/\(.*?\)/g));
            if (linkExp && linkExp.length !== 0) {
                // we have stuff to parse and resolve
                let parsedUtterance = helpers.parseLinkURI(utterance.text);
                if (!path.isAbsolute(parsedUtterance.luFile)) parsedUtterance.luFile = path.resolve(path.dirname(luisModel.srcFile), parsedUtterance.luFile);
                // see if we are in need to pull LUIS or QnA utterances
                if (parsedUtterance.ref.endsWith('?')) {
                    if( parsedUtterance.luFile.endsWith('*')) {
                    let parsedQnABlobs = (allParsedContent.QnAContent || []).filter(item => item.srcFile.includes(parsedUtterance.luFile.replace(/\*/g, '')));
                    if(parsedQnABlobs === undefined) {
                        let error = BuildDiagnostic({
                            message: `Unable to parse ${utterance.text} in file: ${luisModel.srcFile}`
                        });

                        throw (new exception(retCode.errorCode.INVALID_INPUT, error.toString()));
                    }

                    parsedQnABlobs.forEach(blob => blob.qnaJsonStructure.qnaList.forEach(item => item.questions.forEach(question => newUtterancesToAdd.push(new hClasses.uttereances(question, utterance.intent)))));
                    } else {
                        // look for QnA
                        let parsedQnABlob = (allParsedContent.QnAContent || []).find(item => item.srcFile == parsedUtterance.luFile);
                        if(parsedQnABlob === undefined) {
                            let error = BuildDiagnostic({
                                message: `Unable to parse ${utterance.text} in file: ${luisModel.srcFile}`
                            });

                            throw (new exception(retCode.errorCode.INVALID_INPUT, error.toString()));
                        }

                        // get questions list from .lu file and update list
                        parsedQnABlob.qnaJsonStructure.qnaList.forEach(item => item.questions.forEach(question => newUtterancesToAdd.push(new hClasses.uttereances(question, utterance.intent))));
                    }
                    spliceList.push(idx);
                } else {
                    // find the parsed file
                    let parsedLUISBlob = (allParsedContent.LUISContent || []).find(item => item.srcFile == parsedUtterance.luFile);
                    if(parsedLUISBlob === undefined) {
                        let error = BuildDiagnostic({
                            message: `Unable to parse ${utterance.text} in file: ${luisModel.srcFile}`
                        });

                        throw (new exception(retCode.errorCode.INVALID_INPUT, error.toString()));
                    }

                    let utterances = [], patterns = [];
                    if (parsedUtterance.ref.toLowerCase().includes('utterancesandpatterns')) {
                        // get all utterances and add them
                        utterances = parsedLUISBlob.LUISJsonStructure.utterances;
                        // Find all patterns and add them
                        (parsedLUISBlob.LUISJsonStructure.patterns || []).forEach(item => {
                            let newUtterance = new hClasses.uttereances(item.pattern, item.intent);
                            if (utterances.find(match => deepEqual(newUtterance, match)) !== undefined) utterances.push(new hClasses.uttereances(item.pattern, item.intent)) 
                        });
                    } else if (parsedUtterance.ref.toLowerCase().includes('utterances')) {
                        // get all utterances and add them
                        utterances = parsedLUISBlob.LUISJsonStructure.utterances;
                    } else if (parsedUtterance.ref.toLowerCase().includes('patterns')) {
                        // Find all patterns and add them
                        (parsedLUISBlob.LUISJsonStructure.patterns || []).forEach(item => utterances.push(new hClasses.uttereances(item.pattern, item.intent)));
                    } else {
                        // get utterance list from reference intent and update list
                        let referenceIntent = parsedUtterance.ref.replace(/-/g, ' ').trim();
                        utterances = parsedLUISBlob.LUISJsonStructure.utterances.filter(item => item.intent == referenceIntent);
                        // find and add any patterns for this intent
                        patterns = parsedLUISBlob.LUISJsonStructure.patterns.filter(item => item.intent == referenceIntent);
                    }
                    (utterances || []).forEach(item => newUtterancesToAdd.push(new hClasses.uttereances(item.text, utterance.intent)));
                    (patterns || []).forEach(item => newPatternsToAdd.push(new hClasses.pattern(item.pattern, utterance.intent)));
                    // remove this reference utterance from the list
                    spliceList.push(idx);
                }
            }
        });
        // remove reference utterances from the list. The spliceList needs to be sorted so splice will actually work.
        spliceList.sort((a,b) => a-b).forEach((item, idx) => luisModel.LUISJsonStructure.utterances.splice((item - idx), 1));
        // add new utterances to the list
        newUtterancesToAdd.forEach(item => luisModel.LUISJsonStructure.utterances.push(item));
        // add new patterns to the list
        newPatternsToAdd.forEach(item => luisModel.LUISJsonStructure.patterns.push(item));

        newPatternsToAdd.forEach(patternObject => {
            if(patternObject.pattern.includes('{'))
            {
                let entityRegex = new RegExp(/\{(.*?)\}/g);
                let entitiesFound = patternObject.pattern.match(entityRegex);

                entitiesFound.forEach(function (entity) {
                    entity = entity.replace("{", "").replace("}", "");
                    let entityName = entity;
                    let roleName = '';
                    if (entity.includes(':')) {
                        // this is an entity with role
                        [entityName, roleName] = entity.split(':');
                    }
                    // insert the entity only if it does not already exist
                    let simpleEntityInMaster = luisModel.LUISJsonStructure.entities.find(item => item.name == entityName);
                    let compositeInMaster = luisModel.LUISJsonStructure.composites.find(item => item.name == entityName);
                    let listEntityInMaster = luisModel.LUISJsonStructure.closedLists.find(item => item.name == entityName);
                    let regexEntityInMaster = luisModel.LUISJsonStructure.regex_entities.find(item => item.name == entityName);
                    let prebuiltInMaster = luisModel.LUISJsonStructure.prebuiltEntities.find(item => item.name == entityName);
                    let paIdx = -1;
                    let patternAnyInMaster = luisModel.LUISJsonStructure.patternAnyEntities.find((item, idx) => {
                        if (item.name === entityName) {
                            paIdx = idx;
                            return true;
                        }
                        return false;
                    });
                    if (!simpleEntityInMaster && 
                        !compositeInMaster &&
                        !listEntityInMaster &&
                        !regexEntityInMaster &&
                        !prebuiltInMaster) {
                            if (!patternAnyInMaster) {
                                // add a pattern.any entity
                                if (roleName !== '') {
                                    parseFileContents.addItemOrRoleIfNotPresent(luisModel.LUISJsonStructure, LUISObjNameEnum.PATTERNANYENTITY, entityName, [roleName])
                                } else {
                                    parseFileContents.addItemIfNotPresent(luisModel.LUISJsonStructure, LUISObjNameEnum.PATTERNANYENTITY, entity);
                                }
                            } else {
                                // add the role if it does not exist already.
                                if (roleName !== '') {
                                    !patternAnyInMaster.roles.includes(roleName) ? patternAnyInMaster.roles.push(roleName) : undefined;
                                }
                            }
                    } else {
                        // we found this pattern.any entity as another type.
                        if (patternAnyInMaster && paIdx !== -1) {
                            // remove the patternAny entity from the list because it has been explicitly defined elsewhere.
                            luisModel.LUISJsonStructure.patternAnyEntities.splice(paIdx, 1);
                        }
                    }
                });
            }
        })
    });
}
/**
 * Helper function to update parsed files to include in collate
 * @param {Object} allParsedLUISContent 
 * @param {Object} allParsedQnAContent 
 * @param {Object} allParsedAlterationsContent 
 * @param {Object} file 
 */
const updateParsedFiles = function(allParsedLUISContent, allParsedQnAContent, allParsedAlterationsContent, file) {
    // find the instance and ensure includeInCollate property is set correctly 
    let matchInLUIS = allParsedLUISContent.find(item => item.srcFile == file.filePath);
    if(matchInLUIS && (matchInLUIS.includeInCollate === false && file.includeInCollate === true)) matchInLUIS.includeInCollate = true;
    let matchInQnA = allParsedQnAContent.find(item => item.srcFile == file.filePath);
    if(matchInQnA && (matchInQnA.includeInCollate === false && file.includeInCollate === true)) matchInQnA.includeInCollate = true;
    let matchInAlterations = allParsedAlterationsContent.find(item => item.srcFile == file.filePath);
    if(matchInAlterations && (matchInAlterations.includeInCollate === false && file.includeInCollate === true)) matchInAlterations.includeInCollate = true;
}
/**
 * Helper function to see if we have any luis content in the blob
 * @param {object} blob Contents of parsed luis blob
 * @returns {boolean} true if there is any luis content in the blob
 */
const haveLUISContent = function(blob) {
    if(!blob) return false;
    return ((blob[LUISObjNameEnum.INTENT].length > 0) ||
    (blob[LUISObjNameEnum.ENTITIES].length > 0) || 
    (blob[LUISObjNameEnum.CLOSEDLISTS].length > 0) ||
    (blob[LUISObjNameEnum.PATTERNANYENTITY].length > 0) ||
    (blob.patterns.length > 0) ||
    (blob[LUISObjNameEnum.UTTERANCE].length > 0) ||
    (blob.prebuiltEntities.length > 0) ||
    (blob[LUISObjNameEnum.REGEX].length > 0) ||
    (blob.model_features.length > 0) ||
    (blob.composites.length > 0));
};

/**
 * Helper function that identifies and tags uttearnces with list entities. 
 * Used before writing out batch test output
 * @param {Object} blob Contents of parsed luis blob
 * @returns {Object} Updated blob that includes entity labels for lists
 */
const tagListEntities = function(blob) {
    if(!blob || typeof blob != "object") return null;
    if(!blob.closedLists || blob.closedLists.length == 0) return blob;
    blob.closedLists.forEach(closedListItem => {
        (closedListItem.subLists || []).forEach(subListItem => {
            (subListItem.list || []).forEach(synonym => {
                // go through all utterances and add this list entity if this synonym matchnes
                let matchedUtternces = (blob.utterances || []).filter(function(item) {
                    return item.text.includes(synonym);
                });
                (matchedUtternces || []).forEach(utterance => {
                    // there could be more than one match. so just split the utterance
                    let splitBySynonym = utterance.text.split(synonym);
                    let endPos = 0;
                    let startPos = 0;
                    for(var idx = 0; idx < splitBySynonym.length - 1; idx++) {
                        startPos = endPos + splitBySynonym[idx].length;
                        endPos += splitBySynonym[idx].length + synonym.length;
                        utterance.entities.push({'entity': closedListItem.name, 'startPos' : startPos, 'endPos' : endPos});
                    }
                })
            })
        })
    });
    return blob;
}

module.exports = parser;
