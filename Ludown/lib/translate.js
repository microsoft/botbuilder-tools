#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const retCode = require('./enums/CLI-errors');
const txtfile = require('read-text-file');
const PARSERCONSTS = require('./enums/parserconsts');
const fetch = require('node-fetch');
const helpers = require('./helpers');
const translateModule = {
    /**
     * Helper function to parse, translate and write out localized lu files
     * @param {object} program parsed program object from commander
     * @returns {void} nothing
     * @throws {object} Throws on errors. Object includes errCode and text. 
     */
    translateContent: function(program) {
        let filesToParse = [];
        let folderStat = '';
        if(program.in) {
            filesToParse.push(program.in);
        }
        // do we have a folder passed in?
        if(program.lu_folder) {
            try
            {
                folderStat = fs.statSync(program.lu_folder);
            } catch (err) {
                throw({
                    errCode: retCode.errorCode.OUTPUT_FOLDER_INVALID, 
                    text: 'Sorry, ' + program.lu_folder + ' is not a folder or does not exist'
                });
            }
            if(!folderStat.isDirectory()) {
                throw({
                    errCode: retCode.errorCode.OUTPUT_FOLDER_INVALID, 
                    text: 'Sorry, ' + program.lu_folder + ' is not a folder or does not exist'
                });
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
                });
            }
        }
        // is there an output folder?
        var outFolder = process.cwd();
        if(program.out_folder) {
            if(path.isAbsolute(program.out_folder)) {
                outFolder = program.out_folder;
            } else {
                outFolder = path.resolve('', program.out_folder);
            }
            if(!fs.existsSync(outFolder)) {
                throw({
                    errCode: retCode.errorCode.OUTPUT_FOLDER_INVALID, 
                    text: 'Output folder ' + outFolder + ' does not exist'
                });
            }
        }
        while(filesToParse.length > 0) {
            var file = filesToParse[0];
            try {
                parseFile(file, program, outFolder);
            } catch (err) {
                throw(err);
            }
            filesToParse.splice(0,1);
         }
    },
    /**
     * Helper function to parseAndTranslate lu file content
     * @param {string} fileContent file content
     * @param {object} program program object from commander
     * @returns {string} Localized file content
     */
    parseAndTranslate : async function(fileContent, program) {
        let linesInFile = fileContent.split(/\n|\r\n/);
        let localizedContent = '';
        let currentSectionType = '';
        let data = '';
        const NEWLINE = '\r\n';
        const NL = '\n';
        for(lineIndex in linesInFile) {
            let currentLine = linesInFile[lineIndex];
            // is current line a comment? 
            if(currentLine.indexOf(PARSERCONSTS.COMMENT) === 0) {
                if(program.transate_comments) {
                    try {
                        data = await translateModule.translate(currentLine, program.translate_key, program.to_lang, program.src_lang);
                    } catch (err) {
                        throw(err);
                    }
                    localizedContent += data[0].translations[0].text + NEWLINE;
                    if(program.verbose) process.stdout.write(chalk.default.gray(data[0].translations[0].text + NL));
                } else {
                    localizedContent += currentLine + NEWLINE;
                    if(program.verbose) process.stdout.write(chalk.default.gray(currentLine + NL));
                }
            } else if (currentLine.indexOf(PARSERCONSTS.INTENT) === 0) {
                var intentName = currentLine.substring(currentLine.indexOf(' ') + 1).trim();
                //is this a QnA? 
                if(intentName.indexOf(PARSERCONSTS.QNA) === 0) {
                    var beforeQuestion = currentLine.substring(0, currentLine.indexOf(' ') + 1);
                    var question = intentName.slice(1).trim();
                    try {
                        data = await translateModule.translate(question, program.translate_key, program.to_lang, program.src_lang);
                    } catch (err) {
                        throw(err);
                    }
                    var lText = data[0].translations[0].text;
                    localizedContent += beforeQuestion + '? ' + lText + NEWLINE;
                    if(program.verbose) process.stdout.write(chalk.default.gray(beforeQuestion + '? ' + lText + NL));
                    currentSectionType = PARSERCONSTS.QNA;
                } else {
                    // we would not localize intent name but remember we are under intent section
                    currentSectionType = PARSERCONSTS.INTENT;
                    localizedContent += currentLine + NEWLINE;
                    if(program.verbose) process.stdout.write(chalk.default.gray(currentLine + NL));
                }
                
            } else if(currentLine.indexOf('-') === 0 || 
                    currentLine.indexOf('*') === 0 || 
                    currentLine.indexOf('+') === 0 ) {
                switch(currentSectionType) {
                    case PARSERCONSTS.INTENT: 
                        // strip line of the list separator
                        var listSeparator = currentLine.charAt(0);
                        var content = currentLine.slice(1).trim();
                        var entitiesList = [];
                        
                        // strip line off labelled entity values,mark pattern any entities as not to localize
                        if(content.includes("{")) {
                            var entityRegex = new RegExp(/\{(.*?)\}/g);
                            var entitiesFound = content.match(entityRegex);
                            var eStartIndex = -1;
                            var eEndIndex = -1;
                            entitiesFound.forEach(function(entity) {
                                var lEntity = entity.replace("{", "").replace("}", "");
                                var labelledValue = '';
                                
                                // is this a labelled value? 
                                if(lEntity.includes('=')) {
                                    var entitySplit = lEntity.split("=");
                                    if(entitySplit.length > 2) {
                                        throw({
                                            errCode: retCode.errorCode.INVALID_INPUT, 
                                            text: '[ERROR]: Nested entity references are not supported in utterance: ' + utterance
                                        })
                                    }
                                    lEntity = entitySplit[0].trim();
                                    labelledValue = entitySplit[1].trim();
                                    if(!labelledValue.includes(' ')) {
                                        updatedUtteranceLeft = content.substring(0,content.indexOf(entity));
                                        updatedUtteranceRight = content.substring(content.indexOf(entity) + entity.length);
                                        content = updatedUtteranceLeft + labelledValue + updatedUtteranceRight;
                                        eStartIndex = content.indexOf(labelledValue);
                                        eEndIndex = eStartIndex + labelledValue.length - 1;
                                        entitiesList.push({
                                            'entity': lEntity,
                                            'value': labelledValue,
                                            'start': eStartIndex,
                                            'end': eEndIndex
                                        });
                                    }                                 
                                } else {
                                    eStartIndex = content.indexOf(lEntity);
                                    eEndIndex = eStartIndex + lEntity.length - 1;
                                    entitiesList.push({
                                        'entity': lEntity,
                                        'value': labelledValue,
                                        'start': eStartIndex,
                                        'end': eEndIndex
                                    });
                                }
                                
                            });
                        }
                        try {
                            data = await translateModule.translate(content, program.translate_key, program.to_lang, program.src_lang);
                        } catch (err) {
                            throw(err);
                        }
                        if(entitiesList.length === 0) {
                            localizedContent += listSeparator + ' ' + data[0].translations[0].text + NEWLINE;
                            if(program.verbose) process.stdout.write(chalk.default.gray(listSeparator + ' ' + data[0].translations[0].text + NL));
                        } else {
                            // handle alignment
                            lText = data[0].translations[0].text;
                            if(data[0].translations[0].alignment) {
                                var alData = data[0].translations[0].alignment.proj.split(' ');
                                entitiesList.forEach(function(entity) {
                                    var testIndex = entity.start + ':' + entity.end;
                                    var alDataMap = alData.filter(val => {
                                        let p = val.split('-');
                                        if(p[0] === testIndex) return p[1];
                                    });
                                    if(alDataMap.length !== 0) {
                                        var seIndex = alDataMap[0].split('-')[1].split(':');
                                        var leftText = lText.substring(0, seIndex[0]);
                                        var rightText = lText.substring(parseInt(seIndex[1]) + 1);
                                        if(entity.value === '') {
                                            // we have a pattern any entity
                                            lText = leftText + entity.entity + rightText;
                                        } else {
                                            locLabelledValue = lText.substring(seIndex[0], parseInt(seIndex[1]) + 1);
                                            lText = leftText + '{' + entity.entity + '=' + locLabelledValue + '}' + rightText
                                        }
                                    }
                                });
                            } else {
                                try {
                                    data = await translateModule.translate(content, program.translate_key, program.to_lang, program.src_lang);
                                } catch (err) {
                                    throw(err);
                                }
                                lText = data[0].translations[0].text;
                            }
                            
                            localizedContent += listSeparator + ' ' + lText + NEWLINE;
                            if(program.verbose) process.stdout.write(chalk.default.gray(listSeparator + ' ' + lText + NL));
                            
                        }
                        
                        
                        break;
                    case PARSERCONSTS.ENTITY: 
                        // strip line of the list separator
                        var listSeparator = currentLine.charAt(0);
                        var content = currentLine.slice(1).trim();
                        try {
                            data = await translateModule.translate(content, program.translate_key, program.to_lang, program.src_lang);
                        } catch (err) {
                            throw(err);
                        }
                        var lText = data[0].translations[0].text;
                        localizedContent += listSeparator + ' ' + lText + NEWLINE;
                        if(program.verbose) process.stdout.write(chalk.default.gray(listSeparator + ' ' + lText + NL));
                        break;
                    case PARSERCONSTS.QNA:
                        // strip line of the list separator
                        var listSeparator = currentLine.charAt(0);
                        var content = currentLine.slice(1).trim();
                        try {
                            data = await translateModule.translate(content, program.translate_key, program.to_lang, program.src_lang);
                        } catch (err) {
                            throw(err);
                        }
                        var lText = data[0].translations[0].text;
                        localizedContent += listSeparator + ' ' + lText + NEWLINE;
                        if(program.verbose) process.stdout.write(chalk.default.gray(listSeparator + ' ' + lText + NL));
                        break;
                }
            } else if(currentLine.indexOf(PARSERCONSTS.ENTITY) === 0) {
                // we would not localize entity line but remember we are under entity section for list entities
                currentSectionType = PARSERCONSTS.ENTITY;
                localizedContent += currentLine + NEWLINE;
                if(program.verbose) process.stdout.write(chalk.default.gray(currentLine + NL));
            } else if (currentLine.indexOf(PARSERCONSTS.QNA) === 0) {
                // we should localize the question
                currentSectionType = PARSERCONSTS.QNA;
            } else if(currentLine.indexOf(PARSERCONSTS.ANSWER) === 0) {
                localizedContent += currentLine + NEWLINE;
                if(program.verbose) process.stdout.write(chalk.default.gray(currentLine + NL));
                currentSectionType = PARSERCONSTS.ANSWER;
            } else if (currentLine.indexOf(PARSERCONSTS.URLORFILEREF) ===0) {
                currentSectionType = PARSERCONSTS.URLORFILEREF;
                if(program.translate_link_text) {
                    var linkValueRegEx = new RegExp(/\(.*?\)/g);
                    var linkValueList = currentLine.trim().match(linkValueRegEx);
                    var linkValue = linkValueList[0].replace('(','').replace(')','');
                    var linkTextRegEx = new RegExp(/\[.*\]/g);
                    var linkTextList = currentLine.trim().match(linkTextRegEx);
                    var linkTextValue = linkTextList[0].replace('[','').replace(']','');
                    try {
                        data = await translateModule.translate(linkTextValue, program.translate_key, program.to_lang, program.src_lang);
                    } catch (err) {
                        throw(err);
                    }
                    var lText = data[0].translations[0].text;
                    localizedContent += '[' + lText + ']' + '(' + linkValue + ')' + NEWLINE;
                    if(program.verbose) process.stdout.write(chalk.default.gray('[' + lText + ']' + '(' + linkValue + ')' + NL));
                } else {
                    localizedContent += currentLine + NEWLINE;
                    if(program.verbose) process.stdout.write(chalk.default.gray(currentLine + NL));
                }
            } else if(currentLine === '') {
                localizedContent += NEWLINE;
                if(program.verbose) process.stdout.write(chalk.default.gray(NL));
            } else {
                if(currentSectionType === PARSERCONSTS.ANSWER) {
                    try {
                        data = await translateModule.translate(currentLine, program.translate_key, program.to_lang, program.src_lang);
                    } catch (err) {
                        throw(err);
                    }
                    var lText = data[0].translations[0].text;
                    localizedContent += lText + NEWLINE;
                    if(program.verbose) process.stdout.write(chalk.default.gray(lText + NL));
                } else {
                    throw({
                        errCode: retCode.errorCode.INVALID_INPUT_FILE, 
                        text: 'Error: Unexpected line encountered when parsing \n' + '[' + lineIndex + ']:' + currentLine
                    })
                }
            }
        }
        return localizedContent;
    },
    /**
     * Helper function to call MT rest API to translate content
     * @param {string} text Text to translate
     * @param {string} subscriptionKey user provided subscription to text translation API
     * @param {string} to_lang target language to localize to
     * @param {string} from_lang source language of text
     * @returns {object} response from MT call.
     * @throws {object} throws if request fails. Includes response text and errCode set to TRANSLATE_SERVICE_FAIL
     */
    translate: async function(text, subscriptionKey, to_lang, from_lang) {
        let tUri = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=' + to_lang + '&includeAlignment=true';
        if(from_lang) tUri += '&from=' + from_lang;
        const options = {
            method: 'POST',
            body: JSON.stringify ([{'Text' : text}]),
            headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
            'X-ClientTraceId' : get_guid (),
            }
        };
        const res = await fetch(tUri, options);
        if (!res.ok) {
            throw({
                text: res.statusText,
                errCode: retCode.errorCode.TRANSLATE_SERVICE_FAIL
            })
        }
        let data = await res.json();
        return data;
    }
}

