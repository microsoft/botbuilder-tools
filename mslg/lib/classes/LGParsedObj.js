/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const LUIS = require('ludown').helperClasses.LUIS;
const LGParsedObj = class {
    /**
     * @property {LGObject} LGObject
     */
    /**
     * @property {string []} additionalFilesToParse
     */
    constructor(LGObject, additionalFilesToParse) {
        this.LGObject = LGObject?LGObject:undefined;
        this.additionalFilesToParse = additionalFilesToParse?additionalFilesToParse:[];
    }
};

module.exports = LGParsedObj;