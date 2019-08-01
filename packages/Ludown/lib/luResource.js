const LUIntent = require('./luIntent');

class LUResource {
    /**
     * 
     * @param {LUIntent[]} intents 
     * @param {any[]} entities 
     * @param {any[]} imports
     * @param {any[]} qnas
     * @param {string} id 
     */
    constructor(intents, entities, imports, qnas, id = '') {
      this.Intents = intents;
      this.Entities = entities;
      this.Imports = imports;
      this.Qnas = qnas;
      this.Id = id;
    }
}

module.exports = LUResource;