[![npm version](https://badge.fury.io/js/msbot.svg)](https://badge.fury.io/js/schemaMerge)

# SchemaMerge Command Line tool

SchemaMerge tool is a command line tool designed to merge together to merge together component JSON schema files into a single JSON schema file in order to support declarative file formats in the [Microsoft Bot Builder](https://github.com/Microsoft/BotBuilder).  The declarative file formats require components to have a `$type` property for defining the type of object to be created.  A single schema file is created by by following `$ref` and removing `allOf` schema commands.  It also supports aggregating schema definitions at runtime into higher level definitions.  If a schema file contains a `$defines` command and has a top-level `oneOf` element, then any other file that contains `$implements` with the same name have their `$type` be added to the `oneOf`.  This allows creating multiple independent components that can be rolled together into higher level definitions for a particular purpose.

For example look at these files:
* [IRecognizer.schema](test/definitions/IRecognizer.schema) uses `"$defines": "Microsoft.IRecognizer"` to indicate that this is a definition for `Microsoft.IRecognizer` which can be extended by merging schema files using this tool.  
* [topic.schema](test/implementations/topic.schema) shows the schema file for `$type Microsoft.Topic` which makes use `IRecognizer.schema` which only supports a plain string, but will be extended by other schema files when merged.
* [LUISRecognizer.schema](test/implementations/luisRecognizer.schema) shows the schema file for `$type Microsoft.LUISRecognizer` which `"$implements":\["Microsoft.IRecognizer"\]`.  [RegexRecognizer.schema](test/implementations/regexRecognizer.schema) is another implementation.
* [app.schema](test/examples/app.schema) was created shows how all of these defintions are merged together.  In particular if you look at `Microsoft.IRecognizer` you will see the definition know includes a string, or the complete definition of `Microsoft.LUISRecognizer` or `Microsoft.RegexRecognizer`.

[example.json](test/examples/example.json) Shows how you could use the resulting schema to enter in JSON schema and get intellisense.

## Prerequisite

- [Node.js](https://nodejs.org/) version 8.5 or higher

## Installation

To install using npm:

```shell
npm install -g schemaMerge
```

This will install schemaMerge into your global path.

To uninstall using npm:

```shell
npm uninstall -g schemaMerge
```

## SchemaMerge functionality
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

See [here](./docs/botframework-configuration.md) to learn about consuming the .bot file in your bots built with the [Bot Builder SDK](microsoft/botbuilder). This will enable a seamless end-to-end creating, management and consumption of connected services your bot relies on.

See [here](https://github.com/microsoft/botframework-emulator) to learn more about Bot Framework Emulator V4. Emulator also relies on .bot file and provides rich UI based experience to connect and manage connected services your bot relies on. 

## Nightly builds

Nightly builds are based on the latest development code which means they may or may not be stable and probably won't be documented. These builds are better suited for more experienced users and developers although everyone is welcome to give them a shot and provide feedback.

You can get the latest nightly build of SchemaMerge from the [BotBuilder MyGet](https://botbuilder.myget.org/gallery) feed. To install the nightly - 

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