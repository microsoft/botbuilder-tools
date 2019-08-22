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
const txtfile = require('../lib/read-text-file');
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

describe('VA skill lu files', function () {
    before(function () {
        try {
            if (!fs.existsSync(PATH_TO_OUTPUT_FOLDER)) {
                fs.mkdirSync(PATH_TO_OUTPUT_FOLDER);
            }
        } catch (err) {
            console.log('Unable to create test\\output folder. The tests will fail');
        }
    });

    it('Calendar skill LU file parses correctly', function (done) {
        exec(`node ${ludown} parse toluis -l ${TEST_ROOT}/testcases/Skills/Calendar -o ${TEST_ROOT}/output --out Calendar.json`, () => {
            try {
                assert.deepEqual(JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/verified/Skills/Calendar.json'))), JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/output/Calendar.json'))));
                done();
            } catch (err) {
                done(err);
            }

        });
    });

    it('Email skill LU file parses correctly', function (done) {
        exec(`node ${ludown} parse toluis -l ${TEST_ROOT}/testcases/Skills/Email -o ${TEST_ROOT}/output --out Email.json`, () => {
            try {
                assert.deepEqual(JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/verified/Skills/Email.json'))), JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/output/Email.json'))));
                done();
            } catch (err) {
                done(err);
            }

        });
    });

    it('Todo skill LU file parses correctly', function (done) {
        exec(`node ${ludown} parse toluis -l ${TEST_ROOT}/testcases/Skills/Todo -o ${TEST_ROOT}/output --out Todo.json`, () => {
            try {
                assert.deepEqual(JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/verified/Skills/Todo.json'))), JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/output/Todo.json'))));
                done();
            } catch (err) {
                done(err);
            }

        });
    });

});
