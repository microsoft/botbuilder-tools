/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var chai = require('chai');
var assert = chai.assert;
const fs = require('fs');
var path = require('path');
const { exec } = require('child_process');
const txtfile = require('read-text-file');
const mslg = require.resolve('../bin/mslg');
const MSLG_ROOT = path.join(__dirname, '../');
const TRANSLATE_KEY = undefined;

function resolvePath(relativePath) {
    return path.join(MSLG_ROOT, relativePath);
}

function compareFiles(actualPath, expectedPath) {
    let expected = fs.existsSync(actualPath) ? txtfile.readSync(actualPath) : actualPath;
    let actual = fs.existsSync(expectedPath) ? txtfile.readSync(expectedPath) : expectedPath;
    assert.deepEqual(actual.split(/\r?\n/), expected.split(/\r?\n/));
}

describe('The mslg cli tool', function () {

    describe('should throw errors', function () {
        it('should print the help contents when no command is passed', function (done) {
            exec(`node ${mslg}`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.includes('MSLG is a command line tool to parse, collate, expand and translate lg files.'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should print the help contents when --help is passed as an argument', function (done) {
            exec(`node ${mslg} --help`, (error, stdout) => {
                try {
                    assert.equal(stdout.includes('-v, --Version  output the version number'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should print an error when an invalid command is passed', function (done) {
            exec(`node ${mslg} k`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('Unknown command: k'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should print an error when an invalid command is passed to mslg parse', function (done) {
            exec(`node ${mslg} parse k`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('Unknown command: k'), true, stderr);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should print an error when an invalid argument is passed', function (done) {
            exec(`node ${mslg} -x`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('Unknown arguments'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should print an error when an invalid argument is passed to ludown parse command', function (done) {
            exec(`node ${mslg} parse -x`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('Unknown arguments'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should print an error if --collate is not specified and multiple templates of same name exist in different files', function (done) {
            let filePath = resolvePath('examples/validExamples');
            exec(`node ${mslg} parse -l ${filePath}`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('[ERROR]: below template names are defined in multiple files'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        })
    });

    describe('should output correctly', function () {
        it('should collate templates successfully', function (done) {
            let filePath = resolvePath('examples/validExamples');
            exec(`node ${mslg} parse -l ${filePath} --out finalResult -c`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.includes('Collated lg file is generated here'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should collate templates from subfolder successfully', function (done) {
            let filePath = resolvePath('examples/validExamples');
            exec(`node ${mslg} parse -l ${filePath} -s -c --stdout`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.includes('# Byebye'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should write collated lg file to specific folder', function (done) {
            let filePath = resolvePath('examples/validExamples/simple.lg');
            exec(`node ${mslg} parse --in ${filePath} --out finalResult -o examples/validExamples/subValidExamples`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.includes('Collated lg file is generated here'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should print verbose messages when requesting verbose output', function (done) {
            let filePath = resolvePath('examples/validExamples/simple.lg');
            exec(`node ${mslg} parse --in ${filePath} --verbose --stdout`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.includes(`Parsing file: ${filePath}`), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should expand specific template successfully', function (done) {
            let filePath = resolvePath('examples/validExamples/simple.lg');
            exec(`node ${mslg} expand --in ${filePath} -t FinalGreeting`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.includes('# FinalGreeting'), true);
                    assert.equal(stdout.includes('- Hi Morning'), true);
                    assert.equal(stdout.includes('- Hi Evening'), true);
                    assert.equal(stdout.includes('- Hello Morning'), true);
                    assert.equal(stdout.includes('- Hello Evening'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should expand all templates successfully', function (done) {
            let filePath = resolvePath('examples/validExamples/simple.lg');
            exec(`node ${mslg} expand --in ${filePath} --all`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.includes('# FinalGreeting'), true);
                    assert.equal(stdout.includes('# Greeting'), true);
                    assert.equal(stdout.includes('# TimeOfDay'), true);
                    assert.equal(stdout.includes('- Hi'), true);
                    assert.equal(stdout.includes('- Hello'), true);
                    assert.equal(stdout.includes('- Morning'), true);
                    assert.equal(stdout.includes('- Evening'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should expand inline expression successfully', function (done) {
            exec(`node ${mslg} expand --inline '{1+1}'`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.includes('2'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should expand a template with scope and variables successfully', function (done) {
            let filePath = resolvePath('examples/validExamples/simpleWithVariables.lg');
            let variables = resolvePath('examples/validExamples/variables.json')
            exec(`node ${mslg} expand --in ${filePath} -t TimeOfDayWithCondition -j ${variables}`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.includes('# TimeOfDayWithCondition'), true);
                    assert.equal(stdout.includes('- Hi Morning'), true);
                    assert.equal(stdout.includes('- Hey Morning'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should translate a specific lg file', function (done) {
            if (!TRANSLATE_KEY) {
                this.skip();
            }

            let filePath = resolvePath('examples/validExamples/translator.lg');
            exec(`node ${mslg} translate -k ${TRANSLATE_KEY} -t zh-Hans --in ${filePath} -o ${MSLG_ROOT}/test -c --verbose`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.includes('Parsing file: '), true);
                    compareFiles(MSLG_ROOT + 'test/zh-Hans/translator.lg', MSLG_ROOT + 'test/expected/zh-Hans/translator.lg');
                    done();
                } catch (err) {
                    done(err);
                }
            });
        })

        it('should translate all files from a specific folder', function (done) {
            if (!TRANSLATE_KEY) {
                this.skip();
            }

            let filePath = resolvePath('examples/validExamples');
            exec(`node ${mslg} translate -k ${TRANSLATE_KEY} -t zh-Hans -l ${filePath} -s -o ${MSLG_ROOT}/test -c --verbose`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.includes('Parsing file: '), true);
                    compareFiles(MSLG_ROOT + 'test/zh-Hans/subSimple.lg', MSLG_ROOT + 'test/expected/zh-Hans/subSimple.lg');
                    compareFiles(MSLG_ROOT + 'test/zh-Hans/simple.lg', MSLG_ROOT + 'test/expected/zh-Hans/simple.lg');
                    compareFiles(MSLG_ROOT + 'test/zh-Hans/simple2.lg', MSLG_ROOT + 'test/expected/zh-Hans/simple2.lg');
                    compareFiles(MSLG_ROOT + 'test/zh-Hans/simpleWithVariables.lg', MSLG_ROOT + 'test/expected/zh-Hans/simpleWithVariables.lg');
                    compareFiles(MSLG_ROOT + 'test/zh-Hans/translator.lg', MSLG_ROOT + 'test/expected/zh-Hans/translator.lg');
                    done();
                } catch (err) {
                    done(err);
                }
            });
        })
    });
});
