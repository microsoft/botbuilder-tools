import * as msRest from "ms-rest-js";
export declare class LuisAuthoringContext extends msRest.ServiceClient {
    endpoint: string;
    credentials: msRest.ServiceClientCredentials;
    /**
     * @class
     * Initializes a new instance of the LuisAuthoringContext class.
     * @constructor
     *
     * @param {string} endpoint - Supported Cognitive Services endpoints (protocol and hostname, for example: https://westus.api.cognitive.microsoft.com).
     *
     * @param {msRest.ServiceClientCredentials} credentials - Subscription credentials which uniquely identify client subscription.
     *
     * @param {object} [options] - The parameter options
     *
     * @param {Array} [options.filters] - Filters to be added to the request pipeline
     *
     * @param {object} [options.requestOptions] - The request options. Detailed info can be found at
     * {@link https://github.github.io/fetch/#Request Options doc}
     *
     * @param {boolean} [options.noRetryPolicy] - If set to true, turn off default retry policy
     *
     */
    constructor(endpoint: string, credentials: msRest.ServiceClientCredentials, options?: msRest.ServiceClientOptions);
}
