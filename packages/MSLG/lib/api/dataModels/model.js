/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */

const Dataset = require('./Dataset');

class Model {
    
    /**
    * @property {string} id
    */

    /**
    * @property {Model} baseModel
    */

    /**
    * @property {Dataset[]} datasets
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

    /**
    * @property {string} createdDateTime
    */

    /**
    * @property {string} lastActionDateTime
    */

    /**
    * @property {string} status
    */

    
    constructor({id /* string */,baseModel /* Model */,datasets /* Dataset[] */,modelKind /* string */,name /* string */,description /* string */,properties /* object */,locale /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */} = {}) {
        Object.assign(this, {id /* string */,baseModel /* Model */,datasets /* Dataset[] */,modelKind /* string */,name /* string */,description /* string */,properties /* object */,locale /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */});
    }
}
Model.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(Model.fromJSON);
    }
    
    src.baseModel = Model.fromJSON(src.baseModel) || undefined;

    src.datasets = Dataset.fromJSON(src.datasets) || undefined;

    const {id /* string */,baseModel /* Model */,datasets /* Dataset[] */,modelKind /* string */,name /* string */,description /* string */,properties /* object */,locale /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */} = src;
    return new Model({id /* string */,baseModel /* Model */,datasets /* Dataset[] */,modelKind /* string */,name /* string */,description /* string */,properties /* object */,locale /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */});
};

module.exports = Model;
