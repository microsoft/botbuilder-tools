[![npm version](https://badge.fury.io/js/msbot.svg)](https://badge.fury.io/js/schemaMerge)

# SchemaMerge Command Line tool

SchemaMerge tool is a command line tool designed to merge together to merge together component JSON schema files into a single JSON schema file in order to support declarative file formats in the [Microsoft Bot Builder](https://github.com/Microsoft/BotBuilder).  The declarative files should have a filename with the name to use to refer to that type using `$type`.  Within a schema definition you can use `$implements:[<type>, ..]` to include the type definition into other union types which must use `oneOf` in their schema.  To refer to a type in a property, just use `"$type":"<type>"`.  The merger combines all of the component schemas into a single schema file that has resolved all `$ref`, merged `allOf` and connected together schemas through `$implements` and `$type`. 

For example look at these files:
* [Microsoft.IRecognizer.schema](test/definitions/Microsoft.IRecognizer.schema) defines the place holder for `Microsoft.IRecognizer` including a default option which is a bare string.    
* [Microsoft.LUISRecognizer.schema](test/implementations/Microsoft.LUISRecognizer.schema) includes `"$implements":\["Microsoft.IRecognizer"\]` which extends the `Microsoft.IRecognizer` definition when merged.  [Microsoft.RegexRecognizer.schema](test/implementations/Microsoft.RegexRecognizer.schema) is another implementation.
* [Microsoft.Topic.schema](test/implementations/Microsoft.Topic.schema) is a schema file that includes `"$type":"Microsoft.IRecognizer"` in order to make use of the `Microsoft.IRecognizer` place holder. 
* [app.schema](test/examples/app.schema) was created by this tool shows how all of these defintions are merged together.  In particular if you look at `Microsoft.IRecognizer` you will see the definition that includes a string, or the complete definition of `Microsoft.LUISRecognizer` or `Microsoft.RegexRecognizer`.

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