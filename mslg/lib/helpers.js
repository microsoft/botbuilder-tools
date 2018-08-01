/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const helpers = {
    parseEntity : function(item) {
        /*
         * interesting content can be
         * VALID: {entityName}, {callBackFunctionName()}
         * INVALID: {callBackFunctionName}, callBackFunctionName(), {entityName()}
        */
        let parsedEntities = {
            'entities': [],
            'callBacks': []
        };
        const entitiesRegExp = new RegExp(/(\{)(.*?)(\})/g);
        const callBackFunctionRegExp = new RegExp(/.*\((.*?)\)/g);
        let entitiesInItem = item.match(entitiesRegExp);
        if(!entitiesInItem || entitiesInItem.length === 0) return parsedEntities;
        entitiesInItem.forEach(entity => { 
            entity = entity.replace('{','').replace('}','');
            let callBackFunctions = entity.match(callBackFunctionRegExp);
            if(!callBackFunctions || callBackFunctions.length === 0) {
                parsedEntities.entities.push(entity);
            } else {
                let cbF = callBackFunctions[0].trim().replace('{', '');
                let functionName = cbF.substring(0, cbF.indexOf('('));
                let args = cbF.substring(cbF.indexOf('(') + 1, cbF.indexOf(')')).split(',');
                parsedEntities.callBacks.push({'functionName': functionName, 'args': args.map(item => item.trim())});
            }
        });
        return parsedEntities;
    },
    parseCondition : function(item) {
        const callBackFunctionRegExp = new RegExp(/.*\((.*?)\)/g);
        let callBackFunctions = entity.match(callBackFunctionRegExp);
        if(callBackFunctions.length === 0) {}
    },
    getTemplatesInVariation: function(item) {
        return item.match(new RegExp(/\[(.*?)\]/g));
    }
};

module.exports = helpers;
