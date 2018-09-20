/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class LGParsedObj {
    /**
     * @property {LGObject} LGObject
     */
    /**
     * @property {string []} additionalFilesToParse
     */
    constructor(LGObject, additionalFilesToParse = []) {
        this.LGObject = LGObject;
        this.additionalFilesToParse = additionalFilesToParse?additionalFilesToParse:[];
    }
};

module.exports = LGParsedObj;