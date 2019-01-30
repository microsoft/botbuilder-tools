const assert = require('assert');
const {exec} = require('child_process');
const semver = require('semver');
const path = require('path');
const pkg = require('../package.json');

const chatdown = require.resolve('../bin/chatdown.js');

describe('The Chatdown cli tool', () => {
    it('should print the help contents when --help is passed as an argument', done => {
        exec(`node ${chatdown} --help`, (error, stdout, stderr) => {
            assert.equal(stderr, "", "--help should not output error message");
            assert(stdout.includes('--help') && stdout.includes('--version'));
            done();
        });
    });

    it('should print the help contents to stderr when no input is passed', done => {
        exec(`node ${chatdown}`, (error, stdout, stderr) => {
            assert.equal(stdout, "", "no parameters should not output any message");
            assert(stderr.includes('--help') && stderr.includes('--version'));
            done();
        });
    });

    it('should accept data as a pipe and output the results', done => {
        exec(`(echo user=Joe && echo bot=LuliBot && echo LuliBot: hello! && echo joe:can I get some help?) | node ${chatdown} --bot bot --user user`, (error, stdout) => {
            assert.doesNotThrow(() => JSON.parse(stdout));
            done();
        });
    });

    it('should throw when a malformed config options is encountered in the input', done => {
        exec(`echo bot=LuliBot=joe | node ${chatdown} `, (error, stdout, stderr) => {
            assert(stderr.trim() === 'Error: Malformed configurations options detected. Options must be in the format optionName=optionValue');
            done();
        });
    });

    it('should generate static based timestamps when --static is passed as an argument', done => {
        exec(`(echo user=Joe && [ConversationUpdate=MembersAdded=Joe]) | node ${chatdown} --static`, (error, stdout) => {
            assert.doesNotThrow(() => JSON.parse(stdout));
            done();
        });
    });

    it('should return version number when --version is passed as an argument', done => {
        exec(`node ${chatdown} --version`, (error, stdout) => {
            assert(semver.valid(stdout));
            done();
        });
    });

    it('should read from file when chat file is passed as an argument', done => {
        exec(`node ${chatdown} ${path.join(__dirname, 'cli.sample.chat')}`, (error, stdout) => {
            assert.doesNotThrow(() => JSON.parse(stdout));
            done();
        });
    });

    it('should process all files when a glob is passed in with the -f argument, and the -o is passed in for the output directory', done => {
        exec(`node ${chatdown} -f **/*.chat -o ./`, (error, stdout, stderr) => {
            assert(stdout.includes('Successfully wrote'));
            done();
        });
    });

    it('should process all files when a glob is passed in with the -f argument', done => {
        exec(`node ${chatdown} -f **/*.chat`, (error, stdout, stderr) => {
            assert(stdout.includes('Successfully wrote'));
            done();
        });
    });

    it('should not prefix [chatdown] to stdout when --prefix is not passed as an argument', done => {
        exec(`echo bot=LuliBot=joe | node ${chatdown} --prefix`, (error, stdout, stderr) => {
            assert.notEqual(stdout.startsWith(`[${pkg.name}]`), `It should not show the tag '[${pkg.name}]' when not using the argument --prefix`);
            done();
        });
    });
    
    it('should prefix [chatdown] to stdout when --prefix is passed as an argument', done => {
        exec(`node ${chatdown} --version --prefix`, (error, stdout, stderr) => {
            assert(stdout.startsWith(`[${pkg.name}]`), `It should show the tag '[${pkg.name}]' when using the argument --prefix`);
            done();
        });
    });

    it('should prefix [chatdown] to stderr when --prefix is passed as an argument', done => {
        exec(`echo bot=LuliBot=joe | node ${chatdown} --prefix`, (error, stdout, stderr) => {
            assert(stderr.startsWith(`[${pkg.name}]`), `It should show the tag '[${pkg.name}]' when using the argument --prefix`);
            done();
        });
    });
});
