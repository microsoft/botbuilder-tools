/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */


class EndpointData {
    
    /**
    * @property {string} id
    */

    /**
    * @property {string} dataUrl
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
    * @property {string} startDate
    */

    /**
    * @property {string} endDate
    */

    
    constructor({id /* string */,dataUrl /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,startDate /* string */,endDate /* string */} = {}) {
        Object.assign(this, {id /* string */,dataUrl /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,startDate /* string */,endDate /* string */});
    }
}
EndpointData.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(EndpointData.fromJSON);
    }
    
    const {id /* string */,dataUrl /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,startDate /* string */,endDate /* string */} = src;
    return new EndpointData({id /* string */,dataUrl /* string */,createdDateTime /* string */,lastActionDateTime /* string */,status /* string */,startDate /* string */,endDate /* string */});
};

module.exports = EndpointData;
