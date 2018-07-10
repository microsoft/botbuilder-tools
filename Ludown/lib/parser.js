#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const txtfile = require('read-text-file');
const LUISObjNameEnum = require('./enums/luisobjenum');
const parseFileContents = require('./parseFileContents');
const deepEqual = require('deep-equal');
const retCode = require('./enums/CLI-errors');
const helpers = require('./helpers');
const helperClasses = require('./classes/hclasses');
const qna = require('./classes/qna');
const cmdEnum = {
    luis: 'luis',
    qna: 'qna'
};
const parser = {
    /**
     * Handle parsing the root file that was passed in command line args
     *
     * @param {object} program Content flushed out by commander
     * @param {cmdEnum} cmd Parse to either LUIS or QnA 
     * @returns {void} Nothing
     * @throws {object} Throws on errors. Object includes errCode and text. 
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
        let allParsedLUISContent = allParsedContent.LUISContent;
        let allParsedQnAContent = allParsedContent.QnAContent;
        let finalLUISJSON, finalQnAJSON; 
        try {
            finalLUISJSON = collateLUISFiles(allParsedLUISContent);
            if(haveLUISContent(finalLUISJSON)) validateLUISBlob(finalLUISJSON);
            finalQnAJSON = collateQnAFiles(allParsedQnAContent);
        } catch (err) {
            throw (err);
        }
        try {
            writeOutFiles(program,finalLUISJSON,finalQnAJSON, rootFile, cmd); 
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
 * @param {string} rootFile Root file name and path
 * @param {cmdEnum} cmd Command to instruct if LUIS or QnA content should be written out to disk
 * @returns {void} Nothing
 * @throws {object} Throws on errors. Object includes errCode and text. 
 */
const writeOutFiles = function(program,finalLUISJSON,finalQnAJSON, rootFile, cmd) {
    let outFolder;
    try {
        outFolder = getOutputFolder(program)
    } catch (err) {
        throw (err);
    }
    if(!program.luis_versionId) program.luis_versionId = "0.1";
    if(!program.luis_schema_version) program.luis_schema_version = "3.0.0";
    if(!program.luis_name) program.luis_name = path.basename(rootFile, path.extname(rootFile));
    if(!program.luis_desc) program.luis_desc = "";
    if(!program.luis_culture) program.luis_culture = "en-us";   
    if(!program.qna_name) program.qna_name = path.basename(rootFile, path.extname(rootFile));
    if(program.luis_culture) program.luis_culture = program.luis_culture.toLowerCase();

    if(finalLUISJSON) {
        finalLUISJSON.luis_schema_version = program.luis_schema_version;
        finalLUISJSON.versionId = program.luis_versionId;
        finalLUISJSON.name = program.luis_name,
        finalLUISJSON.desc = program.luis_desc;
        finalLUISJSON.culture = program.luis_culture;
        finalQnAJSON.name = program.qna_name;
    }
    
    var writeQnAFile = (finalQnAJSON.qnaList.length > 0) || 
                        (finalQnAJSON.urls.length > 0);

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
    
    if(!program.lOutFile) {
        if(!program.luis_name) {
            program.lOutFile = path.basename(rootFile, path.extname(rootFile)) + "_LUISApp.json";  
        } else {
            program.lOutFile = program.luis_name + ".json";
        }
    }
    if(!program.qOutFile) {
        if(!program.qna_name) {
            program.qOutFile = path.basename(rootFile, path.extname(rootFile)) + "_qnaKB.json";
        } else {
            program.qOutFile = program.qna_name + ".json";
        }
    }
    if((cmd == cmdEnum.luis) && writeLUISFile) {
        var fLuisJson = JSON.stringify(finalLUISJSON, null, 2);
        var luisFilePath = path.join(outFolder, program.lOutFile);
        // write out the final LUIS Json
        try {
            fs.writeFileSync(luisFilePath, fLuisJson, 'utf-8');
        } catch (err) {
            throw({
                errCode: retCode.errorCode.UNABLE_TO_WRITE_FILE, 
                text: 'Unable to write LUIS JSON file - ' + path.join(outFolder, program.lOutFile)
            })
        }
        if(program.verbose) process.stdout.write(chalk.default.italic('Successfully wrote LUIS model to ' + path.join(outFolder, program.lOutFile) + '\n'));
    }
    if((cmd == cmdEnum.qna) && writeQnAFile) {
        var qnaJson = JSON.stringify(finalQnAJSON, null, 2);
        var qnaFilePath = path.join(outFolder, program.qOutFile);
        // write out the final LUIS Json
        try {
            fs.writeFileSync(qnaFilePath, qnaJson, 'utf-8');
        } catch (err) {
            throw({
                errCode: retCode.errorCode.UNABLE_TO_WRITE_FILE, 
                text: 'Unable to write QnA JSON file - ' + path.join(outFolder, program.qOutFile)
            })
        }
        if(program.verbose) process.stdout.write(chalk.default.italic('Successfully wrote QnA KB to ' + path.join(outFolder, program.qOutFile) + '\n'));
    }
    // write luis batch test file if requested
    if((cmd == cmdEnum.luis) && program.write_luis_batch_tests) {
        var lBatchFile = JSON.stringify(finalLUISJSON.utterances, null, 2);
        var LUISBatchFileName = program.lOutFile.replace(".json","_LUISBatchTest.json");
        var lBFileName = path.join(outFolder, LUISBatchFileName);
        // write out the final LUIS Json
        try {
            fs.writeFileSync(lBFileName, lBatchFile, 'utf-8');
        } catch (err) {
            throw({
                errCode: retCode.errorCode.UNABLE_TO_WRITE_FILE, 
                text: 'Unable to write LUIS batch test JSON file - ' + path.join(outFolder, LUISBatchFileName)
            })
        }
        if(program.verbose) console.log(chalk.default.italic('Successfully wrote LUIS batch test JSON file to ' + path.join(outFolder, LUISBatchFileName) + '\n'));
    }
}
/**
 * Helper function to get output folder
 * @param {object} program Parsed program object from commander
 * @returns {string} Output folder
 * @throws {object} Throws on errors. Object includes errCode and text. 
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
            throw({
                errCode: retCode.errorCode.NO_LU_FILES_FOUND, 
                text: 'Output folder ' + outFolder + ' does not exist'
            })     
        }
    }
    return outFolder;
}
/**
 * Helper function to get list of lu files to parse
 * @param {object} program Parsed program object from commander
 * @returns {Array} Array of .lu files found to parse
 * @throws {object} Throws on errors. Object includes errCode and text. 
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
            throw({
                errCode: retCode.errorCode.OUTPUT_FOLDER_INVALID, 
                text: 'Sorry, ' + program.lu_folder + ' is not a folder or does not exist'
            })
        }
        if(!folderStat.isDirectory()) {
            throw({
                errCode: retCode.errorCode.OUTPUT_FOLDER_INVALID, 
                text: 'Sorry, ' + program.lu_folder + ' is not a folder or does not exist'
            })
        }
        if(program.subfolder) {
            filesToParse = helpers.findLUFiles(program.lu_folder, true); 
        } else {
            filesToParse = helpers.findLUFiles(program.lu_folder, false); 
        }
        if(filesToParse.length === 0) {
            throw({
                errCode: retCode.errorCode.NO_LU_FILES_FOUND, 
                text: 'Sorry, no .lu files found in the specified folder.'
            })                
        }
        if(!rootFile) rootFile = filesToParse[0]
    }
    return filesToParse;
}
/**
 * Helper function to loop through and parse all files
 * @param {Array} filesToParse List of input .lu files to parse
 * @param {boolean} log If true, write verbose log messages to stdout
 * @param {string} luis_culture LUIS language code
 * @returns {object} Object cotaining arrays of all parsed LUIS and QnA content found in the files
 * @throws {object} Throws on errors. Object includes errCode and text. 
 */
const parseAllFiles = async function(filesToParse, log, luis_culture) {
    let parsedContent = '';
    let allParsedLUISContent = [];
    let allParsedQnAContent = [];
    while(filesToParse.length > 0) {
        let file = filesToParse[0];
        if(!fs.existsSync(path.resolve(file))) {
            throw({
                errCode: retCode.errorCode.FILE_OPEN_ERROR, 
                text: 'Sorry unable to open [' + file + ']'
            })     
        }
        let fileContent = txtfile.readSync(file);
        if (!fileContent) {
            throw({
                errCode: retCode.errorCode.FILE_OPEN_ERROR, 
                text: 'Sorry, error reading file:' + file
            })
        }
        if(log) process.stdout.write(chalk.default.whiteBright('Parsing file: ' + file + '\n'));
        try {
            parsedContent = parseFileContents.parseFile(fileContent, log, luis_culture);
        } catch (err) {
            throw(err);
        }
        if (!parsedContent) {
            throw({
                errCode: retCode.errorCode.INVALID_INPUT_FILE, 
                text: 'Sorry, file ' + file + 'had invalid content'
            })
        } 
        try {
            if(haveLUISContent(parsedContent.LUISBlob) && validateLUISBlob(parsedContent.LUISBlob)) allParsedLUISContent.push(parsedContent.LUISBlob);
        } catch (err) {
            throw (err);
        }
        allParsedQnAContent.push(parsedContent.QnABlob);
        // remove this file from the list
        let parentFile = filesToParse.splice(0,1);
        let parentFilePath = path.parse(path.resolve(parentFile[0])).dir;
        // add additional files to parse to the list
        if(parsedContent.fParse.length > 0) {
            parsedContent.fParse.forEach(function(file) {
                if(path.isAbsolute(file)) {
                    filesToParse.push(file);
                } else {
                    filesToParse.push(path.resolve(parentFilePath, file));
                }
            });
        }
    }
    return {
        LUISContent: allParsedLUISContent,
        QnAContent: allParsedQnAContent
    };
}
/**
 * Helper function to validate parsed LUISJsonblob
 * @param {Object} LUISJSONBlob input LUIS Json blob
 * @param {Object} entitiesList list of entities in collated models
 * @returns {Boolean} True if validation succeeds.
 * @throws {object} Throws on errors. Object includes errCode and text. 
 */
const validateLUISBlob = function(LUISJSONBlob) {
    // patterns can have references to any other entity types. 
    // So if there is a pattern.any entity that is also defined as another type, remove the pattern.any entity
    let spliceList = [];
    if(LUISJSONBlob.patternAnyEntities.length > 0) {
        for(let i in LUISJSONBlob.patternAnyEntities) {
            let patternAnyEntity = LUISJSONBlob.patternAnyEntities[i];
            if(helpers.filterMatch(LUISJSONBlob.entities, 'name', patternAnyEntity.name).length > 0) {
                spliceList.push(patternAnyEntity.name);
            }
            if(helpers.filterMatch(LUISJSONBlob.closedLists, 'name', patternAnyEntity.name).length > 0) {
                spliceList.push(patternAnyEntity.name);
            }
            if(helpers.filterMatch(LUISJSONBlob.model_features, 'name', patternAnyEntity.name).length > 0) {
                spliceList.push(patternAnyEntity.name);
            }
            if(helpers.filterMatch(LUISJSONBlob.prebuiltEntities, 'name', patternAnyEntity.name).length > 0) {
                spliceList.push(patternAnyEntity.name);
            }
        }
    }
    if(spliceList.length > 0) {
        spliceList.forEach(function(item) {
            for(let i in LUISJSONBlob.patternAnyEntities) {
                if(LUISJSONBlob.patternAnyEntities[i].name === item) {
                    LUISJSONBlob.patternAnyEntities.splice(i, 1);
                    break;
                }
            }
        })
    }
    
    // look for entity name collisions - list, simple, patternAny, phraselist
    // look for list entities labelled
    // look for prebuilt entity labels in utterances
    
    let entitiesList = [];
    let entityFound = '';
    if(LUISJSONBlob.entities.length > 0) {
        LUISJSONBlob.entities.forEach(function(entity) {
            entitiesList.push(new helperClasses.validateLUISBlobEntity(entity.name,['simple']));
        });
    }
    if(LUISJSONBlob.closedLists.length > 0){
        LUISJSONBlob.closedLists.forEach(function(entity) {
            entityFound = helpers.filterMatch(entitiesList, 'name', entity.name);
            if(entityFound.length === 0) {
                entitiesList.push(new helperClasses.validateLUISBlobEntity(entity.name,['list']));
            } else {
                entityFound[0].type.push('list');
            }
        });
    }
    if(LUISJSONBlob.patternAnyEntities.length > 0) {
        LUISJSONBlob.patternAnyEntities.forEach(function(entity) {
            entityFound = helpers.filterMatch(entitiesList, 'name', entity.name);
            if(entityFound.length === 0) {
                entitiesList.push(new helperClasses.validateLUISBlobEntity(entity.name,['patternAny']));
            } else {
                entityFound[0].type.push('patternAny');
            }
        });
    }
    if(LUISJSONBlob.model_features.length > 0) {
        LUISJSONBlob.model_features.forEach(function(entity) {
            entityFound = helpers.filterMatch(entitiesList, 'name', entity.name);
            if(entityFound.length === 0) {
                entitiesList.push(new helperClasses.validateLUISBlobEntity(entity.name,['phraseList']));
            } else {
                entityFound[0].type.push('phraseList');
            }
        });
    }
    // for each entityFound, see if there are duplicate definitions
    entitiesList.forEach(function(entity) {
        if(entity.type.length > 1) {
            throw({
                errCode: retCode.errorCode.DUPLICATE_ENTITIES, 
                text: 'Entity "' + entity.name + '" has duplicate definitions.\r\n\t' + JSON.stringify(entity.type, 2, null)
            })
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
                            throw({
                                errCode: retCode.errorCode.INVALID_INPUT, 
                                text: 'Utterance "' + utterance.text + '", has reference to List entity type. \r\n\t' + 'You cannot have utterances with List entity type references in them'
                            })
                        }
                        if(entityInList[0].type.includes('phraseList')) {
                            throw({
                                errCode: retCode.errorCode.INVALID_INPUT, 
                                text: 'Utterance "' + utterance.text + '", has reference to PhraseList. \r\n\t' + 'You cannot have utterances with phraselist references in them'
                            })
                        }
                    }
                });
            }
        });
    }
    return true;
}
/**
 * Handle collating all QnA sections across all parsed files into one QnA collection
 *
 * @param {object} parsedBlobs Contents of all parsed file blobs
 * @returns {object} Final qna object
 */
