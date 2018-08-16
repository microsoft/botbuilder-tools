let bf = require('botframework-config');
let assert = require('assert');
let util = require('util');
let fs = require('fs');
let exec = util.promisify(require('child_process').exec);

describe("msbot tests", () => {
    it("msbot init", async () => {
        await exec("node bin/msbot-init.js -n test -d testd --secret password -e http://foo.com/api/messages --appId 2f510b5e-10fe-4f53-9159-b134539ac594 --appPassword appPassword -q");

        var config = await bf.BotConfiguration.load("test.bot", "password");
        fs.unlinkSync("test.bot");

        assert.equal(config.name, "test", "name is wrong");
        assert.equal(config.description, "testd", "description is wrong");
        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "endpoint", "type is wrong");
        assert.equal(config.services[0].name, "test", "name is wrong");
        assert.equal(config.services[0].appId, "2f510b5e-10fe-4f53-9159-b134539ac594", "appId is wrong");
        assert.equal(config.services[0].appPassword, "appPassword", "password is wrong");
    });

    it("msbot connect azure", async () => {
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.save("test.bot", "password");

        await exec("node bin/msbot-connect-azure.js -b test.bot -n TestBot -i TestBot --secret password --endpoint http://foo.com/api/messages -s 2f510b5e-10fe-4f53-9159-b134539ac594 --appId 2f510b5e-10fe-4f53-9159-b134539ac594 --appPassword appPassword --tenantId microsoft.onmicrosoft.com --resourceGroup test ");

        var config = await bf.BotConfiguration.load("test.bot", "password");
        fs.unlinkSync("test.bot");

        assert.equal(config.services.length, 2, "service is not saved");
        assert.equal(config.services[0].type, "abs", "abs type is wrong");
        assert.equal(config.services[0].name, "TestBot", "abs name is wrong");
        assert.equal(config.services[0].id, "TestBot", "abs id  is wrong");
        assert.equal(config.services[0].subscriptionId, "2f510b5e-10fe-4f53-9159-b134539ac594", "abs subscriptionId is wrong")
        assert.equal(config.services[0].tenantId, "microsoft.onmicrosoft.com", "abs tenantid is wrong")
        assert.equal(config.services[1].type, "endpoint", "endpoint type is wrong");
        assert.equal(config.services[1].appId, "2f510b5e-10fe-4f53-9159-b134539ac594", "endpoint appId is wrong");
        assert.equal(config.services[1].appPassword, "appPassword", "endpoint password is wrong");
    });

    it("msbot connect luis", async () => {
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.save("test.bot", "password");

        await exec("node bin/msbot-connect-luis.js -b test.bot --secret password -n LUIS -a 2f510b5e-10fe-4f53-9159-b134539ac594 --authoringKey 2f510b5e-10fe-4f53-9159-b134539ac594 --subscriptionKey 2f510b5e-10fe-4f53-9159-b134539ac594 --version 1.0");

        var config = await bf.BotConfiguration.load("test.bot", "password");
        fs.unlinkSync("test.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "luis", "type is wrong");
        assert.equal(config.services[0].name, "LUIS", "name is wrong");
        assert.equal(config.services[0].appId, "2f510b5e-10fe-4f53-9159-b134539ac594", "appId is wrong")
        assert.equal(config.services[0].subscriptionKey, "2f510b5e-10fe-4f53-9159-b134539ac594", "subscriptionKey is wrong")
        assert.equal(config.services[0].authoringKey, "2f510b5e-10fe-4f53-9159-b134539ac594", "authoringKey is wrong")
        assert.equal(config.services[0].version, 1.0, "version is wrong")
    });

    it("msbot connect dispatch", async () => {
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.save("test.bot", "password");

        await exec("node bin/msbot-connect-luis.js -b test.bot --secret password -n LUIS -a 2f510b5e-10fe-4f53-9159-b134539ac594 --authoringKey 2f510b5e-10fe-4f53-9159-b134539ac594 --subscriptionKey 2f510b5e-10fe-4f53-9159-b134539ac594 --version 1.0");
        await exec("node bin/msbot-connect-dispatch.js -b test.bot --secret password -n Dispatch -a e06e3198-45fd-494a-8086-028d260a484b --authoringKey e06e3198-45fd-494a-8086-028d260a484b --subscriptionKey e06e3198-45fd-494a-8086-028d260a484b --version 1.0 --serviceIds 2f510b5e-10fe-4f53-9159-b134539ac594");

        var config = await bf.BotConfiguration.load("test.bot", "password");
//        fs.unlinkSync("test.bot");

        assert.equal(config.services.length, 2, "service is not saved");
        assert.equal(config.services[0].type, "luis", "type is wrong");
        assert.equal(config.services[0].name, "LUIS", "name is wrong");
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
        assert.equal(config.services[1].serviceIds[0], "2f510b5e-10fe-4f53-9159-b134539ac594", "dispatch serviceIds[0] is wrong");
    });

    it("msbot connect endpoint", async () => {
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.save("test.bot", "password");

        await exec("node bin/msbot-connect-endpoint.js -b test.bot --secret password -n Endpoint2 --endpoint https://foo.com/api/messages --appId 2f510b5e-10fe-4f53-9159-b134539ac594 --appPassword appPassword");

        var config = await bf.BotConfiguration.load("test.bot", "password");
        fs.unlinkSync("test.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "endpoint", "type is wrong");
        assert.equal(config.services[0].name, "Endpoint2", "name is wrong");
        assert.equal(config.services[0].appId, "2f510b5e-10fe-4f53-9159-b134539ac594", "appId is wrong")
        assert.equal(config.services[0].appPassword, "appPassword", "appPassword is wrong")
        assert.equal(config.services[0].endpoint, "https://foo.com/api/messages", "endpoint is wrong")
    });

    it("msbot connect qna", async () => {
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.save("test.bot", "password");

        await exec("node bin/msbot-connect-qna.js -b test.bot --secret password -n QnA --hostname https://foo.com/qnamaker -k 2f510b5e-10fe-4f53-9159-b134539ac594 --subscriptionKey 2f510b5e-10fe-4f53-9159-b134539ac594 --endpointKey  2f510b5e-10fe-4f53-9159-b134539ac594 ");

        var config = await bf.BotConfiguration.load("test.bot", "password");
        fs.unlinkSync("test.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "qna", "type is wrong");
        assert.equal(config.services[0].name, "QnA", "name is wrong");
        assert.equal(config.services[0].subscriptionKey, "2f510b5e-10fe-4f53-9159-b134539ac594", "subscriptionKey is wrong")
        assert.equal(config.services[0].endpointKey, "2f510b5e-10fe-4f53-9159-b134539ac594", "endpointKey is wrong")
        assert.equal(config.services[0].hostname, "https://foo.com/qnamaker", "hostname is wrong")
    });

    it("msbot list", async () => {
        await exec("node bin/msbot-list.js -b all.bot --secret password");
    });

    it("msbot secret", async () => {
        var config = await bf.BotConfiguration.load("all.bot", "password");
        assert.equal(config.services.length, 6, "service is missing");

        // save as test.bot
        await config.save("test.bot", "password");
        config = await bf.BotConfiguration.load("test.bot", "password");
        assert.ok(config.secretKey, "should have a secretKey");

        await exec("node bin/msbot-secret.js -b test.bot --secret password --clear");
        // verify we can load without a password
        config = await bf.BotConfiguration.load("test.bot");

        fs.unlinkSync("test.bot");
    });

    it("msbot disconnect azure", async () => {
        var config = await bf.BotConfiguration.load("all.bot", "password");
        assert.equal(config.services.length, 6, "service is missing");
        // save as test.bot
        await config.save("test.bot", "password");

        await exec("node bin/msbot-disconnect.js -b test.bot --secret password TestBot");
        var config = await bf.BotConfiguration.load("test.bot", "password");
        assert.equal(config.services.length, 5, "service wasn't removed");

        fs.unlinkSync("test.bot");
    });

    it("msbot disconnect luis", async () => {
        var config = await bf.BotConfiguration.load("all.bot", "password");
        assert.equal(config.services.length, 6, "service is missing");
        // save as test.bot
        await config.save("test.bot", "password");

        await exec("node bin/msbot-disconnect.js -b test.bot --secret password LUIS");
        var config = await bf.BotConfiguration.load("test.bot", "password");
        assert.equal(config.services.length, 5, "service wasn't removed");

        fs.unlinkSync("test.bot");
    });

    it("msbot disconnect dispatch", async () => {
        var config = await bf.BotConfiguration.load("all.bot", "password");
        assert.equal(config.services.length, 6, "service is missing");
        // save as test.bot
        await config.save("test.bot", "password");

        await exec("node bin/msbot-disconnect.js -b test.bot --secret password Dispatch");
        var config = await bf.BotConfiguration.load("test.bot", "password");
        assert.equal(config.services.length, 5, "service wasn't removed");

        fs.unlinkSync("test.bot");
    });

    it("msbot disconnect endpoint", async () => {
        var config = await bf.BotConfiguration.load("all.bot", "password");
        assert.equal(config.services.length, 6, "service is missing");
        // save as test.bot
        await config.save("test.bot", "password");

        await exec("node bin/msbot-disconnect.js -b test.bot --secret password Endpoint2");
        var config = await bf.BotConfiguration.load("test.bot", "password");
        assert.equal(config.services.length, 5, "service wasn't removed");

        fs.unlinkSync("test.bot");
    });

    it("msbot disconnect qna", async () => {
        var config = await bf.BotConfiguration.load("all.bot", "password");
        assert.equal(config.services.length, 6, "service is missing");
        
        // save as test.bot
        await config.save("test.bot", "password");

        await exec("node bin/msbot-disconnect.js -b test.bot --secret password QnA");
        var config = await bf.BotConfiguration.load("test.bot", "password");
        assert.equal(config.services.length, 5, "service wasn't removed");

        fs.unlinkSync("test.bot");
    });

});