const assert = require('assert');
const { exec } = require('child_process');
const luis = require.resolve('../bin/luis');

describe('The LUIS cli tool', () => {

    describe('should perform the correct action and display the contents', () => {

        it('when using the "luis" arg', done =>{
            exec(`node ${luis} luis list apps`, (error, stdout, stderr) => {
                assert.equal(stdout, '');
                assert(stderr.includes('luis list apps --skip <integer> --take <integer>'));
                done();
            });
        });
        
        describe('with query command', () => {
            it('and no question', done =>{
                exec(`node ${luis} --authoringKey dummy-key --region westeurope query`, (error, stdout, stderr) => {
                    assert.equal(stdout, '');
                    assert(stderr.includes('missing -q'));
                    done();
                });
            });

            it('and no appid', done =>{
                exec(`node ${luis} --authoringKey dummy-key --region westeurope query --q "message to send"`, (error, stdout, stderr) => {
                    assert.equal(stdout, '');
                    assert(stderr.includes('missing --appid'));
                    done();
                });
            });

            it('and all other args', done =>{
                exec(`node ${luis} --authoringKey dummy-key --region westeurope query --q "message to send" --appId dummy-app`, (error, stdout, stderr) => {
                    assert.equal(stdout, '');
                    assert(stderr.includes('401'), stderr);
                    done();
                });
            });
        });
        
    });
});
