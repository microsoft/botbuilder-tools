/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */


class DatasetIdentity {
    
    /**
    * @property {string} id
    */

    
    constructor({id /* string */} = {}) {
        Object.assign(this, {id /* string */});
    }
}
DatasetIdentity.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(DatasetIdentity.fromJSON);
    }
    
    const {id /* string */} = src;
    return new DatasetIdentity({id /* string */});
};

module.exports = DatasetIdentity;
