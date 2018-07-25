const exception = require('ludown').helperClasses.Exception;
const errCodes = require('../lib/enums/errorCodes');
const VALIDATION_PASS = true;
const reservedNames = require('../lib/enums/reservedNames');
module.exports = {
    /**
     * All Validators
     */
    /**
     * Validator
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    isNotNullOrEmpty: function (item) {
        if(item === null || item === undefined || item.trim() == '') throw(new exception(errCodes.INVALID_VARIATION, 'Variation "' + item + '" cannot be null or empty'));
        return VALIDATION_PASS;
    },
    /**
     * Validator
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    noReferencesToReservedKeywords: function (item) {
        // get entity references in item
        let entitiesRegExp = new RegExp(/\{(.*?)\}/g);
        let entitiesFound = item.match(entitiesRegExp);
        if(!entitiesFound || entitiesFound.length === 0) return VALIDATION_PASS;
        entitiesFound.forEach(entity => {
            reservedNames.forEach(reservedItem => {
                if(entity.includes(reservedItem)) throw (new exception(errCodes.ENTITY_WITH_RESERVED_KEYWORD, 'Entity "' + entity + '" in variation "' + item + '" has reference to a reserved keyword'));
            });
        });
        return VALIDATION_PASS;
    },
    /**
     * Validator
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    noNestedTemplateRefernce: function (item) {
        // get template references in item
        let templatesRegExp = new RegExp(/\[(.*?)\]/g);
        let templatesFound = item.match(templatesRegExp);
        if(!templatesFound || templatesFound.length === 0) return VALIDATION_PASS;
        templatesFound.forEach(template => {
            template = template.replace('[').replace(']');
            if(template.includes('[') || template.includes(']')) throw (new exception(errCodes.NESTED_TEMPLATE_REFERENCE, 'Template "' + template + '" in variation "' + item + '" has nested template references.'));
        })
        return VALIDATION_PASS;
    },
    /**
     * Validator
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    noNestedEntityReferences: function (item) {
        // get entity references in item
        let entitiesRegExp = new RegExp(/\{(.*?)\}/g);
        let entitiesFound = item.match(entitiesRegExp);
        if(!entitiesFound || entitiesFound.length === 0) return VALIDATION_PASS;
        entitiesFound.forEach(entity => {
            entity = entity.replace('{').replace('}');
            if(entity.includes('{') || entity.includes('}')) throw (new exception(errCodes.NESTED_TEMPLATE_REFERENCE, 'Entity "' + entity + '" in variation "' + item + '" has nested entity references.'));
        })
        return VALIDATION_PASS;
    },
    /**
     * Validator template
     * 
     * @param {string} item input string
     * @returns {boolean} true if validation succeeds
     * @throws {exception} Throws on errors. exception object includes errCode and text. 
     */
    insertValidatorName: function (item) {
        return VALIDATION_PASS;
    }

};