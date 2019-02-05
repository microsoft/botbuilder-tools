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
    
    it('should print the help contents when empty args', done => {
        exec(`node ${luis}`, (error, stdout) => {
            assert(stdout.includes('Available actions are:'));
            assert(stdout.includes('Configuration and Overrides:'));
            assert(stdout.includes('Global Arguments:'));
            done();
        });
    });

    it('should print all commands contents when --! is used', done => {
        exec(`node ${luis} --!`, (error, stdout) => {
            assert(stdout.includes('LUIS Command Line Interface'));
            assert(stdout.includes('application'));
            assert(stdout.includes('applications'));
            assert(stdout.includes('assistants'));
            done();
        });
    });

    it('should print help contents for an <action>', done => {
        exec(`node ${luis} list --help`, (error, stdout) => {
            assert(stdout.includes('Available resources for'));
            done();
        });
    });

    it('should print help contents for query (CLI special case)', done => {
        exec(`node ${luis} query --help`, (error, stdout) => {
            assert(stdout.includes('luis query --query <querytext>'));
            done();
        });
    });

    it('should print help contents for set (CLI special case)', done => {
        exec(`node ${luis} set --help`, (error, stdout) => {
            assert(stdout.includes('luis set <appIdOrName> [--appId|--versionId|--authoringKey|--endpoint] <value>'));
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
