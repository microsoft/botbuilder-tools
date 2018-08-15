import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { LuisAuthoringContext } from "../luisAuthoringContext";
/** Class representing a Apps. */
export declare class Apps {
    private readonly client;
    /**
     * Create a Apps.
     * @param {LuisAuthoringContext} client Reference to the service client.
     */
    constructor(client: LuisAuthoringContext);
    /**
     * Creates a new LUIS app.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {ApplicationCreateObject} applicationCreateObject A model containing Name, Description
     * (optional), Culture, Usage Scenario (optional), Domain (optional) and initial version ID
     * (optional) of the application. Default value for the version ID is 0.1. Note: the culture cannot
     * be changed after the app is created.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addWithHttpOperationResponse(azureRegion: Models.AzureRegions, applicationCreateObject: Models.ApplicationCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Lists all of the user applications.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {AppsListOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listWithHttpOperationResponse(azureRegion: Models.AzureRegions, options?: Models.AppsListOptionalParams): Promise<msRest.HttpOperationResponse<Models.ApplicationInfoResponse[]>>;
    /**
     * Imports an application to LUIS, the application's structure should be included in in the request
     * body.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {LuisApp} luisApp A LUIS application structure.
     *
     * @param {AppsImportMethodOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    importMethodWithHttpOperationResponse(azureRegion: Models.AzureRegions, luisApp: Models.LuisApp, options?: Models.AppsImportMethodOptionalParams): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets the endpoint URLs for the prebuilt Cortana applications.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listCortanaEndpointsWithHttpOperationResponse(azureRegion: Models.AzureRegions, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PersonalAssistantsResponse>>;
    /**
     * Gets the available application domains.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listDomainsWithHttpOperationResponse(azureRegion: Models.AzureRegions, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string[]>>;
    /**
     * Gets the application available usage scenarios.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listUsageScenariosWithHttpOperationResponse(azureRegion: Models.AzureRegions, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string[]>>;
    /**
     * Gets the supported application cultures.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listSupportedCulturesWithHttpOperationResponse(azureRegion: Models.AzureRegions, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.AvailableCulture[]>>;
    /**
     * Gets the query logs of the past month for the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    downloadQueryLogsWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * Gets the application info.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.ApplicationInfoResponse>>;
    /**
     * Updates the name or description of the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {ApplicationUpdateObject} applicationUpdateObject A model containing Name and Description
     * of the application.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, applicationUpdateObject: Models.ApplicationUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes an application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteMethodWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Publishes a specific version of the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {ApplicationPublishObject} applicationPublishObject The application publish object. The
     * region is the target region that the application is published to.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    publishWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, applicationPublishObject: Models.ApplicationPublishObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.ProductionOrStagingEndpointInfo>>;
    /**
     * Get the application settings.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getSettingsWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.ApplicationSettings>>;
    /**
     * Updates the application settings.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {ApplicationSettingUpdateObject} applicationSettingUpdateObject An object containing the
     * new application settings.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateSettingsWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, applicationSettingUpdateObject: Models.ApplicationSettingUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Get the application publish settings.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPublishSettingsWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PublishSettings>>;
    /**
     * Updates the application publish settings.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {PublishSettingUpdateObject} publishSettingUpdateObject An object containing the new
     * publish application settings.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updatePublishSettingsWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, publishSettingUpdateObject: Models.PublishSettingUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Returns the available endpoint deployment regions and URLs.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listEndpointsWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<{
        [propertyName: string]: string;
    }>>;
    /**
     * Gets all the available custom prebuilt domains for all cultures.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listAvailableCustomPrebuiltDomainsWithHttpOperationResponse(azureRegion: Models.AzureRegions, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PrebuiltDomain[]>>;
    /**
     * Adds a prebuilt domain along with its models as a new application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {PrebuiltDomainCreateObject} prebuiltDomainCreateObject A prebuilt domain create object
     * containing the name and culture of the domain.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addCustomPrebuiltDomainWithHttpOperationResponse(azureRegion: Models.AzureRegions, prebuiltDomainCreateObject: Models.PrebuiltDomainCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets all the available custom prebuilt domains for a specific culture.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} culture Culture.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listAvailableCustomPrebuiltDomainsForCultureWithHttpOperationResponse(azureRegion: Models.AzureRegions, culture: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PrebuiltDomain[]>>;
    /**
     * Creates a new LUIS app.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {ApplicationCreateObject} applicationCreateObject A model containing Name, Description
     * (optional), Culture, Usage Scenario (optional), Domain (optional) and initial version ID
     * (optional) of the application. Default value for the version ID is 0.1. Note: the culture cannot
     * be changed after the app is created.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
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
    add(azureRegion: Models.AzureRegions, applicationCreateObject: Models.ApplicationCreateObject): Promise<string>;
    add(azureRegion: Models.AzureRegions, applicationCreateObject: Models.ApplicationCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    add(azureRegion: Models.AzureRegions, applicationCreateObject: Models.ApplicationCreateObject, callback: msRest.ServiceCallback<string>): void;
    add(azureRegion: Models.AzureRegions, applicationCreateObject: Models.ApplicationCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Lists all of the user applications.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {AppsListOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.ApplicationInfoResponse[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    list(azureRegion: Models.AzureRegions): Promise<Models.ApplicationInfoResponse[]>;
    list(azureRegion: Models.AzureRegions, options: Models.AppsListOptionalParams): Promise<Models.ApplicationInfoResponse[]>;
    list(azureRegion: Models.AzureRegions, callback: msRest.ServiceCallback<Models.ApplicationInfoResponse[]>): void;
    list(azureRegion: Models.AzureRegions, options: Models.AppsListOptionalParams, callback: msRest.ServiceCallback<Models.ApplicationInfoResponse[]>): void;
    /**
     * Imports an application to LUIS, the application's structure should be included in in the request
     * body.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {LuisApp} luisApp A LUIS application structure.
     *
     * @param {AppsImportMethodOptionalParams} [options] Optional Parameters.
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
    importMethod(azureRegion: Models.AzureRegions, luisApp: Models.LuisApp): Promise<string>;
    importMethod(azureRegion: Models.AzureRegions, luisApp: Models.LuisApp, options: Models.AppsImportMethodOptionalParams): Promise<string>;
    importMethod(azureRegion: Models.AzureRegions, luisApp: Models.LuisApp, callback: msRest.ServiceCallback<string>): void;
    importMethod(azureRegion: Models.AzureRegions, luisApp: Models.LuisApp, options: Models.AppsImportMethodOptionalParams, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets the endpoint URLs for the prebuilt Cortana applications.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PersonalAssistantsResponse} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.PersonalAssistantsResponse} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listCortanaEndpoints(azureRegion: Models.AzureRegions): Promise<Models.PersonalAssistantsResponse>;
    listCortanaEndpoints(azureRegion: Models.AzureRegions, options: msRest.RequestOptionsBase): Promise<Models.PersonalAssistantsResponse>;
    listCortanaEndpoints(azureRegion: Models.AzureRegions, callback: msRest.ServiceCallback<Models.PersonalAssistantsResponse>): void;
    listCortanaEndpoints(azureRegion: Models.AzureRegions, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PersonalAssistantsResponse>): void;
    /**
     * Gets the available application domains.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {string[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listDomains(azureRegion: Models.AzureRegions): Promise<string[]>;
    listDomains(azureRegion: Models.AzureRegions, options: msRest.RequestOptionsBase): Promise<string[]>;
    listDomains(azureRegion: Models.AzureRegions, callback: msRest.ServiceCallback<string[]>): void;
    listDomains(azureRegion: Models.AzureRegions, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string[]>): void;
    /**
     * Gets the application available usage scenarios.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {string[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listUsageScenarios(azureRegion: Models.AzureRegions): Promise<string[]>;
    listUsageScenarios(azureRegion: Models.AzureRegions, options: msRest.RequestOptionsBase): Promise<string[]>;
    listUsageScenarios(azureRegion: Models.AzureRegions, callback: msRest.ServiceCallback<string[]>): void;
    listUsageScenarios(azureRegion: Models.AzureRegions, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string[]>): void;
    /**
     * Gets the supported application cultures.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.AvailableCulture[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listSupportedCultures(azureRegion: Models.AzureRegions): Promise<Models.AvailableCulture[]>;
    listSupportedCultures(azureRegion: Models.AzureRegions, options: msRest.RequestOptionsBase): Promise<Models.AvailableCulture[]>;
    listSupportedCultures(azureRegion: Models.AzureRegions, callback: msRest.ServiceCallback<Models.AvailableCulture[]>): void;
    listSupportedCultures(azureRegion: Models.AzureRegions, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AvailableCulture[]>): void;
    /**
     * Gets the application info.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.ApplicationInfoResponse} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.ApplicationInfoResponse} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    get(azureRegion: Models.AzureRegions, appId: string): Promise<Models.ApplicationInfoResponse>;
    get(azureRegion: Models.AzureRegions, appId: string, options: msRest.RequestOptionsBase): Promise<Models.ApplicationInfoResponse>;
    get(azureRegion: Models.AzureRegions, appId: string, callback: msRest.ServiceCallback<Models.ApplicationInfoResponse>): void;
    get(azureRegion: Models.AzureRegions, appId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ApplicationInfoResponse>): void;
    /**
     * Updates the name or description of the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {ApplicationUpdateObject} applicationUpdateObject A model containing Name and Description
     * of the application.
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
    update(azureRegion: Models.AzureRegions, appId: string, applicationUpdateObject: Models.ApplicationUpdateObject): Promise<Models.OperationStatus>;
    update(azureRegion: Models.AzureRegions, appId: string, applicationUpdateObject: Models.ApplicationUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    update(azureRegion: Models.AzureRegions, appId: string, applicationUpdateObject: Models.ApplicationUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    update(azureRegion: Models.AzureRegions, appId: string, applicationUpdateObject: Models.ApplicationUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes an application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
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
    deleteMethod(azureRegion: Models.AzureRegions, appId: string): Promise<Models.OperationStatus>;
    deleteMethod(azureRegion: Models.AzureRegions, appId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteMethod(azureRegion: Models.AzureRegions, appId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteMethod(azureRegion: Models.AzureRegions, appId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Publishes a specific version of the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {ApplicationPublishObject} applicationPublishObject The application publish object. The
     * region is the target region that the application is published to.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.ProductionOrStagingEndpointInfo} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.ProductionOrStagingEndpointInfo} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    publish(azureRegion: Models.AzureRegions, appId: string, applicationPublishObject: Models.ApplicationPublishObject): Promise<Models.ProductionOrStagingEndpointInfo>;
    publish(azureRegion: Models.AzureRegions, appId: string, applicationPublishObject: Models.ApplicationPublishObject, options: msRest.RequestOptionsBase): Promise<Models.ProductionOrStagingEndpointInfo>;
    publish(azureRegion: Models.AzureRegions, appId: string, applicationPublishObject: Models.ApplicationPublishObject, callback: msRest.ServiceCallback<Models.ProductionOrStagingEndpointInfo>): void;
    publish(azureRegion: Models.AzureRegions, appId: string, applicationPublishObject: Models.ApplicationPublishObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ProductionOrStagingEndpointInfo>): void;
    /**
     * Get the application settings.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.ApplicationSettings} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.ApplicationSettings} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getSettings(azureRegion: Models.AzureRegions, appId: string): Promise<Models.ApplicationSettings>;
    getSettings(azureRegion: Models.AzureRegions, appId: string, options: msRest.RequestOptionsBase): Promise<Models.ApplicationSettings>;
    getSettings(azureRegion: Models.AzureRegions, appId: string, callback: msRest.ServiceCallback<Models.ApplicationSettings>): void;
    getSettings(azureRegion: Models.AzureRegions, appId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ApplicationSettings>): void;
    /**
     * Updates the application settings.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {ApplicationSettingUpdateObject} applicationSettingUpdateObject An object containing the
     * new application settings.
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
    updateSettings(azureRegion: Models.AzureRegions, appId: string, applicationSettingUpdateObject: Models.ApplicationSettingUpdateObject): Promise<Models.OperationStatus>;
    updateSettings(azureRegion: Models.AzureRegions, appId: string, applicationSettingUpdateObject: Models.ApplicationSettingUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateSettings(azureRegion: Models.AzureRegions, appId: string, applicationSettingUpdateObject: Models.ApplicationSettingUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateSettings(azureRegion: Models.AzureRegions, appId: string, applicationSettingUpdateObject: Models.ApplicationSettingUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Get the application publish settings.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PublishSettings} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.PublishSettings} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPublishSettings(azureRegion: Models.AzureRegions, appId: string): Promise<Models.PublishSettings>;
    getPublishSettings(azureRegion: Models.AzureRegions, appId: string, options: msRest.RequestOptionsBase): Promise<Models.PublishSettings>;
    getPublishSettings(azureRegion: Models.AzureRegions, appId: string, callback: msRest.ServiceCallback<Models.PublishSettings>): void;
    getPublishSettings(azureRegion: Models.AzureRegions, appId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PublishSettings>): void;
    /**
     * Updates the application publish settings.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {PublishSettingUpdateObject} publishSettingUpdateObject An object containing the new
     * publish application settings.
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
    updatePublishSettings(azureRegion: Models.AzureRegions, appId: string, publishSettingUpdateObject: Models.PublishSettingUpdateObject): Promise<Models.OperationStatus>;
    updatePublishSettings(azureRegion: Models.AzureRegions, appId: string, publishSettingUpdateObject: Models.PublishSettingUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updatePublishSettings(azureRegion: Models.AzureRegions, appId: string, publishSettingUpdateObject: Models.PublishSettingUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updatePublishSettings(azureRegion: Models.AzureRegions, appId: string, publishSettingUpdateObject: Models.PublishSettingUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Returns the available endpoint deployment regions and URLs.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {{ [propertyName: string]: string }} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listEndpoints(azureRegion: Models.AzureRegions, appId: string): Promise<{
        [propertyName: string]: string;
    }>;
    listEndpoints(azureRegion: Models.AzureRegions, appId: string, options: msRest.RequestOptionsBase): Promise<{
        [propertyName: string]: string;
    }>;
    listEndpoints(azureRegion: Models.AzureRegions, appId: string, callback: msRest.ServiceCallback<{
        [propertyName: string]: string;
    }>): void;
    listEndpoints(azureRegion: Models.AzureRegions, appId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<{
        [propertyName: string]: string;
    }>): void;
    /**
     * Gets all the available custom prebuilt domains for all cultures.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PrebuiltDomain[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listAvailableCustomPrebuiltDomains(azureRegion: Models.AzureRegions): Promise<Models.PrebuiltDomain[]>;
    listAvailableCustomPrebuiltDomains(azureRegion: Models.AzureRegions, options: msRest.RequestOptionsBase): Promise<Models.PrebuiltDomain[]>;
    listAvailableCustomPrebuiltDomains(azureRegion: Models.AzureRegions, callback: msRest.ServiceCallback<Models.PrebuiltDomain[]>): void;
    listAvailableCustomPrebuiltDomains(azureRegion: Models.AzureRegions, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PrebuiltDomain[]>): void;
    /**
     * Adds a prebuilt domain along with its models as a new application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {PrebuiltDomainCreateObject} prebuiltDomainCreateObject A prebuilt domain create object
     * containing the name and culture of the domain.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
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
    addCustomPrebuiltDomain(azureRegion: Models.AzureRegions, prebuiltDomainCreateObject: Models.PrebuiltDomainCreateObject): Promise<string>;
    addCustomPrebuiltDomain(azureRegion: Models.AzureRegions, prebuiltDomainCreateObject: Models.PrebuiltDomainCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    addCustomPrebuiltDomain(azureRegion: Models.AzureRegions, prebuiltDomainCreateObject: Models.PrebuiltDomainCreateObject, callback: msRest.ServiceCallback<string>): void;
    addCustomPrebuiltDomain(azureRegion: Models.AzureRegions, prebuiltDomainCreateObject: Models.PrebuiltDomainCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets all the available custom prebuilt domains for a specific culture.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} culture Culture.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PrebuiltDomain[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listAvailableCustomPrebuiltDomainsForCulture(azureRegion: Models.AzureRegions, culture: string): Promise<Models.PrebuiltDomain[]>;
    listAvailableCustomPrebuiltDomainsForCulture(azureRegion: Models.AzureRegions, culture: string, options: msRest.RequestOptionsBase): Promise<Models.PrebuiltDomain[]>;
    listAvailableCustomPrebuiltDomainsForCulture(azureRegion: Models.AzureRegions, culture: string, callback: msRest.ServiceCallback<Models.PrebuiltDomain[]>): void;
    listAvailableCustomPrebuiltDomainsForCulture(azureRegion: Models.AzureRegions, culture: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PrebuiltDomain[]>): void;
}
