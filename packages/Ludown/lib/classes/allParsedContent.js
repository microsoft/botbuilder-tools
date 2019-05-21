/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class AllParsedContent {
    /**
     * @property {parserObject []} LUISContent
     */
    /**
     * @property {parserObject []} QnAContent
     */
    /**
     * @property {parserObject []} QnAAlterations
     */
    constructor(luisContent, qnaContent, qnaAlterations) {
        if (luisContent === undefined || !Array.isArray(luisContent)) return undefined;
        if (qnaContent === undefined || !Array.isArray(qnaContent)) return undefined;
        if (qnaAlterations === undefined || !Array.isArray(qnaAlterations)) return undefined;
        this.LUISContent = luisContent;
        this.QnAContent = qnaContent;
        this.QnAAlterations = qnaAlterations;
    }

    /**
     * 
     * @param {AllParsedContent} obj 
     * @returns {Boolean}
     */
    hasValue(obj) {
        if (!(obj instanceof AllParsedContent)) return false;
        return ((obj.LUISContent.length !== 0) || (obj.QnAAlterations.length !== 0) || (obj.QnAContent.length !== 0));
    }
}

module.exports = AllParsedContent;