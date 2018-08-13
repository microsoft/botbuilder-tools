import * as msRest from "ms-rest-js";
/**
 * @interface
 * An interface representing EntityLabelObject.
 * Defines the entity type and position of the extracted entity within the
 * example.
 *
 */
export interface EntityLabelObject {
    /**
     * @member {string} entityName The entity type.
     */
    entityName: string;
    /**
     * @member {number} startCharIndex The index within the utterance where the
     * extracted entity starts.
     */
    startCharIndex: number;
    /**
     * @member {number} endCharIndex The index within the utterance where the
     * extracted entity ends.
     */
    endCharIndex: number;
}
/**
 * @interface
 * An interface representing ApplicationCreateObject.
 * Properties for creating a new LUIS Application
 *
 */
export interface ApplicationCreateObject {
    /**
     * @member {string} culture The culture for the new application. It is the
     * language that your app understands and speaks. E.g.: "en-us". Note: the
     * culture cannot be changed after the app is created.
     */
    culture: string;
    /**
     * @member {string} [domain] The domain for the new application. Optional.
     * E.g.: Comics.
     */
    domain?: string;
    /**
     * @member {string} [description] Description of the new application.
     * Optional.
     */
    description?: string;
    /**
     * @member {string} [initialVersionId] The initial version ID. Optional.
     * Default value is: "0.1"
     */
    initialVersionId?: string;
    /**
     * @member {string} [usageScenario] Defines the scenario for the new
     * application. Optional. E.g.: IoT.
     */
    usageScenario?: string;
    /**
     * @member {string} name The name for the new application.
     */
    name: string;
}
/**
 * @interface
 * An interface representing PrebuiltDomainCreateBaseObject.
 * A model object containing the name of the custom prebuilt entity and the
 * name of the domain to which this model belongs.
 *
 */
export interface PrebuiltDomainCreateBaseObject {
    /**
     * @member {string} [domainName] The domain name.
     */
    domainName?: string;
}
/**
 * @interface
 * An interface representing PrebuiltDomainCreateObject.
 * A prebuilt domain create object containing the name and culture of the
 * domain.
 *
 */
export interface PrebuiltDomainCreateObject {
    /**
     * @member {string} [domainName] The domain name.
     */
    domainName?: string;
    /**
     * @member {string} [culture] The culture of the new domain.
     */
    culture?: string;
}
/**
 * @interface
 * An interface representing PrebuiltDomainModelCreateObject.
 * A model object containing the name of the custom prebuilt intent or entity
 * and the name of the domain to which this model belongs.
 *
 */
export interface PrebuiltDomainModelCreateObject {
    /**
     * @member {string} [domainName] The domain name.
     */
    domainName?: string;
    /**
     * @member {string} [modelName] The intent name or entity name.
     */
    modelName?: string;
}
/**
 * @interface
 * An interface representing HierarchicalEntityModel.
 * A Hierarchical Entity Extractor.
 *
 */
export interface HierarchicalEntityModel {
    /**
     * @member {string[]} [children] Child entities.
     */
    children?: string[];
    /**
     * @member {string} [name] Entity name.
     */
    name?: string;
}
/**
 * @interface
 * An interface representing CompositeEntityModel.
 * A composite entity.
 *
 */
export interface CompositeEntityModel {
    /**
     * @member {string[]} [children] Child entities.
     */
    children?: string[];
    /**
     * @member {string} [name] Entity name.
     */
    name?: string;
}
/**
 * @interface
 * An interface representing JSONEntity.
 * Exported Model - Extracted Entity from utterance.
 *
 */
export interface JSONEntity {
    /**
     * @member {number} startPos The index within the utterance where the
     * extracted entity starts.
     */
    startPos: number;
    /**
     * @member {number} endPos The index within the utterance where the extracted
     * entity ends.
     */
    endPos: number;
    /**
     * @member {string} entity The entity name.
     */
    entity: string;
}
/**
 * @interface
 * An interface representing ApplicationSettingUpdateObject.
 * Object model for updating an application's settings.
 *
 */
export interface ApplicationSettingUpdateObject {
    /**
     * @member {boolean} [publicProperty] Setting your application as public
     * allows other people to use your application's endpoint using their own
     * keys.
     */
    publicProperty?: boolean;
}
/**
 * @interface
 * An interface representing PublishSettingUpdateObject.
 * Object model for updating an application's publish settings.
 *
 */
export interface PublishSettingUpdateObject {
    /**
     * @member {boolean} [sentimentAnalysis] Setting sentiment analysis as true
     * returns the Sentiment of the input utterance along with the resopnse
     */
    sentimentAnalysis?: boolean;
    /**
     * @member {boolean} [speech] Setting speech as public enables speech priming
     * in your app
     */
    speech?: boolean;
    /**
     * @member {boolean} [spellChecker] Setting spell checker as public enables
     * spell checking the input utterance.
     */
    spellChecker?: boolean;
}
/**
 * @interface
 * An interface representing ExampleLabelObject.
 * A labeled example.
 *
 */
export interface ExampleLabelObject {
    /**
     * @member {string} [text] The sample's utterance.
     */
    text?: string;
    /**
     * @member {EntityLabelObject[]} [entityLabels] The idenfied entities within
     * the utterance.
     */
    entityLabels?: EntityLabelObject[];
    /**
     * @member {string} [intentName] The idenfitied intent representing the
     * utterance.
     */
    intentName?: string;
}
/**
 * @interface
 * An interface representing PhraselistCreateObject.
 * Object model for creating a phraselist model.
 *
 */
export interface PhraselistCreateObject {
    /**
     * @member {string} [phrases] List of comma-separated phrases that represent
     * the Phraselist.
     */
    phrases?: string;
    /**
     * @member {string} [name] The Phraselist name.
     */
    name?: string;
    /**
     * @member {boolean} [isExchangeable] An exchangeable phrase list feature are
     * serves as single feature to the LUIS underlying training algorithm. It is
     * used as a lexicon lookup feature where its value is 1 if the lexicon
     * contains a given word or 0 if it doesn’t. Think of an exchangeable as a
     * synonyms list. A non-exchangeable phrase list feature has all the phrases
     * in the list serve as separate features to the underlying training
     * algorithm. So, if you your phrase list feature contains 5 phrases, they
     * will be mapped to 5 separate features. You can think of the
     * non-exchangeable phrase list feature as an additional bag of words that
     * you are willing to add to LUIS existing vocabulary features. Think of a
     * non-exchangeable as set of different words. Default value is true. Default
     * value: true .
     */
    isExchangeable?: boolean;
}
/**
 * @interface
 * An interface representing SubClosedList.
 * Sublist of items for a Closed list.
 *
 */
export interface SubClosedList {
    /**
     * @member {string} [canonicalForm] The standard form that the list
     * represents.
     */
    canonicalForm?: string;
    /**
     * @member {string[]} [list] List of synonym words.
     */
    list?: string[];
}
/**
 * @interface
 * An interface representing SubClosedListResponse.
 * Sublist of items for a Closed list.
 *
 * @extends SubClosedList
 */
export interface SubClosedListResponse extends SubClosedList {
    /**
     * @member {number} [id] The sublist ID
     */
    id?: number;
}
/**
 * @interface
 * An interface representing ApplicationUpdateObject.
 * Object model for updating the name or description of an application.
 *
 */
export interface ApplicationUpdateObject {
    /**
     * @member {string} [name] The application's new name.
     */
    name?: string;
    /**
     * @member {string} [description] The application's new description.
     */
    description?: string;
}
/**
 * @interface
 * An interface representing JSONRegexFeature.
 * Exported Model - A Pattern feature.
 *
 */
export interface JSONRegexFeature {
    /**
     * @member {string} [pattern] The Regular Expression to match.
     */
    pattern?: string;
    /**
     * @member {boolean} [activated] Indicates if the Pattern feature is enabled.
     */
    activated?: boolean;
    /**
     * @member {string} [name] Name of the feature.
     */
    name?: string;
}
/**
 * @interface
 * An interface representing PatternUpdateObject.
 * Object model for updating an existing Pattern feature.
 *
 */
export interface PatternUpdateObject {
    /**
     * @member {string} [pattern] The Regular Expression to match.
     */
    pattern?: string;
    /**
     * @member {string} [name] Name of the feature.
     */
    name?: string;
    /**
     * @member {boolean} [isActive] Indicates if the Pattern feature is enabled.
     * Default value: true .
     */
    isActive?: boolean;
}
/**
 * @interface
 * An interface representing ClosedList.
 * Exported Model - A Closed List.
 *
 */
export interface ClosedList {
    /**
     * @member {string} [name] Name of the closed list feature.
     */
    name?: string;
    /**
     * @member {SubClosedList[]} [subLists] Sublists for the feature.
     */
    subLists?: SubClosedList[];
    /**
     * @member {string[]} [roles]
     */
    roles?: string[];
}
/**
 * @interface
 * An interface representing WordListObject.
 * Sublist of items for a Closed list.
 *
 */
