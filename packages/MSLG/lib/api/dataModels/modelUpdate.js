/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */


class ModelUpdate {
    
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
ModelUpdate.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(ModelUpdate.fromJSON);
    }
    
    const {name /* string */,description /* string */} = src;
    return new ModelUpdate({name /* string */,description /* string */});
};

module.exports = ModelUpdate;
