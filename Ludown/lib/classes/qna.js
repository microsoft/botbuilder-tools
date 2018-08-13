/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
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
}

module.exports = QnA;