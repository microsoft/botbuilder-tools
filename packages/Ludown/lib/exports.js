/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const modules = {
    parser: {
        parseFile: require('./parseFileContents').parseFile,
        validateLUISBlob: require('./parseFileContents').validateLUISBlob,
        parseAllFiles: require('./parser').parseAllFiles,
        suggestModels: require('./suggestModels').suggestModels
    },
    refresh: {
        constructMdFromLUIS: require('./toLU-helpers').constructMdFromLUISJSON,
        constructMdFromQnA: require('./toLU-helpers').constructMdFromQnAJSON,
        constructMdFromQnAAlteration: require('./toLU-helpers').constructMdFromQnAAlterationJSON
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
        Exception: require('./classes/exception'),
        LUIS: require('./classes/LUIS'),
        QnA: require('./classes/qna'),
        Parser: require('./classes/parserObject'),
        SuggestModelArgs: require('./classes/suggestModelArgs'),
        ModelsSuggested: require('./classes/ModelsSuggested'),
        AllParsedContent: require('./classes/allParsedContent')
    }
};
module.exports = modules;
