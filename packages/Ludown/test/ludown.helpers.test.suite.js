/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const chai = require('chai');
const assert = chai.assert;
const helpers = require('../lib/helpers');
const path = require('path');
const parserConsts = require('../lib/enums/parserconsts');

const LUDOWN_ROOT = path.join(__dirname, '../');
function resolvePath(relativePath) {
    return path.join(LUDOWN_ROOT, relativePath);
}

describe('With helper functions', function() {
    it('findFiles should recursively find subfolders', function(done) {
        let rootPath = resolvePath('examples');
        let findFilesIncludingSubfolders = helpers.findFiles(rootPath, true, parserConsts.LUFILEEXTENSION);
        let findFilesInRootFolder = helpers.findFiles(rootPath, false, parserConsts.LUFILEEXTENSION);
        try {
            assert.notEqual(findFilesIncludingSubfolders.length, findFilesInRootFolder.length);
            done();
        } catch (err) {
            done(err);
        }
    });

    it('findFiles should find .qna files', function(done) {
        let rootPath = resolvePath('examples/suggestModels/Bot 10/chitChat');
        let findFilesInRootFolder = helpers.findFiles(rootPath, false, parserConsts.QNAFILEEXTENSION);
        try {
            assert.equal(findFilesInRootFolder.length, 2);
            done();
        } catch (err) {
            done(err);
        }
    });

    it('findFiles should find .qna files recursively', function(done) {
        let rootPath = resolvePath('examples/suggestModels/Bot 10');
        let findFilesInRootFolder = helpers.findFiles(rootPath, true, parserConsts.QNAFILEEXTENSION);
        try {
            assert.equal(findFilesInRootFolder.length, 5);
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

    it('splitFileBySections should accept entity definitions containing "simple" in their name', function(done){
        let testLu = `$ServiceName:simple-service=
        - Simple Test`;
        try {
            helpers.splitFileBySections(testLu, false);
            done();
        } catch (err) {
            done(new Error('Test failed: splitFileBySections invalid entity definition!'));
        }
    });

    it('split should not drop left-over substring if limit is less than possible parts', function(done){
        const runTest = function (string, separator, limit, expectedParts) {
            const inputs = `String: ${JSON.stringify(string)} Separator: ${JSON.stringify(separator)} Limit: ${limit}`;
            const actualParts = helpers.split(string, separator, limit);
            assert.deepEqual(actualParts, expectedParts,
                    `${inputs} Expected: ${JSON.stringify(expectedParts)} Actual: ${JSON.stringify(actualParts)}`);
            for (const prop in actualParts) {
                assert((typeof prop) === 'number' || !isNaN(prop), `${inputs} Expected all properties of the returned array to be numbers, actual: ${JSON.stringify(prop)}`);
                assert(prop >= 0, `${inputs} Expected all indices of the returned array to be non-negative, actual: ${JSON.stringify(prop)}`);
            }
        };

        try {
            runTest('', '', undefined, []);
            runTest('', '', 0, []);
            runTest('', '', 99, []);
            runTest('', ':', undefined, ['']);
            runTest('', ':', 0, []);
            runTest('', ':', 99, ['']);
            runTest('abc', '', undefined, ['a', 'b', 'c']);
            runTest('abc', '', 0, []);
            runTest('abc', '', 1, ['abc']);
            runTest('abc', '', 2, ['a', 'bc']);
            runTest('abc', '', 3, ['a', 'b', 'c']);
            runTest('abc', '', 99, ['a', 'b', 'c']);
            runTest('abc', ':', undefined, ['abc']);
            runTest('abc', ':', 0, []);
            runTest('abc', ':', 1, ['abc']);
            runTest('abc', ':', 99, ['abc']);
            runTest('a:b:c', ':', undefined, ['a', 'b', 'c']);
            runTest('a:b:c', ':', 0, []);
            runTest('a:b:c', ':', 1, ['a:b:c']);
            runTest('a:b:c', ':', 2, ['a', 'b:c']);
            runTest('a:b:c', ':', 3, ['a', 'b', 'c']);
            runTest('a:b:c', ':', 99, ['a', 'b', 'c']);
            runTest('a:b:', ':', undefined, ['a', 'b', '']);
            runTest('a:b:', ':', 0, []);
            runTest('a:b:', ':', 1, ['a:b:']);
            runTest('a:b:', ':', 2, ['a', 'b:']);
            runTest('a:b:', ':', 3, ['a', 'b', '']);
            runTest('a:b:', ':', 99, ['a', 'b', '']);
            runTest('a::c', ':', undefined, ['a', '', 'c']);
            runTest('a::c', ':', 0, []);
            runTest('a::c', ':', 1, ['a::c']);
            runTest('a::c', ':', 2, ['a', ':c']);
            runTest('a::c', ':', 3, ['a', '', 'c']);
            runTest('a::c', ':', 99, ['a', '', 'c']);
            runTest(':b:c', ':', undefined, ['', 'b', 'c']);
            runTest(':b:c', ':', 0, []);
            runTest(':b:c', ':', 1, [':b:c']);
            runTest(':b:c', ':', 2, ['', 'b:c']);
            runTest(':b:c', ':', 3, ['', 'b', 'c']);
            runTest(':b:c', ':', 99, ['', 'b', 'c']);
            runTest('a:/:/b:/:/c', ':/:/', undefined, ['a', 'b', 'c']);
            runTest('a:/:/b:/:/c', ':/:/', 0, []);
            runTest('a:/:/b:/:/c', ':/:/', 1, ['a:/:/b:/:/c']);
            runTest('a:/:/b:/:/c', ':/:/', 2, ['a', 'b:/:/c']);
            runTest('a:/:/b:/:/c', ':/:/', 3, ['a', 'b', 'c']);
            runTest('a:/:/b:/:/c', ':/:/', 99, ['a', 'b', 'c']);
            runTest('a:/:/:/:/c', ':/:/', undefined, ['a', '', 'c']);
            runTest('a:/:/:/:/c', ':/:/', 0, []);
            runTest('a:/:/:/:/c', ':/:/', 1, ['a:/:/:/:/c']);
            runTest('a:/:/:/:/c', ':/:/', 2, ['a', ':/:/c']);
            runTest('a:/:/:/:/c', ':/:/', 3, ['a', '', 'c']);
            runTest('a:/:/:/:/c', ':/:/', 99, ['a', '', 'c']);
            done();
        } catch (err) {
            done(new Error(`Test failed: ${err}`));
        }
    });
});