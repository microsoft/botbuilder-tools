/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */


class TranscriptionUpdate {
    
    /**
    * @property {string} name
    */

    /**
    * @property {string} description
    */

    
    constructor({name /* string */,description /* string */} = {}) {
        Object.assign(this, {name /* string */,description /* string */});
    }
}
TranscriptionUpdate.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(TranscriptionUpdate.fromJSON);
    }
    
    const {name /* string */,description /* string */} = src;
    return new TranscriptionUpdate({name /* string */,description /* string */});
};

module.exports = TranscriptionUpdate;
