/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */


class DatasetDefinition {
    
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

    
    constructor({dataImportKind /* string */,name /* string */,description /* string */,properties /* object */,locale /* string */} = {}) {
        Object.assign(this, {dataImportKind /* string */,name /* string */,description /* string */,properties /* object */,locale /* string */});
    }
}
DatasetDefinition.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(DatasetDefinition.fromJSON);
    }
    
    const {dataImportKind /* string */,name /* string */,description /* string */,properties /* object */,locale /* string */} = src;
    return new DatasetDefinition({dataImportKind /* string */,name /* string */,description /* string */,properties /* object */,locale /* string */});
};

module.exports = DatasetDefinition;
