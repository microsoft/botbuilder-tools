/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */

 const Model = require('./Model');

class Endpoint {
    
    /**
    * @property {string} id
    */

    /**
    * @property {string} endpointKind
    */

    /**
    * @property {object} endpointUrls
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

    
    constructor({id /* string */,endpointKind /* string */,endpointUrls /* object */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,models /* Model[] */,concurrentRecognitions /* integer */,contentLoggingEnabled /* boolean */,name /* string */,description /* string */,properties /* object */,locale /* string */} = {}) {
        Object.assign(this, {id /* string */,endpointKind /* string */,endpointUrls /* object */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,models /* Model[] */,concurrentRecognitions /* integer */,contentLoggingEnabled /* boolean */,name /* string */,description /* string */,properties /* object */,locale /* string */});
    }
}
Endpoint.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(Endpoint.fromJSON);
    }
    
    src.models = Model.fromJSON(src.models) || undefined;

    const {id /* string */,endpointKind /* string */,endpointUrls /* object */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,models /* Model[] */,concurrentRecognitions /* integer */,contentLoggingEnabled /* boolean */,name /* string */,description /* string */,properties /* object */,locale /* string */} = src;
    return new Endpoint({id /* string */,endpointKind /* string */,endpointUrls /* object */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,models /* Model[] */,concurrentRecognitions /* integer */,contentLoggingEnabled /* boolean */,name /* string */,description /* string */,properties /* object */,locale /* string */});
};

module.exports = Endpoint;
