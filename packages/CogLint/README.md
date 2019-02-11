[![npm version](https://badge.fury.io/js/msbot.svg)](https://badge.fury.io/js/cogLint)

# CogLint Command Line tool

CogLint is a command line tool that analyzes JSON .cog files created for the Bot Framework.  It builds an index of how components relate to each other using $type, $id and $ref and prints out the definition map and any errors found including: 
* **Missing $type:** A valid component must include a $type.
* **Multiple definitions for an $id:** There should be only one definition for a $id.
* **Undefined $id:** Missing definition for $id.
References to definitions show up in this format `TYPE[ID](file#path)`.

The indexing functionality is also available to be used in a program to map from id or type to component definitions.  You can also identify errors and update the map.  Check out [index.ts](src/index.ts) for more.

## Prerequisite

- [Node.js](https://nodejs.org/) version 8.5 or higher

## Installation

To install using npm:

```shell
npm install -g cogLint
```

This will install cogLint into your global path.

To uninstall using npm:

```shell
npm uninstall -g cogLint
```
## Nightly builds

Nightly builds are based on the latest development code which means they may or may not be stable and probably won't be documented. These builds are better suited for more experienced users and developers although everyone is welcome to give them a shot and provide feedback.

You can get the latest nightly build of CogLint from the [BotBuilder MyGet](https://botbuilder.myget.org/gallery) feed. To install the nightly - 

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