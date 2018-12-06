const path = require('path');
const fs = require('fs-extra');
const assert = require('assert');
const txtfile = require('read-text-file');

const { spawn } = require('child_process');
const mslg = require.resolve('../bin/mslg');

describe('The MSLG CLI --init argument', () => {
    const rcPath = path.resolve('.lgrc');
    beforeEach(async () => {
        try {
            await fs.open(rcPath, 'w');
        } catch (e) {
            // do nothing
        }
    });
    
    it('should prompt the user though the creation of the .lgrc and write the file', async () => {
        const mslgProcess = spawn('node', [mslg, 'init'], {stdio: ['pipe', 'pipe', process.stderr]});
        let msgCt = 0;

        const region = "westus";
        const lgAppId = Math.floor(Math.random() * 111111);
        const lgAppName = "LG App Name"
        const lgAppLocale = "LG App Locale";
        const lgAppDomain = "LG App Domain";
        const lgAppVersion = "0.0.1";

        const endpointKey = Math.floor(Math.random() * 5555555);
        const authoringKey = Math.floor(Math.random() * 9999999);
        
        await new Promise(resolve => {
            mslgProcess.stdout.on('data', data => {
                const message = (msgCt++, data.toString());
                switch (msgCt) {
                case 1:
                    assert(message.includes('This util will walk you through creating a .lgrc file'));
                    assert(message.includes('Press ^C at any time to quit.'));
                    break;
                    
                case 2:
                    assert.equal('What is your LG authoring/subscription key? (found on the Cognitive Services Azure portal page under "access keys") ', message);
                    mslgProcess.stdin.write(`${authoringKey}\r`);
                    break;
                    
                case 3:
                    assert.equal('What is your region? [develop, ev2test, eastasia, northeurope] ', message);
                    mslgProcess.stdin.write(`${region}\r`);
                    break;

                case 4:
                    assert.equal("What is your LG EndpointKey? ", message);
                    mslgProcess.stdin.write(`${endpointKey}\r`);
                    break;
                
                case 5:
                    assert.equal("What would you like to use as your active LG App ID? [none] ", message);
                    mslgProcess.stdin.write(`${lgAppId}\r`);
                    break;

                case 6:
                    assert.equal("What would you like to use as your active LG App Name? [none] ", message);
                    mslgProcess.stdin.write(`${lgAppName}\r`);
                    break;

                case 7:
                    assert.equal("What would you like to use as your active LG App Locale? [en-US] ", message);
                    mslgProcess.stdin.write(`${lgAppLocale}\r`);
                    break;

                case 8:
                    assert.equal("What would you like to use as your active LG App Domain? [none] ", message);
                    mslgProcess.stdin.write(`${lgAppDomain}\r`);
                    break;

                case 9:
                    assert.equal("What would you like to use as your active LG App Version? [0.1] ", message);
                    mslgProcess.stdin.write(`${lgAppVersion}\r`);
                    break;
                    
                case 10:
                    assert(message.includes('Does this look ok?'));
                    mslgProcess.stdin.write('yes\r');
                    break;
                    
                case 11:
                    assert(fs.statSync(rcPath));
                    resolve();
                    break;
                }
            });
        });
        
        const rc = JSON.parse(await txtfile.read(rcPath));
        assert.equal(rc.lgAppId, lgAppId);
        assert.equal(rc.lgAppName, lgAppName);
        assert.equal(rc.lgAppDomain, lgAppDomain);
        assert.equal(rc.lgAppLocale, lgAppLocale);
        assert.equal(rc.lgAppVersion, lgAppVersion);
        assert.equal(rc.authoringKey, authoringKey);
        assert.equal(rc.endpointKey, endpointKey);
        assert.equal(rc.endpointBasePath, `https://${region}.cris.ai`);
    });
});
