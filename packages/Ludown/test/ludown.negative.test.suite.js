/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var chai = require('chai');
var assert = chai.assert;
const { exec } = require('child_process');
var path = require('path');
const ludown = require.resolve('../bin/ludown');

const TEST_ROOT = path.join(__dirname);

describe('Negative tests', function() {

    it('should show ERR message when no utterances are found for an intent', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/testcases/bad3.lu`, (error, stdout, stderr) => {
            try {
                assert.equal(stderr.includes("[ERROR] line 3:0: syntax error message: extraneous input 'i' expecting {<EOF>, NEWLINE, QNA, HASH, DOLLAR, IMPORT_DESC}"), true);
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it.skip('should show ERR message when no labelled value is found for an entity', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/testcases/bad3a.lu`, (error, stdout, stderr) => {
            try {
                assert.equal(stderr.includes('No labelled value found for entity:'),true);
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('should show ERROR when no parser decorations are found in a line', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/testcases/bad2.lu`, (error, stdout, stderr) => {
            try {
                assert.equal(stderr.includes("[ERROR] line 0:0: syntax error message: mismatched input 'f' expecting {<EOF>, NEWLINE, QNA, HASH, DOLLAR, IMPORT_DESC}"), true);
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('should show WARN message when an answer is missing for qna pair', function(done) {
        exec(`node ${ludown} parse toqna --in ${TEST_ROOT}/testcases/bad.lu`, (error, stdout, stderr) => {
            try {
                assert.equal(stderr.includes("[ERROR] line 2:0: syntax error message: mismatched input '$' expecting {'**Filters:**', MULTI_LINE_TEXT}"), true);    
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });
});