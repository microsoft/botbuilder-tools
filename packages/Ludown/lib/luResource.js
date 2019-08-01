const LUIntent = require('./luIntent');

class LUResource {
    /**
     * 
     * @param {LUIntent[]} intents 
     * @param {any[]} entities 
     * @param {any[]} imports
     * @param {any[]} qnas
     * @param {any[]} errors
     * @param {string} id
     */
    constructor(intents, entities, imports, qnas, errors, id = '') {
      this.Intents = intents;
      this.Entities = entities;
      this.Imports = imports;
      this.Qnas = qnas;
      this.Errors = errors;
      this.Id = id;
    }
}

module.exports = LUResource;