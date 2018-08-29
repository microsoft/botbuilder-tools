import * as msRest from "ms-rest-js";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as operations from "./operations";
import { LuisAuthoringContext } from "./luisAuthoringContext";
declare class LuisAuthoring extends LuisAuthoringContext {
    features: operations.Features;
    examples: operations.Examples;
    model: operations.Model;
    apps: operations.Apps;
    versions: operations.Versions;
    train: operations.Train;
    permissions: operations.Permissions;
    pattern: operations.Pattern;
    /**
     * @class
     * Initializes a new instance of the LuisAuthoring class.
     * @constructor
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
    constructor(credentials: msRest.ServiceClientCredentials, options?: msRest.ServiceClientOptions);
}
export { LuisAuthoring, Models as LuisAuthoringModels, Mappers as LuisAuthoringMappers };
