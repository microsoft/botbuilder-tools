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
    /**
     * @property {string []} files
     */
    constructor(urls, qnaList, files) {
        this.urls = urls?urls:[];
        this.qnaList = qnaList?qnaList:[];
        this.files = files?files:[];
    }
}

module.exports = QnA;