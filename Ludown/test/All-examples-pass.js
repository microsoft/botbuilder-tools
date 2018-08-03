/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var chai = require('chai');
var assert = chai.assert;
var path = require('path');
const {exec} = require('child_process');
const ludown = path.resolve('./bin/ludown');
const txtfile = require('read-text-file');
const pathToOutputFolder = path.resolve('./test/output');
const fs = require('fs');
describe('The example lu files', function() {
    before(function(){
        try {
            if(!fs.existsSync(pathToOutputFolder)) {
                fs.mkdirSync(pathToOutputFolder);
            }
        } catch (err) {
            console.log('Unable to create test\\output folder. The tests will fail');
        }
      });
    
    it('refresh command successfully reconstructs a markdown file from a QnA input file with qnaDocuments section', function(done) {
        exec(`node ${ludown} refresh -q test/testcases/qnaDocuments.json -o test/output -n qnaDocuments`, (error, stdout, stderr) => {
            try {
                done();
            } catch(err) {
                done(err);
            }
        });
    });

    it('refresh command successfully reconstructs a markdown file from a LUIS input file with out of order entity references', function(done) {
        exec(`node ${ludown} refresh -i test/testcases/test269-d.json -o test/output -n test269-d2`, (error, stdout, stderr) => {
            try {
                done();
            } catch(err) {
                done(err);
            }
        });
    });

    it('refresh command successfully reconstructs a markdown file from a LUIS input file with out of order entity references', function(done) {
        exec(`node ${ludown} refresh -i test/testcases/test269-d.json -o test/output --skip_header -n test269-d`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/test269-d.lu'), txtfile.readSync('./test/output/test269-d.lu'));    
                done();
            } catch(err) {
                done(err);
            }
        });
    });

    

    
    it('refresh command successfully reconstructs a markdown file from a LUIS input file', function(done) {
        exec(`node ${ludown} refresh -i test/verified/all.json -o test/output --skip_header -n allGen`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/allRefresh.lu'), txtfile.readSync('./test/output/allGen.lu'));    
                done();
            } catch(err) {
                done(err);
            }
        });
    });

    

    it('refresh command successfully reconstructs a markdown file from QnA input file', function(done) {
        exec(`node ${ludown} refresh -q test/verified/all-qna.json -o test/output --skip_header -n allGenQnA`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/allGenQnA.lu'), txtfile.readSync('./test/output/allGenQnA.lu'));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    })

    it('refresh command successfully writes out a markdown file from QnA and luis input files', function(done) {
        exec(`node ${ludown} refresh -q test/verified/all-qna.json -i test/verified/all.json -o test/output --skip_header --verbose`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/allall-qna.lu'), txtfile.readSync('./test/output/allall-qna.lu'));
                assert.ok(stdout.includes('Successfully wrote to '));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    })

    it('Simple intent and utterances are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/1.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('./test/verified/1.json')), JSON.parse(txtfile.readSync('./test/output/1.json')));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    

    it('Multiple intent and utterance definition sections are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/3.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('./test/verified/3.json')), JSON.parse(txtfile.readSync('./test/output/3.json')));
                done();
            } catch(err) {
                done(err);
            }
            
        });
    });

    it('Uttearnces with labelled values are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/4.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('./test/verified/4.json')), JSON.parse(txtfile.readSync('./test/output/4.json')));
                done();
            } catch (err){
                done(err);
            }
            
        });
    });

    it('Simple entity declaration is parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/5.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('./test/verified/5.json')), JSON.parse(txtfile.readSync('./test/output/5.json')));
                done();
            } catch (err) {
                done(err);
            }
             
        });
    });

    it('Prebuilt entity types are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/6.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('./test/verified/6.json')), JSON.parse(txtfile.readSync('./test/output/6.json')));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('Pattern.any entity types are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/7.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('./test/verified/7.json')), JSON.parse(txtfile.readSync('./test/output/7.json')));
                done();    
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('List entity types are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/9.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('./test/verified/9.json')), JSON.parse(txtfile.readSync('./test/output/9.json')));
                done(); 
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('List entity definitions and intent definitions can be split up and will be parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/9a.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('./test/verified/9a.json')), JSON.parse(txtfile.readSync('./test/output/9a.json')));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('with single file references are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/buyChocolate.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('./test/verified/buyChocolate.json')), JSON.parse(txtfile.readSync('./test/output/buyChocolate.json')));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('with multiple file references are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/11.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('./test/verified/11.json')), JSON.parse(txtfile.readSync('./test/output/11.json')));
                done(); 
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('with mix of LUIS and QnA content is parsed correctly [LUIS]', function(done) {
        exec(`node ${ludown} parse toluis --in examples/12.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('./test/verified/12.json')), JSON.parse(txtfile.readSync('./test/output/12.json')));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('with mix of LUIS and QnA content is parsed correctly [QnA]', function(done) {
        exec(`node ${ludown} parse toqna --in examples/12.lu -o test/output -n 12qna`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('./test/verified/12qna.json')), JSON.parse(txtfile.readSync('./test/output/12qna.json')));    
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('all concepts of lu file definition is parsed correctly [LUIS]', function(done) {
        exec(`node ${ludown} parse toluis --in examples/all.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('./test/verified/all.json')), JSON.parse(txtfile.readSync('./test/output/all.json')));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('all concepts of lu file definition is parsed correctly  [QnA]', function(done) {
        exec(`node ${ludown} parse toqna --in examples/all.lu -o test/output -n all-qna`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('./test/verified/all-qna.json')), JSON.parse(txtfile.readSync('./test/output/all-qna.json')));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('all entity types are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in test/testcases/all-entity-types.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('./test/verified/all-entity-types.json')), JSON.parse(txtfile.readSync('./test/output/all-entity-types.json')));    
                done();
            } catch (err) {
                done(err);
            }
            
        });
    }); 

    it('writes out a warning when no utterances are found for an intent', function(done){
        exec(`node ${ludown} parse toluis --in test/testcases/missing-utterance.lu -o test/output --verbose`, (error, stdout, stderr) => {
            try {
                assert.ok(stdout.includes('[WARN] No utterances found for intent: # Greeting'));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('writes out an error when invalid entity definition is found', function(done){
        exec(`node ${ludown} parse toluis --in test/testcases/missing-utterance.lu -o test/output --verbose`, (error, stdout, stderr) => {
            try {
                assert.ok(stderr.includes('Invalid entity definition'));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('writes out a warning when no synonym definitions are found for a list entity', function(done){
        exec(`node ${ludown} parse toluis --in test/testcases/missing-synonyms.lu -o test/output --verbose`, (error, stdout, stderr) => {
            try {
                assert.ok(stdout.includes('[WARN] No synonyms list found'));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    
    it('Successfully spits out qnamaker alterations list when specified in .lu files', function(done){
        exec(`node ${ludown} parse toqna -a --in examples/qna-alterations.lu -o test/output --verbose`, (error, stdout, stderr) => {
            try {
                assert.ok(stdout.includes('Successfully wrote QnA Alterations JSON file'));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('Throws when an invalid QnA Maker alteration is specified in the input .lu file', function(done){
        exec(`node ${ludown} parse toqna -a --in test/testcases/invalid-alterations.lu -o test/output --verbose`, (error, stdout, stderr) => {
            try {
                assert.ok(stderr.includes('[ERROR]: QnA alteration list value'));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('Collate can correctly merge LUIS content split across LU files', function(done){
        exec(`node ${ludown} parse toluis -l test/testcases/collate -n collated-luis -o test/output`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('test/output/collated-luis.json')), JSON.parse(txtfile.readSync('test/verified/collated-luis.json')));
                done();
            } catch (err) {
                done(err);
            }
        });
    });
    
    it('Collate can correctly merge LUIS content split across LU files to generate batch test input', function(done){
        exec(`node ${ludown} parse toluis -l test/testcases/collate -n collated-luis -o test/output -t`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('test/output/collated-luis_LUISBatchTest.json')), JSON.parse(txtfile.readSync('test/verified/collated-luis_LUISBatchTest.json')));
                done();
            } catch (err) {
                done(err);
            }
        });
    });
    
    it('Collate can correctly merge QnA content split across LU files', function(done){
        exec(`node ${ludown} parse toqna -l test/testcases/collate -n collate-qna -o test/output`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('test/output/collate-qna.json')), JSON.parse(txtfile.readSync('test/verified/collate-qna.json')));
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('Collate can correctly merge QnA word alteration content split across LU files', function(done){
        exec(`node ${ludown} parse toqna -l test/testcases/collate -n alterations -o test/output -a`, (error, stdout, stderr) => {
            try {
                assert.deepEqual(JSON.parse(txtfile.readSync('test/output/alterations_Alterations.json')), JSON.parse(txtfile.readSync('test/verified/collate_Alterations.json')));
                done();
            } catch (err) {
                done(err);
            }
        });
    });
    

   it('Refresh command can successfully generate content from LUIS, QnA and QnA Alterations', function(done){
    exec(`node ${ludown} refresh -i test/verified/collated-luis.json -q test/verified/collate-qna.json -a test/verified/collate_Alterations.json -n collate_refresh -o test/output --skip_header`, (error, stdout, stderr) => {
        try {
            assert.equal(txtfile.readSync('test/output/collate_refresh.lu'), txtfile.readSync('test/verified/collate_refresh.lu'));
            done();
        } catch (err) {
            done(err);
        }
    });
});
});