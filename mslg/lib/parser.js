/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const exception = require('ludown').helperClasses.Exception;
const ludownParser = require('ludown').parserHelpers.splitFileBySections;
const ludownLUISParser = require('ludown').parser.parseFile;
const findFiles = require('ludown').parserHelpers.findFiles;
const errorCodes = require('./enums/errorCodes');
const path = require('path');
const LGParsedObj = require('./classes/LGParsedObj');
const LGObject = require('./classes/LGObject');
const fs = require('fs');
const txtfile = require('read-text-file');
const parserConsts = require('./enums/parserconsts');
const chalk = require('chalk');
const parser = {
    /**
     * Function to parse input .lg files, collate them and write the output to disk
     * 
     * @param {string} folderWithLGFiles Input folder containing .lg files
     * @param {boolean} includeSubFolder If true, look under subfolders for .lg files
     * @param {string} outputFolder Output folder name for collated .lg file
     * @param {string} LGAppName Application name for the output .lg file
     * @param {boolean} verboseLog If true, write verbose log messages to console.log
     * @returns {void} Nothing
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    parseCollateAndWriteOut: async function(folderWithLGFiles, includeSubFolder, outputFolder, LGAppName, verboseLog) {
        const lgFileExt = '.lg';
        let lOutputFolder, lgFiles, collatedLGContent, finalMdContent;
        let allParsedContent = [];
        // verify input & output folder (if specified) exists
        try {
            lOutputFolder = getOutputFolder(outputFolder);
        } catch (err) {
            throw (err);
        }
        try {
            let folderStat = fs.statSync(folderWithLGFiles);
            if(!folderStat.isDirectory()) {
                throw (new exception(retCode.errorCode.INVALID_INPUT, 'Sorry, ' + folderWithLGFiles + ' is not a folder or does not exist'));
            }
        } catch (err) {
            throw (new exception(retCode.errorCode.INVALID_INPUT, 'Sorry, ' + folderWithLGFiles + ' is not a folder or does not exist'));
        }
        
        // get files from folder
        lgFiles = findFiles(folderWithLGFiles, includeSubFolder, lgFileExt);
        if(lgFiles && lgFiles.length === 0) {
            throw (new exception('No .lg files in specified folder', errorCodes.INVALID_INPUT));
        }
        // loop through lgFiles, parse each one
        while(lgFiles.length > 0) {
            let file = lgFiles[0];
            let fileContent, parsedContent; 
            try {
                fileContent = getFileContent(file);
                if(verboseLog) process.stdout.write(chalk.default.whiteBright('Parsing file: ' + file + '\n'));
                parsedContent = await parser.parse(fileContent, verboseLog);
            } catch (err) {
                throw (err);
            }
            if(parsedContent && parsedContent.LGObject) allParsedContent.push(parsedContent.LGObject);
            // remove this file from the list
            let parentFile = lgFiles.splice(0,1);
            let parentFilePath = path.parse(path.resolve(parentFile[0])).dir;
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
        
        try {
            // collate files
            collatedLGContent = await parser.collate(allParsedContent);
            // generate output file content
            finalMdContent = await parser.genMdFromParserObj(collatedLGContent);
            // write out to disk
            if(!LGAppName) LGAppName = path.basename(folderWithLGFiles) + '.lg';
            if(!LGAppName.includes('.lg')) LGAppName += '.lg';
            writeToDisk(finalMdContent, LGAppName, lOutputFolder, verboseLog);
        } catch (err) {
            throw (err);
        }
    },
    /**
     * @param {string} fileContent file content to parse
     * @param {boolean} verboseLog If true, write verbose log messages to console.log
     * @returns {LGParsedObj} Object containing parsed LG file content and any additional files to parse
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    parse: async function(fileContent, verboseLog) {
        let parsedFileContent, retObj, parsedFileLUISContent;
        try {
            parsedFileContent = await ludownParser(fileContent, verboseLog);
            parsedFileLUISContent = await ludownLUISParser(fileContent, verboseLog);
            retObj = new LGParsedObj(LGObject.toLG(parsedFileContent),
                                     parsedFileLUISContent.LUISJsonStructure,
                                     parsedFileLUISContent.additionalFilesToParse);
        } catch (err) {
            throw (err);
        }
        return retObj;
    }, 
    /**
     * @param {LGParsedObj []} parsedContent List of parsed content as LGParsedObj 
     * @returns {LGParsedObj} Collated object containing parsed file contents
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    collate: async function(parsedContent) {
        let collatedContent = parsedContent[0], retObj;
        parsedContent.splice(0,1);
        parsedContent.forEach(function(LGObject) {
            // for each template by name, see if there is a matching template in collatedContent
            if(LGObject.LGTemplates.length > 0) {
                LGObject.LGTemplates.forEach(function(template) {
                    let matchingCollatedTemplateItem = collatedContent.LGTemplates.filter(item => {return item.name == template.name;});
                    if(matchingCollatedTemplateItem.length > 0) {
                        matchingCollatedTemplateItem = matchingCollatedTemplateItem[0]
                        // collate variations and conditional responses for this item
                        if((template.variations.length !== 0 && matchingCollatedTemplateItem.variations.length === 0) || (template.conditionalResponses.length !== 0 && matchingCollatedTemplateItem.conditionalResponses.length === 0)) {
                            throw (new exception(errorCodes.INVALID_TEMPLATE, 'Template ' + template.name + ' has both conditional response definition as well as variations. A template cannot be both!'));
                        }

                        if(template.variations.length !== 0) {
                            // for each item in template variations see if this exists in collated list
                            template.variations.forEach(function(variation) {
                                if(!matchingCollatedTemplateItem.variations.includes(variation)) matchingCollatedTemplateItem.variations.push(variation);
                            });
                        }

                        if(template.conditionalResponses.length !== 0) {
                            // for each condition in template, see if this exists in collated list
                            template.conditionalResponses.forEach(function(conditionalResponse) {
                                let matchingConditionalResponse = matchingCollatedTemplateItem.conditionalResponses.filter(res => {return res.condition == conditionalResponse.condition;});
                                if(matchingConditionalResponse.length > 0) {
                                    // see if we have new variations for the same condition
                                    conditionalResponse.variations.forEach(function(variation) {
                                        if(!matchingConditionalResponse[0].variations.includes(variation)) matchingConditionalResponse[0].variations.push(variation);
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
            
        });
        return collatedContent;
    }, 
     
    /**
     * @param {LGParsedObj} parsedContent Parsed and collated parser object
     * @param {boolean} verboseLog If true, write verbose log messages to console.log
     * @returns {string} text content of collated LG parser object in markdown format
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
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
        return fileContent;
    }
};

module.exports = parser;
/**
 * Helper function to write content out to disk
 * 
 * @param {string} fileContent File content to write out to disk 
 * @param {string} fileName Output file name
 * @param {string} filePath Output file path
 * @param {boolean} verboseLog If true, write verbose log messages to console.log
 * @returns {void} Nothing
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const writeToDisk = function(fileContent, fileName, filePath, verboseLog) {
    let outFile = path.join(filePath, fileName)
    // write out the final LUIS Json
    try {
        fs.writeFileSync(outFile, fileContent, 'utf-8');
    } catch (err) {
        throw(new exception(retCode.errorCode.UNABLE_TO_WRITE_FILE, 'Unable to write LG file - ' + outFile));
    }
    if(verboseLog) console.log(chalk.default.italic('Successfully wrote LG file to ' + outFile + '\n'));
}
/**
 * Helper function to get output folder
 * @param {object} program Parsed program object from commander
 * @returns {string} Output folder
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const getOutputFolder = function(outFolderPath) {
    let outFolder = process.cwd();
    if(outFolderPath) {
        if(path.isAbsolute(outFolderPath)) {
            outFolder = outFolderPath;
        } else {
            outFolder = path.resolve('', outFolderPath);
        }
        if(!fs.existsSync(outFolder)) {
            throw(new exception(retCode.errorCode.NO_LU_FILES_FOUND, 'Output folder ' + outFolder + ' does not exist'));     
        }
    }
    return outFolder;
};
/**
 * Helper function to get file content
 * @param {string} file File path
 * @returns {string} file content
 * @throws {exception} Throws on errors. exception object includes errCode and text. 
 */
const getFileContent = function(file) {
    if(!fs.existsSync(path.resolve(file))) {
        throw(new exception(retCode.errorCode.FILE_OPEN_ERROR, 'Sorry unable to open [' + file + ']'));     
    }
    let fileContent = txtfile.readSync(file);
    if (!fileContent) {
        throw(new exception(retCode.errorCode.FILE_OPEN_ERROR,'Sorry, error reading file:' + file));
    }
    return fileContent;
}