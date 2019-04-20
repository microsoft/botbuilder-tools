# Suggest models

``` bash
ludown parse toSuggestModels [-l|--lu_folder] <folder> [-s|--subfolder] [-o|--out] <outFolder> [-a|--root_dialog] <folderRootDialog> [-r|--cross_feed_models] [-c|--use_qna_pairs]
```

For given parsed content, generate a list of files by this structure. All folder names are at peer to the folder at which 'rootDialog' is at. 

| folderName | lang x locale | fullFilePath | 

{
    "folderName": {
        "en-us": [
            "fileName": {}
            "fileName2": {}
        ]
    },
}

rootDialog
    - All .lu files are found under rootDialog are collated with 'trigger intents' from all non-root folders. 
    - There will always be only one \<rootDialog\>-\<locale\> model suggested

DialogName
    - DialogName.lu (or a .lu file in this folder that has either an intent named 'DialogNajme' or a .lu file with an intent definition that includes "[trigger intent]".
    - Trigger intent explicitly specified or deduced will not be added to the child model
    - No child models are suggested if the only intent is the trigger intent.
    - When additional lu files are found in this folder, then those models are collated, one per \<RelativeRootFolderName\>-\<locale\>
    - When subfolder option is presented, all sub-folders are analyzed.
    - Any QnA pairs found in this folder will be added to 'QnA' intnet if [-c|--use_qna_pairs] is set.
    - Any QnA pairs found in this folder will automatically have "dialogName='dialogName'" added to meta-data if [-u|--auto_add_qna_metadata] is specified
    - File names will need to follow \<RelativeRootFolderName\>-\<locale\>.lu structure to be grouped into sub-models.
    - One QnA model suggested per \<bot\>-\<locale\>
    - If more than one language files are found, then [-c|--luis_culture] can be set to reflect the root dialog's language code. If not specified, rootDialog's culture will default to en-US


{
    "name":"MyProject",
    "defaultLanguage":"en-us",
    "models": [
        "./examples/all.lu"        
    ]
}