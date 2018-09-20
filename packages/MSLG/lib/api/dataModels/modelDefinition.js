/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */

const ModelIdentity = require('./ModelIdentity');
const DatasetIdentity = require('./DatasetIdentity');

class ModelDefinition {
    
    /**
    * @property {string} text
    */

    /**
    * @property {ModelIdentity} baseModel
    */

    /**
    * @property {DatasetIdentity[]} datasets
    */

    /**
    * @property {string} modelKind
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

    
    constructor({text /* string */,baseModel /* ModelIdentity */,datasets /* DatasetIdentity[] */,modelKind /* string */,name /* string */,description /* string */,properties /* object */,locale /* string */} = {}) {
        Object.assign(this, {text /* string */,baseModel /* ModelIdentity */,datasets /* DatasetIdentity[] */,modelKind /* string */,name /* string */,description /* string */,properties /* object */,locale /* string */});
    }
}
ModelDefinition.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(ModelDefinition.fromJSON);
    }
    
    src.baseModel = ModelIdentity.fromJSON(src.baseModel) || undefined;

    src.datasets = DatasetIdentity.fromJSON(src.datasets) || undefined;

    const {text /* string */,baseModel /* ModelIdentity */,datasets /* DatasetIdentity[] */,modelKind /* string */,name /* string */,description /* string */,properties /* object */,locale /* string */} = src;
    return new ModelDefinition({text /* string */,baseModel /* ModelIdentity */,datasets /* DatasetIdentity[] */,modelKind /* string */,name /* string */,description /* string */,properties /* object */,locale /* string */});
};

module.exports = ModelDefinition;
