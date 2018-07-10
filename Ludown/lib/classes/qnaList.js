/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const qnaMetaData = require('./qnaMetaData');

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
};

qnaList.fromJSON = function(src) {
    if (!src) {
        return null;
    }
    if (Array.isArray(src)) {
        return src.map(qnaList.fromJSON);
    }
    src.metadata = qnaMetaData.fromJSON(src.metadata) || undefined;
    const {id /* string */, answer /* string */, source /* string */, questions /* string [] */, metadata /* qnaMetaData [] */} = src;
    return new qnaList({id /* string */, answer /* string */, source /* string */, questions /* string [] */, metadata /* qnaMetaData [] */});
}

module.exports = qnaList;