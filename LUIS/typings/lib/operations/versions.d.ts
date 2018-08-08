import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { LuisAuthoringContext } from "../luisAuthoringContext";
/** Class representing a Versions. */
export declare class Versions {
    private readonly client;
    /**
     * Create a Versions.
     * @param {LuisAuthoringContext} client Reference to the service client.
     */
    constructor(client: LuisAuthoringContext);
    /**
     * Creates a new version using the current snapshot of the selected application version.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {VersionsCloneOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    cloneWithHttpOperationResponse(appId: string, versionId: string, options?: Models.VersionsCloneOptionalParams): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets the application versions info.
     *
     * @param {string} appId The application ID.
     *
     * @param {VersionsListOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listWithHttpOperationResponse(appId: string, options?: Models.VersionsListOptionalParams): Promise<msRest.HttpOperationResponse<Models.VersionInfo[]>>;
    /**
     * Gets the version info.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getWithHttpOperationResponse(appId: string, versionId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.VersionInfo>>;
    /**
     * Updates the name or description of the application version.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {TaskUpdateObject} versionUpdateObject A model containing Name and Description of the
     * application.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateWithHttpOperationResponse(appId: string, versionId: string, versionUpdateObject: Models.TaskUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes an application version.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteMethodWithHttpOperationResponse(appId: string, versionId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Exports a LUIS application to JSON format.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    exportMethodWithHttpOperationResponse(appId: string, versionId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.LuisApp>>;
    /**
     * Imports a new version into a LUIS application.
     *
     * @param {string} appId The application ID.
     *
     * @param {LuisApp} luisApp A LUIS application structure.
     *
     * @param {VersionsImportMethodOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    importMethodWithHttpOperationResponse(appId: string, luisApp: Models.LuisApp, options?: Models.VersionsImportMethodOptionalParams): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Deleted an unlabelled utterance.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} utterance The utterance text to delete.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteUnlabelledUtteranceWithHttpOperationResponse(appId: string, versionId: string, utterance: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Creates a new version using the current snapshot of the selected application version.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {VersionsCloneOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {string} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    clone(appId: string, versionId: string): Promise<string>;
    clone(appId: string, versionId: string, options: Models.VersionsCloneOptionalParams): Promise<string>;
    clone(appId: string, versionId: string, callback: msRest.ServiceCallback<string>): void;
    clone(appId: string, versionId: string, options: Models.VersionsCloneOptionalParams, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets the application versions info.
     *
     * @param {string} appId The application ID.
     *
     * @param {VersionsListOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.VersionInfo[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    list(appId: string): Promise<Models.VersionInfo[]>;
    list(appId: string, options: Models.VersionsListOptionalParams): Promise<Models.VersionInfo[]>;
    list(appId: string, callback: msRest.ServiceCallback<Models.VersionInfo[]>): void;
    list(appId: string, options: Models.VersionsListOptionalParams, callback: msRest.ServiceCallback<Models.VersionInfo[]>): void;
    /**
     * Gets the version info.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.VersionInfo} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.VersionInfo} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    get(appId: string, versionId: string): Promise<Models.VersionInfo>;
    get(appId: string, versionId: string, options: msRest.RequestOptionsBase): Promise<Models.VersionInfo>;
    get(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.VersionInfo>): void;
    get(appId: string, versionId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VersionInfo>): void;
    /**
     * Updates the name or description of the application version.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {TaskUpdateObject} versionUpdateObject A model containing Name and Description of the
     * application.
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
    update(appId: string, versionId: string, versionUpdateObject: Models.TaskUpdateObject): Promise<Models.OperationStatus>;
    update(appId: string, versionId: string, versionUpdateObject: Models.TaskUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    update(appId: string, versionId: string, versionUpdateObject: Models.TaskUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    update(appId: string, versionId: string, versionUpdateObject: Models.TaskUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes an application version.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
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
    deleteMethod(appId: string, versionId: string): Promise<Models.OperationStatus>;
    deleteMethod(appId: string, versionId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteMethod(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteMethod(appId: string, versionId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Exports a LUIS application to JSON format.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.LuisApp} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.LuisApp} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    exportMethod(appId: string, versionId: string): Promise<Models.LuisApp>;
    exportMethod(appId: string, versionId: string, options: msRest.RequestOptionsBase): Promise<Models.LuisApp>;
    exportMethod(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.LuisApp>): void;
    exportMethod(appId: string, versionId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.LuisApp>): void;
    /**
     * Imports a new version into a LUIS application.
     *
     * @param {string} appId The application ID.
     *
     * @param {LuisApp} luisApp A LUIS application structure.
     *
     * @param {VersionsImportMethodOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {string} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    importMethod(appId: string, luisApp: Models.LuisApp): Promise<string>;
    importMethod(appId: string, luisApp: Models.LuisApp, options: Models.VersionsImportMethodOptionalParams): Promise<string>;
    importMethod(appId: string, luisApp: Models.LuisApp, callback: msRest.ServiceCallback<string>): void;
    importMethod(appId: string, luisApp: Models.LuisApp, options: Models.VersionsImportMethodOptionalParams, callback: msRest.ServiceCallback<string>): void;
    /**
     * Deleted an unlabelled utterance.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} utterance The utterance text to delete.
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
    deleteUnlabelledUtterance(appId: string, versionId: string, utterance: string): Promise<Models.OperationStatus>;
    deleteUnlabelledUtterance(appId: string, versionId: string, utterance: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteUnlabelledUtterance(appId: string, versionId: string, utterance: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteUnlabelledUtterance(appId: string, versionId: string, utterance: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
}
