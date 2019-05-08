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
- hi {commPreference=test call}

$commPreference:simple
$commPreference:call=
- phone call`;
        parseFile.parseFile(luFile, false, 'en-us')
            .then(function(parsedContent) {
                parseFile.validateLUISBlob(parsedContent.LUISJsonStructure)
                    .then(() => done('Test fail. validateLUISBlob did not throw when expected!'))
                    .catch(() => done())
            })
            .catch(() => done())
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

describe('parseFile correctly parses utterances', function() {
        it ('correctly parses an utterance with no entities', function(done) {
                let testLUFile = `# test
                - hello`;
                parseFile.parseFile(testLUFile, false)
                        .then(res => {
                                assert.equal(res.LUISJsonStructure.utterances.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].text, "hello");
                                done();
                        })
                        .catch(err => done(err))
        });

        it ('correctly parses an utterance with one labelled entity', function(done) {
                let testLUFile = `# test
                - I want a {foodType = tomato}`;
                parseFile.parseFile(testLUFile, false)
                        .then(res => {
                                assert.equal(res.LUISJsonStructure.utterances.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].text, "I want a tomato");
                                assert.equal(res.LUISJsonStructure.utterances[0].entities.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].startPos, 9);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].endPos, 14);
                                assert.equal(res.LUISJsonStructure.entities.length, 1);
                                done();
                        })
        })

        it ('correctly parses an utterance with one labelled entity', function(done) {
                let testLUFile = `# test
                - I want a {foodType=tomato}`;
                parseFile.parseFile(testLUFile, false)
                        .then(res => {
                                assert.equal(res.LUISJsonStructure.utterances.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].text, "I want a tomato");
                                assert.equal(res.LUISJsonStructure.utterances[0].entities.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].startPos, 9);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].endPos, 14);
                                assert.equal(res.LUISJsonStructure.entities.length, 1);
                                done();
                        })
        })

        it ('correctly parses a pattern with pattern.any entity', function(done) {
                let testLUFile = `# test
                - I want {foodType}`;
                parseFile.parseFile(testLUFile, false)
                        .then(res => {
                                assert.equal(res.LUISJsonStructure.utterances.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].text, "I want {foodType}");
                                assert.equal(res.LUISJsonStructure.patterns.length, 1);
                                assert.equal(res.LUISJsonStructure.patterns[0].pattern, "I want {foodType}");
                                assert.equal(res.LUISJsonStructure.patternAnyEntities.length, 1);
                                assert.equal(res.LUISJsonStructure.patternAnyEntities[0].name, "foodType");
                                done();
                        })
        })

        it ('correctly parses an utterance with multiple labelled entities', function(done) {
                let testLUFile = `# test
                - I want a {foodType = tomato} and {foodType = orange}`;
                parseFile.parseFile(testLUFile, false)
                        .then(res => {
                                assert.equal(res.LUISJsonStructure.utterances.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].text, "I want a tomato and orange");
                                assert.equal(res.LUISJsonStructure.utterances[0].entities.length, 2);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[1].startPos, 20);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[1].endPos, 25);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].startPos, 9);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].endPos, 14);
                                assert.equal(res.LUISJsonStructure.entities.length, 1);
                                done();
                        })
        })

        it ('correctly parses an utterance with multiple labelled entities', function(done) {
                let testLUFile = `# test
                - I want a {foodType =tomato} and {foodType =orange}`;
                parseFile.parseFile(testLUFile, false)
                        .then(res => {
                                assert.equal(res.LUISJsonStructure.utterances.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].text, "I want a tomato and orange");
                                assert.equal(res.LUISJsonStructure.utterances[0].entities.length, 2);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[1].startPos, 20);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[1].endPos, 25);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].startPos, 9);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].endPos, 14);
                                assert.equal(res.LUISJsonStructure.entities.length, 1);
                                done();
                        })
        })

        it ('correctly parses a pattern with multiple pattern.any entities', function(done) {
                let testLUFile = `# test
                - I want {foodType} and {foodType}`;
                parseFile.parseFile(testLUFile, false)
                        .then(res => {
                                assert.equal(res.LUISJsonStructure.utterances.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].text, "I want {foodType} and {foodType}");
                                assert.equal(res.LUISJsonStructure.patterns.length, 1);
                                assert.equal(res.LUISJsonStructure.patterns[0].pattern, "I want {foodType} and {foodType}");
                                assert.equal(res.LUISJsonStructure.patternAnyEntities.length, 1);
                                assert.equal(res.LUISJsonStructure.patternAnyEntities[0].name, "foodType");
                                done();
                        })
        })

        it ('correctly parses an utterance with only labelled entity', function(done) {
                let testLUFile = `# test
                - {userName=vishwac}`;
                parseFile.parseFile(testLUFile, false)
                        .then(res => {
                                assert.equal(res.LUISJsonStructure.utterances.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].text, "vishwac");
                                assert.equal(res.LUISJsonStructure.utterances[0].entities.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].startPos, 0);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].endPos, 6);
                                assert.equal(res.LUISJsonStructure.entities.length, 1);
                                done();
                        })
        })

        it ('correctly parses an utterance with only labelled entity', function(done) {
                let testLUFile = `# test
                - {userName= vishwac}`;
                parseFile.parseFile(testLUFile, false)
                        .then(res => {
                                assert.equal(res.LUISJsonStructure.utterances.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].text, "vishwac");
                                assert.equal(res.LUISJsonStructure.utterances[0].entities.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].startPos, 0);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].endPos, 6);
                                assert.equal(res.LUISJsonStructure.entities.length, 1);
                                done();
                        })
        })

        it ('correctly parses pattern with only pattern.any entity in it.', function(done) {
                let testLUFile = `# test
                - {userName}`;
                parseFile.parseFile(testLUFile, false)
                        .then(res => {
                                assert.equal(res.LUISJsonStructure.utterances.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].text, "{userName}");
                                assert.equal(res.LUISJsonStructure.patterns.length, 1);
                                assert.equal(res.LUISJsonStructure.patterns[0].pattern, "{userName}");
                                assert.equal(res.LUISJsonStructure.patternAnyEntities.length, 1);
                                assert.equal(res.LUISJsonStructure.patternAnyEntities[0].name, "userName");
                                done();
                        })
        })

        it ('correctly parses utterance with composite entities', function(done) {
                let testLUFile = `# test
                - {p = x {q = y}}
                
                $ p : [y]`;
                parseFile.parseFile(testLUFile, false)
                        .then(res => {
                                assert.equal(res.LUISJsonStructure.utterances.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].text, "x y");
                                assert.equal(res.LUISJsonStructure.composites.length, 1);
                                assert.equal(res.LUISJsonStructure.composites[0].name, 'p');
                                assert.deepEqual(res.LUISJsonStructure.composites[0].children, ["y"]);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities.length, 2);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].startPos, 2);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].endPos, 2);
                                done();
                        })
        })

        it ('correctly parses utterance with composite entities with one child label', function(done) {
                let testLUFile = `# test
                - I want to {productOrder = buy a {product = shirt}} please
                
                $ productOrder : [product]`;
                parseFile.parseFile(testLUFile, false)
                        .then(res => {
                                assert.equal(res.LUISJsonStructure.utterances.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].text, "I want to buy a shirt please");
                                assert.equal(res.LUISJsonStructure.composites.length, 1);
                                assert.equal(res.LUISJsonStructure.composites[0].name, 'productOrder');
                                assert.deepEqual(res.LUISJsonStructure.composites[0].children, ["product"]);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities.length, 2);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].startPos, 16);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].endPos, 20);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[1].startPos, 10);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[1].endPos, 20);
                                done();
                        })
        })

        it ('correctly parses utterance with composite entities with multiple children', function(done) {
                let testLUFile = `# test
                - I want {productOrder = another {product = shirt} and {product = pant} please}
                
                $ productOrder : [product]`;
                parseFile.parseFile(testLUFile, false)
                        .then(res => {
                                assert.equal(res.LUISJsonStructure.utterances.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].text, "I want another shirt and pant please");
                                assert.equal(res.LUISJsonStructure.composites.length, 1);
                                assert.equal(res.LUISJsonStructure.composites[0].name, 'productOrder');
                                assert.deepEqual(res.LUISJsonStructure.composites[0].children, ["product"]);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities.length, 3);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[1].startPos, 25);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[1].endPos, 28);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].startPos, 15);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].endPos, 19);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[2].startPos, 7);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[2].endPos, 35);
                                done();
                        })
        })

        it ('correctly parses utterance with composite entities', function(done) {
                let testLUFile = `# test
                - I want {p = x {q = y} and {r = a} with} {foodType=tomato} and {foodType=orange}
                
                $ p : [q, r]`;
                parseFile.parseFile(testLUFile, false)
                        .then(res => {
                                assert.equal(res.LUISJsonStructure.utterances.length, 1);
                                assert.equal(res.LUISJsonStructure.utterances[0].text, "I want x y and a with tomato and orange");
                                assert.equal(res.LUISJsonStructure.composites.length, 1);
                                assert.equal(res.LUISJsonStructure.composites[0].name, 'p');
                                assert.deepEqual(res.LUISJsonStructure.composites[0].children, ["q", "r"]);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities.length, 5);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].startPos, 9);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[0].endPos, 9);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[1].startPos, 15);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[1].endPos, 15);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[2].startPos, 7);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[2].endPos, 20);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[3].startPos, 22);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[3].endPos, 27);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[4].startPos, 33);
                                assert.equal(res.LUISJsonStructure.utterances[0].entities[4].endPos, 38);
                                done();
                        })
        })
        
})