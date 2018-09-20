/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */
const {ServiceBase} = require('./serviceBase');
class Models extends ServiceBase {
    constructor() {
        super('/api/languagegeneration/v2.0-beta2/Models');
    }

    /**
    * Creates a new language generation model.
    */
    createModel(params , modelDefinition/* ModelDefinition */) {
        return this.createRequest('', params, 'POST', modelDefinition);
    }
    /**
    * Gets all language generation model of a subscription.
    */
    getModels(params) {
        return this.createRequest('', params, 'GET');
    }
    /**
    * Updates the mutable details of the language generation model identified by its id.
    */
    updateModel(params , modelUpdate/* ModelUpdate */) {
        return this.createRequest('/{id}', params, 'PATCH', modelUpdate);
    }
    /**
    * Deletes the language generation model with the given id.
    */
    deleteModel(params) {
        return this.createRequest('/{id}', params, 'DELETE');
    }
    /**
    * Gets the specified language generation model.
    */
    getModel(params) {
        return this.createRequest('/{id}', params, 'GET');
    }
}
module.exports = Models;
