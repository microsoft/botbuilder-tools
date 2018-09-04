let bf = require('botframework-config');
let assert = require('assert');
let util = require('util');
let fs = require('fs');
let exec = util.promisify(require('child_process').exec);

describe("msbot commands", () => {
    it("msbot init", async () => {
        let p = await exec(`node bin/msbot-init.js -n save --secret -e http://foo.com/api/messages --appId 2f510b5e-10fe-4f53-9159-b134539ac594 --appPassword appPassword -q`);
        var result = JSON.parse(p.stdout);

        assert.ok(result.secret, "should have created secret");
        var config = await bf.BotConfiguration.load("save.bot", result.secret);
        fs.unlinkSync("save.bot");

        assert.equal(config.name, "save", "name is wrong");
        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "endpoint", "type is wrong");
        assert.equal(config.services[0].name, "save", "name is wrong");
        assert.equal(config.services[0].appId, "2f510b5e-10fe-4f53-9159-b134539ac594", "appId is wrong");
        assert.equal(config.services[0].appPassword, "appPassword", "password is wrong");
    });

    it("msbot get", async () => {
        let p = await exec(`node bin/msbot-get.js -b bot.txt 141`);
        let result = JSON.parse(p.stdout);

        let bot = await bf.BotConfiguration.load("bot.txt");

        assert.deepEqual(result, bot.findServiceByNameOrId("141"), "service by id is wrong");

        p = await exec(`node bin/msbot-get.js -b bot.txt testBlob`);
        result = JSON.parse(p.stdout);
        assert.deepEqual(result, bot.findServiceByNameOrId('testBlob'), "service by name is wrong");
    });
    

    it("msbot list", async () => {
        let bot = await bf.BotConfiguration.load("bot.txt");
        let p = await exec(`node bin/msbot-list.js -b bot.txt`);
        let result = JSON.parse(p.stdout);
        assert.deepEqual(result.services, bot.toJSON().services, "services are different");

        // list with secret
        let secret = bf.BotConfiguration.generateKey();
        await bot.saveAs("save.bot", secret);
        p = await exec(`node bin/msbot-list.js -b save.bot --secret ${secret}`);
        result = JSON.parse(p.stdout);
        let saveBot = await bf.BotConfiguration.load("save.bot", secret);
        saveBot.clearSecret();
        assert.deepEqual(result.services, bot.toJSON().services, "encrypted services are different");
    });


    it("msbot secret --new add", async () => {
        var config = await bf.BotConfiguration.load("bot.txt");
        config.saveAs('save.bot');

        // test add secret
        let p = await exec(`node bin/msbot-secret.js -b save.bot --new`);
        var secret = p.stdout.split('\n')[1];
        var buf = new Buffer(secret, "base64");
        assert.equal(buf.length, 32, "secret should be 32 bytes");
        config = await bf.BotConfiguration.load("save.bot", secret);
        fs.unlinkSync("save.bot");
        assert.ok(config.secretKey.length > 0, "secretKey should be set");
    });

    it("msbot secret --new replace", async () => {
        var config = await bf.BotConfiguration.load("bot.txt");
        let secret = bf.BotConfiguration.generateKey();
        config.saveAs('save.bot', secret);

        // test new secret
        p = await exec(`node bin/msbot-secret.js -b save.bot --secret ${secret} --new`);
        fs.unlinkSync("save.bot");
        var secret2 = p.stdout.split('\n')[1];
        assert.notEqual(secret2, secret, "secret should change");
    });

    it("msbot secret --clear", async () => {
        var config = await bf.BotConfiguration.load("bot.txt");
        let secret = bf.BotConfiguration.generateKey();
        config.saveAs('save.bot', secret);

        // test clear secret
        p = await exec(`node bin/msbot-secret.js -b save.bot --secret ${secret} --clear`);

        // verify we can load without a password
        config = await bf.BotConfiguration.load("save.bot");
        fs.unlinkSync("save.bot");
    });
});
