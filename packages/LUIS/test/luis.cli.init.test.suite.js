const assert = require('assert');
const fs = require('fs-extra');
const path = require('path');
const txtfile = require('read-text-file');
const { spawn } = require('child_process');
const luis = require.resolve('../bin/luis');

describe('The LUIS cli init argument', () => {
    const rcPath = path.resolve('.luisrc');
    beforeEach(async () => {
        try {
            await fs.open(rcPath, 'w');
        } catch (e) {
            // do noting
        }
    });

    afterEach(async () => {
        try {
            await fs.remove(rcPath);
        } catch(e) {
            // do noting
        }
    });

    it('should prompt the user though the creation of the .luisrc and write the file', async () => {
        const luisProcess = spawn('node', [luis, 'init'], { stdio: ['pipe', 'pipe', process.stderr] });
        let msgCt = 0;
        const appId = Math.floor(Math.random() * 9999999);
        const versionId = Math.floor(Math.random() * 111111);
        const luisKey = 'dummy-key';
        const region = 'westus';

        await new Promise(resolve => {
            luisProcess.stdout.on('data', data => {
                const message = (msgCt++ , data.toString().toLowerCase());
                switch (msgCt) {
                case 1:
                    assert(message.includes('this util will walk you through creating a .luisrc file'));
                    assert(message.includes('press ^c at any time to quit.'));
                    break;

                case 2:
                    assert.equal('what is your luis authoring key (from luis.ai portal user settings page)? ', message);
                    luisProcess.stdin.write(`${luisKey}\r`);
                    break;

                case 3:
                    assert.equal('what is your region? [westus, westeurope, australiaeast] ', message);
                    luisProcess.stdin.write(`${region}\r`);
                    break;

                case 4:
                    assert.equal('what is your luis app id? [default: skip] ', message);
                    luisProcess.stdin.write(`${appId}\r`);
                    break;

                case 5:
                    assert.equal('what is your luis version id? [default: 0.1] ', message);
                    luisProcess.stdin.write(`${versionId}\r`);
                    break;

                case 6:
                    assert(message.includes('does this look ok?'));
                    luisProcess.stdin.write('yes\r');
                    break;

                case 7:
                    assert(fs.statSync(rcPath));
                    resolve();
                    break;
                }
            });
        });

        const rc = JSON.parse(await txtfile.read(rcPath));
        assert.equal(rc.appId, appId);
        assert.equal(rc.versionId, versionId);
        assert.equal(rc.region, region);
    });
});
