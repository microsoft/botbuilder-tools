/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */


class ModelIdentity {
    
    /**
    * @property {string} id
    */

    
    constructor({id /* string */} = {}) {
        Object.assign(this, {id /* string */});
    }
}
ModelIdentity.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(ModelIdentity.fromJSON);
    }
    
    const {id /* string */} = src;
    return new ModelIdentity({id /* string */});
};

module.exports = ModelIdentity;
