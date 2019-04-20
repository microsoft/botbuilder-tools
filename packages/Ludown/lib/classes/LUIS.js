/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const LUISObjNameEnum = require('../enums/luisobjenum');
class LUIS {
    constructor() {
        this.intents = [];
        this.entities = [];
        this.composites = [];
        this.closedLists = []; 
        this.regex_entities = [];
        this.model_features = [];
        this.regex_features = [];
        this.utterances = [];
        this.patterns = [];
        this.patternAnyEntities = [];
        this.prebuiltEntities = [];
    }
}

/**
 * Helper function to see if we have any luis content in the blob
 * @param {object} blob Contents of parsed luis blob
 * @returns {boolean} true if there is any luis content in the blob
 */
LUIS.haveLUISContent = function(blob) {
    if(!blob) return false;
    return ((blob[LUISObjNameEnum.INTENT].length > 0) ||
    (blob[LUISObjNameEnum.ENTITIES].length > 0) || 
    (blob[LUISObjNameEnum.CLOSEDLISTS].length > 0) ||
    (blob[LUISObjNameEnum.PATTERNANYENTITY].length > 0) ||
    (blob.patterns.length > 0) ||
    (blob[LUISObjNameEnum.UTTERANCE].length > 0) ||
    (blob.prebuiltEntities.length > 0) ||
    (blob[LUISObjNameEnum.REGEX].length > 0) ||
    (blob.model_features.length > 0) ||
    (blob.composites.length > 0));
};

module.exports = LUIS;