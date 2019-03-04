/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const chai = require('chai');
const assert = chai.assert;
const exception = require('../lib/classes/exception');
const QnA = require('../lib/classes/qna');
const QnAList = require('../lib/classes/qnaList');
const QnAMetadata = require('../lib/classes/qnaMetaData');
const hClasses = require('../lib/classes/hclasses');

describe('Testing all classes', function() {
    describe('Exception class', function() {
        it('can create a new instance from a valid object', function() {
            let testData = {
                text: 'foo',
                errCode: 21
            };
            assert.equal(new exception(testData).text, testData.text);
        });
        it('can create a new instance from an invalid object', function() {
            let testData = {
                text1: 'foo',
                errCode1: 21
            };
            assert.equal(new exception(testData).text, '');
        });
        it('can create a new instance from explicit values passed in as args', function() {
            let testData = {
                text: 'foo',
                errCode: 21
            };
            assert.equal(new exception(21, 'foo').text, testData.text);
        });
        it('can create a new instance from an empty object', function() {
            let testData = {};
            assert.equal(new exception(testData).text, '');
        });
        it('can create a new instance from no values passed in as args', function() {
            assert.equal(new exception().text, '');
        });
    });

    describe('QnA class', function() {
        it('can create a new instance with explicit values as args', function() {
            let urls = [];
            let qnatList = {test:123};
            assert.deepEqual(new QnA(urls, qnatList).qnaList, qnatList);
        });

        it('can create a new instance with no values passed in', function() {
            assert.deepEqual(new QnA().qnaList, []);
        });
    });

    describe('QnA List class', function() {
        it('can create a new instance with explicit values as args', function() {
            assert.deepEqual(new QnAList(0, 'test', '1', ['2'], {}), {id: 0, answer: 'test', source: '1', questions: ['2'], metadata: {}});
        });

        it('can create a new instance with no values passed in', function() {
            assert.equal(new QnAList().id, 0);
        });
    });

    describe('QnA Metadata class', function() {
        it('can create a new instance with explicit values as args', function() {
            assert.deepEqual(new QnAMetadata('1', '2'), {name: '1', value: '2'});
        });

        it('can create a new instance with no values passed in', function() {
            assert.equal(new QnAMetadata().name, '');
        });
    });

    describe('readerObj class', function(){
        it('can create a new instance with explicit values as args', function() {
            assert.deepEqual(new hClasses.readerObject('1', '2'), {sourceFile: '1', model: '2'});
        });

        it('can create a new instance with no values passed in', function() {
            assert.equal(new hClasses.readerObject().sourceFile, '');
        });
    });

    describe('entity class', function() {
        it('can create a new instance with mix of values passed in', function() {
            assert.equal(new hClasses.entity(null, '123', null, null).value, '123');
        });
    });

    describe('intent class', function(){
        it('can create a new instance with explicit values as args', function() {
            assert.deepEqual(new hClasses.intent('1', '2'), {intent: '1', utterances: '2'});
        });

        it('can create a new instance with no values passed in', function() {
            assert.equal(new hClasses.intent().intent, '');
        });
    });

    describe('uttereances class', function() {
        it('can create a new instance with no values passed in', function() {
            assert.equal(new hClasses.uttereances().text, '');
        });
    });

    describe('validateLUISBlobEntity class', function() {
        it('can create a new instance with no values passed in', function() {
            assert.equal(new hClasses.validateLUISBlobEntity().name, '');
        });
    });

    describe('pattern class', function() {
        it('can create a new instance with no values passed in', function() {
            assert.equal(new hClasses.pattern().pattern, '');
        });
        it('can create a new instance with explicit values as args', function() {
            assert.deepEqual(new hClasses.pattern('1', '2'), {pattern: '1', intent: '2'});
        });
    });

    describe('subList class', function() {
        it('can create a new instance with no values passed in', function() {
            assert.equal(new hClasses.subList().canonicalForm, '');
        });
        it('can create a new instance with explicit values as args', function() {
            assert.deepEqual(new hClasses.subList('1', '2'), {canonicalForm: '1', list: '2'});
        });
    });

    describe('closedLists class', function() {
        it('can create a new instance with no values passed in', function() {
            assert.equal(new hClasses.closedLists().name , '');
        });
        it('can create a new instance with explicit values as args', function() {
            assert.deepEqual(new hClasses.closedLists('1', '2', '3'), {name: '1', subLists: '2', roles: '3'});
        });
    });

    describe('modelObj class', function() {
        it('can create a new instance with no values passed in', function() {
            assert.equal(new hClasses.modelObj().name, '');
        });
    });

    describe('regex entity class', function() {
        it('can create a new instance with no values passed in', function() {
            assert.equal(new hClasses.regExEntity().name, '');
        });
    });
});