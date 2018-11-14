# Refresh command
After you have bootstrapped and created your LUIS model and / or QnAMaker knowledge base, you might make subsequent refinements to your models directly from [luis.ai](https://luis.ai/) or [qnamaker.ai](https://qnamaker.ai). You can use the refresh command to re-generate .lu files from your LUIS JSON and / or QnAMaker JSON files.  

```
>ludown refresh -h

  Usage: ludown refresh -i <LUISJsonFile> | -q <QnAJSONFile>

  Convert LUIS JSON and/ or QnAMaker JSON file into .lu file

  Options:

    -i, --LUIS_File <LUIS_JSON_File>            [Optional] LUIS JSON input file name
    -q, --QNA_FILE <QNA_FILE>                   [Optional] QnA Maker JSON input file name
    -o, --out_folder <outputFolder> [optional]  [Optional] Output folder for all files the tool will generate
    -n, --lu_File <LU_File>                     [Optional] Output .lu file name
    --verbose                                   [Optional] Get verbose messages from parser
    -s, --skip_header                           [Optional] Generate .lu file without the header comment
    --prefix                                    [Optional] append [ludown] prefix to all messages
    --stdin                                     [Optional] Read input from stdin
    --stdout                                    [Optional] Write output to stdout only. Specifying this option will not write any generated content to disk
    -h, --help                                  output usage information
```

# Exporting LUIS model (for ludown refresh command)
## Using CLI
```bash
luis export version --appId <string> --versionId <string> --authoringKey <key>
```
## using [LUIS](http://luis.ai) portal
- Navigate to [LUIS](http://luis.ai)
- Sign in
- Click on My apps
- Find the app you wish to download, click "..." -> Export app

# Exporting QnA Maker 
## using CLI
```bash
qnamaker export kb --kbid "" --environment <string>
```

## Piping commands
You can pipe output of luis or qnamaker commands to generate a .lu file. Here are few examples
```
> luis export version --appId <YOUR-LUIS-APP-ID> --versionId <YOUR-LUIS-APP-VERSION> | ludown refresh --stdin -o c:\test -n app1.lu

> qnamaker export kb --kbId <YOUR-KB-ID> --environemnt <TEST-OR-PROD> --hostname <YOUR-HOST-NAME> --endpointKey <YOUR-ENDPOINT-KEY> --subscriptionKey <YOUR-SUBSCRIPTION-KEY> | ludown refresh --stdin -o c:\test -n kb1.lu
```

