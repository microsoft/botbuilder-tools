# Dispatch Command Line tool
[![npm version](https://badge.fury.io/js/botdispatch.svg)](https://badge.fury.io/js/botdispatch) 

Dispatch is a tool to create and evaluate LUIS models used to dispatch intent across multiple bot modules such as LUIS models, QnA knowledge bases and others (added to dispatch as a file type).

Use the Dispatch model in cases when:
1. Your bot consists of multiple modules and you need assistance in routing user's utterances to these modules and evaluate the bot integration.
2. Evaluate quality of intents classification of a single LUIS model.
3. Create a text classification model from text files.

## Prerequisite

- [Node.js](https://nodejs.org/) version 8.5 or higher
- For installation on Linux, please pre-install .NET Core runtime by following instructions [here](https://docs.microsoft.com/en-us/dotnet/core/linux-prerequisites?tabs=netcore2x)
- If install fails, try the workaround described [here](https://github.com/fearthecowboy/dotnet/issues/2)

## Installation
To install:

```shell
npm install -g botdispatch
```

This will install dispatch into your global path.

## Usage

### Initializing dispatch

To initialize dispatch:

```shell
dispatch init [options]
```

It will ask for the name of the dispatch, LUIS authoring key and region needed to create a LUIS application.  This commands then creates {dispatchName}.dispatch file.
To bypass the prompts, values could be passed in via arguments below.

Arguments:

| Option                | Description                       |
| --------------------- | --------------------------------- |
| -n, --name            | (optional) Name of the dispatch   |
| --luisAuthoringKey    | (optional) LUIS authoring key     |
| --luisAuthoringRegion | (optional) LUIS authoring region  |
| -b, --bot             | (optional) .bot file path         |
| -s, --secret          | (optional) .bot file secret       |
| -c, --culture         | (optional) Used to set LUIS app culture for dispatch. Required if none of dispatch source(s) is LUIS app. |
| --hierarchical        | (optional) Default to true.  If false, existing intents from source LUIS model(s) will be available as the dispatch intents. |
| --dataFolder          | (optional) Dispatch working directory |
| -h, --help            | Output usage information |

Example:

```shell
dispatch init -n TestDispatch --luisAuthoringKey "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" --luisAuthoringRegion westus 
dispatch init --bot c:\src\bot\testbot.bot
```

### Adding source to dispatch

This step is not needed if you have a .bot file already connected with services (i.e., LUIS/QnA). Dispatch will take the services in .bot file
and add each of the services it can dispatch to .dispatch file.  Currently, a maximum of 500 dispatch sources could be added to a Dispatch model.

```shell
dispatch add -t luis -i xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx -n TestLuisApp -v 0.1 -k xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
dispatch add -t luis -i xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx -n TestLuisApp --intentName foo -v 0.1 -k xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
dispatch add -t qna -i xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx -n Faq -k xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
dispatch add -t qna -i xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx -n Faq -k xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx --includeAnswersForTraining true
dispatch add -t qna -i xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx -n Faq -k xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx --includeAnswersForTraining true --includePrompts true
dispatch add -t file -n TestModule -f c:\src\testmodule.tsv
dispatch add -t file -n TestModule2 -f c:\src\testmodule2.txt
dispatch add -t file -n TestModule3 -f c:\src\testmodule3.json
dispatch add -t file -f c:\src\testmodule.tsv --intentName l_Foo
```

Arguments

| Option       | Description |
| -----------  | ----------- |
| -t, --type   | luis, qna, file|
| -i, --id     | (required only if type is luis/qna) LUIS app id or QnA kb id from application settings page|
| -n, --name   | LUIS app name or QnA name (from application settings page) or module/file name for file type |
| -k, --key    | (required only if type is luis/qna) LUIS authoring key (from https://www.luis.ai/user/settings, see https://aka.ms/luiskeys for more information on LUIS keys) or QnA maker subscription key (from https://ms.portal.azure.com, see https://aka.ms/qnamakerkeys for more information about QnA Maker keys) |
| -v, --version| (Required only if type is luis) LUIS app version |
| -f, --filePath| (Required only if type is file) Path to tsv file containing tab delimited intent and utterance fields or .txt file with an utterance on each line |
| --intentName  | (optional) Dispatch intent name for this source, name param value will be used otherwise |
| --includedIntents  | (optional) Comma separated list of intents to be included in the Dispatch model, all intents are included otherwise |
| --ignoreWordAlterations | (optional) Default to false. Disable expansions of QnA kb questions with QnA word alterations |
| --includeAnswersForTraining | (optional for QnA only) Default to false. If set to true, QnA KB answers will be included in the training set |
| --includeMetadata | (optional for QnA only) Default to false. If set to true, QnA KB metadata will be included in the training set |
| --includePrompts | (optional for QnA only) Default to false. If set to true, QnA KB prompt questions will be included in the training set |
| --dispatch    | (optional) Path to .dispatch file |
| --dataFolder  | (optional) Dispatch working directory |
| -h, --help    | Output usage information |

Supported file types:

| File extension       | Description |
| -----------  | ----------- |
| .tsv | Lines of tab delimited fields of intent and utterance (in that order) |
| .txt | Lines of utterances with intent as file name |
| .json | Exported LUIS or QnA Maker json file |

### Removing dispatch source

To remove one of the services from .dispatch file, run

```shell
dispatch remove -t luis -i xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx 
dispatch remove -t qna -i xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx 
dispatch remove -t file -f c:\src\testmodule.json
```

Arguments

| Option       | Description |
| -----------  | ----------- |
| -t, --type   | luis, qna, file|
| -i, --id     | (required only if type is luis/qna) LUIS app id or QnA kb id - from application settings page)|
| -n, --name   | LUIS app name or QnA name (from application settings page) or module/file name for file type |
| -f, --filePath | (Required only if type is file) Path to tsv file containing tab delimited intent and utterance fields or .txt file with an utterance on each line |
| --dispatch    | (optional) Path to .dispatch file |
| --dataFolder  | (optional) Dispatch working directory |
| -h, --help    | Output usage information |

### Creating your dispatch model  

To create, train and publish your new dispatch model:

```shell
dispatch create [options]
dispatch create --publishToStaging true --useAllTrainingData true
dispatch create --bot c:\src\bot\testbot.bot --secret <your_bot_file_secret>
dispatch create --dontImport true --useAllTrainingData true
```

Options:

| Option                 | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| -b, --bot              | (optional) Path to .bot file or bot services json file |
| -s, --secret           | (optional) Secret used to encrypt/decrypt .bot file |
| -c, --culture          | (optional) Used to set LUIS app culture for dispatch. Required if none of dispatch source(s) is LUIS app |
| --dispatch             | (optional) Path to .dispatch file |
| --dataFolder           | (optional) Dispatch working directory |
| --hierarchical         | (optional) Default to true, set to false when evaluating a single LUIS model |
| --useAllTrainingData   | (optional) Default to false. LUIS UseAllTrainingData flag (see https://westus.dev.cognitive.microsoft.com/docs/services/5890b47c39e2bb17b84a55ff/operations/versions-update-application-version-settings) |
| --dontReviseUtterance  | (optional) Default to false. Dispatch sometimes minorly revises an utterance for generalization. If false, utterances won't be revised |
| --publishToStaging     | (optional) Default to false. Publish to LUIS staging instead of production platform |
| --dedupeTrainingSet    | (optional) Default to false. If false, Dispatch won't dedupe duplicated training instances |
| --gov                  | (optional) Set to true to target Azure goverment |
| --remote               | (optional) Set to true if invoking tool remotely |
| --dontImport           | (optional) Default to false. If set to true, do not communicate with luis.ai for importing, training, and publishing the Dispatch LUIS app |
| --doAutoActiveLearning | (optional) Default to false. LUIS limit on training-set size is 15000. When a LUIS app has much more utterances for training, Dispatch's auto active learning process can intelligently down sample the utterances |
| --aalNumberOfInstancesPerIteration         | (optional) Default to 2500. Max #instances processed during each auto-active-learning down-sampling iteration |
| --aalMaxNumberOfActiveLearningIterations   | (optional) Default to -1. Max number of auto active learning iterations, each processes a fixed batch of instances. Negative setting enables scanning through all available instances. |
| --aalFixedNumberOfActiveLearningIterations | (optional) Default to -1. Fixed number of iterations to process all available instances. Number of instance batch in each instance is calaulated based on this parameter. |
| --aalInitialNumberOfSamplesPerIntent       | (optional) Default to 20. Initial #instances randomly sampled for each intent before kicking off the auto-active-learning down-sampling process. |
| --aalInitialNumberOfInstancesPerIteration  | (optional) Default to 200. #instance per iteration can be configured to grow until reaching aalNumberOfInstancesPerIteration. |
| --aalNumberOfSamplesPerIntentGrowthRatio   | (optional) Default to 1.5. The growth rate of #instances per auto-active-learning iteration. |
| -h, --help             | Output usage information |

This command creates a brand new LUIS application.

### Refreshing your dispatch model  

To train and publish your existing dispatch model after modification:

```shell
dispatch refresh [options]
dispatch refresh --publishToStaging true --useAllTrainingData true
dispatch refresh --bot c:\src\bot\testbot.bot --secret <your_bot_file_secret>
```

With the following options

| Option               | Description                                                  |
| ----------------     | ------------------------------------------------------------ |
| -v, --version        | (optional) Dispatch LUIS app version. A new version will be created if param value is different than previously created version.  |
| -b, --bot            | (optional) .bot file path         |
| -s, --secret         | (optional) .bot file secret       |
| --useAllTrainingData   | (optional) Default to false. LUIS UseAllTrainingData flag (see https://westus.dev.cognitive.microsoft.com/docs/services/5890b47c39e2bb17b84a55ff/operations/versions-update-application-version-settings) |
| --dontReviseUtterance  | (optional) Default to false. Dispatch sometimes minorly revises an utterance for generalization. If false, utterances won't be revised |
| --publishToStaging     | (optional) Default to false. Publish to LUIS staging instead of production platform |
| --dedupeTrainingSet    | (optional) Default to false. If false, Dispatch won't dedupe duplicated training instances |
| --gov                  | (optional) Set to true to target Azure goverment |
| --remote               | (optional) Set to true if invoking tool remotely |
| --dontImport           | (optional) Default to false. If set to true, do not communicate with luis.ai for importing, training, and publishing the Dispatch LUIS app |
| --dispatch           | (optional) .dispatch file path    |
| --dataFolder         | (optional) Dispatch working directory |
| -h, --help           | Output usage information |

This command updates existing LUIS application in .dispatch file.

### Evaluating your dispatch model  

This command will run cross validation evaluation on the dispatch model and generate a summary of the evaluation:  

```shell
dispatch eval [options]
```

Options:

|Option | Description|
| ------ | ----------- |
| --luisSubscriptionKey    | (optional, will be prompted) Cognitive Service LUIS key from portal.azure.com  |
| --luisSubscriptionRegion | (optional, will be prompted) Cognitive Service LUIS region from portal.azure.com  |
| --dispatch               | (optional) .dispatch file path    |
| --dataFolder             | (optional) Dispatch working directory |
| --doAutoActiveLearning | (optional) Default to false. LUIS limit on training-set size is 15000. When a LUIS app has much more utterances for training, Dispatch's auto active learning process can intelligently down sample the utterances |
| --aalNumberOfInstancesPerIteration         | (optional) Default to 2500. Max #instances processed during each auto-active-learning down-sampling iteration |
| --aalMaxNumberOfActiveLearningIterations   | (optional) Default to -1. Max number of auto active learning iterations, each processes a fixed batch of instances. Negative setting enables scanning through all available instances. |
| --aalFixedNumberOfActiveLearningIterations | (optional) Default to -1. Fixed number of iterations to process all available instances. Number of instance batch in each instance is calaulated based on this parameter. |
| --aalInitialNumberOfSamplesPerIntent       | (optional) Default to 20. Initial #instances randomly sampled for each intent before kicking off the auto-active-learning down-sampling process. |
| --aalInitialNumberOfInstancesPerIteration  | (optional) Default to 200. #instance per iteration can be configured to grow until reaching aalNumberOfInstancesPerIteration. |
| --aalNumberOfSamplesPerIntentGrowthRatio   | (optional) Default to 1.5. The growth rate of #instances per auto-active-learning iteration. |
| --aalTestingInstancesDownsamplingRatio     | (optional) Default to 1. Ratio of test instances that will be used for evaluating the model. |
| -h, --help               | Output usage information|

If no options are supplied, the tool will prompt for the required information it needs to run model evaluation.

### Testing your dispatch model  

To test your dispatch model against test set:

```shell
dispatch test [options]
```

Options:

| Option                  | Description                                                  |
| --------------------    | ------------------------------------------------------------ |
| --testFilePath          | Path to a tsv file with three (or two) fields: expected intent, weight and utterance in that order; the first line (header) will be skipped; the weight column is optional     |
| --luisSubscriptionKey   | (optional) Cognitive Service LUIS key from portal.azure.com     |
| --luisSubscriptionRegion| (optional) Cognitive Service LUIS region from portal.azure.com  |
| --dispatch              | (optional) .dispatch file path    |
| --dataFolder            | (optional) Dispatch working directory |
| --doAutoActiveLearning  | (optional) Default to false. If true, will also run 'test' against the local model created during the auto active learning process |
| -h, --help              | Output usage information |


### Run prediction using your dispatch model  

To run prediction against your new dispatch model, run

```shell
dispatch predict [options]
```

With the following options

| Option                  | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| --luisSubscriptionKey   | (optional) Cognitive Service LUIS key from portal.azure.com    |
| --luisSubscriptionRegion| (optional) Cognitive Service LUIS region from portal.azure.com  |
| --dispatch              | (optional) .dispatch file path    |
| --dataFolder            | (optional) Dispatch working directory |
| --doAutoActiveLearning  | (optional) Default to false. If true, will also run 'predict' using the local model created during the auto active learning process |
| -h, --help              | Output usage information |

You'll then be prompted to enter the utterance you'd like to run prediction on.

### Print dispatch configuration to console 

To print your current dispatch configuration, run

```shell
dispatch list [options]
```

With the following options

| Option               | Description                                                  |
| ----------------     | ------------------------------------------------------------ |
| --dispatch           | (optional) .dispatch file path    |
| --dataFolder         | (optional) Dispatch working directory |
| -h, --help           | Output usage information |


## Common Tasks

### Create bot dispatch using bot file
If you have a .bot file containing one or more LUIS model(s) and/or one or more QnA Maker knowledge base(s), you could create Dispatch model without having to initialize Dispatch and add all of the sources separately. Running the eval command is optional but it provides insight into how well the newly created or updated Dispatch model will perform.  In addition, it provides suggestions for improving the bot components.

```shell
dispatch create --bot c:\src\bot\testbot.bot --secret <your_bot_file_secret>
dispatch eval --luisSubscriptionKey <azure_luis_key> --luisSubscriptionRegion <azure_luis_region>
```

### Updating dispatch
If any of your LUIS/QnA Maker models have changed or if you have added more LUIS/QnA maker component(s) to your bot, update your Dispatch model with refresh command.

```shell
dispatch refresh --bot c:\src\bot\testbot.bot --secret <your_bot_file_secret>
dispatch eval --luisSubscriptionKey <azure_luis_key> --luisSubscriptionRegion <azure_luis_region>
```

In some scenarios, utterances might need to be added directly to the Dispatch app to improve Dispatch intent classification.  Instead of adding them directly to Dispatch app via LUIS portal, we recommend adding these utterances into a text file (one text file per Dispatch intent) and add the file(s) as source to Dispatch.  The utterances will be persisted across dispatch refresh.   To add/modify the utterances, simply edit the file where utterances are added and run "dispatch refresh" command.

```shell
dispatch add -t file -f <file_path> --intentName <dispatch_target_intent_name, ie l_LUISAppName or q_QnAKbName>
```


### Create and evaluate bot dispatch

End-to-end example of a bot consisting of a LUIS module and a QnA Maker knowledge base module:

```shell
dispatch init -n mybot_dispatch --luisAuthoringKey <luis_authoring_key> --luisAuthoringRegion <region>
dispatch add -t luis -i <luis_app_id> -n <luis_app_name> -v <luis_app_version> -k <luis_app_authoring_key>
dispatch add -t qna -i <qna_kb_id> -n <kb_name> -k <qna_maker_key>
dispatch create
dispatch eval --luisSubscriptionKey <azure_luis_key> --luisSubscriptionRegion <azure_luis_region>
```

The output is Summary.html file located in local file system directory where the commands were issued. It includes all the evaluation results and suggestions for improving the bot components.

### Evaluate single LUIS model

Evaluate a LUIS model performing cross validation:

```shell
dispatch init -n mybot_dispatch --luisAuthoringKey <luis_authoring_key> --luisAuthoringRegion <region>
dispatch add -t luis -i <luis_app_id> -n <luis_app_name> -v <luis_app_version> -k <luis_app_authoring_key>
dispatch create --hierarchical false
dispatch eval --luisSubscriptionKey <azure_luis_key> --luisSubscriptionRegion <azure_luis_region>
```

The output, Summary.html, contains all the evaluation results. The file is located in local file system directory where the commands were issued.

### Test a LUIS model using test utterances

Suppose the dispatcher model was already created following the steps of one of the above tasks. To test this model with a tab-delimited text file run these commands:

```shell
dispatch test --testFilePath <text_file>
```

The output, Summary.html, contains all the evaluation results. The file is located in the location of the test file.

## Sample Code and Tutorial
C# Sample: https://github.com/Microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/14.nlp-with-dispatch

JS Sample: https://github.com/Microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/14.nlp-with-dispatch 

Tutorial: https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-tutorial-dispatch

## Troubleshooting

If you are using the Dispatch command line tool in Azure Pipelines with a [Microsoft-hosted agent](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops&tabs=yaml#use-a-microsoft-hosted-agent), you may encounter the following error:

> `Unable to install/use dotnet framework`

To fix this, make sure you are using the correct agent pool. In order to successfully run the .NET commands that Dispatch relies on, you will need to use Visual Studio 2017 on Windows Server 2016 (`vs2017-win2016`). In the web UI, you would select "Hosted VS2017":

![azurepipelinesagentpoolvmimages](https://user-images.githubusercontent.com/41968495/52246146-8ea81c00-2899-11e9-8ed1-5a0347ad12a5.jpg)

## FAQ
### Are entities in LUIS sub models transferred to Dispatch model?
Dispatch's main purpose is to route intent across multiple bot modules, thus it concerns only with intent classification.  Unless entities are used for intent classification, they won't be transferred to Dispatch app.  Since patterns are used for intent classification, they are transferred to the Dispatch model, and if they make use of entities, those entities will be transferred as well.  Dispatch creation will fail if total entities used in pattern exceed the entities limits [here](https://docs.microsoft.com/azure/cognitive-services/luis/luis-boundaries). The only workaround is to reduce that the total number of entities used in patterns in the sub LUIS models.

### What happen if combined utterances in the LUIS sub models and QnA kbs exceed the 15,000 utterance limit in LUIS?
Dispatch CLI will proportionally down sample utterances from each sub model so it won't exceed the 15,000 utterance limit.  Use the optional parameter "--doAutoActiveLearning true" for the create/refresh commands for intelligent down sampling, where only relevant 
examples will be retained.

### How do we update Dispatch model when LUIS sub models or QnA kbs are updated?
Use the refresh command to update your Dispatch model.



## Nightly builds

Nightly builds are based on the latest development code which means they may or may not be stable and probably won't be documented. These builds are better suited for more experienced users and developers although everyone is welcome to give them a shot and provide feedback.

You can get the latest nightly build of Dispatch from the [BotBuilder MyGet](https://botbuilder.myget.org/gallery) feed. To install the nightly - 

```shell
npm config set registry https://botbuilder.myget.org/F/botbuilder-tools-daily/npm/
```

Install using npm:
```shell
npm i -g botdispatch
```

To reset registry:
```shell
npm config set registry https://registry.npmjs.org/
```
