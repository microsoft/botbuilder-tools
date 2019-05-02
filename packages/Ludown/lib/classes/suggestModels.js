#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const exception = require('./exception');
const retCode = require('../enums/CLI-errors').errorCode;
const fs = require('fs');
const path = require('path');
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
     * @param {String} cross_train_intent_name
     * @param {String} qna_intent_name
     * @param {String} base_culture
     * @param {Boolean} verbose 
     */
    constructor(allParsedContent, root_dialog, baseFolderPath, cross_feed_models, add_qna_pairs, auto_add_qna_metadata, cross_train_intent_name = 'None', qna_intent_name = 'QnA', base_culture = 'en-us', verbose = false) {
        this.allParsedContent = allParsedContent ? allParsedContent : undefined;
        this.root_dialog = root_dialog ? root_dialog : undefined;
        this.baseFolderPath = baseFolderPath ? baseFolderPath : undefined;
        this.cross_feed_models = cross_feed_models ? cross_feed_models : false;
        this.add_qna_pairs = add_qna_pairs ? add_qna_pairs : false;
        this.auto_add_qna_metadata = auto_add_qna_metadata ? auto_add_qna_metadata : false;
        this.cross_train_intent_name = cross_train_intent_name;
        this.qna_intent_name = qna_intent_name;
        this.base_culture = base_culture;
        this.verbose = verbose;
    }
    /** 
     * Validate object
     * @throws {exception}
     */
    validate() {

        if (this.baseFolderPath === undefined && this.allParsedContent === undefined) {
            throw (new exception(retCode.UNKNOWN_OPTIONS, `No Input content provided. Use -f to set input folder or update lusuggest.json to include base folder path.\n`));
        }

        if (this.baseFolderPath !== undefined && !fs.existsSync(path.resolve(this.baseFolderPath))) {
            throw (new exception(retCode.UNKNOWN_OPTIONS, `Specified base folder path '${this.baseFolderPath}' does not exist or cannot be opened.\n`));
        }

        if (this.root_dialog === undefined) {
            throw (new exception(retCode.UNKNOWN_OPTIONS, `No root_dialog folder name specified.\n`));
        }
        
        if (this.base_culture !== undefined) {
            const LUISLocales = ['en-us', 'fr-ca', 'zh-cn', 'nl-nl', 'fr-fr', 'de-de', 'it-it', 'ja-jp', 'ko-kr', 'pt-br', 'es-es', 'es-mx'];
            if (!(LUISLocales.includes(this.base_culture.toLowerCase()))) {
                throw (new exception(retCode.UNKNOWN_OPTIONS, `\nUnrecognized locale. Supported locales are - ${LUISLocales.toString()} \n\n`));
            }
        }

        if (this.cross_train_intent_name !== undefined && this.cross_train_intent_name.length > 50) {
            throw (new exception(retCode.UNKNOWN_OPTIONS, `Intent names can be at most 50 characters. ${this.cross_train_intent_name} has ${this.cross_train_intent_name.length} characters. \n`));
        }

        if (this.qna_intent_name !== undefined && this.qna_intent_name.length > 50) {
            throw (new exception(retCode.UNKNOWN_OPTIONS, `Intent names can be at most 50 characters. ${this.qna_intent_name} has ${this.qna_intent_name.length} characters. \n`));
        }
    }
    /** Helper to load configuration from a JSON object
     * @param {Object} obj
     * @throws {exception}
     */
    fromJSON(obj) {
        if (obj.root_dialog !== undefined) this.root_dialog = obj.root_dialog;
        if (obj.lu_folder !== undefined) this.baseFolderPath = obj.lu_folder;
        if (obj.cross_feed_models !== undefined) this.cross_feed_models = (obj.cross_feed_models == "true");
        if (obj.add_qna_pairs !== undefined) this.add_qna_pairs = (obj.add_qna_pairs == "true");
        if (obj.auto_add_qna_metadata !== undefined) this.auto_add_qna_metadata = (obj.auto_add_qna_metadata == "true");
        if (obj.cross_train_intent_name !== undefined) this.cross_train_intent_name = obj.cross_train_intent_name;
        if (obj.qna_intent_name !== undefined) this.qna_intent_name = obj.qna_intent_name;
        if (obj.luis_culture !== undefined) this.base_culture = obj.luis_culture;
        if (obj.verbose !== undefined) this.verbose = obj.verbose;
    }
}

/** 
 * Static method to create an object from JSON
 * @param {Object} obj lusuggest.json configuration
 * @returns {SuggestModels} object
 */
SuggestModels.fromJSON = function(obj) {
    if (obj.base_folder_path !== undefined) {
        obj.baseFolderPath = obj.base_folder_path;
        delete obj.base_folder_path;
    }
    return Object.assign(new SuggestModels(), obj);
}

module.exports = SuggestModels;