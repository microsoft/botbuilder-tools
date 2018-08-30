/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
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

module.exports = LUIS;