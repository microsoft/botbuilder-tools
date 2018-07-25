/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var chai = require('chai');
var assert = chai.assert;
const translateKey = '5ef1cecd7e954de9b1de6e7fc310f719';
const testData = require('./testcases/translate-testcase-data');
const translate = require('../lib/translate-helpers');
const retCode = require('../lib/enums/CLI-errors');

describe('With the parseAndTranslate method', function() {
    it('Translating comments can be skipped', function(done) {
        translate.parseAndTranslate(`> This is a comment`, translateKey, testData.tests.intentsAndUtterancesNC.langCode, '', false, false, false)
            .then(function(res) {
                assert.equal(res, `> This is a comment
`.replace(/\n/g, '\r\n'));
done();
            })
            .catch(err => done(err));
    });

    
    it('QnA content is translated correctly', function(done) {
        translate.parseAndTranslate(testData.tests.qna.luFile, translateKey, testData.tests.qna.langCode, '', false, false, false)
            .then(function(res) {
                    assert.equal(res, testData.tests.qna.translatedContent.replace(/\n/g, '\r\n'));
                    done();
            })
            .catch(err => done(err))
    });

    
    it('Phrase list entity references are translated correctly', function(done) {
        translate.parseAndTranslate(testData.tests.phraseList.luFile, translateKey, testData.tests.phraseList.langCode, '', false, false, false)
            .then(function(res) {
                assert.equal(res, testData.tests.phraseList.translatedContent.replace(/\n/g, '\r\n'));
                    done();
            })
            .catch(err => done(err))
    });

    it('Bad lu file input throws', function(done) {
        translate.parseAndTranslate(testData.tests.badLu.luFile, translateKey, testData.tests.badLu.langCode, '', false, false, false)
            .then(res => done(res)) 
            .catch(function(err) {
                    assert.equal(err.errCode, retCode.errorCode.INVALID_INPUT_FILE);
                    done();
            })
    });

    it('References can be skipped from being translated', function(done) {
        translate.parseAndTranslate(testData.tests.fileRef.luFile, translateKey, testData.tests.fileRef.langCode, '', false, false, false)
            .then(function(res) {
                assert.equal(res, testData.tests.fileRef.luFile.replace(/\n/g, '\r\n\r\n'));
                    done();
            })
            .catch(err => done(err))
    });

    it('Invalid key throws', function(done) {
        translate.parseAndTranslate(`# Greeting
-hi
`, translateKey + '2', testData.tests.badLu.langCode, '', false, false, false)
            .then(function(res) {
                done(res);
            }) 
            .catch(function(err) {
                assert.equal(err.errCode, retCode.errorCode.TRANSLATE_SERVICE_FAIL);
                done();
            })
    }); 

        it('Invalid key with comments throws', function(done) {
        translate.parseAndTranslate(`> test comment
`, translateKey + '2', testData.tests.badLu.langCode, '', true, false, false)
            .then(function(res) {
                done(res);
            }) 
            .catch(function(err) {
                assert.equal(err.errCode, retCode.errorCode.TRANSLATE_SERVICE_FAIL);
                done();
            })
    });

    it('Nested entity references throws', function(done) {
        translate.parseAndTranslate(`# Greeting
        - hi {userName = foo {firstName = bar}}
`, translateKey, testData.tests.badLu.langCode, '', false, false, true)
            .then(function(res) {
                done(res);
            }) 
            .catch(function(err) {
                assert.equal(err.errCode, retCode.errorCode.INVALID_INPUT);
                done();
            })
    });
    
   it('Labelled entity values are translated correctly', function(done) {
    translate.parseAndTranslate(testData.tests.labelledEntityValue.luFile, translateKey, testData.tests.labelledEntityValue.langCode, '', false, true, false)
        .then(function(res) {
            assert.equal(res, testData.tests.labelledEntityValue.translatedContent.replace(/\n/g, '\r\n'));    
            done();
        })
        .catch(err => done(err))
    });
    
    it('Invalid key with QnA throws', function(done) {
        translate.parseAndTranslate(`# ? Greeting
        - hi
`, translateKey + '2', testData.tests.badLu.langCode, '', false, false, false)
            .then(function(res) {
                done(res);
            }) 
            .catch(function(err) {
                assert.equal(err.errCode, retCode.errorCode.TRANSLATE_SERVICE_FAIL);
                done();
            })
    });

    it('Intent only is handled correctly', function(done) {
        translate.parseAndTranslate(`# Greeting
`, translateKey, testData.tests.badLu.langCode, '', false, false, true)
            .then(function(res) {
                done();
            }) 
            .catch(function(err) {
                done('Test Fail! Threw when not expected');
            })
    });

    

    it('References are translated correctly', function(done) {
        translate.parseAndTranslate(testData.tests.fileRef.luFile, translateKey, testData.tests.fileRef.langCode, '', false, true, false)
            .then(function(res) {
                assert.equal(res, testData.tests.fileRef.translatedContent.replace(/\n/g, '\r\n\r\n'));    
                done();
            })
            .catch(err => done(err))
    });

    

    it('All entity types are translated correctly', function(done) {
        translate.parseAndTranslate(testData.tests.allEntities.luFile, translateKey, testData.tests.allEntities.langCode, '', false, false, false)
            .then(function(res) {
                assert.equal(res, testData.tests.allEntities.translatedContent.replace(/\n/g, '\r\n'));
                done();
            })
            .catch(err => done(err))
    });

    it('Intents and utterances are translated correctly', function(done) {
        translate.parseAndTranslate(testData.tests.intentsAndUtterances.luFile, translateKey, testData.tests.intentsAndUtterances.langCode, 'en-us', true, false, true)
            .then(function(res) {
                    assert.equal(res, testData.tests.intentsAndUtterances.translatedContent.replace(/\n/g, '\r\n'));
                    done();
            })
            .catch(err => done(err))
    }); 

    it('QnA is translated correctly', function(done) {
        translate.parseAndTranslate(`# ? hello
\`\`\`markdown`, translateKey, 'de', 'en-us', true, false, true)
            .then(function(res) {
                    assert.equal('# ? Hallo\r\n```markdown\r\n', res);
                    done();
            })
            .catch(err => done(err))
    }); 
    
});