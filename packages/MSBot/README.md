[![npm version](https://badge.fury.io/js/msbot.svg)](https://badge.fury.io/js/msbot)

## The new BF CLI replaces legacy standalone tools

The Bot Framework SDK team is happy to announce the General Availability of the consolidated bot framework CLI tool [bf-cli](https://aka.ms/bfcli). The new BF CLI tool will replace legacy standalone tools to manage Bot Framework bots and related services. The old tools will be ported over in phases and all new features, bug fixes, and further investments will focus on the new BF CLI.  Old tools will still work for the time being, but they are going to be deprecated in future releases.

Upon the release of Bot Framework SDK version 4.6 the following legacy tools have been ported: Chatdown, QnAMaker, LuisGen, and LuDown.

To learn more about the BF CLI please visit the [BF CLI github repository](https://aka.ms/bfcli).

MSBot is no longer needed with the latest Bot Framework SDK.

__The following page is about a legacy tool.__

## MSBot Command Line tool

The MSBot tool is a command line tool to create and manage bot resources described via a .bot file. See [here](./docs/bot-file.md) to learn more about the .bot file. 

Bot Builder tools are designed to work together. Other Bot Builder tools like [LUIS CLI](../LUIS), [QnA Maker CLI](../QnAMaker), [Dispatch CLI](../Dispatch) and the [Bot Framework V4 Emulator](https://github.com/microsoft/botframework-emulator) are designed to work with the .bot file and the MSBot CLI.

## Prerequisite

- [Node.js](https://nodejs.org/) version 8.5 or higher

## Installation

To install using npm:

```shell
npm install -g msbot
```

This will install msbot into your global path.

To uninstall using npm:

```shell
npm uninstall -g msbot
```

## MSBot functionality
- [Create](./docs/create-bot.md) a .bot file
- [Encrypting keys](./docs/bot-file-encryption.md) in .bot file
- [Add services](./docs/add-services.md) to .bot file
- [List connected services](./docs/list-connected-services.md) in a .bot file
- [Remove connected service](./docs/remove-service.md) from .bot file
- Using MSBot CLI in conjunction with other CLIs
    - [MSBot and LUIS CLI](./docs/msbot-luis.md)
    - [MSBot and QnA Maker CLI](./docs/msbot-qnamaker.md)
    - [MSBot and Dispatch CLI](./docs/msbot-dispatch.md)
    - [MSBot and AZ CLI](./docs/msbot-az.md)
- [Exporting and cloning](./docs/export-clone.md) a bot

See [here](./docs/botframework-configuration.md) to learn about consuming the .bot file in your bots built with the [Bot Builder SDK](https://github.com/microsoft/botbuilder). This will enable seamless end-to-end creating, management and consumption of connected services your bot relies on.

See [here](https://github.com/microsoft/botframework-emulator) to learn more about Bot Framework Emulator V4. Emulator also relies on .bot file and provides rich UI based experience to connect and manage connected services your bot relies on. 

## Nightly builds

Nightly builds are based on the latest development code which means they may or may not be stable and probably won't be documented. These builds are better suited for more experienced users and developers although everyone is welcome to give them a shot and provide feedback.

You can get the latest nightly build of MSBot from the [BotBuilder MyGet](https://botbuilder.myget.org/gallery) feed. To install the nightly - 

```shell
npm config set registry https://botbuilder.myget.org/F/botbuilder-tools-daily/npm/
```

Install using npm:
```shell
npm i -g msbot
```

To reset registry:
```shell
npm config set registry https://registry.npmjs.org/
```
