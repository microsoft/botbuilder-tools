const path = require('path');
const assert = require('assert');
const fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const targz = require('targz');
const enumFiles = require('enum-files');

describe('package test', async () => {
    
    let packageName = '';
    let output_test_folder = 'output_test_folder';
    it('package should have all expected files', async () => {

        let includedFolders = [
            'bin',
            'lib',
            'docs',
            'examples'
        ];

        let expectedFiles = [];
        for (var includedFolder of includedFolders) {
            let files = await enumFiles.filesRecursively(`../${includedFolder}`);
            for (let file of files) {
                file = file.replace('..', path.join(`${output_test_folder}`, `package`));
                expectedFiles.push(file);
            }
        }

        // make package
        let result = await exec('npm pack ..');
        packageName = result.stdout.trim('\n');

        await new Promise((resolve, reject) => {
            targz.decompress({ src: packageName, dest: output_test_folder }, function (error) {
                if (error) {
                    assert.fail(error);
                    reject();
                }

                enumFiles.filesRecursively(output_test_folder)
                    .then((packageFiles) => {
                        for (let expectedFile of expectedFiles) {
                            let found = false;
                            for (let packageFile of packageFiles) {
                                if (packageFile == expectedFile) {
                                    found = true;
                                    break;
                                }
                            }
                            assert.ok(found, `missing ${expectedFile}`);
                        }
                        resolve();
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            });
        });
    }).timeout(15000);

    after(function () {
        // runs after all tests in this block
        fs.unlinkSync(packageName);
        fs.removeSync(output_test_folder);
    });
});

