/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */


class MoveToSubscriptionDefinition {
    
    /**
    * @property {string} targetSubscriptionKey
    */

    
    constructor({targetSubscriptionKey /* string */} = {}) {
        Object.assign(this, {targetSubscriptionKey /* string */});
    }
}
MoveToSubscriptionDefinition.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(MoveToSubscriptionDefinition.fromJSON);
    }
    
    const {targetSubscriptionKey /* string */} = src;
    return new MoveToSubscriptionDefinition({targetSubscriptionKey /* string */});
};

module.exports = MoveToSubscriptionDefinition;
