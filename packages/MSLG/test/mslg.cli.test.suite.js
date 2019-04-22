/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var chai = require('chai');
var assert = chai.assert;
const fs = require('fs');
var path = require('path');
const { exec } = require('child_process');
const mslg = require.resolve('../bin/mslg');

const MSLG_ROOT = path.join(__dirname, '../');

function resolvePath(relativePath) {
    return path.join(MSLG_ROOT, relativePath);
}

describe('The mslg cli tool', function () {

    describe('should throw errors', function () {
        it('should print the help contents when no command is passed', function (done) {
            exec(`node ${mslg}`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.includes('MSLG is a command tool to take .lg files as input to parse lg files or collate and expand lg templates.'), true);
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
                    assert.equal(stderr.includes('Sorry, no .lg files are provided.'), true, stderr);
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

        it('should print an error when parsing invalid lg file', function (done) {
            let filePath = resolvePath('examples/exceptionExamples/EmptyTemplate.lg');
            exec(`node ${mslg} parse --in ${filePath}`, (error, stdout, stderr) => {
                try {

                    assert.equal(stderr.includes('[ERROR]: There is no template body in template template'), true);
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
            exec(`node ${mslg} parse -l ${filePath} -s --out finalResult -c`, (error, stdout, stderr) => {
                try {
                    fs.unlinkSync(resolvePath('finalResult_mslg.lg'));
                    assert.equal(stdout.includes('Collated successfully here'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should expand template successfully', function (done) {
            let filePath = resolvePath('examples/validExamples/simple.lg');
            exec(`node ${mslg} expand --in ${filePath} -t FinalGreeting`, (error, stdout, stderr) => {
                try {
                    fs.unlinkSync(resolvePath('simple_expanded.lg'));
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
    });
});
