/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */

const Dataset = require('./Dataset');
const Model = require('./Model');

class Test {
    
    /**
    * @property {Dataset} dataset
    */

    /**
    * @property {string} id
    */

    /**
    * @property {number} wordErrorRate
    */

    /**
    * @property {string} resultsUrl
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

    /**
    * @property {Model[]} models
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

    
    constructor({dataset /* Dataset */,id /* string */,wordErrorRate /* number */,resultsUrl /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,models /* Model[] */,name /* string */,description /* string */,properties /* object */} = {}) {
        Object.assign(this, {dataset /* Dataset */,id /* string */,wordErrorRate /* number */,resultsUrl /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,models /* Model[] */,name /* string */,description /* string */,properties /* object */});
    }
}
Test.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(Test.fromJSON);
    }
    
    src.dataset = Dataset.fromJSON(src.dataset) || undefined;

    src.models = Model.fromJSON(src.models) || undefined;

    const {dataset /* Dataset */,id /* string */,wordErrorRate /* number */,resultsUrl /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,models /* Model[] */,name /* string */,description /* string */,properties /* object */} = src;
    return new Test({dataset /* Dataset */,id /* string */,wordErrorRate /* number */,resultsUrl /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,models /* Model[] */,name /* string */,description /* string */,properties /* object */});
};

module.exports = Test;
