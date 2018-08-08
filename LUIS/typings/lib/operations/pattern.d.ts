import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { LuisAuthoringContext } from "../luisAuthoringContext";
/** Class representing a Pattern. */
export declare class Pattern {
    private readonly client;
    /**
     * Create a Pattern.
     * @param {LuisAuthoringContext} client Reference to the service client.
     */
    constructor(client: LuisAuthoringContext);
    /**
     * @summary Adds one pattern to the specified application.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PatternRuleCreateObject} pattern The input pattern.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addPatternWithHttpOperationResponse(appId: string, versionId: string, pattern: Models.PatternRuleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PatternRuleInfo>>;
    /**
     * @summary Returns an application version's patterns.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PatternGetPatternsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPatternsWithHttpOperationResponse(appId: string, versionId: string, options?: Models.PatternGetPatternsOptionalParams): Promise<msRest.HttpOperationResponse<Models.PatternRuleInfo[]>>;
    /**
     * @summary Updates patterns
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PatternRuleUpdateObject[]} patterns An array represents the patterns.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updatePatternsWithHttpOperationResponse(appId: string, versionId: string, patterns: Models.PatternRuleUpdateObject[], options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PatternRuleInfo[]>>;
    /**
     * @summary Adds a batch of patterns to the specified application.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PatternRuleCreateObject[]} patterns A JSON array containing patterns.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    batchAddPatternsWithHttpOperationResponse(appId: string, versionId: string, patterns: Models.PatternRuleCreateObject[], options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PatternRuleInfo[]>>;
    /**
     * @summary Deletes the patterns with the specified IDs.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string[]} patternIds The patterns IDs.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deletePatternsWithHttpOperationResponse(appId: string, versionId: string, patternIds: string[], options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Updates a pattern
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} patternId The pattern ID.
     *
     * @param {PatternRuleUpdateObject} pattern An object representing a pattern.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updatePatternWithHttpOperationResponse(appId: string, versionId: string, patternId: string, pattern: Models.PatternRuleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PatternRuleInfo>>;
    /**
     * @summary Deletes the pattern with the specified ID.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} patternId The pattern ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deletePatternWithHttpOperationResponse(appId: string, versionId: string, patternId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Returns patterns to be retrieved for the specific intent.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} intentId The intent classifier ID.
     *
     * @param {PatternGetIntentPatternsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getIntentPatternsWithHttpOperationResponse(appId: string, versionId: string, intentId: string, options?: Models.PatternGetIntentPatternsOptionalParams): Promise<msRest.HttpOperationResponse<Models.PatternRuleInfo[]>>;
    /**
     * @summary Adds one pattern to the specified application.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PatternRuleCreateObject} pattern The input pattern.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PatternRuleInfo} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.PatternRuleInfo} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    addPattern(appId: string, versionId: string, pattern: Models.PatternRuleCreateObject): Promise<Models.PatternRuleInfo>;
    addPattern(appId: string, versionId: string, pattern: Models.PatternRuleCreateObject, options: msRest.RequestOptionsBase): Promise<Models.PatternRuleInfo>;
    addPattern(appId: string, versionId: string, pattern: Models.PatternRuleCreateObject, callback: msRest.ServiceCallback<Models.PatternRuleInfo>): void;
    addPattern(appId: string, versionId: string, pattern: Models.PatternRuleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PatternRuleInfo>): void;
    /**
     * @summary Returns an application version's patterns.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PatternGetPatternsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PatternRuleInfo[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPatterns(appId: string, versionId: string): Promise<Models.PatternRuleInfo[]>;
    getPatterns(appId: string, versionId: string, options: Models.PatternGetPatternsOptionalParams): Promise<Models.PatternRuleInfo[]>;
    getPatterns(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.PatternRuleInfo[]>): void;
    getPatterns(appId: string, versionId: string, options: Models.PatternGetPatternsOptionalParams, callback: msRest.ServiceCallback<Models.PatternRuleInfo[]>): void;
    /**
     * @summary Updates patterns
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PatternRuleUpdateObject[]} patterns An array represents the patterns.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PatternRuleInfo[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    updatePatterns(appId: string, versionId: string, patterns: Models.PatternRuleUpdateObject[]): Promise<Models.PatternRuleInfo[]>;
    updatePatterns(appId: string, versionId: string, patterns: Models.PatternRuleUpdateObject[], options: msRest.RequestOptionsBase): Promise<Models.PatternRuleInfo[]>;
    updatePatterns(appId: string, versionId: string, patterns: Models.PatternRuleUpdateObject[], callback: msRest.ServiceCallback<Models.PatternRuleInfo[]>): void;
    updatePatterns(appId: string, versionId: string, patterns: Models.PatternRuleUpdateObject[], options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PatternRuleInfo[]>): void;
    /**
     * @summary Adds a batch of patterns to the specified application.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PatternRuleCreateObject[]} patterns A JSON array containing patterns.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PatternRuleInfo[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    batchAddPatterns(appId: string, versionId: string, patterns: Models.PatternRuleCreateObject[]): Promise<Models.PatternRuleInfo[]>;
    batchAddPatterns(appId: string, versionId: string, patterns: Models.PatternRuleCreateObject[], options: msRest.RequestOptionsBase): Promise<Models.PatternRuleInfo[]>;
    batchAddPatterns(appId: string, versionId: string, patterns: Models.PatternRuleCreateObject[], callback: msRest.ServiceCallback<Models.PatternRuleInfo[]>): void;
    batchAddPatterns(appId: string, versionId: string, patterns: Models.PatternRuleCreateObject[], options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PatternRuleInfo[]>): void;
    /**
     * @summary Deletes the patterns with the specified IDs.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string[]} patternIds The patterns IDs.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.OperationStatus} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.OperationStatus} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    deletePatterns(appId: string, versionId: string, patternIds: string[]): Promise<Models.OperationStatus>;
    deletePatterns(appId: string, versionId: string, patternIds: string[], options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deletePatterns(appId: string, versionId: string, patternIds: string[], callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deletePatterns(appId: string, versionId: string, patternIds: string[], options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Updates a pattern
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} patternId The pattern ID.
     *
     * @param {PatternRuleUpdateObject} pattern An object representing a pattern.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PatternRuleInfo} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.PatternRuleInfo} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    updatePattern(appId: string, versionId: string, patternId: string, pattern: Models.PatternRuleUpdateObject): Promise<Models.PatternRuleInfo>;
    updatePattern(appId: string, versionId: string, patternId: string, pattern: Models.PatternRuleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.PatternRuleInfo>;
    updatePattern(appId: string, versionId: string, patternId: string, pattern: Models.PatternRuleUpdateObject, callback: msRest.ServiceCallback<Models.PatternRuleInfo>): void;
    updatePattern(appId: string, versionId: string, patternId: string, pattern: Models.PatternRuleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PatternRuleInfo>): void;
    /**
     * @summary Deletes the pattern with the specified ID.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} patternId The pattern ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.OperationStatus} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.OperationStatus} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    deletePattern(appId: string, versionId: string, patternId: string): Promise<Models.OperationStatus>;
    deletePattern(appId: string, versionId: string, patternId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deletePattern(appId: string, versionId: string, patternId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deletePattern(appId: string, versionId: string, patternId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Returns patterns to be retrieved for the specific intent.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} intentId The intent classifier ID.
     *
     * @param {PatternGetIntentPatternsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PatternRuleInfo[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getIntentPatterns(appId: string, versionId: string, intentId: string): Promise<Models.PatternRuleInfo[]>;
    getIntentPatterns(appId: string, versionId: string, intentId: string, options: Models.PatternGetIntentPatternsOptionalParams): Promise<Models.PatternRuleInfo[]>;
    getIntentPatterns(appId: string, versionId: string, intentId: string, callback: msRest.ServiceCallback<Models.PatternRuleInfo[]>): void;
    getIntentPatterns(appId: string, versionId: string, intentId: string, options: Models.PatternGetIntentPatternsOptionalParams, callback: msRest.ServiceCallback<Models.PatternRuleInfo[]>): void;
}
