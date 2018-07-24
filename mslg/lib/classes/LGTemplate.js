/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const exception = require('ludown').helperClasses.Exception;
const errorCode = require('ludown').helperEnums.errorCodes;
const LGConditionalResponse = require('./LGConditionalResponse');
const LGTemplate = class {
    /**
     * @property {string} name
     */
    /**
     * @property {string []} variations
     */
    /** 
     * @property {LGConditionalResponses []} conditionalResponses
     */
    constructor(name, variations, conditionalResponses) {
        if(variations && conditionalResponses) throw (new exception(errorCode.INVALID_INPUT, 'Cannot instantiate LGTemplate with both variation and conditional response.'));
        this.name = name?name:undefined;
        this.variations = variations?variations:[];
        this.conditionalResponses = conditionalResponses?conditionalResponses:[];
    }
};

module.exports = LGTemplate;