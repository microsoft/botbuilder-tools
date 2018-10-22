/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/*eslint no-console: ["error", { allow: ["log"] }] */
const chai = require('chai');
const assert = chai.assert;
const translate = require('../lib/translate');
const path = require('path');
const { exec } = require('child_process');
const ludown = require.resolve('../bin/ludown');
const txtfile = require('read-text-file');
const trHelpers = require('../lib/translate-helpers');
const pathToOutputFolder = path.resolve('./test/output');
const fs = require('fs');
const helpers = require('../lib/helpers');
const NEWLINE = require('os').EOL;
const TRANSLATE_KEY = process.env.TRANSLATOR_KEY;
const SHOW_LOGS = false;

const LUDOWN_ROOT = path.join(__dirname, '../');
function resolvePath(relativePath) {
    return path.join(LUDOWN_ROOT, relativePath);
}

function compareFiles(actualPath, expectedPath) {
    let expected = fs.existsSync(actualPath) ? txtfile.readSync(actualPath) : actualPath;
    let actual = fs.existsSync(expectedPath) ? txtfile.readSync(expectedPath) : expectedPath;
    assert.deepEqual(actual.split(/\r?\n/), expected.split(/\r?\n/));
}

describe('With translate module', function() {
    before(function(){
        try {
            if(!fs.existsSync(pathToOutputFolder)) {
                fs.mkdirSync(pathToOutputFolder);
            }
        } catch (err) {
            console.log('Unable to create test/output folder. The tests will fail');
        }
    });
    
    it('should throw when invalid file is specified', function(done){
        let invalidFile = resolvePath('test/1.lu');
        translate.translateContent({in: invalidFile})
            .then(() => done('Test fail! Did not throw when expected'))
            .catch(() => done())
    });

    it('correctly localize the file content', function(done) {
        if (!TRANSLATE_KEY) {
            this.skip();
        }
        let luFilePath = resolvePath('examples/1.lu');
        exec(`node ${ludown} translate -k ${TRANSLATE_KEY} -t de -o ${LUDOWN_ROOT}/test/output -n 1_de --verbose --in ` + luFilePath, (error, stdout) => {
            try {
                compareFiles(LUDOWN_ROOT + '/test/output/de/1.lu', LUDOWN_ROOT + '/test/verified/1.lu');
                console.log(stdout);
                done();
            } catch(err){
                done(err);
            }
        });
    });

    it('correctly localize the file content', function(done) {
        if (!TRANSLATE_KEY) {
            this.skip();
        }
        let luFilePath = resolvePath('test/testcases/reduced.lu');
        exec(`node ${ludown} translate -k ${TRANSLATE_KEY} -t zh-Hans -o ${LUDOWN_ROOT}/test/output --verbose --in ` + luFilePath, (error, stdout) => {
            try {
                compareFiles(LUDOWN_ROOT + '/test/output/zh-Hans/reduced.lu', LUDOWN_ROOT + '/test/verified/zh-Hans/reduced.lu');
                console.log(stdout);
                done();
            } catch(err){
                done(err);
            }
        });
    });

    it('correctly localizes the file content when multiple target languages are specified', function(done) {
        if (!TRANSLATE_KEY) {
            this.skip();
        }
        let luFilePath = resolvePath('test/testcases/reduced.lu');
        exec(`node ${ludown} translate -k ${TRANSLATE_KEY} -t "zh-Hans, de" -o ${LUDOWN_ROOT}/test/output --verbose --in ` + luFilePath, (error, stdout) => {
            try {
                compareFiles(LUDOWN_ROOT + '/test/output/zh-Hans/reduced.lu', LUDOWN_ROOT + '/test/verified/zh-Hans/reduced.lu');
                compareFiles(LUDOWN_ROOT + '/test/output/de/reduced.lu', LUDOWN_ROOT + '/test/verified/de/reduced.lu');
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
        trHelpers.parseAndTranslate(luFile, 'invalid-key', 'de', '', true, true, SHOW_LOGS)
            .then(function(res) {
                done(res);
            })
            .catch(function(){
                done();
            })
    });

    it('correctly localize the file content with all concepts', function(done) {
        if (!TRANSLATE_KEY) {
            this.skip();
        }
        let fileContent = txtfile.readSync(resolvePath('examples/all.lu'))
        trHelpers.parseAndTranslate(fileContent, TRANSLATE_KEY, 'de', '', true, true, SHOW_LOGS)
            .then(function(res) {
                try {
                    compareFiles(res, LUDOWN_ROOT + '/test/verified/de/all.lu');
                    done();
                } catch (err) {
                    done(err);
                }
            })
            .catch (err => done(err));
    });
  
    it('Comments in lu files can be skipped from translation', function(done) {
        if (!TRANSLATE_KEY) {
            this.skip();
        }
        let fileContent = `> test`;
        trHelpers.parseAndTranslate(fileContent, TRANSLATE_KEY, 'de', '', false, true, SHOW_LOGS)
            .then(function(res) {
                try {
                    assert.equal(res, `> test` + NEWLINE);
                    done();
                } catch (err) {
                    done(err);
                }
            })
            .catch (err => done(err));
    });
  
    it('Translate throw with invalid tgt lang code', function(done) {
        if (!TRANSLATE_KEY) {
            this.skip();
        }
        let fileContent = `- 123`;
        trHelpers.parseAndTranslate(fileContent, TRANSLATE_KEY, 'dex', '', false, true, SHOW_LOGS)
            .then(function() {
                done('Test fail! Did not throw when expected');
            })
            .catch (() => done());
    });

    it('Translate throw with invalid src lang code', function(done) {
        if (!TRANSLATE_KEY) {
            this.skip();
        }
        let fileContent = `[123]('./1.lu')`;
        trHelpers.parseAndTranslate(fileContent, TRANSLATE_KEY, 'de', 'esx', false, true, SHOW_LOGS)
            .then(function() {
                done('Test fail! Did not throw when expected');
            })
            .catch (() => done());
    });

    it('Link text can be left untranslated', function(done) {
        if (!TRANSLATE_KEY) {
            this.skip();
        }
        let fileContent = `[123]('./1.lu')`;
        trHelpers.parseAndTranslate(fileContent, TRANSLATE_KEY, 'de', '', true, false, SHOW_LOGS)
            .then(function(res) {
                try {
                    assert.equal(res, `[123]('./1.lu')` + NEWLINE);
                    done();
                } catch (err) {
                    done(err);
                }
            })
            .catch (err => done(err));
    });

    it('Link text can be left untranslated', function(done) {
        if (!TRANSLATE_KEY) {
            this.skip();
        }
        let fileContent = `\`\`\`markdown
        test 123`;
        trHelpers.parseAndTranslate(fileContent, TRANSLATE_KEY, 'de', 'esx', false, true, SHOW_LOGS)
            .then(function() {
                done('Test fail! Did not throw when expected');
            })
            .catch (() => done());
    }); 

    it('Alterations are translated correctly', function(done) {
        if (!TRANSLATE_KEY) {
            this.skip();
        }
        let fileContent = helpers.sanitizeNewLines(`$ hello : qna-alterations = 
- hello`);
        let translatedContent = helpers.sanitizeNewLines(`$Hallo : qna-alterations = 
- Hallo
`);
        trHelpers.parseAndTranslate(fileContent, TRANSLATE_KEY, 'de', '', false, true, SHOW_LOGS)
            .then(function(res) {
                assert.equal(translatedContent, res);
                done();
            })
            .catch (err => done(err));
    }); 
});