/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const validationHelpers = require('./validationHelpers');
const VALIDATION_PASS = true;
const exception = require('ludown').helperClasses.Exception;
const errCode = require('./enums/errorCodes');
const validators = {
    /**
     * validation helper function to ensure a variation item passed all validation rules
     * 
     * @param {string} item variation text field
     * @returns {boolean} true if validation succeeds
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    validateVariationItem: function(item) {
        // For each function in the variationValidatorsList, ensure the validation succeeds without throwing and returns true
        try {
            validators.variationValidatorsList.forEach(validator => validator(item));
        } catch (err) {
            throw (err);
        }
        return VALIDATION_PASS;
    },
    /**
     * List of validators for variation item. Each item is a call back validation function name defined in the validaton helpers js file.
     * 
     */
    variationValidatorsList: [
        validationHelpers.isNotNullOrEmpty,                         /* variation cannot be null or empty */
        validationHelpers.noReferencesToReservedKeywords,           /* variation cannot have references to reserved keywords/ prebuilt macro functions */
        validationHelpers.noNestedTemplateRefernce,                 /* variations cannot have nested template references */
        validationHelpers.noNestedEntityReferences,                 /* variations cannot have nested entity references */
        validationHelpers.callBackFunctionInRecognizedList,         /* variations cannot have call back function reference that is not a recognized call back function */
        validationHelpers.callBackFunctionsEnclosedInBraces         /* call back functions must be enclosed in {} */
    ],
    /**
     * validation helper function to ensure a template name passes all validation rules
     * 
     * @param {string} item variation text field
     * @returns {boolean} true if validation succeeds
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    validateTemplateName: function (item) {
        // For each function in the TemplateNameValidatorsList, ensure the validation succeeds without throwing and returns true
        try {
            validators.TemplateNameValidatorsList.forEach(validator => validator(item));
        } catch (err) {
            throw (err);
        }
        return VALIDATION_PASS;
    },
    /**
     * List of validators for template name. Each item is a call back validation function name defined in the validators object.
     * 
     */
    TemplateNameValidatorsList: [
        validationHelpers.isNotNullOrEmpty,                         /* template name cannot be null or empty */
        validationHelpers.noSpacesInTemplateNames,                  /* template name cannot have space in them */
        validationHelpers.allowedCharatersInName                    /* template names must be in english alphabet or numbers. can only have -, _, : */
    ],
    /**
     * validation helper function to ensure a condition passes all validation rules
     * 
     * @param {string} item variation text field
     * @returns {boolean} true if validation succeeds
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    validateCondition: function (item, includeNullCheck) {
        // For each function in the conditionValidatorsList, ensure the validation succeeds without throwing and returns true
        try {
            if(includeNullCheck) validators.conditionValidatorsList.forEach(validator => validator(item));
        } catch (err) {
            throw (err);
        }
        // cannot have any condition
        if(!includeNullCheck && item !== 'Else') throw(new exception(errCode.DEFAULT_CONDITION_MUST_BE_EMPTY, 'Default condition in "- DEFAULT:' + item + '" cannot have any expression'))
        return VALIDATION_PASS;
    },
    /**
     * List of validators for conditions. Each item is a call back validation function name defined in the validators object.
     * 
     */
    conditionValidatorsList: [
        validationHelpers.isNotNullOrEmptyCondition,        /* conditions cannot be null or empty */
        validationHelpers.conditionTokenizesCorrectly       /* use a tokenizer to verify that the condition tokenizes correctly */
    ],
    /**
     * validation helper function to ensure a condition passes all validation rules
     * 
     * @param {LGObject} item LGObject
     * @returns {boolean} true if validation succeeds
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    validateTemplate: function (item) {
        // For each function in the conditionValidatorsList, ensure the validation succeeds without throwing and returns true
        try {
            validators.templateValidatorsList.forEach(validator => validator(item));
        } catch (err) {
            throw (err);
        }
        return VALIDATION_PASS;
    },
    /**
     * List of validators for conditions. Each item is a call back validation function name defined in the validators object.
     * 
     */
    templateValidatorsList: [
        validationHelpers.referencesToTemplatesExist,               /* All template references should be valid */
        validationHelpers.templateHasEitherVariationOrCondition,    /* Template needs to have at least a variation or condition */
        validationHelpers.conditionsHaveVariations                  /* Conditional response templates have at least one variation */
    ]
    
};

module.exports = validators;



