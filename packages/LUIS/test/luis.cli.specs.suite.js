const path = require('path');
const { runTests } = require('./testRunner.js');

describe('The LUIS cli tool', () => {
    runTests(`${__dirname}/${path.parse(__filename).name}`);
});
