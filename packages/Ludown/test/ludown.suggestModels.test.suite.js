/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const chai = require('chai');
const assert = chai.assert;
const parseFile = require('../lib/parseFileContents').parseFile;
const findFiles = require('../lib/helpers').findFiles;
const path = require('path');
const TEST_ROOT = path.join(__dirname);
const parserConsts = require('../lib/enums/parserconsts');
const parseAllFiles = require('../lib/parser').parseAllFiles;
const suggestModels = require('../lib/suggestModels').suggestModels;
const suggestModelArgs = require('../lib/classes/suggestModelArgs');

describe('Suggest Models in LU files', function() {
    it('correctly identifies trigger intent labels on intent definition', function(done) {
        let luFile = `# test [trigger intent]
        - test
        - test2`;
        parseFile(luFile, false, null)
            .then(res => {
                assert.equal(res.triggerIntent, 'test');
                done();
            })
            .catch(err => done(err))
    });

    it('correctly identifies trigger intent labels on intent definition', function(done) {
        let luFile = `# test [Trigger Intent]
        - test
        - test2`;
        parseFile(luFile, false, null)
            .then(res => {
                assert.equal(res.triggerIntent, 'test');
                done();
            })
            .catch(err => done(err))
    });

    it('correctly throw when multiple trigger intent labels are found', function(done) {
        let luFile = `# test [Trigger Intent]
        - test
        - test2
        
        # test 2 [trigger intent]
        - test 3
        - test 4`;
        parseFile(luFile, false, null)
            .then(res => done(`Did not throw when expected - ${res}`))
            .catch(err => done())
    });

    it ('correctly suggests models with just rootdialog', function(done) {
        let filesToParse = findFiles(`${TEST_ROOT}/testcases/suggestModels/Bot 0`, true, parserConsts.LUFILEEXTENSION);
        findFiles(`${TEST_ROOT}/testcases/suggestModels/Bot 0`, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

        parseAllFiles(filesToParse, false, null)
            .then(res => {
                suggestModels(new suggestModelArgs(res, 'rootDialog', `${TEST_ROOT}/testcases/suggestModels/Bot 0`, true, true, true, undefined, undefined, undefined, false))
                .then(res => {
                    assert.equal(res.luFiles["en-us"].length, 1);
                    assert.equal(res.luFiles["en-us"][0].DialogName, "rootDialog");
                    assert.notEqual(res.luFiles["en-us"][0].payload, undefined);
                    assert.equal(res.luisModels["en-us"][0].DialogName, "rootDialog");
                    let luisModel = res.luisModels["en-us"][0].payload;
                    assert.equal(luisModel.intents.length, 1);
                    assert.equal(luisModel.utterances.length, 10);
                    done();
                })
                .catch(err => done(err))
            })
            .catch(err => done(err));
    });

    it ('correctly suggests models based on culture provided', function(done){
        let filesToParse = findFiles(`${TEST_ROOT}/testcases/suggestModels/Bot 0`, true, parserConsts.LUFILEEXTENSION);
        findFiles(`${TEST_ROOT}/testcases/suggestModels/Bot 0`, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

        parseAllFiles(filesToParse, false, null)
            .then(res => {
                suggestModels(new suggestModelArgs(res, 'rootDialog', `${TEST_ROOT}/testcases/suggestModels/Bot 0`, true, true, true, undefined, undefined, "fr-fr", false))
                .then(res => {
                    assert.equal(res.luFiles["fr-fr"].length, 1);
                    assert.equal(res.luFiles["fr-fr"][0].DialogName, "rootDialog");
                    assert.notEqual(res.luFiles["fr-fr"][0].payload, undefined);
                    assert.equal(res.luisModels["fr-fr"][0].DialogName, "rootDialog");
                    let luisModel = res.luisModels["fr-fr"][0].payload;
                    assert.equal(luisModel.intents.length, 1);
                    assert.equal(luisModel.utterances.length, 10);
                    assert.equal(luisModel.culture, "fr-fr");
                    done();
                })
                .catch(err => done(err))
            })
            .catch(err => done(err));
    })

    it ('correctly suggests models based on culture specific files identified in root', function(done){
        let filesToParse = findFiles(`${TEST_ROOT}/testcases/suggestModels/Bot 1`, true, parserConsts.LUFILEEXTENSION);
        findFiles(`${TEST_ROOT}/testcases/suggestModels/Bot 1`, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

        parseAllFiles(filesToParse, false, null)
            .then(res => {
                suggestModels(new suggestModelArgs(res, 'rootDialog', `${TEST_ROOT}/testcases/suggestModels/Bot 1`, true, true, true, undefined, undefined, undefined, false))
                .then(res => {
                    assert.equal(res.luFiles["en-us"].length, 1);
                    assert.equal(res.luFiles["en-us"][0].DialogName, "rootDialog");
                    assert.notEqual(res.luFiles["en-us"][0].payload, undefined);
                    assert.equal(res.luisModels["en-us"][0].DialogName, "rootDialog");
                    let luisModel = res.luisModels["en-us"][0].payload;
                    assert.equal(luisModel.intents.length, 1);
                    assert.equal(luisModel.utterances.length, 10);
                    assert.equal(luisModel.culture, "en-us");
                    assert.equal(res.luFiles["it-it"].length, 1);
                    assert.equal(res.luFiles["it-it"][0].DialogName, "rootDialog");
                    assert.notEqual(res.luFiles["it-it"][0].payload, undefined);
                    assert.equal(res.luisModels["it-it"][0].DialogName, "rootDialog");
                    luisModel = res.luisModels["it-it"][0].payload;
                    assert.equal(luisModel.intents.length, 1);
                    assert.equal(luisModel.utterances.length, 10);
                    assert.equal(luisModel.culture, "it-it");
                    done();
                })
                .catch(err => done(err))
            })
            .catch(err => done(err));
    })

    it ('correctly suggests models based on root + one other scenario with only trigger intent', function(done){
        let rootFolder = `${TEST_ROOT}/testcases/suggestModels/Bot 2`;
        let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
        findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

        parseAllFiles(filesToParse, false, null)
            .then(res => {
                suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, true, true, undefined, undefined, undefined, false))
                .then(res => {
                    assert.equal(res.luFiles["en-us"].length, 1);
                    assert.equal(res.luFiles["en-us"][0].DialogName, "rootDialog");
                    assert.notEqual(res.luFiles["en-us"][0].payload, undefined);
                    assert.equal(res.luisModels["en-us"][0].DialogName, "rootDialog");
                    let luisModel = res.luisModels["en-us"][0].payload;
                    assert.equal(luisModel.intents.length, 2);
                    assert.equal(luisModel.utterances.length, 17);
                    assert.equal(luisModel.culture, "en-us");
                    assert.equal(luisModel.patterns.length, 6);
                    assert.equal(res.luFiles["it-it"].length, 1);
                    assert.equal(res.luFiles["it-it"][0].DialogName, "rootDialog");
                    assert.notEqual(res.luFiles["it-it"][0].payload, undefined);
                    assert.equal(res.luisModels["it-it"][0].DialogName, "rootDialog");
                    luisModel = res.luisModels["it-it"][0].payload;
                    assert.equal(luisModel.intents.length, 1);
                    assert.equal(luisModel.utterances.length, 10);
                    assert.equal(luisModel.culture, "it-it");
                    done();
                })
                .catch(err => done(err))
            })
            .catch(err => done(err));
    });

    it ('correctly suggests models based on root + one other scenario with only trigger intent and locale specific child models', function(done){
        let rootFolder = `${TEST_ROOT}/testcases/suggestModels/Bot 3`;
        let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
        findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

        parseAllFiles(filesToParse, false, null)
            .then(res => {
                suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, true, true, undefined, undefined, undefined, false))
                .then(res => {
                    assert.equal(res.luFiles["en-us"].length, 1);
                    assert.equal(res.luFiles["en-us"][0].DialogName, "rootDialog");
                    assert.notEqual(res.luFiles["en-us"][0].payload, undefined);
                    assert.equal(res.luisModels["en-us"][0].DialogName, "rootDialog");
                    let luisModel = res.luisModels["en-us"][0].payload;
                    assert.equal(luisModel.intents.length, 2);
                    assert.equal(luisModel.utterances.length, 16);
                    assert.equal(luisModel.culture, "en-us");
                    assert.equal(luisModel.patterns.length, 6);
                    assert.equal(res.luFiles["it-it"].length, 1);
                    assert.equal(res.luFiles["it-it"][0].DialogName, "rootDialog");
                    assert.notEqual(res.luFiles["it-it"][0].payload, undefined);
                    assert.equal(res.luisModels["it-it"][0].DialogName, "rootDialog");
                    luisModel = res.luisModels["it-it"][0].payload;
                    assert.equal(luisModel.intents.length, 2);
                    assert.equal(luisModel.utterances.length, 17);
                    assert.equal(luisModel.culture, "it-it");
                    done();
                })
                .catch(err => done(err))
            })
            .catch(err => done(err));
    });

    it ('child entity definitions are pulled over correctly into root model (prebuilt, list, regex, pattern.any)', function(done){
        let rootFolder = `${TEST_ROOT}/testcases/suggestModels/Bot 4`;
        let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
        findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

        parseAllFiles(filesToParse, false, null)
            .then(res => {
                suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, true, true, undefined, undefined, undefined, false))
                .then(res => {
                    assert.equal(res.luFiles["en-us"].length, 1);
                    assert.equal(res.luFiles["en-us"][0].DialogName, "rootDialog");
                    assert.notEqual(res.luFiles["en-us"][0].payload, undefined);
                    assert.equal(res.luisModels["en-us"][0].DialogName, "rootDialog");
                    let luisModel = res.luisModels["en-us"][0].payload;
                    assert.equal(luisModel.intents.length, 2);
                    assert.equal(luisModel.utterances.length, 16);
                    assert.equal(luisModel.culture, "en-us");
                    assert.equal(luisModel.patterns.length, 6);
                    assert.equal(luisModel.prebuiltEntities.length, 2);
                    assert.equal(luisModel.patternAnyEntities.length, 1);
                    assert.equal(luisModel.patternAnyEntities[0].name, "userName_patternAny");
                    assert.equal(res.luFiles["it-it"].length, 1);
                    assert.equal(res.luFiles["it-it"][0].DialogName, "rootDialog");
                    assert.notEqual(res.luFiles["it-it"][0].payload, undefined);
                    assert.equal(res.luisModels["it-it"][0].DialogName, "rootDialog");
                    luisModel = res.luisModels["it-it"][0].payload;
                    assert.equal(luisModel.intents.length, 2);
                    assert.equal(luisModel.utterances.length, 16);
                    assert.equal(luisModel.culture, "it-it");
                    assert.equal(luisModel.closedLists.length, 1);
                    assert.equal(luisModel.regex_entities.length, 1);
                    done();
                })
                .catch(err => done(err))
            })
            .catch(err => done(err));
    });

    it ('QnA models for single language is suggested correctly', function(done){
        let rootFolder = `${TEST_ROOT}/testcases/suggestModels/Bot 5`;
        let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
        findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

        parseAllFiles(filesToParse, false, null)
            .then(res => {
                suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, true, true, undefined, undefined, undefined, false))
                .then(res => {
                    assert.equal(res.luisModels["en-us"][0].payload.intents.length, 3);
                    assert.equal(res.luisModels["en-us"][0].payload.utterances.length, 23);
                    assert.equal(Object.keys(res.qnaModels).length, 1);
                    assert.equal(res.qnaModels["en-us"][0].qnaList.length, 1);
                    assert.equal(res.qnaAlterations["en-us"][0].wordAlterations.length, 1);
                    done();
                })
                .catch(err => done(err))
            })
            .catch(err => done(err));
    });

    it ('QnA models for mutliple language is suggested correctly', function(done){
        let rootFolder = `${TEST_ROOT}/testcases/suggestModels/Bot 6`;
        let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
        findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

        parseAllFiles(filesToParse, false, null)
            .then(res => {
                suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, true, true, undefined, undefined, undefined, false))
                .then(res => {
                    assert.equal(res.luisModels["en-us"][0].payload.intents.length, 3);
                    assert.equal(res.luisModels["en-us"][0].payload.utterances.length, 23);
                    assert.equal(Object.keys(res.qnaModels).length, 2);
                    assert.equal(res.qnaModels["en-us"][0].qnaList.length, 1);
                    assert.equal(res.qnaModels["zh-cn"][0].qnaList.length, 1);
                    assert.equal(res.qnaAlterations["en-us"][0].wordAlterations.length, 1);
                    assert.equal(res.qnaAlterations["zh-cn"][0].wordAlterations.length, 1);
                    done();
                })
                .catch(err => done(err))
            })
            .catch(err => done(err));
    });

    it ('Auto-add QnA pairs can be turned off', function(done){
        let rootFolder = `${TEST_ROOT}/testcases/suggestModels/Bot 6`;
        let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
        findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

        parseAllFiles(filesToParse, false, null)
            .then(res => {
                suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, false, true, undefined, undefined, undefined, false))
                .then(res => {
                    assert.equal(res.luisModels["en-us"][0].payload.intents.length, 2);
                    assert.equal(res.luisModels["en-us"][0].payload.utterances.length, 16);
                    assert.equal(Object.keys(res.qnaModels).length, 2);
                    assert.equal(res.qnaModels["en-us"][0].qnaList.length, 1);
                    assert.equal(res.qnaModels["en-us"][0].qnaList[0].metadata.length, 2);
                    assert.equal(res.qnaModels["zh-cn"][0].qnaList.length, 1);
                    assert.equal(res.qnaModels["zh-cn"][0].qnaList[0].metadata.length, 2);
                    assert.equal(res.qnaAlterations["en-us"][0].wordAlterations.length, 1);
                    assert.equal(res.qnaAlterations["zh-cn"][0].wordAlterations.length, 1);
                    done();
                })
                .catch(err => done(err))
            })
            .catch(err => done(err));
    });

    it ('Auto-add qna meta-data can be turned off', function(done){
        let rootFolder = `${TEST_ROOT}/testcases/suggestModels/Bot 6`;
        let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
        findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

        parseAllFiles(filesToParse, false, null)
            .then(res => {
                suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, false, false, undefined, undefined, undefined, false))
                .then(res => {
                    assert.equal(res.luisModels["en-us"][0].payload.intents.length, 2);
                    assert.equal(res.luisModels["en-us"][0].payload.utterances.length, 16);
                    assert.equal(Object.keys(res.qnaModels).length, 2);
                    assert.equal(res.qnaModels["en-us"][0].qnaList.length, 1);
                    assert.equal(res.qnaModels["en-us"][0].qnaList[0].metadata.length, 1);
                    assert.equal(res.qnaModels["zh-cn"][0].qnaList.length, 1);
                    assert.equal(res.qnaModels["zh-cn"][0].qnaList[0].metadata.length, 1);
                    assert.equal(res.qnaAlterations["en-us"][0].wordAlterations.length, 1);
                    assert.equal(res.qnaAlterations["zh-cn"][0].wordAlterations.length, 1);
                    done();
                })
                .catch(err => done(err))
            })
            .catch(err => done(err));
    });

    it ('cross feed models can be turned off', function(done) {
        let rootFolder = `${TEST_ROOT}/testcases/suggestModels/Bot 6`;
        let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
        findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

        parseAllFiles(filesToParse, false, null)
            .then(res => {
                suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, false, false, undefined, undefined, undefined, false))
                .then(res => {
                    assert.equal(res.luisModels["it-it"][0].payload.intents.length, 2);
                    assert.equal(res.luisModels["en-us"][0].payload.intents.length, 2);
                    done();
                })
                .catch(err => done(err))
            })
            .catch(err => done(err));
    });

    it ('Multi-lingual model definitions is handled correctly', function(done){
        let rootFolder = `${TEST_ROOT}/testcases/suggestModels/Bot 10`;
        let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
        findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

        parseAllFiles(filesToParse, false, null)
            .then(res => {
                suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, true, true, undefined, undefined, undefined, false))
                .then(res => {
                    assert.equal(Object.keys(res.luFiles).length, 3);
                    assert.equal(res.luFiles["en-us"].length, 2);
                    assert.equal(res.luFiles["en-us"][1].DialogName, "whoAreYou");
                    assert.equal(res.luFiles["it-it"].length, 1);
                    assert.equal(res.luFiles["fr-fr"].length, 1);
                    assert.equal(Object.keys(res.qnaFiles).length, 4);
                    assert.equal(Object.keys(res.qnaAlterationFiles).length, 4);
                    assert.equal(Object.keys(res.luisModels).length, 3);
                    assert.equal(res.luisModels["en-us"].length, 2);
                    assert.equal(res.luisModels["en-us"][1].DialogName, "whoAreYou");
                    assert.equal(res.luisModels["en-us"][0].payload.intents.length, 4);
                    assert.equal(res.luisModels["en-us"][1].payload.intents.length, 6);
                    assert.equal(res.luisModels["it-it"].length, 1);
                    assert.equal(res.luisModels["fr-fr"].length, 1);
                    assert.equal(Object.keys(res.qnaModels).length, 4);
                    assert.equal(res.qnaModels["en-us"][0].qnaList.length, 3);
                    assert.equal(res.qnaModels["fr-fr"][0].qnaList.length, 2);
                    assert.equal(res.qnaModels["zh-cn"][0].qnaList.length, 1);
                    assert.equal(Object.keys(res.qnaAlterations).length, 4);
                    done();
                })
                .catch(err => done(err))
            })
            .catch(err => done(err));
    });

    it ('simple, regex entities are pulled up correctly and roles merged', function(done){
        let rootFolder = `${TEST_ROOT}/testcases/suggestModels/Bot 7`;
        let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
        findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

        parseAllFiles(filesToParse, false, null)
            .then(res => {
                suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, true, true, undefined, undefined, undefined, false))
                .then(res => {
                    assert.equal(res.luisModels["en-us"][0].payload.entities.length, 2);
                    assert.equal(res.luisModels["en-us"][0].payload.entities[0].roles.length, 2);
                    assert.equal(res.luisModels["en-us"][0].payload.regex_entities.length, 1);
                    assert.equal(res.luisModels["en-us"][0].payload.regex_entities[0].roles.length, 2);
                    assert.equal(res.luisModels["en-us"][0].payload.prebuiltEntities.length, 2);
                    assert.equal(res.luisModels["en-us"][0].payload.prebuiltEntities[0].roles.length, 2);
                    assert.equal(res.luisModels["en-us"][0].payload.patternAnyEntities.length, 1);
                    assert.equal(res.luisModels["en-us"][0].payload.patternAnyEntities[0].roles.length, 2);
                    done();
                })
                .catch(err => done(err))
            })
            .catch(err => done(err));
    });

    it ('composite, list and phrase list entities are correctly pulled up and merged', function(done){
        let rootFolder = `${TEST_ROOT}/testcases/suggestModels/Bot 8`;
        let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
        findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

        parseAllFiles(filesToParse, false, null)
            .then(res => {
                suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, true, true, undefined, undefined, undefined, false))
                .then(res => {
                    assert.equal(res.luisModels["en-us"][0].payload.closedLists.length, 1);
                    assert.equal(res.luisModels["en-us"][0].payload.closedLists[0].subLists.length, 2);
                    assert.equal(res.luisModels["en-us"][0].payload.closedLists[0].subLists[0].list.length, 2);
                    assert.equal(res.luisModels["en-us"][0].payload.closedLists[0].roles.length, 2);
                    assert.equal(res.luisModels["en-us"][0].payload.composites[0].children.length, 2);
                    assert.equal(res.luisModels["en-us"][0].payload.composites[0].roles.length, 2);
                    assert.equal(res.luisModels["en-us"][0].payload.model_features[0].words, "2,1");
                    done();
                })
                .catch(err => done(err))
            })
            .catch(err => done(err));
    });

    describe ('Negative tests', function() {
        it ('Multiple trigger intents throws an error', function(done) {
            let rootFolder = `${TEST_ROOT}/testcases/suggestModels/NegativeTests/Bot 2`;
            let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
            findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

            parseAllFiles(filesToParse, false, null)
                .then(res => {
                    suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, true, true, undefined, undefined, undefined, false))
                        .then(res => done(res))
                        .catch(err => done());
                })
                .catch(err => done(err));
        });

        it ('Duplicate patterns throws', function(done) {
            let rootFolder = `${TEST_ROOT}/testcases/suggestModels/NegativeTests/Bot 3`;
            let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
            findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

            parseAllFiles(filesToParse, false, null)
                .then(res => {
                    suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, true, true, undefined, undefined, undefined, false))
                        .then(res => done(res))
                        .catch(err => done());
                })
                .catch(err => done(err));
        });

        it ('Trigger intent must have at least one utterance or pattern defined', function(done) {
            let rootFolder = `${TEST_ROOT}/testcases/suggestModels/NegativeTests/Bot 4`;
            let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
            findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

            parseAllFiles(filesToParse, false, null)
                .then(res => {
                    suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, true, true, undefined, undefined, undefined, false))
                        .then(res => done(res))
                        .catch(err => done());
                })
                .catch(err => done(err));
        });

        it ('Duplicate regex entity definition throws', function(done) {
            let rootFolder = `${TEST_ROOT}/testcases/suggestModels/NegativeTests/Bot 5`;
            let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
            findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

            parseAllFiles(filesToParse, false, null)
                .then(res => {
                    suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, true, true, undefined, undefined, undefined, false))
                        .then(res => done(res))
                        .catch(err => done());
                })
                .catch(err => done(err));
        });

        it ('No trigger intent in child throws', function(done) {
            let rootFolder = `${TEST_ROOT}/testcases/suggestModels/NegativeTests/Bot 6`;
            let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
            findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

            parseAllFiles(filesToParse, false, null)
                .then(res => {
                    suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, true, true, undefined, undefined, undefined, false))
                        .then(res => done(res))
                        .catch(err => done());
                })
                .catch(err => done(err));
        });

        it ('Duplicate composite entity definition throws', function(done) {
            let rootFolder = `${TEST_ROOT}/testcases/suggestModels/NegativeTests/Bot 8`;
            let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
            findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

            parseAllFiles(filesToParse, false, null)
                .then(res => {
                    suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, true, true, undefined, undefined, undefined, false))
                        .then(res => done(res))
                        .catch(err => done());
                })
                .catch(err => done(err));
        });

        it ('Invalid locale in file names throws', function(done) {
            let rootFolder = `${TEST_ROOT}/testcases/suggestModels/NegativeTests/Bot 9`;
            let filesToParse = findFiles(rootFolder, true, parserConsts.LUFILEEXTENSION);
            findFiles(rootFolder, true, parserConsts.QNAFILEEXTENSION).forEach(item => filesToParse.push(item));

            parseAllFiles(filesToParse, false, null)
                .then(res => {
                    suggestModels(new suggestModelArgs(res, 'rootDialog', rootFolder, true, true, true, undefined, undefined, undefined, false))
                        .then(res => done(res))
                        .catch(err => done());
                })
                .catch(err => done(err));
        });
    });

});