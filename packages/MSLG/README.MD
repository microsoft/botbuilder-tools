# mslg
## Please notice that this package is still in Preview.
mslg tool has the ability to parse a .LG file that adheres to the LG file format. CLI tool should report an error on an statically detectable invalid .LG file. MSLG tool should also have the ability to generate a collated .LG file by parsing all provided (or found) .LG files. MSLG tool can also list all possible template expansions for a given template and test data for entity references.

## Prerequisite

- [Node.js](https://nodejs.org/) version 8.5 or higher

## Local Run
- Install dependency on [botbuilder-lg](https://github.com/Microsoft/botbuilder-js/tree/4.next/libraries/botbuilder-lg/src) package
  ```
  1. clone the repo of botbuilder-js
  2. switch to 4.next branch
  3. npm install and npm run build
  ``` 
  The dependency will be removed once the botbuilder-lg package is published.

- Switch to MSLG tool package
```
  1. Replace the import path of MSLGTool in Parser.ts and Expander.ts to the right path of your botbuilder-js package like below
    import { MSLGTool } from '{path_to_your_botbuilder-lg_package}/lib/MSLGTool';
  2. run npm install to install dependent packages
  3. run tsc to build the tool
  3. run npm i -g to install this package locally
```
- Run command
  ```
  mslg parse --in examples/exceptionExamples/EmptyTemplate.lg
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
mslg parse --in examples/exceptionExamples/EmptyTemplate.lg    // parse the specific lg file.
```

 ### Collate
```bash
mslg parse -l examples/validExamples -s --out finalResult -c    // parse and merge all templates under folder validExamples into single finalResult file.
```

 ### Expand
```bash
mslg expand --in examples/validExamples/simple.lg -t FinalGreeting    // basic usage of expand command.
```
