/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const chai = require('chai');
const assert = chai.assert;
const parser = require('../lib/parser');
const retCode = require('../lib/enums/errorCodes');
const EntityTypes = require('../lib/enums/LGEntityType');
const LGTemplate = require('../lib/classes/LGTemplate');
const LGParsedObj = require('../lib/classes/LGParsedObj');
const LGObject = require('../lib/classes/LGObject');
const LGConditionalResponse = require('../lib/classes/LGConditionalResponse');
const LGEntity = require('../lib/classes/LGEntity');
describe('The parser', function() {
            
    describe('For true negatives on variation text', function() {

        it('Throws when a variation has empty or null value', function(done) {
            let fileContent = `# Greeting
            - `;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {
                    console.log(JSON.stringify(err, null, 2));
                    assert.equal(err.errCode, retCode.INVALID_VARIATION);done();})
        });
    
        it('Throws when a variation has reference to an reserved word as entity name', function(done) {
            let fileContent = `# Greeting
            - test {Floor} `;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.ENTITY_WITH_RESERVED_KEYWORD); done();})
        });

        it('Throws when a variation has at least one reference to an reserved word as entity name', function(done) {
            let fileContent = `# Greeting
            - test {userName} {Floor} `;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.ENTITY_WITH_RESERVED_KEYWORD); done();})
        });
    
        it('Throws when a variation has reference to nested templates', function(done) {
            let fileContent = `# Greeting
            - test [foo[bar]]`;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.NESTED_TEMPLATE_REFERENCE); done();})
        });
    
        it('Throws when a variation has reference to nested entity', function(done) {
            let fileContent = `# Greeting
            - test {foo{bar}}`;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.NESTED_ENTITY_REFERENCE); done();})
        });

        it('Throws when call back function is not enclosed in {}', function(done) {
            let fileContent = `# Greeting
            - fooBar(userName)`;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.INVALID_CALLBACK_FUNTION_DEF); done();})
        });

        it('Throws when call back function is not enclosed in {} with text in variation', function(done) {
            let fileContent = `# Greeting
            - hi fooBar(userName)`;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.INVALID_CALLBACK_FUNTION_DEF); done();})
        });

        it('Throws when a variation has an unrecognized call back function name', function(done) {
            let fileContent = `# Greeting
            - {fooBar(userName)}`;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.INVALID_CALLBACK_FUNTION_NAME); done();})
        });
        
        it('Throws when a variation has at least one invalid reference to a call back function and other valid text in it', function(done) {
            let fileContent = `# Greeting
            - hi you were born on {Month(birthDate)}, {fooBar(userName)}`;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {assert.equal(err.errCode, retCode.INVALID_CALLBACK_FUNTION_NAME); done();})
        });

        it('Throws on invalid entity definition', function(done){
            let fileContent = `$userName string
            $datetime : dateTime`;
            parser.parse(fileContent, false)
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {
                    assert.equal(err.errCode, retCode.INVALID_ENTITY_DEFINITION);
                    done(); 
                })
        });


    }); 
    
    describe('For true negatives on condition names for conditional responses ', function(){
        it('Throws when a condition is empty', function(done) {
            let fileContent = `# Greeting
            - CASE:
                - hi`;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {
                    assert.equal(err.errCode, retCode.INVALID_CONDITION);
                    done();
                })
        });
        it('Throws when a condition has reference to invalid call back function', function(done) {
            let fileContent = `# Greeting
            - CASE: foo(a, b, c)
                - hi`;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {
                    assert.equal(err.errCode, retCode.INVALID_CALLBACK_FUNTION_NAME);
                    done();
                })
        });
        it('Throws when a condition has an entity reference that is also a call back function', function(done) {
            let fileContent = `# Greeting
            - CASE: {Floor} = true
                - hi`;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {
                    assert.equal(err.errCode, retCode.INVALID_ENTITY_DEFINITION);
                    done();
                })
        });
        it('Throws when a defalt condition has an expression', function(done) {
            let fileContent = `# Greeting
            - DEFAULT: foo
                - hi`;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {
                    assert.equal(err.errCode, retCode.DEFAULT_CONDITION_MUST_BE_EMPTY);
                    done();
                })
        });
        it('Throws when a defalt condition has an expression', function(done) {
            let fileContent = `# Greeting
            - CASE: {a} = true
                - yo
            - DEFAULT: foo
                - hi`;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {
                    assert.equal(err.errCode, retCode.DEFAULT_CONDITION_MUST_BE_EMPTY);
                    done();
                })
        });
        it('Throws when a condition has invalid number of braces', function(done) {
            let fileContent = `# Greeting
            - CASE: (({d} = true)
                - hi`;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {
                    assert.equal(err.errCode, retCode.INVALID_CONDITION_DEFINITION);
                    done();
                })
        });
        it('Throws when a condition has invalid number of curley braces', function(done) {
            let fileContent = `# Greeting
            - CASE: ({d = true)
                - hi`;
            parser.parse(fileContent, false)
                .then(res => done ('test fail! did not throw when expected'))
                .catch(err => {
                    assert.equal(err.errCode, retCode.INVALID_CONDITION_DEFINITION);
                    done();
                })
        });
    });

    describe('For true negatives on template names', function() {
        it('Throws when no template name is specified', function(done) {
            let fileContent = `# 
            - hi`;
            parser.parse(fileContent, false)
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {
                    assert.equal(err.errCode, retCode.INVALID_TEMPLATE);
                    done();
                })
        });

        it('Throws when template name has spaces in it', function(done) {
            let fileContent = `# Greeting template
            - hi`;
            parser.parse(fileContent, false)
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {
                    assert.equal(err.errCode, retCode.INVALID_SPACE_IN_TEMPLATE_NAME);
                    done();
                })
        });
        it('Throws when template name has disallowed characters in it', function(done) {
            let fileContent = `# Greetingtemplate!
            - hi`;
            parser.parse(fileContent, false)
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {
                    assert.equal(err.errCode, retCode.INVALID_TEMPLATE_NAME);
                    done();
                })
        });

        it('Throws when template has neither variation or conditional response defined', function(done) {
            let fileContent = `# Greetingtemplate
            - CASE: a = b

            # fooBar`;
            parser.parse(fileContent, false)
                .then(res => done('Test fail! did not throw when expected'))
                .catch(err => {
                    assert.equal(err.errCode, retCode.INVALID_INPUT);
                    done();
                })
        });
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

        it('Correctly parses entity definitions in LG files', function(done){
            let fileContent = `$userName: string`;
            parser.parse(fileContent, false)
                .then(res => {
                    assert.equal(res.LGObject.entities[0].name, 'userName');
                    assert.equal(res.LGObject.entities[0].entityType, EntityTypes.String.name);
                    done();
                })
                .catch(err => done(err))
        });

        it('Correctly parses multiple entity definitions in LG files', function(done){
            let fileContent = `$userName: string
            $datetime : dateTime`;
            parser.parse(fileContent, false)
                .then(res => {
                    assert.equal(res.LGObject.entities.length, 2);
                    assert.equal(res.LGObject.entities[1].entityType, EntityTypes.DateTime.name);
                    done();
                })
                .catch(err => done(err))
        });

        it('Correctly falls back to String type on invalid entity type declaration', function(done){
            let fileContent = `$userName : foobar
            $datetime : dateTime`;
            parser.parse(fileContent, false)
                .then(res => {
                    assert.equal(res.LGObject.entities[0].entityType, EntityTypes.String.name)
                    assert.equal(res.LGObject.entities[1].entityType, EntityTypes.DateTime.name)
                    done();
                })
                .catch(err => done(err))
        });

        it('Correctly collates entities across multiple files', async function(){
            let f1 = `# Greeting
            - hi {userName}`;
            let f2 = `$dateOfBirth : datetime`;
            let f1p, f2p, c;
            try {
                f1p = await parser.parse(f1, false);
                f2p = await parser.parse(f2, false);
                c = await parser.collate([f1p.LGObject, f2p.LGObject]);
                assert.equal(c.entities.length, 2);
                assert.equal(c.entities[1].name, 'dateOfBirth');
            } catch (err) {
                throw(err);
            }
            
        });

        it('Throws when conflicting entity definitions are found when collating', async function(){
            let f1 = `# Greeting
            - hi {userName}
            $userName : Int`;
            let f2 = `$userName : datetime`;
            let f1p, f2p, c;
            try {
                f1p = await parser.parse(f1, false);
                f2p = await parser.parse(f2, false);
                c = await parser.collate([f1p.LGObject, f2p.LGObject]);
                throw ('Test fail! did not throw when expected');
            } catch (err) {
                if(!err.errCode) throw (err);
                assert.equal(err.errCode, retCode.DUPLICATE_INCOMPATIBE_ENTITY_DEF);
            }
            
        });

        it('Correctly parses entity definitions with attribution in LG files', function(done){
            let fileContent = `$address: string say-as = Address`;
            parser.parse(fileContent, false)
                .then(res => {
                    assert.equal(res.LGObject.entities[0].name, 'address');
                    assert.equal(res.LGObject.entities[0].entityType, EntityTypes.String.name);
                    assert.equal(res.LGObject.entities[0].attributions.length, 1);
                    assert.deepEqual(res.LGObject.entities[0].attributions[0], {'key': 'say-as', 'value': 'Address'});
                    done();
                })
                .catch(err => done(err))
        });

        it('Correctly throws when invalid template references are found in LG files', async function() {
            let fileContent = `# wPhrase
            - hi [welcome-user]`;
            let parsedContent = await parser.parse(fileContent, false);
            parser.collate([parsedContent.LGObject])
                .then(res => {throw(res);})
                .catch(err => {
                    assert.equal(err.errCode, retCode.MISSING_TEMPLATE_REFERENCE);
                })
        });

        it('Correctly throws when a variation references to the containing template by name', async function() {
            let fileContent = `# wPhrase
            - hi [wPhrase]`;
            let parsedContent = await parser.parse(fileContent, false);
            parser.collate([parsedContent.LGObject])
                .then(res => {throw(res);})
                .catch(err => {
                    assert.equal(err.errCode, retCode.INVALID_SELF_TEMPLATE_REFERENCE);
                })
        });

    
    });
    
    describe('[x] LGTemplate class', function() {
        it('[x] can be instantiated correctly with no parameters passed to constructor', function(done){
            let LGT = new LGTemplate();
            try {
                assert.deepEqual(LGT, {
                    'name': undefined,
                    'variations': [],
                    'conditionalResponses':[] 
                });
                done();
            } catch (err) {
                done (err);
            }
        });

        it('[x] Throws when both variations and conditional responses specified', function(done){
            try {
                let LGT = new LGTemplate('test', ['fooo'], [{condition: 'bar', variations: ['fooo']}]);
                done('Test fail! Did not throw when expected');
            } catch (err) {
                done ();
            }
        });

        it('[x] can be instantiated correctly with just the name specified', function(done){
            try {
                let LGT = new LGTemplate('test');
                assert.equal(LGT.name, 'test');
                done();
            } catch (err) {
                done (err);
            }
        });

        it('[x] Throw when a variation or conditional response is specified without a name', function(done){
            try {
                let LGT = new LGTemplate(null, ['test']);
                done('test fail! did not throw when expected');
            } catch (err) {
                done ();
            }
        });

        it('[x] can be instantiated correctly with the name and variations specified', function(done){
            try {
                let LGT = new LGTemplate('test', ['test']);
                assert.equal(LGT.name, 'test');
                assert.equal(LGT.variations[0], 'test');
                done();
            } catch (err) {
                done (err);
            }
        });

        
        it('[x] can be instantiated correctly with the name and conditional responses specified', function(done){
            try {
                let LGT = new LGTemplate('test', null, [{condition: 'test', variations: ['test']}]);
                assert.equal(LGT.name, 'test');
                assert.equal(LGT.conditionalResponses[0].condition, 'test');
                assert.equal(LGT.conditionalResponses[0].variations[0], 'test');
                done();
            } catch (err) {
                done (err);
            }
        });
    });

    describe('[x] LGParserObj class', function() {
        it('[x] can be instantiated correctly with no arguments passed', function(done) {
            try {
                let pObj = new LGParsedObj();
                assert.equal(pObj.LGObject, undefined);
                assert.ok(pObj.additionalFilesToParse.length === 0);
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    describe('[x]LGObject class', function() {
        it('[x] can be instantiated correctly with no arguments passed', function(done) {
            try {
                let pObj = new LGObject();
                assert.equal(pObj.LGTemplates.length, 0);
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    describe('[x] LGConditionalResponse class', function() {
        it('[x] can be instantiated correctly with no arguments passed', function(done) {
            try {
                let pObj = new LGConditionalResponse();
                assert.equal(pObj.condition, '');
                assert.ok(pObj.variations.length === 0)
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    describe('[x] LGEntity class', function() {
        
        it('[x] can be instantiated correctly with no arguments passed', function(done) {
            try {
                let pObj = new LGEntity();
                assert.equal(pObj.name, undefined);
                assert.ok(pObj.entityType === 'String')
                done();
            } catch (err) {
                done(err);
            }
        });

        it('[x] can be instantiated correctly with a name and defaults to string type', function(done) {
            try {
                let pObj = new LGEntity('entity1');
                assert.equal(pObj.name, 'entity1');
                assert.ok(pObj.entityType === 'String')
                done();
            } catch (err) {
                done(err);
            }
        });

        it('[x] can be instantiated correctly with a name and type correctly', function(done) {
            try {
                let pObj = new LGEntity('entity1', 'string');
                assert.equal(pObj.name, 'entity1');
                assert.ok(pObj.entityType === 'String')
                done();
            } catch (err) {
                done(err);
            }
        });

        it('[x] can be instantiated correctly with a name an invalid type passed', function(done) {
            try {
                let pObj = new LGEntity('entity1', 'date time');
                assert.equal(pObj.name, 'entity1');
                assert.ok(pObj.entityType === 'String')
                done();
            } catch (err) {
                done(err);
            }
        });
    });
});