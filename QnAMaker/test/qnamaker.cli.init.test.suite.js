const assert = require('assert');
const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');
const qnamaker = require.resolve('../bin/qnamaker');
const txtfile = require('read-text-file');

describe('The QnA Maker cli --init argument', () => {
    const rcPath = path.resolve('.qnamakerrc');
    beforeEach(async () => {
        try {
            await fs.open(rcPath, 'w');
        } catch (e) {
            // do noting
        }
    });
    
    it('should prompt the user though the creation of the .qnamakerrc and write the file', async () => {
        const qnamakerProcess = spawn('node', [qnamaker, 'init'], {stdio: ['pipe', 'pipe', process.stderr]});
        let msgCt = 0;
        const subscriptionKey = Math.floor(Math.random() * 9999999);
        const knowledgeBaseId = Math.floor(Math.random() * 111111);
        
        await new Promise(resolve => {
            qnamakerProcess.stdout.on('data', data => {
                const message = (msgCt++, data.toString().toLowerCase());
                
                switch (msgCt) {
                case 1:
                    assert(message.includes('this util will walk you through creating a .qnamakerrc file'));
                    assert(message.includes('press ^c at any time to quit.'));
                    break;
                    
                case 2:
                    assert.equal('what is your qnamaker access/subscription key? (found on the cognitive services azure portal page under "access keys") ', message);
                    qnamakerProcess.stdin.write(`${subscriptionKey}\r`);
                    break;
                    
                case 3:
                    assert.equal('what would you like to use as your active knowledgebase id? [none] ', message);
                    qnamakerProcess.stdin.write(`${knowledgeBaseId}\r`);
                    break;
                    
                case 4:
                    assert(message.includes('does this look ok?'));
                    qnamakerProcess.stdin.write('yes\r');
                    break;
                    
                case 5:
                    assert(fs.statSync(rcPath));
                    resolve();
                    break;
                }
            });
        });
        
        const rc = JSON.parse(await txtfile.read(rcPath));
        assert.equal(rc.subscriptionKey, subscriptionKey);
        assert.equal(rc.kbId, knowledgeBaseId);
    });
});
