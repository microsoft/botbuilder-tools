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
};

QnA.haveQnAContent = function(blob) {
    if(!blob) return false;
    return (blob.urls.length > 0 || 
        blob.qnaList.length > 0 ||
        blob.files.length > 0);
}

module.exports = QnA;