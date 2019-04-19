export class Apps {
    constructor(client: any);
    client: any;
    add(azureRegion: any, azureCloud: any, applicationCreateObject: any, options: any, callback: any): any;
    addCustomPrebuiltDomain(azureRegion: any, azureCloud: any, prebuiltDomainCreateObject: any, options: any, callback: any): any;
    deleteMethod(azureRegion: any, azureCloud: any, appId: any, options: any, callback: any): any;
    downloadQueryLogs(azureRegion: any, azureCloud: any, appId: any, options: any, callback: any): any;
    get(azureRegion: any, azureCloud: any, appId: any, options: any, callback: any): any;
    getPublishSettings(azureRegion: any, azureCloud: any, appId: any, options: any, callback: any): any;
    getSettings(azureRegion: any, azureCloud: any, appId: any, options: any, callback: any): any;
    importMethod(azureRegion: any, azureCloud: any, luisApp: any, options: any, callback: any): any;
    list(azureRegion: any, azureCloud: any, options: any, callback: any): any;
    listAvailableCustomPrebuiltDomains(azureRegion: any, azureCloud: any, options: any, callback: any): any;
    listAvailableCustomPrebuiltDomainsForCulture(azureRegion: any, azureCloud: any, culture: any, options: any, callback: any): any;
    listCortanaEndpoints(azureRegion: any, azureCloud: any, options: any, callback: any): any;
    listDomains(azureRegion: any, azureCloud: any, options: any, callback: any): any;
    listEndpoints(azureRegion: any, azureCloud: any, appId: any, options: any, callback: any): any;
    listSupportedCultures(azureRegion: any, azureCloud: any, options: any, callback: any): any;
    listUsageScenarios(azureRegion: any, azureCloud: any, options: any, callback: any): any;
    packagePublishedApplicationAsGzip(azureRegion: any, azureCloud: any, appId: any, slotName: any, options: any, callback: any): any;
    packageTrainedApplicationAsGzip(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    publish(azureRegion: any, azureCloud: any, appId: any, applicationPublishObject: any, options: any, callback: any): any;
    update(azureRegion: any, azureCloud: any, appId: any, applicationUpdateObject: any, options: any, callback: any): any;
    updatePublishSettings(azureRegion: any, azureCloud: any, appId: any, publishSettingUpdateObject: any, options: any, callback: any): any;
    updateSettings(azureRegion: any, azureCloud: any, appId: any, applicationSettingUpdateObject: any, options: any, callback: any): any;
}
export class AzureAccounts {
    constructor(client: any);
    client: any;
    assignToApp(azureRegion: any, azureCloud: any, appId: any, options: any, callback: any): any;
    getAssigned(azureRegion: any, azureCloud: any, appId: any, options: any, callback: any): any;
    getUserLUISAccounts(azureRegion: any, azureCloud: any, options: any, callback: any): any;
    removeFromApp(azureRegion: any, azureCloud: any, appId: any, options: any, callback: any): any;
}
export class Examples {
    constructor(client: any);
    client: any;
    add(azureRegion: any, azureCloud: any, appId: any, versionId: any, exampleLabelObject: any, options: any, callback: any): any;
    batch(azureRegion: any, azureCloud: any, appId: any, versionId: any, exampleLabelObjectArray: any, options: any, callback: any): any;
    deleteMethod(azureRegion: any, azureCloud: any, appId: any, versionId: any, exampleId: any, options: any, callback: any): any;
    list(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
}
export class Features {
    constructor(client: any);
    client: any;
    addPhraseList(azureRegion: any, azureCloud: any, appId: any, versionId: any, phraselistCreateObject: any, options: any, callback: any): any;
    createPatternFeature(azureRegion: any, azureCloud: any, appId: any, versionId: any, patternCreateObject: any, options: any, callback: any): any;
    deletePatternFeature(azureRegion: any, azureCloud: any, appId: any, versionId: any, patternId: any, options: any, callback: any): any;
    deletePhraseList(azureRegion: any, azureCloud: any, appId: any, versionId: any, phraselistId: any, options: any, callback: any): any;
    getApplicationVersionPatternFeatures(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    getPatternFeatureInfo(azureRegion: any, azureCloud: any, appId: any, versionId: any, patternId: any, options: any, callback: any): any;
    getPhraseList(azureRegion: any, azureCloud: any, appId: any, versionId: any, phraselistId: any, options: any, callback: any): any;
    list(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    listPhraseLists(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    updatePatternFeature(azureRegion: any, azureCloud: any, appId: any, versionId: any, patternId: any, patternUpdateObject: any, options: any, callback: any): any;
    updatePhraseList(azureRegion: any, azureCloud: any, appId: any, versionId: any, phraselistId: any, options: any, callback: any): any;
}
export class LuisAuthoring {
    constructor(credentials: any, options: any);
    features: any;
    examples: any;
    model: any;
    apps: any;
    versions: any;
    train: any;
    permissions: any;
    pattern: any;
    settings: any;
    azureAccounts: any;
    sendOperationRequest(operationArguments: any, operationSpec: any, callback: any): any;
    sendRequest(options: any): any;
}
export class LuisAuthoringContext {
    constructor(credentials: any, options: any);
    baseUri: any;
    requestContentType: any;
    credentials: any;
    sendOperationRequest(operationArguments: any, operationSpec: any, callback: any): any;
    sendRequest(options: any): any;
}
export const LuisAuthoringMappers: {
    AppVersionSettingObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
                value: any;
            };
            name: string;
        };
    };
    ApplicationCreateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                culture: any;
                description: any;
                domain: any;
                initialVersionId: any;
                name: any;
                usageScenario: any;
            };
            name: string;
        };
    };
    ApplicationInfoResponse: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                activeVersion: any;
                createdDateTime: any;
                culture: any;
                description: any;
                domain: any;
                endpointHitsCount: any;
                endpoints: any;
                id: any;
                name: any;
                usageScenario: any;
                versionsCount: any;
            };
            name: string;
        };
    };
    ApplicationPublishObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                isStaging: any;
                versionId: any;
            };
            name: string;
        };
    };
    ApplicationSettingUpdateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                isPublic: any;
            };
            name: string;
        };
    };
    ApplicationSettings: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                id: any;
                isPublic: any;
            };
            name: string;
        };
    };
    ApplicationUpdateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                description: any;
                name: any;
            };
            name: string;
        };
    };
    AvailableCulture: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                code: any;
                name: any;
            };
            name: string;
        };
    };
    AvailablePrebuiltEntityModel: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                description: any;
                examples: any;
                name: any;
            };
            name: string;
        };
    };
    AzureAccountInfoObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                accountName: any;
                azureSubscriptionId: any;
                resourceGroup: any;
            };
            name: string;
        };
    };
    BatchLabelExample: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                error: any;
                hasError: any;
                value: any;
            };
            name: string;
        };
    };
    ChildEntity: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                id: any;
                name: any;
            };
            name: string;
        };
    };
    ClosedList: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
                roles: any;
                subLists: any;
            };
            name: string;
        };
    };
    ClosedListEntityExtractor: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                id: any;
                name: any;
                readableType: any;
                roles: any;
                subLists: any;
                typeId: any;
            };
            name: string;
        };
    };
    ClosedListModelCreateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
                subLists: any;
            };
            name: string;
        };
    };
    ClosedListModelPatchObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                subLists: any;
            };
            name: string;
        };
    };
    ClosedListModelUpdateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
                subLists: any;
            };
            name: string;
        };
    };
    CollaboratorsArray: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                emails: any;
            };
            name: string;
        };
    };
    CompositeChildModelCreateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
            };
            name: string;
        };
    };
    CompositeEntityExtractor: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                children: any;
                id: any;
                name: any;
                readableType: any;
                roles: any;
                typeId: any;
            };
            name: string;
        };
    };
    CompositeEntityModel: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                children: any;
                name: any;
            };
            name: string;
        };
    };
    CustomPrebuiltModel: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                customPrebuiltDomainName: any;
                customPrebuiltModelName: any;
                id: any;
                name: any;
                readableType: any;
                roles: any;
                typeId: any;
            };
            name: string;
        };
    };
    EndpointInfo: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                assignedEndpointKey: any;
                endpointRegion: any;
                endpointUrl: any;
                failedRegions: any;
                isStaging: any;
                publishedDateTime: any;
                region: any;
                versionId: any;
            };
            name: string;
        };
    };
    EnqueueTrainingResponse: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                status: any;
                statusId: any;
            };
            name: string;
        };
    };
    EntitiesSuggestionExample: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                entityPredictions: any;
                intentPredictions: any;
                text: any;
                tokenizedText: any;
            };
            name: string;
        };
    };
    EntityExtractor: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                customPrebuiltDomainName: any;
                customPrebuiltModelName: any;
                id: any;
                name: any;
                readableType: any;
                roles: any;
                typeId: any;
            };
            name: string;
        };
    };
    EntityLabel: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                endTokenIndex: any;
                entityName: any;
                startTokenIndex: any;
            };
            name: string;
        };
    };
    EntityLabelObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                endCharIndex: any;
                entityName: any;
                startCharIndex: any;
            };
            name: string;
        };
    };
    EntityModelInfo: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                id: any;
                name: any;
                readableType: any;
                roles: any;
                typeId: any;
            };
            name: string;
        };
    };
    EntityPrediction: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                endTokenIndex: any;
                entityName: any;
                phrase: any;
                startTokenIndex: any;
            };
            name: string;
        };
    };
    EntityRole: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                id: any;
                name: any;
            };
            name: string;
        };
    };
    EntityRoleCreateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
            };
            name: string;
        };
    };
    EntityRoleUpdateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
            };
            name: string;
        };
    };
    ErrorResponse: {
        serializedName: string;
        type: {
            additionalProperties: {
                type: any;
            };
            className: string;
            modelProperties: {
                errorType: any;
            };
            name: string;
        };
    };
    ExampleLabelObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                entityLabels: any;
                intentName: any;
                text: any;
            };
            name: string;
        };
    };
    ExplicitListItem: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                explicitListItem: any;
                id: any;
            };
            name: string;
        };
    };
    ExplicitListItemCreateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                explicitListItem: any;
            };
            name: string;
        };
    };
    ExplicitListItemUpdateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                explicitListItem: any;
            };
            name: string;
        };
    };
    FeatureInfoObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                id: any;
                isActive: any;
                name: any;
            };
            name: string;
        };
    };
    FeaturesResponseObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                patternFeatures: any;
                phraselistFeatures: any;
            };
            name: string;
        };
    };
    HierarchicalChildEntity: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                id: any;
                name: any;
                readableType: any;
                typeId: any;
            };
            name: string;
        };
    };
    HierarchicalChildModelCreateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
            };
            name: string;
        };
    };
    HierarchicalChildModelUpdateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
            };
            name: string;
        };
    };
    HierarchicalEntityExtractor: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                children: any;
                id: any;
                name: any;
                readableType: any;
                roles: any;
                typeId: any;
            };
            name: string;
        };
    };
    HierarchicalEntityModel: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                children: any;
                name: any;
            };
            name: string;
        };
    };
    HierarchicalModel: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                children: any;
                inherits: any;
                name: any;
                roles: any;
            };
            name: string;
        };
    };
    IntentClassifier: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                customPrebuiltDomainName: any;
                customPrebuiltModelName: any;
                id: any;
                name: any;
                readableType: any;
                typeId: any;
            };
            name: string;
        };
    };
    IntentPrediction: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
                score: any;
            };
            name: string;
        };
    };
    IntentsSuggestionExample: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                entityPredictions: any;
                intentPredictions: any;
                text: any;
                tokenizedText: any;
            };
            name: string;
        };
    };
    JSONEntity: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                endPos: any;
                entity: any;
                startPos: any;
            };
            name: string;
        };
    };
    JSONModelFeature: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                activated: any;
                mode: any;
                name: any;
                words: any;
            };
            name: string;
        };
    };
    JSONRegexFeature: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                activated: any;
                name: any;
                pattern: any;
            };
            name: string;
        };
    };
    JSONUtterance: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                entities: any;
                intent: any;
                text: any;
            };
            name: string;
        };
    };
    LabelExampleResponse: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                exampleId: any;
                utteranceText: any;
            };
            name: string;
        };
    };
    LabelTextObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                id: any;
                text: any;
            };
            name: string;
        };
    };
    LabeledUtterance: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                entityLabels: any;
                entityPredictions: any;
                id: any;
                intentLabel: any;
                intentPredictions: any;
                text: any;
                tokenizedText: any;
            };
            name: string;
        };
    };
    LuisApp: {
        serializedName: string;
        type: {
            additionalProperties: {
                type: any;
            };
            className: string;
            modelProperties: {
                closedLists: any;
                composites: any;
                culture: any;
                desc: any;
                entities: any;
                intents: any;
                modelFeatures: any;
                name: any;
                patternAnyEntities: any;
                patterns: any;
                prebuiltEntities: any;
                regexEntities: any;
                regexFeatures: any;
                utterances: any;
                versionId: any;
            };
            name: string;
        };
    };
    ModelCreateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
            };
            name: string;
        };
    };
    ModelInfo: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                id: any;
                name: any;
                readableType: any;
                typeId: any;
            };
            name: string;
        };
    };
    ModelInfoResponse: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                children: any;
                customPrebuiltDomainName: any;
                customPrebuiltModelName: any;
                explicitList: any;
                id: any;
                name: any;
                readableType: any;
                regexPattern: any;
                roles: any;
                subLists: any;
                typeId: any;
            };
            name: string;
        };
    };
    ModelTrainingDetails: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                exampleCount: any;
                failureReason: any;
                status: any;
                statusId: any;
                trainingDateTime: any;
            };
            name: string;
        };
    };
    ModelTrainingInfo: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                details: any;
                modelId: any;
            };
            name: string;
        };
    };
    ModelUpdateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
            };
            name: string;
        };
    };
    OperationError: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                code: any;
                message: any;
            };
            name: string;
        };
    };
    OperationStatus: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                code: any;
                message: any;
            };
            name: string;
        };
    };
    PatternAny: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                explicitList: any;
                name: any;
                roles: any;
            };
            name: string;
        };
    };
    PatternAnyEntityExtractor: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                explicitList: any;
                id: any;
                name: any;
                readableType: any;
                roles: any;
                typeId: any;
            };
            name: string;
        };
    };
    PatternAnyModelCreateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                explicitList: any;
                name: any;
            };
            name: string;
        };
    };
    PatternAnyModelUpdateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                explicitList: any;
                name: any;
            };
            name: string;
        };
    };
    PatternCreateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
                pattern: any;
            };
            name: string;
        };
    };
    PatternFeatureInfo: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                id: any;
                isActive: any;
                name: any;
                pattern: any;
            };
            name: string;
        };
    };
    PatternRule: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                intent: any;
                pattern: any;
            };
            name: string;
        };
    };
    PatternRuleCreateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                intent: any;
                pattern: any;
            };
            name: string;
        };
    };
    PatternRuleInfo: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                id: any;
                intent: any;
                pattern: any;
            };
            name: string;
        };
    };
    PatternRuleUpdateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                id: any;
                intent: any;
                pattern: any;
            };
            name: string;
        };
    };
    PatternUpdateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                isActive: any;
                name: any;
                pattern: any;
            };
            name: string;
        };
    };
    PersonalAssistantsResponse: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                endpointKeys: any;
                endpointUrls: any;
            };
            name: string;
        };
    };
    PhraseListFeatureInfo: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                id: any;
                isActive: any;
                isExchangeable: any;
                name: any;
                phrases: any;
            };
            name: string;
        };
    };
    PhraselistCreateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                isExchangeable: any;
                name: any;
                phrases: any;
            };
            name: string;
        };
    };
    PhraselistUpdateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                isActive: any;
                isExchangeable: any;
                name: any;
                phrases: any;
            };
            name: string;
        };
    };
    PrebuiltDomain: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                culture: any;
                description: any;
                entities: any;
                examples: any;
                intents: any;
                name: any;
            };
            name: string;
        };
    };
    PrebuiltDomainCreateBaseObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                domainName: any;
            };
            name: string;
        };
    };
    PrebuiltDomainCreateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                culture: any;
                domainName: any;
            };
            name: string;
        };
    };
    PrebuiltDomainItem: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                description: any;
                examples: any;
                name: any;
            };
            name: string;
        };
    };
    PrebuiltDomainModelCreateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                domainName: any;
                modelName: any;
            };
            name: string;
        };
    };
    PrebuiltDomainObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                domainName: any;
                modelName: any;
            };
            name: string;
        };
    };
    PrebuiltEntity: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
                roles: any;
            };
            name: string;
        };
    };
    PrebuiltEntityExtractor: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                id: any;
                name: any;
                readableType: any;
                roles: any;
                typeId: any;
            };
            name: string;
        };
    };
    ProductionOrStagingEndpointInfo: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                assignedEndpointKey: any;
                endpointRegion: any;
                endpointUrl: any;
                failedRegions: any;
                isStaging: any;
                publishedDateTime: any;
                region: any;
                versionId: any;
            };
            name: string;
        };
    };
    PublishSettingUpdateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                sentimentAnalysis: any;
                speech: any;
                spellChecker: any;
            };
            name: string;
        };
    };
    PublishSettings: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                id: any;
                isSentimentAnalysisEnabled: any;
                isSpeechEnabled: any;
                isSpellCheckerEnabled: any;
            };
            name: string;
        };
    };
    RegexEntity: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
                regexPattern: any;
                roles: any;
            };
            name: string;
        };
    };
    RegexEntityExtractor: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                id: any;
                name: any;
                readableType: any;
                regexPattern: any;
                roles: any;
                typeId: any;
            };
            name: string;
        };
    };
    RegexModelCreateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
                regexPattern: any;
            };
            name: string;
        };
    };
    RegexModelUpdateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                name: any;
                regexPattern: any;
            };
            name: string;
        };
    };
    SubClosedList: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                canonicalForm: any;
                list: any;
            };
            name: string;
        };
    };
    SubClosedListResponse: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                canonicalForm: any;
                id: any;
                list: any;
            };
            name: string;
        };
    };
    TaskUpdateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                version: any;
            };
            name: string;
        };
    };
    UserAccessList: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                emails: any;
                owner: any;
            };
            name: string;
        };
    };
    UserCollaborator: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                email: any;
            };
            name: string;
        };
    };
    VersionInfo: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                assignedEndpointKey: any;
                createdDateTime: any;
                endpointHitsCount: any;
                endpointUrl: any;
                entitiesCount: any;
                externalApiKeys: any;
                intentsCount: any;
                lastModifiedDateTime: any;
                lastPublishedDateTime: any;
                lastTrainedDateTime: any;
                trainingStatus: any;
                version: any;
            };
            name: string;
        };
    };
    WordListBaseUpdateObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                canonicalForm: any;
                list: any;
            };
            name: string;
        };
    };
    WordListObject: {
        serializedName: string;
        type: {
            className: string;
            modelProperties: {
                canonicalForm: any;
                list: any;
            };
            name: string;
        };
    };
};
export const LuisAuthoringModels: {};
export class Model {
    constructor(client: any);
    client: any;
    addClosedList(azureRegion: any, azureCloud: any, appId: any, versionId: any, closedListModelCreateObject: any, options: any, callback: any): any;
    addCompositeEntity(azureRegion: any, azureCloud: any, appId: any, versionId: any, compositeModelCreateObject: any, options: any, callback: any): any;
    addCompositeEntityChild(azureRegion: any, azureCloud: any, appId: any, versionId: any, cEntityId: any, compositeChildModelCreateObject: any, options: any, callback: any): any;
    addCustomPrebuiltDomain(azureRegion: any, azureCloud: any, appId: any, versionId: any, prebuiltDomainObject: any, options: any, callback: any): any;
    addCustomPrebuiltEntity(azureRegion: any, azureCloud: any, appId: any, versionId: any, prebuiltDomainModelCreateObject: any, options: any, callback: any): any;
    addCustomPrebuiltIntent(azureRegion: any, azureCloud: any, appId: any, versionId: any, prebuiltDomainModelCreateObject: any, options: any, callback: any): any;
    addEntity(azureRegion: any, azureCloud: any, appId: any, versionId: any, modelCreateObject: any, options: any, callback: any): any;
    addExplicitListItem(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, item: any, options: any, callback: any): any;
    addHierarchicalEntity(azureRegion: any, azureCloud: any, appId: any, versionId: any, hierarchicalModelCreateObject: any, options: any, callback: any): any;
    addHierarchicalEntityChild(azureRegion: any, azureCloud: any, appId: any, versionId: any, hEntityId: any, hierarchicalChildModelCreateObject: any, options: any, callback: any): any;
    addIntent(azureRegion: any, azureCloud: any, appId: any, versionId: any, intentCreateObject: any, options: any, callback: any): any;
    addPrebuilt(azureRegion: any, azureCloud: any, appId: any, versionId: any, prebuiltExtractorNames: any, options: any, callback: any): any;
    addSubList(azureRegion: any, azureCloud: any, appId: any, versionId: any, clEntityId: any, wordListCreateObject: any, options: any, callback: any): any;
    createClosedListEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, entityRoleCreateObject: any, options: any, callback: any): any;
    createCompositeEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, cEntityId: any, entityRoleCreateObject: any, options: any, callback: any): any;
    createCustomPrebuiltEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, entityRoleCreateObject: any, options: any, callback: any): any;
    createEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, entityRoleCreateObject: any, options: any, callback: any): any;
    createHierarchicalEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, hEntityId: any, entityRoleCreateObject: any, options: any, callback: any): any;
    createPatternAnyEntityModel(azureRegion: any, azureCloud: any, appId: any, versionId: any, extractorCreateObject: any, options: any, callback: any): any;
    createPatternAnyEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, entityRoleCreateObject: any, options: any, callback: any): any;
    createPrebuiltEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, entityRoleCreateObject: any, options: any, callback: any): any;
    createRegexEntityModel(azureRegion: any, azureCloud: any, appId: any, versionId: any, regexEntityExtractorCreateObj: any, options: any, callback: any): any;
    createRegexEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, entityRoleCreateObject: any, options: any, callback: any): any;
    deleteClosedList(azureRegion: any, azureCloud: any, appId: any, versionId: any, clEntityId: any, options: any, callback: any): any;
    deleteClosedListEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, options: any, callback: any): any;
    deleteCompositeEntity(azureRegion: any, azureCloud: any, appId: any, versionId: any, cEntityId: any, options: any, callback: any): any;
    deleteCompositeEntityChild(azureRegion: any, azureCloud: any, appId: any, versionId: any, cEntityId: any, cChildId: any, options: any, callback: any): any;
    deleteCompositeEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, cEntityId: any, roleId: any, options: any, callback: any): any;
    deleteCustomEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, options: any, callback: any): any;
    deleteCustomPrebuiltDomain(azureRegion: any, azureCloud: any, appId: any, versionId: any, domainName: any, options: any, callback: any): any;
    deleteEntity(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, options: any, callback: any): any;
    deleteEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, options: any, callback: any): any;
    deleteExplicitListItem(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, itemId: any, options: any, callback: any): any;
    deleteHierarchicalEntity(azureRegion: any, azureCloud: any, appId: any, versionId: any, hEntityId: any, options: any, callback: any): any;
    deleteHierarchicalEntityChild(azureRegion: any, azureCloud: any, appId: any, versionId: any, hEntityId: any, hChildId: any, options: any, callback: any): any;
    deleteHierarchicalEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, hEntityId: any, roleId: any, options: any, callback: any): any;
    deleteIntent(azureRegion: any, azureCloud: any, appId: any, versionId: any, intentId: any, options: any, callback: any): any;
    deletePatternAnyEntityModel(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, options: any, callback: any): any;
    deletePatternAnyEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, options: any, callback: any): any;
    deletePrebuilt(azureRegion: any, azureCloud: any, appId: any, versionId: any, prebuiltId: any, options: any, callback: any): any;
    deletePrebuiltEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, options: any, callback: any): any;
    deleteRegexEntityModel(azureRegion: any, azureCloud: any, appId: any, versionId: any, regexEntityId: any, options: any, callback: any): any;
    deleteRegexEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, options: any, callback: any): any;
    deleteSubList(azureRegion: any, azureCloud: any, appId: any, versionId: any, clEntityId: any, subListId: any, options: any, callback: any): any;
    examplesMethod(azureRegion: any, azureCloud: any, appId: any, versionId: any, modelId: any, options: any, callback: any): any;
    getClosedList(azureRegion: any, azureCloud: any, appId: any, versionId: any, clEntityId: any, options: any, callback: any): any;
    getClosedListEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, options: any, callback: any): any;
    getClosedListEntityRoles(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, options: any, callback: any): any;
    getCompositeEntity(azureRegion: any, azureCloud: any, appId: any, versionId: any, cEntityId: any, options: any, callback: any): any;
    getCompositeEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, cEntityId: any, roleId: any, options: any, callback: any): any;
    getCompositeEntityRoles(azureRegion: any, azureCloud: any, appId: any, versionId: any, cEntityId: any, options: any, callback: any): any;
    getCustomEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, options: any, callback: any): any;
    getCustomPrebuiltEntityRoles(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, options: any, callback: any): any;
    getEntity(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, options: any, callback: any): any;
    getEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, options: any, callback: any): any;
    getEntityRoles(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, options: any, callback: any): any;
    getEntitySuggestions(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, options: any, callback: any): any;
    getExplicitList(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, options: any, callback: any): any;
    getExplicitListItem(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, itemId: any, options: any, callback: any): any;
    getHierarchicalEntity(azureRegion: any, azureCloud: any, appId: any, versionId: any, hEntityId: any, options: any, callback: any): any;
    getHierarchicalEntityChild(azureRegion: any, azureCloud: any, appId: any, versionId: any, hEntityId: any, hChildId: any, options: any, callback: any): any;
    getHierarchicalEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, hEntityId: any, roleId: any, options: any, callback: any): any;
    getHierarchicalEntityRoles(azureRegion: any, azureCloud: any, appId: any, versionId: any, hEntityId: any, options: any, callback: any): any;
    getIntent(azureRegion: any, azureCloud: any, appId: any, versionId: any, intentId: any, options: any, callback: any): any;
    getIntentSuggestions(azureRegion: any, azureCloud: any, appId: any, versionId: any, intentId: any, options: any, callback: any): any;
    getPatternAnyEntityInfo(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, options: any, callback: any): any;
    getPatternAnyEntityInfos(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    getPatternAnyEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, options: any, callback: any): any;
    getPatternAnyEntityRoles(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, options: any, callback: any): any;
    getPrebuilt(azureRegion: any, azureCloud: any, appId: any, versionId: any, prebuiltId: any, options: any, callback: any): any;
    getPrebuiltEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, options: any, callback: any): any;
    getPrebuiltEntityRoles(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, options: any, callback: any): any;
    getRegexEntityEntityInfo(azureRegion: any, azureCloud: any, appId: any, versionId: any, regexEntityId: any, options: any, callback: any): any;
    getRegexEntityInfos(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    getRegexEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, options: any, callback: any): any;
    getRegexEntityRoles(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, options: any, callback: any): any;
    listClosedLists(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    listCompositeEntities(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    listCustomPrebuiltEntities(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    listCustomPrebuiltIntents(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    listCustomPrebuiltModels(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    listEntities(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    listHierarchicalEntities(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    listIntents(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    listModels(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    listPrebuiltEntities(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    listPrebuilts(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    patchClosedList(azureRegion: any, azureCloud: any, appId: any, versionId: any, clEntityId: any, closedListModelPatchObject: any, options: any, callback: any): any;
    updateClosedList(azureRegion: any, azureCloud: any, appId: any, versionId: any, clEntityId: any, closedListModelUpdateObject: any, options: any, callback: any): any;
    updateClosedListEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, entityRoleUpdateObject: any, options: any, callback: any): any;
    updateCompositeEntity(azureRegion: any, azureCloud: any, appId: any, versionId: any, cEntityId: any, compositeModelUpdateObject: any, options: any, callback: any): any;
    updateCompositeEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, cEntityId: any, roleId: any, entityRoleUpdateObject: any, options: any, callback: any): any;
    updateCustomPrebuiltEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, entityRoleUpdateObject: any, options: any, callback: any): any;
    updateEntity(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, modelUpdateObject: any, options: any, callback: any): any;
    updateEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, entityRoleUpdateObject: any, options: any, callback: any): any;
    updateExplicitListItem(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, itemId: any, item: any, options: any, callback: any): any;
    updateHierarchicalEntity(azureRegion: any, azureCloud: any, appId: any, versionId: any, hEntityId: any, hierarchicalModelUpdateObject: any, options: any, callback: any): any;
    updateHierarchicalEntityChild(azureRegion: any, azureCloud: any, appId: any, versionId: any, hEntityId: any, hChildId: any, hierarchicalChildModelUpdateObject: any, options: any, callback: any): any;
    updateHierarchicalEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, hEntityId: any, roleId: any, entityRoleUpdateObject: any, options: any, callback: any): any;
    updateIntent(azureRegion: any, azureCloud: any, appId: any, versionId: any, intentId: any, modelUpdateObject: any, options: any, callback: any): any;
    updatePatternAnyEntityModel(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, patternAnyUpdateObject: any, options: any, callback: any): any;
    updatePatternAnyEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, entityRoleUpdateObject: any, options: any, callback: any): any;
    updatePrebuiltEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, entityRoleUpdateObject: any, options: any, callback: any): any;
    updateRegexEntityModel(azureRegion: any, azureCloud: any, appId: any, versionId: any, regexEntityId: any, regexEntityUpdateObject: any, options: any, callback: any): any;
    updateRegexEntityRole(azureRegion: any, azureCloud: any, appId: any, versionId: any, entityId: any, roleId: any, entityRoleUpdateObject: any, options: any, callback: any): any;
    updateSubList(azureRegion: any, azureCloud: any, appId: any, versionId: any, clEntityId: any, subListId: any, wordListBaseUpdateObject: any, options: any, callback: any): any;
}
export class Pattern {
    constructor(client: any);
    client: any;
    addPattern(azureRegion: any, azureCloud: any, appId: any, versionId: any, pattern: any, options: any, callback: any): any;
    batchAddPatterns(azureRegion: any, azureCloud: any, appId: any, versionId: any, patterns: any, options: any, callback: any): any;
    deletePattern(azureRegion: any, azureCloud: any, appId: any, versionId: any, patternId: any, options: any, callback: any): any;
    deletePatterns(azureRegion: any, azureCloud: any, appId: any, versionId: any, patternIds: any, options: any, callback: any): any;
    getIntentPatterns(azureRegion: any, azureCloud: any, appId: any, versionId: any, intentId: any, options: any, callback: any): any;
    getPatterns(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    updatePattern(azureRegion: any, azureCloud: any, appId: any, versionId: any, patternId: any, pattern: any, options: any, callback: any): any;
    updatePatterns(azureRegion: any, azureCloud: any, appId: any, versionId: any, patterns: any, options: any, callback: any): any;
}
export class Permissions {
    constructor(client: any);
    client: any;
    add(azureRegion: any, azureCloud: any, appId: any, userToAdd: any, options: any, callback: any): any;
    deleteMethod(azureRegion: any, azureCloud: any, appId: any, userToDelete: any, options: any, callback: any): any;
    list(azureRegion: any, azureCloud: any, appId: any, options: any, callback: any): any;
    update(azureRegion: any, azureCloud: any, appId: any, collaborators: any, options: any, callback: any): any;
}
export class Settings {
    constructor(client: any);
    client: any;
    list(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    update(azureRegion: any, azureCloud: any, appId: any, versionId: any, listOfAppVersionSettingObject: any, options: any, callback: any): any;
}
export class Train {
    constructor(client: any);
    client: any;
    getStatus(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    trainVersion(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
}
export class Versions {
    constructor(client: any);
    client: any;
    clone(azureRegion: any, azureCloud: any, appId: any, versionId: any, versionCloneObject: any, options: any, callback: any): any;
    deleteMethod(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    deleteUnlabelledUtterance(azureRegion: any, azureCloud: any, appId: any, versionId: any, utterance: any, options: any, callback: any): any;
    exportMethod(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    get(azureRegion: any, azureCloud: any, appId: any, versionId: any, options: any, callback: any): any;
    importMethod(azureRegion: any, azureCloud: any, appId: any, luisApp: any, options: any, callback: any): any;
    list(azureRegion: any, azureCloud: any, appId: any, options: any, callback: any): any;
    update(azureRegion: any, azureCloud: any, appId: any, versionId: any, versionUpdateObject: any, options: any, callback: any): any;
}
