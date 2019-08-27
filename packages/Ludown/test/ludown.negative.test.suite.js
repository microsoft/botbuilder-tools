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
                assert.equal(stderr.includes("[ERROR] line 4:0 - line 4:1: syntax error: invalid input 'i' detected. Expecting one of this - end of file, model description, new line, QnA definition, Intent definition, Entity definition, Import statement"), true);
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('should show ERR message when no labelled value is found for an entity', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/testcases/bad3a.lu`, (error, stdout, stderr) => {
            try {
                assert.equal(stderr.includes('[ERROR] line 4:0 - line 4:19: No labelled value found for entity: "tomato" in utterance: "-i wangt {tomato=}"'),true);
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('should show ERROR when no parser decorations are found in a line', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/testcases/bad2.lu`, (error, stdout, stderr) => {
            try {
                assert.equal(stderr.includes("[ERROR] line 1:0 - line 1:1: syntax error: invalid input 'f' detected. Expecting one of this - end of file, model description, new line, QnA definition, Intent definition, Entity definition, Import statement"), true);
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('should show WARN message when an answer is missing for qna pair', function(done) {
        exec(`node ${ludown} parse toqna --in ${TEST_ROOT}/testcases/bad.lu`, (error, stdout, stderr) => {
            try {
                assert.equal(stderr.includes("[ERROR] line 3:0 - line 3:1: syntax error: invalid input '$' detected. Expecting one of this - QnA filtering section, multiple line text"), true);    
                done();
            } catch (err) {
                done(err);
            }
        });
    });
});