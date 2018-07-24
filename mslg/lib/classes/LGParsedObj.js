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
     * @property {LUIS} LUISObj
     */
    /**
     * @property {string []} additionalFilesToParse
     */
    constructor(LGObject, LUISObj, additionalFilesToParse) {
        this.LGObject = LGObject?LGObject:undefined;
        this.LUISObj = LUISObj?LUISObj:new LUIS();
        this.additionalFilesToParse = additionalFilesToParse?additionalFilesToParse:[];
    }
};

LGParsedObj.mapToLUIS = function () {

};
module.exports = LGParsedObj;