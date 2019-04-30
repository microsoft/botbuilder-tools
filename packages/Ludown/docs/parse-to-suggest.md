# Parse to suggest

Parse to suggest command examines every single .lu and .qna files and suggests one or more [LUIS][1] and or [QnA Maker][2] models. 

``` 
Usage: ludown parse ToSuggest --lu_folder <inputFolder> --root_dialog <rootDialogName> [-o] [-c] [-e] [-q] [-u]

Looks at your .lu and .qna files and suggests one or more LUIS and/or QnA maker applications.
Outputs a luconfig.json config and suggested model files for LUIS and QnA.

Options:
  -f, --lu_folder <inputFolder>         [Required] Folder that has the .lu files. By default ludown will only look at the current folder. To look at all subfolders, include -s
  -r, --root_dialog <rootDialogName>    [Required] Name of folder that contains the root dialog
  -o, --out_folder <outputFolder>       [Optional] Output folder for all files the tool will generate
  -c, --luis_culture <luis_appCulture>  [Optional] LUIS app culture of the rootDialog. Defaults to en-us if not specified. (default: "en-us")
  -e, --cross_feed_models               [Optional] When set, NONE intent for child models will be cross trained with other trigger intents.
  -q, --add_qna_pairs                   [Optional] Instructs parser to add questions to a QnA intent.
  -u, --auto_add_qna_metadata           [Optional] Automatically set QnA meta data to include child dialog name
  --verbose                             [Optional] Get verbose messages from parser
  -h, --help                            output usage information

```

## What is suggested
Given a folder structure with .lu and or .qna files, this command will suggest at most
- one LUIS application per locale x scenario 
- one QnA Maker application per locale
- one QnA Maker alternations model per locale

This command will also automatically write out a **luconfig.json** configuration that you can use with the [LUBuild CLI tool][3].

## Detecting locale
The parser assumes that lang x locale is encoded on each .lu or .qna maker file via \<name\>.**\<locale\>**.lu or \<name\>.**\<locale\>**.qna

Example - 

| FileName | Interpretation |
|----------|----------------|
| rootDialog.lu | No locale inferred unless -c is explicitly specified. Note: parse command will default to en-us |
| rootDialog.en-us.lu | Locale: 'en-us' |
| rootDialog.en.lu | Locale: 'en' |
| rootDialog.fr-fr.lu | Locale: 'fr-fr' |

## Folder structure
This command relies on the .lu and .qna files to be in a specific folder structure hierarchy to work correctly. 

**rootDialog** is defined as the main dispatcher dialog for your bot that dispatches to the right sub-scenario. 

    .\<scenarioName>\*.<locale>.[lu|qna]

For your .lu and .qna files, you can have arbitrary depth of sub-folders under `scenarioName` folder. 

Here is an example of a valid folder structure with `weather`, `bookFlight` and `chitChat` as scenarios. This example also has model definitions for `fr-fr` and `en-us` locales - 
```
    .\rootDialog\
         rootDialog.lu
         rootDialog.qna
    .\weather\
         weather.fr-fr.lu
         weather.lu
         weather.qna
    .\bookFlight\
         bookFlight.lu
         bookFlight.qna
         \Help\
             bookFlightHelp.qna
             bookFlightHelp.fr-fr.qna
    .\chitChat\
         chitChat.qna
```

For additional examples, see [here][4].

## Available options

### -c, --luis_culture <luis_appCulture>
With this option, you can let the parse command know how to treat .lu and .qna files that do not have a locale in the file name. 

e.g. with `-c fr-fr` passed in, this file `bookFlight.lu` will be treated as it belongs to the `fr-fr` locale. This bears an impact on the LUIS locale set in the output model JSON.

This option defaults to `en-us` when no value is specified.

### -e, --cross_feed_models
With this option set, 'None' LUIS intent for all child models (models found under folders other than the `rootDialog` folder) will be cross trained with trigger intents of other children.

As an example, given this folder structure - 
```
    .\rootDialog\
         rootDialog.lu
         rootDialog.qna
    .\weather\
         weather.lu
         weather.qna
    .\bookFlight\
         bookFlight.lu
         bookFlight.qna
    .\chitChat\
         chitChat.qna
```

with the --cross_feed_models option specified, the child LUIS application for `weather` (if suggested) will include the utterances for the trigger intent of `bookFlight` and vice-versa.

See [here](#Trigger-intent) for an explanation of how the trigger intent is determined. 

### -q, --add_qna_pairs 
With this option set, the parser will add any found questions from `QnA pairs` found under the specific scenario folder to a `'QnA'` intent in that scenario's LUIS application (if suggested).

As an example, given this folder structure - 
```
    .\rootDialog\
         rootDialog.lu
         rootDialog.qna
    .\weather\
         weather.lu
         weather.qna
```

with the --add_qna_pairs option set, the LUIS application for `weather` will include a `'QnA'` intent definition that has all the questions found in `weather.qna` as example utterances.

### -u, --auto_add_qna_metadata
With this option set, the parser will automatically add `dialogName=\<scenarioName\>` as [QnA maker meta-data][5] to all QnA pairs under a specific scenario.

As an example, given this folder structure - 
```
    .\rootDialog\
         rootDialog.lu
         rootDialog.qna
    .\weather\
         weather.lu
         weather.qna
```
with the --auto_add_qna_metadata option set, the QnA maker model suggested will include `dialogName=weather` for all QnA pairs found in `weather.qna`.

## Trigger intent
A trigger intent for a scenario is identified by \<DialogName\>.lu (or a .lu file in that dialog's folder) that has either: 
- an intent named 'DialogName' or 
- an intent definition that includes `[trigger intent]` suffix.

As an example, given this folder structure - 

```
    .\rootDialog\
         rootDialog.lu
         rootDialog.qna
    .\weather\
         weather.lu
         weather.qna
```

This is a valid `Trigger intent` definition for the `weather` scenario because the intent name `weather` matches the name of the scenario `weather` (name of the containing folder).

```markdown

> Content of .\weather\weather.lu

# weather
- how is the weather
- will it rain tomorrow?
```

This is also a valid `Trigger intent` definition for the `weather` scenario because of the `[Trigger intent]` suffix.

```markdown

> Content of .\weather\weather.lu

# getWeather [Trigger intent]
- how is the weather
- will it rain tomorrow?
```

Once a trigger intent has been detected: 
- The intent definition including all referred entity labels are added to the LUIS application suggested for the `rootDialog`.
- The detected trigger intent and its example utterances will be removed from the child scenario's LUIS application (if suggested).
- No child LUIS models are suggested if the only intent definition found under that child is the trigger intent.

## Output
After analyzing all found .lu and .qna files, the command will output 
- One `rootDialog` LUIS application **per locale** detected
- One or more `childDialog` LUIS applications **per locale** detected. The intent definitions found under each child as well as other options specified to the command will determine if a separate LUIS application is suggested. 
- One QnA maker application **per locale** detected
- One QnA maker alterations list **per locale** detected.


[1]:https://luis.ai
[2]:https://qnamaker.ai
[3]:../../lubuild
[4]:../examples/suggestModels
[5]:./lu-file-format.md#qnamaker-filters
