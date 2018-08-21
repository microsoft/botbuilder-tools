import { WebResource, ApiKeyCredentials } from "ms-rest-js";
/**
 * Authenticates to a service using an API key.
 */
export declare class ApimCredentials extends ApiKeyCredentials {
    /**
     * @constructor
     */
    constructor(subscriptionKey: string);
    /**
     * Signs a request with the values provided in the inHeader and inQuery parameter.
     *
     * @param {WebResource} The WebResource to be signed.
     * @returns {Promise<WebResource>} - The signed request object.
     */
    signRequest(webResource: WebResource): Promise<WebResource>;
}
