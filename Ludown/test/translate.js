/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const chai = require('chai');
const assert = chai.assert;
const translate = require('../lib/translate');
const path = require('path');
const {exec} = require('child_process');
const ludown = path.resolve('./bin/ludown.js');
const txtfile = require('read-text-file');
describe('With translate module', function() {
    it('should throw when invalid file is specified', function(done){
        let invalidFile = path.resolve('./test/1.lu');
        translate.translateContent({in: invalidFile})
            .then(res => done('Test fail! Did not throw when expected'))
            .catch(err => done())
    });

    it('correctly localize the file content', function(done) {
        let luFilePath = path.resolve('examples\\1.lu');
        exec(`node ${ludown} translate -k 5ef1cecd7e954de9b1de6e7fc310f719 -t de -o test\\output -n 1_de --in ` + luFilePath, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/1.lu'), txtfile.readSync('./test/output/de/1.lu'));
                done();
            } catch(err){
                done(err);
            }
        });
    });
});