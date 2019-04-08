# mslg
mslg tool has the ability to parse a .LG file that adheres to the LG file format. CLI tool should report an error on an statically detectable invalid .LG file. MSLG tool should also have the ability to generate a collated .LG file by parsing all provided (or found) .LG files. MSLG tool can also list all possible template expansions for a given template and test data for entity references.

## Prerequisite

- [Node.js](https://nodejs.org/) version 8.5 or higher

## Installation

To install:
```bash
npm i -g mslg
```

## Docs
- [mslg commands](docs/commands.md)
- [Samples](examples/samples.md)
- mslg as a library

## Use mslg as a library
mslg can be used within a Node.js application as an imported library. Install locally:

```bash
npm install mslg --save
```

## Nightly builds

Nightly builds are based on the latest development code which means they may or may not be stable and probably won't be documented. These builds are better suited for more experienced users and developers although everyone is welcome to give them a shot and provide feedback.

You can get the latest nightly build of Ludown from the [BotBuilder MyGet](https://botbuilder.myget.org/gallery) feed. To install the nightly - 

```shell
npm config set registry https://botbuilder.myget.org/F/botbuilder-tools-daily/npm/
```

Install using npm:
```shell
npm i -g mslg
```

To reset registry:
```shell
npm config set registry https://registry.npmjs.org/
```