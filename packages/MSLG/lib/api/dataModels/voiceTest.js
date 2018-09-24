/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */

const Model = require('./Model');
class VoiceTest {
    
    /**
    * @property {string} id
    */

    /**
    * @property {string} audioUri
    */

    /**
    * @property {string} textUri
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
    * @property {Model} model
    */

    /**
    * @property {string} voiceTestKind
    */

    
    constructor({id /* string */,audioUri /* string */,textUri /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,model /* Model */,voiceTestKind /* string */} = {}) {
        Object.assign(this, {id /* string */,audioUri /* string */,textUri /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,model /* Model */,voiceTestKind /* string */});
    }
}
VoiceTest.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(VoiceTest.fromJSON);
    }
    
    src.model = Model.fromJSON(src.model) || undefined;

    const {id /* string */,audioUri /* string */,textUri /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,model /* Model */,voiceTestKind /* string */} = src;
    return new VoiceTest({id /* string */,audioUri /* string */,textUri /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,model /* Model */,voiceTestKind /* string */});
};

module.exports = VoiceTest;
