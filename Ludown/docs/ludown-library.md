# Ludown as a library
Ludown can be used within a Node.js application as an imported library. Install locally:

```bash
npm install ludown --save
```

## Parsing lu files
To parse LU files, you can use the parseFile() method. 

```js
const ludown = require('ludown');
const luContent = `# Greeting
- Hi
- Hello
- Good morning
- Good evening
`;
const log = false;
const locale = 'en-us';
ludown.parser.parseFile(luContent, log, locale)
    .then(function(parsedContent) {
        // Parsed LUIS object
        console.log(JSON.stringify(parsedContent.LUISJsonStructure, 2, null));
        // Parsed QnA content
        console.log(JSON.stringify(parsedContent.additionalFilesToParse, 2, null));
        // Additional files to parse
        console.log(JSON.stringify(parsedContent.additionalFilesToParse, 2, null));
    })
    .catch(function(err) {
        // err is of type ludown.helperClasses.exception. 
        // Possible error codes are available under ludown.helperEnums.errorCodes
        if(err.errCode === ludown.helperEnums.errorCodes.INVALID_INPUT) {
            // do something specific to this error code
        } else {
            console.log(err.text);
        }
    })
```

## Collating lu files

If you are processing multiple lu files and would like to collate them to a single LUIS or QnA object, you can use the collate methods on the parser

```js
const ludown = require('ludown');
const luContent1 = `# Greeting
- hi`;
const luContent2 = `# None
- something`;
const log = false;
const locale = 'en-us';

let p1 = await ludown.parser.parseFile(luContent1, log, locale);
let p2 = await ludown.parser.parseFile(luContent2, log, locale);
let collatedContent = await ludown.parser.collate

```

## 
