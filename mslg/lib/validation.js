/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const validationHelpers = require('./validationHelpers');
const VALIDATION_PASS = true;
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
        validationHelpers.isNotNullOrEmpty,                 /* variation cannot be null or empty */
        validationHelpers.noReferencesToReservedKeywords,   /* variation cannot have references to reserved keywords/ prebuilt macro functions */
        validationHelpers.noNestedTemplateRefernce,         /* variations cannot have nested template references */
        validationHelpers.noNestedEntityReferences          /* variations cannot have nested entity references */
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
    },
    /**
     * List of validators for template name. Each item is a call back validation function name defined in the validators object.
     * 
     */
    TemplateNameValidatorsList: [
        ''
    ],
    /**
     * validation helper function to ensure a condition passes all validation rules
     * 
     * @param {string} item variation text field
     * @returns {boolean} true if validation succeeds
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    validateCondition: function (item) {
        // For each function in the conditionValidatorsList, ensure the validation succeeds without throwing and returns true
    },
    /**
     * List of validators for conditions. Each item is a call back validation function name defined in the validators object.
     * 
     */
    conditionValidatorsList: [
        ''
    ],
    
};

module.exports = validators;



