 # LUISGen Command Line Tool 
 [![npm version](https://badge.fury.io/js/luisgen.svg)](https://badge.fury.io/js/luisgen)

 LUISGen is a tool for generating a strongly typed C# class or typescript
 interface to make consuming LUIS output easier. This enables build-time error
 checking and intellisense against the entities which are defined in your LUIS 
 application model.

 ## Prerequisite

This tool depends on having [DotNet Core SDK 2.1](https://www.microsoft.com/net/download) installed 
on your system. 

## Installation 
LUISGen is a .NET Core Tool and can be installed directly using .NET Core command line:

```shell
dotnet tool install -g LUISGen
```

This NPM package is a simple wrapper around the **dotnet tool install** command.

```shell 
npm install -g luisgen 
```

## Generating a class for your LUIS application
The LUISGen tool generates a strongly typed class for the intents and entities which are defined in your 
LUIS application model. 

To generate from a saved model .JSON file you invoke from the CLI like this:
```shell
LUISGen <AppNameLUISExport.json> [-cs|-ts] CLASSNAME -o PATH
```

If a .JSON file is not passed in, LUISGen will assume that the JSON is being piped in via stdin. This
allows you to use the [LUIS CLI tool](https://www.npmjs.com/package/luis-apis) to export your 
application model and pipe it directly into the LUISGen tool like this:

```shell
luis export version --appId {luisAppId} --versionId {versionId} --authoringKey {authoringKey} 
    | luisgen [-cs|-ts] CLASSNAME -o PATH
```

> NOTE: The [LUIS CLI tool](https://www.npmjs.com/package/luis-apis) can be installed with the npm command: `npm install -g luis-apis`

At least one of `-cs` or `-ts` must be supplied:

1) `-cs {CLASSNAME}` - Generates C# class file including namespace. 
Default is Luis.APPNAME if no class name is specified. 

2) `-ts {CLASSNAME}` - Generates Typescript interface descriptions. Default is APPNAME if no class
name is specified. 

`-o PATH` specifies the output path to the generated files. Default value is
the directory where the export file is located.

## Using the generated class in C# 1) Add the `.cs` file to your project. 2)
Call your `LuisRecognizer` instance supplying the type to `.Recognize`:

```cs
var result = recognizer.Recognize<CLASSNAME>("hi", CancellationToken.None);
```

The variable will be strongly typed LUIS result.

## Using the generated class in Typescript 
1) Add the `.ts` file to your project. 
2) Call your `LuisRecognizer` instance and type the returned result with your class.

```typescript
let app : CLASSNAME = await recognizer.recognize(context);
```

The callback value app will be a strongly typed LUIS result.
