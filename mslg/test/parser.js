/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

var chai = require('chai');
var assert = chai.assert;
const parser = require('../lib/parser');
const path = require('path');
const readFile = require('read-text-file');
describe('The parser', function() {
            
    describe('For true negatives on variation text', function() {

        it('Throws when a variation has empty or null value', function(done) {
            let fileContent = `# Greeting
            - `;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {console.log(JSON.stringify(err, null, 2)); done();})
        });
    
        it('Throws when a variation has reference to an reserved word as entity name', function(done) {
            let fileContent = `# Greeting
            - test {Floor} `;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {console.log(JSON.stringify(err, null, 2)); done();})
        });
    
        it('Throws when a variation has reference to nested templates', function(done) {
            let fileContent = `# Greeting
            - test [foo[bar]]`;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {console.log(JSON.stringify(err, null, 2)); done();})
        });
    
        it('Throws when a variation has reference to nested entity', function(done) {
            let fileContent = `# Greeting
            - test {foo{bar}}`;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {console.log(JSON.stringify(err, null, 2)); done();})
        });
    }) 
    
    describe('For true negatives on condition names for conditional responses ', function(){

    });

    describe('For true negatives on template names', function() {

    });

    describe('Basic parsing', function() {
        
        it('Correctly parses a document with just comments', function(done) {
            let fileContent = `> this is a comment`;
            parser.parse(fileContent, false)
                .then(res => {
                    assert.equal(res.LGObject, undefined);
                    done ();
                })
                .catch(err => done(err))
        });

        it('Correctly parses a document with one template definition', function(done) {
            let fileContent = `# Greeting
            - test`;
            parser.parse(fileContent, false)
                .then(res => {
                    assert.equal(res.LGObject.LGTemplates[0].name, 'Greeting');
                    assert.deepEqual(res.LGObject.LGTemplates[0].variations, ['test']);
                    done ();
                })
                .catch(err => done(err))
        });

        it('Correctly parses a document with two template definitions', function(done) {
            let fileContent = `# Greeting
            - test
            
            # wPhrase
            - hi`;
            parser.parse(fileContent, false)
                .then(res => {
                    assert.equal(res.LGObject.LGTemplates.length, 2);
                    assert.deepEqual(res.LGObject.LGTemplates[1].variations, ['hi']);
                    done ();
                })
                .catch(err => done(err))
        });

        it('Correctly parses a document with a conditional response definition', function(done) {
            let fileContent = `# Greeting
            - CASE: foo
                - hi`;
            parser.parse(fileContent, false)
                .then(res => {
                    assert.equal(res.LGObject.LGTemplates[0].name, 'Greeting');
                    assert.equal(res.LGObject.LGTemplates[0].conditionalResponses[0].condition, 'foo');
                    assert.deepEqual(res.LGObject.LGTemplates[0].conditionalResponses[0].variations, ['hi']);
                    done ();
                })
                .catch(err => done(err))
        });

        it('Correctly parses a document with multiple conditional response definition', function(done) {
            let fileContent = `# Greeting
            - CASE: foo
                - hi
            - DEFAULT:
                - test`;
            parser.parse(fileContent, false)
                .then(res => {
                    assert.equal(res.LGObject.LGTemplates[0].name, 'Greeting');
                    assert.equal(res.LGObject.LGTemplates[0].conditionalResponses[1].condition, 'Else');
                    assert.deepEqual(res.LGObject.LGTemplates[0].conditionalResponses[1].variations, ['test']);
                    done ();
                })
                .catch(err => done(err))
        });

        it('Correctly collates multiple template definitions into one list', function(done) {
            let fileContent = `# Greeting
            - hi

            # Greeting
            - test`;
            parser.parse(fileContent, false)
                .then(res => {
                    assert.equal(res.LGObject.LGTemplates[0].name, 'Greeting');
                    assert.equal(res.LGObject.LGTemplates[0].variations.length, 2);
                    done ();
                })
                .catch(err => done(err))
        });

        it('Correctly collates multiple template definitions with disjoint conditions into one list', function(done) {
            let fileContent = `# Greeting
            - CASE: foo
                - hi
            - DEFAULT:
                - test
                
            # Greeting
            - CASE: foo
                - hello
            - CASE: bar
                - hi
            - DEFAULT:
                - test2`;
            parser.parse(fileContent, false)
                .then(res => {
                    assert.equal(res.LGObject.LGTemplates[0].name, 'Greeting');
                    assert.equal(res.LGObject.LGTemplates[0].conditionalResponses.length, 3);
                    assert.equal(res.LGObject.LGTemplates[0].conditionalResponses[1].condition, 'Else');
                    done ();
                })
                .catch(err => done(err))
        });

        it('Correctly parses file references in LG file', function(done) {
            let fileContent = `# Greeting
            - CASE: foo
                - hi
            - DEFAULT:
                - test
                
            [reference](./1.lg)`;
            parser.parse(fileContent, false)
                .then(res => {
                    assert.equal(res.additionalFilesToParse.length, 1);
                    done ();
                })
                .catch(err => done(err))
        });

        it('Correctly strips out link references to templates in variation text', function(done) {
            let fileContent = `# Greeting
            - CASE: foo
                - hi [bar](./1.lg#bar)
            - DEFAULT:
                - test
                
            [reference](./1.lg)`;
            parser.parse(fileContent, false)
                .then(res => {
                    assert.deepEqual(res.LGObject.LGTemplates[0].conditionalResponses[0].variations, ['hi [bar]']);
                    done ();
                })
                .catch(err => done(err))
        });
        it('Correctly strips out multiple link references to templates in variation text', function(done) {
            let fileContent = `# Greeting
            - CASE: foo
                - hi [bar](./1.lg#bar) low [bar](./1.lg#bar)
            - DEFAULT:
                - test
                
            [reference](./1.lg)`;
            parser.parse(fileContent, false)
                .then(res => {
                    assert.deepEqual(res.LGObject.LGTemplates[0].conditionalResponses[0].variations, ['hi [bar] low [bar]']);
                    done ();
                })
                .catch(err => done(err))
        });

        it('Correctly strips out link references to templates in variation text', function(done) {
            let fileContent = `# Greeting
            - hi [bar](./1.lg#bar)`;
            parser.parse(fileContent, false)
                .then(res => {
                    assert.deepEqual(res.LGObject.LGTemplates[0].variations[0], 'hi [bar]');
                    done ();
                })
                .catch(err => done(err))
        });

        it('Correctly strips out multiple link references to templates in variation text', function(done) {
            let fileContent = `# Greeting
            - hi [bar](./1.lg#bar) low [bar](./1.lg#bar)`;
            parser.parse(fileContent, false)
                .then(res => {
                    assert.deepEqual(res.LGObject.LGTemplates[0].variations[0], 'hi [bar] low [bar]');
                    done ();
                })
                .catch(err => done(err))
        });

        it('Correctly collates file content when multiple LG files are parsed', function(done) {
            let inputFolder = path.resolve('./examples');
            let outputFolder = path.resolve('./test/output');
            parser.parseCollateAndWriteOut(inputFolder, false, outputFolder, 'collate', false)
                .then(res => {
                    assert.equal(readFile.readSync('./test/verified/collate.lg'), readFile.readSync('./test/output/collate.lg'));
                    done();
                })
                .catch(err => done(err))
        });
    });
});