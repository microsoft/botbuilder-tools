/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */

 const Component = require('./Component');

class HealthStatusResponse {
    
    /**
    * @property {string} status
    */

    /**
    * @property {string} message
    */

    /**
    * @property {Component[]} components
    */

    
    constructor({status /* string */,message /* string */,components /* Component[] */} = {}) {
        Object.assign(this, {status /* string */,message /* string */,components /* Component[] */});
    }
}
HealthStatusResponse.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(HealthStatusResponse.fromJSON);
    }
    
    src.components = Component.fromJSON(src.components) || undefined;

    const {status /* string */,message /* string */,components /* Component[] */} = src;
    return new HealthStatusResponse({status /* string */,message /* string */,components /* Component[] */});
};

module.exports = HealthStatusResponse;
