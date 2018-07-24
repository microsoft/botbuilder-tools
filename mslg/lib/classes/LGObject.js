/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const LGTemplate = require('./LGTemplate');
const LGConditionalResponseTemplate = require('./LGConditionalResponse');
const exception = require('ludown').helperClasses.Exception;
const errCode = require('../enums/errorCodes');
const parserConsts = require('../enums/parserconsts');
class LGObject {
    /**
     * @property {LGTemplate []} LGTemplates
     */
    constructor(LGTemplates) {
        this.LGTemplates = LGTemplates?LGTemplates:[new LGTemplate()];
    }
};

LGObject.toLG = function (parsedFileContent) {
    if(!parsedFileContent) return undefined;
    if(!(parsedFileContent instanceof Array)) return undefined;
    if(parsedFileContent.length === 0) return undefined;
    
    let LGTemplatesCollection = [];
    parsedFileContent.forEach(function(chunk) {
        let cLGTemplate;
        let pushAtEnd = true;
        chunk = chunk.trim();
        let chunkSplitByLine = chunk.split(/\r\n|\r|\n/g);
        if(chunk.indexOf(parserConsts.INTENT) === 0) {
            let templateName = chunkSplitByLine[0].substring(chunkSplitByLine[0].indexOf(' ') + 1);
            let conditionalResponseItem = null;
            chunkSplitByLine.splice(0,1);
            // see if this template already exists
            if(LGTemplatesCollection.length > 0) {
                let existingLGTemplate = LGTemplatesCollection.filter(function(item) {
                    return item.name == templateName;
                });
                if(existingLGTemplate.length !== 0) {
                    pushAtEnd = false;
                    cLGTemplate = existingLGTemplate[0];
                } else {
                    cLGTemplate = new LGTemplate(templateName, null, null);
                    pushAtEnd = true;
                }
            } 
            if(!cLGTemplate || !cLGTemplate.name || cLGTemplate.name === '') cLGTemplate = new LGTemplate(templateName, null, null);
            // for the remaining sections, add the content to the cLGTemplate
            let inConditionalResponses = false;
            chunkSplitByLine.forEach(function(item) {
                // remove the list decoration from line.
                if((item.indexOf('-') !== 0) &&
                (item.indexOf('*') !== 0) && 
                (item.indexOf('+') !== 0)) {
                    throw ({
                        errCode: errCode.NO_LIST_DECORATION_ON_VARIATION, 
                        text: 'Template item: "' + item + '" does not have list decoration. Prefix line with "-" or "+" or "*"'
                    });
                }
                item = item.slice(1).trim();
                
                if(item.trim().indexOf(parserConsts.CONDITION) === 0) {
                    if(inConditionalResponses && pushAtEnd) {
                        cLGTemplate.conditionalResponses.push(conditionalResponseItem);
                    }
                    // see if we already have this condition if so, get that object
                    let condition = item.replace(parserConsts.CONDITION, '').trim();
                    if(cLGTemplate.conditionalResponses.length > 0) {
                        let haveThisCondition = cLGTemplate.conditionalResponses.filter(item => {return item.condition == condition;});
                        if(haveThisCondition.length > 0) {
                            conditionalResponseItem = haveThisCondition[0];
                            pushAtEnd = false;
                        } else {
                            conditionalResponseItem = new LGConditionalResponseTemplate(condition);
                            pushAtEnd = true;
                        }
                    } else {
                        conditionalResponseItem = new LGConditionalResponseTemplate(condition);
                        pushAtEnd = true;
                    }
                    inConditionalResponses = true;
                } else if(item.trim().indexOf(parserConsts.DEFAULT) === 0) {
                    if(inConditionalResponses && pushAtEnd) {
                        cLGTemplate.conditionalResponses.push(conditionalResponseItem);
                    }
                    // see if we already have this condition if so, get that object
                    let condition = item.replace(parserConsts.DEFAULT, parserConsts.ELSE).trim();
                    if(cLGTemplate.conditionalResponses.length > 0) {
                        let haveThisCondition = cLGTemplate.conditionalResponses.filter(item => {return item.condition == condition;});
                        if(haveThisCondition.length > 0) {
                            conditionalResponseItem = haveThisCondition[0];
                            pushAtEnd = false;
                        } else {
                            conditionalResponseItem = new LGConditionalResponseTemplate(condition);
                            pushAtEnd = true;
                        }
                    } else {
                        conditionalResponseItem = new LGConditionalResponseTemplate(condition);
                        pushAtEnd = true;
                    }
                    inConditionalResponses = true;
                } else {
                    if(inConditionalResponses) {
                        if(!conditionalResponseItem.variations.includes(item)) conditionalResponseItem.variations.push(item);
                    } else {
                        if(!cLGTemplate.variations.includes(item)) cLGTemplate.variations.push(item);
                    }
                }
            });
            if(inConditionalResponses && pushAtEnd) cLGTemplate.conditionalResponses.push(conditionalResponseItem);
        } else {
            throw(new exception(errCode.INVALID_INPUT, 'Unidentified template definition. Template definition must start with # <Template Name> :: \n' + chunk));
        }
        if(cLGTemplate.name !== '' && pushAtEnd) LGTemplatesCollection.push(cLGTemplate);
        if(cLGTemplate.variations.length === 0 && cLGTemplate.conditionalResponses.length === 0) {
            throw (new exception(errCode.INVALID_TEMPLATE, 'Template "' + cLGTemplate.name + '" does not have any variations or conditional response definition'));
        }
    });
    
    return new LGObject(LGTemplatesCollection);
}
module.exports = LGObject;
