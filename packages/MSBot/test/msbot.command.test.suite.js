let bf = require('botframework-config');
let assert = require('assert');
let util = require('util');
let fs = require('fs');
let exec = util.promisify(require('child_process').exec);
const msbot = require.resolve('../bin/msbot.js');
const botConfig = require.resolve('./bot.txt');
const pkg = require('../package.json');

describe("msbot commands", () => {
    it("msbot init", async () => {
        let p = await exec(`node ${msbot} init -n save --secret -e http://foo.com/api/messages --appId 2f510b5e-10fe-4f53-9159-b134539ac594 --appPassword appPassword -q`);
        let result = JSON.parse(p.stdout);

        assert.ok(result.secret, "should have created secret");
        let config = await bf.BotConfiguration.load("save.bot", result.secret);
        fs.unlinkSync("save.bot");

        assert.equal(config.name, "save", "name is wrong");
        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "endpoint", "type is wrong");
        assert.equal(config.services[0].name, "save", "name is wrong");
        assert.equal(config.services[0].appId, "2f510b5e-10fe-4f53-9159-b134539ac594", "appId is wrong");
        assert.equal(config.services[0].appPassword, "appPassword", "password is wrong");
    });

    it("msbot get", async () => {
        let p = await exec(`node ${msbot} get -b bot.txt 141`);
        let result = JSON.parse(p.stdout);

        let bot = await bf.BotConfiguration.load(`${botConfig}`);

        assert.deepEqual(result, bot.findServiceByNameOrId("141"), "service by id is wrong");

        p = await exec(`node ${msbot} get -b bot.txt testBlob`);
        result = JSON.parse(p.stdout);
        assert.deepEqual(result, bot.findServiceByNameOrId('testBlob'), "service by name is wrong");
    });
    

    it("msbot list", async () => {
        let bot = await bf.BotConfiguration.load(`${botConfig}`);
        let p = await exec(`node ${msbot} list -b bot.txt`);
        let result = JSON.parse(p.stdout);
        assert.deepEqual(result.services, bot.toJSON().services, "services are different");

        // list with secret
        let secret = bf.BotConfiguration.generateKey();
        await bot.saveAs("save.bot", secret);
        p = await exec(`node ${msbot} list -b save.bot --secret ${secret}`);
        result = JSON.parse(p.stdout);
        let saveBot = await bf.BotConfiguration.load("save.bot", secret);
        saveBot.clearSecret();
        assert.deepEqual(result.services, bot.toJSON().services, "encrypted services are different");
    });


    it("msbot secret --new add", async () => {
        let config = await bf.BotConfiguration.load(`${botConfig}`);
        config.saveAs('save.bot');

        // test add secret
        let p = await exec(`node ${msbot} secret -b save.bot --new`);
        let secret = p.stdout.split('\n')[1];
        let buf = new Buffer(secret, "base64");
        assert.equal(buf.length, 32, "secret should be 32 bytes");
        config = await bf.BotConfiguration.load("save.bot", secret);
        fs.unlinkSync("save.bot");
        assert.ok(config.padlock.length > 0, "padlock should be set");
    });

    it("msbot secret --new replace", async () => {
        let config = await bf.BotConfiguration.load(`${botConfig}`);
        let secret = bf.BotConfiguration.generateKey();
        config.saveAs('save.bot', secret);

        // test new secret
        p = await exec(`node ${msbot} secret -b save.bot --secret ${secret} --new`);
        fs.unlinkSync("save.bot");
        let secret2 = p.stdout.split('\n')[1];
        assert.notEqual(secret2, secret, "secret should change");
    });

    it("msbot secret --clear", async () => {
        let config = await bf.BotConfiguration.load(`${botConfig}`);
        let secret = bf.BotConfiguration.generateKey();
        config.saveAs('save.bot', secret);

        // test clear secret
        p = await exec(`node ${msbot} secret -b save.bot --secret ${secret} --clear`);

        // verify we can load without a password
        config = await bf.BotConfiguration.load("save.bot");
        fs.unlinkSync("save.bot");
    });

    it('should not prefix [msbot] to stdout when --prefix is not passed as an argument', function(done) {
        exec(`node ${msbot}`, (error, stdout, stderr) => {
            try {
                assert.notEqual(stdout.startsWith(`[${pkg.name}]`), true);
                done(); 
            } catch (err) {
                done(err);
            }                
        });
    });

    it('should prefix [msbot] to stdout when --prefix is passed as an argument', function(done) {
        exec(`node ${msbot} --prefix`, (error, stdout, stderr) => {
            try {
                assert.equal(stdout.startsWith(`[${pkg.name}]`), true);
                done(); 
            } catch (err) {
                done(err);
            }                
        });
    });

    it('should prefix [msbot] to stderr when --prefix is passed as an argument', function(done) {
        exec(`node ${msbot} parse -x --prefix`, (error, stdout, stderr) => {
            try {
                assert.equal(stderr.startsWith(`[${pkg.name}]`), true);
                done(); 
            } catch (err) {
                done(err);
            }                
        });
    });

});