export interface WordListObject {
    /**
     * @member {string} [canonicalForm] The standard form that the list
     * represents.
     */
    canonicalForm?: string;
    /**
     * @member {string[]} [list] List of synonym words.
     */
    list?: string[];
}
/**
 * @interface
 * An interface representing ClosedListModelPatchObject.
 * Object model for adding a batch of sublists to an existing closedlist.
 *
 */
export interface ClosedListModelPatchObject {
    /**
     * @member {WordListObject[]} [subLists] Sublists to add.
     */
    subLists?: WordListObject[];
}
/**
 * @interface
 * An interface representing JSONModelFeature.
 * Exported Model - Phraselist Model Feature.
 *
 */
export interface JSONModelFeature {
    /**
     * @member {boolean} [activated] Indicates if the feature is enabled.
     */
    activated?: boolean;
    /**
     * @member {string} [name] The Phraselist name.
     */
    name?: string;
    /**
     * @member {string} [words] List of comma-separated phrases that represent
     * the Phraselist.
     */
    words?: string;
    /**
     * @member {boolean} [mode] An exchangeable phrase list feature are serves as
     * single feature to the LUIS underlying training algorithm. It is used as a
     * lexicon lookup feature where its value is 1 if the lexicon contains a
     * given word or 0 if it doesn’t. Think of an exchangeable as a synonyms
     * list. A non-exchangeable phrase list feature has all the phrases in the
     * list serve as separate features to the underlying training algorithm. So,
     * if you your phrase list feature contains 5 phrases, they will be mapped to
     * 5 separate features. You can think of the non-exchangeable phrase list
     * feature as an additional bag of words that you are willing to add to LUIS
     * existing vocabulary features. Think of a non-exchangeable as set of
     * different words. Default value is true.
     */
    mode?: boolean;
}
/**
 * @interface
 * An interface representing ModelCreateObject.
 * Object model for creating a new entity extractor.
 *
 */
export interface ModelCreateObject {
    /**
     * @member {string} [name] Name of the new entity extractor.
     */
    name?: string;
}
/**
 * @interface
 * An interface representing PatternCreateObject.
 * Object model for creating a Pattern feature.
 *
 */
export interface PatternCreateObject {
    /**
     * @member {string} [pattern] The Regular Expression to match.
     */
    pattern?: string;
    /**
     * @member {string} [name] Name of the feature.
     */
    name?: string;
}
/**
 * @interface
 * An interface representing WordListBaseUpdateObject.
 * Object model for updating one of the closed list's sublists.
 *
 */
export interface WordListBaseUpdateObject {
    /**
     * @member {string} [canonicalForm] The standard form that the list
     * represents.
     */
    canonicalForm?: string;
    /**
     * @member {string[]} [list] List of synonym words.
     */
    list?: string[];
}
/**
 * @interface
 * An interface representing JSONUtterance.
 * Exported Model - Utterance that was used to train the model.
 *
 */
export interface JSONUtterance {
    /**
     * @member {string} [text] The utterance.
     */
    text?: string;
    /**
     * @member {string} [intent] The matched intent.
     */
    intent?: string;
    /**
     * @member {JSONEntity[]} [entities] The matched entities.
     */
    entities?: JSONEntity[];
}
/**
 * @interface
 * An interface representing ModelUpdateObject.
 * Object model for updating an intent classifier.
 *
 */
export interface ModelUpdateObject {
    /**
     * @member {string} [name] The entity's new name.
     */
    name?: string;
}
/**
 * @interface
 * An interface representing ClosedListModelUpdateObject.
 * Object model for updating a closed list.
 *
 */
export interface ClosedListModelUpdateObject {
    /**
     * @member {WordListObject[]} [subLists] The new sublists for the feature.
     */
    subLists?: WordListObject[];
    /**
     * @member {string} [name] The new name of the closed list feature.
     */
    name?: string;
}
/**
 * @interface
 * An interface representing ClosedListModelCreateObject.
 * Object model for creating a closed list.
 *
 */
export interface ClosedListModelCreateObject {
    /**
     * @member {WordListObject[]} [subLists] Sublists for the feature.
     */
    subLists?: WordListObject[];
    /**
     * @member {string} [name] Name of the closed list feature.
     */
    name?: string;
}
/**
 * @interface
 * An interface representing VersionInfo.
 * Object model of an application version.
 *
 */
export interface VersionInfo {
    /**
     * @member {string} version The version ID. E.g.: "0.1"
     */
    version: string;
    /**
     * @member {Date} [createdDateTime] The version's creation timestamp.
     */
    createdDateTime?: Date;
    /**
     * @member {Date} [lastModifiedDateTime] Timestamp of the last update.
     */
    lastModifiedDateTime?: Date;
    /**
     * @member {Date} [lastTrainedDateTime] Timestamp of the last time the model
     * was trained.
     */
    lastTrainedDateTime?: Date;
    /**
     * @member {Date} [lastPublishedDateTime] Timestamp when was last published.
     */
    lastPublishedDateTime?: Date;
    /**
     * @member {string} [endpointUrl] The Runtime endpoint URL for this model
     * version.
     */
    endpointUrl?: string;
    /**
     * @member {{ [propertyName: string]: string }} [assignedEndpointKey] The
     * endpoint key.
     */
    assignedEndpointKey?: {
        [propertyName: string]: string;
    };
    /**
     * @member {any} [externalApiKeys] External keys.
     */
    externalApiKeys?: any;
    /**
     * @member {number} [intentsCount] Number of intents in this model.
     */
    intentsCount?: number;
    /**
     * @member {number} [entitiesCount] Number of entities in this model.
     */
    entitiesCount?: number;
    /**
     * @member {number} [endpointHitsCount] Number of calls made to this
     * endpoint.
     */
    endpointHitsCount?: number;
    /**
     * @member {TrainingStatus} trainingStatus The current training status.
     * Possible values include: 'NeedsTraining', 'InProgress', 'Trained'
     */
    trainingStatus: TrainingStatus;
}
/**
 * @interface
 * An interface representing TaskUpdateObject.
 * Object model for cloning an application's version.
 *
 */
export interface TaskUpdateObject {
    /**
     * @member {string} [version] The new version for the cloned model.
     */
    version?: string;
}
/**
 * @interface
 * An interface representing PhraselistUpdateObject.
 * Object model for updating a Phraselist.
 *
 */
export interface PhraselistUpdateObject {
    /**
     * @member {string} [phrases] List of comma-separated phrases that represent
     * the Phraselist.
     */
    phrases?: string;
    /**
     * @member {string} [name] The Phraselist name.
     */
    name?: string;
    /**
     * @member {boolean} [isActive] Indicates if the Phraselist is enabled.
     * Default value: true .
     */
    isActive?: boolean;
    /**
     * @member {boolean} [isExchangeable] An exchangeable phrase list feature are
     * serves as single feature to the LUIS underlying training algorithm. It is
     * used as a lexicon lookup feature where its value is 1 if the lexicon
     * contains a given word or 0 if it doesn’t. Think of an exchangeable as a
     * synonyms list. A non-exchangeable phrase list feature has all the phrases
     * in the list serve as separate features to the underlying training
     * algorithm. So, if you your phrase list feature contains 5 phrases, they
     * will be mapped to 5 separate features. You can think of the
     * non-exchangeable phrase list feature as an additional bag of words that
     * you are willing to add to LUIS existing vocabulary features. Think of a
     * non-exchangeable as set of different words. Default value is true. Default
     * value: true .
     */
    isExchangeable?: boolean;
}
/**
 * @interface
 * An interface representing PrebuiltDomainObject.
 */
export interface PrebuiltDomainObject {
    /**
     * @member {string} [domainName]
     */
    domainName?: string;
    /**
     * @member {string} [modelName]
     */
    modelName?: string;
}
/**
 * @interface
 * An interface representing HierarchicalModel.
 */
export interface HierarchicalModel {
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string[]} [children]
     */
    children?: string[];
    /**
     * @member {PrebuiltDomainObject} [inherits]
     */
    inherits?: PrebuiltDomainObject;
    /**
     * @member {string[]} [roles]
     */
    roles?: string[];
}
/**
 * @interface
 * An interface representing ApplicationPublishObject.
 * Object model for publishing a specific application version.
 *
 */
export interface ApplicationPublishObject {
    /**
     * @member {string} [versionId] The version ID to publish.
     */
    versionId?: string;
    /**
     * @member {boolean} [isStaging] Indicates if the staging slot should be
     * used, instead of the Production one. Default value: false .
     */
    isStaging?: boolean;
    /**
     * @member {string} [region] The target region that the application is
     * published to.
     */
    region?: string;
}
/**
 * @interface
 * An interface representing PatternAny.
 * Pattern.Any Entity Extractor.
 *
 */
export interface PatternAny {
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string[]} [explicitList]
     */
    explicitList?: string[];
    /**
     * @member {string[]} [roles]
     */
    roles?: string[];
}
/**
 * @interface
 * An interface representing RegexEntity.
 * Regular Expression Entity Extractor.
 *
 */
export interface RegexEntity {
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string} [regexPattern]
     */
    regexPattern?: string;
    /**
     * @member {string[]} [roles]
     */
    roles?: string[];
}
/**
 * @interface
 * An interface representing PrebuiltEntity.
 * Prebuilt Entity Extractor.
 *
 */
