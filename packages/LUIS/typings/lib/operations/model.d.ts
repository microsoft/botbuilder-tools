import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { LuisAuthoringContext } from "../luisAuthoringContext";
/** Class representing a Model. */
export declare class Model {
    private readonly client;
    /**
     * Create a Model.
     * @param {LuisAuthoringContext} client Reference to the service client.
     */
    constructor(client: LuisAuthoringContext);
    /**
     * Adds an intent classifier to the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelCreateObject} intentCreateObject A model object containing the name of the new
     * intent classifier.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addIntentWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentCreateObject: Models.ModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets information about the intent models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelListIntentsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listIntentsWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, options?: Models.ModelListIntentsOptionalParams): Promise<msRest.HttpOperationResponse<Models.IntentClassifier[]>>;
    /**
     * Adds an entity extractor to the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelCreateObject} modelCreateObject A model object containing the name for the new
     * entity extractor.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addEntityWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, modelCreateObject: Models.ModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets information about the entity models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelListEntitiesOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listEntitiesWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, options?: Models.ModelListEntitiesOptionalParams): Promise<msRest.HttpOperationResponse<Models.EntityExtractor[]>>;
    /**
     * Adds a hierarchical entity extractor to the application version.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {HierarchicalEntityModel} hierarchicalModelCreateObject A model containing the name and
     * children of the new entity extractor.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addHierarchicalEntityWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, hierarchicalModelCreateObject: Models.HierarchicalEntityModel, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets information about the hierarchical entity models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelListHierarchicalEntitiesOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listHierarchicalEntitiesWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, options?: Models.ModelListHierarchicalEntitiesOptionalParams): Promise<msRest.HttpOperationResponse<Models.HierarchicalEntityExtractor[]>>;
    /**
     * Adds a composite entity extractor to the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {CompositeEntityModel} compositeModelCreateObject A model containing the name and
     * children of the new entity extractor.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addCompositeEntityWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, compositeModelCreateObject: Models.CompositeEntityModel, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets information about the composite entity models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelListCompositeEntitiesOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listCompositeEntitiesWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, options?: Models.ModelListCompositeEntitiesOptionalParams): Promise<msRest.HttpOperationResponse<Models.CompositeEntityExtractor[]>>;
    /**
     * Gets information about the closedlist models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelListClosedListsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listClosedListsWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, options?: Models.ModelListClosedListsOptionalParams): Promise<msRest.HttpOperationResponse<Models.ClosedListEntityExtractor[]>>;
    /**
     * Adds a closed list model to the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ClosedListModelCreateObject} closedListModelCreateObject A model containing the name and
     * words for the new closed list entity extractor.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addClosedListWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, closedListModelCreateObject: Models.ClosedListModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Adds a list of prebuilt entity extractors to the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string[]} prebuiltExtractorNames An array of prebuilt entity extractor names.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addPrebuiltWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltExtractorNames: string[], options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PrebuiltEntityExtractor[]>>;
    /**
     * Gets information about the prebuilt entity models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelListPrebuiltsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listPrebuiltsWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, options?: Models.ModelListPrebuiltsOptionalParams): Promise<msRest.HttpOperationResponse<Models.PrebuiltEntityExtractor[]>>;
    /**
     * Gets all the available prebuilt entity extractors for the application.
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
    listPrebuiltEntitiesWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.AvailablePrebuiltEntityModel[]>>;
    /**
     * Gets information about the application version models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelListModelsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listModelsWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, options?: Models.ModelListModelsOptionalParams): Promise<msRest.HttpOperationResponse<Models.ModelInfoResponse[]>>;
    /**
     * Gets the utterances for the given model in the given app version.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} modelId The ID (GUID) of the model.
     *
     * @param {ModelExamplesMethodOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    examplesMethodWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, modelId: string, options?: Models.ModelExamplesMethodOptionalParams): Promise<msRest.HttpOperationResponse<Models.LabelTextObject[]>>;
    /**
     * Gets information about the intent model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} intentId The intent classifier ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getIntentWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.IntentClassifier>>;
    /**
     * Updates the name of an intent classifier.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} intentId The intent classifier ID.
     *
     * @param {ModelUpdateObject} modelUpdateObject A model object containing the new intent classifier
     * name.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateIntentWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, modelUpdateObject: Models.ModelUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes an intent classifier from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} intentId The intent classifier ID.
     *
     * @param {ModelDeleteIntentOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteIntentWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, options?: Models.ModelDeleteIntentOptionalParams): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Gets information about the entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getEntityWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityExtractor>>;
    /**
     * Updates the name of an entity extractor.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity extractor ID.
     *
     * @param {ModelUpdateObject} modelUpdateObject A model object containing the new entity extractor
     * name.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateEntityWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, modelUpdateObject: Models.ModelUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes an entity extractor from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteEntityWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Gets information about the hierarchical entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getHierarchicalEntityWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.HierarchicalEntityExtractor>>;
    /**
     * Updates the name and children of a hierarchical entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {HierarchicalEntityModel} hierarchicalModelUpdateObject Model containing names of the
     * children of the hierarchical entity.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateHierarchicalEntityWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hierarchicalModelUpdateObject: Models.HierarchicalEntityModel, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes a hierarchical entity extractor from the application version.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteHierarchicalEntityWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Gets information about the composite entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCompositeEntityWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.CompositeEntityExtractor>>;
    /**
     * Updates the composite entity extractor.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {CompositeEntityModel} compositeModelUpdateObject A model object containing the new
     * entity extractor name and children.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateCompositeEntityWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, compositeModelUpdateObject: Models.CompositeEntityModel, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes a composite entity extractor from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteCompositeEntityWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Gets information of a closed list model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} clEntityId The closed list model ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getClosedListWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.ClosedListEntityExtractor>>;
    /**
     * Updates the closed list model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} clEntityId The closed list model ID.
     *
     * @param {ClosedListModelUpdateObject} closedListModelUpdateObject The new entity name and words
     * list.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateClosedListWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, closedListModelUpdateObject: Models.ClosedListModelUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Adds a batch of sublists to an existing closedlist.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} clEntityId The closed list model ID.
     *
     * @param {ClosedListModelPatchObject} closedListModelPatchObject A words list batch.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    patchClosedListWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, closedListModelPatchObject: Models.ClosedListModelPatchObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes a closed list model from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} clEntityId The closed list model ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteClosedListWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Gets information about the prebuilt entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} prebuiltId The prebuilt entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPrebuiltWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PrebuiltEntityExtractor>>;
    /**
     * Deletes a prebuilt entity extractor from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} prebuiltId The prebuilt entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deletePrebuiltWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes a sublist of a specific closed list model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} clEntityId The closed list entity extractor ID.
     *
     * @param {number} subListId The sublist ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteSubListWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, subListId: number, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Updates one of the closed list's sublists.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} clEntityId The closed list entity extractor ID.
     *
     * @param {number} subListId The sublist ID.
     *
     * @param {WordListBaseUpdateObject} wordListBaseUpdateObject A sublist update object containing
     * the new canonical form and the list of words.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateSubListWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, subListId: number, wordListBaseUpdateObject: Models.WordListBaseUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Suggests examples that would improve the accuracy of the intent model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} intentId The intent classifier ID.
     *
     * @param {ModelGetIntentSuggestionsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getIntentSuggestionsWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, options?: Models.ModelGetIntentSuggestionsOptionalParams): Promise<msRest.HttpOperationResponse<Models.IntentsSuggestionExample[]>>;
    /**
     * Get suggestion examples that would improve the accuracy of the entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The target entity extractor model to enhance.
     *
     * @param {ModelGetEntitySuggestionsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getEntitySuggestionsWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options?: Models.ModelGetEntitySuggestionsOptionalParams): Promise<msRest.HttpOperationResponse<Models.EntitiesSuggestionExample[]>>;
    /**
     * Adds a list to an existing closed list.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} clEntityId The closed list entity extractor ID.
     *
     * @param {WordListObject} wordListCreateObject Words list.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addSubListWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, wordListCreateObject: Models.WordListObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<number>>;
    /**
     * Adds a customizable prebuilt domain along with all of its models to this application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PrebuiltDomainCreateBaseObject} prebuiltDomainObject A prebuilt domain create object
     * containing the name of the domain.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addCustomPrebuiltDomainWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltDomainObject: Models.PrebuiltDomainCreateBaseObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string[]>>;
    /**
     * Adds a custom prebuilt intent model to the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PrebuiltDomainModelCreateObject} prebuiltDomainModelCreateObject A model object
     * containing the name of the custom prebuilt intent and the name of the domain to which this model
     * belongs.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addCustomPrebuiltIntentWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets custom prebuilt intents information of this application.
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
    listCustomPrebuiltIntentsWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.IntentClassifier[]>>;
    /**
     * Adds a custom prebuilt entity model to the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PrebuiltDomainModelCreateObject} prebuiltDomainModelCreateObject A model object
     * containing the name of the custom prebuilt entity and the name of the domain to which this model
     * belongs.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addCustomPrebuiltEntityWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets all custom prebuilt entities information of this application.
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
    listCustomPrebuiltEntitiesWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityExtractor[]>>;
    /**
     * Gets all custom prebuilt models information of this application.
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
    listCustomPrebuiltModelsWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.CustomPrebuiltModel[]>>;
    /**
     * Deletes a prebuilt domain's models from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} domainName Domain name.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteCustomPrebuiltDomainWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, domainName: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Gets information about the hierarchical entity child model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {string} hChildId The hierarchical entity extractor child ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getHierarchicalEntityChildWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hChildId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.HierarchicalChildEntity>>;
    /**
     * Renames a single child in an existing hierarchical entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {string} hChildId The hierarchical entity extractor child ID.
     *
     * @param {HierarchicalChildModelUpdateObject} hierarchicalChildModelUpdateObject Model object
     * containing new name of the hierarchical entity child.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateHierarchicalEntityChildWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hChildId: string, hierarchicalChildModelUpdateObject: Models.HierarchicalChildModelUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes a hierarchical entity extractor child from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {string} hChildId The hierarchical entity extractor child ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteHierarchicalEntityChildWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hChildId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Creates a single child in an existing hierarchical entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {HierarchicalChildModelCreateObject} hierarchicalChildModelCreateObject A model object
     * containing the name of the new hierarchical child model.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addHierarchicalEntityChildWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hierarchicalChildModelCreateObject: Models.HierarchicalChildModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Creates a single child in an existing composite entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {CompositeChildModelCreateObject} compositeChildModelCreateObject A model object
     * containing the name of the new composite child model.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addCompositeEntityChildWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, compositeChildModelCreateObject: Models.CompositeChildModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Deletes a composite entity extractor child from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {string} cChildId The hierarchical entity extractor child ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteCompositeEntityChildWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, cChildId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Gets information about the regex entity models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelGetRegexEntityInfosOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getRegexEntityInfosWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, options?: Models.ModelGetRegexEntityInfosOptionalParams): Promise<msRest.HttpOperationResponse<Models.RegexEntityExtractor[]>>;
    /**
     * @summary Adds a regex entity model to the application version.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {RegexModelCreateObject} regexEntityExtractorCreateObj A model object containing the name
     * and regex pattern for the new regex entity extractor.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createRegexEntityModelWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityExtractorCreateObj: Models.RegexModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get information about the Pattern.Any entity models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelGetPatternAnyEntityInfosOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPatternAnyEntityInfosWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, options?: Models.ModelGetPatternAnyEntityInfosOptionalParams): Promise<msRest.HttpOperationResponse<Models.PatternAnyEntityExtractor[]>>;
    /**
     * @summary Adds a pattern.any entity extractor to the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PatternAnyModelCreateObject} extractorCreateObject A model object containing the name
     * and explicit list for the new Pattern.Any entity extractor.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createPatternAnyEntityModelWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, extractorCreateObject: Models.PatternAnyModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get All Entity Roles for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity Id
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getEntityRolesWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole[]>>;
    /**
     * @summary Create an entity role for an entity in the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity model ID.
     *
     * @param {EntityRoleCreateObject} entityRoleCreateObject An entity role object containing the name
     * of role.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get All Entity Roles for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity Id
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPrebuiltEntityRolesWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole[]>>;
    /**
     * @summary Create an entity role for an entity in the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity model ID.
     *
     * @param {EntityRoleCreateObject} entityRoleCreateObject An entity role object containing the name
     * of role.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createPrebuiltEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get All Entity Roles for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity Id
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getClosedListEntityRolesWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole[]>>;
    /**
     * @summary Create an entity role for an entity in the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity model ID.
     *
     * @param {EntityRoleCreateObject} entityRoleCreateObject An entity role object containing the name
     * of role.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createClosedListEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get All Entity Roles for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity Id
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getRegexEntityRolesWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole[]>>;
    /**
     * @summary Create an entity role for an entity in the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity model ID.
     *
     * @param {EntityRoleCreateObject} entityRoleCreateObject An entity role object containing the name
     * of role.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createRegexEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get All Entity Roles for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCompositeEntityRolesWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole[]>>;
    /**
     * @summary Create an entity role for an entity in the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {EntityRoleCreateObject} entityRoleCreateObject An entity role object containing the name
     * of role.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createCompositeEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get All Entity Roles for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity Id
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPatternAnyEntityRolesWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole[]>>;
    /**
     * @summary Create an entity role for an entity in the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity model ID.
     *
     * @param {EntityRoleCreateObject} entityRoleCreateObject An entity role object containing the name
     * of role.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createPatternAnyEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get All Entity Roles for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getHierarchicalEntityRolesWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole[]>>;
    /**
     * @summary Create an entity role for an entity in the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {EntityRoleCreateObject} entityRoleCreateObject An entity role object containing the name
     * of role.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createHierarchicalEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get All Entity Roles for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity Id
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCustomPrebuiltEntityRolesWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole[]>>;
    /**
     * @summary Create an entity role for an entity in the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity model ID.
     *
     * @param {EntityRoleCreateObject} entityRoleCreateObject An entity role object containing the name
     * of role.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createCustomPrebuiltEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get the explicit list of the pattern.any entity.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The Pattern.Any entity id.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getExplicitListWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.ExplicitListItem[]>>;
    /**
     * @summary Add a new item to the explicit list for the Pattern.Any entity.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The Pattern.Any entity extractor ID.
     *
     * @param {ExplicitListItemCreateObject} item The new explicit list item.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addExplicitListItemWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, item: Models.ExplicitListItemCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<number>>;
    /**
     * @summary Gets information of a regex entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} regexEntityId The regex entity model ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getRegexEntityEntityInfoWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.RegexEntityExtractor>>;
    /**
     * @summary Updates the regex entity model .
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} regexEntityId The regex entity extractor ID.
     *
     * @param {RegexModelUpdateObject} regexEntityUpdateObject An object containing the new entity name
     * and regex pattern.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateRegexEntityModelWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityId: string, regexEntityUpdateObject: Models.RegexModelUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Deletes a regex entity model from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} regexEntityId The regex entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteRegexEntityModelWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Gets information about the application version's Pattern.Any model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPatternAnyEntityInfoWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PatternAnyEntityExtractor>>;
    /**
     * @summary Updates the name and explicit list of a Pattern.Any entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The Pattern.Any entity extractor ID.
     *
     * @param {PatternAnyModelUpdateObject} patternAnyUpdateObject An object containing the explicit
     * list of the Pattern.Any entity.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updatePatternAnyEntityModelWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, patternAnyUpdateObject: Models.PatternAnyModelUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Deletes a Pattern.Any entity extractor from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The Pattern.Any entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deletePatternAnyEntityModelWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get one entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity ID.
     *
     * @param {string} roleId entity role ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole>>;
    /**
     * @summary Update an entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role ID.
     *
     * @param {EntityRoleUpdateObject} entityRoleUpdateObject The new entity role.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete an entity role.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role Id.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get one entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity ID.
     *
     * @param {string} roleId entity role ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPrebuiltEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole>>;
    /**
     * @summary Update an entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role ID.
     *
     * @param {EntityRoleUpdateObject} entityRoleUpdateObject The new entity role.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updatePrebuiltEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete an entity role.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role Id.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deletePrebuiltEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get one entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity ID.
     *
     * @param {string} roleId entity role ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getClosedListEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole>>;
    /**
     * @summary Update an entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role ID.
     *
     * @param {EntityRoleUpdateObject} entityRoleUpdateObject The new entity role.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateClosedListEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete an entity role.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role Id.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteClosedListEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get one entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity ID.
     *
     * @param {string} roleId entity role ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getRegexEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole>>;
    /**
     * @summary Update an entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role ID.
     *
     * @param {EntityRoleUpdateObject} entityRoleUpdateObject The new entity role.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateRegexEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete an entity role.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role Id.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteRegexEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get one entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {string} roleId entity role ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCompositeEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole>>;
    /**
     * @summary Update an entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {string} roleId The entity role ID.
     *
     * @param {EntityRoleUpdateObject} entityRoleUpdateObject The new entity role.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateCompositeEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete an entity role.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {string} roleId The entity role Id.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteCompositeEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get one entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity ID.
     *
     * @param {string} roleId entity role ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPatternAnyEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole>>;
    /**
     * @summary Update an entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role ID.
     *
     * @param {EntityRoleUpdateObject} entityRoleUpdateObject The new entity role.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updatePatternAnyEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete an entity role.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role Id.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deletePatternAnyEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get one entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {string} roleId entity role ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getHierarchicalEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole>>;
    /**
     * @summary Update an entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {string} roleId The entity role ID.
     *
     * @param {EntityRoleUpdateObject} entityRoleUpdateObject The new entity role.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateHierarchicalEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete an entity role.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {string} roleId The entity role Id.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteHierarchicalEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get one entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity ID.
     *
     * @param {string} roleId entity role ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCustomEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole>>;
    /**
     * @summary Update an entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role ID.
     *
     * @param {EntityRoleUpdateObject} entityRoleUpdateObject The new entity role.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateCustomPrebuiltEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete an entity role.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role Id.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteCustomEntityRoleWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get the explicit list of the pattern.any entity.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The Pattern.Any entity Id.
     *
     * @param {number} itemId The explicit list item Id.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getExplicitListItemWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, itemId: number, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.ExplicitListItem>>;
    /**
     * @summary Updates an explicit list item for a Pattern.Any entity.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The Pattern.Any entity extractor ID.
     *
     * @param {number} itemId The explicit list item ID.
     *
     * @param {ExplicitListItemUpdateObject} item The new explicit list item.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateExplicitListItemWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, itemId: number, item: Models.ExplicitListItemUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete the explicit list item from the Pattern.any explicit list.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The pattern.any entity id.
     *
     * @param {number} itemId The explicit list item which will be deleted.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteExplicitListItemWithHttpOperationResponse(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, itemId: number, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Adds an intent classifier to the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelCreateObject} intentCreateObject A model object containing the name of the new
     * intent classifier.
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
    addIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentCreateObject: Models.ModelCreateObject): Promise<string>;
    addIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentCreateObject: Models.ModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    addIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentCreateObject: Models.ModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    addIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentCreateObject: Models.ModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets information about the intent models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelListIntentsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.IntentClassifier[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listIntents(azureRegion: Models.AzureRegions, appId: string, versionId: string): Promise<Models.IntentClassifier[]>;
    listIntents(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelListIntentsOptionalParams): Promise<Models.IntentClassifier[]>;
    listIntents(azureRegion: Models.AzureRegions, appId: string, versionId: string, callback: msRest.ServiceCallback<Models.IntentClassifier[]>): void;
    listIntents(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelListIntentsOptionalParams, callback: msRest.ServiceCallback<Models.IntentClassifier[]>): void;
    /**
     * Adds an entity extractor to the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelCreateObject} modelCreateObject A model object containing the name for the new
     * entity extractor.
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
    addEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, modelCreateObject: Models.ModelCreateObject): Promise<string>;
    addEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, modelCreateObject: Models.ModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    addEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, modelCreateObject: Models.ModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    addEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, modelCreateObject: Models.ModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets information about the entity models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelListEntitiesOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityExtractor[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string): Promise<Models.EntityExtractor[]>;
    listEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelListEntitiesOptionalParams): Promise<Models.EntityExtractor[]>;
    listEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string, callback: msRest.ServiceCallback<Models.EntityExtractor[]>): void;
    listEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelListEntitiesOptionalParams, callback: msRest.ServiceCallback<Models.EntityExtractor[]>): void;
    /**
     * Adds a hierarchical entity extractor to the application version.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {HierarchicalEntityModel} hierarchicalModelCreateObject A model containing the name and
     * children of the new entity extractor.
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
    addHierarchicalEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, hierarchicalModelCreateObject: Models.HierarchicalEntityModel): Promise<string>;
    addHierarchicalEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, hierarchicalModelCreateObject: Models.HierarchicalEntityModel, options: msRest.RequestOptionsBase): Promise<string>;
    addHierarchicalEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, hierarchicalModelCreateObject: Models.HierarchicalEntityModel, callback: msRest.ServiceCallback<string>): void;
    addHierarchicalEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, hierarchicalModelCreateObject: Models.HierarchicalEntityModel, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets information about the hierarchical entity models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelListHierarchicalEntitiesOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.HierarchicalEntityExtractor[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listHierarchicalEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string): Promise<Models.HierarchicalEntityExtractor[]>;
    listHierarchicalEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelListHierarchicalEntitiesOptionalParams): Promise<Models.HierarchicalEntityExtractor[]>;
    listHierarchicalEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string, callback: msRest.ServiceCallback<Models.HierarchicalEntityExtractor[]>): void;
    listHierarchicalEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelListHierarchicalEntitiesOptionalParams, callback: msRest.ServiceCallback<Models.HierarchicalEntityExtractor[]>): void;
    /**
     * Adds a composite entity extractor to the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {CompositeEntityModel} compositeModelCreateObject A model containing the name and
     * children of the new entity extractor.
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
    addCompositeEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, compositeModelCreateObject: Models.CompositeEntityModel): Promise<string>;
    addCompositeEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, compositeModelCreateObject: Models.CompositeEntityModel, options: msRest.RequestOptionsBase): Promise<string>;
    addCompositeEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, compositeModelCreateObject: Models.CompositeEntityModel, callback: msRest.ServiceCallback<string>): void;
    addCompositeEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, compositeModelCreateObject: Models.CompositeEntityModel, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets information about the composite entity models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelListCompositeEntitiesOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.CompositeEntityExtractor[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listCompositeEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string): Promise<Models.CompositeEntityExtractor[]>;
    listCompositeEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelListCompositeEntitiesOptionalParams): Promise<Models.CompositeEntityExtractor[]>;
    listCompositeEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string, callback: msRest.ServiceCallback<Models.CompositeEntityExtractor[]>): void;
    listCompositeEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelListCompositeEntitiesOptionalParams, callback: msRest.ServiceCallback<Models.CompositeEntityExtractor[]>): void;
    /**
     * Gets information about the closedlist models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelListClosedListsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.ClosedListEntityExtractor[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listClosedLists(azureRegion: Models.AzureRegions, appId: string, versionId: string): Promise<Models.ClosedListEntityExtractor[]>;
    listClosedLists(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelListClosedListsOptionalParams): Promise<Models.ClosedListEntityExtractor[]>;
    listClosedLists(azureRegion: Models.AzureRegions, appId: string, versionId: string, callback: msRest.ServiceCallback<Models.ClosedListEntityExtractor[]>): void;
    listClosedLists(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelListClosedListsOptionalParams, callback: msRest.ServiceCallback<Models.ClosedListEntityExtractor[]>): void;
    /**
     * Adds a closed list model to the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ClosedListModelCreateObject} closedListModelCreateObject A model containing the name and
     * words for the new closed list entity extractor.
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
    addClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, closedListModelCreateObject: Models.ClosedListModelCreateObject): Promise<string>;
    addClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, closedListModelCreateObject: Models.ClosedListModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    addClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, closedListModelCreateObject: Models.ClosedListModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    addClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, closedListModelCreateObject: Models.ClosedListModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Adds a list of prebuilt entity extractors to the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string[]} prebuiltExtractorNames An array of prebuilt entity extractor names.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PrebuiltEntityExtractor[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    addPrebuilt(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltExtractorNames: string[]): Promise<Models.PrebuiltEntityExtractor[]>;
    addPrebuilt(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltExtractorNames: string[], options: msRest.RequestOptionsBase): Promise<Models.PrebuiltEntityExtractor[]>;
    addPrebuilt(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltExtractorNames: string[], callback: msRest.ServiceCallback<Models.PrebuiltEntityExtractor[]>): void;
    addPrebuilt(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltExtractorNames: string[], options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PrebuiltEntityExtractor[]>): void;
    /**
     * Gets information about the prebuilt entity models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelListPrebuiltsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PrebuiltEntityExtractor[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listPrebuilts(azureRegion: Models.AzureRegions, appId: string, versionId: string): Promise<Models.PrebuiltEntityExtractor[]>;
    listPrebuilts(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelListPrebuiltsOptionalParams): Promise<Models.PrebuiltEntityExtractor[]>;
    listPrebuilts(azureRegion: Models.AzureRegions, appId: string, versionId: string, callback: msRest.ServiceCallback<Models.PrebuiltEntityExtractor[]>): void;
    listPrebuilts(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelListPrebuiltsOptionalParams, callback: msRest.ServiceCallback<Models.PrebuiltEntityExtractor[]>): void;
    /**
     * Gets all the available prebuilt entity extractors for the application.
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
     *                      {Models.AvailablePrebuiltEntityModel[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listPrebuiltEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string): Promise<Models.AvailablePrebuiltEntityModel[]>;
    listPrebuiltEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: msRest.RequestOptionsBase): Promise<Models.AvailablePrebuiltEntityModel[]>;
    listPrebuiltEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string, callback: msRest.ServiceCallback<Models.AvailablePrebuiltEntityModel[]>): void;
    listPrebuiltEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AvailablePrebuiltEntityModel[]>): void;
    /**
     * Gets information about the application version models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelListModelsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.ModelInfoResponse[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listModels(azureRegion: Models.AzureRegions, appId: string, versionId: string): Promise<Models.ModelInfoResponse[]>;
    listModels(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelListModelsOptionalParams): Promise<Models.ModelInfoResponse[]>;
    listModels(azureRegion: Models.AzureRegions, appId: string, versionId: string, callback: msRest.ServiceCallback<Models.ModelInfoResponse[]>): void;
    listModels(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelListModelsOptionalParams, callback: msRest.ServiceCallback<Models.ModelInfoResponse[]>): void;
    /**
     * Gets the utterances for the given model in the given app version.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} modelId The ID (GUID) of the model.
     *
     * @param {ModelExamplesMethodOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.LabelTextObject[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    examplesMethod(azureRegion: Models.AzureRegions, appId: string, versionId: string, modelId: string): Promise<Models.LabelTextObject[]>;
    examplesMethod(azureRegion: Models.AzureRegions, appId: string, versionId: string, modelId: string, options: Models.ModelExamplesMethodOptionalParams): Promise<Models.LabelTextObject[]>;
    examplesMethod(azureRegion: Models.AzureRegions, appId: string, versionId: string, modelId: string, callback: msRest.ServiceCallback<Models.LabelTextObject[]>): void;
    examplesMethod(azureRegion: Models.AzureRegions, appId: string, versionId: string, modelId: string, options: Models.ModelExamplesMethodOptionalParams, callback: msRest.ServiceCallback<Models.LabelTextObject[]>): void;
    /**
     * Gets information about the intent model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} intentId The intent classifier ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.IntentClassifier} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.IntentClassifier} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string): Promise<Models.IntentClassifier>;
    getIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, options: msRest.RequestOptionsBase): Promise<Models.IntentClassifier>;
    getIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, callback: msRest.ServiceCallback<Models.IntentClassifier>): void;
    getIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.IntentClassifier>): void;
    /**
     * Updates the name of an intent classifier.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} intentId The intent classifier ID.
     *
     * @param {ModelUpdateObject} modelUpdateObject A model object containing the new intent classifier
     * name.
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
    updateIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, modelUpdateObject: Models.ModelUpdateObject): Promise<Models.OperationStatus>;
    updateIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, modelUpdateObject: Models.ModelUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, modelUpdateObject: Models.ModelUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, modelUpdateObject: Models.ModelUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes an intent classifier from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} intentId The intent classifier ID.
     *
     * @param {ModelDeleteIntentOptionalParams} [options] Optional Parameters.
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
    deleteIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string): Promise<Models.OperationStatus>;
    deleteIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, options: Models.ModelDeleteIntentOptionalParams): Promise<Models.OperationStatus>;
    deleteIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, options: Models.ModelDeleteIntentOptionalParams, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Gets information about the entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityExtractor} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.EntityExtractor} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string): Promise<Models.EntityExtractor>;
    getEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityExtractor>;
    getEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.EntityExtractor>): void;
    getEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityExtractor>): void;
    /**
     * Updates the name of an entity extractor.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity extractor ID.
     *
     * @param {ModelUpdateObject} modelUpdateObject A model object containing the new entity extractor
     * name.
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
    updateEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, modelUpdateObject: Models.ModelUpdateObject): Promise<Models.OperationStatus>;
    updateEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, modelUpdateObject: Models.ModelUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, modelUpdateObject: Models.ModelUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, modelUpdateObject: Models.ModelUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes an entity extractor from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity extractor ID.
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
    deleteEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string): Promise<Models.OperationStatus>;
    deleteEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Gets information about the hierarchical entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.HierarchicalEntityExtractor} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.HierarchicalEntityExtractor} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getHierarchicalEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string): Promise<Models.HierarchicalEntityExtractor>;
    getHierarchicalEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.HierarchicalEntityExtractor>;
    getHierarchicalEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, callback: msRest.ServiceCallback<Models.HierarchicalEntityExtractor>): void;
    getHierarchicalEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.HierarchicalEntityExtractor>): void;
    /**
     * Updates the name and children of a hierarchical entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {HierarchicalEntityModel} hierarchicalModelUpdateObject Model containing names of the
     * children of the hierarchical entity.
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
    updateHierarchicalEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hierarchicalModelUpdateObject: Models.HierarchicalEntityModel): Promise<Models.OperationStatus>;
    updateHierarchicalEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hierarchicalModelUpdateObject: Models.HierarchicalEntityModel, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateHierarchicalEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hierarchicalModelUpdateObject: Models.HierarchicalEntityModel, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateHierarchicalEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hierarchicalModelUpdateObject: Models.HierarchicalEntityModel, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes a hierarchical entity extractor from the application version.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
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
    deleteHierarchicalEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string): Promise<Models.OperationStatus>;
    deleteHierarchicalEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteHierarchicalEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteHierarchicalEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Gets information about the composite entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.CompositeEntityExtractor} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.CompositeEntityExtractor} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCompositeEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string): Promise<Models.CompositeEntityExtractor>;
    getCompositeEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.CompositeEntityExtractor>;
    getCompositeEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, callback: msRest.ServiceCallback<Models.CompositeEntityExtractor>): void;
    getCompositeEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CompositeEntityExtractor>): void;
    /**
     * Updates the composite entity extractor.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {CompositeEntityModel} compositeModelUpdateObject A model object containing the new
     * entity extractor name and children.
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
    updateCompositeEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, compositeModelUpdateObject: Models.CompositeEntityModel): Promise<Models.OperationStatus>;
    updateCompositeEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, compositeModelUpdateObject: Models.CompositeEntityModel, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateCompositeEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, compositeModelUpdateObject: Models.CompositeEntityModel, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateCompositeEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, compositeModelUpdateObject: Models.CompositeEntityModel, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes a composite entity extractor from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
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
    deleteCompositeEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string): Promise<Models.OperationStatus>;
    deleteCompositeEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteCompositeEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteCompositeEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Gets information of a closed list model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} clEntityId The closed list model ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.ClosedListEntityExtractor} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.ClosedListEntityExtractor} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string): Promise<Models.ClosedListEntityExtractor>;
    getClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.ClosedListEntityExtractor>;
    getClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, callback: msRest.ServiceCallback<Models.ClosedListEntityExtractor>): void;
    getClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ClosedListEntityExtractor>): void;
    /**
     * Updates the closed list model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} clEntityId The closed list model ID.
     *
     * @param {ClosedListModelUpdateObject} closedListModelUpdateObject The new entity name and words
     * list.
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
    updateClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, closedListModelUpdateObject: Models.ClosedListModelUpdateObject): Promise<Models.OperationStatus>;
    updateClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, closedListModelUpdateObject: Models.ClosedListModelUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, closedListModelUpdateObject: Models.ClosedListModelUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, closedListModelUpdateObject: Models.ClosedListModelUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Adds a batch of sublists to an existing closedlist.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} clEntityId The closed list model ID.
     *
     * @param {ClosedListModelPatchObject} closedListModelPatchObject A words list batch.
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
    patchClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, closedListModelPatchObject: Models.ClosedListModelPatchObject): Promise<Models.OperationStatus>;
    patchClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, closedListModelPatchObject: Models.ClosedListModelPatchObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    patchClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, closedListModelPatchObject: Models.ClosedListModelPatchObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    patchClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, closedListModelPatchObject: Models.ClosedListModelPatchObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes a closed list model from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} clEntityId The closed list model ID.
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
    deleteClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string): Promise<Models.OperationStatus>;
    deleteClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteClosedList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Gets information about the prebuilt entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} prebuiltId The prebuilt entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PrebuiltEntityExtractor} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.PrebuiltEntityExtractor} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPrebuilt(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltId: string): Promise<Models.PrebuiltEntityExtractor>;
    getPrebuilt(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltId: string, options: msRest.RequestOptionsBase): Promise<Models.PrebuiltEntityExtractor>;
    getPrebuilt(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltId: string, callback: msRest.ServiceCallback<Models.PrebuiltEntityExtractor>): void;
    getPrebuilt(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PrebuiltEntityExtractor>): void;
    /**
     * Deletes a prebuilt entity extractor from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} prebuiltId The prebuilt entity extractor ID.
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
    deletePrebuilt(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltId: string): Promise<Models.OperationStatus>;
    deletePrebuilt(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deletePrebuilt(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deletePrebuilt(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes a sublist of a specific closed list model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} clEntityId The closed list entity extractor ID.
     *
     * @param {number} subListId The sublist ID.
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
    deleteSubList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, subListId: number): Promise<Models.OperationStatus>;
    deleteSubList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, subListId: number, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteSubList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, subListId: number, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteSubList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, subListId: number, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Updates one of the closed list's sublists.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} clEntityId The closed list entity extractor ID.
     *
     * @param {number} subListId The sublist ID.
     *
     * @param {WordListBaseUpdateObject} wordListBaseUpdateObject A sublist update object containing
     * the new canonical form and the list of words.
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
    updateSubList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, subListId: number, wordListBaseUpdateObject: Models.WordListBaseUpdateObject): Promise<Models.OperationStatus>;
    updateSubList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, subListId: number, wordListBaseUpdateObject: Models.WordListBaseUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateSubList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, subListId: number, wordListBaseUpdateObject: Models.WordListBaseUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateSubList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, subListId: number, wordListBaseUpdateObject: Models.WordListBaseUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Suggests examples that would improve the accuracy of the intent model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} intentId The intent classifier ID.
     *
     * @param {ModelGetIntentSuggestionsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.IntentsSuggestionExample[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getIntentSuggestions(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string): Promise<Models.IntentsSuggestionExample[]>;
    getIntentSuggestions(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, options: Models.ModelGetIntentSuggestionsOptionalParams): Promise<Models.IntentsSuggestionExample[]>;
    getIntentSuggestions(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, callback: msRest.ServiceCallback<Models.IntentsSuggestionExample[]>): void;
    getIntentSuggestions(azureRegion: Models.AzureRegions, appId: string, versionId: string, intentId: string, options: Models.ModelGetIntentSuggestionsOptionalParams, callback: msRest.ServiceCallback<Models.IntentsSuggestionExample[]>): void;
    /**
     * Get suggestion examples that would improve the accuracy of the entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The target entity extractor model to enhance.
     *
     * @param {ModelGetEntitySuggestionsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntitiesSuggestionExample[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getEntitySuggestions(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string): Promise<Models.EntitiesSuggestionExample[]>;
    getEntitySuggestions(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: Models.ModelGetEntitySuggestionsOptionalParams): Promise<Models.EntitiesSuggestionExample[]>;
    getEntitySuggestions(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.EntitiesSuggestionExample[]>): void;
    getEntitySuggestions(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: Models.ModelGetEntitySuggestionsOptionalParams, callback: msRest.ServiceCallback<Models.EntitiesSuggestionExample[]>): void;
    /**
     * Adds a list to an existing closed list.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} clEntityId The closed list entity extractor ID.
     *
     * @param {WordListObject} wordListCreateObject Words list.
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
    addSubList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, wordListCreateObject: Models.WordListObject): Promise<number>;
    addSubList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, wordListCreateObject: Models.WordListObject, options: msRest.RequestOptionsBase): Promise<number>;
    addSubList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, wordListCreateObject: Models.WordListObject, callback: msRest.ServiceCallback<number>): void;
    addSubList(azureRegion: Models.AzureRegions, appId: string, versionId: string, clEntityId: string, wordListCreateObject: Models.WordListObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<number>): void;
    /**
     * Adds a customizable prebuilt domain along with all of its models to this application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PrebuiltDomainCreateBaseObject} prebuiltDomainObject A prebuilt domain create object
     * containing the name of the domain.
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
    addCustomPrebuiltDomain(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltDomainObject: Models.PrebuiltDomainCreateBaseObject): Promise<string[]>;
    addCustomPrebuiltDomain(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltDomainObject: Models.PrebuiltDomainCreateBaseObject, options: msRest.RequestOptionsBase): Promise<string[]>;
    addCustomPrebuiltDomain(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltDomainObject: Models.PrebuiltDomainCreateBaseObject, callback: msRest.ServiceCallback<string[]>): void;
    addCustomPrebuiltDomain(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltDomainObject: Models.PrebuiltDomainCreateBaseObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string[]>): void;
    /**
     * Adds a custom prebuilt intent model to the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PrebuiltDomainModelCreateObject} prebuiltDomainModelCreateObject A model object
     * containing the name of the custom prebuilt intent and the name of the domain to which this model
     * belongs.
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
    addCustomPrebuiltIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject): Promise<string>;
    addCustomPrebuiltIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    addCustomPrebuiltIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    addCustomPrebuiltIntent(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets custom prebuilt intents information of this application.
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
     *                      {Models.IntentClassifier[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listCustomPrebuiltIntents(azureRegion: Models.AzureRegions, appId: string, versionId: string): Promise<Models.IntentClassifier[]>;
    listCustomPrebuiltIntents(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: msRest.RequestOptionsBase): Promise<Models.IntentClassifier[]>;
    listCustomPrebuiltIntents(azureRegion: Models.AzureRegions, appId: string, versionId: string, callback: msRest.ServiceCallback<Models.IntentClassifier[]>): void;
    listCustomPrebuiltIntents(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.IntentClassifier[]>): void;
    /**
     * Adds a custom prebuilt entity model to the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PrebuiltDomainModelCreateObject} prebuiltDomainModelCreateObject A model object
     * containing the name of the custom prebuilt entity and the name of the domain to which this model
     * belongs.
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
    addCustomPrebuiltEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject): Promise<string>;
    addCustomPrebuiltEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    addCustomPrebuiltEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    addCustomPrebuiltEntity(azureRegion: Models.AzureRegions, appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets all custom prebuilt entities information of this application.
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
     *                      {Models.EntityExtractor[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listCustomPrebuiltEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string): Promise<Models.EntityExtractor[]>;
    listCustomPrebuiltEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityExtractor[]>;
    listCustomPrebuiltEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string, callback: msRest.ServiceCallback<Models.EntityExtractor[]>): void;
    listCustomPrebuiltEntities(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityExtractor[]>): void;
    /**
     * Gets all custom prebuilt models information of this application.
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
     *                      {Models.CustomPrebuiltModel[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    listCustomPrebuiltModels(azureRegion: Models.AzureRegions, appId: string, versionId: string): Promise<Models.CustomPrebuiltModel[]>;
    listCustomPrebuiltModels(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: msRest.RequestOptionsBase): Promise<Models.CustomPrebuiltModel[]>;
    listCustomPrebuiltModels(azureRegion: Models.AzureRegions, appId: string, versionId: string, callback: msRest.ServiceCallback<Models.CustomPrebuiltModel[]>): void;
    listCustomPrebuiltModels(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CustomPrebuiltModel[]>): void;
    /**
     * Deletes a prebuilt domain's models from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} domainName Domain name.
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
    deleteCustomPrebuiltDomain(azureRegion: Models.AzureRegions, appId: string, versionId: string, domainName: string): Promise<Models.OperationStatus>;
    deleteCustomPrebuiltDomain(azureRegion: Models.AzureRegions, appId: string, versionId: string, domainName: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteCustomPrebuiltDomain(azureRegion: Models.AzureRegions, appId: string, versionId: string, domainName: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteCustomPrebuiltDomain(azureRegion: Models.AzureRegions, appId: string, versionId: string, domainName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Gets information about the hierarchical entity child model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {string} hChildId The hierarchical entity extractor child ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.HierarchicalChildEntity} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.HierarchicalChildEntity} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getHierarchicalEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hChildId: string): Promise<Models.HierarchicalChildEntity>;
    getHierarchicalEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hChildId: string, options: msRest.RequestOptionsBase): Promise<Models.HierarchicalChildEntity>;
    getHierarchicalEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hChildId: string, callback: msRest.ServiceCallback<Models.HierarchicalChildEntity>): void;
    getHierarchicalEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hChildId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.HierarchicalChildEntity>): void;
    /**
     * Renames a single child in an existing hierarchical entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {string} hChildId The hierarchical entity extractor child ID.
     *
     * @param {HierarchicalChildModelUpdateObject} hierarchicalChildModelUpdateObject Model object
     * containing new name of the hierarchical entity child.
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
    updateHierarchicalEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hChildId: string, hierarchicalChildModelUpdateObject: Models.HierarchicalChildModelUpdateObject): Promise<Models.OperationStatus>;
    updateHierarchicalEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hChildId: string, hierarchicalChildModelUpdateObject: Models.HierarchicalChildModelUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateHierarchicalEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hChildId: string, hierarchicalChildModelUpdateObject: Models.HierarchicalChildModelUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateHierarchicalEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hChildId: string, hierarchicalChildModelUpdateObject: Models.HierarchicalChildModelUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes a hierarchical entity extractor child from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {string} hChildId The hierarchical entity extractor child ID.
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
    deleteHierarchicalEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hChildId: string): Promise<Models.OperationStatus>;
    deleteHierarchicalEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hChildId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteHierarchicalEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hChildId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteHierarchicalEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hChildId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Creates a single child in an existing hierarchical entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {HierarchicalChildModelCreateObject} hierarchicalChildModelCreateObject A model object
     * containing the name of the new hierarchical child model.
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
    addHierarchicalEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hierarchicalChildModelCreateObject: Models.HierarchicalChildModelCreateObject): Promise<string>;
    addHierarchicalEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hierarchicalChildModelCreateObject: Models.HierarchicalChildModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    addHierarchicalEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hierarchicalChildModelCreateObject: Models.HierarchicalChildModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    addHierarchicalEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, hierarchicalChildModelCreateObject: Models.HierarchicalChildModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Creates a single child in an existing composite entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {CompositeChildModelCreateObject} compositeChildModelCreateObject A model object
     * containing the name of the new composite child model.
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
    addCompositeEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, compositeChildModelCreateObject: Models.CompositeChildModelCreateObject): Promise<string>;
    addCompositeEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, compositeChildModelCreateObject: Models.CompositeChildModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    addCompositeEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, compositeChildModelCreateObject: Models.CompositeChildModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    addCompositeEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, compositeChildModelCreateObject: Models.CompositeChildModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Deletes a composite entity extractor child from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {string} cChildId The hierarchical entity extractor child ID.
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
    deleteCompositeEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, cChildId: string): Promise<Models.OperationStatus>;
    deleteCompositeEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, cChildId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteCompositeEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, cChildId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteCompositeEntityChild(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, cChildId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Gets information about the regex entity models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelGetRegexEntityInfosOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.RegexEntityExtractor[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getRegexEntityInfos(azureRegion: Models.AzureRegions, appId: string, versionId: string): Promise<Models.RegexEntityExtractor[]>;
    getRegexEntityInfos(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelGetRegexEntityInfosOptionalParams): Promise<Models.RegexEntityExtractor[]>;
    getRegexEntityInfos(azureRegion: Models.AzureRegions, appId: string, versionId: string, callback: msRest.ServiceCallback<Models.RegexEntityExtractor[]>): void;
    getRegexEntityInfos(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelGetRegexEntityInfosOptionalParams, callback: msRest.ServiceCallback<Models.RegexEntityExtractor[]>): void;
    /**
     * @summary Adds a regex entity model to the application version.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {RegexModelCreateObject} regexEntityExtractorCreateObj A model object containing the name
     * and regex pattern for the new regex entity extractor.
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
    createRegexEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityExtractorCreateObj: Models.RegexModelCreateObject): Promise<string>;
    createRegexEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityExtractorCreateObj: Models.RegexModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createRegexEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityExtractorCreateObj: Models.RegexModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    createRegexEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityExtractorCreateObj: Models.RegexModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get information about the Pattern.Any entity models.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ModelGetPatternAnyEntityInfosOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PatternAnyEntityExtractor[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPatternAnyEntityInfos(azureRegion: Models.AzureRegions, appId: string, versionId: string): Promise<Models.PatternAnyEntityExtractor[]>;
    getPatternAnyEntityInfos(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelGetPatternAnyEntityInfosOptionalParams): Promise<Models.PatternAnyEntityExtractor[]>;
    getPatternAnyEntityInfos(azureRegion: Models.AzureRegions, appId: string, versionId: string, callback: msRest.ServiceCallback<Models.PatternAnyEntityExtractor[]>): void;
    getPatternAnyEntityInfos(azureRegion: Models.AzureRegions, appId: string, versionId: string, options: Models.ModelGetPatternAnyEntityInfosOptionalParams, callback: msRest.ServiceCallback<Models.PatternAnyEntityExtractor[]>): void;
    /**
     * @summary Adds a pattern.any entity extractor to the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {PatternAnyModelCreateObject} extractorCreateObject A model object containing the name
     * and explicit list for the new Pattern.Any entity extractor.
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
    createPatternAnyEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, extractorCreateObject: Models.PatternAnyModelCreateObject): Promise<string>;
    createPatternAnyEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, extractorCreateObject: Models.PatternAnyModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createPatternAnyEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, extractorCreateObject: Models.PatternAnyModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    createPatternAnyEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, extractorCreateObject: Models.PatternAnyModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get All Entity Roles for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity Id
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityRole[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string): Promise<Models.EntityRole[]>;
    getEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole[]>;
    getEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    getEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    /**
     * @summary Create an entity role for an entity in the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity model ID.
     *
     * @param {EntityRoleCreateObject} entityRoleCreateObject An entity role object containing the name
     * of role.
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
    createEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject): Promise<string>;
    createEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, callback: msRest.ServiceCallback<string>): void;
    createEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get All Entity Roles for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity Id
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityRole[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPrebuiltEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string): Promise<Models.EntityRole[]>;
    getPrebuiltEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole[]>;
    getPrebuiltEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    getPrebuiltEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    /**
     * @summary Create an entity role for an entity in the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity model ID.
     *
     * @param {EntityRoleCreateObject} entityRoleCreateObject An entity role object containing the name
     * of role.
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
    createPrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject): Promise<string>;
    createPrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createPrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, callback: msRest.ServiceCallback<string>): void;
    createPrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get All Entity Roles for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity Id
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityRole[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getClosedListEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string): Promise<Models.EntityRole[]>;
    getClosedListEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole[]>;
    getClosedListEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    getClosedListEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    /**
     * @summary Create an entity role for an entity in the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity model ID.
     *
     * @param {EntityRoleCreateObject} entityRoleCreateObject An entity role object containing the name
     * of role.
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
    createClosedListEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject): Promise<string>;
    createClosedListEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createClosedListEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, callback: msRest.ServiceCallback<string>): void;
    createClosedListEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get All Entity Roles for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity Id
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityRole[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getRegexEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string): Promise<Models.EntityRole[]>;
    getRegexEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole[]>;
    getRegexEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    getRegexEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    /**
     * @summary Create an entity role for an entity in the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity model ID.
     *
     * @param {EntityRoleCreateObject} entityRoleCreateObject An entity role object containing the name
     * of role.
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
    createRegexEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject): Promise<string>;
    createRegexEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createRegexEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, callback: msRest.ServiceCallback<string>): void;
    createRegexEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get All Entity Roles for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityRole[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCompositeEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string): Promise<Models.EntityRole[]>;
    getCompositeEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole[]>;
    getCompositeEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    getCompositeEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    /**
     * @summary Create an entity role for an entity in the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {EntityRoleCreateObject} entityRoleCreateObject An entity role object containing the name
     * of role.
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
    createCompositeEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject): Promise<string>;
    createCompositeEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createCompositeEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, callback: msRest.ServiceCallback<string>): void;
    createCompositeEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get All Entity Roles for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity Id
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityRole[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPatternAnyEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string): Promise<Models.EntityRole[]>;
    getPatternAnyEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole[]>;
    getPatternAnyEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    getPatternAnyEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    /**
     * @summary Create an entity role for an entity in the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity model ID.
     *
     * @param {EntityRoleCreateObject} entityRoleCreateObject An entity role object containing the name
     * of role.
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
    createPatternAnyEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject): Promise<string>;
    createPatternAnyEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createPatternAnyEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, callback: msRest.ServiceCallback<string>): void;
    createPatternAnyEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get All Entity Roles for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityRole[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getHierarchicalEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string): Promise<Models.EntityRole[]>;
    getHierarchicalEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole[]>;
    getHierarchicalEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    getHierarchicalEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    /**
     * @summary Create an entity role for an entity in the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {EntityRoleCreateObject} entityRoleCreateObject An entity role object containing the name
     * of role.
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
    createHierarchicalEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject): Promise<string>;
    createHierarchicalEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createHierarchicalEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, callback: msRest.ServiceCallback<string>): void;
    createHierarchicalEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get All Entity Roles for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity Id
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityRole[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCustomPrebuiltEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string): Promise<Models.EntityRole[]>;
    getCustomPrebuiltEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole[]>;
    getCustomPrebuiltEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    getCustomPrebuiltEntityRoles(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    /**
     * @summary Create an entity role for an entity in the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity model ID.
     *
     * @param {EntityRoleCreateObject} entityRoleCreateObject An entity role object containing the name
     * of role.
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
    createCustomPrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject): Promise<string>;
    createCustomPrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createCustomPrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, callback: msRest.ServiceCallback<string>): void;
    createCustomPrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get the explicit list of the pattern.any entity.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The Pattern.Any entity id.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.ExplicitListItem[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getExplicitList(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string): Promise<Models.ExplicitListItem[]>;
    getExplicitList(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.ExplicitListItem[]>;
    getExplicitList(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.ExplicitListItem[]>): void;
    getExplicitList(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ExplicitListItem[]>): void;
    /**
     * @summary Add a new item to the explicit list for the Pattern.Any entity.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The Pattern.Any entity extractor ID.
     *
     * @param {ExplicitListItemCreateObject} item The new explicit list item.
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
    addExplicitListItem(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, item: Models.ExplicitListItemCreateObject): Promise<number>;
    addExplicitListItem(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, item: Models.ExplicitListItemCreateObject, options: msRest.RequestOptionsBase): Promise<number>;
    addExplicitListItem(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, item: Models.ExplicitListItemCreateObject, callback: msRest.ServiceCallback<number>): void;
    addExplicitListItem(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, item: Models.ExplicitListItemCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<number>): void;
    /**
     * @summary Gets information of a regex entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} regexEntityId The regex entity model ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.RegexEntityExtractor} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.RegexEntityExtractor} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getRegexEntityEntityInfo(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityId: string): Promise<Models.RegexEntityExtractor>;
    getRegexEntityEntityInfo(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.RegexEntityExtractor>;
    getRegexEntityEntityInfo(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityId: string, callback: msRest.ServiceCallback<Models.RegexEntityExtractor>): void;
    getRegexEntityEntityInfo(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.RegexEntityExtractor>): void;
    /**
     * @summary Updates the regex entity model .
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} regexEntityId The regex entity extractor ID.
     *
     * @param {RegexModelUpdateObject} regexEntityUpdateObject An object containing the new entity name
     * and regex pattern.
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
    updateRegexEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityId: string, regexEntityUpdateObject: Models.RegexModelUpdateObject): Promise<Models.OperationStatus>;
    updateRegexEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityId: string, regexEntityUpdateObject: Models.RegexModelUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateRegexEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityId: string, regexEntityUpdateObject: Models.RegexModelUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateRegexEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityId: string, regexEntityUpdateObject: Models.RegexModelUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Deletes a regex entity model from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} regexEntityId The regex entity extractor ID.
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
    deleteRegexEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityId: string): Promise<Models.OperationStatus>;
    deleteRegexEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteRegexEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteRegexEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, regexEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Gets information about the application version's Pattern.Any model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity extractor ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PatternAnyEntityExtractor} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.PatternAnyEntityExtractor} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPatternAnyEntityInfo(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string): Promise<Models.PatternAnyEntityExtractor>;
    getPatternAnyEntityInfo(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.PatternAnyEntityExtractor>;
    getPatternAnyEntityInfo(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.PatternAnyEntityExtractor>): void;
    getPatternAnyEntityInfo(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PatternAnyEntityExtractor>): void;
    /**
     * @summary Updates the name and explicit list of a Pattern.Any entity model.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The Pattern.Any entity extractor ID.
     *
     * @param {PatternAnyModelUpdateObject} patternAnyUpdateObject An object containing the explicit
     * list of the Pattern.Any entity.
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
    updatePatternAnyEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, patternAnyUpdateObject: Models.PatternAnyModelUpdateObject): Promise<Models.OperationStatus>;
    updatePatternAnyEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, patternAnyUpdateObject: Models.PatternAnyModelUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updatePatternAnyEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, patternAnyUpdateObject: Models.PatternAnyModelUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updatePatternAnyEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, patternAnyUpdateObject: Models.PatternAnyModelUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Deletes a Pattern.Any entity extractor from the application.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The Pattern.Any entity extractor ID.
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
    deletePatternAnyEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string): Promise<Models.OperationStatus>;
    deletePatternAnyEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deletePatternAnyEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deletePatternAnyEntityModel(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get one entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity ID.
     *
     * @param {string} roleId entity role ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityRole} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.EntityRole} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.EntityRole>;
    getEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole>;
    getEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    getEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    /**
     * @summary Update an entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role ID.
     *
     * @param {EntityRoleUpdateObject} entityRoleUpdateObject The new entity role.
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
    updateEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject): Promise<Models.OperationStatus>;
    updateEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete an entity role.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role Id.
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
    deleteEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.OperationStatus>;
    deleteEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get one entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity ID.
     *
     * @param {string} roleId entity role ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityRole} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.EntityRole} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.EntityRole>;
    getPrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole>;
    getPrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    getPrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    /**
     * @summary Update an entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role ID.
     *
     * @param {EntityRoleUpdateObject} entityRoleUpdateObject The new entity role.
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
    updatePrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject): Promise<Models.OperationStatus>;
    updatePrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updatePrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updatePrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete an entity role.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role Id.
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
    deletePrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.OperationStatus>;
    deletePrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deletePrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deletePrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get one entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity ID.
     *
     * @param {string} roleId entity role ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityRole} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.EntityRole} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getClosedListEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.EntityRole>;
    getClosedListEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole>;
    getClosedListEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    getClosedListEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    /**
     * @summary Update an entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role ID.
     *
     * @param {EntityRoleUpdateObject} entityRoleUpdateObject The new entity role.
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
    updateClosedListEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject): Promise<Models.OperationStatus>;
    updateClosedListEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateClosedListEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateClosedListEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete an entity role.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role Id.
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
    deleteClosedListEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.OperationStatus>;
    deleteClosedListEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteClosedListEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteClosedListEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get one entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity ID.
     *
     * @param {string} roleId entity role ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityRole} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.EntityRole} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getRegexEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.EntityRole>;
    getRegexEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole>;
    getRegexEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    getRegexEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    /**
     * @summary Update an entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role ID.
     *
     * @param {EntityRoleUpdateObject} entityRoleUpdateObject The new entity role.
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
    updateRegexEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject): Promise<Models.OperationStatus>;
    updateRegexEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateRegexEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateRegexEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete an entity role.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role Id.
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
    deleteRegexEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.OperationStatus>;
    deleteRegexEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteRegexEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteRegexEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get one entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {string} roleId entity role ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityRole} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.EntityRole} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCompositeEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, roleId: string): Promise<Models.EntityRole>;
    getCompositeEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole>;
    getCompositeEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, roleId: string, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    getCompositeEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    /**
     * @summary Update an entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {string} roleId The entity role ID.
     *
     * @param {EntityRoleUpdateObject} entityRoleUpdateObject The new entity role.
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
    updateCompositeEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject): Promise<Models.OperationStatus>;
    updateCompositeEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateCompositeEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateCompositeEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete an entity role.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} cEntityId The composite entity extractor ID.
     *
     * @param {string} roleId The entity role Id.
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
    deleteCompositeEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, roleId: string): Promise<Models.OperationStatus>;
    deleteCompositeEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteCompositeEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, roleId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteCompositeEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, cEntityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get one entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity ID.
     *
     * @param {string} roleId entity role ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityRole} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.EntityRole} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPatternAnyEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.EntityRole>;
    getPatternAnyEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole>;
    getPatternAnyEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    getPatternAnyEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    /**
     * @summary Update an entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role ID.
     *
     * @param {EntityRoleUpdateObject} entityRoleUpdateObject The new entity role.
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
    updatePatternAnyEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject): Promise<Models.OperationStatus>;
    updatePatternAnyEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updatePatternAnyEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updatePatternAnyEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete an entity role.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role Id.
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
    deletePatternAnyEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.OperationStatus>;
    deletePatternAnyEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deletePatternAnyEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deletePatternAnyEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get one entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {string} roleId entity role ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityRole} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.EntityRole} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getHierarchicalEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, roleId: string): Promise<Models.EntityRole>;
    getHierarchicalEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole>;
    getHierarchicalEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, roleId: string, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    getHierarchicalEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    /**
     * @summary Update an entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {string} roleId The entity role ID.
     *
     * @param {EntityRoleUpdateObject} entityRoleUpdateObject The new entity role.
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
    updateHierarchicalEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject): Promise<Models.OperationStatus>;
    updateHierarchicalEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateHierarchicalEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateHierarchicalEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete an entity role.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} hEntityId The hierarchical entity extractor ID.
     *
     * @param {string} roleId The entity role Id.
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
    deleteHierarchicalEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, roleId: string): Promise<Models.OperationStatus>;
    deleteHierarchicalEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteHierarchicalEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, roleId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteHierarchicalEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, hEntityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get one entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId entity ID.
     *
     * @param {string} roleId entity role ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.EntityRole} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.EntityRole} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCustomEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.EntityRole>;
    getCustomEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole>;
    getCustomEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    getCustomEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    /**
     * @summary Update an entity role for a given entity
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role ID.
     *
     * @param {EntityRoleUpdateObject} entityRoleUpdateObject The new entity role.
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
    updateCustomPrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject): Promise<Models.OperationStatus>;
    updateCustomPrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateCustomPrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateCustomPrebuiltEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete an entity role.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The entity ID.
     *
     * @param {string} roleId The entity role Id.
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
    deleteCustomEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.OperationStatus>;
    deleteCustomEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteCustomEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteCustomEntityRole(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get the explicit list of the pattern.any entity.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The Pattern.Any entity Id.
     *
     * @param {number} itemId The explicit list item Id.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.ExplicitListItem} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.ExplicitListItem} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getExplicitListItem(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, itemId: number): Promise<Models.ExplicitListItem>;
    getExplicitListItem(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, itemId: number, options: msRest.RequestOptionsBase): Promise<Models.ExplicitListItem>;
    getExplicitListItem(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, itemId: number, callback: msRest.ServiceCallback<Models.ExplicitListItem>): void;
    getExplicitListItem(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, itemId: number, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ExplicitListItem>): void;
    /**
     * @summary Updates an explicit list item for a Pattern.Any entity.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The Pattern.Any entity extractor ID.
     *
     * @param {number} itemId The explicit list item ID.
     *
     * @param {ExplicitListItemUpdateObject} item The new explicit list item.
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
    updateExplicitListItem(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, itemId: number, item: Models.ExplicitListItemUpdateObject): Promise<Models.OperationStatus>;
    updateExplicitListItem(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, itemId: number, item: Models.ExplicitListItemUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateExplicitListItem(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, itemId: number, item: Models.ExplicitListItemUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateExplicitListItem(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, itemId: number, item: Models.ExplicitListItemUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete the explicit list item from the Pattern.any explicit list.
     *
     * @param {AzureRegions} azureRegion Supported Azure regions for Cognitive Services endpoints.
     * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2', 'westcentralus',
     * 'westus2', 'eastus', 'southcentralus', 'northeurope', 'eastasia', 'australiaeast', 'brazilsouth'
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {string} entityId The pattern.any entity id.
     *
     * @param {number} itemId The explicit list item which will be deleted.
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
    deleteExplicitListItem(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, itemId: number): Promise<Models.OperationStatus>;
    deleteExplicitListItem(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, itemId: number, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteExplicitListItem(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, itemId: number, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteExplicitListItem(azureRegion: Models.AzureRegions, appId: string, versionId: string, entityId: string, itemId: number, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
}
