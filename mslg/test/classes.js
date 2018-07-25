const LGTemplate = require('../lib/classes/LGTemplate');
const LGParsedObj = require('../lib/classes/LGParsedObj');
const LGObject = require('../lib/classes/LGObject');
const LGConditionalResponse = require('../lib/classes/LGConditionalResponse');
var chai = require('chai');
var assert = chai.assert;
const LUIS = require('ludown').helperClasses.LUIS;
describe('Testing classes in MSLG module', function() {
    describe('LGTemplate class', function() {
        it('can be instantiated correctly with no parameters passed to constructor', function(done){
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

        it('Throws when both variations and conditional responses specified', function(done){
            try {
                let LGT = new LGTemplate('test', ['fooo'], [{condition: 'bar', variations: ['fooo']}]);
                done('Test fail! Did not throw when expected');
            } catch (err) {
                done ();
            }
        });

        it('can be instantiated correctly with just the name specified', function(done){
            try {
                let LGT = new LGTemplate('test');
                assert.equal(LGT.name, 'test');
                done();
            } catch (err) {
                done (err);
            }
        });

        it('Throw when a variation or conditional response is specified without a name', function(done){
            try {
                let LGT = new LGTemplate(null, ['test']);
                done('test fail! did not throw when expected');
            } catch (err) {
                done ();
            }
        });

        it('can be instantiated correctly with the name and variations specified', function(done){
            try {
                let LGT = new LGTemplate('test', ['test']);
                assert.equal(LGT.name, 'test');
                assert.equal(LGT.variations[0], 'test');
                done();
            } catch (err) {
                done (err);
            }
        });

        
        it('can be instantiated correctly with the name and conditional responses specified', function(done){
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

    describe('LGParserObj class', function() {
        it('can be instantiated correctly with no arguments passed', function(done) {
            try {
                let pObj = new LGParsedObj();
                assert.deepEqual(pObj.LUISObj, new LUIS());
                assert.equal(pObj.LGObject, undefined);
                assert.ok(pObj.additionalFilesToParse.length === 0);
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    describe('LGObject class', function() {
        it('can be instantiated correctly with no arguments passed', function(done) {
            try {
                let pObj = new LGObject();
                assert.equal(pObj.LGTemplates[0].name, undefined);
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    describe('LGConditionalResponse class', function() {
        it('can be instantiated correctly with no arguments passed', function(done) {
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
});