export interface PrebuiltEntity {
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string[]} [roles]
     */
    roles?: string[];
}
/**
 * @interface
 * An interface representing PatternRule.
 * Pattern
 *
 */
export interface PatternRule {
    /**
     * @member {string} [pattern] The pattern text.
     */
    pattern?: string;
    /**
     * @member {string} [intent] The intent's name where the pattern belongs to.
     */
    intent?: string;
}
/**
 * @interface
 * An interface representing LuisApp.
 * Exported Model - An exported LUIS Application.
 *
 */
export interface LuisApp {
    /**
     * @member {{ [propertyName: string]: any }} [additionalProperties] Unmatched
     * properties from the message are deserialized this collection
     */
    additionalProperties?: {
        [propertyName: string]: any;
    };
    /**
     * @member {string} [name] The name of the application.
     */
    name?: string;
    /**
     * @member {string} [versionId] The version ID of the application that was
     * exported.
     */
    versionId?: string;
    /**
     * @member {string} [desc] The description of the application.
     */
    desc?: string;
    /**
     * @member {string} [culture] The culture of the application. E.g.: en-us.
     */
    culture?: string;
    /**
     * @member {HierarchicalModel[]} [intents] List of intents.
     */
    intents?: HierarchicalModel[];
    /**
     * @member {HierarchicalModel[]} [entities] List of entities.
     */
    entities?: HierarchicalModel[];
    /**
     * @member {ClosedList[]} [closedLists] List of closed lists.
     */
    closedLists?: ClosedList[];
    /**
     * @member {HierarchicalModel[]} [composites] List of composite entities.
     */
    composites?: HierarchicalModel[];
    /**
     * @member {PatternAny[]} [patternAnyEntities] List of Pattern.Any entities.
     */
    patternAnyEntities?: PatternAny[];
    /**
     * @member {RegexEntity[]} [regexEntities] List of regular expression
     * entities.
     */
    regexEntities?: RegexEntity[];
    /**
     * @member {PrebuiltEntity[]} [prebuiltEntities] List of prebuilt entities.
     */
    prebuiltEntities?: PrebuiltEntity[];
    /**
     * @member {JSONRegexFeature[]} [regexFeatures] List of pattern features.
     */
    regexFeatures?: JSONRegexFeature[];
    /**
     * @member {JSONModelFeature[]} [modelFeatures] List of model features.
     */
    modelFeatures?: JSONModelFeature[];
    /**
     * @member {PatternRule[]} [patterns] List of patterns.
     */
    patterns?: PatternRule[];
    /**
     * @member {JSONUtterance[]} [utterances] List of sample utterances.
     */
    utterances?: JSONUtterance[];
}
/**
 * @interface
 * An interface representing EntityLabel.
 * Defines the entity type and position of the extracted entity within the
 * example.
 *
 */
export interface EntityLabel {
    /**
     * @member {string} entityName The entity type.
     */
    entityName: string;
    /**
     * @member {number} startTokenIndex The index within the utterance where the
     * extracted entity starts.
     */
    startTokenIndex: number;
    /**
     * @member {number} endTokenIndex The index within the utterance where the
     * extracted entity ends.
     */
    endTokenIndex: number;
}
/**
 * @interface
 * An interface representing IntentPrediction.
 * A suggested intent.
 *
 */
export interface IntentPrediction {
    /**
     * @member {string} [name] The intent's name
     */
    name?: string;
    /**
     * @member {number} [score] The intent's score, based on the prediction
     * model.
     */
    score?: number;
}
/**
 * @interface
 * An interface representing EntityPrediction.
 * A suggested entity.
 *
 */
export interface EntityPrediction {
    /**
     * @member {string} entityName The entity's name
     */
    entityName: string;
    /**
     * @member {number} startTokenIndex The index within the utterance where the
     * extracted entity starts.
     */
    startTokenIndex: number;
    /**
     * @member {number} endTokenIndex The index within the utterance where the
     * extracted entity ends.
     */
    endTokenIndex: number;
    /**
     * @member {string} phrase The actual token(s) that comprise the entity.
     */
    phrase: string;
}
/**
 * @interface
 * An interface representing LabeledUtterance.
 * A prediction and label pair of an example.
 *
 */
export interface LabeledUtterance {
    /**
     * @member {number} [id] ID of Labeled Utterance.
     */
    id?: number;
    /**
     * @member {string} [text] The utterance. E.g.: what's the weather like in
     * seattle?
     */
    text?: string;
    /**
     * @member {string[]} [tokenizedText] The utterance tokenized.
     */
    tokenizedText?: string[];
    /**
     * @member {string} [intentLabel] The intent matching the example.
     */
    intentLabel?: string;
    /**
     * @member {EntityLabel[]} [entityLabels] The entities matching the example.
     */
    entityLabels?: EntityLabel[];
    /**
     * @member {IntentPrediction[]} [intentPredictions] List of suggested
     * intents.
     */
    intentPredictions?: IntentPrediction[];
    /**
     * @member {EntityPrediction[]} [entityPredictions] List of suggested
     * entities.
     */
    entityPredictions?: EntityPrediction[];
}
/**
 * @interface
 * An interface representing IntentsSuggestionExample.
 * Predicted/suggested intent.
 *
 */
export interface IntentsSuggestionExample {
    /**
     * @member {string} [text] The utterance. E.g.: what's the weather like in
     * seattle?
     */
    text?: string;
    /**
     * @member {string[]} [tokenizedText] The utterance tokenized.
     */
    tokenizedText?: string[];
    /**
     * @member {IntentPrediction[]} [intentPredictions] Predicted/suggested
     * intents.
     */
    intentPredictions?: IntentPrediction[];
    /**
     * @member {EntityPrediction[]} [entityPredictions] Predicted/suggested
     * entities.
     */
    entityPredictions?: EntityPrediction[];
}
/**
 * @interface
 * An interface representing EntitiesSuggestionExample.
 * Predicted/suggested entity.
 *
 */
export interface EntitiesSuggestionExample {
    /**
     * @member {string} [text] The utterance. E.g.: what's the weather like in
     * seattle?
     */
    text?: string;
    /**
     * @member {string[]} [tokenizedText] The utterance tokenized.
     */
    tokenizedText?: string[];
    /**
     * @member {IntentPrediction[]} [intentPredictions] Predicted/suggested
     * intents.
     */
    intentPredictions?: IntentPrediction[];
    /**
     * @member {EntityPrediction[]} [entityPredictions] Predicted/suggested
     * entities.
     */
    entityPredictions?: EntityPrediction[];
}
/**
 * @interface
 * An interface representing PersonalAssistantsResponse.
 * Response containing user's endpoint keys and the endpoint URLs of the
 * prebuilt Cortana applications.
 *
 */
