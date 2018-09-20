/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */

const Exception = require('../utils/exception');
const mock = require('../utils/mock');
const retCode = require('../enums/errorCodes');
const { insertParametersFromObject } = require('../utils/insertParametersFromObject');
const deriveParamsFromPath = require('../utils/deriveParamsFromPath');

/**
 * Base class for all services
 */
class ServiceBase {

    /**
     * @property {string} relativeEndpoint The endpoint for this service
     */

    /**
     *
     * @param {String} relativeEndpoint the endpoint for this service
     * @param {bool} useEndpoint (default is false) if true, use the admin service url, not the endpoint service url 
     */
    constructor(relativeEndpoint, useEndpoint) {
        this.relativeEndpoint = relativeEndpoint;
        this.useEndpoint = (useEndpoint === true);
    }

    /**
     * Creates a request to the specified endpoint and returns
     * a promise.
     *
     * @param {string} pathFragment An additional fragment to append to the endpoint
     * @param {*} params An object containing the named params to be used to hydrate the tokenized url
     * @param {'get'|'post'|'put'|'PATCH'|'delete'} method The method for the request
     * @param {*} dataModel The data model to pass in as the request body
     * @returns {Promise<Response>} The promise representing the request
     */
    createRequest(pathFragment, params, method, dataModel = null) {
        const { commonHeaders: headers, relativeEndpoint } = this;

        if (this.useEndpoint)
            headers.Authorization = "EndpointKey " + ServiceBase.config.endpointKey || params.endpointKey;
        else
            headers['Ocp-Apim-Subscription-Key'] = ServiceBase.config.authoringKey || params.authoringKey;

        let requestEndpoint;
        if (this.useEndpoint)
            requestEndpoint = "https://develop.cris.ai";
        else 
            requestEndpoint =  ServiceBase.config.endpointBasePath;

 
        const tokenizedUrl = requestEndpoint + relativeEndpoint + pathFragment;
        // Order is important since we want to allow the user to
        // override their config with the data in the params object.
        params = Object.assign({}, (dataModel || {}), params);
        ServiceBase.validateParams(tokenizedUrl, params);

        let URL = insertParametersFromObject(tokenizedUrl, params);

        const body = dataModel ? JSON.stringify(dataModel) : undefined;
        if (params.debug) {
            console.log(`${method.toUpperCase()} ${URL}`);
            if (headers)
                console.log(`HEADERS:${JSON.stringify(headers)}`);
            if (body)
                console.log(body);
        }
        
        if(params.mock)
            mock.runFetchMock(URL, relativeEndpoint + pathFragment, method);
        
        return fetch(URL, { headers, method, body });
    }

    /**
     * Headers that are common to all requests
     *
     * @returns {{'Content-Type': string, 'Ocp-Apim-Subscription-Key': string, 'Authorization':string }}
     */
    get commonHeaders() {
        return {
            'Content-Type': 'application/json',
        };
    }
}

/**
 * Validates the params object and will throw if
 * a required param is missing.
 *
 * @param tokenizedUrl
 * @param params
 */
ServiceBase.validateParams = function (tokenizedUrl, params) {
    const paramsFromPath = deriveParamsFromPath(tokenizedUrl);

    paramsFromPath.forEach(param => {
        if (!(param in params)) {
            throw new Exception(retCode.INVALID_INPUT, `The required param "${param}" is missing.`);
        }
    });
};
/**
 * @type {*} The configuration object containing
 * the endpoint, appId, versionId and authoringKey properties.
 */
ServiceBase.config = { lgAppId: '', authoringKey: '', endpointKey: '', endpointBasePath: '' };

module.exports = { ServiceBase };