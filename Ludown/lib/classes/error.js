/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const exception = class {
    constructor(errCode, text) {
        this.text = text?text:'';
        this.errCode = errCode?errCode:99;
    }
};

module.exports = exception;