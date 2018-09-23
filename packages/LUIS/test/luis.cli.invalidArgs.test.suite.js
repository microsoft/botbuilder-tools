const assert = require('assert');
const { exec } = require('child_process');
const luis = require.resolve('../bin/luis');

describe('When the arguments are invalid, the LUIS cli', () => {

    describe('should print the correct error and display the help contents', () => {

        it('when the action does not exist', done =>{
            exec(`node ${luis} --authoringKey dummy-key --region westus apps nonexistant`, (error, stdout) => {
                assert.equal(stdout, '');
                assert(error.message.includes('\'apps\' is not a valid action'));
                assert(error.message.includes('Available actions are'));
                done();
            });
        });

        it('when the resource does not exist', done =>{
            exec(`node ${luis} --authoringKey dummy-key --region westus add`, (error, stdout) => {
                assert.equal(stdout, '');
                assert(error.message.includes('resource is missing'));
                assert(error.message.includes('Available resources for '));
                done();
            });
        });

        it('when the resource is unknown', done =>{
            exec(`node ${luis} --authoringKey dummy-key --region westus add sample`, (error, stdout) => {
                assert.equal(stdout, '');
                assert(error.message.includes('\'sample\' is not a valid resource'));
                assert(error.message.includes('Available resources for '));
                done();
            });
        });
    });
});
