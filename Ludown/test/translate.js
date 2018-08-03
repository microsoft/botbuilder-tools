/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const chai = require('chai');
const assert = chai.assert;
const translate = require('../lib/translate');
const path = require('path');
const {exec} = require('child_process');
const ludown = path.resolve('./bin/ludown');
const txtfile = require('read-text-file');
const trHelpers = require('../lib/translate-helpers');
const pathToOutputFolder = path.resolve('./test/output');
const fs = require('fs');
describe('With translate module', function() {
    before(function(){
        try {
            if(!fs.existsSync(pathToOutputFolder)) {
                fs.mkdirSync(pathToOutputFolder);
            }
        } catch (err) {
            console.log('Unable to create test\\output folder. The tests will fail');
        }
      });

    
    it('should throw when invalid file is specified', function(done){
        let invalidFile = path.resolve('./test/1.lu');
        translate.translateContent({in: invalidFile})
            .then(res => done('Test fail! Did not throw when expected'))
            .catch(err => done())
    });

    it('correctly localize the file content', function(done) {
        let luFilePath = path.resolve('examples\\1.lu');
        exec(`node ${ludown} translate -k 5ef1cecd7e954de9b1de6e7fc310f719 -t de -o test\\output -n 1_de --verbose --in ` + luFilePath, (error, stdout, stderr) => {
            try {
                assert.equal(txtfile.readSync('./test/verified/1.lu'), txtfile.readSync('./test/output/de/1.lu'));
                console.log(stdout);
                done();
            } catch(err){
                done(err);
            }
        });
    });

    it('correctly throws when an invalid translate key is provided', function(done) {
        let luFile = `$entityName:foo=
        - one`;
        trHelpers.parseAndTranslate(luFile, '5ef1cecd7e954de9b1de6e7fc310f7192', 'de', '', true, true, true)
            .then(function(res) {
                done(res);
            })
            .catch(function(err){
                done();
            })
    });

    it('correctly localize the file content with all concepts', function(done) {
        let fileContent = txtfile.readSync(path.resolve('examples\\all.lu'))
        trHelpers.parseAndTranslate(fileContent, '5ef1cecd7e954de9b1de6e7fc310f719', 'de', '', true, true, true)
            .then(function(res) {
                try {
                    assert.equal(txtfile.readSync('./test/verified/de/all.lu'), res);
                    done();
                } catch (err) {
                    done(err);
                }
            })
            .catch (err => done(err));
    });
  
    it('Comments in lu files can be skipped from translation', function(done) {
        let fileContent = `> test`;
        trHelpers.parseAndTranslate(fileContent, '5ef1cecd7e954de9b1de6e7fc310f719', 'de', '', false, true, true)
            .then(function(res) {
                try {
                    assert.equal(`> test\r\n`, res);
                    done();
                } catch (err) {
                    done(err);
                }
            })
            .catch (err => done(err));
    });
  
    it('Translate throw with invalid tgt lang code', function(done) {
        let fileContent = `- 123`;
        trHelpers.parseAndTranslate(fileContent, '5ef1cecd7e954de9b1de6e7fc310f719', 'dex', '', false, true, true)
            .then(function(res) {
                done('Test fail! Did not throw when expected');
            })
            .catch (err => done());
    });

    it('Translate throw with invalid src lang code', function(done) {
        let fileContent = `[123]('./1.lu')`;
        trHelpers.parseAndTranslate(fileContent, '5ef1cecd7e954de9b1de6e7fc310f719', 'de', 'esx', false, true, true)
            .then(function(res) {
                done('Test fail! Did not throw when expected');
            })
            .catch (err => done());
    });

    it('Link text can be left untranslated', function(done) {
        let fileContent = `[123]('./1.lu')`;
        trHelpers.parseAndTranslate(fileContent, '5ef1cecd7e954de9b1de6e7fc310f719', 'de', '', true, false, true)
            .then(function(res) {
                try {
                    assert.equal(`[123]('./1.lu')\r\n`, res);
                    done();
                } catch (err) {
                    done(err);
                }
            })
            .catch (err => done(err));
    });

    it('Link text can be left untranslated', function(done) {
        let fileContent = `\`\`\`markdown
        test 123`;
        trHelpers.parseAndTranslate(fileContent, '5ef1cecd7e954de9b1de6e7fc310f719', 'de', 'esx', false, true, true)
            .then(function(res) {
                done('Test fail! Did not throw when expected');
            })
            .catch (err => done());
    }); 

    it('Alterations are translated correctly', function(done) {
        let fileContent = `$ hello : qna-alterations = 
- hello`;
        let translatedContent = `$Hallo : qna-alterations = 
- Hallo`;
        trHelpers.parseAndTranslate(fileContent, '5ef1cecd7e954de9b1de6e7fc310f719', 'de', '', false, true, true)
            .then(function(res) {
                assert.equal(res, translatedContent.replace(/\n/g, '\r\n') + '\r\n');
                done();
            })
            .catch (err => done(err));
    }); 

});