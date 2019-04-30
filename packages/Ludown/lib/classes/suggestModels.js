#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class SuggestModels {
    /**
     * Input object to pass to suggest models API.
     * 
     * @param {Object} allParsedContent 
     * @param {String} root_dialog 
     * @param {String} baseFolderPath 
     * @param {Boolean} cross_feed_models 
     * @param {Boolean} add_qna_pairs 
     * @param {Boolean} auto_add_qna_metadata 
     * @param {String} base_culture
     * @param {Boolean} verbose 
     */
    constructor(allParsedContent, root_dialog, baseFolderPath, cross_feed_models, add_qna_pairs, auto_add_qna_metadata, base_culture = 'en-us', verbose = false) {
        this.allParsedContent = allParsedContent ? allParsedContent : undefined;
        this.root_dialog = root_dialog ? root_dialog : undefined;
        this.baseFolderPath = baseFolderPath ? baseFolderPath : undefined;
        this.base_culture = base_culture ? base_culture : 'en-us';
        this.cross_feed_models = cross_feed_models ? cross_feed_models : false;
        this.add_qna_pairs = add_qna_pairs ? add_qna_pairs : false;
        this.auto_add_qna_metadata = auto_add_qna_metadata ? auto_add_qna_metadata : false;
        this.verbose = verbose ? verbose : false;
    }  
};

module.exports = SuggestModels;