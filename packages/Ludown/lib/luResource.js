const LUIntent = require('./luIntent');

class LUResource {
    /**
     * 
     * @param {LUIntent[]} intents 
     * @param {any[]} entities 
     * @param {any[]} imports
     * @param {string} id 
     */
    constructor(intents, entities, imports, id = '') {
      this.Intents = intents;
      this.Entities = entities;
      this.Imports = imports;
      this.Id = id;
    }
}

module.exports = LUResource;