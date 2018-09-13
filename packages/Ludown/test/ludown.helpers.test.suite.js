/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const chai = require('chai');
const assert = chai.assert;
const helpers = require('../lib/helpers');
const path = require('path');

const LUDOWN_ROOT = path.join(__dirname, '../');
function resolvePath(relativePath) {
    return path.join(LUDOWN_ROOT, relativePath);
}

describe('With helper functions', function() {
    it('findLUFiles should recursively find subfolders', function(done) {
        let rootPath = resolvePath('examples');
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
            helpers.splitFileBySections(testLu, false);
            done('Test failed: splitFileBySections did not throw!');
        } catch (err) {
            done();
        }
    });

    it('splitFileBySections handles when no list entity definition is found', function(done){
        let testLu = `$test:123=
# Greeting`;
        try {
            helpers.splitFileBySections(testLu, false);
            done();
        } catch (err) {
            done(err);
        }
    });

    it('splitFileBySections handles when no utteraences are specified for an intent', function(done){
        let testLu = `# Greeting
# None`;
        try {
            helpers.splitFileBySections(testLu, false);
            done();
        } catch (err) {
            done(err);
        }
    });

    it('splitFileBySections throws when no answer found for question', function(done){
        let testLu = `# ? 123
# Greeting`;
        try {
            helpers.splitFileBySections(testLu, false);
            done('Test failed: splitFileBySections did not throw!');
        } catch (err) {
            done();
        }
    });

    it('splitFileBySections throws when no answer found for question', function(done){
        let testLu = `# ? 123
[test](1.lu)`;
        try {
            helpers.splitFileBySections(testLu, false);
            done('Test failed: splitFileBySections did not throw!');
        } catch (err) {
            done();
        }
    });

    it('splitFileBySections throws when no answer found for question', function(done){
        let testLu = `# ? 123`;
        try {
            helpers.splitFileBySections(testLu, false);
            done('Test failed: splitFileBySections did not throw!');
        } catch (err) {
            done();
        }
    });

    it('splitFileBySections throws when invalid entity definition is found', function(done){
        let testLu = `$ChocolateType:phraseList
        - m&m,mars,mints,spearmings,payday,jelly,kit kat,kitkat,twix
        $commPreference:call
- phone call`;
        try {
            helpers.splitFileBySections(testLu, false);
            done('Test failed: splitFileBySections did not throw!');
        } catch (err) {
            done();
        }
    });

    it('splitFileBySections throws when invalid entity definition is found', function(done){
        let testLu = `$ChocolateType:phrase List
        - m&m,mars,mints,spearmings,payday,jelly,kit kat,kitkat,twix
        $commPreference:call
- phone call`;
        try {
            helpers.splitFileBySections(testLu, false);
            done('Test failed: splitFileBySections did not throw!');
        } catch (err) {
            done();
        }
    });

    it('splitFileBySections throws when invalid entity definition is found', function(done){
        let testLu = `$PREBUILT:datetimeV23`;
        try {
            helpers.splitFileBySections(testLu, false);
            done('Test failed: splitFileBySections did not throw!');
        } catch (err) {
            done();
        }
    });

    it('splitFileBySections throws when invalid entity definition is found', function(done){
        let testLu = `$PREBUILT=datetimeV23`;
        try {
            helpers.splitFileBySections(testLu, false);
            done('Test failed: splitFileBySections did not throw!');
        } catch (err) {
            done();
        }
    });

    it('splitFileBySections throws when invalid entity definition is found', function(done){
        let testLu = `$commPreference:cal=l
- phone call`;
        try {
            helpers.splitFileBySections(testLu, false);
            done('Test failed: splitFileBySections did not throw!');
        } catch (err) {
            done();
        }
    });

    it('parseLinkURI throws when invalid link definition is found', function(done){
        let testLu = `[test](https://botframework.com`;
        try {
            helpers.parseLinkURI (testLu);
            done('Test failed: splitFileBySections did not throw!');
        } catch (err) {
            done();
        }
    });

    it('parseLinkURI throws when invalid link definition is found', function(done){
        let testLu = `[test](https://botframework.com)`;
        try {
            helpers.parseLinkURI (testLu);
            done('Test failed: splitFileBySections did not throw!');
        } catch (err) {
            done();
        }
    });

    it('parseLinkURI throws when invalid link definition is found', function(done){
        let testLu = `[test](./1.lu)`;
        try {
            helpers.parseLinkURI (testLu);
            done('Test failed: splitFileBySections did not throw!');
        } catch (err) {
            done();
        }
    });

    it('parseLinkURI throws when invalid link definition is found', function(done){
        let testLu = `[test](./1.lu/*)`;
        try {
            helpers.parseLinkURI (testLu);
            done('Test failed: splitFileBySections did not throw!');
        } catch (err) {
            done();
        }
    });

    it('parseLinkURI throws when invalid link definition is found', function(done){
        let testLu = `[test](./1.lu/!)`;
        try {
            helpers.parseLinkURI (testLu);
            done('Test failed: splitFileBySections did not throw!');
        } catch (err) {
            done();
        }
    });
});