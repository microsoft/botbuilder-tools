/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const QnA = require('./qna');
const LUIS = require('./LUIS');

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
    constructor() {
        this.additionalFilesToParse = [];
        this.LUISJsonStructure = new LUIS();
        this.qnaJsonStructure = new QnA();
    }
};

module.exports = parserObject;