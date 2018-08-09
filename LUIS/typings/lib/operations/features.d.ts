import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { LuisAuthoringContext } from "../luisAuthoringContext";
/** Class representing a Features. */
export declare class Features {
    private readonly client;
    /**
     * Create a Features.
     * @param {LuisAuthoringContext} client Reference to the service client.
     */
    constructor(client: LuisAuthoringContext);
    /**
     * [DEPRECATED NOTICE: This operation will soon be removed] Creates a new pattern feature.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PatternCreateObject} patternCreateObject The Name and Pattern of the feature.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createPatternFeatureWithHttpOperationResponse(appId: string, versionId: string, patternCreateObject: Models.PatternCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<number>>;
    /**
     * [DEPRECATED NOTICE: This operation will soon be removed] Gets all the pattern features.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {FeaturesGetApplicationVersionPatternFeaturesOptionalParams} [options] Optional
     * Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getApplicationVersionPatternFeaturesWithHttpOperationResponse(appId: string, versionId: string, options?: Models.FeaturesGetApplicationVersionPatternFeaturesOptionalParams): Promise<msRest.HttpOperationResponse<Models.PatternFeatureInfo[]>>;
    /**
     * Creates a new phraselist feature.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PhraselistCreateObject} phraselistCreateObject A Phraselist object containing Name,
     * comma-separated Phrases and the isExchangeable boolean. Default value for isExchangeable is
     * true.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addPhraseListWithHttpOperationResponse(appId: string, versionId: string, phraselistCreateObject: Models.PhraselistCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<number>>;
    /**
     * Gets all the phraselist features.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {FeaturesListPhraseListsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listPhraseListsWithHttpOperationResponse(appId: string, versionId: string, options?: Models.FeaturesListPhraseListsOptionalParams): Promise<msRest.HttpOperationResponse<Models.PhraseListFeatureInfo[]>>;
    /**
     * Gets all the extraction features for the specified application version.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {FeaturesListOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listWithHttpOperationResponse(appId: string, versionId: string, options?: Models.FeaturesListOptionalParams): Promise<msRest.HttpOperationResponse<Models.FeaturesResponseObject>>;
    /**
     * [DEPRECATED NOTICE: This operation will soon be removed] Gets the specified pattern feature's
     * info.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {number} patternId The pattern feature ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPatternFeatureInfoWithHttpOperationResponse(appId: string, versionId: string, patternId: number, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PatternFeatureInfo>>;
    /**
     * [DEPRECATED NOTICE: This operation will soon be removed] Updates the pattern, the name and the
     * state of the pattern feature.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {number} patternId The pattern feature ID.
     *
     * @param {PatternUpdateObject} patternUpdateObject The new values for: - Just a boolean called
     * IsActive, in which case the status of the feature will be changed. - Name, Pattern and a boolean
     * called IsActive to update the feature.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updatePatternFeatureWithHttpOperationResponse(appId: string, versionId: string, patternId: number, patternUpdateObject: Models.PatternUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * [DEPRECATED NOTICE: This operation will soon be removed] Deletes a pattern feature.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {number} patternId The pattern feature ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deletePatternFeatureWithHttpOperationResponse(appId: string, versionId: string, patternId: number, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Gets phraselist feature info.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {number} phraselistId The ID of the feature to be retrieved.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPhraseListWithHttpOperationResponse(appId: string, versionId: string, phraselistId: number, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PhraseListFeatureInfo>>;
    /**
     * Updates the phrases, the state and the name of the phraselist feature.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {number} phraselistId The ID of the feature to be updated.
     *
     * @param {FeaturesUpdatePhraseListOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updatePhraseListWithHttpOperationResponse(appId: string, versionId: string, phraselistId: number, options?: Models.FeaturesUpdatePhraseListOptionalParams): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes a phraselist feature.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {number} phraselistId The ID of the feature to be deleted.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deletePhraseListWithHttpOperationResponse(appId: string, versionId: string, phraselistId: number, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * [DEPRECATED NOTICE: This operation will soon be removed] Creates a new pattern feature.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PatternCreateObject} patternCreateObject The Name and Pattern of the feature.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {number} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    createPatternFeature(appId: string, versionId: string, patternCreateObject: Models.PatternCreateObject): Promise<number>;
    createPatternFeature(appId: string, versionId: string, patternCreateObject: Models.PatternCreateObject, options: msRest.RequestOptionsBase): Promise<number>;
    createPatternFeature(appId: string, versionId: string, patternCreateObject: Models.PatternCreateObject, callback: msRest.ServiceCallback<number>): void;
    createPatternFeature(appId: string, versionId: string, patternCreateObject: Models.PatternCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<number>): void;
    /**
     * [DEPRECATED NOTICE: This operation will soon be removed] Gets all the pattern features.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {FeaturesGetApplicationVersionPatternFeaturesOptionalParams} [options] Optional
     * Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PatternFeatureInfo[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getApplicationVersionPatternFeatures(appId: string, versionId: string): Promise<Models.PatternFeatureInfo[]>;
    getApplicationVersionPatternFeatures(appId: string, versionId: string, options: Models.FeaturesGetApplicationVersionPatternFeaturesOptionalParams): Promise<Models.PatternFeatureInfo[]>;
    getApplicationVersionPatternFeatures(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.PatternFeatureInfo[]>): void;
    getApplicationVersionPatternFeatures(appId: string, versionId: string, options: Models.FeaturesGetApplicationVersionPatternFeaturesOptionalParams, callback: msRest.ServiceCallback<Models.PatternFeatureInfo[]>): void;
    /**
     * Creates a new phraselist feature.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PhraselistCreateObject} phraselistCreateObject A Phraselist object containing Name,
     * comma-separated Phrases and the isExchangeable boolean. Default value for isExchangeable is
     * true.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {number} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    addPhraseList(appId: string, versionId: string, phraselistCreateObject: Models.PhraselistCreateObject): Promise<number>;
    addPhraseList(appId: string, versionId: string, phraselistCreateObject: Models.PhraselistCreateObject, options: msRest.RequestOptionsBase): Promise<number>;
    addPhraseList(appId: string, versionId: string, phraselistCreateObject: Models.PhraselistCreateObject, callback: msRest.ServiceCallback<number>): void;
    addPhraseList(appId: string, versionId: string, phraselistCreateObject: Models.PhraselistCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<number>): void;
    /**
     * Gets all the phraselist features.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {FeaturesListPhraseListsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PhraseListFeatureInfo[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listPhraseLists(appId: string, versionId: string): Promise<Models.PhraseListFeatureInfo[]>;
    listPhraseLists(appId: string, versionId: string, options: Models.FeaturesListPhraseListsOptionalParams): Promise<Models.PhraseListFeatureInfo[]>;
    listPhraseLists(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.PhraseListFeatureInfo[]>): void;
    listPhraseLists(appId: string, versionId: string, options: Models.FeaturesListPhraseListsOptionalParams, callback: msRest.ServiceCallback<Models.PhraseListFeatureInfo[]>): void;
    /**
     * Gets all the extraction features for the specified application version.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {FeaturesListOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.FeaturesResponseObject} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.FeaturesResponseObject} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    list(appId: string, versionId: string): Promise<Models.FeaturesResponseObject>;
    list(appId: string, versionId: string, options: Models.FeaturesListOptionalParams): Promise<Models.FeaturesResponseObject>;
    list(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.FeaturesResponseObject>): void;
    list(appId: string, versionId: string, options: Models.FeaturesListOptionalParams, callback: msRest.ServiceCallback<Models.FeaturesResponseObject>): void;
    /**
     * [DEPRECATED NOTICE: This operation will soon be removed] Gets the specified pattern feature's
     * info.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {number} patternId The pattern feature ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PatternFeatureInfo} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.PatternFeatureInfo} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPatternFeatureInfo(appId: string, versionId: string, patternId: number): Promise<Models.PatternFeatureInfo>;
    getPatternFeatureInfo(appId: string, versionId: string, patternId: number, options: msRest.RequestOptionsBase): Promise<Models.PatternFeatureInfo>;
    getPatternFeatureInfo(appId: string, versionId: string, patternId: number, callback: msRest.ServiceCallback<Models.PatternFeatureInfo>): void;
    getPatternFeatureInfo(appId: string, versionId: string, patternId: number, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PatternFeatureInfo>): void;
    /**
     * [DEPRECATED NOTICE: This operation will soon be removed] Updates the pattern, the name and the
     * state of the pattern feature.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {number} patternId The pattern feature ID.
     *
     * @param {PatternUpdateObject} patternUpdateObject The new values for: - Just a boolean called
     * IsActive, in which case the status of the feature will be changed. - Name, Pattern and a boolean
     * called IsActive to update the feature.
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
    updatePatternFeature(appId: string, versionId: string, patternId: number, patternUpdateObject: Models.PatternUpdateObject): Promise<Models.OperationStatus>;
    updatePatternFeature(appId: string, versionId: string, patternId: number, patternUpdateObject: Models.PatternUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updatePatternFeature(appId: string, versionId: string, patternId: number, patternUpdateObject: Models.PatternUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updatePatternFeature(appId: string, versionId: string, patternId: number, patternUpdateObject: Models.PatternUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * [DEPRECATED NOTICE: This operation will soon be removed] Deletes a pattern feature.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {number} patternId The pattern feature ID.
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
    deletePatternFeature(appId: string, versionId: string, patternId: number): Promise<Models.OperationStatus>;
    deletePatternFeature(appId: string, versionId: string, patternId: number, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deletePatternFeature(appId: string, versionId: string, patternId: number, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deletePatternFeature(appId: string, versionId: string, patternId: number, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Gets phraselist feature info.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {number} phraselistId The ID of the feature to be retrieved.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PhraseListFeatureInfo} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.PhraseListFeatureInfo} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPhraseList(appId: string, versionId: string, phraselistId: number): Promise<Models.PhraseListFeatureInfo>;
    getPhraseList(appId: string, versionId: string, phraselistId: number, options: msRest.RequestOptionsBase): Promise<Models.PhraseListFeatureInfo>;
    getPhraseList(appId: string, versionId: string, phraselistId: number, callback: msRest.ServiceCallback<Models.PhraseListFeatureInfo>): void;
    getPhraseList(appId: string, versionId: string, phraselistId: number, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PhraseListFeatureInfo>): void;
    /**
     * Updates the phrases, the state and the name of the phraselist feature.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {number} phraselistId The ID of the feature to be updated.
     *
     * @param {FeaturesUpdatePhraseListOptionalParams} [options] Optional Parameters.
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
    updatePhraseList(appId: string, versionId: string, phraselistId: number): Promise<Models.OperationStatus>;
    updatePhraseList(appId: string, versionId: string, phraselistId: number, options: Models.FeaturesUpdatePhraseListOptionalParams): Promise<Models.OperationStatus>;
    updatePhraseList(appId: string, versionId: string, phraselistId: number, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updatePhraseList(appId: string, versionId: string, phraselistId: number, options: Models.FeaturesUpdatePhraseListOptionalParams, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes a phraselist feature.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {number} phraselistId The ID of the feature to be deleted.
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
    deletePhraseList(appId: string, versionId: string, phraselistId: number): Promise<Models.OperationStatus>;
    deletePhraseList(appId: string, versionId: string, phraselistId: number, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deletePhraseList(appId: string, versionId: string, phraselistId: number, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deletePhraseList(appId: string, versionId: string, phraselistId: number, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
}
