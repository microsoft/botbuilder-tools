/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/*eslint no-console: ["error", { allow: ["log"] }] */
var chai = require('chai');
var assert = chai.assert;
var path = require('path');
const { exec } = require('child_process');
const ludown = require.resolve('../bin/ludown');
const txtfile = require('read-text-file');
const fs = require('fs');
const NEWLINE = require('os').EOL;
const TEST_ROOT = path.join(__dirname);
const PATH_TO_OUTPUT_FOLDER = path.resolve(TEST_ROOT + '/output');

function compareFiles(actualPath, expectedPath) {
    let expected = txtfile.readSync(actualPath).split(/\r?\n/);
    let actual = txtfile.readSync(expectedPath).split(/\r?\n/);
    assert.deepEqual(actual, expected);
}

function sanitizeExampleJson(fileContent) {
    let escapedExampleNewLine = JSON.stringify('\r\n').replace(/"/g, '').replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    let escapedNewLine = JSON.stringify(NEWLINE).replace(/"/g, '');
    return fileContent.replace(new RegExp(escapedExampleNewLine, 'g'), escapedNewLine);
}

describe('The example lu files', function() {
    before(function () {
        try {
            if (!fs.existsSync(PATH_TO_OUTPUT_FOLDER)) {
                fs.mkdirSync(PATH_TO_OUTPUT_FOLDER);
            }
        } catch (err) {
            console.log('Unable to create test\\output folder. The tests will fail');
        }
    });

    it('refresh command successfully reconstructs a markdown file from a QnA input file with qnaDocuments section', function(done) {
        exec(`node ${ludown} refresh -q ${TEST_ROOT}/testcases/qnaDocuments.json -o ${TEST_ROOT}/output -n qnaDocuments`, () => {
            try {
                done();
            } catch(err) {
                done(err);
            }
        });
    });

    it('refresh command successfully reconstructs a markdown file from a LUIS input file with out of order entity references', function(done) {
        exec(`node ${ludown} refresh -i ${TEST_ROOT}/testcases/test269-d.json -o ${TEST_ROOT}/output -n test269-d2`, () => {
            try {
                done();
            } catch(err) {
                done(err);
            }
        });
    });

    it('refresh command successfully reconstructs a markdown file from a LUIS input file with out of order entity references', function(done) {
        exec(`node ${ludown} refresh -i ${TEST_ROOT}/testcases/test269-d.json -o ${TEST_ROOT}/output --skip_header -n test269-d`, () => {
            try {
                compareFiles(TEST_ROOT + '/output/test269-d.lu', TEST_ROOT + '/verified/test269-d.lu');
                done();
            } catch(err) {
                done(err);
            }
        });
    });

    it('refresh command successfully reconstructs a markdown file from a LUIS input file', function(done) {
        exec(`node ${ludown} refresh -i ${TEST_ROOT}/verified/all.json -o ${TEST_ROOT}/output --skip_header -n allGen`, () => {
            try {
                compareFiles(TEST_ROOT + '/output/allGen.lu', TEST_ROOT + '/verified/allRefresh.lu');
                done();
            } catch(err) {
                done(err);
            }
        });
    });

    it('refresh command successfully reconstructs a markdown file from QnA input file', function(done) {
        exec(`node ${ludown} refresh -q ${TEST_ROOT}/verified/all-qna.json -o ${TEST_ROOT}/output --skip_header -n allGenQnA`, () => {
            try {
                compareFiles(TEST_ROOT + '/output/allGenQnA.lu', TEST_ROOT + '/verified/allGenQnA.lu');
                done();
            } catch (err) {
                done(err);
            }
            
        });
    })

    it('refresh command successfully writes out a markdown file from QnA and luis input files', function(done) {
        exec(`node ${ludown} refresh -q ${TEST_ROOT}/verified/all-qna.json -i ${TEST_ROOT}/verified/all.json -o ${TEST_ROOT}/output --skip_header --verbose`, (error, stdout) => {
            try {
                compareFiles(TEST_ROOT + '/output/allall-qna.lu', TEST_ROOT + '/verified/allall-qna.lu');
                assert.ok(stdout.includes('Successfully wrote to '));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    })

    it('Simple intent and utterances are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/../examples/1.lu -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/1.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/output/1.json')));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('Multiple intent and utterance definition sections are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/../examples/3.lu -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/3.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/output/3.json')));
                done();
            } catch(err) {
                done(err);
            }
            
        });
    });

    it('Uttearnces with labelled values are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/../examples/4.lu -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/4.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/output/4.json')));
                done();
            } catch (err){
                done(err);
            }
            
        });
    });

    it('Simple entity declaration is parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/../examples/5.lu -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/5.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/output/5.json')));
                done();
            } catch (err) {
                done(err);
            }
             
        });
    });

    it('Prebuilt entity types are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/../examples/6.lu -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/6.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/output/6.json')));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('Pattern.any entity types are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/../examples/7.lu -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/7.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/output/7.json')));
                done();    
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('List entity types are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/../examples/9.lu -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/9.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/output/9.json')));
                done(); 
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('List entity definitions and intent definitions can be split up and will be parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/../examples/9a.lu -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/9a.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/output/9a.json')));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('with single file references are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/../examples/buyChocolate.lu -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/buyChocolate.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/output/buyChocolate.json')));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('with multiple file references are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/../examples/11.lu -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/11.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/output/11.json')));
                done(); 
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('with mix of LUIS and QnA content is parsed correctly [LUIS]', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/../examples/12.lu -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/12.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/output/12.json')));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('with mix of LUIS and QnA content is parsed correctly [QnA]', function(done) {
        exec(`node ${ludown} parse toqna --in ${TEST_ROOT}/../examples/12.lu -o ${TEST_ROOT}/output -n 12qna`, () => {
            try {
                assert.deepEqual(JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/verified/12qna.json'))), JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/output/12qna.json'))));    
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('all concepts of lu file definition is parsed correctly [LUIS]', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/../examples/all.lu -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/all.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/output/all.json')));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('all concepts of lu file definition is parsed correctly  [QnA]', function(done) {
        exec(`node ${ludown} parse toqna --in ${TEST_ROOT}/../examples/all.lu -o ${TEST_ROOT}/output -n all-qna`, () => {
            try {
                assert.deepEqual(JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/verified/all-qna.json'))), JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/output/all-qna.json'))));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('all entity types are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/testcases/all-entity-types.lu -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/all-entity-types.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/output/all-entity-types.json')));    
                done();
            } catch (err) {
                done(err);
            }
            
        });
    }); 

    it('writes out a warning when no utterances are found for an intent', function(done){
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/testcases/missing-utterance.lu -o ${TEST_ROOT}/output --verbose`, (error, stdout) => {
            try {
                assert.ok(stdout.includes('[WARN] No utterances found for intent: # Greeting'));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('writes out an error when invalid entity definition is found', function(done){
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/testcases/missing-utterance.lu -o ${TEST_ROOT}/output --verbose`, (error, stdout, stderr) => {
            try {
                assert.ok(stderr.includes('Invalid entity definition'));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('writes out a warning when no synonym definitions are found for a list entity', function(done){
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/testcases/missing-synonyms.lu -o ${TEST_ROOT}/output --verbose`, (error, stdout) => {
            try {
                assert.ok(stdout.includes('[WARN] No synonyms list found'));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('Successfully spits out qnamaker alterations list when specified in .lu files', function(done){
        exec(`node ${ludown} parse toqna -a --in ${TEST_ROOT}/../examples/qna-alterations.lu -o ${TEST_ROOT}/output --verbose`, (error, stdout) => {
            try {
                assert.ok(stdout.includes('Successfully wrote QnA Alterations JSON file'));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('Throws when an invalid QnA Maker alteration is specified in the input .lu file', function(done){
        exec(`node ${ludown} parse toqna -a --in ${TEST_ROOT}/testcases/invalid-alterations.lu -o ${TEST_ROOT}/output --verbose`, (error, stdout, stderr) => {
            try {
                assert.ok(stderr.includes('[ERROR]: QnA alteration list value'));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('Collate can correctly merge LUIS content split across LU files', function(done){
        exec(`node ${ludown} parse toluis -l ${TEST_ROOT}/testcases/collate -n collated-luis -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/output/collated-luis.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/collated-luis.json')));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('Collate can correctly merge LUIS content split across LU files to generate batch test input', function(done){
        exec(`node ${ludown} parse toluis -l ${TEST_ROOT}/testcases/collate -n collated-luis -o ${TEST_ROOT}/output -t`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/output/collated-luis_LUISBatchTest.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/collated-luis_LUISBatchTest.json')));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('Collate can correctly merge QnA content split across LU files', function(done){
        exec(`node ${ludown} parse toqna -l ${TEST_ROOT}/testcases/collate -n collate-qna -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/output/collate-qna.json'))), JSON.parse(sanitizeExampleJson(txtfile.readSync(TEST_ROOT + '/verified/collate-qna.json'))));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('Collate can correctly merge QnA word alteration content split across LU files', function(done){
        exec(`node ${ludown} parse toqna -l ${TEST_ROOT}/testcases/collate -n alterations -o ${TEST_ROOT}/output -a`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/output/alterations_Alterations.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/collate_Alterations.json')));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('Refresh command can successfully generate content from LUIS, QnA and QnA Alterations', function (done) {
        exec(`node ${ludown} refresh -i ${TEST_ROOT}/verified/collated-luis.json -q ${TEST_ROOT}/verified/collate-qna.json -a ${TEST_ROOT}/verified/collate_Alterations.json -n collate_refresh -o ${TEST_ROOT}/output --skip_header`, () => {
            try {
                compareFiles(TEST_ROOT + '/verified/collate_refresh.lu', TEST_ROOT + '/output/collate_refresh.lu');
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('Deep references in lu files - intent references are handled correctly', function (done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/testcases/ref1.lu --out ref1.json -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/output/ref1.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/ref1.json')));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('Deep references in lu files - QnA question references are handled correctly', function (done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/testcases/ref4.lu --out ref4.json -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/output/ref4.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/ref4.json')));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('Deep references in lu files - QnA question references when a wildcard is specified is handled correctly', function (done) {
        exec(`node ${ludown} parse toluis --in ${TEST_ROOT}/testcases/ref5.lu --out ref5.json -o ${TEST_ROOT}/output`, () => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync(TEST_ROOT + '/output/ref5.json')), JSON.parse(txtfile.readSync(TEST_ROOT + '/verified/ref5.json')));
                done();
            } catch (err) {
                done(err);
            }
        });
    });


    it('Nested entity references in LUIS JSON models are skipped correctly', function (done) {
        exec(`node ${ludown} refresh -i ${TEST_ROOT}/testcases/nested-luis-json.json -o ${TEST_ROOT}/output`, (error, stdout, stderr) => {
            try {
                assert.ok(stdout.includes('has nested entity references. This utterance will be skipped.'));
                done();
            } catch (err) {
                done(err);
            }
        });
    });
});