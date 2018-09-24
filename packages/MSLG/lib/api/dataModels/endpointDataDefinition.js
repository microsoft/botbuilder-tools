/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */


class EndpointDataDefinition {
    
    /**
    * @property {string} startDate
    */

    /**
    * @property {string} endDate
    */

    
    constructor({startDate /* string */,endDate /* string */} = {}) {
        Object.assign(this, {startDate /* string */,endDate /* string */});
    }
}
EndpointDataDefinition.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(EndpointDataDefinition.fromJSON);
    }
    
    const {startDate /* string */,endDate /* string */} = src;
    return new EndpointDataDefinition({startDate /* string */,endDate /* string */});
};

module.exports = EndpointDataDefinition;
