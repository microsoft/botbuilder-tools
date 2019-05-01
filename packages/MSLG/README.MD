> *NOTE: This is a **preview** tool and breaking changes may happen before it is released*.

# MSLG Command Line tool
MSLG is a command line tool that parses .lg files which adheres to the [LG file format](https://github.com/Microsoft/BotBuilder-Samples/blob/master/experimental/language-generation/docs/lg-file-format.md). MSLG CLI tool can:
- Report an error on invalid .lg file. All errors that are statically detectable are reported.
- Generate a collated .lg file by parsing and analyzing more than one .lg files.
- Expand any given template (or all templates in a file) based on test values for entity references.

## Prerequisite

- [Node.js](https://nodejs.org/) version 8.5 or higher

## Installation

To install:
```bash
npm i -g mslg
```

## Commands
```
>mslg

  Usage: mslg [command] [options]

  mslg is a command line tool to parse and collate lg files or expand lg templates.

  Options:

    -v, --Version  output the version number
    -h, --help     output usage information

  Commands:

    parse|p        Parse any provided .lg file and collate them into a single file.
    expand|d       Expand one or all templates in a .lg file or an inline expression.
    help [cmd]     display help for [cmd]
```

### Parse command

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

  Expand one or all templates in a .lg file or an inline expression.

  Options:
  --in <lgFile>                        lg file to expand
  -t, --template <templateName>        Name of the template to expand. Template names with spaces must be enclosed in quotes.
  -e, --inline <expression>            [Optional] Inline expression provided as a string to evaluate.
  --all                                [Optional] Flag option to request that all templates in the .lg file be expanded.
  -i, --interactive                    [Optional] Flag option to request that all missing entity value references be obtained through interactive prompts.
  -j, --testInput <testInputJSONFile>  [Optional] full or relative path to a JSON file containing test input for all variable references.
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
