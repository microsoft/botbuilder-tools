/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */

const ModelIdentity = require('./ModelIdentity');
class VoiceTestDefinition {
    
    /**
    * @property {string} text
    */

    /**
    * @property {ModelIdentity} model
    */

    /**
    * @property {string} voiceTestKind
    */

    
    constructor({text /* string */,model /* ModelIdentity */,voiceTestKind /* string */} = {}) {
        Object.assign(this, {text /* string */,model /* ModelIdentity */,voiceTestKind /* string */});
    }
}
VoiceTestDefinition.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(VoiceTestDefinition.fromJSON);
    }
    
    src.model = ModelIdentity.fromJSON(src.model) || undefined;

    const {text /* string */,model /* ModelIdentity */,voiceTestKind /* string */} = src;
    return new VoiceTestDefinition({text /* string */,model /* ModelIdentity */,voiceTestKind /* string */});
};

module.exports = VoiceTestDefinition;