export interface PersonalAssistantsResponse {
    /**
     * @member {string[]} [endpointKeys]
     */
    endpointKeys?: string[];
    /**
     * @member {{ [propertyName: string]: string }} [endpointUrls]
     */
    endpointUrls?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing ModelInfo.
 * Base type used in entity types.
 *
 */
export interface ModelInfo {
    /**
     * @member {string} id The ID of the Entity Model.
     */
    id: string;
    /**
     * @member {string} [name] Name of the Entity Model.
     */
    name?: string;
    /**
     * @member {number} [typeId] The type ID of the Entity Model.
     */
    typeId?: number;
    /**
     * @member {ReadableType} readableType Possible values include: 'Entity
     * Extractor', 'Hierarchical Entity Extractor', 'Hierarchical Child Entity
     * Extractor', 'Composite Entity Extractor', 'Closed List Entity Extractor',
     * 'Prebuilt Entity Extractor', 'Intent Classifier', 'Pattern.Any Entity
     * Extractor', 'Regex Entity Extractor'
     */
    readableType: ReadableType;
}
/**
 * @interface
 * An interface representing EntityRole.
 * Entity extractor role
 *
 */
export interface EntityRole {
    /**
     * @member {string} [id] The entity role ID.
     */
    id?: string;
    /**
     * @member {string} [name] The entity role name.
     */
    name?: string;
}
/**
 * @interface
 * An interface representing ChildEntity.
 * The base child entity type.
 *
 */
export interface ChildEntity {
    /**
     * @member {string} id The ID (GUID) belonging to a child entity.
     */
    id: string;
    /**
     * @member {string} [name] The name of a child entity.
     */
    name?: string;
}
/**
 * @interface
 * An interface representing ExplicitListItem.
 * Explicit list item
 *
 */
export interface ExplicitListItem {
    /**
     * @member {number} [id] The explicit list item ID.
     */
    id?: number;
    /**
     * @member {string} [explicitListItem] The explicit list item value.
     */
    explicitListItem?: string;
}
/**
 * @interface
 * An interface representing ModelInfoResponse.
 * An application model info.
 *
 */
export interface ModelInfoResponse {
    /**
     * @member {string} id The ID of the Entity Model.
     */
    id: string;
    /**
     * @member {string} [name] Name of the Entity Model.
     */
    name?: string;
    /**
     * @member {number} [typeId] The type ID of the Entity Model.
     */
    typeId?: number;
    /**
     * @member {ReadableType1} readableType Possible values include: 'Entity
     * Extractor', 'Hierarchical Entity Extractor', 'Hierarchical Child Entity
     * Extractor', 'Composite Entity Extractor', 'Closed List Entity Extractor',
     * 'Prebuilt Entity Extractor', 'Intent Classifier', 'Pattern.Any Entity
     * Extractor', 'Regex Entity Extractor'
     */
    readableType: ReadableType1;
    /**
     * @member {EntityRole[]} [roles]
     */
    roles?: EntityRole[];
    /**
     * @member {ChildEntity[]} [children] List of child entities.
     */
    children?: ChildEntity[];
    /**
     * @member {SubClosedListResponse[]} [subLists] List of sub-lists.
     */
    subLists?: SubClosedListResponse[];
    /**
     * @member {string} [customPrebuiltDomainName] The domain name.
     */
    customPrebuiltDomainName?: string;
    /**
     * @member {string} [customPrebuiltModelName] The intent name or entity name.
     */
    customPrebuiltModelName?: string;
    /**
     * @member {string} [regexPattern] The Regex entity pattern.
     */
    regexPattern?: string;
    /**
     * @member {ExplicitListItem[]} [explicitList]
     */
    explicitList?: ExplicitListItem[];
}
/**
 * @interface
 * An interface representing EntityModelInfo.
 * An Entity Extractor model info.
 *
 * @extends ModelInfo
 */
export interface EntityModelInfo extends ModelInfo {
    /**
     * @member {EntityRole[]} [roles]
     */
    roles?: EntityRole[];
}
/**
 * @interface
 * An interface representing HierarchicalEntityExtractor.
 * Hierarchical Entity Extractor.
 *
 */
export interface HierarchicalEntityExtractor {
    /**
     * @member {string} id The ID of the Entity Model.
     */
    id: string;
    /**
     * @member {string} [name] Name of the Entity Model.
     */
    name?: string;
    /**
     * @member {number} [typeId] The type ID of the Entity Model.
     */
    typeId?: number;
    /**
     * @member {ReadableType2} readableType Possible values include: 'Entity
     * Extractor', 'Hierarchical Entity Extractor', 'Hierarchical Child Entity
     * Extractor', 'Composite Entity Extractor', 'Closed List Entity Extractor',
     * 'Prebuilt Entity Extractor', 'Intent Classifier', 'Pattern.Any Entity
     * Extractor', 'Regex Entity Extractor'
     */
    readableType: ReadableType2;
    /**
     * @member {EntityRole[]} [roles]
     */
    roles?: EntityRole[];
    /**
     * @member {ChildEntity[]} [children] List of child entities.
     */
    children?: ChildEntity[];
}
/**
 * @interface
 * An interface representing CompositeEntityExtractor.
 * A Composite Entity Extractor.
 *
 */
export interface CompositeEntityExtractor {
    /**
     * @member {string} id The ID of the Entity Model.
     */
    id: string;
    /**
     * @member {string} [name] Name of the Entity Model.
     */
    name?: string;
    /**
     * @member {number} [typeId] The type ID of the Entity Model.
     */
    typeId?: number;
    /**
     * @member {ReadableType3} readableType Possible values include: 'Entity
     * Extractor', 'Hierarchical Entity Extractor', 'Hierarchical Child Entity
     * Extractor', 'Composite Entity Extractor', 'Closed List Entity Extractor',
     * 'Prebuilt Entity Extractor', 'Intent Classifier', 'Pattern.Any Entity
     * Extractor', 'Regex Entity Extractor'
     */
    readableType: ReadableType3;
    /**
     * @member {EntityRole[]} [roles]
     */
    roles?: EntityRole[];
    /**
     * @member {ChildEntity[]} [children] List of child entities.
     */
    children?: ChildEntity[];
}
/**
 * @interface
 * An interface representing ClosedListEntityExtractor.
 * Closed List Entity Extractor.
 *
 */
export interface ClosedListEntityExtractor {
    /**
     * @member {string} id The ID of the Entity Model.
     */
    id: string;
    /**
     * @member {string} [name] Name of the Entity Model.
     */
    name?: string;
    /**
     * @member {number} [typeId] The type ID of the Entity Model.
     */
    typeId?: number;
    /**
     * @member {ReadableType4} readableType Possible values include: 'Entity
     * Extractor', 'Hierarchical Entity Extractor', 'Hierarchical Child Entity
     * Extractor', 'Composite Entity Extractor', 'Closed List Entity Extractor',
     * 'Prebuilt Entity Extractor', 'Intent Classifier', 'Pattern.Any Entity
     * Extractor', 'Regex Entity Extractor'
     */
    readableType: ReadableType4;
    /**
     * @member {EntityRole[]} [roles]
     */
    roles?: EntityRole[];
    /**
     * @member {SubClosedListResponse[]} [subLists] List of sub-lists.
     */
    subLists?: SubClosedListResponse[];
}
/**
 * @interface
 * An interface representing PrebuiltEntityExtractor.
 * Prebuilt Entity Extractor.
 *
 */
export interface PrebuiltEntityExtractor {
    /**
     * @member {string} id The ID of the Entity Model.
     */
    id: string;
    /**
     * @member {string} [name] Name of the Entity Model.
     */
    name?: string;
    /**
     * @member {number} [typeId] The type ID of the Entity Model.
     */
    typeId?: number;
    /**
     * @member {ReadableType5} readableType Possible values include: 'Entity
     * Extractor', 'Hierarchical Entity Extractor', 'Hierarchical Child Entity
     * Extractor', 'Composite Entity Extractor', 'Closed List Entity Extractor',
     * 'Prebuilt Entity Extractor', 'Intent Classifier', 'Pattern.Any Entity
     * Extractor', 'Regex Entity Extractor'
     */
    readableType: ReadableType5;
    /**
     * @member {EntityRole[]} [roles]
     */
    roles?: EntityRole[];
}
/**
 * @interface
 * An interface representing HierarchicalChildEntity.
 * A Hierarchical Child Entity.
 *
 * @extends ChildEntity
 */
export interface HierarchicalChildEntity extends ChildEntity {
    /**
     * @member {number} [typeId] The type ID of the Entity Model.
     */
    typeId?: number;
    /**
     * @member {ReadableType6} [readableType] Possible values include: 'Entity
     * Extractor', 'Hierarchical Entity Extractor', 'Hierarchical Child Entity
     * Extractor', 'Composite Entity Extractor', 'Closed List Entity Extractor',
     * 'Prebuilt Entity Extractor', 'Intent Classifier', 'Pattern.Any Entity
     * Extractor', 'Regex Entity Extractor'
     */
    readableType?: ReadableType6;
}
/**
 * @interface
 * An interface representing CustomPrebuiltModel.
 * A Custom Prebuilt model.
 *
 */
export interface CustomPrebuiltModel {
    /**
     * @member {string} id The ID of the Entity Model.
     */
    id: string;
    /**
     * @member {string} [name] Name of the Entity Model.
     */
    name?: string;
    /**
     * @member {number} [typeId] The type ID of the Entity Model.
     */
    typeId?: number;
    /**
     * @member {ReadableType7} readableType Possible values include: 'Entity
     * Extractor', 'Hierarchical Entity Extractor', 'Hierarchical Child Entity
     * Extractor', 'Composite Entity Extractor', 'Closed List Entity Extractor',
     * 'Prebuilt Entity Extractor', 'Intent Classifier', 'Pattern.Any Entity
     * Extractor', 'Regex Entity Extractor'
     */
    readableType: ReadableType7;
    /**
     * @member {string} [customPrebuiltDomainName] The domain name.
     */
    customPrebuiltDomainName?: string;
    /**
     * @member {string} [customPrebuiltModelName] The intent name or entity name.
     */
    customPrebuiltModelName?: string;
    /**
     * @member {EntityRole[]} [roles]
     */
    roles?: EntityRole[];
}
/**
 * @interface
 * An interface representing IntentClassifier.
 * Intent Classifier.
 *
 * @extends ModelInfo
 */
export interface IntentClassifier extends ModelInfo {
    /**
     * @member {string} [customPrebuiltDomainName] The domain name.
     */
    customPrebuiltDomainName?: string;
    /**
     * @member {string} [customPrebuiltModelName] The intent name or entity name.
     */
    customPrebuiltModelName?: string;
}
/**
 * @interface
 * An interface representing EntityExtractor.
 * Entity Extractor.
 *
 */
export interface EntityExtractor {
    /**
     * @member {string} id The ID of the Entity Model.
     */
    id: string;
    /**
     * @member {string} [name] Name of the Entity Model.
     */
    name?: string;
    /**
     * @member {number} [typeId] The type ID of the Entity Model.
     */
    typeId?: number;
    /**
     * @member {ReadableType8} readableType Possible values include: 'Entity
     * Extractor', 'Hierarchical Entity Extractor', 'Hierarchical Child Entity
     * Extractor', 'Composite Entity Extractor', 'Closed List Entity Extractor',
     * 'Prebuilt Entity Extractor', 'Intent Classifier', 'Pattern.Any Entity
     * Extractor', 'Regex Entity Extractor'
     */
    readableType: ReadableType8;
    /**
     * @member {EntityRole[]} [roles]
     */
    roles?: EntityRole[];
    /**
     * @member {string} [customPrebuiltDomainName] The domain name.
     */
    customPrebuiltDomainName?: string;
    /**
     * @member {string} [customPrebuiltModelName] The intent name or entity name.
     */
    customPrebuiltModelName?: string;
}
/**
 * @interface
 * An interface representing FeatureInfoObject.
 * The base class Features-related response objects inherit from.
 *
 */
export interface FeatureInfoObject {
    /**
     * @member {number} [id] A six-digit ID used for Features.
     */
    id?: number;
    /**
     * @member {string} [name] The name of the Feature.
     */
    name?: string;
    /**
     * @member {boolean} [isActive] Indicates if the feature is enabled.
     */
    isActive?: boolean;
}
/**
 * @interface
 * An interface representing PhraseListFeatureInfo.
 * Phraselist Feature.
 *
 * @extends FeatureInfoObject
 */
export interface PhraseListFeatureInfo extends FeatureInfoObject {
    /**
     * @member {string} [phrases] A list of comma-separated values.
     */
    phrases?: string;
    /**
     * @member {boolean} [isExchangeable] An exchangeable phrase list feature are
     * serves as single feature to the LUIS underlying training algorithm. It is
     * used as a lexicon lookup feature where its value is 1 if the lexicon
     * contains a given word or 0 if it doesn’t. Think of an exchangeable as a
     * synonyms list. A non-exchangeable phrase list feature has all the phrases
     * in the list serve as separate features to the underlying training
     * algorithm. So, if you your phrase list feature contains 5 phrases, they
     * will be mapped to 5 separate features. You can think of the
     * non-exchangeable phrase list feature as an additional bag of words that
     * you are willing to add to LUIS existing vocabulary features. Think of a
     * non-exchangeable as set of different words. Default value is true.
     */
    isExchangeable?: boolean;
}
/**
 * @interface
 * An interface representing PatternFeatureInfo.
 * Pattern feature.
 *
 * @extends FeatureInfoObject
 */
export interface PatternFeatureInfo extends FeatureInfoObject {
    /**
     * @member {string} [pattern] The Regular Expression to match.
     */
    pattern?: string;
}
/**
 * @interface
 * An interface representing FeaturesResponseObject.
 * Model Features, including Patterns and Phraselists.
 *
 */
export interface FeaturesResponseObject {
    /**
     * @member {PhraseListFeatureInfo[]} [phraselistFeatures]
     */
    phraselistFeatures?: PhraseListFeatureInfo[];
    /**
     * @member {PatternFeatureInfo[]} [patternFeatures]
     */
    patternFeatures?: PatternFeatureInfo[];
}
/**
 * @interface
 * An interface representing LabelExampleResponse.
 * Response when adding a labeled example.
 *
 */
export interface LabelExampleResponse {
    /**
     * @member {string} [utteranceText] The sample's utterance.
     */
    utteranceText?: string;
    /**
     * @member {number} [exampleId] The newly created sample ID.
     */
    exampleId?: number;
}
/**
 * @interface
 * An interface representing OperationStatus.
 * Response of an Operation status.
 *
 */
export interface OperationStatus {
    /**
     * @member {OperationStatusType} [code] Status Code. Possible values include:
     * 'Failed', 'FAILED', 'Success'
     */
    code?: OperationStatusType;
    /**
     * @member {string} [message] Status details.
     */
    message?: string;
}
/**
 * @interface
 * An interface representing BatchLabelExample.
 * Response when adding a batch of labeled examples.
 *
 */
export interface BatchLabelExample {
    /**
     * @member {LabelExampleResponse} [value]
     */
    value?: LabelExampleResponse;
    /**
     * @member {boolean} [hasError]
     */
    hasError?: boolean;
    /**
     * @member {OperationStatus} [error]
     */
    error?: OperationStatus;
}
/**
 * @interface
 * An interface representing ApplicationInfoResponse.
 * Response containing the Application Info.
 *
 */
export interface ApplicationInfoResponse {
    /**
     * @member {string} [id] The ID (GUID) of the application.
     */
    id?: string;
    /**
     * @member {string} [name] The name of the application.
     */
    name?: string;
    /**
     * @member {string} [description] The description of the application.
     */
    description?: string;
    /**
     * @member {string} [culture] The culture of the application. E.g.: en-us.
     */
    culture?: string;
    /**
     * @member {string} [usageScenario] Defines the scenario for the new
     * application. Optional. E.g.: IoT.
     */
    usageScenario?: string;
    /**
     * @member {string} [domain] The domain for the new application. Optional.
     * E.g.: Comics.
     */
    domain?: string;
    /**
     * @member {number} [versionsCount] Amount of model versions within the
     * application.
     */
    versionsCount?: number;
    /**
     * @member {string} [createdDateTime] The version's creation timestamp.
     */
    createdDateTime?: string;
    /**
     * @member {any} [endpoints] The Runtime endpoint URL for this model version.
     */
    endpoints?: any;
    /**
     * @member {number} [endpointHitsCount] Number of calls made to this
     * endpoint.
     */
    endpointHitsCount?: number;
    /**
     * @member {string} [activeVersion] The version ID currently marked as
     * active.
     */
    activeVersion?: string;
}
/**
 * @interface
 * An interface representing EndpointInfo.
 * The base class "ProductionOrStagingEndpointInfo" inherits from.
 *
 */
export interface EndpointInfo {
    /**
     * @member {string} [versionId] The version ID to publish.
     */
    versionId?: string;
    /**
     * @member {boolean} [isStaging] Indicates if the staging slot should be
     * used, instead of the Production one.
     */
    isStaging?: boolean;
    /**
     * @member {string} [endpointUrl] The Runtime endpoint URL for this model
     * version.
     */
    endpointUrl?: string;
    /**
     * @member {string} [region] The target region that the application is
     * published to.
     */
    region?: string;
    /**
     * @member {string} [assignedEndpointKey] The endpoint key.
     */
    assignedEndpointKey?: string;
    /**
     * @member {string} [endpointRegion] The endpoint's region.
     */
    endpointRegion?: string;
    /**
     * @member {string} [publishedDateTime] Timestamp when was last published.
     */
    publishedDateTime?: string;
}
/**
 * @interface
 * An interface representing ProductionOrStagingEndpointInfo.
 * @extends EndpointInfo
 */
export interface ProductionOrStagingEndpointInfo extends EndpointInfo {
}
/**
 * @interface
 * An interface representing AvailableCulture.
 * Available culture for using in a new application.
 *
 */
export interface AvailableCulture {
    /**
     * @member {string} [name] The language name.
     */
    name?: string;
    /**
     * @member {string} [code] The ISO value for the language.
     */
    code?: string;
}
/**
 * @interface
 * An interface representing ApplicationSettings.
 * The application settings.
 *
 */
export interface ApplicationSettings {
    /**
     * @member {string} id The application ID.
     */
    id: string;
    /**
     * @member {boolean} isPublic Setting your application as public allows other
     * people to use your application's endpoint using their own keys.
     */
    isPublic: boolean;
}
/**
 * @interface
 * An interface representing PublishSettings.
 * The application publish settings.
 *
 */
export interface PublishSettings {
    /**
     * @member {string} id The application ID.
     */
    id: string;
    /**
     * @member {boolean} isSentimentAnalysisEnabled Setting sentiment analysis as
     * true returns the Sentiment of the input utterance along with the resopnse
     */
    isSentimentAnalysisEnabled: boolean;
    /**
     * @member {boolean} isSpeechEnabled Setting speech as public enables speech
     * priming in your app
     */
    isSpeechEnabled: boolean;
    /**
     * @member {boolean} isSpellCheckerEnabled Setting spell checker as public
     * enables spell checking the input utterance.
     */
    isSpellCheckerEnabled: boolean;
}
/**
 * @interface
 * An interface representing AvailablePrebuiltEntityModel.
 * Available Prebuilt entity model for using in an application.
 *
 */
export interface AvailablePrebuiltEntityModel {
    /**
     * @member {string} [name] The entity name.
     */
    name?: string;
    /**
     * @member {string} [description] The entity description and usage
     * information.
     */
    description?: string;
    /**
     * @member {string} [examples] Usage examples.
     */
    examples?: string;
}
/**
 * @interface
 * An interface representing EnqueueTrainingResponse.
 * Response model when requesting to train the model.
 *
 */
export interface EnqueueTrainingResponse {
    /**
     * @member {number} [statusId] The train request status ID.
     */
    statusId?: number;
    /**
     * @member {Status} [status] Possible values include: 'Queued', 'InProgress',
     * 'UpToDate', 'Fail', 'Success'
     */
    status?: Status;
}
/**
 * @interface
 * An interface representing ModelTrainingDetails.
 * Model Training Details.
 *
 */
export interface ModelTrainingDetails {
    /**
     * @member {number} [statusId] The train request status ID.
     */
    statusId?: number;
    /**
     * @member {Status1} [status] Possible values include: 'Queued',
     * 'InProgress', 'UpToDate', 'Fail', 'Success'
     */
    status?: Status1;
    /**
     * @member {number} [exampleCount] The count of examples used to train the
     * model.
     */
    exampleCount?: number;
    /**
     * @member {Date} [trainingDateTime] When the model was trained.
     */
    trainingDateTime?: Date;
    /**
     * @member {string} [failureReason] Reason for the training failure.
     */
    failureReason?: string;
}
/**
 * @interface
 * An interface representing ModelTrainingInfo.
 * Model Training Info.
 *
 */
export interface ModelTrainingInfo {
    /**
     * @member {string} [modelId] The ID (GUID) of the model.
     */
    modelId?: string;
    /**
     * @member {ModelTrainingDetails} [details]
     */
    details?: ModelTrainingDetails;
}
/**
 * @interface
 * An interface representing UserAccessList.
 * List of user permissions.
 *
 */
export interface UserAccessList {
    /**
     * @member {string} [owner] The email address of owner of the application.
     */
    owner?: string;
    /**
     * @member {string[]} [emails]
     */
    emails?: string[];
}
/**
 * @interface
 * An interface representing UserCollaborator.
 */
export interface UserCollaborator {
    /**
     * @member {string} [email] The email address of the user.
     */
    email?: string;
}
/**
 * @interface
 * An interface representing CollaboratorsArray.
 */
export interface CollaboratorsArray {
    /**
     * @member {string[]} [emails] The email address of the users.
     */
    emails?: string[];
}
/**
 * @interface
 * An interface representing ErrorResponse.
 * Error response when invoking an operation on the API.
 *
 */
export interface ErrorResponse {
    /**
     * @member {{ [propertyName: string]: any }} [additionalProperties] Unmatched
     * properties from the message are deserialized this collection
     */
    additionalProperties?: {
        [propertyName: string]: any;
    };
    /**
     * @member {string} [errorType]
     */
    errorType?: string;
}
/**
 * @interface
 * An interface representing OperationError.
 * Operation error details when invoking an operation on the API.
 *
 */
export interface OperationError {
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {string} [message]
     */
    message?: string;
}
/**
 * @interface
 * An interface representing PrebuiltDomainItem.
 */
export interface PrebuiltDomainItem {
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string} [description]
     */
    description?: string;
    /**
     * @member {string} [examples]
     */
    examples?: string;
}
/**
 * @interface
 * An interface representing PrebuiltDomain.
 * Prebuilt Domain.
 *
 */
