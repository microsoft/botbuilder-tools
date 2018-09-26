Object.defineProperty(exports, "__esModule", { value: true });
const assert = require('assert');
const util = require( "util" );
const {exec} = require('child_process');
const luis = require.resolve('../bin/luis');
const fs = require('fs');
const specsExtension = '.spec.json';

function runTests(specsDirectory) {
    if (fs.existsSync(specsDirectory)) {
        fs.readdirSync(specsDirectory).filter(specsFile => specsFile.endsWith(specsExtension)).forEach(file => {
            const testGroup = JSON.parse(fs.readFileSync(`${specsDirectory}/${file}`, 'utf8'));

            describe(testGroup.describe, () => {
                executeTestGroup(testGroup.tests);
            });
        })
    }
    else {
        throw Error(`Specs directory '${specsDirectory} does not exists.`);
    }
}

function executeTestGroup (tests) {
    tests.forEach((test) => {
        let command = `node ${luis}  ${test.args}`;

        if(test.resource) {
            command = getResources(test, command); }

        executeTest(test, command);
    });
}

function getResources (test, command) {
    test.resource.forEach(resource => {
        const resourcePath = `../examples/${resource}`;
        if (fs.existsSync(resourcePath, 'resource')) {
            const AppObject = require.resolve(resourcePath);
            command = util.format(command, AppObject)
        }
        else {
            throw Error(`Resource file '${resourcePath} does not exists.`);
        }    
    });

    return command;
}

function executeTest (test, command) {
    it(test.title, done => {                
        exec(command, (error, stdout, stderr) => {
            if(!test.stdout) assert(!stdout);
            if (!test.stderr) assert(!stderr);
            assert(stdout.includes(test.stdout));
            assert(stderr.includes(test.stderr));
            done();
        });
    }); 
}

exports.runTests = runTests;
