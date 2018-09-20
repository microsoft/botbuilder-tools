/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */

const DatasetIdentity = require('./DatasetIdentity');
const ModelIdentity = require('./ModelIdentity');

class TestDefinition {
    
    /**
    * @property {DatasetIdentity} dataset
    */

    /**
    * @property {ModelIdentity[]} models
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

    
    constructor({dataset /* DatasetIdentity */,models /* ModelIdentity[] */,name /* string */,description /* string */,properties /* object */} = {}) {
        Object.assign(this, {dataset /* DatasetIdentity */,models /* ModelIdentity[] */,name /* string */,description /* string */,properties /* object */});
    }
}
TestDefinition.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(TestDefinition.fromJSON);
    }
    
    src.dataset = DatasetIdentity.fromJSON(src.dataset) || undefined;

    src.models = ModelIdentity.fromJSON(src.models) || undefined;

    const {dataset /* DatasetIdentity */,models /* ModelIdentity[] */,name /* string */,description /* string */,properties /* object */} = src;
    return new TestDefinition({dataset /* DatasetIdentity */,models /* ModelIdentity[] */,name /* string */,description /* string */,properties /* object */});
};

module.exports = TestDefinition;
