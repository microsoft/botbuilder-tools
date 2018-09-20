/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */


class EndpointUpdate {
    
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
EndpointUpdate.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(EndpointUpdate.fromJSON);
    }
    
    const {name /* string */,description /* string */} = src;
    return new EndpointUpdate({name /* string */,description /* string */});
};

module.exports = EndpointUpdate;
