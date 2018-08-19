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

    it("msbot list", async () => {
        let bot = await bf.BotConfiguration.load("all.bot");
        let p = await exec(`node bin/msbot-list.js -b all.bot`);
        let result = JSON.parse(p.stdout);
        assert.deepEqual(result, bot.toJSON().services, "services are different");

        // list with secret
        let secret = bf.BotConfiguration.generateKey();
        await bot.saveAs("save.bot", secret);
        p = await exec(`node bin/msbot-list.js -b save.bot --secret ${secret}`);
        result = JSON.parse(p.stdout);
        let saveBot = await bf.BotConfiguration.load("save.bot", secret);
        assert.deepEqual(result, bot.toJSON().services, "encrypted services are different");
    });


    it("msbot secret", async () => {
        var config = await bf.BotConfiguration.load("all.bot");
        config.saveAs('save.bot');

        // test add secret
        let p = await exec(`node bin/msbot-secret.js -b save.bot --new`);
        var secret = p.stdout.split('\n')[1];
        var buf = new Buffer(secret, "base64");
        assert.equal(buf.length, 32, "secret should be 32 bytes");
        config = await bf.BotConfiguration.load("save.bot", secret);
        assert.ok(config.secretKey.length > 0, "secretKey should be set");

        // test new secret
        p = await exec(`node bin/msbot-secret.js -b save.bot --secret ${secret} --new`);
        var secret2 = p.stdout.split('\n')[1];
        assert.notEqual(secret2, secret, "secret should change");

        // test clear secret
        p = await exec(`node bin/msbot-secret.js -b save.bot --secret ${secret2} --clear`);

        // verify we can load without a password
        config = await bf.BotConfiguration.load("save.bot");

        fs.unlinkSync("save.bot");
    });
});

