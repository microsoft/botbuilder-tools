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
    addWithHttpOperationResponse(applicationCreateObject: Models.ApplicationCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Lists all of the user applications.
     *
     * @param {AppsListOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listWithHttpOperationResponse(options?: Models.AppsListOptionalParams): Promise<msRest.HttpOperationResponse<Models.ApplicationInfoResponse[]>>;
    /**
     * Imports an application to LUIS, the application's structure should be included in in the request
     * body.
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
    importMethodWithHttpOperationResponse(luisApp: Models.LuisApp, options?: Models.AppsImportMethodOptionalParams): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets the endpoint URLs for the prebuilt Cortana applications.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listCortanaEndpointsWithHttpOperationResponse(options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PersonalAssistantsResponse>>;
    /**
     * Gets the available application domains.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listDomainsWithHttpOperationResponse(options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string[]>>;
    /**
     * Gets the application available usage scenarios.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listUsageScenariosWithHttpOperationResponse(options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string[]>>;
    /**
     * Gets the supported application cultures.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listSupportedCulturesWithHttpOperationResponse(options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.AvailableCulture[]>>;
    /**
     * Gets the query logs of the past month for the application.
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
    downloadQueryLogsWithHttpOperationResponse(appId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * Gets the application info.
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
    getWithHttpOperationResponse(appId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.ApplicationInfoResponse>>;
    /**
     * Updates the name or description of the application.
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
    updateWithHttpOperationResponse(appId: string, applicationUpdateObject: Models.ApplicationUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes an application.
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
    deleteMethodWithHttpOperationResponse(appId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Publishes a specific version of the application.
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
    publishWithHttpOperationResponse(appId: string, applicationPublishObject: Models.ApplicationPublishObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.ProductionOrStagingEndpointInfo>>;
    /**
     * Get the application settings.
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
    getSettingsWithHttpOperationResponse(appId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.ApplicationSettings>>;
    /**
     * Updates the application settings.
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
    updateSettingsWithHttpOperationResponse(appId: string, applicationSettingUpdateObject: Models.ApplicationSettingUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Get the application publish settings.
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
    getPublishSettingsWithHttpOperationResponse(appId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PublishSettings>>;
    /**
     * Updates the application publish settings.
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
    updatePublishSettingsWithHttpOperationResponse(appId: string, publishSettingUpdateObject: Models.PublishSettingUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Returns the available endpoint deployment regions and URLs.
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
    listEndpointsWithHttpOperationResponse(appId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<{
        [propertyName: string]: string;
    }>>;
    /**
     * Gets all the available custom prebuilt domains for all cultures.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listAvailableCustomPrebuiltDomainsWithHttpOperationResponse(options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PrebuiltDomain[]>>;
    /**
     * Adds a prebuilt domain along with its models as a new application.
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
    addCustomPrebuiltDomainWithHttpOperationResponse(prebuiltDomainCreateObject: Models.PrebuiltDomainCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets all the available custom prebuilt domains for a specific culture.
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
    listAvailableCustomPrebuiltDomainsForCultureWithHttpOperationResponse(culture: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PrebuiltDomain[]>>;
    /**
     * Creates a new LUIS app.
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
    add(applicationCreateObject: Models.ApplicationCreateObject): Promise<string>;
    add(applicationCreateObject: Models.ApplicationCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    add(applicationCreateObject: Models.ApplicationCreateObject, callback: msRest.ServiceCallback<string>): void;
    add(applicationCreateObject: Models.ApplicationCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Lists all of the user applications.
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
    list(): Promise<Models.ApplicationInfoResponse[]>;
    list(options: Models.AppsListOptionalParams): Promise<Models.ApplicationInfoResponse[]>;
    list(callback: msRest.ServiceCallback<Models.ApplicationInfoResponse[]>): void;
    list(options: Models.AppsListOptionalParams, callback: msRest.ServiceCallback<Models.ApplicationInfoResponse[]>): void;
    /**
     * Imports an application to LUIS, the application's structure should be included in in the request
     * body.
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
    importMethod(luisApp: Models.LuisApp): Promise<string>;
    importMethod(luisApp: Models.LuisApp, options: Models.AppsImportMethodOptionalParams): Promise<string>;
    importMethod(luisApp: Models.LuisApp, callback: msRest.ServiceCallback<string>): void;
    importMethod(luisApp: Models.LuisApp, options: Models.AppsImportMethodOptionalParams, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets the endpoint URLs for the prebuilt Cortana applications.
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
    listCortanaEndpoints(): Promise<Models.PersonalAssistantsResponse>;
    listCortanaEndpoints(options: msRest.RequestOptionsBase): Promise<Models.PersonalAssistantsResponse>;
    listCortanaEndpoints(callback: msRest.ServiceCallback<Models.PersonalAssistantsResponse>): void;
    listCortanaEndpoints(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PersonalAssistantsResponse>): void;
    /**
     * Gets the available application domains.
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
    listDomains(): Promise<string[]>;
    listDomains(options: msRest.RequestOptionsBase): Promise<string[]>;
    listDomains(callback: msRest.ServiceCallback<string[]>): void;
    listDomains(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string[]>): void;
    /**
     * Gets the application available usage scenarios.
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
    listUsageScenarios(): Promise<string[]>;
    listUsageScenarios(options: msRest.RequestOptionsBase): Promise<string[]>;
    listUsageScenarios(callback: msRest.ServiceCallback<string[]>): void;
    listUsageScenarios(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string[]>): void;
    /**
     * Gets the supported application cultures.
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
    listSupportedCultures(): Promise<Models.AvailableCulture[]>;
    listSupportedCultures(options: msRest.RequestOptionsBase): Promise<Models.AvailableCulture[]>;
    listSupportedCultures(callback: msRest.ServiceCallback<Models.AvailableCulture[]>): void;
    listSupportedCultures(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AvailableCulture[]>): void;
    /**
     * Gets the application info.
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
    get(appId: string): Promise<Models.ApplicationInfoResponse>;
    get(appId: string, options: msRest.RequestOptionsBase): Promise<Models.ApplicationInfoResponse>;
    get(appId: string, callback: msRest.ServiceCallback<Models.ApplicationInfoResponse>): void;
    get(appId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ApplicationInfoResponse>): void;
    /**
     * Updates the name or description of the application.
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
    update(appId: string, applicationUpdateObject: Models.ApplicationUpdateObject): Promise<Models.OperationStatus>;
    update(appId: string, applicationUpdateObject: Models.ApplicationUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    update(appId: string, applicationUpdateObject: Models.ApplicationUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    update(appId: string, applicationUpdateObject: Models.ApplicationUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes an application.
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
    deleteMethod(appId: string): Promise<Models.OperationStatus>;
    deleteMethod(appId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteMethod(appId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteMethod(appId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Publishes a specific version of the application.
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
    publish(appId: string, applicationPublishObject: Models.ApplicationPublishObject): Promise<Models.ProductionOrStagingEndpointInfo>;
    publish(appId: string, applicationPublishObject: Models.ApplicationPublishObject, options: msRest.RequestOptionsBase): Promise<Models.ProductionOrStagingEndpointInfo>;
    publish(appId: string, applicationPublishObject: Models.ApplicationPublishObject, callback: msRest.ServiceCallback<Models.ProductionOrStagingEndpointInfo>): void;
    publish(appId: string, applicationPublishObject: Models.ApplicationPublishObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ProductionOrStagingEndpointInfo>): void;
    /**
     * Get the application settings.
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
    getSettings(appId: string): Promise<Models.ApplicationSettings>;
    getSettings(appId: string, options: msRest.RequestOptionsBase): Promise<Models.ApplicationSettings>;
    getSettings(appId: string, callback: msRest.ServiceCallback<Models.ApplicationSettings>): void;
    getSettings(appId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ApplicationSettings>): void;
    /**
     * Updates the application settings.
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
    updateSettings(appId: string, applicationSettingUpdateObject: Models.ApplicationSettingUpdateObject): Promise<Models.OperationStatus>;
    updateSettings(appId: string, applicationSettingUpdateObject: Models.ApplicationSettingUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateSettings(appId: string, applicationSettingUpdateObject: Models.ApplicationSettingUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateSettings(appId: string, applicationSettingUpdateObject: Models.ApplicationSettingUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Get the application publish settings.
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
    getPublishSettings(appId: string): Promise<Models.PublishSettings>;
    getPublishSettings(appId: string, options: msRest.RequestOptionsBase): Promise<Models.PublishSettings>;
    getPublishSettings(appId: string, callback: msRest.ServiceCallback<Models.PublishSettings>): void;
    getPublishSettings(appId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PublishSettings>): void;
    /**
     * Updates the application publish settings.
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
    updatePublishSettings(appId: string, publishSettingUpdateObject: Models.PublishSettingUpdateObject): Promise<Models.OperationStatus>;
    updatePublishSettings(appId: string, publishSettingUpdateObject: Models.PublishSettingUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updatePublishSettings(appId: string, publishSettingUpdateObject: Models.PublishSettingUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updatePublishSettings(appId: string, publishSettingUpdateObject: Models.PublishSettingUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Returns the available endpoint deployment regions and URLs.
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
    listEndpoints(appId: string): Promise<{
        [propertyName: string]: string;
    }>;
    listEndpoints(appId: string, options: msRest.RequestOptionsBase): Promise<{
        [propertyName: string]: string;
    }>;
    listEndpoints(appId: string, callback: msRest.ServiceCallback<{
        [propertyName: string]: string;
    }>): void;
    listEndpoints(appId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<{
        [propertyName: string]: string;
    }>): void;
    /**
     * Gets all the available custom prebuilt domains for all cultures.
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
    listAvailableCustomPrebuiltDomains(): Promise<Models.PrebuiltDomain[]>;
    listAvailableCustomPrebuiltDomains(options: msRest.RequestOptionsBase): Promise<Models.PrebuiltDomain[]>;
    listAvailableCustomPrebuiltDomains(callback: msRest.ServiceCallback<Models.PrebuiltDomain[]>): void;
    listAvailableCustomPrebuiltDomains(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PrebuiltDomain[]>): void;
    /**
     * Adds a prebuilt domain along with its models as a new application.
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
    addCustomPrebuiltDomain(prebuiltDomainCreateObject: Models.PrebuiltDomainCreateObject): Promise<string>;
    addCustomPrebuiltDomain(prebuiltDomainCreateObject: Models.PrebuiltDomainCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    addCustomPrebuiltDomain(prebuiltDomainCreateObject: Models.PrebuiltDomainCreateObject, callback: msRest.ServiceCallback<string>): void;
    addCustomPrebuiltDomain(prebuiltDomainCreateObject: Models.PrebuiltDomainCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets all the available custom prebuilt domains for a specific culture.
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
    listAvailableCustomPrebuiltDomainsForCulture(culture: string): Promise<Models.PrebuiltDomain[]>;
    listAvailableCustomPrebuiltDomainsForCulture(culture: string, options: msRest.RequestOptionsBase): Promise<Models.PrebuiltDomain[]>;
    listAvailableCustomPrebuiltDomainsForCulture(culture: string, callback: msRest.ServiceCallback<Models.PrebuiltDomain[]>): void;
    listAvailableCustomPrebuiltDomainsForCulture(culture: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PrebuiltDomain[]>): void;
}
