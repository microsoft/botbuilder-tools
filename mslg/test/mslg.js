/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const chai = require('chai');
const assert = chai.assert;
const path = require('path');
const {exec} = require('child_process');
const mslg = path.resolve('./lib/mslg');

describe('The mslg cli tool', function() {
    describe('with no command', function() {
        it('should print the help contents when --help is passed as an argument', function(done) {
            exec(`node ${mslg} --help`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.includes('-v'), true);
                    done();
                } catch(err){
                    done(err);
                }
            });
        });

        it('should print the help contents no arguments are passed', function(done) {
            exec(`node ${mslg}`, (error, stdout, stderr) => {
                try {
                    assert.equal(stdout.includes('-v'), true);
                    done();
                } catch (err) {
                    done(err);
                }
                
            });
        });

        it('should print an error when an invalid command is passed', function(done) {
            exec(`node ${mslg} k`, (error, stdout, stderr) => {
                try {
                    assert.equal(stderr.includes('Unknown command'), true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

    });
});