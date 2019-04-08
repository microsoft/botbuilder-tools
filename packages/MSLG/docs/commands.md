# Commands
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

## Parse command

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

  ## Expand command
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