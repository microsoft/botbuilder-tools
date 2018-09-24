const path = require('path');
const assert = require('assert');
const {exec} = require('child_process');
const mslg = path.resolve('../bin/mslg');

describe('The MSLG CLI', () => {
    describe('Invalid Operations', function() {

        it('Should fail when operation not found', function(done) {
            exec(`node ${mslg} foo`, (error, stdout, stderr) => {
                assert.equal(stdout, '');
                assert(stderr.includes('The operation does not exist'));
                done();
            });
        });

        it('Should fail when target not found', function(done) {
            exec(`node ${mslg} create --in TestData/definitions/modelDefinition.json`, (error, stdout, stderr) => {
                assert.equal(stdout, '');
                assert(stderr.includes('The operation does not exist'));
                done();
            });
        });

        it('should fail when operation does not accept an input', function(done) {
            exec(`node ${mslg} get models --in foo.json`, (error, stdout, stderr) => {
                assert.equal(stdout, '');
                assert(stderr.includes('The getModels operation does not accept an input'));
                done();
            });
        });
    
        it('should fail when update operation does not --in arg', function(done) {
            exec(`node ${mslg} update model`, (error, stdout, stderr) => {
                assert.equal(stdout, '');
                assert(stderr.includes('The updateModel requires an input of type: ModelUpdate'));
                done();
            });
        });

        it('should fail when operation recieve file that does not exist', function(done) {
            exec(`node ${mslg} create model --lgFolder TestData/examples/LGAB --in model.json`, (error, stdout, stderr) => {
                assert.equal(stdout, '');
                assert(stderr.includes('model.json is not a valid file path or file does not exist'));
                done();
            });
        });

        it('should fail when operation recieve a folder that does not exist', function(done) {
            exec(`node ${mslg} create model --lgFolder TstData/examples/LGAB --in model.json`, (error, stdout, stderr) => {
                assert.equal(stdout, '');
                assert(stderr.includes('Sorry, TstData/examples/LGAB is not a folder or does not exist'));
                done();
            });
        });
    });
    
    describe('Using "set" Operation', () => {

        it('should print the help contents when --help is used', function(done) {
            exec(`node ${mslg} set --help`, (error, stdout) => {
                assert(stdout.includes('mslg set <.lgrcSetting> <value>'), stdout);
                assert(stdout.includes('Available resources for'), stdout);
                assert(stdout.includes('set'), stdout);
                done();
            });
        });

        it('should update the authoring key', function(done) {
            exec(`node ${mslg} set --authoringKey somekey`, (error, stdout, stderr) => {
                let result = JSON.parse(stdout);
                assert.equal(result.authoringKey, 'somekey', 'Key not found');
                done();
            });
        });

        it('should fail when invalid args passed', function(done) {
            exec(`node ${mslg} set --randomArgument random`, (error, stdout, stderr) => {
                assert.equal(stdout, '');
                assert(stderr.includes('missing .lgrc argument name: [--authoringKey|--endpointKey|--endpointBasePath|--lgAppId|--lgAppName|--lgAppLocale|--lgAppDomain|--lgAppVersion]'));
                done();
            });
        });
    });
});