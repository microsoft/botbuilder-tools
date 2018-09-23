/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const chai = require('chai');
const assert = chai.assert;
const parseFile = require('../lib/parseFileContents').parseFile;
const collateFiles = require('../lib/parseFileContents').collateQnAFiles;
const retCode = require('../lib/enums/CLI-errors').errorCode;
describe('With parse file function', function() {
    it('Throws when input lu file has invalid URIs', function(done){
        let fileContent = `[InvalidPDF](https://download.microsoft.com/download/2/9/B/29B20383-302C-4517-A006-B0186F04BE28/surface-pro-4-user-guide-EN2.pdf)`;
        parseFile(fileContent, false, null)
            .then(res => done('Test fail! did not throw when expected'))
            .catch(err => {
                assert.equal(err.errCode, retCode.INVALID_URI);
                done()
            })
    });

    it('correctly parses files available for ingestion in parse toqna', function(done){
        let fileContent = `[Valid PDF](https://download.microsoft.com/download/2/9/B/29B20383-302C-4517-A006-B0186F04BE28/surface-pro-4-user-guide-EN.pdf)`;
        parseFile(fileContent, false, null)
            .then(res => {
                assert.equal(res.qnaJsonStructure.files[0].fileUri, 'https://download.microsoft.com/download/2/9/B/29B20383-302C-4517-A006-B0186F04BE28/surface-pro-4-user-guide-EN.pdf');
                done();
            })
            .catch(err => done(err))
    });

    it('correctly collates multiple file references in parse toqna', async function() {
        let fileContent = `[Valid PDF](https://download.microsoft.com/download/2/9/B/29B20383-302C-4517-A006-B0186F04BE28/surface-pro-4-user-guide-EN.pdf)`;
        let Blob1 = await parseFile(fileContent, false, null);
        let Blob2 = await parseFile(fileContent, false, null);
        collateFiles([Blob1, Blob2])
            .then(res => {
                assert.equal(res.files[0].fileUri, 'https://download.microsoft.com/download/2/9/B/29B20383-302C-4517-A006-B0186F04BE28/surface-pro-4-user-guide-EN.pdf');
            })
            .catch(err => {throw(err)});
    })

});