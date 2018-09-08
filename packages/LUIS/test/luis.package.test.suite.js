const assert = require('assert');
const fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const tgz = require('tgz');
const enumFiles = require('enum-files');

describe('Package test', async () => {
    let packageName = '';
    it('package should have all expected files', async () => {

        let includedFolders = [
            'bin',
            'lib',
            'docs',
            'typings',
            'examples'
        ];

        let expectedFiles = [];
        for (var includedFolder of includedFolders) {
            let files = await enumFiles.filesRecursively(`../${includedFolder}`);
            for (let file of files) {
                file = file.replace('..', 'package').replace(/\\/g, "/");
                expectedFiles.push(file);
            }
        }

        // make package
        let result = await exec('npm pack ..');
        packageName = result.stdout.trim('\n');
        
        await new Promise((resolve, reject) => {
            tgz(packageName, (error, files) => {
                for (let expectedFile of expectedFiles) {
                    assert.ok(files.hasOwnProperty(expectedFile), `missing ${expectedFile}`);
                }
                resolve();
            });
        });
    });

    after(function () {
        // runs after all tests in this block
        fs.unlinkSync(packageName);
    });
});

