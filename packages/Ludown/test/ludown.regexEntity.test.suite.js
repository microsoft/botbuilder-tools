/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const chai = require('chai');
const assert = chai.assert;
const parseFile = require('../lib/parseFileContents').parseFile;
const retCode = require('../lib/enums/CLI-errors').errorCode;
const hClasses = require('../lib/classes/hclasses');
const collateLUISFiles = require('../lib/parseFileContents').collateLUISFiles;
describe('Regex entities in .lu files', function() {
    it('are parsed correctly when a valid regex pattern is provided', function(done){
        let luFileContent = `$HRF-number:/hrf-[0-9]{6}/`;
        let regexEntity = new hClasses.regExEntity('HRF-number', 'hrf-[0-9]{6}');
        parseFile(luFileContent, false)
            .then(res => {
                assert.deepEqual(res.LUISJsonStructure.regex_entities[0], regexEntity);
                done();
            })
            .catch(err => done(`Test failed - ${err}`))
    });

    it('throws correctly when an empty regex pattern is specified', function(done){
        let luFileContent = `$test://`;
        parseFile(luFileContent, false) 
            .then(res => done(`Test fail! Did not throw when expected`))
            .catch(err => done())
    });

    it('throws correctly when an invalid regex pattern is specified', function(done){
        let luFileContent = `$test:/hrf-[0-9]{6}`;
        parseFile(luFileContent, false) 
            .then(res => done(`Test fail! Did not throw when expected`))
            .catch(err => done())
    });

    it('throws correctly when multiple regex patterns have the same entity name', function(done){
        let luFileContent = `$test:/hrf-[0-9]{6}
$test:/udf-[0-9]{6}/`;
        parseFile(luFileContent, false) 
            .then(res => done(`Test fail! Did not throw when expected`))
            .catch(err => done())
    });

    it('correctly de-dupes when multiple regex entities with same name and pattern are defined in a lu file', function(done){
        let luFileContent = `$test:/hrf-[0-9]{6}/
$test:/hrf-[0-9]{6}/`;
        let regexEntity = new hClasses.regExEntity('test', 'hrf-[0-9]{6}');
        parseFile(luFileContent, false) 
            .then(res => {
                assert.equal(res.LUISJsonStructure.regex_entities.length, 1);
                assert.deepEqual(res.LUISJsonStructure.regex_entities[0], regexEntity);
                done();
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err, null, 2)}`))
    });

    it('corectly collates multiple regex entities defined across different lu files', function(done) {
        let luFile1 = `$test:/hrf-[0-9]{6}/`;
        let luFile2 = `$test2:/udf-[0-9]{10}/`;
        let regexEntity1 = new hClasses.regExEntity('test', 'hrf-[0-9]{6}');
        let regexEntity2 = new hClasses.regExEntity('test2', 'udf-[0-9]{10}');
        parseFile(luFile1, false) 
            .then(res1 => {
                parseFile(luFile2, false)
                    .then(res2 => {
                        collateLUISFiles([res1, res2])
                            .then(collated => {
                                assert.equal(collated.regex_entities.length, 2);
                                assert.deepEqual(collated.regex_entities[0], regexEntity1);
                                assert.deepEqual(collated.regex_entities[1], regexEntity2);
                                done();
                            })
                            .catch(err => done(`Test failed - ${JSON.stringify(err, null, 2)}`))
                    })
                    .catch(err => done(`Test failed - ${JSON.stringify(err, null, 2)}`))                
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err, null, 2)}`))
    });

    it('throws when duplicate regex entities with different patterns are found across lu files', function(done) {
        let luFile1 = `$test:/hrf-[0-9]{6}/`;
        let luFile2 = `$test:/udf-[0-9]{10}/`;
        parseFile(luFile1, false) 
            .then(res1 => {
                parseFile(luFile2, false)
                    .then(res2 => {
                        collateLUISFiles([res1, res2])
                            .then(res => {
                                console.log(JSON.stringify(res,null, 2));
                                done(`Test failed - did not throw when expected`);
                            })
                            .catch(err => done())
                    })
                    .catch(err => done())                
            })
            .catch(err => done())
    });
});


// throws when duplicate regex entities with different patterns are found across lu files

// correctly parses regex entitiy use in a pattern
// correctly parses regex entitiy use with a role in patterns

// correctly localizes regex entity

// correctly refreshes luis model with regex entity