describe("msbot connection tests", () => {
    it("msbot connect bot", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.saveAs("save.bot", secret);

        let p = await exec(`node bin/msbot-connect-bot.js -b save.bot -n TestBot --serviceName TestBot --secret ${secret} --endpoint http://foo.com/api/messages -s 2f510b5e-10fe-4f53-9159-b134539ac594 --appId 2f510b5e-10fe-4f53-9159-b134539ac594 --appPassword appPassword --tenantId microsoft.onmicrosoft.com --resourceGroup test `);

        var config = await bf.BotConfiguration.load("save.bot", secret);
        fs.unlinkSync("save.bot");

        assert.equal(config.services.length, 2, "service is not saved");
        assert.equal(config.services[0].type, "abs", "abs type is wrong");
        assert.equal(config.services[0].name, "TestBot", "abs name is wrong");
        assert.equal(config.services[0].serviceName, "TestBot", "abs name is wrong");
        assert.ok(config.services[0].id.length > 0, "abs id is wrong");
        assert.equal(config.services[0].subscriptionId, "2f510b5e-10fe-4f53-9159-b134539ac594", "abs subscriptionId is wrong")
        assert.equal(config.services[0].tenantId, "microsoft.onmicrosoft.com", "abs tenantid is wrong")
        assert.equal(config.services[1].type, "endpoint", "endpoint type is wrong");
        assert.equal(config.services[1].appId, "2f510b5e-10fe-4f53-9159-b134539ac594", "endpoint appId is wrong");
        assert.equal(config.services[1].appPassword, "appPassword", "endpoint password is wrong");
    });

    it("msbot connect luis", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.saveAs("save.bot", secret);

        let p = await exec(`node bin/msbot-connect-luis.js -b save.bot --secret ${secret} -n LUIS -a 2f510b5e-10fe-4f53-9159-b134539ac594 --authoringKey 2f510b5e-10fe-4f53-9159-b134539ac594 --subscriptionKey 2f510b5e-10fe-4f53-9159-b134539ac594 --region eastus --version 1.0`);

        var config = await bf.BotConfiguration.load("save.bot", secret);
        fs.unlinkSync("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "luis", "type is wrong");
        assert.equal(config.services[0].name, "LUIS", "name is wrong");
        assert.equal(config.services[0].region, "eastus", "region is wrong");
        assert.equal(config.services[0].appId, "2f510b5e-10fe-4f53-9159-b134539ac594", "appId is wrong")
        assert.equal(config.services[0].subscriptionKey, "2f510b5e-10fe-4f53-9159-b134539ac594", "subscriptionKey is wrong")
        assert.equal(config.services[0].authoringKey, "2f510b5e-10fe-4f53-9159-b134539ac594", "authoringKey is wrong")
        assert.equal(config.services[0].version, 1.0, "version is wrong")
    });

    it("msbot connect dispatch", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.saveAs("save.bot", secret);

        let p = await exec(`node bin/msbot-connect-luis.js -b save.bot --secret ${secret} -n LUIS -a 2f510b5e-10fe-4f53-9159-b134539ac594 --authoringKey 2f510b5e-10fe-4f53-9159-b134539ac594 --subscriptionKey 2f510b5e-10fe-4f53-9159-b134539ac594 --version 1.0`);
        let result = JSON.parse(p.stdout);
        p = await exec(`node bin/msbot-connect-dispatch.js -b save.bot --secret ${secret} -n Dispatch -a e06e3198-45fd-494a-8086-028d260a484b --authoringKey e06e3198-45fd-494a-8086-028d260a484b --subscriptionKey e06e3198-45fd-494a-8086-028d260a484b --version 1.0 --serviceIds ${result.id}`);

        var config = await bf.BotConfiguration.load("save.bot", secret);
        //        fs.unlinkSync("save.bot");

        assert.equal(config.services.length, 2, "service is not saved");
        assert.equal(config.services[0].type, "luis", "type is wrong");
        assert.equal(config.services[0].name, "LUIS", "name is wrong");
        assert.equal(config.services[0].region, "westus", "region is wrong");
        assert.equal(config.services[0].appId, "2f510b5e-10fe-4f53-9159-b134539ac594", "appId is wrong")
        assert.equal(config.services[0].subscriptionKey, "2f510b5e-10fe-4f53-9159-b134539ac594", "subscriptionKey is wrong")
        assert.equal(config.services[0].authoringKey, "2f510b5e-10fe-4f53-9159-b134539ac594", "authoringKey is wrong")
        assert.equal(config.services[0].version, 1.0, "version is wrong")
        assert.equal(config.services[1].type, "dispatch", "dispatch type is wrong");
        assert.equal(config.services[1].name, "Dispatch", "dispatch name is wrong");
        assert.equal(config.services[1].appId, "e06e3198-45fd-494a-8086-028d260a484b", "dispatch appId is wrong");
        assert.equal(config.services[1].subscriptionKey, "e06e3198-45fd-494a-8086-028d260a484b", "dispatch subscriptionKey is wrong");
        assert.equal(config.services[1].authoringKey, "e06e3198-45fd-494a-8086-028d260a484b", "dispatch authoringKey is wrong");
        assert.equal(config.services[1].version, 1.0, "dispatch version is wrong");
        assert.equal(config.services[1].serviceIds.length, 1, "dispatch serviceIds is wrong");
        assert.equal(config.services[1].serviceIds[0], result.id, "dispatch serviceIds[0] is wrong");
    });

    it("msbot connect endpoint", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.saveAs("save.bot", secret);

        let p = await exec(`node bin/msbot-connect-endpoint.js -b save.bot --secret ${secret} -n Endpoint2 --endpoint https://foo.com/api/messages --appId 2f510b5e-10fe-4f53-9159-b134539ac594 --appPassword appPassword`);

        var config = await bf.BotConfiguration.load("save.bot", secret);
        fs.unlinkSync("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "endpoint", "type is wrong");
        assert.equal(config.services[0].name, "Endpoint2", "name is wrong");
        assert.equal(config.services[0].appId, "2f510b5e-10fe-4f53-9159-b134539ac594", "appId is wrong")
        assert.equal(config.services[0].appPassword, "appPassword", "appPassword is wrong")
        assert.equal(config.services[0].endpoint, "https://foo.com/api/messages", "endpoint is wrong")
    });

    it("msbot connect qna", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.saveAs("save.bot", secret);

        let p = await exec(`node bin/msbot-connect-qna.js -b save.bot --secret ${secret} -n QnA --hostname https://foo.com/qnamaker -k 2f510b5e-10fe-4f53-9159-b134539ac594 --subscriptionKey 2f510b5e-10fe-4f53-9159-b134539ac594 --endpointKey  2f510b5e-10fe-4f53-9159-b134539ac594 `);

        var config = await bf.BotConfiguration.load("save.bot", secret);
        fs.unlinkSync("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "qna", "type is wrong");
        assert.equal(config.services[0].name, "QnA", "name is wrong");
        assert.equal(config.services[0].subscriptionKey, "2f510b5e-10fe-4f53-9159-b134539ac594", "subscriptionKey is wrong")
        assert.equal(config.services[0].endpointKey, "2f510b5e-10fe-4f53-9159-b134539ac594", "endpointKey is wrong")
        assert.equal(config.services[0].hostname, "https://foo.com/qnamaker", "hostname is wrong")
    });
});

describe("msbot disconnect tests", () => {

    it("msbot disconnect name", async () => {
        let secret = bf.BotConfiguration.generateKey();
        var config = await bf.BotConfiguration.load("all.bot");
        assert.equal(config.services.length, 9, "service is missing");
        // save as save.bot
        await config.saveAs("save.bot", secret);

        let p = await exec(`node bin/msbot-disconnect.js -b save.bot --secret ${secret} testLuis`);
        var config = await bf.BotConfiguration.load("save.bot", secret);
        assert.equal(config.services.length, 8, "service wasn't removed");

        fs.unlinkSync("save.bot");
    });

    it("msbot disconnect id", async () => {
        let secret = bf.BotConfiguration.generateKey();
        var config = await bf.BotConfiguration.load("all.bot");
        assert.equal(config.services.length, 9, "service is missing");
        // save as save.bot
        await config.saveAs("save.bot", secret);

        let service = config.services[3];
        let p = await exec(`node bin/msbot-disconnect.js -b save.bot --secret ${secret} ${service.id}`);
        var config = await bf.BotConfiguration.load("save.bot", secret);
        assert.equal(config.services.length, 8, "service wasn't removed");
        assert.equal(null, config.findService(service.id), "service should have been removed");

        fs.unlinkSync("save.bot");
    });

});
