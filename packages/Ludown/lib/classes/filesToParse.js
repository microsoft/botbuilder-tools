/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class FileToParse {
    /**
     * @property {string} filePath 
     */
    /**
     * @property {Boolean} includeInCollate
     */
    constructor(filePath, includeInCollate) {
        this.filePath = filePath?filePath:'';
        if(includeInCollate === undefined) this.includeInCollate = true;
        else this.includeInCollate = includeInCollate;
    }
}

FileToParse.stringArrayToFileToParseList = function(obj) {
    if(Array.isArray(obj)) return obj.map(item => new FileToParse(item));
}

module.exports = FileToParse;