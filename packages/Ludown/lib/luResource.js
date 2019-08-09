const LUIntent = require('./luIntent');

class LUResource {
    /**
     * 
     * @param {LUIntent[]} intents 
     * @param {any[]} entities 
     * @param {any[]} imports
     * @param {any[]} qnas
     * @param {any[]} errors
     */
    constructor(intents, entities, imports, qnas, errors) {
      this.Intents = intents;
      this.Entities = entities;
      this.Imports = imports;
      this.Qnas = qnas;
      this.Errors = errors;
    }
}

module.exports = LUResource;