/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const exception = class {
    /**
     * 
     * @param {string} errCode 
     * @param {string} text 
     */
    constructor(errCode, text) {
        if(errCode === Object(errCode)) {
            this.text = errCode.text?errCode.text:'';
            this.errCode = errCode.errCode?errCode.errCode:99;
        } else {
            this.text = text?text:'';
            this.errCode = errCode?errCode:99;
        }
    }
};

module.exports = exception;