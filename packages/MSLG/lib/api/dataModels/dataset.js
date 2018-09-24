/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */


class Dataset {
    
    /**
    * @property {string} id
    */

    /**
    * @property {string} dataImportKind
    */

    /**
    * @property {string} name
    */

    /**
    * @property {string} description
    */

    /**
    * @property {object} properties
    */

    /**
    * @property {string} locale
    */

    /**
    * @property {string} createdDateTime
    */

    /**
    * @property {string} lastActionDateTime
    */

    /**
    * @property {string} status
    */

    
    constructor({id /* string */,dataImportKind /* string */,name /* string */,description /* string */,properties /* object */,locale /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */} = {}) {
        Object.assign(this, {id /* string */,dataImportKind /* string */,name /* string */,description /* string */,properties /* object */,locale /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */});
    }
}
Dataset.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(Dataset.fromJSON);
    }
    
    const {id /* string */,dataImportKind /* string */,name /* string */,description /* string */,properties /* object */,locale /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */} = src;
    return new Dataset({id /* string */,dataImportKind /* string */,name /* string */,description /* string */,properties /* object */,locale /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */});
};

module.exports = Dataset;
