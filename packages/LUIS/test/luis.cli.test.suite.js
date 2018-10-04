const assert = require('assert');
const { exec } = require('child_process');
const luis = require.resolve('../bin/luis');
const pkg = require('../package.json');

describe('The LUIS cli tool', () => {

    describe('should perform the correct action and display the contents', () => {

        it('when using the "luis" arg', done =>{
            exec(`node ${luis} luis list apps`, (error, stdout, stderr) => {
                assert.equal(stdout, '');
                assert(stderr.includes('luis list apps --skip <integer> --take <integer>'));
                done();
            });
        });
        
        it('should not prefix [luis-apis] to stdout when --prefix is not passed as an argument', done => {
            exec(`echo bot=LuliBot=joe | node ${luis} --prefix`, (error, stdout, stderr) => {
                assert.notEqual(stdout.startsWith(`[${pkg.name}]`), `It should not show the tag '[${pkg.name}]' when not using the argument --prefix`);
                done();
            });
        });
        
        it('should prefix [luis-apis] to stdout when --prefix is passed as an argument', done => {
            exec(`node ${luis} --version --prefix`, (error, stdout, stderr) => {
                assert(stdout.startsWith(`[${pkg.name}]`), `It should show the tag '[${pkg.name}]' when using the argument --prefix`);
                done();
            });
        });
    
        it('should prefix [luis-apis] to stderr when --prefix is passed as an argument', done => {
            exec(`echo bot=LuliBot=joe | node ${luis} --prefix`, (error, stdout, stderr) => {
                assert(stderr.startsWith(`[${pkg.name}]`), `It should show the tag '[${pkg.name}]' when using the argument --prefix`);
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
