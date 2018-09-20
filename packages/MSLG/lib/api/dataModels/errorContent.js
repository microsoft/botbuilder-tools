/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */

const InnerError = require('./InnerError');
const ErrorDetail = require('./ErrorDetail');

class ErrorContent {
    
    /**
    * @property {ErrorDetail[]} details
    */

    /**
    * @property {InnerError} innererror
    */

    /**
    * @property {string} code
    */

    /**
    * @property {string} message
    */

    /**
    * @property {string} target
    */

    
    constructor({details /* ErrorDetail[] */,innererror /* InnerError */,code /* string */,message /* string */,target /* string */} = {}) {
        Object.assign(this, {details /* ErrorDetail[] */,innererror /* InnerError */,code /* string */,message /* string */,target /* string */});
    }
}
ErrorContent.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(ErrorContent.fromJSON);
    }
    
    src.details = ErrorDetail.fromJSON(src.details) || undefined;

    src.innererror = InnerError.fromJSON(src.innererror) || undefined;

    const {details /* ErrorDetail[] */,innererror /* InnerError */,code /* string */,message /* string */,target /* string */} = src;
    return new ErrorContent({details /* ErrorDetail[] */,innererror /* InnerError */,code /* string */,message /* string */,target /* string */});
};

module.exports = ErrorContent;
