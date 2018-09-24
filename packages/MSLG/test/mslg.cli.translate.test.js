/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const textFile = require('read-text-file');
const translate = require('../lib/utils/translate');
const retCode = require('../lib/enums/errorCodes');

const translatorKey  = process.env.TRANSLATORKEY;

describe('MSLG Translate', function() {
    if (!translatorKey) 
    {
        console.warn('WARNING: skipping MSLG Translate test suite because TRANSLATORKEY environment variable is not defined');
        return;
    }
    describe('The translateText method', function(){
        it('Throws correctly when invalid translate key is specified', function(done){
            translate.translateText(`>this is a comment`, 'de', "randomKey", 'en')
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.TRANSLATE_SERVICE_FAIL); done();})
        });
        it('Throws correctly when invalid target language is specified', function(done){
            translate.translateText(`>this is a comment`, 'dex', translatorKey, 'en')
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.TRANSLATE_SERVICE_FAIL); done();})
        });
        it('Throws correctly when invalid src language is specified', function(done){
            translate.translateText(`>this is a comment`, 'de', translatorKey, 'enx')
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.TRANSLATE_SERVICE_FAIL); done();})
        });
        it('Correctly translates text provided', function(done){
            translate.translateText(`>this is a comment`, 'de', translatorKey, 'en')
                .then(res => {
                    assert.equal(res[0].translations[0].text, `> Dies ist ein Kommentar`);
                    done()
                })
                .catch(err => done(err))
        });
    });    
});