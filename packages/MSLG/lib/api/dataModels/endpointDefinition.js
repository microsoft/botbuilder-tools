/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */

const ModelIdentity = require('./ModelIdentity');

class EndpointDefinition {
    
    /**
    * @property {ModelIdentity[]} models
    */

    /**
    * @property {integer} concurrentRecognitions
    */

    /**
    * @property {boolean} contentLoggingEnabled
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

    
    constructor({models /* ModelIdentity[] */,concurrentRecognitions /* integer */,contentLoggingEnabled /* boolean */,name /* string */,description /* string */,properties /* object */,locale /* string */} = {concurrentRecognitions: 1}) {
        Object.assign(this, {models /* ModelIdentity[] */,concurrentRecognitions /* integer */,contentLoggingEnabled /* boolean */,name /* string */,description /* string */,properties /* object */,locale /* string */});
    }
}
EndpointDefinition.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(EndpointDefinition.fromJSON);
    }
    
    src.models = ModelIdentity.fromJSON(src.models) || undefined;

    const {models /* ModelIdentity[] */,concurrentRecognitions = 1/* integer */,contentLoggingEnabled /* boolean */,name /* string */,description /* string */,properties /* object */,locale /* string */} = src;
    return new EndpointDefinition({models /* ModelIdentity[] */,concurrentRecognitions /* integer */,contentLoggingEnabled /* boolean */,name /* string */,description /* string */,properties /* object */,locale /* string */});
};

module.exports = EndpointDefinition;