export interface PrebuiltDomain {
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string} [culture]
     */
    culture?: string;
    /**
     * @member {string} [description]
     */
    description?: string;
    /**
     * @member {string} [examples]
     */
    examples?: string;
    /**
     * @member {PrebuiltDomainItem[]} [intents]
     */
    intents?: PrebuiltDomainItem[];
    /**
     * @member {PrebuiltDomainItem[]} [entities]
     */
    entities?: PrebuiltDomainItem[];
}
/**
 * @interface
 * An interface representing EntityRoleCreateObject.
 * Object model for creating an entity role.
 *
 */
export interface EntityRoleCreateObject {
    /**
     * @member {string} [name] The entity role name.
     */
    name?: string;
}
/**
 * @interface
 * An interface representing RegexModelCreateObject.
 * Model object for creating a regex entity model.
 *
 */
export interface RegexModelCreateObject {
    /**
     * @member {string} [regexPattern] The regex entity pattern.
     */
    regexPattern?: string;
    /**
     * @member {string} [name] The model name.
     */
    name?: string;
}
/**
 * @interface
 * An interface representing PatternAnyModelCreateObject.
 * Model object for creating a Pattern.Any entity model.
 *
 */
export interface PatternAnyModelCreateObject {
    /**
     * @member {string} [name] The model name.
     */
    name?: string;
    /**
     * @member {string[]} [explicitList] The Pattern.Any explicit list.
     */
    explicitList?: string[];
}
/**
 * @interface
 * An interface representing ExplicitListItemCreateObject.
 * Object model for creating an explicit list item.
 *
 */
