/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */


class TestUpdate {
    
    /**
    * @property {string} name
    */

    /**
    * @property {string} description
    */

    
    constructor({name /* string */,description /* string */} = {}) {
        Object.assign(this, {name /* string */,description /* string */});
    }
}
TestUpdate.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(TestUpdate.fromJSON);
    }
    
    const {name /* string */,description /* string */} = src;
    return new TestUpdate({name /* string */,description /* string */});
};

module.exports = TestUpdate;
