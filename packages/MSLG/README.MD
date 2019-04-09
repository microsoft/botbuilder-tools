# mslg
mslg tool has the ability to parse a .LG file that adheres to the LG file format. CLI tool should report an error on an statically detectable invalid .LG file. MSLG tool should also have the ability to generate a collated .LG file by parsing all provided (or found) .LG files. MSLG tool can also list all possible template expansions for a given template and test data for entity references.

## Prerequisite

- [Node.js](https://nodejs.org/) version 8.5 or higher

## Local Run
- Install dependency on [botbuilder-lg](https://github.com/Microsoft/botbuilder-js/tree/4.next/libraries/botbuilder-lg/src) package
  ```
  1. clone the repo of botbuilder-js
  2. switch to 4.next branch
  3. lerna run build
  4. import MSLGTool into Parser.ts and Expander.ts from botbuilder-js/libraries/botbuilder-lg/lib/MSLGTool
  5. npm run build
  ``` 
  The dependency will be removed once the botbuilder-lg package is published.
  
- Run command by ts-node:
  ```
  ts-node src/mslg-parse.ts --in examples/exceptionExamples/EmptyTemplate.lg
  ```

## Installation

To install:
```bash
npm i -g mslg
```

## Commands
```
>mslg

  Usage: mslg [command] [options]

  mslg is a command tool to take .lg files as input to parse lg files or collate and expand lg templates.

  Options:

    -v, --Version  output the version number
    -h, --help     output usage information

  Commands:

    parse|p        Parse any provided .lg file and collate all .lg files into a single file.
    expand|d       Expand one or all templates found in a .lg file.
    help [cmd]     display help for [cmd]
```

### Parse command

Parse any provided .lg file and collate all .lg files into a single file.
```
>mslg parse

  Usage: mslg parse [options]

  Parse any provided .lg file and collate all .lg files into a single file.

  Options:
  --in <lgFile>                    .lg file to parse
  -l, --lg_folder <inputFolder>    [Optional] Folder that has the .lg file. By default mslg will only look at the current folder. To look at all subfolders, include -s
  -s, --subfolder                  [Optional] Include sub-folders as well when looking for .lg files
  --out <outputFileName>           [Optional] Output .lg file name.
  -o, --out_folder <outputFolder>  [Optional] Output folder for all files the tool will generate
  --stdin                          [Optional] Read .lg file as stream from stdin to validate and collate
  --stdout                         [Optional] when set, write out the final file to stdout
  --verbose                        [Optional] Flag option used to request verbose output. With this option set, additional useful parse, validate and collate logs are written to stdout
  -c, --collate                    [Optional] If not set, same template name across multiple .lg files will throw exceptions.
  -h, --help                       output usage information
  ```

  ### Expand command
```
  Usage: mslg expand [options]

  Expand one or all templates found in a .lg file.

  Options:
  --in <lgFile>                        lg file to expand
  -t, --template <templateName>        Name of the template to expand. Template names with spaces must be enclosed in quotes.
  -e, --inline <expression>            [Optional] Inline expression provided as a string to evaluate.
  --all                                [Optional] Flag option to request that all templates in the .lg file be expanded.
  -i, --interactive                    [Optional] Flag option to request that all missing entity value references be obtained through interactive prompts.
  -j, --testInput <testInputJSONFile>  [Optional] full or relative path to a JSON file containing test input for all variable references.
  -o, --out_folder <outputFolder>      [Optional] Output folder for all files the tool will generate
  -h, --help                           output usage information
```

## Sample Usage
- [More Samples](examples/samples.md)

 ### Parse
```bash
mslg parse --in exceptionExamples/EmptyTemplate.lg    // parse the specific lg file.
```

 ### Collate
```bash
mslg parse -l validExamples -s --out finalResult -c    // parse and merge all templates under folder validExamples into single finalResult file.
```

 ### Expand
```bash
mslg expand --in validExamples/simple.lg -t FinalGreeting    // basic usage of expand command.
```

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