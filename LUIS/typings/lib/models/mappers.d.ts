export declare const EntityLabelObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            entityName: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            startCharIndex: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            endCharIndex: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ApplicationCreateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            culture: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            domain: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            initialVersionId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            usageScenario: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PrebuiltDomainCreateBaseObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            domainName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PrebuiltDomainCreateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            domainName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            culture: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PrebuiltDomainModelCreateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            domainName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            modelName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const HierarchicalEntityModel: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            children: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CompositeEntityModel: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            children: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const JSONEntity: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            startPos: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            endPos: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            entity: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ApplicationSettingUpdateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            publicProperty: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PublishSettingUpdateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            sentimentAnalysis: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            speech: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            spellChecker: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ExampleLabelObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            text: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            entityLabels: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            intentName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PhraselistCreateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            phrases: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isExchangeable: {
                serializedName: string;
                defaultValue: boolean;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const SubClosedList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            canonicalForm: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            list: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const SubClosedListResponse: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            canonicalForm: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            list: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const ApplicationUpdateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const JSONRegexFeature: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            pattern: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            activated: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PatternUpdateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            pattern: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isActive: {
                serializedName: string;
                defaultValue: boolean;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ClosedList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            subLists: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            roles: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const WordListObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            canonicalForm: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            list: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const ClosedListModelPatchObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            subLists: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const JSONModelFeature: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            activated: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            words: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            mode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelCreateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PatternCreateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            pattern: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const WordListBaseUpdateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            canonicalForm: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            list: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const JSONUtterance: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            text: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            intent: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            entities: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const ModelUpdateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ClosedListModelUpdateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            subLists: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ClosedListModelCreateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            subLists: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const VersionInfo: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            version: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            createdDateTime: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            lastModifiedDateTime: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            lastTrainedDateTime: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            lastPublishedDateTime: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            endpointUrl: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            assignedEndpointKey: {
                serializedName: string;
                type: {
                    name: string;
                    value: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
            externalApiKeys: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            intentsCount: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            entitiesCount: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            endpointHitsCount: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            trainingStatus: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                    allowedValues: string[];
                };
            };
        };
    };
};
export declare const TaskUpdateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            version: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PhraselistUpdateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            phrases: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isActive: {
                serializedName: string;
                defaultValue: boolean;
                type: {
                    name: string;
                };
            };
            isExchangeable: {
                serializedName: string;
                defaultValue: boolean;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PrebuiltDomainObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            domainName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            modelName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const HierarchicalModel: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            children: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
            inherits: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            roles: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const ApplicationPublishObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            versionId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isStaging: {
                serializedName: string;
                defaultValue: boolean;
                type: {
                    name: string;
                };
            };
            region: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PatternAny: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            explicitList: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
            roles: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const RegexEntity: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            regexPattern: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            roles: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const PrebuiltEntity: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            roles: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const PatternRule: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            pattern: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            intent: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const LuisApp: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            additionalProperties: {
                type: {
                    name: string;
                    value: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            versionId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            desc: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            culture: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            intents: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            entities: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            closedLists: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            composites: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            patternAnyEntities: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            regexEntities: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            prebuiltEntities: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            regexFeatures: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            modelFeatures: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            patterns: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            utterances: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const EntityLabel: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            entityName: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            startTokenIndex: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            endTokenIndex: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const IntentPrediction: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            score: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const EntityPrediction: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            entityName: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            startTokenIndex: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            endTokenIndex: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            phrase: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const LabeledUtterance: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            text: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            tokenizedText: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
            intentLabel: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            entityLabels: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            intentPredictions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            entityPredictions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const IntentsSuggestionExample: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            text: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            tokenizedText: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
            intentPredictions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            entityPredictions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const EntitiesSuggestionExample: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            text: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            tokenizedText: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
            intentPredictions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            entityPredictions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const PersonalAssistantsResponse: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            endpointKeys: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
            endpointUrls: {
                serializedName: string;
                type: {
                    name: string;
                    value: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const ModelInfo: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            typeId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            readableType: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const EntityRole: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ChildEntity: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ExplicitListItem: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            explicitListItem: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelInfoResponse: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            typeId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            readableType: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            roles: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            children: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            subLists: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            customPrebuiltDomainName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            customPrebuiltModelName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            regexPattern: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            explicitList: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const EntityModelInfo: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            roles: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            id: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            typeId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            readableType: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const HierarchicalEntityExtractor: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            typeId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            readableType: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            roles: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            children: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const CompositeEntityExtractor: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            typeId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            readableType: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            roles: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            children: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const ClosedListEntityExtractor: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            typeId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            readableType: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            roles: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            subLists: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const PrebuiltEntityExtractor: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            typeId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            readableType: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            roles: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const HierarchicalChildEntity: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            typeId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            readableType: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            id: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CustomPrebuiltModel: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            typeId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            readableType: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            customPrebuiltDomainName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            customPrebuiltModelName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            roles: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const IntentClassifier: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            customPrebuiltDomainName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            customPrebuiltModelName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            id: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            typeId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            readableType: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const EntityExtractor: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            typeId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            readableType: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            roles: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            customPrebuiltDomainName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            customPrebuiltModelName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const FeatureInfoObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isActive: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PhraseListFeatureInfo: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            phrases: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isExchangeable: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isActive: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PatternFeatureInfo: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            pattern: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isActive: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const FeaturesResponseObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            phraselistFeatures: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            patternFeatures: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const LabelExampleResponse: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            utteranceText: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            exampleId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const OperationStatus: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            message: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const BatchLabelExample: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            value: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            hasError: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            error: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const ApplicationInfoResponse: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            culture: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            usageScenario: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            domain: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            versionsCount: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            createdDateTime: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            endpoints: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            endpointHitsCount: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            activeVersion: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const EndpointInfo: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            versionId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isStaging: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            endpointUrl: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            region: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            assignedEndpointKey: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            endpointRegion: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            publishedDateTime: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ProductionOrStagingEndpointInfo: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            versionId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isStaging: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            endpointUrl: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            region: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            assignedEndpointKey: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            endpointRegion: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            publishedDateTime: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const AvailableCulture: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ApplicationSettings: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isPublic: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PublishSettings: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isSentimentAnalysisEnabled: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isSpeechEnabled: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isSpellCheckerEnabled: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const AvailablePrebuiltEntityModel: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            examples: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const EnqueueTrainingResponse: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            statusId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            status: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelTrainingDetails: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            statusId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            status: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            exampleCount: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            trainingDateTime: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            failureReason: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelTrainingInfo: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            modelId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            details: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const UserAccessList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            owner: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            emails: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const UserCollaborator: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            email: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CollaboratorsArray: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            emails: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const ErrorResponse: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            additionalProperties: {
                type: {
                    name: string;
                    value: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
            errorType: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const OperationError: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            message: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PrebuiltDomainItem: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            examples: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PrebuiltDomain: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            culture: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            examples: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            intents: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            entities: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const EntityRoleCreateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const RegexModelCreateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            regexPattern: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PatternAnyModelCreateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            explicitList: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const ExplicitListItemCreateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            explicitListItem: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const RegexModelUpdateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            regexPattern: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PatternAnyModelUpdateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            explicitList: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const EntityRoleUpdateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ExplicitListItemUpdateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            explicitListItem: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PatternRuleCreateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            pattern: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            intent: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PatternRuleUpdateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            pattern: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            intent: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const RegexEntityExtractor: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            typeId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            readableType: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            roles: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            regexPattern: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PatternAnyEntityExtractor: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            typeId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            readableType: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            roles: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            explicitList: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const PatternRuleInfo: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            pattern: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            intent: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const LabelTextObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            text: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const HierarchicalChildModelUpdateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const HierarchicalChildModelCreateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CompositeChildModelCreateObject: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const FeaturesGetApplicationVersionPatternFeaturesOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const FeaturesListPhraseListsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const FeaturesListOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const FeaturesUpdatePhraseListOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            phraselistUpdateObject: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const ExamplesListOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelListIntentsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelListEntitiesOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelListHierarchicalEntitiesOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelListCompositeEntitiesOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelListClosedListsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelListPrebuiltsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelListModelsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelExamplesMethodOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelDeleteIntentOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            deleteUtterances: {
                serializedName: string;
                defaultValue: boolean;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelGetIntentSuggestionsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelGetEntitySuggestionsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelGetRegexEntityInfosOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ModelGetPatternAnyEntityInfosOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const AppsListOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const AppsImportMethodOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            appName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const VersionsCloneOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            versionCloneObject: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const VersionsListOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const VersionsImportMethodOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            versionId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PatternGetPatternsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PatternGetIntentPatternsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            skip: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
            take: {
                serializedName: string;
                defaultValue: number;
                constraints: {
                    InclusiveMaximum: number;
                    InclusiveMinimum: number;
                };
                type: {
                    name: string;
                };
            };
        };
    };
};
