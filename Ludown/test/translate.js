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
});