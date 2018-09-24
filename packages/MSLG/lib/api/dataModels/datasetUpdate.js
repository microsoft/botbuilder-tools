/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */


class DatasetUpdate {
    
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
DatasetUpdate.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(DatasetUpdate.fromJSON);
    }
    
    const {name /* string */,description /* string */} = src;
    return new DatasetUpdate({name /* string */,description /* string */});
};

module.exports = DatasetUpdate;
