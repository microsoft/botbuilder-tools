/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */


class InnerError {
    
    /**
    * @property {string} code
    */

    /**
    * @property {InnerError} innererror
    */

    
    constructor({code /* string */,innererror /* InnerError */} = {}) {
        Object.assign(this, {code /* string */,innererror /* InnerError */});
    }
}
InnerError.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(InnerError.fromJSON);
    }
    
    src.innererror = InnerError.fromJSON(src.innererror) || undefined;

    const {code /* string */,innererror /* InnerError */} = src;
    return new InnerError({code /* string */,innererror /* InnerError */});
};

module.exports = InnerError;
