/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const deepEqual = require('deep-equal');

const validate = require('./validation');
const Exception = require('./exception')
const parserHelpers = require('./parserHelper');

const retCode = require('../enums/errorCodes');
const entityTypes = require('../enums/LGEntityType');
const parserConsts = require('../enums/parserconsts');

const LGParsedObj = require('../classes/LGParsedObj');
const LGObject = require('../classes/LGObject');

const parser = {
    /**
     * Async function to parse input .lg files, collate them and write the output to disk
     * 
     * @param {string} folderWithLGFiles Input folder containing .lg files
     * @param {boolean} includeSubFolder If true, look under subfolders for .lg files
     * @param {string} outputFolder Output folder name for collated .lg file
     * @param {string} lgAppName Application name for the output .lg file
     * @param {boolean} verboseLog If true, write verbose log messages to console.log
     * @returns {string} final collated lg content
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    parseCollateAndWriteOut: async function(args, writeOut = true) {
        const folderWithLGFiles = (args["l"] || args["lgFolder"] || args["lg"]);
        const includeSubFolder = (args["s"] || args["subfolder"]);
        const outputFolder =  (args["o"] || args["outFolder"]);
        const verboseLog = (args["verbose"]);   
        let lgAppName = (args["n"] || args["lgAppName"]);     
        // verify input & output folder (if specified) exists
        const lOutputFolder = parserHelpers.getOutputFolder(outputFolder);
        try {
            const folderStat = fs.statSync(folderWithLGFiles);
            if(!folderStat.isDirectory()) 
                throw new Exception(retCode.INVALID_INPUT, `Sorry, ${folderWithLGFiles} is not a folder or does not exist`);
        } catch (err) {
            throw new Exception(retCode.INVALID_INPUT, `Sorry, ${folderWithLGFiles} is not a folder or does not exist`);
        }
        
        // get files from folder
        const lgFiles = parserHelpers.findFiles(folderWithLGFiles, includeSubFolder, lgFileExt);
        const allParsedContent = await parser.parseFiles(lgFiles, verboseLog);
        // write out to disk
        const finalMdContent = await parser.collateParsedContentToMd(allParsedContent, verboseLog);
        if(writeOut){
            if(!lgAppName) 
                lgAppName = path.basename(folderWithLGFiles) + lgFileExt;
            if(!lgAppName.includes(lgFileExt)) 
                lgAppName += lgFileExt;
            parserHelpers.writeToDisk(finalMdContent, lgAppName, lOutputFolder, verboseLog);
        }else{
            return finalMdContent;
        }
    },
    /**
     * Async function to parse input .lg file, validate it and return content
     * 
     * @param {string[]} lgFiles path of .lg file 
     * @param {boolean} verboseLog If true, write verbose log messages to console.log
     * @returns {string} final markdown lg content
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    parseFile: async function(lgFilePath, verboseLog){
        const allParsedContent = await parser.parseFiles([lgFilePath], verboseLog);
        return await parser.collateParsedContentToMd(allParsedContent, verboseLog);
    },
    /**
     * Async function to parse input .lg files and returns parsed content
     * 
     * @param {string[]} lgFiles List containing paths of .lg files
     * @param {boolean} verboseLog If true, write verbose log messages to console.log
     * @returns {LGObject[]} Parsed LGObjects
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    parseFiles: async function(lgFiles, verboseLog){
        if(lgFiles && lgFiles.length === 0) {
            throw (new Exception('No .lg files in specified folder', retCode.INVALID_INPUT));
        }
        const allParsedContent = [];
        // loop through lgFiles, parse each one
        while(lgFiles.length > 0) {
            const file = lgFiles[0];
            let fileContent, parsedContent; 

            fileContent = parserHelpers.getFileContent(file);
            if(verboseLog) 
                process.stdout.write(chalk.default.whiteBright('Parsing file: ' + file + '\n'));
            parsedContent = await parser.parse(fileContent, verboseLog);
           
            if(parsedContent && parsedContent.LGObject) 
                allParsedContent.push(parsedContent.LGObject);
            // remove this file from the list
            const parentFile = lgFiles.splice(0,1);
            const parentFilePath = path.parse(path.resolve(parentFile[0])).dir;
            // add additional files to parse to the list
            if(parsedContent.additionalFilesToParse.length > 0) {
                parsedContent.additionalFilesToParse.forEach(function(file) {
                    if(path.isAbsolute(file)) {
                        lgFiles.push(file);
                    } else {
                        lgFiles.push(path.resolve(parentFilePath, file));
                    }
                });
            }
        }

        return allParsedContent;
    },
    /**
     * Async function to that accepts list of parsed content then collate 
     * and convert them to markdown
     * 
     * @param {LGObject[]} allParsedContent Parsed LG Objects
     * @param {boolean} verboseLog If true, write verbose log messages to console.log
     * @returns {string} final markdown lg content
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    collateParsedContentToMd: async function(allParsedContent, verboseLog){
        try{
            // collate files
            const collatedLGContent = await parser.collate(allParsedContent);
            // generate output file content
            return await parser.genMdFromParserObj(collatedLGContent);
        }catch(err){
            return null;
        }
    },
    /**
     * Async function to parse content into LG and LUIS objects, also extracts additional LG files to parse
     * 
     * @param {string} fileContent file content to parse
     * @param {boolean} verboseLog If true, write verbose log messages to console.log
     * @returns {LGParsedObj} Object containing parsed LG file content and any additional files to parse
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    parse: async function(fileContent, verboseLog) {
        return LGObject.toLG(parserHelpers.splitFileBySections(fileContent, verboseLog));
    }, 
    /**
     * Async function to collate parsed LG content
     * 
     * @param {LGParsedObj []} parsedContent List of parsed content as LGParsedObj 
     * @returns {LGParsedObj} Collated object containing parsed file contents
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    collate: async function(parsedContent) {
        let collatedContent = parsedContent[0], retObj;
        parsedContent.splice(0,1);
        parsedContent.forEach(function(LGObj) {
            // for each template by name, see if there is a matching template in collatedContent
            if(LGObj.LGTemplates.length > 0) {
                LGObj.LGTemplates.forEach(function(template) {
                    let matchingCollatedTemplateItem = collatedContent.LGTemplates.filter(item => item.name === template.name);
                    if(matchingCollatedTemplateItem.length > 0) {
                        matchingCollatedTemplateItem = matchingCollatedTemplateItem[0]
                        // collate variations and conditional responses for this item
                        if((template.variations.length !== 0 && matchingCollatedTemplateItem.variations.length === 0) || (template.conditionalResponses.length !== 0 && matchingCollatedTemplateItem.conditionalResponses.length === 0)) {
                            throw new Exception(retCode.INVALID_TEMPLATE, `Template ${template.name} has both conditional response definition as well as variations. A template cannot be both!`);
                        }

                        if(template.variations.length !== 0) {
                            // for each item in template variations see if this exists in collated list
                            template.variations.forEach(function(variation) {
                                if(!matchingCollatedTemplateItem.variations.includes(variation)) 
                                    matchingCollatedTemplateItem.variations.push(variation);
                            });
                        }

                        if(template.conditionalResponses.length !== 0) {
                            // for each condition in template, see if this exists in collated list
                            template.conditionalResponses.forEach(function(conditionalResponse) {
                                let matchingConditionalResponse = matchingCollatedTemplateItem.conditionalResponses.filter(res => res.condition === conditionalResponse.condition);
                                if(matchingConditionalResponse.length > 0) {
                                    // see if we have new variations for the same condition
                                    conditionalResponse.variations.forEach(function(variation) {
                                        if(!matchingConditionalResponse[0].variations.includes(variation)) 
                                            matchingConditionalResponse[0].variations.push(variation);
                                    });
                                } else {
                                    matchingCollatedTemplateItem.conditionalResponses.push(conditionalResponse);
                                }
                            })
                        }
                    } else {
                        collatedContent.LGTemplates.push(template);
                    }
                });
            }

            if(LGObj.entities.length > 0) {
                LGObj.entities.forEach(entity => {
                    let matchingCollatedEntity = collatedContent.entities.filter(item => item.name === entity.name);
                    if(matchingCollatedEntity.length === 0) {
                        collatedContent.entities.push(entity);
                    } else {
                        if((matchingCollatedEntity[0].entityType === entityTypes.String.name) && (entity.entityType !== entityTypes.String.name)) {
                            matchingCollatedEntity[0].entityType = entity.entityType;
                        } else if(!deepEqual(matchingCollatedEntity[0], entity)) {
                            throw new Exception(retCode.DUPLICATE_INCOMPATIBE_ENTITY_DEF, `Duplicate and incompatible entity definitions found for entity: " ${entity.name}"`);
                        }
                    }
                });
            }
            
        });

        // validate collated content
        validate.validateTemplate(collatedContent);
        return collatedContent;
    }, 
     
    /**
     * Async function to generate markdown content from parsed LG object
     * 
     * @param {LGParsedObj} parsedContent Parsed and collated parser object
     * @param {boolean} verboseLog If true, write verbose log messages to console.log
     * @returns {string} text content of collated LG parser object in markdown format
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    genMdFromParserObj: async function(parsedContent, verboseLog) {
        let fileContent = '';
        const NEWLINE = '\r\n';
        parsedContent.LGTemplates.forEach(function(template) {
            fileContent += '# ' + template.name + NEWLINE;
            if(template.variations.length !== 0) {
                template.variations.forEach(variation => {fileContent += '    - ' + variation + NEWLINE;})
            } 
            if(template.conditionalResponses.length !== 0) {
                template.conditionalResponses.forEach(function(conditionalResponse) {
                    let conditionName = (conditionalResponse.condition === parserConsts.ELSE)?parserConsts.DEFAULT + ' ':conditionalResponse.condition;
                    fileContent += '    - ' + conditionName + NEWLINE;
                    conditionalResponse.variations.forEach(variation => {fileContent += '        - ' + variation + NEWLINE;})
                })
            }
            fileContent += NEWLINE + NEWLINE;
        });
        fileContent += NEWLINE;
        parsedContent.entities.forEach(entity => {
            fileContent += '$' + ' ' + entity.name + ' : ' + entity.entityType;
            if(entity.attributions.length !== 0) {
                entity.attributions.forEach(atr => {fileContent += ' ' + atr.key + ' = ' + atr.value});
            }
            fileContent += NEWLINE;
        })
        return fileContent;
    }
};

module.exports = parser;