export interface ExplicitListItemCreateObject {
    /**
     * @member {string} [explicitListItem] The explicit list item.
     */
    explicitListItem?: string;
}
/**
 * @interface
 * An interface representing RegexModelUpdateObject.
 * Model object for updating a regex entity model.
 *
 */
export interface RegexModelUpdateObject {
    /**
     * @member {string} [regexPattern] The regex entity pattern.
     */
    regexPattern?: string;
    /**
     * @member {string} [name] The model name.
     */
    name?: string;
}
/**
 * @interface
 * An interface representing PatternAnyModelUpdateObject.
 * Model object for updating a Pattern.Any entity model.
 *
 */
export interface PatternAnyModelUpdateObject {
    /**
     * @member {string} [name] The model name.
     */
    name?: string;
    /**
     * @member {string[]} [explicitList] The Pattern.Any explicit list.
     */
    explicitList?: string[];
}
/**
 * @interface
 * An interface representing EntityRoleUpdateObject.
 * Object model for updating an entity role.
 *
 */
export interface EntityRoleUpdateObject {
    /**
     * @member {string} [name] The entity role name.
     */
    name?: string;
}
/**
 * @interface
 * An interface representing ExplicitListItemUpdateObject.
 * Model object for updating an explicit list item.
 *
 */
export interface ExplicitListItemUpdateObject {
    /**
     * @member {string} [explicitListItem] The explicit list item.
     */
    explicitListItem?: string;
}
/**
 * @interface
 * An interface representing PatternRuleCreateObject.
 * Object model for creating a pattern
 *
 */
export interface PatternRuleCreateObject {
    /**
     * @member {string} [pattern] The pattern text.
     */
    pattern?: string;
    /**
     * @member {string} [intent] The intent's name which the pattern belongs to.
     */
    intent?: string;
}
/**
 * @interface
 * An interface representing PatternRuleUpdateObject.
 * Object model for updating a pattern.
 *
 */
export interface PatternRuleUpdateObject {
    /**
     * @member {string} [id] The pattern ID.
     */
    id?: string;
    /**
     * @member {string} [pattern] The pattern text.
     */
    pattern?: string;
    /**
     * @member {string} [intent] The intent's name which the pattern belongs to.
     */
    intent?: string;
}
/**
 * @interface
 * An interface representing RegexEntityExtractor.
 * Regex Entity Extractor.
 *
 */
export interface RegexEntityExtractor {
    /**
     * @member {string} id The ID of the Entity Model.
     */
    id: string;
    /**
     * @member {string} [name] Name of the Entity Model.
     */
    name?: string;
    /**
     * @member {number} [typeId] The type ID of the Entity Model.
     */
    typeId?: number;
    /**
     * @member {ReadableType9} readableType Possible values include: 'Entity
     * Extractor', 'Hierarchical Entity Extractor', 'Hierarchical Child Entity
     * Extractor', 'Composite Entity Extractor', 'Closed List Entity Extractor',
     * 'Prebuilt Entity Extractor', 'Intent Classifier', 'Pattern.Any Entity
     * Extractor', 'Regex Entity Extractor'
     */
    readableType: ReadableType9;
    /**
     * @member {EntityRole[]} [roles]
     */
    roles?: EntityRole[];
    /**
     * @member {string} [regexPattern] The Regex entity pattern.
     */
    regexPattern?: string;
}
/**
 * @interface
 * An interface representing PatternAnyEntityExtractor.
 * Pattern.Any Entity Extractor.
 *
 */
export interface PatternAnyEntityExtractor {
    /**
     * @member {string} id The ID of the Entity Model.
     */
    id: string;
    /**
     * @member {string} [name] Name of the Entity Model.
     */
    name?: string;
    /**
     * @member {number} [typeId] The type ID of the Entity Model.
     */
    typeId?: number;
    /**
     * @member {ReadableType10} readableType Possible values include: 'Entity
     * Extractor', 'Hierarchical Entity Extractor', 'Hierarchical Child Entity
     * Extractor', 'Composite Entity Extractor', 'Closed List Entity Extractor',
     * 'Prebuilt Entity Extractor', 'Intent Classifier', 'Pattern.Any Entity
     * Extractor', 'Regex Entity Extractor'
     */
    readableType: ReadableType10;
    /**
     * @member {EntityRole[]} [roles]
     */
    roles?: EntityRole[];
    /**
     * @member {ExplicitListItem[]} [explicitList]
     */
    explicitList?: ExplicitListItem[];
}
/**
 * @interface
 * An interface representing PatternRuleInfo.
 * Pattern rule
 *
 */
export interface PatternRuleInfo {
    /**
     * @member {string} [id] The pattern ID.
     */
    id?: string;
    /**
     * @member {string} [pattern] The pattern text.
     */
    pattern?: string;
    /**
     * @member {string} [intent] The intent's name where the pattern belongs to.
     */
    intent?: string;
}
/**
 * @interface
 * An interface representing LabelTextObject.
 * An object containing the example's text.
 *
 */
