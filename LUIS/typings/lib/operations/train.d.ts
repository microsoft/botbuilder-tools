import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { LuisAuthoringContext } from "../luisAuthoringContext";
/** Class representing a Train. */
export declare class Train {
    private readonly client;
    /**
     * Create a Train.
     * @param {LuisAuthoringContext} client Reference to the service client.
     */
    constructor(client: LuisAuthoringContext);
    /**
     * Sends a training request for a version of a specified LUIS app. This POST request initiates a
     * request asynchronously. To determine whether the training request is successful, submit a GET
     * request to get training status. Note: The application version is not fully trained unless all
     * the models (intents and entities) are trained successfully or are up to date. To verify training
     * success, get the training status at least once after training is complete.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
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
    trainVersionWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EnqueueTrainingResponse>>;
    /**
     * Gets the training status of all models (intents and entities) for the specified LUIS app. You
     * must call the train API to train the LUIS app before you call this API to get training status.
     * "appID" specifies the LUIS app ID. "versionId" specifies the version number of the LUIS app. For
     * example, "0.1".
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
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
    getStatusWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.ModelTrainingInfo[]>>;
    /**
     * Sends a training request for a version of a specified LUIS app. This POST request initiates a
     * request asynchronously. To determine whether the training request is successful, submit a GET
     * request to get training status. Note: The application version is not fully trained unless all
     * the models (intents and entities) are trained successfully or are up to date. To verify training
     * success, get the training status at least once after training is complete.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
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
     *                      {Models.EnqueueTrainingResponse} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.EnqueueTrainingResponse} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    trainVersion(azureRegion: Models.AzureRegions, appId: string, versionId: string): Promise<Models.EnqueueTrainingResponse>;
    trainVersion(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: msRest.RequestOptionsBase): Promise<Models.EnqueueTrainingResponse>;
    trainVersion(azureRegion: Models.AzureRegions, appId: string, versionId: string, callback: msRest.ServiceCallback<Models.EnqueueTrainingResponse>): void;
    trainVersion(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EnqueueTrainingResponse>): void;
    /**
     * Gets the training status of all models (intents and entities) for the specified LUIS app. You
     * must call the train API to train the LUIS app before you call this API to get training status.
     * "appID" specifies the LUIS app ID. "versionId" specifies the version number of the LUIS app. For
     * example, "0.1".
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
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
     *                      {Models.ModelTrainingInfo[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getStatus(azureRegion: Models.AzureRegions, appId: string, versionId: string): Promise<Models.ModelTrainingInfo[]>;
    getStatus(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: msRest.RequestOptionsBase): Promise<Models.ModelTrainingInfo[]>;
    getStatus(azureRegion: Models.AzureRegions, appId: string, versionId: string, callback: msRest.ServiceCallback<Models.ModelTrainingInfo[]>): void;
    getStatus(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ModelTrainingInfo[]>): void;
}