const collateQnAFiles = function(parsedBlobs) {
    let FinalQnAJSON = new qna();
    parsedBlobs.forEach(function(blob) {
        // does this blob have URLs?
        if(blob.urls.length > 0) {
            // add this url if this does not already exist in finaljson
            blob.urls.forEach(function(qnaUrl) {
                if(!FinalQnAJSON.urls.includes(qnaUrl)) {
                    FinalQnAJSON.urls.push(qnaUrl);
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
};
/**
 * Handle collating all LUIS sections across all parsed files into one LUIS collection
 *
 * @param {object} parsedBlobs Contents of all parsed file blobs
 * @returns {FinalLUISJSON} Final qna json contents
 * @throws {object} Throws on errors. Object includes errCode and text. 
 */
const collateLUISFiles = function(parsedBlobs) {
    let FinalLUISJSON = parsedBlobs[0];
    parsedBlobs.splice(0,1);
    parsedBlobs.forEach(function(blob) {
        mergeResults(blob, FinalLUISJSON, LUISObjNameEnum.INTENT);
        mergeResults(blob, FinalLUISJSON, LUISObjNameEnum.ENTITIES);
        mergeResults_closedlists(blob, FinalLUISJSON, LUISObjNameEnum.CLOSEDLISTS);
        mergeResults(blob, FinalLUISJSON, LUISObjNameEnum.UTTERANCE);
        mergeResults(blob, FinalLUISJSON, LUISObjNameEnum.PATTERNS);
        mergeResults(blob, FinalLUISJSON, LUISObjNameEnum.PATTERNANYENTITY);
        // do we have prebuiltEntities here?
        if(blob.prebuiltEntities.length > 0) {
            blob.prebuiltEntities.forEach(function(prebuiltEntity){
                let prebuiltTypeExists = false;
                for(fIndex in FinalLUISJSON.prebuiltEntities) {
                    if(prebuiltEntity.type === FinalLUISJSON.prebuiltEntities[fIndex].type) {
                        // do we have all the roles? if not, merge the roles
                        prebuiltEntity.roles.forEach(function(role) {
                            if(!FinalLUISJSON.prebuiltEntities[fIndex].roles.includes(role)) {
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
                        throw({
                            errCode: retCode.errorCode.INVALID_INPUT, 
                            text: '[ERROR]: Phrase list : "' + modelFeature.name + '" has conflicting definitions. One marked interchangeable and another not interchangeable'
                        });
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
            for(fIndex in finalCollection[type]) {
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
 * Helper function to see if we have any luis content in the blob
 *
 * @param {object} blob Contents of parsed luis blob
 * @returns {boolean} true if there is any luis content in the blob
 * 
 */
const haveLUISContent = function(blob) {
    return ((blob[LUISObjNameEnum.INTENT].length > 0) ||
    (blob[LUISObjNameEnum.ENTITIES].length > 0) || 
    (blob[LUISObjNameEnum.CLOSEDLISTS].length > 0) ||
    (blob[LUISObjNameEnum.PATTERNANYENTITY].length > 0) ||
    (blob.patterns.length > 0) ||
    (blob[LUISObjNameEnum.UTTERANCE].length > 0) ||
    (blob.prebuiltEntities.length > 0) ||
    (blob.model_features.length > 0));
};

module.exports = parser;
