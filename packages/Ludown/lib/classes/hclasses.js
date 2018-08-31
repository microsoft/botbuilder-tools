/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const readerObj = {
    readerObject : class {
        constructor(sourceFile, model) {
            this.sourceFile = sourceFile?sourceFile:'';
            this.model = model?model:'';
        }
    },
    entity : class {
        constructor(entity, value, start, end) {
            this.entity = entity?entity:'';
            this.value = value?value:'';
            this.start = start?start:-1;
            this.end = end?end:-1;
        }
    },
    intent: class {
        constructor(intent, utterances) {
            this.intent = intent?intent:'';
            this.utterances = utterances?utterances:[]
        }
    }, 
    uttereances: class {
        constructor(text, intent, entities) {
            this.text = text?text:'';
            this.intent = intent?intent:''; 
            this.entities = entities?entities:[];
        }
    },
    rLuisObj: class {
        constructor(intents, patterns) {
            this.intents = intents?intents:[];
            this.patterns = patterns?patterns:[]; 
        }
    }, 
    validateLUISBlobEntity: class {
        constructor(name, type) {
            this.name = name?name:'';
            this.type = type?type:[];
        }
    }, 
    pattern: class {
        constructor(pattern, intent) {
            this.pattern = pattern?pattern:'';
            this.intent = intent?intent:'';
        }
    },
    modelObj: class {
        constructor(name, mode, words, activated) {
            this.name = name?name:'';
            this.words = words?words:'';
            this.mode = mode?mode:false;
            this.activated = activated?activated:false;
        }
    }, 
    subList: class {
        constructor(canonicalForm, list) {
            this.canonicalForm = canonicalForm?canonicalForm:'';
            this.list = list?list:[];
        }
    },
    closedLists: class {
        constructor(name, subLists, roles) {
            this.name = name?name:'';
            this.subLists = subLists?subLists:[];
            this.roles = roles?roles:[];
        }
    }
};

module.exports = readerObj;

