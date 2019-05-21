#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class ModelsSuggested { 
    /**
     * Output structure of suggestModels API. luFiles and luisModels -> {"lang" : [{dialogName: "", payload: ""}]}; Rest -> {"lang": []}
     * 
     * @param {Object} luFiles 
     * @param {Object} qnaFiles
     * @param {Object} qnaAlterationFiles 
     * @param {Object} luisModels
     * @param {Object} qnaModels 
     * @param {Object} qnaAlterations 
     */
    constructor () {
        this.luFiles = {};
        this.qnaFiles = {};
        this.qnaAlterationFiles = {};
        this.luisModels = {};
        this.qnaModels = {};
        this.qnaAlterations = {};
    }
};

module.exports = ModelsSuggested;