/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */

const ModelIdentity = require('./ModelIdentity');

class TranscriptionDefinition {
    
    /**
    * @property {ModelIdentity[]} models
    */

    /**
    * @property {string} recordingsUrl
    */

    /**
    * @property {string} locale
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

    
    constructor({models /* ModelIdentity[] */,recordingsUrl /* string */,locale /* string */,name /* string */,description /* string */,properties /* object */} = {}) {
        Object.assign(this, {models /* ModelIdentity[] */,recordingsUrl /* string */,locale /* string */,name /* string */,description /* string */,properties /* object */});
    }
}
TranscriptionDefinition.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(TranscriptionDefinition.fromJSON);
    }
    
    src.models = ModelIdentity.fromJSON(src.models) || undefined;

    const {models /* ModelIdentity[] */,recordingsUrl /* string */,locale /* string */,name /* string */,description /* string */,properties /* object */} = src;
    return new TranscriptionDefinition({models /* ModelIdentity[] */,recordingsUrl /* string */,locale /* string */,name /* string */,description /* string */,properties /* object */});
};

module.exports = TranscriptionDefinition;
