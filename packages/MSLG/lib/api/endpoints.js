/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */
const {ServiceBase} = require('./serviceBase');
class Endpoints extends ServiceBase {
    constructor() {
        super('/api/languagegeneration/v2.0-beta2/Endpoints');
    }

    /**
    * Creates a new language generation endpoint.
    */
    createEndpoint(params , endpointDefinition/* EndpointDefinition */) {
        return this.createRequest('', params, 'POST', endpointDefinition);
    }
    /**
    * Gets all language generation endpoint of a subscription.
    */
    getEndpoints(params) {
        return this.createRequest('', params, 'GET');
    }
    /**
    * Updates the mutable details of the language generation endpoint identified by its id.
    */
    updateEndpoint(params , endpointUpdate/* EndpointUpdate */) {
        return this.createRequest('/{id}', params, 'PATCH', endpointUpdate);
    }
    /**
    * Deletes the language generation model endpoint with the given id.
    */
    deleteEndpoint(params) {
        return this.createRequest('/{id}', params, 'DELETE');
    }
    /**
    * Gets the specified deployed language generation endpoint.
    */
    getEndpoint(params) {
        return this.createRequest('/{id}', params, 'GET');
    }
}
module.exports = Endpoints;
