/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const helpers = require('./helpers');
const Exception = require('./exception')
const errCodes = require('../enums/errorCodes');
const reservedNames = require('../enums/reservedNames');
const VALIDATION_PASS = true;

module.exports = {
    /**
     * All Validators
     */
    /**
     * Validator
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    isNotNullOrEmpty: function (item) {
        if(item === null || item === undefined || item.trim() === '') 
            throw new Exception(errCodes.INVALID_VARIATION, `Variation "${item}" cannot be null or empty`);
        return VALIDATION_PASS;
    },
    /**
     * Validator
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    isNotNullOrEmptyCondition: function (item) {
        if(item === null || item === undefined || item.trim() === '') 
            throw new Exception(errCodes.INVALID_CONDITION, `Condition "${item}" cannot be null or empty`);
        return VALIDATION_PASS;
    },
    /**
     * Validator
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    noReferencesToReservedKeywords: function (item) {
        let parsedEntity = helpers.parseEntity(item);
        if(parsedEntity.entities.length === 0) 
            return VALIDATION_PASS;
        parsedEntity.entities.forEach(entity => {
            if(reservedNames.includes(entity)) 
                throw new Exception(errCodes.ENTITY_WITH_RESERVED_KEYWORD, `Entity "${entity}" in variation "${item}" has reference to a reserved keyword`);
        });
        return VALIDATION_PASS;
    },
    /**
     * Validator
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    noNestedTemplateRefernce: function (item) {
        // get template references in item
        let templatesRegExp = new RegExp(/\[(.*?)\]/g);
        let templatesFound = item.match(templatesRegExp);
        if(!templatesFound || templatesFound.length === 0) 
            return VALIDATION_PASS;
        templatesFound.forEach(template => {
            template = template.replace('[').replace(']');
            if(template.includes('[') || template.includes(']')) 
                throw new Exception(errCodes.NESTED_TEMPLATE_REFERENCE, `Template "${template}" in variation "${item}" has nested template references.`);
        })
        return VALIDATION_PASS;
    },
    /**
     * Validator
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    noNestedEntityReferences: function (item) {
        let parsedEntity = helpers.parseEntity(item);
        if(parsedEntity.entities.length === 0) 
            return VALIDATION_PASS;
        parsedEntity.entities.forEach(entity => {
            if(entity.includes('{') || entity.includes('}')) 
                throw new Exception(errCodes.NESTED_ENTITY_REFERENCE, `Entity "${entity}" in variation "${item}" has nested entity references.`);
        })
        return VALIDATION_PASS;
    },
    /**
     * Validator 
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    callBackFunctionsEnclosedInBraces: function (item) {
        // get call back function references in item
        let callBackFunctionRegExp = new RegExp(/{(.*?)\(.*\)}/g);
        let callBackFunctions = item.match(callBackFunctionRegExp);
        if(item.includes('(') && !callBackFunctions) 
            throw new Exception(errCodes.INVALID_CALLBACK_FUNTION_DEF, `Call back functions need to be enclosed in {}. Invalid variation "${item}"`);
        return VALIDATION_PASS;
    },
    /**
     * Validator 
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    callBackFunctionInRecognizedList: function (item) {
        // get call back function references in item
        let parsedItems = helpers.parseEntity(item);
        if(parsedItems.callBacks.length === 0) 
            return VALIDATION_PASS;
        parsedItems.callBacks.forEach(cbF => {
            if(!cbF.functionName || cbF.functionName === '' || !reservedNames.includes(cbF.functionName)) 
                throw new Exception(errCodes.INVALID_CALLBACK_FUNTION_NAME, `Unrecognized call back function reference in variation "${item}"`);
        });
        return VALIDATION_PASS;
    },
    /**
     * Validator 
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    callBackFunctionInConditionIsInRecognizedList: function (item) {
        // get call back function references in item
        let parsedItems = helpers.parseEntity(item);
        if(parsedItems.callBacks.length === 0) 
            return VALIDATION_PASS;
        parsedItems.callBacks.forEach(cbF => {
            if(!cbF.functionName || cbF.functionName === '' || !reservedNames.includes(cbF.functionName)) 
                throw new Exception(errCodes.INVALID_CALLBACK_FUNTION_NAME, `Unrecognized call back function reference in variation "${item}"`);
        });
        return VALIDATION_PASS;
    },
    /**
     * Validator template
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    noSpacesInTemplateNames: function (item) {
        if(item.includes(' ')) 
            throw new Exception(errCodes.INVALID_SPACE_IN_TEMPLATE_NAME, `Template name "${item}" has one or more spaces in it. Spaces are not allowed in template names`);
        return VALIDATION_PASS;
    },
    /**
     * Validator template
     * 
     * @param {LGObject} lgObject input LGObject to validate
     * @returns {boolean} true if validation succeeds
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    referencesToTemplatesExist: function (lgObj) {
        if(lgObj.LGTemplates && lgObj.LGTemplates.length !== 0) {
            // for each template, enumerate through variations and ensure any template references exist in the collection
            lgObj.LGTemplates.forEach(template => {
                if(template.variations && template.variations.length !== 0) {
                    validateVariation(template.variations, lgObj, template.name);
                }
                if(template.conditionalResponses && template.conditionalResponses.length !== 0) {
                    template.conditionalResponses.forEach(condition => {
                        if(condition.variations && condition.variations.length !== 0) {
                            validateVariation(condition.variations, lgObj, template.name);
                        }
                    });
                }
            });
        }
        return VALIDATION_PASS;
    },
    /**
     * Validator template
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    conditionTokenizesCorrectly: function (item) {
        let tokenizedItem = helpers.tokenizeCondition(item);
        if(tokenizedItem.length === 0) {
            throw new Exception(errCodes.INVALID_CONDITION_DEFINITION, `Invalid condition definition for "${item}"`);
        } 
        let braces = 0;
        let curleyBraces = 0;
        tokenizedItem.forEach(function(token, idx) {
            // call back function must be in known list.
            if(token.type === 'callBackFunction') {
                if(!reservedNames.includes(token.content)) {
                    throw new Exception(errCodes.INVALID_CALLBACK_FUNTION_NAME, `Unknown callback function "${token.content}" in condition "${item}"`);
                }
            }
            if(token.type === 'entity') {
                if(reservedNames.includes(token.content)) {
                    throw new Exception(errCodes.INVALID_ENTITY_DEFINITION, `Entity "${token.content}" in condition "${item}" is also a call back function name. Entities cannot have same names as call back function.`);
                }
            }
            if(token.type.name && token.type.name === 'OPENPARAN') braces++;
            if(token.type.name && token.type.name === 'CLOSEPARAN') braces--;
            if(token.type.name && token.type.name === 'OPENPARANCURLEY') curleyBraces++;
            if(token.type.name && token.type.name === 'CLOSEPARANCURLEY') curleyBraces--;
        });
        if(braces !== 0) {
            throw new Exception(errCodes.INVALID_CONDITION_DEFINITION, `Invalid condition. Check if you have correct open and close braces - () in condition "${item}"`);
        }
        if(curleyBraces !== 0) {
            throw new Exception(errCodes.INVALID_CONDITION_DEFINITION, `Invalid condition. Check if you have correct open and close curley braces - {} in condition "${item}"`);
        }
        return VALIDATION_PASS;
    },
    /**
     * Validator template
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    allowedCharatersInName: function (item) {
        const EAorNumberRegExp = new RegExp(/[(a-z|A-Z|0-9|\-|_|:)]/g);
        let test = item.match(EAorNumberRegExp);
        if(test.length !== item.length) 
            throw new Exception(errCodes.INVALID_TEMPLATE_NAME, `Disallowed characters found in template name. Template names can only have characters from English alphabet, numbers, dash, underscore, colon`);
        return VALIDATION_PASS;
    },
    /**
     * Validator template
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    templateHasEitherVariationOrCondition: function (lgObj) {
        if(lgObj.LGTemplates && lgObj.LGTemplates.length !== 0) {
            lgObj.LGTemplates.forEach(template => {
                if(template.variations.length === 0 && template.conditionalResponses.length === 0) {
                    throw new Exception(errCodes.INVALID_TEMPLATE, `Template "${template.name}" does not have variations or conditions!`);
                }
            });
        }
        return VALIDATION_PASS;
    },
    /**
     * Validator template
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    conditionsHaveVariations: function (lgObj) {
        return VALIDATION_PASS;
    },
    /**
     * Validator template
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {Exception} Throws on errors. Exception object includes errCode and text. 
     */
    insertValidatorName: function (item) {
        return VALIDATION_PASS;
    }

};


const validateVariation = function(variations, lgObject, templateName) {
    if (!variations || !lgObject || !Array.isArray(variations)) return;
    variations.forEach(variation => {
        let templatesInVariation = helpers.getTemplatesInVariation(variation);
        if(templatesInVariation && templatesInVariation.length !== 0) {
            templatesInVariation.forEach(template => {
                template = template.replace('[', '').replace(']', '');
                if(template === templateName) throw new Exception(errCodes.INVALID_SELF_TEMPLATE_REFERENCE, `Invalid self template reference in varaiation "${variation}" for template name "${templateName}"`);
                if(lgObject.LGTemplates.filter(item => item.name == template).length === 0) throw new Exception(errCodes.MISSING_TEMPLATE_REFERENCE, `Template "${template}" in variation "${variation}" is not defined.`);
            })
        }
    });
}