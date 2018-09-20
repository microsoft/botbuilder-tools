/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const Exception = require('../utils/exception')
const validation = require('../utils/validation');
const errorCode = require('../enums/errorCodes');

class LGTemplate {
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
        if(variations && conditionalResponses) 
            throw new Exception(errorCode.INVALID_INPUT, 'Cannot instantiate LGTemplate with both variation and conditional response.');
        if(!name && (variations || conditionalResponses)) 
            throw new Exception(errorCode.INVALID_INPUT, 'Cannot instantiate LGTemplate without a name but with variations or conditional responses.');
        if(name)
            validation.validateTemplateName(name);
        this.name = name;
        this.variations = variations?variations:[];
        this.conditionalResponses = conditionalResponses?conditionalResponses:[];
    }
};

module.exports = LGTemplate;