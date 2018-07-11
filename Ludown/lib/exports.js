/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const modules = {
    parser: {
        parseFile: require('./parseFileContents').parseFile,
        collateLUISFiles: require('./parseFileContents').collateLUISFiles,
        collateQnAFiles: require('./parseFileContents').collateQnAFiles,
        validateLUISBlob: require('./parseFileContents').validateLUISBlob
    },
    refresh: {
        constructMdFile: require('./toLU-helpers').constructMdFile
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
        exception: require('./classes/error'),
        LUIS: require('./classes/LUIS'),
        QnA: require('./classes/qna'),
        parser: require('./classes/parserObject')
    }
    
};
module.exports = modules;
