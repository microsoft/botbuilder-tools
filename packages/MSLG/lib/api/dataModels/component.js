/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */


class Component {
    
    /**
    * @property {string} name
    */

    /**
    * @property {string} type
    */

    /**
    * @property {string} status
    */

    /**
    * @property {string} message
    */

    
    constructor({name /* string */,type /* string */,status /* string */,message /* string */} = {}) {
        Object.assign(this, {name /* string */,type /* string */,status /* string */,message /* string */});
    }
}
Component.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(Component.fromJSON);
    }
    
    const {name /* string */,type /* string */,status /* string */,message /* string */} = src;
    return new Component({name /* string */,type /* string */,status /* string */,message /* string */});
};

module.exports = Component;
