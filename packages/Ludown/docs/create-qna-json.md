# Creating QnA Maker JSON model file

Once you have created individual .lu files you can parse them all to a QnA Maker JSON model using this command: 
```bash
> ludown parse toqna -l <folder with .lu files> [-s -o <outputfolder> -n <QnAKBName> --verbose]
```

This will parse all .lu files found and will create **ONE** QnA Maker JSON model. 

If you would like to create multiple QnA Maker KB's, then you can add a [root.lu file](../examples/en-us/root.lu) that holds reference to other relevant .lu files and parse it like this: 

```bash
> ludown parse toqna --in <root_file.lu> [-o <outputFolder> -n <QnAKBName> --verbose]
```

This will parse all .lu files referenced in the root_file.lu and output **ONE** QnA Maker JSON model. 

# Creating word alterations/ synonyms list
You can use ludown to parse and compile all word alterations/ synonyms list that can then be used to replace your existing [QnA Maker alterations](https://westus.dev.cognitive.microsoft.com/docs/services/5a93fcf85b4ccd136866eb37/operations/5ac266295b4ccd1554da75fd) list. 

See [here](lu-file-format.md#QnA-Maker-alterations) for defining word alterations/ synonyms list in .lu files.

```bash
> ludown parse toqna --write_qna_alterations --in <root_file.lu> [-o <outputFolder> -n <QnAKBName> --verbose]
```

# Creating a new QnAMaker KB

```bash
> qnamaker create kb --in _qnaKB.json --subscriptionKey <key> --hostname <url> --endpointKey <key>
```

# Replacing QnA Maker word alterations/ synonyms list

```bash
> qnamaker replace alterations --in _Alterations.json --subscriptionKey <key> --hostname <url> --endpointKey <key>
```

Note: You can install the QnAMaker CLI from [here](../../QnAMaker)

