export namespace helperClasses {
    class Exception {
        constructor(errCode: any, text: any);
        text: any;
        errCode: any;
    }
    class LUIS {
        intents: any;
        entities: any;
        composites: any;
        closedLists: any;
        regex_entities: any;
        model_features: any;
        regex_features: any;
        utterances: any;
        patterns: any;
        patternAnyEntities: any;
        prebuiltEntities: any;
    }
    class Parser {
        static create(LUISJsonStructure: any, qnaJsonStructure: any, lQnaAlterations: any, srcFile: any, includeInCollate: any): any;
        additionalFilesToParse: any;
        LUISJsonStructure: any;
        qnaJsonStructure: any;
        qnaAlterations: any;
        srcFile: any;
        includeInCollate: any;
    }
    class QnA {
        constructor(urls: any, qnaList: any, files: any);
        urls: any;
        qnaList: any;
        files: any;
    }
}
export const helperEnums: {
    errorCodes: {
        DUPLICATE_ENTITIES: number;
        FILE_OPEN_ERROR: number;
        INVALID_COMPOSITE_ENTITY: number;
        INVALID_INPUT: number;
        INVALID_INPUT_FILE: number;
        INVALID_INTENT: number;
        INVALID_LINE: number;
        INVALID_LU_FILE_REF: number;
        INVALID_QNA_FILTER_DEF: number;
        INVALID_QNA_QUESTION_DEF: number;
        INVALID_REGEX_ENTITY: number;
        INVALID_URI: number;
        INVALID_URL_REF: number;
        INVALID_UTTERANCE_DEF: number;
        MISSING_LABELLED_VALUE: number;
        NO_LU_FILES_FOUND: number;
        OUTPUT_FILE_EXISTS: number;
        OUTPUT_FOLDER_INVALID: number;
        PHRASELIST_NOT_A_LIST: number;
        SUCCESS: number;
        SYNONYMS_NOT_A_LIST: number;
        TRANSLATE_SERVICE_FAIL: number;
        UNABLE_TO_WRITE_FILE: number;
        UNKNOWN_ERROR: number;
        UNKNOWN_OPTIONS: number;
    };
    parseCommands: {
        luis: string;
        qna: string;
    };
};
export namespace parser {
    function parseFile(fileContent: any, log: any, locale: any): any;
    function validateLUISBlob(LUISJSONBlob: any): any;
}
export namespace refresh {
    function constructMdFromLUIS(LUISJSON: any): any;
    function constructMdFromQnA(QnAJSON: any): any;
    function constructMdFromQnAAlteration(QnAAltJSON: any): any;
}
export namespace translate {
    function parseAndTranslate(fileContent: any, subscriptionKey: any, to_lang: any, src_lang: any, translate_comments: any, translate_link_text: any, log: any, batch_translate: any): any;
    function translateText(text: any, subscriptionKey: any, to_lang: any, from_lang: any): any;
}
