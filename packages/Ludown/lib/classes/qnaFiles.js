/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class qnaFile { 
    /**
     * @property {string} fileUri
     */
    /**
     * @property {string} fileName
     */
    
    constructor(fileUri, fileName) {
        this.fileName = fileName?fileName:'';
        this.fileUri = fileUri?fileUri:'';
    }
}

module.exports = qnaFile;