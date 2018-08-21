/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class qnaList { 
    /**
     * @property {string} id
     */
    /**
     * @property {string} answer
     */
    /**
     * @property {string} source
     */
    /**
     * @property {string []} questions
     */
    /**
     * @property {qnaMetaData []} metadata
     */
    constructor(id, answer, source, questions, metadata) {
        this.id = id?id:0;
        this.answer = answer?answer:'';
        this.source = source?source:'custom editorial';
        this.questions = questions?questions:[];
        this.metadata = metadata?metadata:[];
    }
}

module.exports = qnaList;