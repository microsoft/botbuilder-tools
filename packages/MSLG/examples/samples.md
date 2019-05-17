This folder contains several sample lg files.

# Usage

## Parse

Validate lg file.

```bash
mslg parse --in exceptionExamples/EmptyTemplate.lg    // parse the specific lg file.
```

```bash
mslg parse --in exceptionExamples/ConditionFormatError.lg    // parse the specific lg file.
```

## Collate
Merge multiple lg files into single file, especially making sense when there are same template definitions in different lg files.

```bash
mslg parse -l validExamples -s --out finalResult -c    // parse and merge all templates under folder validExamples into single finalResult file.
```

```bash
mslg parse -l validExamples -s    // throw exception if --collate is not set when there are same template names across different files.
```
cd
```bash
mslg parse -l validExamples --stdout    // parse and merge all templates under folder validExamples and print the final file to stdout.
```

## Expand
Expand one or all templates found in a .lg file given the variable values from a json file or stdin.

```bash
mslg expand --in validExamples/simple.lg -t FinalGreeting    // basic usage of expand command.
```

```bash
mslg expand --in validExamples/simple.lg --all    // expand all the templates in the lg file.
```

```bash
mslg expand --in validExamples/simepleWithVariables.lg --all -j variables.json    // expand all the templates with variables config.
```

```bash
mslg expand --in validExamples/simepleWithVariables.lg --all -i    // expand all the templates and get the variable values from stdin prompts.
```

## Translate
Translate .lg files to a target language by microsoft translation API.

```bash
mslg translate -k your_translate_Key -t your_target_lang --in validExamples/translator.lg -c    // translate specific lg file to target language, including comments.
```

```bash
mslg translate -k your_translate_Key -t your_target_lang -l validExamples -s -o validExamples/output --verbose    // translate all lg files from a specific folder, including sub folders and output the generated files to a specific folder.
```