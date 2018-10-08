/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var chai = require('chai');
var assert = chai.assert;
var path = require('path');
const { exec } = require('child_process');
const ludown = require.resolve('../bin/ludown');
const package = require('../package.json');

const LUDOWN_ROOT = path.join(__dirname, '../');
const TRANSLATE_KEY = process.env.TRANSLATOR_KEY;

function resolvePath(relativePath) {
    return path.join(LUDOWN_ROOT, relativePath);
}

describe('The ludown cli tool', function() {

    describe('with no command', function() {
        it('should print the help contents when --help is passed as an argument', function(done) {
            exec(`node ${ludown} --help`, (error, stdout) => {
                try {
                    assert.equal(stdout.includes('-v'), true);
                    done();
                } catch(err){
                    done(err);
                }
            });
        });

        it('should print the help contents no arguments are passed', function(done) {
            exec(`node ${ludown}`, (error, stdout) => {
                try {
                    assert.equal(stdout.includes('-v'), true);
                    done();
                } catch (err) {
                    done(err);
                }
                
            });
        });

        it('should print an error when an invalid command is passed', function(done) {
            exec(`node ${ludown} k`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('Unknown command'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should print an error when an invalid command is passed to ludown parse', function(done) {
            exec(`node ${ludown} parse k`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('Unknown command'), true, stderr);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should print an error when an invalid argument is passed', function(done) {
            exec(`node ${ludown} -x`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('Unknown arguments'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should print an error when an invalid argument is passed to ludown parse command', function(done) {
            exec(`node ${ludown} parse -x`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('Unknown arguments'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should not prefix [ludown] to stdout when --prefix is not passed as an argument', function(done) {
            exec(`node ${ludown}`, (error, stdout, stderr) => {
                try {
                    assert.notEqual(stderr.startsWith(`[${package.name}]`), true);
                    done(); 
                } catch (err) {
                    done(err);
                }                
            });
        });

        it('should prefix [ludown] to stdout when --prefix is passed as an argument', function(done) {
            exec(`node ${ludown} --prefix`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.startsWith(`[${package.name}]`), true);
                    done(); 
                } catch (err) {
                    done(err);
                }                
            });
        });

        it('should prefix [ludown] to stderr when --prefix is passed as an argument', function(done) {
            exec(`node ${ludown} parse -x --prefix`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.startsWith(`[${package.name}]`), true);
                    done(); 
                } catch (err) {
                    done(err);
                }                
            });
        });
    });

    describe('with translate command', function(){
        it('should print an error when an invalid argument is passed', function(done) {
            exec(`node ${ludown} translate -x`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('Unknown arguments'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should throw an error when an incorrect folder is specified', function(done) {
            let incorrectPath = resolvePath('foo');
            exec(`node ${ludown} translate -k ${TRANSLATE_KEY} -t de -l ` + incorrectPath, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('not a folder'), true);
                    done();
                } catch (err) {
                    done(err);
                }
                
            });
            
        });
        it('should throw an error when a file is specified as input folder', function(done) {
            let incorrectPath = resolvePath('example/1.lu');
            exec(`node ${ludown} translate -k ${TRANSLATE_KEY} -t de -l ` + incorrectPath, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('not a folder'), true);
                    done();
                } catch (err) {
                    done(err);
                }
                
            });
            
        });
    
        it('should throw an error when no lu files are found in the specified folder', function(done) {
            let exampleLu = resolvePath('bin');
            exec(`node ${ludown} translate -k ${TRANSLATE_KEY} -t de -l ` + exampleLu, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('no .lu files found in the specified folder.'), true);    
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });
    
        it('should throw an error when output folder does not exist', function(done) {
            let exampleLu = resolvePath('test/test123');
            let luFile = resolvePath('examples/1.lu');
            exec(`node ${ludown} translate -k ${TRANSLATE_KEY} -t de -o ` + exampleLu + '\\testFolder --in ' + luFile, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('does not exist'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should throw an error when no input file or folder is specified', function(done) {
            let exampleLu = resolvePath('test/test123');
            exec(`node ${ludown} translate -k ${TRANSLATE_KEY} -t de -o ` + exampleLu + '\\testFolder', (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('No .lu file or folder specified'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should throws an error when no translate key is specified', function(done) {
            let luFile = resolvePath('examples/1.lu');
            exec(`node ${ludown} translate -t de --in ` + luFile, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('No translate key provided'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });
        it('should throws an error when no target language is specified', function(done) {
            let luFile = resolvePath('examples/1.lu');
            exec(`node ${ludown} translate -k ${TRANSLATE_KEY} --in ` + luFile, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('No target language provided'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should not prefix [ludown] to stdout when --prefix is not passed as an argument', function(done) {
            exec(`node ${ludown} translate`, (error, stdout, stderr) => {
                try {
                    assert.notEqual(stderr.startsWith(`[${package.name}]`), true);
                    done(); 
                } catch (err) {
                    done(err);
                }                
            });
        });
        
        it('should prefix [ludown] to stdout when --prefix is passed as an argument', function(done) {
            exec(`node ${ludown} translate --prefix`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.startsWith(`[${package.name}]`), true);
                    done(); 
                } catch (err) {
                    done(err);
                }                
            });
        });
        
        it('should prefix [ludown] to stderr when --prefix is passed as an argument', function(done) {
            exec(`node ${ludown} translate -k --prefix`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.startsWith(`[${package.name}]`), true);
                    done(); 
                } catch (err) {
                    done(err);
                }                
            });
        });
    });
    
    describe('With parse toluis command', function() {
        it('should print an error when an invalid argument is passed', function(done) {
            exec(`node ${ludown} parse toluis -x`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('Unknown arguments'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should print an error when no file or folder is passed', function(done) {
            exec(`node ${ludown} parse toluis -n test`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('No .lu file or folder specified'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should show help when root file is missing', function(done) {
            exec(`node ${ludown} parse toluis`, (error, stdout) => {
                try {
                    assert.equal(stdout.includes('Usage: ludown parse ToLuis --in <luFile>'),true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should throw an error when an incorrect folder is specified', function(done) {
            let incorrectPath = resolvePath('bin/test')
            exec(`node ${ludown} parse toluis -l ` + incorrectPath, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('not a folder'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
            
        });
        it('should throw an error when a file is specified as input folder', function(done) {
            let incorrectPath = resolvePath('examples/1.lu');
            exec(`node ${ludown} parse toluis -l ` + incorrectPath, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('not a folder'), true);
                    done();
                } catch (err) {
                    done(err);
                }
                
            });
            
        });
    
        it('should throw an error when no lu files are found in the specified folder', function(done) {
            let exampleLu = resolvePath('bin');
            exec(`node ${ludown} parse toluis -l ` + exampleLu, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('no .lu files found in the specified folder.'), true);    
                    done();
                } catch (err) {
                    done(err);
                }
                
            });
        });
    
        it('should throw an error when output folder does not exist', function(done) {
            let exampleLu = resolvePath('test/test123');
            let luFile = resolvePath('examples/1.lu');
            exec(`node ${ludown} parse toluis -o ` + exampleLu + '\\testFolder --in ' + luFile, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('does not exist'), true);
                    done();
                } catch (err) {
                    done(err);
                }
                
            });
        });

        it('should not prefix [ludown] to stdout when --prefix is not passed as an argument', function(done) {
            exec(`node ${ludown} parse toluis`, (error, stdout, stderr) => {
                try {
                    assert.notEqual(stderr.startsWith(`[${package.name}]`), true);
                    done(); 
                } catch (err) {
                    done(err);
                }                
            });
        });
        
        it('should prefix [ludown] to stdout when --prefix is passed as an argument', function(done) {
            exec(`node ${ludown} parse toluis --prefix`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.startsWith(`[${package.name}]`), true);
                    done(); 
                } catch (err) {
                    done(err);
                }                
            });
        });
        
        it('should prefix [ludown] to stderr when --prefix is passed as an argument', function(done) {
            let exampleLu = resolvePath('test/test123');
            let luFile = resolvePath('examples/1.lu');
            exec(`node ${ludown} parse toluis -o ${exampleLu}\\testFolder --in ${luFile} --prefix`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.startsWith(`[${package.name}]`), true);
                    done(); 
                } catch (err) {
                    done(err);
                }                
            });
        });
    });

    describe('With parse toqna command', function() {
        it('should print an error when an invalid argument is passed', function(done) {
            exec(`node ${ludown} parse toqna -x`, (error, stdout, stderr) => {
                try {
                    assert(stderr.includes('Unknown arguments'));
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should print an error when no lu file or folder is specified', function(done) {
            exec(`node ${ludown} parse toqna -n test`, (error, stdout, stderr) => {
                try {
                    assert(stderr.includes('No .lu file or folder specified'));
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should show help when root file is missing', function(done) {
            exec(`node ${ludown} parse toqna`, (error, stdout) => {
                try {
                    assert.equal(stdout.includes('ludown parse ToQna --in <luFile>'), true);    
                    done();
                } catch (err) {
                    done(err);
                }
                
            });
        });

        it('should throw an error when an incorrect folder is specified', function(done) {
            let incorrectPath = resolvePath('bin/test')
            exec(`node ${ludown} parse toqna -l ` + incorrectPath, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('not a folder'), true);
                    done();
                } catch (err) {
                    done(err);
                }
                
            });
            
        });
        it('should throw an error when a file is specified as input folder', function(done) {
            let incorrectPath = resolvePath('examples/1.lu');
            exec(`node ${ludown} parse toqna -l ` + incorrectPath, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('not a folder'), true);
                    done();
                } catch (err) {
                    done(err);
                }
                
            });
            
        });
    
        it('should throw an error when no lu files are found in the specified folder', function(done) {
            let exampleLu = resolvePath('bin');
            exec(`node ${ludown} parse toqna -l ` + exampleLu, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('no .lu files found in the specified folder.'), true);
                    done();
                } catch (err) {
                    done(err);
                }
                
            });
        });
    
        it('should throw an error when output folder does not exist', function(done) {
            let exampleLu = resolvePath('test/test123');
            let luFile = resolvePath('examples/1.lu');
            exec(`node ${ludown} parse toqna -o ` + exampleLu + '\\testFolder --in ' + luFile, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('does not exist'), true);
                    done();
                } catch (err) {
                    done(err);
                }
                
            });
        });

        it('should not prefix [ludown] to stdout when --prefix is not passed as an argument', function(done) {
            exec(`node ${ludown} parse toqna`, (error, stdout, stderr) => {
                try {
                    assert.notEqual(stderr.startsWith(`[${package.name}]`), true);
                    done(); 
                } catch (err) {
                    done(err);
                }                
            });
        });
        
        it('should prefix [ludown] to stdout when --prefix is passed as an argument', function(done) {
            exec(`node ${ludown} parse toqna --prefix`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.startsWith(`[${package.name}]`), true);
                    done(); 
                } catch (err) {
                    done(err);
                }                
            });
        });
        
        it('should prefix [ludown] to stderr when --prefix is passed as an argument', function(done) {
            let exampleLu = resolvePath('test/test123');
            let luFile = resolvePath('examples/1.lu');
            exec(`node ${ludown} parse toqna -o ${exampleLu}\\testFolder --in ${luFile} --prefix`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.startsWith(`[${package.name}]`), true);
                    done(); 
                } catch (err) {
                    done(err);
                }                
            });
        });
    });

    describe('With refresh command', function() {
        it('should print an error when an invalid argument is passed', function(done) {
            exec(`node ${ludown} refresh -x`, (error, stdout, stderr) => {
                try {
                    assert(stderr.includes('Unknown arguments'));
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should show help when root file is missing', function(done) {
            exec(`node ${ludown} refresh`, (error, stdout) => {
                try {
                    assert.equal(stdout.includes('Usage: ludown refresh -i <LUISJsonFile>'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });
    
        it('should show help if lu or qna maker file is not specified', function(done) {
            let exampleLu = resolvePath('test/test123');
            exec(`node ${ludown} refresh -o ` + exampleLu + '\\testFolder', (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('No LUIS input file or QnA Maker JSON'), true);
                    assert.equal(stdout.includes('ludown refresh -i <LUISJsonFile>'), true);
                    done();
                } catch (err) {
                    done(err);
                }
                
            });
        });

        it('should throw an error when output folder does not exist', function(done) {
            let exampleLu = resolvePath('test/test123');
            exec(`node ${ludown} refresh -i test/verified/1.json -o ` + exampleLu + '\\testFolder', (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('does not exist'), true);
                    done();
                } catch (err) {
                    done(err);
                }
                
            });
        });

        it('should throw an error when output folder does not exist', function(done) {
            let exampleLu = resolvePath('test/test123');
            exec(`node ${ludown} refresh -q test/verified/all-qna.json -o ` + exampleLu + '\\testFolder', (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('does not exist'), true);
                    done(); 
                } catch (err) {
                    done(err);
                }
                
            });
        });

        it('should not prefix [ludown] to stdout when --prefix is not passed as an argument', function(done) {
            exec(`node ${ludown} refresh`, (error, stdout, stderr) => {
                try {
                    assert.notEqual(stderr.startsWith(`[${package.name}]`), true);
                    done(); 
                } catch (err) {
                    done(err);
                }                
            });
        });
        
        it('should prefix [ludown] to stdout when --prefix is passed as an argument', function(done) {
            exec(`node ${ludown} refresh --prefix`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.startsWith(`[${package.name}]`), true);
                    done(); 
                } catch (err) {
                    done(err);
                }                
            });
        });
        
        it('should prefix [ludown] to stderr when --prefix is passed as an argument', function(done) {
            let exampleLu = resolvePath('test/test123');
            let luFile = resolvePath('examples/1.lu');
            exec(`node ${ludown} refresh -o ${exampleLu}\\testFolder --in ${luFile} --prefix`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.startsWith(`[${package.name}]`), true);
                    done(); 
                } catch (err) {
                    done(err);
                }                
            });
        });
    });
});
