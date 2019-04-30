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
}
module.exports = AllParsedContent;