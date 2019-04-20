[![npm version](https://badge.fury.io/js/msbot.svg)](https://badge.fury.io/js/dialogSchema)

> *NOTE: This is a **preview** tool and breaking changes may happen before it is released*.
>
> This tool is for working with **Bot Framework SDK 4.5 preview** .dialog files 

# DialogSchema Command Line tool

DialogSchema tool is a command line tool designed to merge together [Microsoft Bot Builder](https://github.com/Microsoft/BotBuilder) .schema JSON schema files into a single JSON schema file. You can point to the files either directly with a glob pattern or indirectly through a glob pattern that matches a package.json, packages.config or *.csproj file.  The .schema files should have a unique filename that is used to refer to that type using `$type`.  The .schema files can optionally include a `$schema: "https://raw.githubusercontent.com/Microsoft/botbuilder-tools/SchemaGen/packages/DialogSchema/src/dialogSchema.schema"` which defines the schema they are validated against.  Within a schema definition you can use `$role:"unionType(<type>)` to project the type definition into union types defined using `$role:"unionType"` while merging.  To refer to a type in a property, just use `"$type":"<type>"`.  The merger combines all of the component .schema files into a single .schema file that has resolved all external `$ref`, merged `allOf` and connected together schemas through `$role` and `$type`. 

In addition to types you can also mark properties with a `$role` which will define the underlying type and restrictions.  This is also useful information for UI tools to help you construct values.  Roles include:
* `"$role": "expression"`which marks a string property which is expected to contain an expression string.
* `"$role": "lg"`which marks a string property which is used for lanuage generation and can refer to LG templates.
* `"$role": "memoryPath"`which marks a string property which is expected to contain a path in memory like `user.name`.

For example look at these files:
* [Microsoft.IRecognizer.schema](test/definitions/Microsoft.IRecognizer.schema) defines the place holder for `Microsoft.IRecognizer` including a default option which is a bare string.    
* [Microsoft.LUISRecognizer.schema](test/implementations/Microsoft.LUISRecognizer.schema) includes `"$implements":\["Microsoft.IRecognizer"\]` which extends the `Microsoft.IRecognizer` definition when merged.  [Microsoft.RegexRecognizer.schema](test/implementations/Microsoft.RegexRecognizer.schema) is another implementation.
* [Microsoft.Topic.schema](test/implementations/Microsoft.Topic.schema) is a schema file that includes `"$type":"Microsoft.IRecognizer"` in order to make use of the `Microsoft.IRecognizer` place holder. 
* [app.schema](test/examples/app.schema) was created by this tool shows how all of these defintions are merged together.  In particular if you look at `Microsoft.IRecognizer` you will see the definition that includes a string, or the complete definition of `Microsoft.LUISRecognizer` or `Microsoft.RegexRecognizer`.

[example.dialog](test/examples/example.dialog) Shows how you could use the resulting schema to enter in JSON schema and get intellisense.

## Prerequisite

- [Node.js](https://nodejs.org/) version 8.5 or higher

## Installation

To install using npm:

```shell
npm install -g dialogSchema
```

This will install dialogSchema into your global path.

To uninstall using npm:

```shell
npm uninstall -g dialogSchema
```
## Nightly builds

Nightly builds are based on the latest development code which means they may or may not be stable and probably won't be documented. These builds are better suited for more experienced users and developers although everyone is welcome to give them a shot and provide feedback.

You can get the latest nightly build of DialogSchema from the [BotBuilder MyGet](https://botbuilder.myget.org/gallery) feed. To install the nightly - 

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
