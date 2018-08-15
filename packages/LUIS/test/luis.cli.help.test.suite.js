const assert = require('assert');
const { exec } = require('child_process');
const luis = require.resolve('../bin/luis');

describe('The LUIS cli --help -h argument', () => {

    it('should print the help contents when --help is used', done => {
        exec(`node ${luis} --help`, (error, stdout) => {
            assert(stdout.includes('Available actions are:'));
            assert(stdout.includes('Configuration and Overrides:'));
            assert(stdout.includes('Global Arguments:'));
            done();
        });
    });

    it('should print help contents for an <action>', done => {
        exec(`node ${luis} list --help`, (error, stdout) => {
            assert(stdout.includes('Available resources for'));
            done();
        });
    });

    it('should print help contents for a <resource>', done => {
        exec(`node ${luis} list apps -h`, (error, stdout) => {
            assert(stdout.includes('Lists all of the user applications.'));
            assert(stdout.includes('luis list apps --skip <integer> --take <integer>'));
            done();
        });
    });

    it('should provide suggestions when the action does not exist', done => {
        exec(`node ${luis} show apps -h`, (error, stdout) => {
            assert(stdout.includes('Available actions are:'));
            done();
        });
    });

    it('should provide suggestions when the resource does not exist', done => {
        exec(`node ${luis} list samples -h`, (error, stdout) => {
            assert(stdout.includes('Available resources for'));
            done();
        });
    });
});
