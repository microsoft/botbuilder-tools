/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var chai = require('chai');
var assert = chai.assert;
var path = require('path');
const {exec} = require('child_process');
const ludown = path.resolve('./bin/ludown.js');
const txtfile = require('read-text-file');
describe('The example lu files', function() {

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

    it('Simple intent and utterances are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/1.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/1.json'), txtfile.readSync('./test/output/1.json'));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('Multiple intent and utterance definition sections are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/3.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/3.json'), txtfile.readSync('./test/output/3.json'));
                done();
            } catch(err) {
                done(err);
            }
            
        });
    });

    it('Uttearnces with labelled values are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/4.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/4.json'), txtfile.readSync('./test/output/4.json'));
                done();
            } catch (err){
                done(err);
            }
            
        });
    });

    it('Simple entity declaration is parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/5.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/5.json'), txtfile.readSync('./test/output/5.json'));
                done();
            } catch (err) {
                done(err);
            }
             
        });
    });

    it('Prebuilt entity types are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/6.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/6.json'), txtfile.readSync('./test/output/6.json'));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('Pattern.any entity types are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/7.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/7.json'), txtfile.readSync('./test/output/7.json'));
                done();    
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('List entity types are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/9.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/9.json'), txtfile.readSync('./test/output/9.json'));
                done(); 
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('List entity definitions and intent definitions can be split up and will be parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/9a.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/9a.json'), txtfile.readSync('./test/output/9a.json'));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('with single file references are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/buyChocolate.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/buyChocolate.json'), txtfile.readSync('./test/output/buyChocolate.json'));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('with multiple file references are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in examples/11.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/11.json'), txtfile.readSync('./test/output/11.json'));
                done(); 
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('with mix of LUIS and QnA content is parsed correctly [LUIS]', function(done) {
        exec(`node ${ludown} parse toluis --in examples/12.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/12.json'), txtfile.readSync('./test/output/12.json'));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('with mix of LUIS and QnA content is parsed correctly [QnA]', function(done) {
        exec(`node ${ludown} parse toqna --in examples/12.lu -o test/output -n 12qna`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/12qna.json'), txtfile.readSync('./test/output/12qna.json'));    
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('all concepts of lu file definition is parsed correctly [LUIS]', function(done) {
        exec(`node ${ludown} parse toluis --in examples/all.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/all.json'), txtfile.readSync('./test/output/all.json'));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('all concepts of lu file definition is parsed correctly  [QnA]', function(done) {
        exec(`node ${ludown} parse toqna --in examples/all.lu -o test/output -n all-qna`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/all-qna.json'), txtfile.readSync('./test/output/all-qna.json'));
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('all entity types are parsed correctly', function(done) {
        exec(`node ${ludown} parse toluis --in test/testcases/all-entity-types.lu -o test/output`, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/all-entity-types.json'), txtfile.readSync('./test/output/all-entity-types.json'));    
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });
    
});