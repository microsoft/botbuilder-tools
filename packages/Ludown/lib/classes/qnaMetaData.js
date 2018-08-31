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
}

module.exports = qnaMetaData;