/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const chai = require('chai');
const assert = chai.assert;
const parseFile = require('../lib/parseFileContents').parseFile;
describe('Suggest Models in LU files', function() {
    it('correctly identifies trigger intent labels on intent definition', function(done) {
        let luFile = `# test [trigger intent]
        - test
        - test2`;
        parseFile(luFile, false, null)
            .then(res => {
                assert.equal(res.triggerIntent, 'test');
                done();
            })
            .catch(err => done(err))
    });

    it('correctly identifies trigger intent labels on intent definition', function(done) {
        let luFile = `# test [Trigger Intent]
        - test
        - test2`;
        parseFile(luFile, false, null)
            .then(res => {
                assert.equal(res.triggerIntent, 'test');
                done();
            })
            .catch(err => done(err))
    });

    it('correctly throw when multiple trigger intent labels are found', function(done) {
        let luFile = `# test [Trigger Intent]
        - test
        - test2
        
        # test 2 [trigger intent]
        - test 3
        - test 4`;
        parseFile(luFile, false, null)
            .then(res => done(`Did not throw when expected - ${res}`))
            .catch(err => done())
    });
});