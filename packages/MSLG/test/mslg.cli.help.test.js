const path = require('path');
const assert = require('assert');
const {exec} = require('child_process');
const mslg = path.resolve('../bin/mslg');

describe('The MSLG CLI --help -h argument', () => {

    it('should print the help contents when no args', done => {
        exec(`node ${mslg}`, (error, stdout) => {
            assert(stdout.includes('Available actions are:'));
            assert(stdout.includes('Configuration and Overrides:'));
            assert(stdout.includes('Global Arguments:'));
            done();
        });
    });

    it('should print the help contents when --help is used', done => {
        exec(`node ${mslg} --help`, (error, stdout) => {
            assert(stdout.includes('Available actions are:'));
            assert(stdout.includes('Configuration and Overrides:'));
            assert(stdout.includes('Global Arguments:'));
            done();
        });
    });

    it('should print help contents for an <action>', done => {
        exec(`node ${mslg} create --help`, (error, stdout) => {
            assert(stdout.includes('create'), stdout);
            assert(stdout.includes('Available resources for'));
            assert(stdout.includes('endpoint'));
            assert(stdout.includes('model'));
            done();
        });
    });

    it('should print the help contents when --help is used', function(done) {
        exec(`node ${mslg} get --help`, (error, stdout) => {
            assert(stdout.includes('get'), stdout);
            done();
        });
    });

});