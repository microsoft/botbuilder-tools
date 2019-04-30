#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class ModelsSuggested { 
    /**
     * Output strcutre of suggestModels API. luFiles and luisModels -> {"lang" : [{dialogName: "", payload: ""}]}; Rest -> {"lang": []}
     * @param {Object} luFiles 
     * @param {Object} qnaFiles
     * @param {Object} qnaAlterationFiles 
     * @param {Object} luisModels
     * @param {Object} qnaModels 
     * @param {Object} qnaAlterations 
     */
    constuctor (luFiles, qnaFiles, qnaAlterationFiles, luisModels, qnaModels, qnaAlterations) {
        this.luFiles = luFiles ? luFiles : {};
        this.qnaFiles = qnaFiles ? qnaFiles : {};
        this.qnaAlterationFiles = qnaAlterationFiles ? qnaAlterationFiles : {};
        this.luisModels = luisModels ? luisModels : {};
        this.qnaModels = qnaModels ? qnaModels : {};
        this.qnaAlterations = qnaAlterations ? qnaAlterations : {};
    };
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