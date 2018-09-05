let bf = require('botframework-config');
let assert = require('assert');
let util = require('util');
let fs = require('fs');
let exec = util.promisify(require('child_process').exec);

describe("msbot connection tests", () => {

    it("msbot connect appinsights", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        await bot.saveAs("save.bot", secret);

        let command = `node bin/msbot-connect-appinsights.js `;
        command += `-b save.bot `;
        command += `-n TestInsights `;
        command += `--serviceName testInsights `;
        command += `--instrumentationKey testInstrumentationKey `;
        command += `--applicationId 2f510b5e-10fe-4f53-9159-b134539ac123 `;
        command += `--keys "{\\"key1\\":\\"value1\\"}" `;
        command += `--secret ${secret} `;
        command += `-s 2f510b5e-10fe-4f53-9159-b134539ac594 `;
        command += `--tenantId microsoft.onmicrosoft.com `
        command += `--resourceGroup testGroup`;
        let p = await exec(command);

        let config = await bf.BotConfiguration.load("save.bot", secret);
        fs.unlinkSync("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "appInsights", "type is wrong");
        assert.equal(config.services[0].name, "TestInsights", "name is wrong");
        assert.equal(config.services[0].serviceName, "testInsights", "servicename is wrong");
        assert.ok(config.services[0].id.length > 0, "id is wrong");
        assert.equal(config.services[0].subscriptionId, "2f510b5e-10fe-4f53-9159-b134539ac594", "subscriptionId is wrong")
        assert.equal(config.services[0].tenantId, "microsoft.onmicrosoft.com", " tenantid is wrong")
        assert.equal(config.services[0].resourceGroup, "testGroup", "resourceGroup is wrong")
        assert.equal(config.services[0].instrumentationKey, "testInstrumentationKey", "instrumentationKey missing");
        assert.equal(config.services[0].applicationId, "2f510b5e-10fe-4f53-9159-b134539ac123", "applicationId missing");
        assert.equal(config.services[0].apiKeys.key1, 'value1', "key not set");
    });

    it("msbot connect blob", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        await bot.saveAs("save.bot", secret);

        let p = await exec(`node bin/msbot-connect-blob.js -b save.bot -n TestBlob --serviceName testBlob --connectionString testConnection --container testContainer --secret ${secret} -s 2f510b5e-10fe-4f53-9159-b134539ac594 --tenantId microsoft.onmicrosoft.com --resourceGroup testGroup `);

        let config = await bf.BotConfiguration.load("save.bot", secret);
        fs.unlinkSync("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "blob", "type is wrong");
        assert.equal(config.services[0].name, "TestBlob", "name is wrong");
        assert.equal(config.services[0].serviceName, "testBlob", "servicename is wrong");
        assert.ok(config.services[0].id.length > 0, "id is wrong");
        assert.equal(config.services[0].subscriptionId, "2f510b5e-10fe-4f53-9159-b134539ac594", "subscriptionId is wrong")
        assert.equal(config.services[0].tenantId, "microsoft.onmicrosoft.com", " tenantid is wrong")
        assert.equal(config.services[0].resourceGroup, "testGroup", "resourceGroup is wrong")
        assert.equal(config.services[0].connectionString, "testConnection", "connection missing");
        assert.equal(config.services[0].container, "testContainer", "container missing");
    });
    
    it("msbot connect bot", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.saveAs("save.bot", secret);

        let p = await exec(`node bin/msbot-connect-bot.js -b save.bot -n TestBot --serviceName TestBot --secret ${secret} --endpoint http://foo.com/api/messages -s 2f510b5e-10fe-4f53-9159-b134539ac594 --appId 2f510b5e-10fe-4f53-9159-b134539ac594 --appPassword appPassword --tenantId microsoft.onmicrosoft.com --resourceGroup test `);

        let config = await bf.BotConfiguration.load("save.bot", secret);
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

    it("msbot connect cosmosdb", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        await bot.saveAs("save.bot", secret);

        let p = await exec(`node bin/msbot-connect-cosmosdb.js -b save.bot -n TestCosmos --serviceName testCosmos --connectionString testConnection --database testDatabase --collection testCollection --secret ${secret} -s 2f510b5e-10fe-4f53-9159-b134539ac594 --tenantId microsoft.onmicrosoft.com --resourceGroup testGroup `);

        let config = await bf.BotConfiguration.load("save.bot", secret);
        fs.unlinkSync("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "cosmosdb", "type is wrong");
        assert.equal(config.services[0].name, "TestCosmos", "name is wrong");
        assert.equal(config.services[0].serviceName, "testCosmos", "servicename is wrong");
        assert.ok(config.services[0].id.length > 0, "id is wrong");
        assert.equal(config.services[0].subscriptionId, "2f510b5e-10fe-4f53-9159-b134539ac594", "subscriptionId is wrong")
        assert.equal(config.services[0].tenantId, "microsoft.onmicrosoft.com", " tenantid is wrong")
        assert.equal(config.services[0].resourceGroup, "testGroup", "resourceGroup is wrong")
        assert.equal(config.services[0].connectionString, "testConnection", "connection missing");
        assert.equal(config.services[0].database, "testDatabase", "database missing");
        assert.equal(config.services[0].collection, "testCollection", "collection missing");
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

        let config = await bf.BotConfiguration.load("save.bot", secret);
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

    it("msbot connect luis", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.saveAs("save.bot", secret);

        let p = await exec(`node bin/msbot-connect-luis.js -b save.bot --secret ${secret} -n LUIS -a 2f510b5e-10fe-4f53-9159-b134539ac594 --authoringKey 2f510b5e-10fe-4f53-9159-b134539ac594 --subscriptionKey 2f510b5e-10fe-4f53-9159-b134539ac594 --region eastus --version 1.0`);

        let config = await bf.BotConfiguration.load("save.bot", secret);
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

    it("msbot connect endpoint", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.saveAs("save.bot", secret);

        let p = await exec(`node bin/msbot-connect-endpoint.js -b save.bot --secret ${secret} -n Endpoint2 --endpoint https://foo.com/api/messages --appId 2f510b5e-10fe-4f53-9159-b134539ac594 --appPassword appPassword`);

        let config = await bf.BotConfiguration.load("save.bot", secret);
        fs.unlinkSync("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "endpoint", "type is wrong");
        assert.equal(config.services[0].name, "Endpoint2", "name is wrong");
        assert.equal(config.services[0].appId, "2f510b5e-10fe-4f53-9159-b134539ac594", "appId is wrong")
        assert.equal(config.services[0].appPassword, "appPassword", "appPassword is wrong")
        assert.equal(config.services[0].endpoint, "https://foo.com/api/messages", "endpoint is wrong")
    });

    it("msbot connect generic", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        await bot.saveAs("save.bot", secret);

        let command = `node bin/msbot-connect-generic.js `;
        command += `-b save.bot `;
        command += `-n TestGeneric `;
        command += `--url https://bing.com `;
        command += `--keys "{\\"key1\\":\\"value1\\"}" `;
        command += `--secret ${secret}`;
        let p = await exec(command);

        let config = await bf.BotConfiguration.load("save.bot", secret);
        fs.unlinkSync("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "generic", "type is wrong");
        assert.equal(config.services[0].name, "TestGeneric", "name is wrong");
        assert.ok(config.services[0].id.length > 0, "id is wrong");
        assert.equal(config.services[0].url, "https://bing.com", "url missing");
        assert.equal(config.services[0].configuration.key1, "value1", "missing configuration");
    });

    it("msbot connect qna", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.saveAs("save.bot", secret);

        let p = await exec(`node bin/msbot-connect-qna.js -b save.bot --secret ${secret} -n QnA --hostname https://foo.com/qnamaker -k 2f510b5e-10fe-4f53-9159-b134539ac594 --subscriptionKey 2f510b5e-10fe-4f53-9159-b134539ac594 --endpointKey  2f510b5e-10fe-4f53-9159-b134539ac594 `);

        let config = await bf.BotConfiguration.load("save.bot", secret);
        fs.unlinkSync("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "qna", "type is wrong");
        assert.equal(config.services[0].name, "QnA", "name is wrong");
        assert.equal(config.services[0].subscriptionKey, "2f510b5e-10fe-4f53-9159-b134539ac594", "subscriptionKey is wrong")
        assert.equal(config.services[0].endpointKey, "2f510b5e-10fe-4f53-9159-b134539ac594", "endpointKey is wrong")
        assert.equal(config.services[0].hostname, "https://foo.com/qnamaker", "hostname is wrong")
    });

    it("msbot connect file", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        await bot.saveAs("save.bot", secret);

        let p = await exec(`node bin/msbot-connect-file.js -b save.bot -f docs/readme.md --secret ${secret}  `);

        let config = await bf.BotConfiguration.load("save.bot", secret);
        fs.unlinkSync("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "file", "type is wrong");
        assert.equal(config.services[0].name, "readme.md", "name is wrong");
        assert.equal(config.services[0].path, "docs/readme.md", "path is wrong");
    });
});

