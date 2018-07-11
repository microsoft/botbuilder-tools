/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const modules = {
    parser: {
        parseFile: require('./parseFileContents').parseFile,
        validateLUISBlob: require('./parseFileContents').validateLUISBlob
    },
    refresh: {
        constructMdFromLUIS: require('./toLU-helpers').constructMdFromLUISJSON,
        constructMdFromQnA: require('./toLU-helpers').constructMdFromQnAJSON
    },
    translate: {
        parseAndTranslate: require('./translate-helpers').parseAndTranslate,
        translateText: require('./translate-helpers').translateText
    },
    helperEnums: {
        errorCodes: require('./enums/CLI-errors').errorCode,
        parseCommands: require('./enums/parsecommands'),
    },
    helperClasses: {
        exception: require('./classes/exception'),
        LUIS: require('./classes/LUIS'),
        QnA: require('./classes/qna'),
        parser: require('./classes/parserObject')
    }
    
};
module.exports = modules;
