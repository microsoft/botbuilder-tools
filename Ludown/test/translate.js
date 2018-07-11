/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var chai = require('chai');
var assert = chai.assert;
var path = require('path');
const {exec} = require('child_process');
const ludown = path.resolve('../bin/ludown');
const translateKey = '5ef1cecd7e954de9b1de6e7fc310f719';
const testData = require('./testcases/translate-testcase-data');
const translate = require('../lib/translate-helpers');
const retCode = require('../lib/enums/CLI-errors');
describe('Translate command', function() {
    it('should throw an error when an incorrect folder is specified', function() {
        exec(`node ${ludown} translate -l c:\\test23`, (error, stdout, stderr) => {
            assert(stderr.includes('not a folder'));
            done();
        });
    })

    it('should throw an error when a file is specified as input folder', function() {
        const exampleLu = path.resolve('../examples/1.lu');
        exec(`node ${ludown} translate -l ` + exampleLu, (error, stdout, stderr) => {
            assert(stderr.includes('not a folder'));
            done();
        });
    })

    it('should throw an error when no lu files are found in the specified folder', function() {
        const exampleLu = path.resolve('../lib');
        exec(`node ${ludown} translate -l ` + exampleLu, (error, stdout, stderr) => {
            assert(stderr.includes('no .lu files found in the specified folder.'));
            done();
        });
    })

    it('should throw an error when output folder does not exist', function() {
        const exampleLu = path.resolve('../lib/testFolder');
        exec(`node ${ludown} translate -o ` + exampleLu, (error, stdout, stderr) => {
            assert(stderr.includes('does not exist'));
            done();
        });
    })

    it('Phrase list entity references are translated correctly', function() {
        return translate.parseAndTranslate(testData.tests.phraseList.luFile, translateKey, testData.tests.phraseList.langCode, '', false, false, false)
            .then(function(res) {
                assert.equal(res, testData.tests.phraseList.translatedContent.replace(/\n/g, '\r\n'));
            })
            .catch(err => err)
    });

    it('All entity types are translated correctly', function() {
        return translate.parseAndTranslate(testData.tests.allEntities.luFile, translateKey, testData.tests.allEntities.langCode, '', false, false, false)
            .then(function(res) {
                assert.equal(res, testData.tests.allEntities.translatedContent.replace(/\n/g, '\r\n'));
            })
            .catch(err => err)
    });

    it('Intents and utterances are translated correctly', function() {
        return translate.parseAndTranslate(testData.tests.intentsAndUtterances.luFile, translateKey, testData.tests.intentsAndUtterances.langCode, '', true, false, false)
            .then(function(res) {
                assert.equal(res, testData.tests.intentsAndUtterances.translatedContent.replace(/\n/g, '\r\n'));
            })
            .catch(err => err)
    });

    it('Translating comments can be skipped', function() {
        return translate.parseAndTranslate(testData.tests.intentsAndUtterancesNC.luFile, translateKey, testData.tests.intentsAndUtterancesNC.langCode, '', false, false, false)
            .then(function(res) {
                assert.equal(res, testData.tests.intentsAndUtterancesNC.translatedContent.replace(/\n/g, '\r\n'));
            })
            .catch(err => err)
    });

    it('QnA content is translated correctly', function() {
        return translate.parseAndTranslate(testData.tests.qna.luFile, translateKey, testData.tests.qna.langCode, '', false, false, false)
            .then(function(res) {
                assert.equal(res, testData.tests.qna.translatedContent.replace(/\n/g, '\r\n'));
            })
            .catch(err => err)
    });

    it('References are translated correctly', function() {
        return translate.parseAndTranslate(testData.tests.fileRef.luFile, translateKey, testData.tests.fileRef.langCode, '', false, true, false)
            .then(function(res) {
                assert.equal(res, testData.tests.fileRef.translatedContent.replace(/\n/g, '\r\n'));
            })
            .catch(err => err)
    });

    it('References can be skipped from being translated', function() {
        return translate.parseAndTranslate(testData.tests.fileRef.luFile, translateKey, testData.tests.fileRef.langCode, '', false, false, false)
            .then(function(res) {
                assert.equal(res, testData.tests.fileRef.luFile);
            })
            .catch(err => err)
    });

    it('Bad lu file input throws', function() {
        return translate.parseAndTranslate(testData.tests.badLu.luFile, translateKey, testData.tests.badLu.langCode, '', false, false, false)
            .then(res => res) 
            .catch(function(err) {
                assert.equal(err.errCode, retCode.errorCode.INVALID_INPUT_FILE);
            })
    });

    it('Invalid key throws', function() {
        return translate.parseAndTranslate(testData.tests.fileRef.luFile, translateKey + '2', testData.tests.badLu.langCode, '', false, false, false)
            .then(res => res) 
            .catch(function(err) {
                assert.equal(err.errCode, retCode.errorCode.TRANSLATE_SERVICE_FAIL);
            })
    });
});