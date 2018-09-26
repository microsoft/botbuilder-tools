const path = require('path');
const runTests = require('./testRunner.js').runTests;

describe('The LUIS cli tool', () => {
    runTests(`${__dirname}/${path.parse(__filename).name}`);
});
