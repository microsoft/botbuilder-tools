const assert = require('assert');
const { exec, spawn } = require('child_process');
const qnamaker = require.resolve('../bin/qnamaker');
const createKbNoName = require.resolve('../examples/CreateKbNoNameDTO.json');
const createKb = require.resolve('../examples/CreateKbDTO.json');
const updateKbOperation = require.resolve('../examples/UpdateKbOperationDTO.json');
const pkg = require('../package.json');

const subscriptionKey = process.env.QNA_SUBSCRIPTION_KEY;

describe('The QnA Maker cli bin', () => {
    it('should fail when operation not found', function(done) {
        exec(`node ${qnamaker} foo`, (error, stdout, stderr) => {
            assert.equal(stdout, '');
            assert(stderr.includes('The operation does not exist'));
            done();
        });
    });

    it('should fail when operation does not accept an input', function(done) {
        exec(`node ${qnamaker} list kbs --in foo.json`, (error, stdout, stderr) => {
            assert.equal(stdout, '');
            assert(stderr.includes('The getKnowledgebasesForUser operation does not accept an input'));
            done();
        });
    });

    it('should fail when operation does not receive all args', function(done) {
        exec(`node ${qnamaker} query`, (error, stdout, stderr) => {
            assert.equal(stdout, '');
            assert(stderr.includes('The --question argument is missing and required'));
            done();
        });
    });

    it('should not prefix [qna] to stdout when --prefix is not passed as an argument', done => {
        exec(`node ${qnamaker} -h`, (error, stdout) => {
            assert.notEqual(stdout.startsWith(`[${pkg.name}]`), `It should not show the tag '[${pkg.name}]' when not using the argument --prefix`);
            done();
        });
    });

    it('should prefix [qna] to stdout when --prefix is passed as an argument', done => {
        exec(`node ${qnamaker} -h --prefix`, (error, stdout) => {
            assert(stdout.startsWith(`[${pkg.name}]`), `It should show the tag '[${pkg.name}]' when using the argument --prefix`);
            done();
        });
    });

    it('should prefix [qna] to stderr when --prefix is passed as an argument', done => {
        exec(`node ${qnamaker} foo --prefix`, (error, stdout, stderr) => {
            assert(stderr.startsWith(`[${pkg.name}]`), `It should show the tag '[${pkg.name}]' when using the argument --prefix`);
            done();
        });
    });

    describe('using "set" operation', () => {
        it('should print the help contents when --help is used', function(done) {
            exec(`node ${qnamaker} set --help`, (error, stdout) => {
                assert(stdout.includes('qnamaker set <.qnamakerrcSetting> <value>'), stdout);
                assert(stdout.includes('Available resources for'), stdout);
                assert(stdout.includes('set'), stdout);
                done();
            });
        });

        it('should print the help contents when kbid not found', function(done) {
            if (!subscriptionKey) this.skip('subscriptionKey not found');
            exec(`node ${qnamaker} --subscriptionKey ${subscriptionKey} set kbid dummy-key`, (error, stdout, stderr) => {
                assert.equal(stdout, '');
                assert(stderr.includes('Did not find an application with id or name'), stderr);
                done();
            });
        });

        it('should update the key', function(done) {
            if (!subscriptionKey) this.skip('subscriptionKey not found');
            exec(`node ${qnamaker} --subscriptionKey ${subscriptionKey} set`, (error, stdout, stderr) => {
                let result = JSON.parse(stdout);
                assert.equal(result.subscriptionKey, subscriptionKey, 'Key not found');
                done();
            });
        });

    });

    describe('using "create" operation', () => {
        it('should print the help contents when --help is used', function(done) {
            exec(`node ${qnamaker} create --help`, (error, stdout) => {
                assert(stdout.includes('create'), stdout);
                done();
            });
        });

        it('should print the help contents when kb --help is used', function(done) {
            exec(`node ${qnamaker} create kb --help`, (error, stdout) => {
                assert(stdout.includes('Create a new knowledgebase'), stdout);
                assert(stdout.includes('qnamaker create kb --in createKbPayload.json --name <kbname> [--wait]'), stdout);
                done();
            });
        });

        it('should fail and print the help contents when kb is used without other args', function(done) {
            exec(`node ${qnamaker} --subscriptionKey dummy-key create kb `, (error, stdout) => {
                assert.equal(stdout, '');
                assert(error.message.includes('The createKnowledgebase requires an input of type: CreateKbDTO'), error.message);
                done();
            });
        });

        it('should create the kb when kb is used with all arguments', function(done) {
            if (!subscriptionKey) this.skip('subscriptionKey not found');
            exec(`node ${qnamaker} --subscriptionKey ${subscriptionKey} create kb --in ${createKb}`, (error, stdout) => {
                let result = JSON.parse(stdout);
                assert.equal(result.operationState, 'NotStarted');
                assert(Date.parse(result.createdTimestamp), `${result.createdTimestamp} not a date`);
                assert(Date.parse(result.lastActionTimestamp), `${result.lastActionTimestamp} not a date`);
                assert(result.userId, 'result.userId does not exist');
                assert(result.operationId, 'result.operationId does not exist');
                done();
            });
        });

        it('should create the kb when --msbot is used', function(done) {
            if (!subscriptionKey) this.skip('subscriptionKey not found');
            exec(`node ${qnamaker} --subscriptionKey ${subscriptionKey} create kb --in ${createKb} --msbot`, (error, stdout, stderr) => {
                if (stdout) {
                    assert(stderr.includes('Succeeded'));
                } else {
                    assert(stderr.includes('Failed'));
                }
                done();
            });
        });

        it.skip('should create the kb with full ask', async function(done) {
            if (!subscriptionKey) this.skip('subscriptionKey not found');
            const qnamakerProcess = spawn('node', [ qnamaker, '--subscriptionKey', subscriptionKey, 'create', 'kb', '--in', createKbNoName], {stdio: ['pipe', 'pipe', process.stderr]});
            let messageCount = 0;
            let result = await new Promise(resolve => {
                qnamakerProcess.stdout.on('data', data => {
                    messageCount++;
                    const message = data.toString();
                    switch (messageCount) {
                    case 1:
                        assert.equal(message, 'What would you like to name your new knowledgebase? ');
                        qnamakerProcess.stdin.write('sample-kb\r');
                        break;
                    case 2:
                        resolve(message);
                        break;
                    default:
                        done('More messages than expected');
                        break;
                    }
                });
            });

            let operation = JSON.parse(result);
            assert.equal(operation.operationState, 'NotStarted');
            assert(Date.parse(operation.createdTimestamp), `${operation.createdTimestamp} not a date`);
            assert(Date.parse(operation.lastActionTimestamp), `${operation.lastActionTimestamp} not a date`);
            assert(operation.userId, 'result.userId does not exist');
            assert(operation.operationId, 'result.operationId does not exist');
            done();
        });

    });

    describe('using "list" operation', () => {
        it('should list the knowledge bases when kbs is used', function(done) {
            if (!subscriptionKey) this.skip('subscriptionKey not found');
            exec(`node ${qnamaker} --subscriptionKey ${subscriptionKey} list kbs`, (error, stdout) => {
                assert.notEqual(JSON.parse(stdout), null);
                done();
            });
        });

    });

    describe('using "get" operation', () => {
        it('should print an error when --kbId not found', function(done) {
            if (!subscriptionKey) this.skip('subscriptionKey not found');
            exec(`node ${qnamaker} --subscriptionKey ${subscriptionKey} get kb --kbId foo`, (error, stdout) => {
                assert.equal(stdout, '');
                assert(error.message.includes('KbNotFound'), error.message);
                done();
            });
        });

    });

    describe('using "update" operation', () => {
        it('should print an error when --kbId not found', function(done) {
            if (!subscriptionKey) this.skip('subscriptionKey not found');
            exec(`node ${qnamaker} --subscriptionKey ${subscriptionKey} update kb --kbId foo --in ${updateKbOperation}`, (error, stdout) => {
                assert.equal(stdout, '');
                assert(error.message.includes('KbNotFound'), error.message);
                done();
            });
        });

    });
});
