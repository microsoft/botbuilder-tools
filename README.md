
# ![Bot Framework Tools](./docs/media/BotFrameWorkTools-header.png)

### [Find out what's new!](https://github.com/Microsoft/botframework/blob/master/whats-new.md#whats-new)

## The new BF CLI replaces legacy standalone tools

The Bot Framework SDK team is happy to announce the General Availability of the consolidated bot framework CLI tool [bf-cli](https://aka.ms/bfcli). The new BF CLI tool will replace legacy standalone tools to manage Bot Framework bots and related services. The old tools will be ported over in phases and all new features, bug fixes, and further investments will focus on the new BF CLI.  Old tools will still work for the time being, but they are going to be deprecated in future releases.

Upon the release of Bot Framework SDK version 4.6 the following legacy tools have been ported: Chatdown, QnAMaker, LuisGen, and LuDown.  Dispatch CLI is on the path to be deprecated and replaced with [Orchestrator](https://aka.ms/bf-orchestrator).

To learn more about the BF CLI please visit the [BF CLI github repository](https://aka.ms/bfcli).

__The following page is about the legacy tools.__

# Bot Framework Tools 
[![Build Status](https://fuselabs.visualstudio.com/SDK_v4/_apis/build/status/Tools/Botbuilder-tools-js-daily?branchName=master)](https://fuselabs.visualstudio.com/SDK_v4/_build/latest?definitionId=467&branchName=master) [![Coverage Status](https://coveralls.io/repos/github/Microsoft/botbuilder-tools/badge.svg?branch=master)](https://coveralls.io/github/Microsoft/botbuilder-tools?branch=master) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

The Bot Framework tools are a collection of cross-platform command line tools designed to cover end-to-end bot development workflow. This repo is part of the [Microsoft Bot Framework](https://github.com/Microsoft/botframework) -  a comprehensive framework for building enterprise-grade conversational AI experiences.

| Stable release   | Tool | Description |
|-----------------|------|--------------|
| [![npm version](https://badge.fury.io/js/chatdown.svg)](https://badge.fury.io/js/chatdown) | [Chatdown](packages/Chatdown) | Prototype mock conversations in markdown and convert the markdown to transcripts you can load and view in the new V4 Bot Framework Emulator |
| [![npm version](https://badge.fury.io/js/msbot.svg)](https://badge.fury.io/js/msbot) |[MSBot](packages/MSBot)| Create and manage connected services in your bot configuration file|
| [![npm version](https://badge.fury.io/js/ludown.svg)](https://badge.fury.io/js/ludown) |[LUDown](packages/Ludown)| Build LUIS language understanding models using markdown files|
| [![npm version](https://badge.fury.io/js/luis-apis.svg)](https://badge.fury.io/js/luis-apis) |[LUIS](packages/LUIS)| Create and manage your [LUIS.ai](http://luis.ai) applications |
| [![npm version](https://badge.fury.io/js/qnamaker.svg)](https://badge.fury.io/js/qnamaker) |[QnAMaker](packages/QnAMaker) | Create and manage [QnAMaker.ai](http://qnamaker.ai) Knowledge Bases. |
| [![npm version](https://badge.fury.io/js/botdispatch.svg)](https://badge.fury.io/js/botdispatch) | [Dispatch](packages/Dispatch) | Build language models allowing you to dispatch between disparate components (such as QnA, LUIS and custom code)|
| [![npm version](https://badge.fury.io/js/luisgen.svg)](https://badge.fury.io/js/luisgen)| [LUISGen](packages/LUISGen) | Auto generate backing C#/Typescript classes for your LUIS intents and entities.|
## Install CLI tools:
Pre-requisite:
- [Node.js](https://nodejs.org/) version 10.14.1 or higher
- [.NET Core SDK](https://www.microsoft.com/net/download) version 2.1.403 or higher

```
npm install -g chatdown msbot ludown luis-apis qnamaker botdispatch luisgen
```

## Overview

- Please see [here](https://aka.ms/BotBuilderOverview) for an overview of the end-to-end bot development workflow.
- Please see [here](./tools-overview.md) for an overview of using Bot Builder tools throughout various phases of bot development.

Bot Builder tools are designed to work with
- Bot Builder V4 SDK - [C# SDK](https://github.com/microsoft/botbuilder-dotnet), [JS SDK](https://github.com/microsoft/botbuilder-js)
- [Bot Builder V3 SDK](https://github.com/microsoft/botbuilder-v3)
- [Bot Framework Emulator V4](https://github.com/Microsoft/BotFramework-Emulator/releases)

Before writing code, review the [bot design guidelines](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-design-principles) for best practices and identify the needs for your bot: will a basic bot be enough or whether it should have more sophisticated capabilities, such as speech, language understanding, QnA, or the ability to extract knowledge from different sources and provide intelligent answers. This is also the phase where you might want to create mockup of conversations between the user and the bot for the specific scenarios your bot will support. [Chatdown](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/Chatdown) is the tool built for this purpose. You can author .chat files that mockup the conversations and then use chatdown CLI to convert them into rich transcripts.

As you build your bot, you may also need to integrate AI services like [LUIS.ai](http://luis.ai) for language understanding, [QnAMaker.ai](http://qnamaker.ai) for your bot to respond to simple questions in a Q&A format, and more. You can bootstrap language understanding for your bot using [LUDown](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/Ludown).

The tools are designed to work together. You can then use [LUIS](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/LUIS) CLI and/or the [QnAMaker](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/QnAMaker) CLI tools to create your LUIS.ai models and QnAMaker knowledge base.

As your bot grows in sophistication, [Dispatch](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/Dispatch) CLI can help create and evaluate LUIS models used to dispatch intent across multiple bot modules such as LUIS models, QnA knowledge bases and others (added to dispatch as a file type).

Throughout the Build phase, you can use [MSBot](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/MSBot) CLI to create and keep your bot configuration file updated with all relevant service references.

To test and refine your bot, you can use the new [V4 Bot Framework Emulator](https://github.com/Microsoft/BotFramework-Emulator/releases). The Bot Framework Emulator is a cross-platform [Electron](https://electronjs.org/) application that enables you to test and debug your bots on local machine or in the cloud. The new emulator includes features like faster load times, an improved dynamic layout model, support for multiple bot configurations, simple bot components management, and the ability to inspect responses from connected services such as LUIS and QnA. The Bot Framework Emulator also deepens links to different parts used by the bot. The Bot Framework Emulator new functionality enables you to debug bots based on transcript logs and to view previous chat in presentation mode. The Bot Framework Emulator is available as open source on [Github](https://github.com/Microsoft/BotFramework-Emulator).

With the [Azure CLI Bot extension](./AzureCli), you can create, download, publish, configure channels with the [Azure Bot Service](https://azure.microsoft.com/en-us/services/bot-service/). Azure CLI Bot extension requires [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) (version 2.0.45 or higher]

## Building the tools

In order to build the SDK, ensure that you have [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/en/) installed.

Run the following commands to build all tools.

```
npm install
npm run build
```

Run the following command to verify your installation.

```
npm run test
```

This repository uses [lerna](https://github.com/lerna/lerna) to manage the packages included. This allows you to execute scripts for all packages or only for some packages. For instance, `lerna run test` will run all tests in each package, but `lerna run test --scope chatdown` will run the tests of chatdown.

To use lerna, install it as a global package with `npm install lerna --global`.



## Nightly builds

Nightly builds are generated using the latest code. Therefore, they may not be stable, and most likely lack up to date documentation. These builds are better suited for more experienced users, although everyone is welcome to use them and provide feedback.

You can get the latest nightly build of MSBot from the [BotBuilder MyGet](https://botbuilder.myget.org/gallery) feed. To install the nightly -

```shell
npm config set registry https://botbuilder.myget.org/F/botbuilder-tools-daily/npm/
```

Install using npm:
```shell
npm i -g chatdown msbot ludown luis-apis qnamaker botdispatch luisgen
```

To reset registry:
```shell
npm config set registry https://registry.npmjs.org/
```

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Reporting Security Issues
Security issues and bugs should be reported privately, via email, to the Microsoft Security Response Center (MSRC) at [secure@microsoft.com](mailto:secure@microsoft.com). You should receive a response within 24 hours. If for some reason you do not, please follow up via email to ensure we received your original message. Further information, including the [MSRC PGP](https://technet.microsoft.com/en-us/security/dn606155) key, can be found in the [Security TechCenter](https://technet.microsoft.com/en-us/security/default).

Copyright (c) Microsoft Corporation. All rights reserved.
