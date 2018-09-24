/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */

const Model = require('./Model');

class Transcription {
    
    /**
    * @property {Model[]} models
    */

    /**
    * @property {string} id
    */

    /**
    * @property {string} recordingsUrl
    */

    /**
    * @property {string} locale
    */

    /**
    * @property {object} resultsUrls
    */

    /**
    * @property {string} statusMessage
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
    * @property {string} name
    */

    /**
    * @property {string} description
    */

    /**
    * @property {object} properties
    */

    
    constructor({models /* Model[] */,id /* string */,recordingsUrl /* string */,locale /* string */,resultsUrls /* object */,statusMessage /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,name /* string */,description /* string */,properties /* object */} = {}) {
        Object.assign(this, {models /* Model[] */,id /* string */,recordingsUrl /* string */,locale /* string */,resultsUrls /* object */,statusMessage /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,name /* string */,description /* string */,properties /* object */});
    }
}
Transcription.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(Transcription.fromJSON);
    }
    
    src.models = Model.fromJSON(src.models) || undefined;

    const {models /* Model[] */,id /* string */,recordingsUrl /* string */,locale /* string */,resultsUrls /* object */,statusMessage /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,name /* string */,description /* string */,properties /* object */} = src;
    return new Transcription({models /* Model[] */,id /* string */,recordingsUrl /* string */,locale /* string */,resultsUrls /* object */,statusMessage /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,name /* string */,description /* string */,properties /* object */});
};

module.exports = Transcription;
