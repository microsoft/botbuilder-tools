/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const QnA = require('./qna');
const LUIS = require('./LUIS');
const qnaAlterations = require('./qnaAlterations');
class parserObject {
    /**
     * @property {FileToParse []} additionalFilesToParse
     */
    /**
     * @property {LUIS} LUISJsonStructure
     */
    /**
     * @property {QnA} qnaJsonStructure
     */
    /**
     * @property {qnaAlterations} qnaAlterations
     */
    /**
     * @property {string} srcFile
     */
    /**
     * @property {Boolean} includeInCollate
     */
    /**
     * @property {string} triggerIntent
     */
    constructor() {
        this.additionalFilesToParse = [];
        this.LUISJsonStructure = new LUIS();
        this.qnaJsonStructure = new QnA();
        this.qnaAlterations = new qnaAlterations.qnaAlterations();
        this.srcFile = undefined;
        this.includeInCollate = true;
        this.triggerIntent = undefined;
    }
}
/**
 * Helper method to create a parser object based on arbitrary attributes passed in.
 * @param {Object} LUISJsonStructure 
 * @param {Object} qnaJsonStructure 
 * @param {Object} lQnaAlterations 
 * @param {Object} srcFile 
 * @param {Object} includeInCollate 
 * @param {String} triggerIntent
 */
parserObject.create = function(LUISJsonStructure, qnaJsonStructure, lQnaAlterations, srcFile, includeInCollate, triggerIntent) {
    let parserObj = new parserObject();
    parserObj.LUISJsonStructure = (LUISJsonStructure || new LUIS());
    parserObj.qnaJsonStructure = (qnaJsonStructure || new QnA());
    parserObj.qnaAlterations = (lQnaAlterations || new qnaAlterations.qnaAlterations());
    parserObj.srcFile = (srcFile || undefined);
    if(includeInCollate === undefined) parserObj.includeInCollate = true;
    else parserObj.includeInCollate = includeInCollate;
    if (triggerIntent !== undefined) parserObj.triggerIntent = triggerIntent;
    return parserObj;
}

module.exports = parserObject;