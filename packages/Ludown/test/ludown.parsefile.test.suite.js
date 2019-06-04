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

    it('parseFile correctly parses normalized list entity values with : in them', function(done) {
            let luFile = `$three : test :: a =
            - foo
            - bar
        `;

        parseFile.parseFile(luFile) 
                .then(res => {
                        assert.equal(res.LUISJsonStructure.closedLists.length, 1);
                        assert.equal(res.LUISJsonStructure.closedLists[0].subLists[0].canonicalForm, 'test :: a');
                        done();
                })
                .catch((err) => done(err))
    });

    it('parseFile correctly parses normalized list entity values with = in them', function(done) {
        let luFile = `$three : test = a =
        - foo
        - bar
    `;

    parseFile.parseFile(luFile) 
            .then(res => {
                    assert.equal(res.LUISJsonStructure.closedLists.length, 1);
                    assert.equal(res.LUISJsonStructure.closedLists[0].subLists[0].canonicalForm, 'test = a');
                    done();
            })
            .catch((err) => done(err))

        });

        it('parseFile correctly parses normalized list entity values with : in them and inline role definition', function(done) {
                let luFile = `$three : test :: a = Roles=[from,to]
                - foo
                - bar
            `;
    
            parseFile.parseFile(luFile) 
                    .then(res => {
                            assert.equal(res.LUISJsonStructure.closedLists.length, 1);
                            assert.equal(res.LUISJsonStructure.closedLists[0].subLists[0].canonicalForm, 'test :: a');
                            assert.equal(res.LUISJsonStructure.closedLists[0].roles.length, 2);
                            done();
                    })
                    .catch((err) => done(err))

        });

        it('phraseList entity does not overrite simple entity definition. Both can have same name', function(done) {
                let luFile = `$product : simple

                $product : phraseList
                    - one
                    - two
            `;
    
            parseFile.parseFile(luFile) 
                    .then(res => {
                            assert.equal(res.LUISJsonStructure.entities.length, 1);
                            assert.equal(res.LUISJsonStructure.model_features.length, 1);
                            done();
                    })
                    .catch((err) => done(err))

        });

        it('phraseList entity does not overrite simple entity definition. Both can have same name', function(done) {
                let luFile = `

                $product : phraseList
                    - one
                    - two

                    $product : simple
            `;
    
            parseFile.parseFile(luFile) 
                    .then(res => {
                            assert.equal(res.LUISJsonStructure.entities.length, 1);
                            assert.equal(res.LUISJsonStructure.model_features.length, 1);
                            done();
                    })
                    .catch((err) => done(err))

        });

        it('Labelled simple entity in an utterance that conflicts with a phrase list name is valid', function(done) {
                let luFile = `

                $product : phraseList
                    - one
                    - two

                    # test
                    - this is {product = one}
            `;
    
            parseFile.parseFile(luFile) 
                    .then(res => {
                            assert.equal(res.LUISJsonStructure.entities.length, 1);
                            assert.equal(res.LUISJsonStructure.entities[0].name, 'product');
                            assert.equal(res.LUISJsonStructure.model_features.length, 1);
                            done();
                    })
                    .catch((err) => done(err))

        });

        it('Labelled composite entity in an utterance that conflicts with a phrase list name is valid', function(done) {
                let luFile = `

                $product : phraseList
                    - one
                    - two

                    # test
                    - this is {product = {type=sandwich}}

                    $product : [type]
            `;
    
            parseFile.parseFile(luFile) 
                    .then(res => {
                            assert.equal(res.LUISJsonStructure.entities.length, 1);
                            assert.equal(res.LUISJsonStructure.entities[0].name, 'type');
                            assert.equal(res.LUISJsonStructure.model_features.length, 1);
                            assert.equal(res.LUISJsonStructure.composites.length, 1);
                            assert.equal(res.LUISJsonStructure.composites[0].name, 'product');
                            done();
                    })
                    .catch((err) => done(err))

        });

        it('Test for #1137', function(done) {
                let luFile = `

                $product : simple
                
                $PREBUILT : number

                $drinks:phraseList
                        - tea, latte, milk
                
                $product:phraseList
                        - a, b, c
                $EspressoType:Blonde ::201=
                        - blonde
                        - blond
            `;
    
            parseFile.parseFile(luFile) 
                    .then(res => {
                            assert.equal(res.LUISJsonStructure.entities.length, 1);
                            assert.equal(res.LUISJsonStructure.entities[0].name, 'product');
                            assert.equal(res.LUISJsonStructure.model_features.length, 2);
                            assert.equal(res.LUISJsonStructure.model_features[0].name, 'drinks');
                            done();
                    })
                    .catch((err) => done(err))

        });

        it('Test for #1151', function(done) {
                let luFile = `

                $project : simple
                
                $project:phraseList
                        - a, b, c

                # Test
                - this is a test {project=foo} utterance
            `;
    
            parseFile.parseFile(luFile) 
                    .then(res => {
                            assert.equal(res.LUISJsonStructure.entities.length, 1);
                            assert.equal(res.LUISJsonStructure.entities[0].name, 'project');
                            assert.equal(res.LUISJsonStructure.model_features.length, 1);
                            assert.equal(res.LUISJsonStructure.model_features[0].name, 'project');
                            assert.equal(res.LUISJsonStructure.utterances.length, 1);
                            done();
                    })
                    .catch((err) => done(err))

        });

        it('Test for #1164', function(done) {
                let luFile = `# Test
                - one {product:from=something}
                
                $product:test=
                - test`;
    
            parseFile.parseFile(luFile) 
                    .then(res => {
                            assert.equal(res.LUISJsonStructure.closedLists.length, 1);
                            assert.equal(res.LUISJsonStructure.closedLists[0].roles.length, 1);
                            done();
                    })
                    .catch((err) => done(err))

        });

        it('Test for #1164 (with roles)', function(done) {
                let luFile = `## None
                - here's an utterance {aListEntity:ThisIsARole=avalue} with a role in it
                
                $aListEntity:some value= Roles=ThisIsARole
                - avalue
                `;
    
            parseFile.parseFile(luFile) 
                    .then(res => {
                            assert.equal(res.LUISJsonStructure.closedLists.length, 1);
                            assert.equal(res.LUISJsonStructure.closedLists[0].roles.length, 1);
                            done();
                    })
                    .catch((err) => done(err))

        });
});