export interface LabelTextObject {
    /**
     * @member {number} [id] The ID of the Label.
     */
    id?: number;
    /**
     * @member {string} [text] The text of the label.
     */
    text?: string;
}
/**
 * @interface
 * An interface representing HierarchicalChildModelUpdateObject.
 */
export interface HierarchicalChildModelUpdateObject {
    /**
     * @member {string} [name]
     */
    name?: string;
}
/**
 * @interface
 * An interface representing HierarchicalChildModelCreateObject.
 */
export interface HierarchicalChildModelCreateObject {
    /**
     * @member {string} [name]
     */
    name?: string;
}
/**
 * @interface
 * An interface representing CompositeChildModelCreateObject.
 */
export interface CompositeChildModelCreateObject {
    /**
     * @member {string} [name]
     */
    name?: string;
}
/**
 * @interface
 * An interface representing FeaturesGetApplicationVersionPatternFeaturesOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface FeaturesGetApplicationVersionPatternFeaturesOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing FeaturesListPhraseListsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface FeaturesListPhraseListsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing FeaturesListOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface FeaturesListOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing FeaturesUpdatePhraseListOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface FeaturesUpdatePhraseListOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {PhraselistUpdateObject} [phraselistUpdateObject] The new values
     * for: - Just a boolean called IsActive, in which case the status of the
     * feature will be changed. - Name, Pattern, Mode, and a boolean called
     * IsActive to update the feature.
     */
    phraselistUpdateObject?: PhraselistUpdateObject;
}
/**
 * @interface
 * An interface representing ExamplesListOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface ExamplesListOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing ModelListIntentsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface ModelListIntentsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing ModelListEntitiesOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface ModelListEntitiesOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing ModelListHierarchicalEntitiesOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface ModelListHierarchicalEntitiesOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing ModelListCompositeEntitiesOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface ModelListCompositeEntitiesOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing ModelListClosedListsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface ModelListClosedListsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing ModelListPrebuiltsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface ModelListPrebuiltsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing ModelListModelsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface ModelListModelsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing ModelExamplesMethodOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface ModelExamplesMethodOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing ModelDeleteIntentOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface ModelDeleteIntentOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {boolean} [deleteUtterances] Also delete the intent's utterances
     * (true). Or move the utterances to the None intent (false - the default
     * value). Default value: false .
     */
    deleteUtterances?: boolean;
}
/**
 * @interface
 * An interface representing ModelGetIntentSuggestionsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface ModelGetIntentSuggestionsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing ModelGetEntitySuggestionsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface ModelGetEntitySuggestionsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing ModelGetRegexEntityInfosOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface ModelGetRegexEntityInfosOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing ModelGetPatternAnyEntityInfosOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface ModelGetPatternAnyEntityInfosOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing AppsListOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface AppsListOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing AppsImportMethodOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface AppsImportMethodOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {string} [appName] The application name to create. If not
     * specified, the application name will be read from the imported object.
     */
    appName?: string;
}
/**
 * @interface
 * An interface representing VersionsListOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface VersionsListOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing VersionsImportMethodOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface VersionsImportMethodOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {string} [versionId] The new versionId to import. If not
     * specified, the versionId will be read from the imported object.
     */
    versionId?: string;
}
/**
 * @interface
 * An interface representing PatternGetPatternsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface PatternGetPatternsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * @interface
 * An interface representing PatternGetIntentPatternsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface PatternGetIntentPatternsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [skip] The number of entries to skip. Default value is 0.
     * Default value: 0 .
     */
    skip?: number;
    /**
     * @member {number} [take] The number of entries to return. Maximum page size
     * is 500. Default is 100. Default value: 100 .
     */
    take?: number;
}
/**
 * Defines values for TrainingStatus.
 * Possible values include: 'NeedsTraining', 'InProgress', 'Trained'
 * @readonly
 * @enum {string}
 */
export declare enum TrainingStatus {
    NeedsTraining = "NeedsTraining",
    InProgress = "InProgress",
    Trained = "Trained"
}
/**
 * Defines values for OperationStatusType.
 * Possible values include: 'Failed', 'FAILED', 'Success'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: OperationStatusType =
 * <OperationStatusType>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export declare enum OperationStatusType {
    Failed = "Failed",
    FAILED = "FAILED",
    Success = "Success"
}
/**
 * Defines values for AzureRegions.
 * Possible values include: 'westus', 'westeurope', 'southeastasia', 'eastus2',
 * 'westcentralus', 'westus2', 'eastus', 'southcentralus', 'northeurope',
 * 'eastasia', 'australiaeast', 'brazilsouth'
 * @readonly
 * @enum {string}
 */
