/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const qnaListObj = require('./qnaList');

class QnA {
    /**
     * @property {string []} urls 
     */
    /**
     * @property {qnaListObj []} qnaList
     */
    constructor(urls, qnaList) {
        this.urls = urls?urls:[];
        this.qnaList = qnaList?qnaList:[];
    }
};

QnA.fromJSON = function(source) {
    if (!source) {
        return null;
    }
    if (Array.isArray(source)) {
        return source.map(QnA.fromJSON);
    }
    source.qnaList = qnaListObj.fromJSON(source.qnaList) || undefined;
    const {urls /* string []*/, qnaList /* qnaListObj [] */} = source;
    return new QnA({urls /* string []*/, qnaList /* qnaListObj [] */});
}

module.exports = QnA;