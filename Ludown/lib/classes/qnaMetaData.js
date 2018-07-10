/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class qnaMetaData {
    /** 
     * @property {string} name
     */
    /**
     * @property {string} value
     */
    constructor(name, value) {
        this.name = name?name:'';
        this.value = value?value:'';
    }
};

qnaMetaData.fromJSON = function(source) {
    if (!source) {
        return null;
    }
    if (Array.isArray(source)) {
        return source.map(qnaMetaData.fromJSON);
    }
    
    const {name /* string */,value /* string */} = source;
    return new qnaMetaData({name /* string */,value /* string */});
}
module.exports = qnaMetaData;