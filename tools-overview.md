# Tools Overview

[Bot Builder tools](./README.md) is a collection of cross-platform command line tools designed to cover end-to-end bot development workflow.

A typical end-to-end development workflow includes planning, building, testing, publishing, connecting and evaluation. Bot Builder tools are designed to work at each of those phases of development. See how Bot Builder tools can help with each of the typical development phases: 

- [**Plan**](#plan)
    - Review bot [design guidelines](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-design-principles) for best practices
    - Create mock conversations using [Chatdown](#create-mock-conversations-using-chatdown)
- [**Build**](#build)
    - Bootstrap Language Understanding with [Ludown](#bootstrap-language-understanding-with-ludown)
    - Keep track of service references using [MSBot](#keep-track-of-service-references-using-bot-file)
    - Create and manage LUIS applications using [LUIS CLI](#create-and-manage-luis-applications-using-luis-cli)
    - Create QnA Maker KB using [QnA Maker CLI](#create-qna-maker-kb-using-qna-maker-cli)
    - Create dipsatch model using [Dispatch CLI](#create-dipsatch-model-using-dispatch-cli)
- [**Test**](#test)
    - Test your bot using [Bot Framework Emulator V4](https://github.com/Microsoft/BotFramework-Emulator/releases)
- [**Publish**](#publish)
    - Create, download and publish bots to Azure Bot Service using [Azure CLI](https://github.com/Microsoft/botbuilder-tools/tree/master/AzureCli)
- [**Connect**](#configure-channels)
    - Connect your bot to Azure Bot Service channels using [Azure CLI](https://github.com/Microsoft/botbuilder-tools/tree/master/AzureCli)

# Plan 

## Create mock conversations using Chatdown

Chatdown is a transcript generator which consumes a .chat file to generate mock transcripts. Generated mock transcript files are output to stdout.

A good bot, just like any successful application or a website, starts with clearly defined scenarios. Creating mockups of conversations between bot and user is useful for:

- Framing the scenarios supported by the bot.
- Business decision makers to review, provide feedback.
- Defining conversation flow between the user and the bot using scenarios.
.chat file format helps you create mockups of conversations between a user and a bot. Chatdown CLI tool converts .chat files into conversation transcripts (.transcript files) that can be viewed in the [Bot Framework Emulator V4](https://github.com/microsoft/botframework-emulator).

Here's an example `.chat` file:

```markdown
user=Joe
bot=LulaBot

bot: Hi!
user: yo!
bot: [Typing][Delay=3000]
Greetings!
What would you like to do?
* update - You can update your account
* List - You can list your data
* help - you can get help

user: I need the bot framework logo.

bot:
Here you go.
[Attachment=bot-framework.png]
[Attachment=http://yahoo.com/bot-framework.png]
[AttachmentLayout=carousel]

user: thanks
bot:
Here's a form for you
[Attachment=card.json adaptivecard]

```

### Create a transcript file from .chat file
In the simplest form, a chatdown command looks like the following:
```bash
chatdown sample.chat > sample.transcript
```
This will consume `sample.chat` and output `sample.transcript`.

See [here](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/Chatdown) to learn more about the Chatdown CLI.

You can get the latest Bot Framework Emulator from [here](https://github.com/Microsoft/BotFramework-Emulator/releases)

# Build

## Bootstrap Language Understanding with Ludown
[LUDown](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/Ludown) allows you to describe and create powerful language components for bots using **.lu** files. The .lu file extends the markdown format. Ludown is a tool that can consume .lu file(s) outputs .json files specific to the target service. Currently, you can use .lu files to create a new [LUIS](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-get-started-create-app) application or [QnA](https://qnamaker.ai/Documentation/CreateKb) knowledge base, using different formats for each. LUDown is available as an npm module, and can be used by installing globally to your machine:

```shell
npm install -g ludown
```
The LUDown tool can be used to create new .json models for both LUIS and QnA.  


### Creating a LUIS application with LUDown

You can define [intents](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/add-intents) and [entities](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/add-entities) for a LUIS application just like you would from the LUIS portal. 

'#\<intent-name\>' describes a new intent definition section. Each line afterwards lists the [utterances](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/add-example-utterances) that describe the intent.

For example, you can create multiple LUIS intents in a single .lu file as follows: 

```LUDown
# Greeting
- Hi
- Hello
- Good morning
- Good evening

# Help
- help
- I need help
- please help
```

### QnA pairs with LUDown

The .lu file format supports also QnA pairs using the following notation: 

```LUDown
> comment
### ? question ?
  ```markdown
    answer
  ```

The LUDown tool will automatically separate question and answers into a qnamaker JSON file that you can then use to create your new [QnaMaker.ai](http://qnamaker.ai) knowledge base.

```LUDown
### ? How do I change the default message for QnA Maker?
  ```markdown
  You can change the default message if you use the QnAMakerDialog. 
  See [this link](https://docs.botframework.com/en-us/azure-bot-service/templates/qnamaker/#navtitle) for details. 
  ```

You can also add multiple questions for the same answer by adding new variations of the question.

```LUDown
### ? What is your name?
- What should I call you?
  ```markdown
    I'm the echoBot! Nice to meet you.
  ```

### Generating .json models with LUDown

After you've defined LUIS or QnA language components in the .lu format, you can create a LUIS .json, QnA .json, or QnA .tsv file. When run, the LUDown tool will look for any .lu files within the same working directory to parse. Since the LUDown tool can target both LUIS or QnA with .lu files, we simply need to specify which language service to generate for, using the general command **ludown parse <Service> -- in <luFile>**. 

### Generate LUIS .json models

To generate a LUIS model using LUDown, in your current working directory simply enter the following:

```shell
ludown parse ToLuis --in <luFile> 
```

### Generate QnA Knowledge Base

Similarly, to create a QnA knowledge base, you only need to change the parse target. 

```shell
ludown parse ToQna --in <luFile> 
```

The resulting JSON files can be consumed by LUIS and QnA either through their respective portals, or via the new CLI tools. 

See [here](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/Ludown) to learn more about the Ludown CLI.

## Keep track of service references using bot file

You can create a .bot file using the [MSBot](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/MSBot) tool. The .bot file stores metadata about services your bot consumes. The bot can connect to services stored in the .bot file using CLI tools.

```shell
npm install -g msbot 
```
See [here](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/MSBot/docs/bot-file.md) to learn more about .bot file.

To create a bot file, from your CLI enter **msbot init** followed by the name of your bot, and the target URL endpoint, for example:

```shell
msbot init --name TestBot --endpoint http://localhost:9499/api/messages
```
To connect your bot to a service, in your CLI enter **msbot connect** followed by the appropriate service:

```shell
msbot connect [Service]
```
| Command                                                 | Description                              |
|---------------------------------------------------------|------------------------------------------|
| [appinsights](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/MSBot/docs/add-services.md#connecting-to-azure-appinsights-service) | connect to Azure AppInsights             |
| [blob](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/MSBot/docs/add-services.md#connecting-to-azure-blob-service)               | connect to Azure Blob storage            |
| [bot](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/MSBot/docs/add-services.md#connecting-to-azure-bot-service)                 | connect to Azure Bot Service             |
| [cosmosdb](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/MSBot/docs/add-services.md#connecting-to-azure-cosmosdb-service)       | connect to Azure CosmosDB                |
| [dispatch](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/MSBot/docs/add-services.md#connecting-to-bot-dispatch)                 | connect to a Dispatch model              |
| [endpoint](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/MSBot/docs/add-services.md#connecting-to-a-endpoint-service)           | connect to endpoint                      |
| [file](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/MSBot/docs/add-services.md#connecting-to-file)                             | connect to file to the bot               |
| [generic](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/MSBot/docs/add-services.md#connecting-to-generic-service)               | connect to generic service configuration |
| [luis](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/MSBot/docs/add-services.md#connecting-to-luis-application)                 | connect to a LUIS application            |
| [qna](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/MSBot/docs/add-services.md#connecting-to-qna-maker-knowledge-base)          | connect to QNA a service                 |

See [here](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/MSBot) to learn more about the MSBot CLI.

## Create and manage LUIS applications using LUIS CLI

Included in the new tool set is a [LUIS extension](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/LUIS) that allows you to independently manage your LUIS resources. It is available as an npm module which you can download:

```shell
npm install -g luis-apis
```
The basic command usage for the LUIS tool from the CLI is:

```shell
luis <action> <resource> <args...>
```
To connect your bot to LUIS, you will need to create a **.luisrc** file. This configuration file provisions your LUIS appID and password to the service endpoint when your application makes outbound calls. You can create this file by running **luis init** as follows:

```shell
luis init
```
Enter your LUIS authoring key, region, and appID to generate the file.

After this file is generated, your application will be able to consume the LUIS .json file (generated from LUDown) using the following command from the CLI.

```shell
luis import application --in luis-app.json | msbot connect luis --stdin
```
See [here](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/LUIS) to learn more about the LUIS CLI.

## Create QnA Maker KB using QnA Maker CLI

You can manage your LUIS resources using the [QnA Maker CLI](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/QnAMaker) tool.

```shell
npm install -g qnamaker
```
With the QnA maker tool, you can create, update, publish, delete, and train your knowledge base. You can use files generated via [ludown parse toqna](#generate-qna-knowledge-base) command to create/ replace a knowledge base.

```shell
qnamaker create --in qnaKB.json --msbot | msbot connect qna --stdin
```

See [here](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/QnAMaker) to learn more about the QnA Maker CLI.

## Create dipsatch model using Dispatch CLI

The Dispatch tool is used to create, evaluate, and dispatch intent across multiple LUIS models and QnA knowledge bases.

Use the Dispatch model in cases when:

- Your bot consists of multiple modules (e.g. HR, Payroll, Finance as separate modules) and you need assistance in routing user's utterances to these modules and evaluate the bot integration.
- Evaluate quality of intents classification of a single LUIS model.
- Create a text classification model from text files.

After you have added LUIS and QnA services to the .bot file, you can build the dispatch model using:

```shell
dispatch create -b <YOUR-BOT-FILE> | msbot connect dispatch --stdin
```
See [here](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/Dispatch) to learn more about the Dispatch CLI.

# Test

The Bot Framework Emulator is a desktop application that allows bot developers to test and debug their bots on localhost or running remotely through a tunnel.

## Download

* From the [GitHub releases](https://github.com/Microsoft/BotFramework-Emulator/releases) page

## Supported platforms

* Windows
* OS X
* Linux

# Publish

You can use the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) tool to [create](#create-azure-bot-service-bot), [download](#download-azure-bot-service-bot) and [publish](#publish-azure-bot-service-bot) your bot to Azure Bot Service.

## Installation
- Install the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) to [create](#create-azure-bot-service-bot)
- Install the bot extension via: 
```shell
az extension add -n botservice
```

## Create Azure Bot Service bot

Login to your azure account via 
```shell
az login
```

Once you are logged in, you can create a new Azure Bot Service bot using: 
```shell
az bot create [options]
```

To create a bot and update the .bot file with the bot configuration,  
```shell
az bot create [options] --msbot | msbot connect bot --stdin
```

If you have an existing bot,  
```shell
az bot show [options] --msbot | msbot connect bot --stdin
```

| Option                            | Description                                   |
|-----------------------------------|-----------------------------------------------|
| --kind -k [Required]              | The Kind of the Bot.  Allowed values: function, registration, webapp.|
| --name -n [Required]              | The Resource Name of the bot. |
| --appid                           | The msa account id to be used with the bot.   |
| --location -l                     | Location. You can configure the default location using `az configure --defaults location=<location>`.  Default: westus.|
| --msbot                           | Show the output as json compatible with a .bot file.  Allowed values: false, true.|
| --password -p                     | The msa password for the bot from developer portal. |
| --resource-group -g               | Name of resource group. You can configure the default group using `az configure --defaults group=<name>`.  Default: build2018. |
| --tags                            | Set of tags to add to the bot. |


# Configure channels

You can use the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) to connect/ manage channels for your bot. 

    >az bot -h

    Group
        az bot: Manage Bot Services.

    Subgroups:
        directline: Manage Directline Channel on a Bot.
        email     : Manage Email Channel on a Bot.
        facebook  : Manage Facebook Channel on a Bot.
        kik       : Manage Kik Channel on a Bot.
        msteams   : Manage Msteams Channel on a Bot.
        skype     : Manage Skype Channel on a Bot.
        slack     : Manage Slack Channel on a Bot.
        sms       : Manage Sms Channel on a Bot.
        telegram  : Manage Telegram Channel on a Bot.
        webchat   : Manage Webchat Channel on a Bot.

    Commands:
        create    : Create a new Bot Service.
        delete    : Delete an existing Bot Service.
        download  : Download an existing Bot Service.
        publish   : Publish to an existing Bot Service.
        show      : Get an existing Bot Service.
        update    : Update an existing Bot Service.

# Resources
* [Microsoft Bot Framework](https://botframework.com)
* [BotBuilder SDK](https://github.com/Microsoft/BotBuilder)
* [BotBuilder Tools](https://github.com/Microsoft/BotBuilder-Tools)
* [BotFramework-WebChat](https://github.com/Microsoft/BotFramework-WebChat)