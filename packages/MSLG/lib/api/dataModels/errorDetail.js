/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */


class ErrorDetail {
    
    /**
    * @property {string} code
    */

    /**
    * @property {string} message
    */

    /**
    * @property {string} target
    */

    
    constructor({code /* string */,message /* string */,target /* string */} = {}) {
        Object.assign(this, {code /* string */,message /* string */,target /* string */});
    }
}
ErrorDetail.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(ErrorDetail.fromJSON);
    }
    
    const {code /* string */,message /* string */,target /* string */} = src;
    return new ErrorDetail({code /* string */,message /* string */,target /* string */});
};

module.exports = ErrorDetail;
