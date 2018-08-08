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
    addIntentWithHttpOperationResponse(appId: string, versionId: string, intentCreateObject: Models.ModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets information about the intent models.
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
    listIntentsWithHttpOperationResponse(appId: string, versionId: string, options?: Models.ModelListIntentsOptionalParams): Promise<msRest.HttpOperationResponse<Models.IntentClassifier[]>>;
    /**
     * Adds an entity extractor to the application.
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
    addEntityWithHttpOperationResponse(appId: string, versionId: string, modelCreateObject: Models.ModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets information about the entity models.
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
    listEntitiesWithHttpOperationResponse(appId: string, versionId: string, options?: Models.ModelListEntitiesOptionalParams): Promise<msRest.HttpOperationResponse<Models.EntityExtractor[]>>;
    /**
     * Adds a hierarchical entity extractor to the application version.
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
    addHierarchicalEntityWithHttpOperationResponse(appId: string, versionId: string, hierarchicalModelCreateObject: Models.HierarchicalEntityModel, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets information about the hierarchical entity models.
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
    listHierarchicalEntitiesWithHttpOperationResponse(appId: string, versionId: string, options?: Models.ModelListHierarchicalEntitiesOptionalParams): Promise<msRest.HttpOperationResponse<Models.HierarchicalEntityExtractor[]>>;
    /**
     * Adds a composite entity extractor to the application.
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
    addCompositeEntityWithHttpOperationResponse(appId: string, versionId: string, compositeModelCreateObject: Models.CompositeEntityModel, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets information about the composite entity models.
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
    listCompositeEntitiesWithHttpOperationResponse(appId: string, versionId: string, options?: Models.ModelListCompositeEntitiesOptionalParams): Promise<msRest.HttpOperationResponse<Models.CompositeEntityExtractor[]>>;
    /**
     * Gets information about the closedlist models.
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
    listClosedListsWithHttpOperationResponse(appId: string, versionId: string, options?: Models.ModelListClosedListsOptionalParams): Promise<msRest.HttpOperationResponse<Models.ClosedListEntityExtractor[]>>;
    /**
     * Adds a closed list model to the application.
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
    addClosedListWithHttpOperationResponse(appId: string, versionId: string, closedListModelCreateObject: Models.ClosedListModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Adds a list of prebuilt entity extractors to the application.
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
    addPrebuiltWithHttpOperationResponse(appId: string, versionId: string, prebuiltExtractorNames: string[], options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PrebuiltEntityExtractor[]>>;
    /**
     * Gets information about the prebuilt entity models.
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
    listPrebuiltsWithHttpOperationResponse(appId: string, versionId: string, options?: Models.ModelListPrebuiltsOptionalParams): Promise<msRest.HttpOperationResponse<Models.PrebuiltEntityExtractor[]>>;
    /**
     * Gets all the available prebuilt entity extractors for the application.
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
    listPrebuiltEntitiesWithHttpOperationResponse(appId: string, versionId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.AvailablePrebuiltEntityModel[]>>;
    /**
     * Gets information about the application version models.
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
    listModelsWithHttpOperationResponse(appId: string, versionId: string, options?: Models.ModelListModelsOptionalParams): Promise<msRest.HttpOperationResponse<Models.ModelInfoResponse[]>>;
    /**
     * Gets the utterances for the given model in the given app version.
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
    examplesMethodWithHttpOperationResponse(appId: string, versionId: string, modelId: string, options?: Models.ModelExamplesMethodOptionalParams): Promise<msRest.HttpOperationResponse<Models.LabelTextObject[]>>;
    /**
     * Gets information about the intent model.
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
    getIntentWithHttpOperationResponse(appId: string, versionId: string, intentId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.IntentClassifier>>;
    /**
     * Updates the name of an intent classifier.
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
    updateIntentWithHttpOperationResponse(appId: string, versionId: string, intentId: string, modelUpdateObject: Models.ModelUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes an intent classifier from the application.
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
    deleteIntentWithHttpOperationResponse(appId: string, versionId: string, intentId: string, options?: Models.ModelDeleteIntentOptionalParams): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Gets information about the entity model.
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
    getEntityWithHttpOperationResponse(appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityExtractor>>;
    /**
     * Updates the name of an entity extractor.
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
    updateEntityWithHttpOperationResponse(appId: string, versionId: string, entityId: string, modelUpdateObject: Models.ModelUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes an entity extractor from the application.
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
    deleteEntityWithHttpOperationResponse(appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Gets information about the hierarchical entity model.
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
    getHierarchicalEntityWithHttpOperationResponse(appId: string, versionId: string, hEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.HierarchicalEntityExtractor>>;
    /**
     * Updates the name and children of a hierarchical entity model.
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
    updateHierarchicalEntityWithHttpOperationResponse(appId: string, versionId: string, hEntityId: string, hierarchicalModelUpdateObject: Models.HierarchicalEntityModel, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes a hierarchical entity extractor from the application version.
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
    deleteHierarchicalEntityWithHttpOperationResponse(appId: string, versionId: string, hEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Gets information about the composite entity model.
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
    getCompositeEntityWithHttpOperationResponse(appId: string, versionId: string, cEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.CompositeEntityExtractor>>;
    /**
     * Updates the composite entity extractor.
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
    updateCompositeEntityWithHttpOperationResponse(appId: string, versionId: string, cEntityId: string, compositeModelUpdateObject: Models.CompositeEntityModel, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes a composite entity extractor from the application.
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
    deleteCompositeEntityWithHttpOperationResponse(appId: string, versionId: string, cEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Gets information of a closed list model.
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
    getClosedListWithHttpOperationResponse(appId: string, versionId: string, clEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.ClosedListEntityExtractor>>;
    /**
     * Updates the closed list model.
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
    updateClosedListWithHttpOperationResponse(appId: string, versionId: string, clEntityId: string, closedListModelUpdateObject: Models.ClosedListModelUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Adds a batch of sublists to an existing closedlist.
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
    patchClosedListWithHttpOperationResponse(appId: string, versionId: string, clEntityId: string, closedListModelPatchObject: Models.ClosedListModelPatchObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes a closed list model from the application.
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
    deleteClosedListWithHttpOperationResponse(appId: string, versionId: string, clEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Gets information about the prebuilt entity model.
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
    getPrebuiltWithHttpOperationResponse(appId: string, versionId: string, prebuiltId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PrebuiltEntityExtractor>>;
    /**
     * Deletes a prebuilt entity extractor from the application.
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
    deletePrebuiltWithHttpOperationResponse(appId: string, versionId: string, prebuiltId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes a sublist of a specific closed list model.
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
    deleteSubListWithHttpOperationResponse(appId: string, versionId: string, clEntityId: string, subListId: number, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Updates one of the closed list's sublists.
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
    updateSubListWithHttpOperationResponse(appId: string, versionId: string, clEntityId: string, subListId: number, wordListBaseUpdateObject: Models.WordListBaseUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Suggests examples that would improve the accuracy of the intent model.
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
    getIntentSuggestionsWithHttpOperationResponse(appId: string, versionId: string, intentId: string, options?: Models.ModelGetIntentSuggestionsOptionalParams): Promise<msRest.HttpOperationResponse<Models.IntentsSuggestionExample[]>>;
    /**
     * Get suggestion examples that would improve the accuracy of the entity model.
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
    getEntitySuggestionsWithHttpOperationResponse(appId: string, versionId: string, entityId: string, options?: Models.ModelGetEntitySuggestionsOptionalParams): Promise<msRest.HttpOperationResponse<Models.EntitiesSuggestionExample[]>>;
    /**
     * Adds a list to an existing closed list.
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
    addSubListWithHttpOperationResponse(appId: string, versionId: string, clEntityId: string, wordListCreateObject: Models.WordListObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<number>>;
    /**
     * Adds a customizable prebuilt domain along with all of its models to this application.
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
    addCustomPrebuiltDomainWithHttpOperationResponse(appId: string, versionId: string, prebuiltDomainObject: Models.PrebuiltDomainCreateBaseObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string[]>>;
    /**
     * Adds a custom prebuilt intent model to the application.
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
    addCustomPrebuiltIntentWithHttpOperationResponse(appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets custom prebuilt intents information of this application.
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
    listCustomPrebuiltIntentsWithHttpOperationResponse(appId: string, versionId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.IntentClassifier[]>>;
    /**
     * Adds a custom prebuilt entity model to the application.
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
    addCustomPrebuiltEntityWithHttpOperationResponse(appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Gets all custom prebuilt entities information of this application.
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
    listCustomPrebuiltEntitiesWithHttpOperationResponse(appId: string, versionId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityExtractor[]>>;
    /**
     * Gets all custom prebuilt models information of this application.
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
    listCustomPrebuiltModelsWithHttpOperationResponse(appId: string, versionId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.CustomPrebuiltModel[]>>;
    /**
     * Deletes a prebuilt domain's models from the application.
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
    deleteCustomPrebuiltDomainWithHttpOperationResponse(appId: string, versionId: string, domainName: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Gets information about the hierarchical entity child model.
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
    getHierarchicalEntityChildWithHttpOperationResponse(appId: string, versionId: string, hEntityId: string, hChildId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.HierarchicalChildEntity>>;
    /**
     * Renames a single child in an existing hierarchical entity model.
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
    updateHierarchicalEntityChildWithHttpOperationResponse(appId: string, versionId: string, hEntityId: string, hChildId: string, hierarchicalChildModelUpdateObject: Models.HierarchicalChildModelUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Deletes a hierarchical entity extractor child from the application.
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
    deleteHierarchicalEntityChildWithHttpOperationResponse(appId: string, versionId: string, hEntityId: string, hChildId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Creates a single child in an existing hierarchical entity model.
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
    addHierarchicalEntityChildWithHttpOperationResponse(appId: string, versionId: string, hEntityId: string, hierarchicalChildModelCreateObject: Models.HierarchicalChildModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Creates a single child in an existing composite entity model.
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
    addCompositeEntityChildWithHttpOperationResponse(appId: string, versionId: string, cEntityId: string, compositeChildModelCreateObject: Models.CompositeChildModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * Deletes a composite entity extractor child from the application.
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
    deleteCompositeEntityChildWithHttpOperationResponse(appId: string, versionId: string, cEntityId: string, cChildId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Gets information about the regex entity models.
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
    getRegexEntityInfosWithHttpOperationResponse(appId: string, versionId: string, options?: Models.ModelGetRegexEntityInfosOptionalParams): Promise<msRest.HttpOperationResponse<Models.RegexEntityExtractor[]>>;
    /**
     * @summary Adds a regex entity model to the application version.
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
    createRegexEntityModelWithHttpOperationResponse(appId: string, versionId: string, regexEntityExtractorCreateObj: Models.RegexModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get information about the Pattern.Any entity models.
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
    getPatternAnyEntityInfosWithHttpOperationResponse(appId: string, versionId: string, options?: Models.ModelGetPatternAnyEntityInfosOptionalParams): Promise<msRest.HttpOperationResponse<Models.PatternAnyEntityExtractor[]>>;
    /**
     * @summary Adds a pattern.any entity extractor to the application.
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
    createPatternAnyEntityModelWithHttpOperationResponse(appId: string, versionId: string, extractorCreateObject: Models.PatternAnyModelCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get All Entity Roles for a given entity
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
    getEntityRolesWithHttpOperationResponse(appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole[]>>;
    /**
     * @summary Create an entity role for an entity in the application.
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
    createEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get All Entity Roles for a given entity
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
    getPrebuiltEntityRolesWithHttpOperationResponse(appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole[]>>;
    /**
     * @summary Create an entity role for an entity in the application.
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
    createPrebuiltEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get All Entity Roles for a given entity
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
    getClosedListEntityRolesWithHttpOperationResponse(appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole[]>>;
    /**
     * @summary Create an entity role for an entity in the application.
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
    createClosedListEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get All Entity Roles for a given entity
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
    getRegexEntityRolesWithHttpOperationResponse(appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole[]>>;
    /**
     * @summary Create an entity role for an entity in the application.
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
    createRegexEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get All Entity Roles for a given entity
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
    getCompositeEntityRolesWithHttpOperationResponse(appId: string, versionId: string, cEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole[]>>;
    /**
     * @summary Create an entity role for an entity in the application.
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
    createCompositeEntityRoleWithHttpOperationResponse(appId: string, versionId: string, cEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get All Entity Roles for a given entity
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
    getPatternAnyEntityRolesWithHttpOperationResponse(appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole[]>>;
    /**
     * @summary Create an entity role for an entity in the application.
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
    createPatternAnyEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get All Entity Roles for a given entity
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
    getHierarchicalEntityRolesWithHttpOperationResponse(appId: string, versionId: string, hEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole[]>>;
    /**
     * @summary Create an entity role for an entity in the application.
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
    createHierarchicalEntityRoleWithHttpOperationResponse(appId: string, versionId: string, hEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get All Entity Roles for a given entity
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
    getCustomPrebuiltEntityRolesWithHttpOperationResponse(appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole[]>>;
    /**
     * @summary Create an entity role for an entity in the application.
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
    createCustomPrebuiltEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<string>>;
    /**
     * @summary Get the explicit list of the pattern.any entity.
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
    getExplicitListWithHttpOperationResponse(appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.ExplicitListItem[]>>;
    /**
     * @summary Add a new item to the explicit list for the Pattern.Any entity.
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
    addExplicitListItemWithHttpOperationResponse(appId: string, versionId: string, entityId: string, item: Models.ExplicitListItemCreateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<number>>;
    /**
     * @summary Gets information of a regex entity model.
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
    getRegexEntityEntityInfoWithHttpOperationResponse(appId: string, versionId: string, regexEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.RegexEntityExtractor>>;
    /**
     * @summary Updates the regex entity model .
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
    updateRegexEntityModelWithHttpOperationResponse(appId: string, versionId: string, regexEntityId: string, regexEntityUpdateObject: Models.RegexModelUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Deletes a regex entity model from the application.
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
    deleteRegexEntityModelWithHttpOperationResponse(appId: string, versionId: string, regexEntityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Gets information about the application version's Pattern.Any model.
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
    getPatternAnyEntityInfoWithHttpOperationResponse(appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.PatternAnyEntityExtractor>>;
    /**
     * @summary Updates the name and explicit list of a Pattern.Any entity model.
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
    updatePatternAnyEntityModelWithHttpOperationResponse(appId: string, versionId: string, entityId: string, patternAnyUpdateObject: Models.PatternAnyModelUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Deletes a Pattern.Any entity extractor from the application.
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
    deletePatternAnyEntityModelWithHttpOperationResponse(appId: string, versionId: string, entityId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get one entity role for a given entity
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
    getEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole>>;
    /**
     * @summary Update an entity role for a given entity
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
    updateEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete an entity role.
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
    deleteEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get one entity role for a given entity
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
    getPrebuiltEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole>>;
    /**
     * @summary Update an entity role for a given entity
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
    updatePrebuiltEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete an entity role.
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
    deletePrebuiltEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get one entity role for a given entity
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
    getClosedListEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole>>;
    /**
     * @summary Update an entity role for a given entity
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
    updateClosedListEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete an entity role.
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
    deleteClosedListEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get one entity role for a given entity
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
    getRegexEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole>>;
    /**
     * @summary Update an entity role for a given entity
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
    updateRegexEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete an entity role.
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
    deleteRegexEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get one entity role for a given entity
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
    getCompositeEntityRoleWithHttpOperationResponse(appId: string, versionId: string, cEntityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole>>;
    /**
     * @summary Update an entity role for a given entity
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
    updateCompositeEntityRoleWithHttpOperationResponse(appId: string, versionId: string, cEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete an entity role.
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
    deleteCompositeEntityRoleWithHttpOperationResponse(appId: string, versionId: string, cEntityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get one entity role for a given entity
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
    getPatternAnyEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole>>;
    /**
     * @summary Update an entity role for a given entity
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
    updatePatternAnyEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete an entity role.
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
    deletePatternAnyEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get one entity role for a given entity
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
    getHierarchicalEntityRoleWithHttpOperationResponse(appId: string, versionId: string, hEntityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole>>;
    /**
     * @summary Update an entity role for a given entity
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
    updateHierarchicalEntityRoleWithHttpOperationResponse(appId: string, versionId: string, hEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete an entity role.
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
    deleteHierarchicalEntityRoleWithHttpOperationResponse(appId: string, versionId: string, hEntityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get one entity role for a given entity
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
    getCustomEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.EntityRole>>;
    /**
     * @summary Update an entity role for a given entity
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
    updateCustomPrebuiltEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete an entity role.
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
    deleteCustomEntityRoleWithHttpOperationResponse(appId: string, versionId: string, entityId: string, roleId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Get the explicit list of the pattern.any entity.
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
    getExplicitListItemWithHttpOperationResponse(appId: string, versionId: string, entityId: string, itemId: number, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.ExplicitListItem>>;
    /**
     * @summary Updates an explicit list item for a Pattern.Any entity.
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
    updateExplicitListItemWithHttpOperationResponse(appId: string, versionId: string, entityId: string, itemId: number, item: Models.ExplicitListItemUpdateObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * @summary Delete the explicit list item from the Pattern.any explicit list.
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
    deleteExplicitListItemWithHttpOperationResponse(appId: string, versionId: string, entityId: string, itemId: number, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Adds an intent classifier to the application.
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
    addIntent(appId: string, versionId: string, intentCreateObject: Models.ModelCreateObject): Promise<string>;
    addIntent(appId: string, versionId: string, intentCreateObject: Models.ModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    addIntent(appId: string, versionId: string, intentCreateObject: Models.ModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    addIntent(appId: string, versionId: string, intentCreateObject: Models.ModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets information about the intent models.
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
    listIntents(appId: string, versionId: string): Promise<Models.IntentClassifier[]>;
    listIntents(appId: string, versionId: string, options: Models.ModelListIntentsOptionalParams): Promise<Models.IntentClassifier[]>;
    listIntents(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.IntentClassifier[]>): void;
    listIntents(appId: string, versionId: string, options: Models.ModelListIntentsOptionalParams, callback: msRest.ServiceCallback<Models.IntentClassifier[]>): void;
    /**
     * Adds an entity extractor to the application.
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
    addEntity(appId: string, versionId: string, modelCreateObject: Models.ModelCreateObject): Promise<string>;
    addEntity(appId: string, versionId: string, modelCreateObject: Models.ModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    addEntity(appId: string, versionId: string, modelCreateObject: Models.ModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    addEntity(appId: string, versionId: string, modelCreateObject: Models.ModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets information about the entity models.
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
    listEntities(appId: string, versionId: string): Promise<Models.EntityExtractor[]>;
    listEntities(appId: string, versionId: string, options: Models.ModelListEntitiesOptionalParams): Promise<Models.EntityExtractor[]>;
    listEntities(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.EntityExtractor[]>): void;
    listEntities(appId: string, versionId: string, options: Models.ModelListEntitiesOptionalParams, callback: msRest.ServiceCallback<Models.EntityExtractor[]>): void;
    /**
     * Adds a hierarchical entity extractor to the application version.
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
    addHierarchicalEntity(appId: string, versionId: string, hierarchicalModelCreateObject: Models.HierarchicalEntityModel): Promise<string>;
    addHierarchicalEntity(appId: string, versionId: string, hierarchicalModelCreateObject: Models.HierarchicalEntityModel, options: msRest.RequestOptionsBase): Promise<string>;
    addHierarchicalEntity(appId: string, versionId: string, hierarchicalModelCreateObject: Models.HierarchicalEntityModel, callback: msRest.ServiceCallback<string>): void;
    addHierarchicalEntity(appId: string, versionId: string, hierarchicalModelCreateObject: Models.HierarchicalEntityModel, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets information about the hierarchical entity models.
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
    listHierarchicalEntities(appId: string, versionId: string): Promise<Models.HierarchicalEntityExtractor[]>;
    listHierarchicalEntities(appId: string, versionId: string, options: Models.ModelListHierarchicalEntitiesOptionalParams): Promise<Models.HierarchicalEntityExtractor[]>;
    listHierarchicalEntities(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.HierarchicalEntityExtractor[]>): void;
    listHierarchicalEntities(appId: string, versionId: string, options: Models.ModelListHierarchicalEntitiesOptionalParams, callback: msRest.ServiceCallback<Models.HierarchicalEntityExtractor[]>): void;
    /**
     * Adds a composite entity extractor to the application.
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
    addCompositeEntity(appId: string, versionId: string, compositeModelCreateObject: Models.CompositeEntityModel): Promise<string>;
    addCompositeEntity(appId: string, versionId: string, compositeModelCreateObject: Models.CompositeEntityModel, options: msRest.RequestOptionsBase): Promise<string>;
    addCompositeEntity(appId: string, versionId: string, compositeModelCreateObject: Models.CompositeEntityModel, callback: msRest.ServiceCallback<string>): void;
    addCompositeEntity(appId: string, versionId: string, compositeModelCreateObject: Models.CompositeEntityModel, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets information about the composite entity models.
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
    listCompositeEntities(appId: string, versionId: string): Promise<Models.CompositeEntityExtractor[]>;
    listCompositeEntities(appId: string, versionId: string, options: Models.ModelListCompositeEntitiesOptionalParams): Promise<Models.CompositeEntityExtractor[]>;
    listCompositeEntities(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.CompositeEntityExtractor[]>): void;
    listCompositeEntities(appId: string, versionId: string, options: Models.ModelListCompositeEntitiesOptionalParams, callback: msRest.ServiceCallback<Models.CompositeEntityExtractor[]>): void;
    /**
     * Gets information about the closedlist models.
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
    listClosedLists(appId: string, versionId: string): Promise<Models.ClosedListEntityExtractor[]>;
    listClosedLists(appId: string, versionId: string, options: Models.ModelListClosedListsOptionalParams): Promise<Models.ClosedListEntityExtractor[]>;
    listClosedLists(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.ClosedListEntityExtractor[]>): void;
    listClosedLists(appId: string, versionId: string, options: Models.ModelListClosedListsOptionalParams, callback: msRest.ServiceCallback<Models.ClosedListEntityExtractor[]>): void;
    /**
     * Adds a closed list model to the application.
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
    addClosedList(appId: string, versionId: string, closedListModelCreateObject: Models.ClosedListModelCreateObject): Promise<string>;
    addClosedList(appId: string, versionId: string, closedListModelCreateObject: Models.ClosedListModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    addClosedList(appId: string, versionId: string, closedListModelCreateObject: Models.ClosedListModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    addClosedList(appId: string, versionId: string, closedListModelCreateObject: Models.ClosedListModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Adds a list of prebuilt entity extractors to the application.
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
    addPrebuilt(appId: string, versionId: string, prebuiltExtractorNames: string[]): Promise<Models.PrebuiltEntityExtractor[]>;
    addPrebuilt(appId: string, versionId: string, prebuiltExtractorNames: string[], options: msRest.RequestOptionsBase): Promise<Models.PrebuiltEntityExtractor[]>;
    addPrebuilt(appId: string, versionId: string, prebuiltExtractorNames: string[], callback: msRest.ServiceCallback<Models.PrebuiltEntityExtractor[]>): void;
    addPrebuilt(appId: string, versionId: string, prebuiltExtractorNames: string[], options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PrebuiltEntityExtractor[]>): void;
    /**
     * Gets information about the prebuilt entity models.
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
    listPrebuilts(appId: string, versionId: string): Promise<Models.PrebuiltEntityExtractor[]>;
    listPrebuilts(appId: string, versionId: string, options: Models.ModelListPrebuiltsOptionalParams): Promise<Models.PrebuiltEntityExtractor[]>;
    listPrebuilts(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.PrebuiltEntityExtractor[]>): void;
    listPrebuilts(appId: string, versionId: string, options: Models.ModelListPrebuiltsOptionalParams, callback: msRest.ServiceCallback<Models.PrebuiltEntityExtractor[]>): void;
    /**
     * Gets all the available prebuilt entity extractors for the application.
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
    listPrebuiltEntities(appId: string, versionId: string): Promise<Models.AvailablePrebuiltEntityModel[]>;
    listPrebuiltEntities(appId: string, versionId: string, options: msRest.RequestOptionsBase): Promise<Models.AvailablePrebuiltEntityModel[]>;
    listPrebuiltEntities(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.AvailablePrebuiltEntityModel[]>): void;
    listPrebuiltEntities(appId: string, versionId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AvailablePrebuiltEntityModel[]>): void;
    /**
     * Gets information about the application version models.
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
    listModels(appId: string, versionId: string): Promise<Models.ModelInfoResponse[]>;
    listModels(appId: string, versionId: string, options: Models.ModelListModelsOptionalParams): Promise<Models.ModelInfoResponse[]>;
    listModels(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.ModelInfoResponse[]>): void;
    listModels(appId: string, versionId: string, options: Models.ModelListModelsOptionalParams, callback: msRest.ServiceCallback<Models.ModelInfoResponse[]>): void;
    /**
     * Gets the utterances for the given model in the given app version.
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
    examplesMethod(appId: string, versionId: string, modelId: string): Promise<Models.LabelTextObject[]>;
    examplesMethod(appId: string, versionId: string, modelId: string, options: Models.ModelExamplesMethodOptionalParams): Promise<Models.LabelTextObject[]>;
    examplesMethod(appId: string, versionId: string, modelId: string, callback: msRest.ServiceCallback<Models.LabelTextObject[]>): void;
    examplesMethod(appId: string, versionId: string, modelId: string, options: Models.ModelExamplesMethodOptionalParams, callback: msRest.ServiceCallback<Models.LabelTextObject[]>): void;
    /**
     * Gets information about the intent model.
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
    getIntent(appId: string, versionId: string, intentId: string): Promise<Models.IntentClassifier>;
    getIntent(appId: string, versionId: string, intentId: string, options: msRest.RequestOptionsBase): Promise<Models.IntentClassifier>;
    getIntent(appId: string, versionId: string, intentId: string, callback: msRest.ServiceCallback<Models.IntentClassifier>): void;
    getIntent(appId: string, versionId: string, intentId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.IntentClassifier>): void;
    /**
     * Updates the name of an intent classifier.
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
    updateIntent(appId: string, versionId: string, intentId: string, modelUpdateObject: Models.ModelUpdateObject): Promise<Models.OperationStatus>;
    updateIntent(appId: string, versionId: string, intentId: string, modelUpdateObject: Models.ModelUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateIntent(appId: string, versionId: string, intentId: string, modelUpdateObject: Models.ModelUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateIntent(appId: string, versionId: string, intentId: string, modelUpdateObject: Models.ModelUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes an intent classifier from the application.
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
    deleteIntent(appId: string, versionId: string, intentId: string): Promise<Models.OperationStatus>;
    deleteIntent(appId: string, versionId: string, intentId: string, options: Models.ModelDeleteIntentOptionalParams): Promise<Models.OperationStatus>;
    deleteIntent(appId: string, versionId: string, intentId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteIntent(appId: string, versionId: string, intentId: string, options: Models.ModelDeleteIntentOptionalParams, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Gets information about the entity model.
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
    getEntity(appId: string, versionId: string, entityId: string): Promise<Models.EntityExtractor>;
    getEntity(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityExtractor>;
    getEntity(appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.EntityExtractor>): void;
    getEntity(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityExtractor>): void;
    /**
     * Updates the name of an entity extractor.
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
    updateEntity(appId: string, versionId: string, entityId: string, modelUpdateObject: Models.ModelUpdateObject): Promise<Models.OperationStatus>;
    updateEntity(appId: string, versionId: string, entityId: string, modelUpdateObject: Models.ModelUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateEntity(appId: string, versionId: string, entityId: string, modelUpdateObject: Models.ModelUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateEntity(appId: string, versionId: string, entityId: string, modelUpdateObject: Models.ModelUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes an entity extractor from the application.
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
    deleteEntity(appId: string, versionId: string, entityId: string): Promise<Models.OperationStatus>;
    deleteEntity(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteEntity(appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteEntity(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Gets information about the hierarchical entity model.
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
    getHierarchicalEntity(appId: string, versionId: string, hEntityId: string): Promise<Models.HierarchicalEntityExtractor>;
    getHierarchicalEntity(appId: string, versionId: string, hEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.HierarchicalEntityExtractor>;
    getHierarchicalEntity(appId: string, versionId: string, hEntityId: string, callback: msRest.ServiceCallback<Models.HierarchicalEntityExtractor>): void;
    getHierarchicalEntity(appId: string, versionId: string, hEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.HierarchicalEntityExtractor>): void;
    /**
     * Updates the name and children of a hierarchical entity model.
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
    updateHierarchicalEntity(appId: string, versionId: string, hEntityId: string, hierarchicalModelUpdateObject: Models.HierarchicalEntityModel): Promise<Models.OperationStatus>;
    updateHierarchicalEntity(appId: string, versionId: string, hEntityId: string, hierarchicalModelUpdateObject: Models.HierarchicalEntityModel, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateHierarchicalEntity(appId: string, versionId: string, hEntityId: string, hierarchicalModelUpdateObject: Models.HierarchicalEntityModel, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateHierarchicalEntity(appId: string, versionId: string, hEntityId: string, hierarchicalModelUpdateObject: Models.HierarchicalEntityModel, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes a hierarchical entity extractor from the application version.
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
    deleteHierarchicalEntity(appId: string, versionId: string, hEntityId: string): Promise<Models.OperationStatus>;
    deleteHierarchicalEntity(appId: string, versionId: string, hEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteHierarchicalEntity(appId: string, versionId: string, hEntityId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteHierarchicalEntity(appId: string, versionId: string, hEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Gets information about the composite entity model.
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
    getCompositeEntity(appId: string, versionId: string, cEntityId: string): Promise<Models.CompositeEntityExtractor>;
    getCompositeEntity(appId: string, versionId: string, cEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.CompositeEntityExtractor>;
    getCompositeEntity(appId: string, versionId: string, cEntityId: string, callback: msRest.ServiceCallback<Models.CompositeEntityExtractor>): void;
    getCompositeEntity(appId: string, versionId: string, cEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CompositeEntityExtractor>): void;
    /**
     * Updates the composite entity extractor.
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
    updateCompositeEntity(appId: string, versionId: string, cEntityId: string, compositeModelUpdateObject: Models.CompositeEntityModel): Promise<Models.OperationStatus>;
    updateCompositeEntity(appId: string, versionId: string, cEntityId: string, compositeModelUpdateObject: Models.CompositeEntityModel, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateCompositeEntity(appId: string, versionId: string, cEntityId: string, compositeModelUpdateObject: Models.CompositeEntityModel, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateCompositeEntity(appId: string, versionId: string, cEntityId: string, compositeModelUpdateObject: Models.CompositeEntityModel, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes a composite entity extractor from the application.
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
    deleteCompositeEntity(appId: string, versionId: string, cEntityId: string): Promise<Models.OperationStatus>;
    deleteCompositeEntity(appId: string, versionId: string, cEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteCompositeEntity(appId: string, versionId: string, cEntityId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteCompositeEntity(appId: string, versionId: string, cEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Gets information of a closed list model.
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
    getClosedList(appId: string, versionId: string, clEntityId: string): Promise<Models.ClosedListEntityExtractor>;
    getClosedList(appId: string, versionId: string, clEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.ClosedListEntityExtractor>;
    getClosedList(appId: string, versionId: string, clEntityId: string, callback: msRest.ServiceCallback<Models.ClosedListEntityExtractor>): void;
    getClosedList(appId: string, versionId: string, clEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ClosedListEntityExtractor>): void;
    /**
     * Updates the closed list model.
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
    updateClosedList(appId: string, versionId: string, clEntityId: string, closedListModelUpdateObject: Models.ClosedListModelUpdateObject): Promise<Models.OperationStatus>;
    updateClosedList(appId: string, versionId: string, clEntityId: string, closedListModelUpdateObject: Models.ClosedListModelUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateClosedList(appId: string, versionId: string, clEntityId: string, closedListModelUpdateObject: Models.ClosedListModelUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateClosedList(appId: string, versionId: string, clEntityId: string, closedListModelUpdateObject: Models.ClosedListModelUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Adds a batch of sublists to an existing closedlist.
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
    patchClosedList(appId: string, versionId: string, clEntityId: string, closedListModelPatchObject: Models.ClosedListModelPatchObject): Promise<Models.OperationStatus>;
    patchClosedList(appId: string, versionId: string, clEntityId: string, closedListModelPatchObject: Models.ClosedListModelPatchObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    patchClosedList(appId: string, versionId: string, clEntityId: string, closedListModelPatchObject: Models.ClosedListModelPatchObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    patchClosedList(appId: string, versionId: string, clEntityId: string, closedListModelPatchObject: Models.ClosedListModelPatchObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes a closed list model from the application.
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
    deleteClosedList(appId: string, versionId: string, clEntityId: string): Promise<Models.OperationStatus>;
    deleteClosedList(appId: string, versionId: string, clEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteClosedList(appId: string, versionId: string, clEntityId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteClosedList(appId: string, versionId: string, clEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Gets information about the prebuilt entity model.
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
    getPrebuilt(appId: string, versionId: string, prebuiltId: string): Promise<Models.PrebuiltEntityExtractor>;
    getPrebuilt(appId: string, versionId: string, prebuiltId: string, options: msRest.RequestOptionsBase): Promise<Models.PrebuiltEntityExtractor>;
    getPrebuilt(appId: string, versionId: string, prebuiltId: string, callback: msRest.ServiceCallback<Models.PrebuiltEntityExtractor>): void;
    getPrebuilt(appId: string, versionId: string, prebuiltId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PrebuiltEntityExtractor>): void;
    /**
     * Deletes a prebuilt entity extractor from the application.
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
    deletePrebuilt(appId: string, versionId: string, prebuiltId: string): Promise<Models.OperationStatus>;
    deletePrebuilt(appId: string, versionId: string, prebuiltId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deletePrebuilt(appId: string, versionId: string, prebuiltId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deletePrebuilt(appId: string, versionId: string, prebuiltId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes a sublist of a specific closed list model.
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
    deleteSubList(appId: string, versionId: string, clEntityId: string, subListId: number): Promise<Models.OperationStatus>;
    deleteSubList(appId: string, versionId: string, clEntityId: string, subListId: number, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteSubList(appId: string, versionId: string, clEntityId: string, subListId: number, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteSubList(appId: string, versionId: string, clEntityId: string, subListId: number, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Updates one of the closed list's sublists.
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
    updateSubList(appId: string, versionId: string, clEntityId: string, subListId: number, wordListBaseUpdateObject: Models.WordListBaseUpdateObject): Promise<Models.OperationStatus>;
    updateSubList(appId: string, versionId: string, clEntityId: string, subListId: number, wordListBaseUpdateObject: Models.WordListBaseUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateSubList(appId: string, versionId: string, clEntityId: string, subListId: number, wordListBaseUpdateObject: Models.WordListBaseUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateSubList(appId: string, versionId: string, clEntityId: string, subListId: number, wordListBaseUpdateObject: Models.WordListBaseUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Suggests examples that would improve the accuracy of the intent model.
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
    getIntentSuggestions(appId: string, versionId: string, intentId: string): Promise<Models.IntentsSuggestionExample[]>;
    getIntentSuggestions(appId: string, versionId: string, intentId: string, options: Models.ModelGetIntentSuggestionsOptionalParams): Promise<Models.IntentsSuggestionExample[]>;
    getIntentSuggestions(appId: string, versionId: string, intentId: string, callback: msRest.ServiceCallback<Models.IntentsSuggestionExample[]>): void;
    getIntentSuggestions(appId: string, versionId: string, intentId: string, options: Models.ModelGetIntentSuggestionsOptionalParams, callback: msRest.ServiceCallback<Models.IntentsSuggestionExample[]>): void;
    /**
     * Get suggestion examples that would improve the accuracy of the entity model.
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
    getEntitySuggestions(appId: string, versionId: string, entityId: string): Promise<Models.EntitiesSuggestionExample[]>;
    getEntitySuggestions(appId: string, versionId: string, entityId: string, options: Models.ModelGetEntitySuggestionsOptionalParams): Promise<Models.EntitiesSuggestionExample[]>;
    getEntitySuggestions(appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.EntitiesSuggestionExample[]>): void;
    getEntitySuggestions(appId: string, versionId: string, entityId: string, options: Models.ModelGetEntitySuggestionsOptionalParams, callback: msRest.ServiceCallback<Models.EntitiesSuggestionExample[]>): void;
    /**
     * Adds a list to an existing closed list.
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
    addSubList(appId: string, versionId: string, clEntityId: string, wordListCreateObject: Models.WordListObject): Promise<number>;
    addSubList(appId: string, versionId: string, clEntityId: string, wordListCreateObject: Models.WordListObject, options: msRest.RequestOptionsBase): Promise<number>;
    addSubList(appId: string, versionId: string, clEntityId: string, wordListCreateObject: Models.WordListObject, callback: msRest.ServiceCallback<number>): void;
    addSubList(appId: string, versionId: string, clEntityId: string, wordListCreateObject: Models.WordListObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<number>): void;
    /**
     * Adds a customizable prebuilt domain along with all of its models to this application.
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
    addCustomPrebuiltDomain(appId: string, versionId: string, prebuiltDomainObject: Models.PrebuiltDomainCreateBaseObject): Promise<string[]>;
    addCustomPrebuiltDomain(appId: string, versionId: string, prebuiltDomainObject: Models.PrebuiltDomainCreateBaseObject, options: msRest.RequestOptionsBase): Promise<string[]>;
    addCustomPrebuiltDomain(appId: string, versionId: string, prebuiltDomainObject: Models.PrebuiltDomainCreateBaseObject, callback: msRest.ServiceCallback<string[]>): void;
    addCustomPrebuiltDomain(appId: string, versionId: string, prebuiltDomainObject: Models.PrebuiltDomainCreateBaseObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string[]>): void;
    /**
     * Adds a custom prebuilt intent model to the application.
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
    addCustomPrebuiltIntent(appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject): Promise<string>;
    addCustomPrebuiltIntent(appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    addCustomPrebuiltIntent(appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    addCustomPrebuiltIntent(appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets custom prebuilt intents information of this application.
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
    listCustomPrebuiltIntents(appId: string, versionId: string): Promise<Models.IntentClassifier[]>;
    listCustomPrebuiltIntents(appId: string, versionId: string, options: msRest.RequestOptionsBase): Promise<Models.IntentClassifier[]>;
    listCustomPrebuiltIntents(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.IntentClassifier[]>): void;
    listCustomPrebuiltIntents(appId: string, versionId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.IntentClassifier[]>): void;
    /**
     * Adds a custom prebuilt entity model to the application.
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
    addCustomPrebuiltEntity(appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject): Promise<string>;
    addCustomPrebuiltEntity(appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    addCustomPrebuiltEntity(appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    addCustomPrebuiltEntity(appId: string, versionId: string, prebuiltDomainModelCreateObject: Models.PrebuiltDomainModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Gets all custom prebuilt entities information of this application.
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
    listCustomPrebuiltEntities(appId: string, versionId: string): Promise<Models.EntityExtractor[]>;
    listCustomPrebuiltEntities(appId: string, versionId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityExtractor[]>;
    listCustomPrebuiltEntities(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.EntityExtractor[]>): void;
    listCustomPrebuiltEntities(appId: string, versionId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityExtractor[]>): void;
    /**
     * Gets all custom prebuilt models information of this application.
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
    listCustomPrebuiltModels(appId: string, versionId: string): Promise<Models.CustomPrebuiltModel[]>;
    listCustomPrebuiltModels(appId: string, versionId: string, options: msRest.RequestOptionsBase): Promise<Models.CustomPrebuiltModel[]>;
    listCustomPrebuiltModels(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.CustomPrebuiltModel[]>): void;
    listCustomPrebuiltModels(appId: string, versionId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CustomPrebuiltModel[]>): void;
    /**
     * Deletes a prebuilt domain's models from the application.
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
    deleteCustomPrebuiltDomain(appId: string, versionId: string, domainName: string): Promise<Models.OperationStatus>;
    deleteCustomPrebuiltDomain(appId: string, versionId: string, domainName: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteCustomPrebuiltDomain(appId: string, versionId: string, domainName: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteCustomPrebuiltDomain(appId: string, versionId: string, domainName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Gets information about the hierarchical entity child model.
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
    getHierarchicalEntityChild(appId: string, versionId: string, hEntityId: string, hChildId: string): Promise<Models.HierarchicalChildEntity>;
    getHierarchicalEntityChild(appId: string, versionId: string, hEntityId: string, hChildId: string, options: msRest.RequestOptionsBase): Promise<Models.HierarchicalChildEntity>;
    getHierarchicalEntityChild(appId: string, versionId: string, hEntityId: string, hChildId: string, callback: msRest.ServiceCallback<Models.HierarchicalChildEntity>): void;
    getHierarchicalEntityChild(appId: string, versionId: string, hEntityId: string, hChildId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.HierarchicalChildEntity>): void;
    /**
     * Renames a single child in an existing hierarchical entity model.
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
    updateHierarchicalEntityChild(appId: string, versionId: string, hEntityId: string, hChildId: string, hierarchicalChildModelUpdateObject: Models.HierarchicalChildModelUpdateObject): Promise<Models.OperationStatus>;
    updateHierarchicalEntityChild(appId: string, versionId: string, hEntityId: string, hChildId: string, hierarchicalChildModelUpdateObject: Models.HierarchicalChildModelUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateHierarchicalEntityChild(appId: string, versionId: string, hEntityId: string, hChildId: string, hierarchicalChildModelUpdateObject: Models.HierarchicalChildModelUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateHierarchicalEntityChild(appId: string, versionId: string, hEntityId: string, hChildId: string, hierarchicalChildModelUpdateObject: Models.HierarchicalChildModelUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Deletes a hierarchical entity extractor child from the application.
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
    deleteHierarchicalEntityChild(appId: string, versionId: string, hEntityId: string, hChildId: string): Promise<Models.OperationStatus>;
    deleteHierarchicalEntityChild(appId: string, versionId: string, hEntityId: string, hChildId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteHierarchicalEntityChild(appId: string, versionId: string, hEntityId: string, hChildId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteHierarchicalEntityChild(appId: string, versionId: string, hEntityId: string, hChildId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * Creates a single child in an existing hierarchical entity model.
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
    addHierarchicalEntityChild(appId: string, versionId: string, hEntityId: string, hierarchicalChildModelCreateObject: Models.HierarchicalChildModelCreateObject): Promise<string>;
    addHierarchicalEntityChild(appId: string, versionId: string, hEntityId: string, hierarchicalChildModelCreateObject: Models.HierarchicalChildModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    addHierarchicalEntityChild(appId: string, versionId: string, hEntityId: string, hierarchicalChildModelCreateObject: Models.HierarchicalChildModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    addHierarchicalEntityChild(appId: string, versionId: string, hEntityId: string, hierarchicalChildModelCreateObject: Models.HierarchicalChildModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Creates a single child in an existing composite entity model.
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
    addCompositeEntityChild(appId: string, versionId: string, cEntityId: string, compositeChildModelCreateObject: Models.CompositeChildModelCreateObject): Promise<string>;
    addCompositeEntityChild(appId: string, versionId: string, cEntityId: string, compositeChildModelCreateObject: Models.CompositeChildModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    addCompositeEntityChild(appId: string, versionId: string, cEntityId: string, compositeChildModelCreateObject: Models.CompositeChildModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    addCompositeEntityChild(appId: string, versionId: string, cEntityId: string, compositeChildModelCreateObject: Models.CompositeChildModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * Deletes a composite entity extractor child from the application.
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
    deleteCompositeEntityChild(appId: string, versionId: string, cEntityId: string, cChildId: string): Promise<Models.OperationStatus>;
    deleteCompositeEntityChild(appId: string, versionId: string, cEntityId: string, cChildId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteCompositeEntityChild(appId: string, versionId: string, cEntityId: string, cChildId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteCompositeEntityChild(appId: string, versionId: string, cEntityId: string, cChildId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Gets information about the regex entity models.
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
    getRegexEntityInfos(appId: string, versionId: string): Promise<Models.RegexEntityExtractor[]>;
    getRegexEntityInfos(appId: string, versionId: string, options: Models.ModelGetRegexEntityInfosOptionalParams): Promise<Models.RegexEntityExtractor[]>;
    getRegexEntityInfos(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.RegexEntityExtractor[]>): void;
    getRegexEntityInfos(appId: string, versionId: string, options: Models.ModelGetRegexEntityInfosOptionalParams, callback: msRest.ServiceCallback<Models.RegexEntityExtractor[]>): void;
    /**
     * @summary Adds a regex entity model to the application version.
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
    createRegexEntityModel(appId: string, versionId: string, regexEntityExtractorCreateObj: Models.RegexModelCreateObject): Promise<string>;
    createRegexEntityModel(appId: string, versionId: string, regexEntityExtractorCreateObj: Models.RegexModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createRegexEntityModel(appId: string, versionId: string, regexEntityExtractorCreateObj: Models.RegexModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    createRegexEntityModel(appId: string, versionId: string, regexEntityExtractorCreateObj: Models.RegexModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get information about the Pattern.Any entity models.
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
    getPatternAnyEntityInfos(appId: string, versionId: string): Promise<Models.PatternAnyEntityExtractor[]>;
    getPatternAnyEntityInfos(appId: string, versionId: string, options: Models.ModelGetPatternAnyEntityInfosOptionalParams): Promise<Models.PatternAnyEntityExtractor[]>;
    getPatternAnyEntityInfos(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.PatternAnyEntityExtractor[]>): void;
    getPatternAnyEntityInfos(appId: string, versionId: string, options: Models.ModelGetPatternAnyEntityInfosOptionalParams, callback: msRest.ServiceCallback<Models.PatternAnyEntityExtractor[]>): void;
    /**
     * @summary Adds a pattern.any entity extractor to the application.
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
    createPatternAnyEntityModel(appId: string, versionId: string, extractorCreateObject: Models.PatternAnyModelCreateObject): Promise<string>;
    createPatternAnyEntityModel(appId: string, versionId: string, extractorCreateObject: Models.PatternAnyModelCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createPatternAnyEntityModel(appId: string, versionId: string, extractorCreateObject: Models.PatternAnyModelCreateObject, callback: msRest.ServiceCallback<string>): void;
    createPatternAnyEntityModel(appId: string, versionId: string, extractorCreateObject: Models.PatternAnyModelCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get All Entity Roles for a given entity
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
    getEntityRoles(appId: string, versionId: string, entityId: string): Promise<Models.EntityRole[]>;
    getEntityRoles(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole[]>;
    getEntityRoles(appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    getEntityRoles(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    /**
     * @summary Create an entity role for an entity in the application.
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
    createEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject): Promise<string>;
    createEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, callback: msRest.ServiceCallback<string>): void;
    createEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get All Entity Roles for a given entity
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
    getPrebuiltEntityRoles(appId: string, versionId: string, entityId: string): Promise<Models.EntityRole[]>;
    getPrebuiltEntityRoles(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole[]>;
    getPrebuiltEntityRoles(appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    getPrebuiltEntityRoles(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    /**
     * @summary Create an entity role for an entity in the application.
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
    createPrebuiltEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject): Promise<string>;
    createPrebuiltEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createPrebuiltEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, callback: msRest.ServiceCallback<string>): void;
    createPrebuiltEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get All Entity Roles for a given entity
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
    getClosedListEntityRoles(appId: string, versionId: string, entityId: string): Promise<Models.EntityRole[]>;
    getClosedListEntityRoles(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole[]>;
    getClosedListEntityRoles(appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    getClosedListEntityRoles(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    /**
     * @summary Create an entity role for an entity in the application.
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
    createClosedListEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject): Promise<string>;
    createClosedListEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createClosedListEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, callback: msRest.ServiceCallback<string>): void;
    createClosedListEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get All Entity Roles for a given entity
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
    getRegexEntityRoles(appId: string, versionId: string, entityId: string): Promise<Models.EntityRole[]>;
    getRegexEntityRoles(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole[]>;
    getRegexEntityRoles(appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    getRegexEntityRoles(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    /**
     * @summary Create an entity role for an entity in the application.
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
    createRegexEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject): Promise<string>;
    createRegexEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createRegexEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, callback: msRest.ServiceCallback<string>): void;
    createRegexEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get All Entity Roles for a given entity
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
    getCompositeEntityRoles(appId: string, versionId: string, cEntityId: string): Promise<Models.EntityRole[]>;
    getCompositeEntityRoles(appId: string, versionId: string, cEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole[]>;
    getCompositeEntityRoles(appId: string, versionId: string, cEntityId: string, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    getCompositeEntityRoles(appId: string, versionId: string, cEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    /**
     * @summary Create an entity role for an entity in the application.
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
    createCompositeEntityRole(appId: string, versionId: string, cEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject): Promise<string>;
    createCompositeEntityRole(appId: string, versionId: string, cEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createCompositeEntityRole(appId: string, versionId: string, cEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, callback: msRest.ServiceCallback<string>): void;
    createCompositeEntityRole(appId: string, versionId: string, cEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get All Entity Roles for a given entity
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
    getPatternAnyEntityRoles(appId: string, versionId: string, entityId: string): Promise<Models.EntityRole[]>;
    getPatternAnyEntityRoles(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole[]>;
    getPatternAnyEntityRoles(appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    getPatternAnyEntityRoles(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    /**
     * @summary Create an entity role for an entity in the application.
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
    createPatternAnyEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject): Promise<string>;
    createPatternAnyEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createPatternAnyEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, callback: msRest.ServiceCallback<string>): void;
    createPatternAnyEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get All Entity Roles for a given entity
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
    getHierarchicalEntityRoles(appId: string, versionId: string, hEntityId: string): Promise<Models.EntityRole[]>;
    getHierarchicalEntityRoles(appId: string, versionId: string, hEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole[]>;
    getHierarchicalEntityRoles(appId: string, versionId: string, hEntityId: string, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    getHierarchicalEntityRoles(appId: string, versionId: string, hEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    /**
     * @summary Create an entity role for an entity in the application.
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
    createHierarchicalEntityRole(appId: string, versionId: string, hEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject): Promise<string>;
    createHierarchicalEntityRole(appId: string, versionId: string, hEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createHierarchicalEntityRole(appId: string, versionId: string, hEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, callback: msRest.ServiceCallback<string>): void;
    createHierarchicalEntityRole(appId: string, versionId: string, hEntityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get All Entity Roles for a given entity
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
    getCustomPrebuiltEntityRoles(appId: string, versionId: string, entityId: string): Promise<Models.EntityRole[]>;
    getCustomPrebuiltEntityRoles(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole[]>;
    getCustomPrebuiltEntityRoles(appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    getCustomPrebuiltEntityRoles(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole[]>): void;
    /**
     * @summary Create an entity role for an entity in the application.
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
    createCustomPrebuiltEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject): Promise<string>;
    createCustomPrebuiltEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase): Promise<string>;
    createCustomPrebuiltEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, callback: msRest.ServiceCallback<string>): void;
    createCustomPrebuiltEntityRole(appId: string, versionId: string, entityId: string, entityRoleCreateObject: Models.EntityRoleCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
    /**
     * @summary Get the explicit list of the pattern.any entity.
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
    getExplicitList(appId: string, versionId: string, entityId: string): Promise<Models.ExplicitListItem[]>;
    getExplicitList(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.ExplicitListItem[]>;
    getExplicitList(appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.ExplicitListItem[]>): void;
    getExplicitList(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ExplicitListItem[]>): void;
    /**
     * @summary Add a new item to the explicit list for the Pattern.Any entity.
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
    addExplicitListItem(appId: string, versionId: string, entityId: string, item: Models.ExplicitListItemCreateObject): Promise<number>;
    addExplicitListItem(appId: string, versionId: string, entityId: string, item: Models.ExplicitListItemCreateObject, options: msRest.RequestOptionsBase): Promise<number>;
    addExplicitListItem(appId: string, versionId: string, entityId: string, item: Models.ExplicitListItemCreateObject, callback: msRest.ServiceCallback<number>): void;
    addExplicitListItem(appId: string, versionId: string, entityId: string, item: Models.ExplicitListItemCreateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<number>): void;
    /**
     * @summary Gets information of a regex entity model.
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
    getRegexEntityEntityInfo(appId: string, versionId: string, regexEntityId: string): Promise<Models.RegexEntityExtractor>;
    getRegexEntityEntityInfo(appId: string, versionId: string, regexEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.RegexEntityExtractor>;
    getRegexEntityEntityInfo(appId: string, versionId: string, regexEntityId: string, callback: msRest.ServiceCallback<Models.RegexEntityExtractor>): void;
    getRegexEntityEntityInfo(appId: string, versionId: string, regexEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.RegexEntityExtractor>): void;
    /**
     * @summary Updates the regex entity model .
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
    updateRegexEntityModel(appId: string, versionId: string, regexEntityId: string, regexEntityUpdateObject: Models.RegexModelUpdateObject): Promise<Models.OperationStatus>;
    updateRegexEntityModel(appId: string, versionId: string, regexEntityId: string, regexEntityUpdateObject: Models.RegexModelUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateRegexEntityModel(appId: string, versionId: string, regexEntityId: string, regexEntityUpdateObject: Models.RegexModelUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateRegexEntityModel(appId: string, versionId: string, regexEntityId: string, regexEntityUpdateObject: Models.RegexModelUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Deletes a regex entity model from the application.
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
    deleteRegexEntityModel(appId: string, versionId: string, regexEntityId: string): Promise<Models.OperationStatus>;
    deleteRegexEntityModel(appId: string, versionId: string, regexEntityId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteRegexEntityModel(appId: string, versionId: string, regexEntityId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteRegexEntityModel(appId: string, versionId: string, regexEntityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Gets information about the application version's Pattern.Any model.
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
    getPatternAnyEntityInfo(appId: string, versionId: string, entityId: string): Promise<Models.PatternAnyEntityExtractor>;
    getPatternAnyEntityInfo(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.PatternAnyEntityExtractor>;
    getPatternAnyEntityInfo(appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.PatternAnyEntityExtractor>): void;
    getPatternAnyEntityInfo(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PatternAnyEntityExtractor>): void;
    /**
     * @summary Updates the name and explicit list of a Pattern.Any entity model.
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
    updatePatternAnyEntityModel(appId: string, versionId: string, entityId: string, patternAnyUpdateObject: Models.PatternAnyModelUpdateObject): Promise<Models.OperationStatus>;
    updatePatternAnyEntityModel(appId: string, versionId: string, entityId: string, patternAnyUpdateObject: Models.PatternAnyModelUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updatePatternAnyEntityModel(appId: string, versionId: string, entityId: string, patternAnyUpdateObject: Models.PatternAnyModelUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updatePatternAnyEntityModel(appId: string, versionId: string, entityId: string, patternAnyUpdateObject: Models.PatternAnyModelUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Deletes a Pattern.Any entity extractor from the application.
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
    deletePatternAnyEntityModel(appId: string, versionId: string, entityId: string): Promise<Models.OperationStatus>;
    deletePatternAnyEntityModel(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deletePatternAnyEntityModel(appId: string, versionId: string, entityId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deletePatternAnyEntityModel(appId: string, versionId: string, entityId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get one entity role for a given entity
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
    getEntityRole(appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.EntityRole>;
    getEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole>;
    getEntityRole(appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    getEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    /**
     * @summary Update an entity role for a given entity
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
    updateEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject): Promise<Models.OperationStatus>;
    updateEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete an entity role.
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
    deleteEntityRole(appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.OperationStatus>;
    deleteEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteEntityRole(appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get one entity role for a given entity
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
    getPrebuiltEntityRole(appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.EntityRole>;
    getPrebuiltEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole>;
    getPrebuiltEntityRole(appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    getPrebuiltEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    /**
     * @summary Update an entity role for a given entity
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
    updatePrebuiltEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject): Promise<Models.OperationStatus>;
    updatePrebuiltEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updatePrebuiltEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updatePrebuiltEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete an entity role.
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
    deletePrebuiltEntityRole(appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.OperationStatus>;
    deletePrebuiltEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deletePrebuiltEntityRole(appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deletePrebuiltEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get one entity role for a given entity
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
    getClosedListEntityRole(appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.EntityRole>;
    getClosedListEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole>;
    getClosedListEntityRole(appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    getClosedListEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    /**
     * @summary Update an entity role for a given entity
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
    updateClosedListEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject): Promise<Models.OperationStatus>;
    updateClosedListEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateClosedListEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateClosedListEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete an entity role.
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
    deleteClosedListEntityRole(appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.OperationStatus>;
    deleteClosedListEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteClosedListEntityRole(appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteClosedListEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get one entity role for a given entity
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
    getRegexEntityRole(appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.EntityRole>;
    getRegexEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole>;
    getRegexEntityRole(appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    getRegexEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    /**
     * @summary Update an entity role for a given entity
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
    updateRegexEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject): Promise<Models.OperationStatus>;
    updateRegexEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateRegexEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateRegexEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete an entity role.
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
    deleteRegexEntityRole(appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.OperationStatus>;
    deleteRegexEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteRegexEntityRole(appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteRegexEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get one entity role for a given entity
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
    getCompositeEntityRole(appId: string, versionId: string, cEntityId: string, roleId: string): Promise<Models.EntityRole>;
    getCompositeEntityRole(appId: string, versionId: string, cEntityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole>;
    getCompositeEntityRole(appId: string, versionId: string, cEntityId: string, roleId: string, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    getCompositeEntityRole(appId: string, versionId: string, cEntityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    /**
     * @summary Update an entity role for a given entity
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
    updateCompositeEntityRole(appId: string, versionId: string, cEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject): Promise<Models.OperationStatus>;
    updateCompositeEntityRole(appId: string, versionId: string, cEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateCompositeEntityRole(appId: string, versionId: string, cEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateCompositeEntityRole(appId: string, versionId: string, cEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete an entity role.
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
    deleteCompositeEntityRole(appId: string, versionId: string, cEntityId: string, roleId: string): Promise<Models.OperationStatus>;
    deleteCompositeEntityRole(appId: string, versionId: string, cEntityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteCompositeEntityRole(appId: string, versionId: string, cEntityId: string, roleId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteCompositeEntityRole(appId: string, versionId: string, cEntityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get one entity role for a given entity
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
    getPatternAnyEntityRole(appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.EntityRole>;
    getPatternAnyEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole>;
    getPatternAnyEntityRole(appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    getPatternAnyEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    /**
     * @summary Update an entity role for a given entity
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
    updatePatternAnyEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject): Promise<Models.OperationStatus>;
    updatePatternAnyEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updatePatternAnyEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updatePatternAnyEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete an entity role.
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
    deletePatternAnyEntityRole(appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.OperationStatus>;
    deletePatternAnyEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deletePatternAnyEntityRole(appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deletePatternAnyEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get one entity role for a given entity
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
    getHierarchicalEntityRole(appId: string, versionId: string, hEntityId: string, roleId: string): Promise<Models.EntityRole>;
    getHierarchicalEntityRole(appId: string, versionId: string, hEntityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole>;
    getHierarchicalEntityRole(appId: string, versionId: string, hEntityId: string, roleId: string, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    getHierarchicalEntityRole(appId: string, versionId: string, hEntityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    /**
     * @summary Update an entity role for a given entity
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
    updateHierarchicalEntityRole(appId: string, versionId: string, hEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject): Promise<Models.OperationStatus>;
    updateHierarchicalEntityRole(appId: string, versionId: string, hEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateHierarchicalEntityRole(appId: string, versionId: string, hEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateHierarchicalEntityRole(appId: string, versionId: string, hEntityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete an entity role.
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
    deleteHierarchicalEntityRole(appId: string, versionId: string, hEntityId: string, roleId: string): Promise<Models.OperationStatus>;
    deleteHierarchicalEntityRole(appId: string, versionId: string, hEntityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteHierarchicalEntityRole(appId: string, versionId: string, hEntityId: string, roleId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteHierarchicalEntityRole(appId: string, versionId: string, hEntityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get one entity role for a given entity
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
    getCustomEntityRole(appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.EntityRole>;
    getCustomEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.EntityRole>;
    getCustomEntityRole(appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    getCustomEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntityRole>): void;
    /**
     * @summary Update an entity role for a given entity
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
    updateCustomPrebuiltEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject): Promise<Models.OperationStatus>;
    updateCustomPrebuiltEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateCustomPrebuiltEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateCustomPrebuiltEntityRole(appId: string, versionId: string, entityId: string, roleId: string, entityRoleUpdateObject: Models.EntityRoleUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete an entity role.
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
    deleteCustomEntityRole(appId: string, versionId: string, entityId: string, roleId: string): Promise<Models.OperationStatus>;
    deleteCustomEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteCustomEntityRole(appId: string, versionId: string, entityId: string, roleId: string, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteCustomEntityRole(appId: string, versionId: string, entityId: string, roleId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Get the explicit list of the pattern.any entity.
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
    getExplicitListItem(appId: string, versionId: string, entityId: string, itemId: number): Promise<Models.ExplicitListItem>;
    getExplicitListItem(appId: string, versionId: string, entityId: string, itemId: number, options: msRest.RequestOptionsBase): Promise<Models.ExplicitListItem>;
    getExplicitListItem(appId: string, versionId: string, entityId: string, itemId: number, callback: msRest.ServiceCallback<Models.ExplicitListItem>): void;
    getExplicitListItem(appId: string, versionId: string, entityId: string, itemId: number, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ExplicitListItem>): void;
    /**
     * @summary Updates an explicit list item for a Pattern.Any entity.
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
    updateExplicitListItem(appId: string, versionId: string, entityId: string, itemId: number, item: Models.ExplicitListItemUpdateObject): Promise<Models.OperationStatus>;
    updateExplicitListItem(appId: string, versionId: string, entityId: string, itemId: number, item: Models.ExplicitListItemUpdateObject, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    updateExplicitListItem(appId: string, versionId: string, entityId: string, itemId: number, item: Models.ExplicitListItemUpdateObject, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    updateExplicitListItem(appId: string, versionId: string, entityId: string, itemId: number, item: Models.ExplicitListItemUpdateObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    /**
     * @summary Delete the explicit list item from the Pattern.any explicit list.
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
    deleteExplicitListItem(appId: string, versionId: string, entityId: string, itemId: number): Promise<Models.OperationStatus>;
    deleteExplicitListItem(appId: string, versionId: string, entityId: string, itemId: number, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteExplicitListItem(appId: string, versionId: string, entityId: string, itemId: number, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteExplicitListItem(appId: string, versionId: string, entityId: string, itemId: number, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
}
