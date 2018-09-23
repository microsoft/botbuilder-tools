# Ludown as a library
Ludown can be used within a Node.js application as an imported library. Install locally:

```bash
npm install ludown --save
```

## Parsing lu files
To parse LU files, you can use the parseFile() method. 

```js
const ludown = require('ludown');
const luContent1 = `# Greeting
- hi`;
const log = false;
const locale = 'en-us';
ludown.parser.parseFile(luContent1, log, locale)
    .then(function(parsedContent) {
        // Parsed LUIS object
        console.log(JSON.stringify(parsedContent.LUISJsonStructure, 2, null));
        // Parsed QnA content
        console.log(JSON.stringify(parsedContent.additionalFilesToParse, 2, null));
        // Additional files to parse
        console.log(JSON.stringify(parsedContent.additionalFilesToParse, 2, null));
    })
    .catch(function(err) {
        let errObj = new ludown.helperClasses.Exception(err);
        // err is of type ludown.helperClasses.Exception. 
        // Possible error codes are available under ludown.helperEnums.errorCodes
        if(errObj.errCode === ludown.helperEnums.errorCodes.INVALID_INPUT) {
            // do something specific to this error code
        } else {
            console.log(errObj.text);
        }
    })
```

## Validating parsed lu files

You can use the available validateLUISBlob() function to verify if the parsed LUIS blob is valid. This helps catch name conflicts, invalid labelled utterances etc. 

```js
const ludown = require('ludown');
const luContent = `# Greeting
- hi {userName=bob}
$userName:first=
-vishwac`;
const log = false;
const locale = 'en-us';
async function parseContent() {
    let parsedContent;
    try {
        parsedContent = await ludown.parser.parseFile(luContent, log, locale);
    } catch (err) {
        let errObj = new ludown.helperClasses.Exception(err);
        // err is of type ludown.helperClasses.Exception. 
        // Possible error codes are available under ludown.helperEnums.errorCodes
        if(errObj.errCode === ludown.helperEnums.errorCodes.INVALID_INPUT) {
            // do something specific to this error code
        } else {
            console.log(errObj.text);
        }
    }
    // validate the parsed luis content
    ludown.parser.validateLUISBlob(parsedContent.LUISJsonStructure)
        .then(res => res)
        .catch(function(err) {
            let exception = new ludown.helperClasses.Exception(err);
            console.error('Oops, invalid LUIS content!\n');
            console.error(exception.errCode + ' : ' + exception.text);
        })
}

parseContent();
```

## Generating lu content from LUIS JSON

You can generate lu content from LUIS and QnA maker JSON using constructMdFromLUIS() and constructMdFromQnA() methods. Here's an example code snippet. 

```js
#!/usr/bin/env node
const ludown = require('ludown');
const luContent = `# Greeting
- hi
$userName:first=
-vishwac`;
const log = false;
const locale = 'en-us';
async function parseContent() {
    let parsedContent;
    try {
        parsedContent = await ludown.parser.parseFile(luContent, log, locale);
    } catch (err) {
        let errObj = new ludown.helperClasses.Exception(err);
        // err is of type ludown.helperClasses.Exception. 
        // Possible error codes are available under ludown.helperEnums.errorCodes
        if(errObj.errCode === ludown.helperEnums.errorCodes.INVALID_INPUT) {
            // do something specific to this error code
        } else {
            console.log(errObj.text);
        }
    }
    
    if(await ludown.parser.validateLUISBlob(parsedContent.LUISJsonStructure)) {
        // reconstruct md content
        ludown.refresh.constructMdFromLUIS(parsedContent.LUISJsonStructure)
        .then(function(result){
            console.log(result);
        })
        .catch(function(err) {
            let exception = new ludown.helperClasses.Exception(err);
            console.error('Oops, invalid LUIS content!\n');
            console.error(exception.errCode + ' : ' + exception.text);
        })
    }

}

parseContent();

```

## Translating lu files

You can take advantage of the [Microsoft text translation API](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/) to automatically machine translate .lu files to one or more than [60+ languages](https://aka.ms/translate-langs) supported by the Microsoft text translation cognitive service.

To translate lu file content, you can simply use the parseAndTranslate() method. Here's a code snippet.

```js
const ludown = require('ludown');
const luContent = `# Greeting
- hi
$userName:first=
-vishwac`;
const log = false;
const targetLanguage = 'de';
const subscriptionKey = '<YOUR TEXT TRANSLATION KEY>';
const translateComments = true;
const translateLinkText = true;
ludown.translate.parseAndTranslate(luContent, subscriptionKey, targetLanguage, '', translateComments, translateLinkText, log)
    .then(function(result) {
        console.log(result);
    })
    .catch(function(err){
        let exception = new ludown.helperClasses.Exception(err);
        console.error(exception.errCode + ' : ' + exception.text);
    })

```