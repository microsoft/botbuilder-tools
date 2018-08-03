/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const QnA = require('./qna');
const LUIS = require('./LUIS');
const qnaAlterations = require('./qnaAlterations');
class parserObject {
    /**
     * @property {string []} additionalFilesToParse
     */
    /**
     * @property {LUIS} LUISJsonStructure
     */
    /**
     * @property {QnA} qnaJsonStructure
     */
    /**
     * @property {qnaAlterations} qnaAlterations
     */
    constructor() {
        this.additionalFilesToParse = [];
        this.LUISJsonStructure = new LUIS();
        this.qnaJsonStructure = new QnA();
        this.qnaAlterations = new qnaAlterations.qnaAlterations();
    }
};

module.exports = parserObject;