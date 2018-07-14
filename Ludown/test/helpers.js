/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const chai = require('chai');
const assert = chai.assert;
const helpers = require('../lib/helpers');
const path = require('path');
describe('With helper functions', function() {
    it('findLUFiles should recursively find subfolders', function(done) {
        let rootPath = path.resolve('./examples');
        let findFilesIncludingSubfolders = helpers.findLUFiles(rootPath, true);
        let findFilesInRootFolder = helpers.findLUFiles(rootPath, false);
        try {
            assert.notEqual(findFilesIncludingSubfolders.length, findFilesInRootFolder.length);
            done();
        } catch (err) {
            done(err);
        }
    });

    it('splitFileBySections throws when no intent definition found in a line', function(done){
        let testLu = `#Greeting`;
        try {
            let test = helpers.splitFileBySections(testLu, false);
            done('Test failed: splitFileBySections did not throw!');
        } catch (err) {
            done();
        }
    });

    it('splitFileBySections handles when no list entity definition is found', function(done){
        let testLu = `$test:123=
# Greeting`;
        try {
            let test = helpers.splitFileBySections(testLu, false);
            done();
        } catch (err) {
            done(err);
        }
    });

    it('splitFileBySections handles when no utteraences are specified for an intent', function(done){
        let testLu = `# Greeting
# None`;
        try {
            let test = helpers.splitFileBySections(testLu, false);
            done();
        } catch (err) {
            done(err);
        }
    });

    it('splitFileBySections throws when no answer found for question', function(done){
        let testLu = `# ? 123
# Greeting`;
        try {
            let test = helpers.splitFileBySections(testLu, false);
            done('Test failed: splitFileBySections did not throw!');
        } catch (err) {
            done();
        }
    });

});