/**
 * Helper function to parse, translate and write out localized lu files
 * @param {string} file file name
 * @param {object} program program object from commander
 * @param {string} outFolder output folder path
 * @returns {void} nothing
 */
async function parseFile(file, program, outFolder) {
    let fileName = path.basename(file);
    if(!fs.existsSync(path.resolve(file))) {
        throw({
            errCode: retCode.errorCode.FILE_OPEN_ERROR, 
            text: 'Sorry unable to open [' + file + ']'
        });
    }
    let fileContent = txtfile.readSync(file);
    if (!fileContent) {
        throw({
            errCode: retCode.errorCode.FILE_OPEN_ERROR, 
            text: 'Sorry, error reading file:' + file
        });
    }
    if(program.verbose) process.stdout.write(chalk.default.whiteBright('Parsing file: ' + file + '\n'));
    let parsedLocContent = '';
    try {
        parsedLocContent = await translateModule.parseAndTranslate(fileContent, program);
    } catch (err) {
        throw(err);
    }
    
    if (!parsedLocContent) {
        throw({
            errCode: retCode.errorCode.INVALID_INPUT_FILE, 
            text: 'Sorry, file : ' + file + 'had invalid content'
        });
    } else {
        // write out file
        outFolder = path.join(outFolder, program.to_lang);
        try
        {
            fs.mkdirSync(outFolder);
        } catch(exception) {
            if(exception.code != 'EEXIST') {
                throw({
                    errCode: retCode.errorCode.UNABLE_TO_WRITE_FILE, 
                    text: 'Unable to create folder - ' + exception
                });
            }
        }
        var outFileName = path.join(outFolder, fileName);
        try {
            fs.writeFileSync(outFileName, parsedLocContent, 'utf-8');
        } catch (err) {
            throw({
                errCode: retCode.errorCode.UNABLE_TO_WRITE_FILE, 
                text: 'Unable to write LU file - ' + outFileName
            });
        }
        if(program.verbose) process.stdout.write(chalk.default.italic('Successfully wrote to ' + outFileName + '\n\n'));
    }
}

/**
 * Helper function to create a random guid
  * @returns {string} GUID
 */
const get_guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
  
module.exports = translateModule; 