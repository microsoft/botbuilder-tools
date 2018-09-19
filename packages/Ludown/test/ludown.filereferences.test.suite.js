/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/*eslint no-console: ["error", { allow: ["log"] }] */
var chai = require('chai');
var assert = chai.assert;
var path = require('path');
const { exec } = require('child_process');
const ludown = require.resolve('../bin/ludown');
const txtfile = require('read-text-file');
const fs = require('fs');
const NEWLINE = require('os').EOL;
const TEST_ROOT = path.join(__dirname);
const PATH_TO_OUTPUT_FOLDER = path.resolve(TEST_ROOT + '/output');

function compareFiles(actualPath, expectedPath) {
    let expected = txtfile.readSync(actualPath).split(/\r?\n/);
    let actual = txtfile.readSync(expectedPath).split(/\r?\n/);
    assert.deepEqual(actual, expected);
}

function sanitizeExampleJson(fileContent) {
    let escapedExampleNewLine = JSON.stringify('\r\n').replace(/"/g, '').replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    let escapedNewLine = JSON.stringify(NEWLINE).replace(/"/g, '');
    return fileContent.replace(new RegExp(escapedExampleNewLine, 'g'), escapedNewLine);
}

describe('LU files...', function() {
    before(function () {
        try {
            if (!fs.existsSync(PATH_TO_OUTPUT_FOLDER)) {
                fs.mkdirSync(PATH_TO_OUTPUT_FOLDER);
            }
        } catch (err) {
            console.log('Unable to create test\\output folder. The tests will fail');
        }
    });

    it('[QnA] with references specified via /* are parsed correctly', function(done) {
        exec(`node ${ludown} parse toqna --in ${TEST_ROOT}/testcases/root.lu -o ${TEST_ROOT}/output -n root`, () => {
            try {
                assert.deepEqual(JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/verified/root.json'))), JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/output/root.json'))));    
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('[QnA] with references specified via /** are parsed correctly', function(done) {
        exec(`node ${ludown} parse toqna --in ${TEST_ROOT}/testcases/root2.lu -o ${TEST_ROOT}/output -n root2`, () => {
            try {
                assert.deepEqual(JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/verified/root2.json'))), JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/output/root2.json'))));    
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('[LUIS] with references specified via /* are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/testcases/root.lu -o ${TEST_ROOT}/output --out root_luis.json -n root`, () => {
            try {
                assert.deepEqual(JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/verified/root_luis.json'))), JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/output/root_luis.json'))));    
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('[LUIS] with references specified via /** are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/testcases/root2.lu -o ${TEST_ROOT}/output --out root2_luis.json -n root2`, () => {
            try {
                assert.deepEqual(JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/verified/root2_luis.json'))), JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/output/root2_luis.json'))));    
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    if ('[LUIS] utterances with () without deep link references are parsed correctly', function(done){
        exec (`node ${ludown} parse toluis --in ${TEST_ROOT}/testcases/root3.lu -o ${TEST_ROOT}/output --out root3.lu -n root3.lu`, () => {
            try {
                assert.deepEqual(JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/verified/root3.lu'))), JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/output/root3.lu'))));    
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });
});