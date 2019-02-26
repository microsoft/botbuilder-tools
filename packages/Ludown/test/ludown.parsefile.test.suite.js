/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const parseFile = require('../lib/parseFileContents');
var chai = require('chai');
var assert = chai.assert;
describe('With helper functions', function() {
    it('validateLUISBlob throw when duplicate entity definitions are found', function(done) {
        let luFile = `# Greeting
- hi {commPreference}

$commPreference:simple
$commPreference:call=
- phone call`;
        parseFile.parseFile(luFile, false, 'en-us')
            .then(function(parsedContent) {
                parseFile.validateLUISBlob(parsedContent.LUISJsonStructure)
                    .then(() => done('Test fail. validateLUISBlob did not throw when expected!'))
                    .catch(() => done())
            })
            .catch(() => done('Test fail. validateLUISBlob did not throw when expected!'))
    });

    it('validateLUISBlob does not throw when phrase list names collide with other entity names', function(done) {
        let luFile = `# Greeting
- hi {commPreference}
$commPreference:simple
$commPreference:phraseList
- m&m,mars,mints,spearmings,payday,jelly,kit kat,kitkat,twix`;
        parseFile.parseFile(luFile, false, 'en-us')
            .then(function(parsedContent) {
                parseFile.validateLUISBlob(parsedContent.LUISJsonStructure)
                    .then(() => done())
                    .catch(() => done('Test fail. validateLUISBlob did not throw when expected!'))
            })
            .catch((err) => done('Test fail. validateLUISBlob did not throw when expected!'))
    });

    it('parseFile throws on invalid file refs', function(done) {
        let luFile = `[test]()`;
        parseFile.parseFile(luFile, false, 'en-us')
            .then(() => done('Test fail. validateLUISBlob did not throw when expected!'))
            .catch(() => done())
    });

    it('parseFile throws on nested entity refs', function(done) {
        let luFile = `# Greeting
- hi {userName=foo {lastName=bar}}
`;
        parseFile.parseFile(luFile, false, 'en-us')
            .then(() => done('Test fail. validateLUISBlob did not throw when expected!'))
            .catch(() => done())
    });

    it('parseFile throws if a QnA maker question does not have a list decoration', function(done) {
        let luFile = `# ? q1
question 2
`;
        parseFile.parseFile(luFile, false, 'en-us')
            .then(() => done('Test fail. validateLUISBlob did not throw when expected!'))
            .catch(() => done())
    });

    it('parseFile throws if a QnA maker filter section does not have list decoration', function(done) {
        let luFile = `# ? q1
**Filters:**
location = seattle
`;
        parseFile.parseFile(luFile, false, 'en-us')
            .then(() => done('Test fail. validateLUISBlob did not throw when expected!'))
            .catch(() => done())
    });

    it('parseFile throws if a QnA maker filter section does not have valid key = value pair', function(done) {
        let luFile = `# ? q1
**Filters:**
- location
`;
        parseFile.parseFile(luFile, false, 'en-us')
            .then(() => done('Test fail. validateLUISBlob did not throw when expected!'))
            .catch(() => done())
    });

    it('parseFile parses multi-line answer correctly', function(done) {
        let luFile = `# ? q1
\`\`\`markdown
test
123
\`\`\`
`;
        parseFile.parseFile(luFile, false, 'en-us')
            .then(() => done())
            .catch(() => done('Test fail. validateLUISBlob did not throw when expected!'))
    });

    it('parseFile throws on conflicting phraseList definitions', function(done) {
        let luFile = `$p1:phraseList
        - m&m,mars,mints,spearmings,payday,jelly,kit kat,kitkat,twix

        $p1:phraseList interchangeable
        - m&m,mars,mints,spearmings,payday,jelly,kit kat,kitkat,twix

`;
        parseFile.parseFile(luFile, false, 'en-us')
            .then(() => done('Test fail. validateLUISBlob did not throw when expected!'))
            .catch(() => done())
    });

    it('parseFile throws if phraseList value does not have list decoration', function(done) {
        let luFile = `$p1:phraseList
m&m,mars,mints,spearmings,payday,jelly,kit kat,kitkat,twix
`;
        parseFile.parseFile(luFile, false, 'en-us')
            .then(() => done('Test fail. validateLUISBlob did not throw when expected!'))
            .catch(() => done())
    });

    it('parseFile throws if List synonyms do not have list decoration', function(done) {
        let luFile = `$p1:t1=
m&m,mars,mints,spearmings,payday,jelly,kit kat,kitkat,twix
`;
        parseFile.parseFile(luFile, false, 'en-us')
            .then(() => done('Test fail. validateLUISBlob did not throw when expected!'))
            .catch(() => done())
    });

    it('parseFile correctly de-dupes patterns', function(done) {
        let luFile = `# test
        - this is {one}
        - this is {one}
`;
        parseFile.parseFile(luFile, false, 'en-us')
            .then(res => {
                assert.equal(res.LUISJsonStructure.patterns.length, 1);
                done();
            })
            .catch(() => done('Test fail. parseFile threw when it was not expected!'))
    });
});