const assert = require('assert');
const { exec } = require('child_process');
const qnamaker = require.resolve('../bin/qnamaker');

describe('The QnA Maker cli --help -h argument', () => {

    it('should print the help contents when no args', done => {
        exec(`node ${qnamaker}`, (error, stdout) => {
            assert(stdout.includes('Available actions are:'));
            assert(stdout.includes('Configuration and Overrides:'));
            assert(stdout.includes('Global Arguments:'));
            done();
        });
    });

    it('should print the help contents when --help is used', done => {
        exec(`node ${qnamaker} --help`, (error, stdout) => {
            assert(stdout.includes('Available actions are:'));
            assert(stdout.includes('Configuration and Overrides:'));
            assert(stdout.includes('Global Arguments:'));
            done();
        });
    });

    it('should print help contents for an <action>', done => {
        exec(`node ${qnamaker} list --help`, (error, stdout) => {
            assert(stdout.includes('Available resources for'));
            assert(stdout.includes('kbs'));
            done();
        });
    });

    it('should print help contents for a <resource>', done => {
        exec(`node ${qnamaker} list kbs -h`, (error, stdout) => {
            assert(stdout.includes('List all of your knowledgebases'));
            done();
        });
    });

    it('should provide suggestions when the action does not exist', done => {
        exec(`node ${qnamaker} sample -h`, (error, stdout) => {
            assert(stdout.includes('Available actions are:'));
            done();
        });
    });

    it('should provide suggestions when the resource does not exist', done => {
        exec(`node ${qnamaker} list samples -h`, (error, stdout) => {
            assert(stdout.includes('Available resources for'));
            done();
        });
    });
});
