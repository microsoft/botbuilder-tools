import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { LuisAuthoringContext } from "../luisAuthoringContext";
/** Class representing a Examples. */
export declare class Examples {
    private readonly client;
    /**
     * Create a Examples.
     * @param {LuisAuthoringContext} client Reference to the service client.
     */
    constructor(client: LuisAuthoringContext);
    /**
     * Adds a labeled example to the application.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ExampleLabelObject} exampleLabelObject An example label with the expected intent and
     * entities.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addWithHttpOperationResponse(appId: string, versionId: string, exampleLabelObject: Models.ExampleLabelObject, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.LabelExampleResponse>>;
    /**
     * Adds a batch of labeled examples to the application.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ExampleLabelObject[]} exampleLabelObjectArray Array of examples.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    batchWithHttpOperationResponse(appId: string, versionId: string, exampleLabelObjectArray: Models.ExampleLabelObject[], options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.BatchLabelExample[]>>;
    /**
     * Returns examples to be reviewed.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ExamplesListOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listWithHttpOperationResponse(appId: string, versionId: string, options?: Models.ExamplesListOptionalParams): Promise<msRest.HttpOperationResponse<Models.LabeledUtterance[]>>;
    /**
     * Deletes the labeled example with the specified ID.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {number} exampleId The example ID.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteMethodWithHttpOperationResponse(appId: string, versionId: string, exampleId: number, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.OperationStatus>>;
    /**
     * Adds a labeled example to the application.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ExampleLabelObject} exampleLabelObject An example label with the expected intent and
     * entities.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.LabelExampleResponse} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.LabelExampleResponse} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    add(appId: string, versionId: string, exampleLabelObject: Models.ExampleLabelObject): Promise<Models.LabelExampleResponse>;
    add(appId: string, versionId: string, exampleLabelObject: Models.ExampleLabelObject, options: msRest.RequestOptionsBase): Promise<Models.LabelExampleResponse>;
    add(appId: string, versionId: string, exampleLabelObject: Models.ExampleLabelObject, callback: msRest.ServiceCallback<Models.LabelExampleResponse>): void;
    add(appId: string, versionId: string, exampleLabelObject: Models.ExampleLabelObject, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.LabelExampleResponse>): void;
    /**
     * Adds a batch of labeled examples to the application.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ExampleLabelObject[]} exampleLabelObjectArray Array of examples.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.BatchLabelExample[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    batch(appId: string, versionId: string, exampleLabelObjectArray: Models.ExampleLabelObject[]): Promise<Models.BatchLabelExample[]>;
    batch(appId: string, versionId: string, exampleLabelObjectArray: Models.ExampleLabelObject[], options: msRest.RequestOptionsBase): Promise<Models.BatchLabelExample[]>;
    batch(appId: string, versionId: string, exampleLabelObjectArray: Models.ExampleLabelObject[], callback: msRest.ServiceCallback<Models.BatchLabelExample[]>): void;
    batch(appId: string, versionId: string, exampleLabelObjectArray: Models.ExampleLabelObject[], options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.BatchLabelExample[]>): void;
    /**
     * Returns examples to be reviewed.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {ExamplesListOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.LabeledUtterance[]} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    list(appId: string, versionId: string): Promise<Models.LabeledUtterance[]>;
    list(appId: string, versionId: string, options: Models.ExamplesListOptionalParams): Promise<Models.LabeledUtterance[]>;
    list(appId: string, versionId: string, callback: msRest.ServiceCallback<Models.LabeledUtterance[]>): void;
    list(appId: string, versionId: string, options: Models.ExamplesListOptionalParams, callback: msRest.ServiceCallback<Models.LabeledUtterance[]>): void;
    /**
     * Deletes the labeled example with the specified ID.
     *
     * @param {string} appId The application ID.
     *
     * @param {string} versionId The version ID.
     *
     * @param {number} exampleId The example ID.
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
    deleteMethod(appId: string, versionId: string, exampleId: number): Promise<Models.OperationStatus>;
    deleteMethod(appId: string, versionId: string, exampleId: number, options: msRest.RequestOptionsBase): Promise<Models.OperationStatus>;
    deleteMethod(appId: string, versionId: string, exampleId: number, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
    deleteMethod(appId: string, versionId: string, exampleId: number, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationStatus>): void;
}
