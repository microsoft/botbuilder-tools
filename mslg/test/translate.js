/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const chai = require('chai');
const assert = chai.assert;
const translate = require('../lib/translate');
const path = require('path');
const textFile = require('read-text-file');
const retCode = require('../lib/enums/errorCodes');
const pathToOutputFolder1 = path.resolve('./test/output');
const fs = require('fs');
describe('The parser', function() {
    before(function(){
        try {
            if(!fs.existsSync(pathToOutputFolder1)) {
                fs.mkdirSync(pathToOutputFolder1);
            }
        } catch (exception) {
            if(exception.code != 'EEXIST') {
                console.log('Unable to create test\\output folder. The tests will fail');
            }
        }
    });
    describe('The translateText method', function(){
        it('Throws correctly when invalid translate key is specified', function(done){
            translate.translateText(`>this is a comment`, 'de', '5ef1cecd7e954de9b1de6e7fc310f7192', 'en')
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.TRANSLATE_SERVICE_FAIL); done();})
        });
        it('Throws correctly when invalid target language is specified', function(done){
            translate.translateText(`>this is a comment`, 'dex', '5ef1cecd7e954de9b1de6e7fc310f719', 'en')
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.TRANSLATE_SERVICE_FAIL); done();})
        });
        it('Throws correctly when invalid src language is specified', function(done){
            translate.translateText(`>this is a comment`, 'de', '5ef1cecd7e954de9b1de6e7fc310f719', 'enx')
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.TRANSLATE_SERVICE_FAIL); done();})
        });
        it('Correctly translates text provided', function(done){
            translate.translateText(`>this is a comment`, 'de', '5ef1cecd7e954de9b1de6e7fc310f719', 'en')
                .then(res => {
                    assert.equal(res[0].translations[0].text, `> Dies ist ein Kommentar`);
                    done()
                })
                .catch(err => done(err))
        });
    });

    describe('The translateFile method', function(){
        it('Throws on invalid file content', function(done) {
            let fileContent = `> test 123
            orange`;
            translate.translateFile(fileContent, 'de', '5ef1cecd7e954de9b1de6e7fc310f719', 'en', false, false, false)
                .then(res => done('Test fail! Did not throw when expected'))
                .catch(err => {
                    assert.ok(err.text.includes('Invalid line detected:'));
                    done();
                })
        });
        it('Correctly translates valid file content', function(done){
            let fileContent = `>this is a comment
            # Greeting
            - hello`;
            translate.translateFile(fileContent, 'de', '5ef1cecd7e954de9b1de6e7fc310f719', 'en', false, false, false)
                .then(res => {
                    assert.ok(res.includes('>this is a comment'));
                    assert.ok(res.includes('Hallo'));
                    done();
                })
                .catch(err => done(err))
        });
        it('Comments can optionally be included in translation', function(done) {
            let fileContent = `>this is a comment
            # Greeting
            - hello`;
            translate.translateFile(fileContent, 'de', '5ef1cecd7e954de9b1de6e7fc310f719', 'en', true, false, false)
                .then(res => {
                    assert.ok(res.includes('Dies ist ein Kommentar'));
                    assert.ok(res.includes('Hallo'));
                    done();
                })
                .catch(err => done(err))
        });
        it('File link reference text can be optionally included in translate', function(done) {
            let fileContent = `[this is a comment](./1.lg)`;
            translate.translateFile(fileContent, 'de', '5ef1cecd7e954de9b1de6e7fc310f719', 'en', true, true, false)
                .then(res => {
                    assert.ok(res.includes('Das ist eine Bemerkung'));
                    done();
                })
                .catch(err => done(err))
        });
        it('Throws correctly when invalid translate key is specified', function(done){
            let fileContent = `[this is a comment](./1.lg)`;
            translate.translateFile(fileContent, 'de', '5ef1cecd7e954de9b1de6e7fc310f7192', 'en', true, true, false)
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.TRANSLATE_SERVICE_FAIL); done();})
        });
        it('Throws correctly when invalid target language is specified', function(done){
            let fileContent = `[this is a comment](./1.lg)`;
            translate.translateFile(fileContent, 'dex', '5ef1cecd7e954de9b1de6e7fc310f719', 'en', true, true, false)
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.TRANSLATE_SERVICE_FAIL); done();})
        });
        it('Throws correctly when invalid src language is specified', function(done){
            let fileContent = `[this is a comment](./1.lg)`;
            translate.translateFile(fileContent, 'de', '5ef1cecd7e954de9b1de6e7fc310f719', 'enx', true, true, false)
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.TRANSLATE_SERVICE_FAIL); done();})
        });
    });
    describe('The translateContent method', function(){
        it('Throws correctly when invalid translate key is specified', function(done){
            let filePath = path.resolve('./test/testcases/2.lg');
            translate.translateContent(filePath, 'de', '5ef1cecd7e954de9b1de6e7fc310f7192', '', '', '', false, '', false, false, false) 
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {
                    assert.equal(err.errCode, retCode.TRANSLATE_SERVICE_FAIL); done();})
        });
        it('Throws correctly when invalid target language is specified', function(done){
            let filePath = path.resolve('./test/testcases/2.lg');
            translate.translateContent(filePath, 'dex', '5ef1cecd7e954de9b1de6e7fc310f719', '', '', '', false, '', false, false, false) 
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.TRANSLATE_SERVICE_FAIL); done();})
        });
        it('Throws correctly when invalid src language is specified', function(done){
            let filePath = path.resolve('./test/testcases/2.lg');
            translate.translateContent(filePath, 'de', '5ef1cecd7e954de9b1de6e7fc310f719', '', '', 'enx', false, '', false, false, false) 
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.TRANSLATE_SERVICE_FAIL); done();})
        });
        it('Throws when input LG file is not found or cannot be opened', function(done) {
            let filePath = path.resolve('./test/testcases/9.lg'); 
            translate.translateContent(filePath, 'de', '5ef1cecd7e954de9b1de6e7fc310f719', '', './test/output', '', false, null, false, false, false)
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {
                    assert.equal(err.errCode, retCode.FILE_OPEN_ERROR);
                    done();
                })
        });
        it('Throws when no LG files are found in folder', function(done){
            translate.translateContent(null, 'de', '5ef1cecd7e954de9b1de6e7fc310f719', './test', './test/output', '', false, null, false, false, false)
                .then(res => done('Test fail! Did not throw when expected'))
                .catch(err => {
                    assert.ok(err.text.includes('No .lg files specified or none found in specified'));
                    done();
                })
        });

        it('Translates all files correctly when a specific file is passed in', function(done){
            let filePath = path.resolve('./test/testcases/8.lg');
            translate.translateContent(filePath, 'de', '5ef1cecd7e954de9b1de6e7fc310f719', '', './test/output', '', false, null, false, false, false)
                .then(res => {
                    assert.equal(textFile.readSync('./test/verified/de/8.lg'), textFile.readSync('./test/output/de/8.lg'))
                    done();
                })
                .catch(err => done(err))
        });

        it('Translates all files correctly when a folder is passed in', function(done){
            let filePath = path.resolve('./test/testcases/8.lg');
            translate.translateContent(null, 'de', '5ef1cecd7e954de9b1de6e7fc310f719', './test/testcases', './test/output', '', false, null, false, false, false)
                .then(res => {
                    assert.equal(textFile.readSync('./test/verified/de/1.lg'), textFile.readSync('./test/output/de/1.lg'))
                    assert.equal(textFile.readSync('./test/verified/de/2.lg'), textFile.readSync('./test/output/de/2.lg'))
                    assert.equal(textFile.readSync('./test/verified/de/3.lg'), textFile.readSync('./test/output/de/3.lg'))
                    assert.equal(textFile.readSync('./test/verified/de/8.lg'), textFile.readSync('./test/output/de/8.lg'))
                    done();
                })
                .catch(err => done(err))
        });

        it('Translates all files correctly when a folder with deep search option is ', function(done){
            translate.translateContent(null, 'de', '5ef1cecd7e954de9b1de6e7fc310f719', './test/testcases/nested', './test/output', '', true, null, true, true, false)
                .then(res => {
                    assert.equal(textFile.readSync('./test/verified/de/4.lg'), textFile.readSync('./test/output/de/4.lg'))
                    done();
                })
                .catch(err => done(err))
        });

        
    });
    
});