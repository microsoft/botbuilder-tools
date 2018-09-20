/**
  * Copyright (c) Microsoft Corporation. All rights reserved.
  * Licensed under the MIT License.
  */
const {ServiceBase} = require('./serviceBase');
class Locales extends ServiceBase {
    constructor() {
        super('/api/languagegeneration/v2.0-beta2/Endpoints/locales');
    }

    /**
    * Gets a list of supported locales for language generation endpoint creations.
    */
    getSupportedLocalesForEndpoints(params) {
        return this.createRequest('', params, 'GET');
    }
    /**
    * Gets a list of supported locales for language generation model creations.
    */
    getSupportedLocalesForModels(params) {
        return this.createRequest('', params, 'GET');
    }
}
module.exports = Locales;
