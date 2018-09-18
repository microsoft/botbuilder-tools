# LUISGen Command Line Tool
[![npm version](https://badge.fury.io/js/luisgen.svg)](https://badge.fury.io/js/luisgen)

LUISGen is a tool for generating a strongly typed C# class or typescript interface to make consuming LUIS output easier.  This enables build-time error checking and intellisense.

## Prerequisite

[Node.js](https://nodejs.org/) version 8.5 or higher.

To use C# generated files you may require the latest unpubplished NuGet Bot Builder packages.  They should be downloaded from the private nuget feed
https://botbuilder.myget.org/F/botbuilder-v4-dotnet-daily/api/v3/index.json

To use Typescript generated files you may require the latest unpublished npm Bot Builder pakages. To install from the daily feed follow these instructions in the LUISGenTestJS 
diretory.
- Point to the myget feed 
    ```bash
    npm config set registry https://botbuilder.myget.org/F/botbuilder-v4-js-daily/npm/
    ```
- Install modules
    ```bash
    npm install
    ```
- To reset registry, you can do
    ```bash
    npm config set registry https://registry.npmjs.org/
    ```

## Installation
To install LUISGen into the global path:

```shell
npm install -g luisgen
```

## Generating a class

Generate a strongly typed class for consuming intents and entities from a LUIS export file:
`LUISGen <AppNameLUISExport.json> [-cs [[NAMESPACE.]CLASS]] [-ts [CLASS]] [-o PATH]`

If the input is empty, LUISGen will get the export file from stdin.

At least one of `-cs` or `-ts` must be supplied:

1) Generate C# class file including namespace.  Default is Luis.APPNAME if no class name is specified.
`cs [[NAMESPACE.][CLASS]]`

2) Generate Typescript interface descriptions.  Default is APPNAME if no class name is specified.
`-ts [CLASS]`

`-o PATH` specifies the output path to the generated files. Default value is the directory where the export file is located.

## Using the generated class in C#
1) Add the `.cs` file to your project.
2) Call your `LuisRecognizer` instance supplying the type to `.Recognize`:

    `var result = recognizer.Recognize<APPNAME>("hi", CancellationToken.None);`

The variable will be strongly typed LUIS result.

## Using the generated class in Typescript
1) Add the `.ts` file to your project.
2) Call your `LuisRecognizer` instance and type the returned result with your class.

    `recognizer.recognize(context).then(app : APPNAME => {});`

The callback value app will be a strongly typed LUIS result.

## Nightly builds

Nightly builds are based on the latest development code which means they may or may not be stable and probably won't be documented. These builds are better suited for more experienced users and developers although everyone is welcome to give them a shot and provide feedback.

You can get the latest nightly build of LUISGen from the [BotBuilder MyGet](https://botbuilder.myget.org/gallery) feed. To install the nightly - 

```shell
npm config set registry https://botbuilder.myget.org/F/botbuilder-tools-daily/npm/
```

Install using npm:
```shell
npm i -g luisgen
```

To reset registry:
```shell
npm config set registry https://registry.npmjs.org/
```
