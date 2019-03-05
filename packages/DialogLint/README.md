[![npm version](https://badge.fury.io/js/msbot.svg)](https://badge.fury.io/js/dialogLint)

# DialogLint Command Line tool

DialogLint is a command line tool that analyzes JSON .dialog files created for the Bot Framework.  It builds an index of dialog components and how they relate to each other using $type, $id and $copy.  From this information it prints out information about types and any errors including: 
* **Missing $type:** A valid component must include a $type.
* **Multiple $id definitions:** There should be only one definition for a $id.
* **Incompatible types between $copy and $id:** 
* **Undefined $id** 
* **Schema validation:** Reports JSON schema validation errors.
* **Malformed JSON:** Reports files which do not contain valid JSON.
References to definitions show up in this format `TYPE[ID](file#/path)`.

You can also optionally update your .lg files with templates specific to your dialog files by using the -w switch.

# DialogTracker class
If you need to work with dialog files, you can make use of the [`DialogTracker`](../dialogTracker/docs/classes/_dialogtracker_.dialogtracker.html) class which supports reading, updating, writing and indexing dialog files with both schema and semantic validation.  The [`DialogLint`](src/dialogLint.ts) tool shows an example of how to use the tracker to read in files and report various kinds of errors.  You can also use the class as an in-memory cache of dialog definitions, .lg files and their relationships.

## Prerequisite

- [Node.js](https://nodejs.org/) version 8.5 or higher

## Installation

To install using npm:

```shell
npm install -g dialogLint
```

This will install dialogLint into your global path.

To uninstall using npm:

```shell
npm uninstall -g dialogLint
```
## Nightly builds

Nightly builds are based on the latest development code which means they may or may not be stable and probably won't be documented. These builds are better suited for more experienced users and developers although everyone is welcome to give them a shot and provide feedback.

You can get the latest nightly build of DialogLint from the [BotBuilder MyGet](https://botbuilder.myget.org/gallery) feed. To install the nightly - 

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