export declare enum AzureRegions {
    Westus = "westus",
    Westeurope = "westeurope",
    Southeastasia = "southeastasia",
    Eastus2 = "eastus2",
    Westcentralus = "westcentralus",
    Westus2 = "westus2",
    Eastus = "eastus",
    Southcentralus = "southcentralus",
    Northeurope = "northeurope",
    Eastasia = "eastasia",
    Australiaeast = "australiaeast",
    Brazilsouth = "brazilsouth"
}
/**
 * Defines values for ReadableType.
 * Possible values include: 'Entity Extractor', 'Hierarchical Entity
 * Extractor', 'Hierarchical Child Entity Extractor', 'Composite Entity
 * Extractor', 'Closed List Entity Extractor', 'Prebuilt Entity Extractor',
 * 'Intent Classifier', 'Pattern.Any Entity Extractor', 'Regex Entity
 * Extractor'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: ReadableType =
 * <ReadableType>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export declare enum ReadableType {
    EntityExtractor = "Entity Extractor",
    HierarchicalEntityExtractor = "Hierarchical Entity Extractor",
    HierarchicalChildEntityExtractor = "Hierarchical Child Entity Extractor",
    CompositeEntityExtractor = "Composite Entity Extractor",
    ClosedListEntityExtractor = "Closed List Entity Extractor",
    PrebuiltEntityExtractor = "Prebuilt Entity Extractor",
    IntentClassifier = "Intent Classifier",
    PatternAnyEntityExtractor = "Pattern.Any Entity Extractor",
    RegexEntityExtractor = "Regex Entity Extractor"
}
/**
 * Defines values for ReadableType1.
 * Possible values include: 'Entity Extractor', 'Hierarchical Entity
 * Extractor', 'Hierarchical Child Entity Extractor', 'Composite Entity
 * Extractor', 'Closed List Entity Extractor', 'Prebuilt Entity Extractor',
 * 'Intent Classifier', 'Pattern.Any Entity Extractor', 'Regex Entity
 * Extractor'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: ReadableType1 =
 * <ReadableType1>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export declare enum ReadableType1 {
    EntityExtractor = "Entity Extractor",
    HierarchicalEntityExtractor = "Hierarchical Entity Extractor",
    HierarchicalChildEntityExtractor = "Hierarchical Child Entity Extractor",
    CompositeEntityExtractor = "Composite Entity Extractor",
    ClosedListEntityExtractor = "Closed List Entity Extractor",
    PrebuiltEntityExtractor = "Prebuilt Entity Extractor",
    IntentClassifier = "Intent Classifier",
    PatternAnyEntityExtractor = "Pattern.Any Entity Extractor",
    RegexEntityExtractor = "Regex Entity Extractor"
}
/**
 * Defines values for ReadableType2.
 * Possible values include: 'Entity Extractor', 'Hierarchical Entity
 * Extractor', 'Hierarchical Child Entity Extractor', 'Composite Entity
 * Extractor', 'Closed List Entity Extractor', 'Prebuilt Entity Extractor',
 * 'Intent Classifier', 'Pattern.Any Entity Extractor', 'Regex Entity
 * Extractor'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: ReadableType2 =
 * <ReadableType2>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export declare enum ReadableType2 {
    EntityExtractor = "Entity Extractor",
    HierarchicalEntityExtractor = "Hierarchical Entity Extractor",
    HierarchicalChildEntityExtractor = "Hierarchical Child Entity Extractor",
    CompositeEntityExtractor = "Composite Entity Extractor",
    ClosedListEntityExtractor = "Closed List Entity Extractor",
    PrebuiltEntityExtractor = "Prebuilt Entity Extractor",
    IntentClassifier = "Intent Classifier",
    PatternAnyEntityExtractor = "Pattern.Any Entity Extractor",
    RegexEntityExtractor = "Regex Entity Extractor"
}
/**
 * Defines values for ReadableType3.
 * Possible values include: 'Entity Extractor', 'Hierarchical Entity
 * Extractor', 'Hierarchical Child Entity Extractor', 'Composite Entity
 * Extractor', 'Closed List Entity Extractor', 'Prebuilt Entity Extractor',
 * 'Intent Classifier', 'Pattern.Any Entity Extractor', 'Regex Entity
 * Extractor'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: ReadableType3 =
 * <ReadableType3>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export declare enum ReadableType3 {
    EntityExtractor = "Entity Extractor",
    HierarchicalEntityExtractor = "Hierarchical Entity Extractor",
    HierarchicalChildEntityExtractor = "Hierarchical Child Entity Extractor",
    CompositeEntityExtractor = "Composite Entity Extractor",
    ClosedListEntityExtractor = "Closed List Entity Extractor",
    PrebuiltEntityExtractor = "Prebuilt Entity Extractor",
    IntentClassifier = "Intent Classifier",
    PatternAnyEntityExtractor = "Pattern.Any Entity Extractor",
    RegexEntityExtractor = "Regex Entity Extractor"
}
/**
 * Defines values for ReadableType4.
 * Possible values include: 'Entity Extractor', 'Hierarchical Entity
 * Extractor', 'Hierarchical Child Entity Extractor', 'Composite Entity
 * Extractor', 'Closed List Entity Extractor', 'Prebuilt Entity Extractor',
 * 'Intent Classifier', 'Pattern.Any Entity Extractor', 'Regex Entity
 * Extractor'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: ReadableType4 =
 * <ReadableType4>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export declare enum ReadableType4 {
    EntityExtractor = "Entity Extractor",
    HierarchicalEntityExtractor = "Hierarchical Entity Extractor",
    HierarchicalChildEntityExtractor = "Hierarchical Child Entity Extractor",
    CompositeEntityExtractor = "Composite Entity Extractor",
    ClosedListEntityExtractor = "Closed List Entity Extractor",
    PrebuiltEntityExtractor = "Prebuilt Entity Extractor",
    IntentClassifier = "Intent Classifier",
    PatternAnyEntityExtractor = "Pattern.Any Entity Extractor",
    RegexEntityExtractor = "Regex Entity Extractor"
}
/**
 * Defines values for ReadableType5.
 * Possible values include: 'Entity Extractor', 'Hierarchical Entity
 * Extractor', 'Hierarchical Child Entity Extractor', 'Composite Entity
 * Extractor', 'Closed List Entity Extractor', 'Prebuilt Entity Extractor',
 * 'Intent Classifier', 'Pattern.Any Entity Extractor', 'Regex Entity
 * Extractor'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: ReadableType5 =
 * <ReadableType5>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export declare enum ReadableType5 {
    EntityExtractor = "Entity Extractor",
    HierarchicalEntityExtractor = "Hierarchical Entity Extractor",
    HierarchicalChildEntityExtractor = "Hierarchical Child Entity Extractor",
    CompositeEntityExtractor = "Composite Entity Extractor",
    ClosedListEntityExtractor = "Closed List Entity Extractor",
    PrebuiltEntityExtractor = "Prebuilt Entity Extractor",
    IntentClassifier = "Intent Classifier",
    PatternAnyEntityExtractor = "Pattern.Any Entity Extractor",
    RegexEntityExtractor = "Regex Entity Extractor"
}
/**
 * Defines values for ReadableType6.
 * Possible values include: 'Entity Extractor', 'Hierarchical Entity
 * Extractor', 'Hierarchical Child Entity Extractor', 'Composite Entity
 * Extractor', 'Closed List Entity Extractor', 'Prebuilt Entity Extractor',
 * 'Intent Classifier', 'Pattern.Any Entity Extractor', 'Regex Entity
 * Extractor'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: ReadableType6 =
 * <ReadableType6>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export declare enum ReadableType6 {
    EntityExtractor = "Entity Extractor",
    HierarchicalEntityExtractor = "Hierarchical Entity Extractor",
    HierarchicalChildEntityExtractor = "Hierarchical Child Entity Extractor",
    CompositeEntityExtractor = "Composite Entity Extractor",
    ClosedListEntityExtractor = "Closed List Entity Extractor",
    PrebuiltEntityExtractor = "Prebuilt Entity Extractor",
    IntentClassifier = "Intent Classifier",
    PatternAnyEntityExtractor = "Pattern.Any Entity Extractor",
    RegexEntityExtractor = "Regex Entity Extractor"
}
/**
 * Defines values for ReadableType7.
 * Possible values include: 'Entity Extractor', 'Hierarchical Entity
 * Extractor', 'Hierarchical Child Entity Extractor', 'Composite Entity
 * Extractor', 'Closed List Entity Extractor', 'Prebuilt Entity Extractor',
 * 'Intent Classifier', 'Pattern.Any Entity Extractor', 'Regex Entity
 * Extractor'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: ReadableType7 =
 * <ReadableType7>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export declare enum ReadableType7 {
    EntityExtractor = "Entity Extractor",
    HierarchicalEntityExtractor = "Hierarchical Entity Extractor",
    HierarchicalChildEntityExtractor = "Hierarchical Child Entity Extractor",
    CompositeEntityExtractor = "Composite Entity Extractor",
    ClosedListEntityExtractor = "Closed List Entity Extractor",
    PrebuiltEntityExtractor = "Prebuilt Entity Extractor",
    IntentClassifier = "Intent Classifier",
    PatternAnyEntityExtractor = "Pattern.Any Entity Extractor",
    RegexEntityExtractor = "Regex Entity Extractor"
}
/**
 * Defines values for ReadableType8.
 * Possible values include: 'Entity Extractor', 'Hierarchical Entity
 * Extractor', 'Hierarchical Child Entity Extractor', 'Composite Entity
 * Extractor', 'Closed List Entity Extractor', 'Prebuilt Entity Extractor',
 * 'Intent Classifier', 'Pattern.Any Entity Extractor', 'Regex Entity
 * Extractor'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: ReadableType8 =
 * <ReadableType8>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export declare enum ReadableType8 {
    EntityExtractor = "Entity Extractor",
    HierarchicalEntityExtractor = "Hierarchical Entity Extractor",
    HierarchicalChildEntityExtractor = "Hierarchical Child Entity Extractor",
    CompositeEntityExtractor = "Composite Entity Extractor",
    ClosedListEntityExtractor = "Closed List Entity Extractor",
    PrebuiltEntityExtractor = "Prebuilt Entity Extractor",
    IntentClassifier = "Intent Classifier",
    PatternAnyEntityExtractor = "Pattern.Any Entity Extractor",
    RegexEntityExtractor = "Regex Entity Extractor"
}
/**
 * Defines values for Status.
 * Possible values include: 'Queued', 'InProgress', 'UpToDate', 'Fail',
 * 'Success'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: Status = <Status>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export declare enum Status {
    Queued = "Queued",
    InProgress = "InProgress",
    UpToDate = "UpToDate",
    Fail = "Fail",
    Success = "Success"
}
/**
 * Defines values for Status1.
 * Possible values include: 'Queued', 'InProgress', 'UpToDate', 'Fail',
 * 'Success'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: Status1 = <Status1>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export declare enum Status1 {
    Queued = "Queued",
    InProgress = "InProgress",
    UpToDate = "UpToDate",
    Fail = "Fail",
    Success = "Success"
}
/**
 * Defines values for ReadableType9.
 * Possible values include: 'Entity Extractor', 'Hierarchical Entity
 * Extractor', 'Hierarchical Child Entity Extractor', 'Composite Entity
 * Extractor', 'Closed List Entity Extractor', 'Prebuilt Entity Extractor',
 * 'Intent Classifier', 'Pattern.Any Entity Extractor', 'Regex Entity
 * Extractor'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: ReadableType9 =
 * <ReadableType9>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export declare enum ReadableType9 {
    EntityExtractor = "Entity Extractor",
    HierarchicalEntityExtractor = "Hierarchical Entity Extractor",
    HierarchicalChildEntityExtractor = "Hierarchical Child Entity Extractor",
    CompositeEntityExtractor = "Composite Entity Extractor",
    ClosedListEntityExtractor = "Closed List Entity Extractor",
    PrebuiltEntityExtractor = "Prebuilt Entity Extractor",
    IntentClassifier = "Intent Classifier",
    PatternAnyEntityExtractor = "Pattern.Any Entity Extractor",
    RegexEntityExtractor = "Regex Entity Extractor"
}
/**
 * Defines values for ReadableType10.
 * Possible values include: 'Entity Extractor', 'Hierarchical Entity
 * Extractor', 'Hierarchical Child Entity Extractor', 'Composite Entity
 * Extractor', 'Closed List Entity Extractor', 'Prebuilt Entity Extractor',
 * 'Intent Classifier', 'Pattern.Any Entity Extractor', 'Regex Entity
 * Extractor'
 * There could be more values for this enum apart from the ones defined here.If
 * you want to set a value that is not from the known values then you can do
 * the following:
 * let param: ReadableType10 =
 * <ReadableType10>"someUnknownValueThatWillStillBeValid";
 * @readonly
 * @enum {string}
 */
export declare enum ReadableType10 {
    EntityExtractor = "Entity Extractor",
    HierarchicalEntityExtractor = "Hierarchical Entity Extractor",
    HierarchicalChildEntityExtractor = "Hierarchical Child Entity Extractor",
    CompositeEntityExtractor = "Composite Entity Extractor",
    ClosedListEntityExtractor = "Closed List Entity Extractor",
    PrebuiltEntityExtractor = "Prebuilt Entity Extractor",
    IntentClassifier = "Intent Classifier",
    PatternAnyEntityExtractor = "Pattern.Any Entity Extractor",
    RegexEntityExtractor = "Regex Entity Extractor"
}
