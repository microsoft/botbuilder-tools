let bf = require('botframework-config');
let assert = require('assert');
let util = require('util');
let fs = require('fs');
let exec = util.promisify(require('child_process').exec);
const msbot = require.resolve('../bin/msbot.js');

describe("msbot update tests", () => {
    afterEach(() => fs.unlinkSync("save.bot"));

    it("msbot update appinsights", async () => {
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.connectService(new bf.AppInsightsService({
            serviceName: "testInsights",
            name: 'test',
            applicationId: "00000000-0000-0000-0000-000000000001",
            subscriptionId: "00000000-0000-0000-0000-000000000002",
            tenantId: "microsoft.onmicrosoft.com",
            resourceGroup: "westus",
            instrumentationKey: "00000000-0000-0000-0000-000000000003",
            apiKeys: { key1: 'value1' }
        }));
        await bot.saveAs("save.bot");

        let command = `node ${msbot} update appinsights `;
        command += `-b save.bot `;
        command += `--serviceName testInsights `;
        command += `--name test2`;
        let p = await exec(command);

        let config = await bf.BotConfiguration.load("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "appInsights", "type is wrong");
        assert.equal(bot.services[0].name, "test", "name is wrong");
        assert.equal(config.services[0].name, "test2", "name is wrong");
        assert.equal(config.services[0].serviceName, "testInsights", "servicename is wrong");
        assert.equal(config.services[0].subscriptionId, "00000000-0000-0000-0000-000000000002", "subscriptionId is wrong")
        assert.equal(config.services[0].tenantId, "microsoft.onmicrosoft.com", " tenantid is wrong")
        assert.equal(config.services[0].resourceGroup, "westus", "resourceGroup is wrong")
        assert.equal(config.services[0].instrumentationKey, "00000000-0000-0000-0000-000000000003", "instrumentationKey missing");
        assert.equal(config.services[0].applicationId, "00000000-0000-0000-0000-000000000001", "applicationId missing");
        assert.equal(config.services[0].apiKeys.key1, 'value1', "key not set");

        command = `node ${msbot} update appinsights `;
        command += `-b save.bot `;
        command += `--id ${config.services[0].id} `;
        command += `--name test3`;
        p = await exec(command);

        config = await bf.BotConfiguration.load("save.bot");
        assert.equal(config.services[0].name, "test3", "name is wrong");
    });

    it("msbot update blob", async () => {
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        await bot.saveAs("save.bot");

        let p = await exec(`node ${msbot} connect blob -b save.bot -n TestBlob --serviceName testBlob --connectionString testConnection --container testContainer -s 2f510b5e-10fe-4f53-9159-b134539ac594 --tenantId microsoft.onmicrosoft.com --resourceGroup testGroup `);

        let command = `node ${msbot} update blob `;
        command += `-b save.bot `;
        command += `--serviceName testBlob `;
        command += `--container testContainer2`;
        p = await exec(command);

        let config = await bf.BotConfiguration.load("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "blob", "type is wrong");
        assert.equal(config.services[0].name, "TestBlob", "name is wrong");
        assert.equal(config.services[0].serviceName, "testBlob", "servicename is wrong");
        assert.ok(config.services[0].id.length > 0, "id is wrong");
        assert.equal(config.services[0].subscriptionId, "2f510b5e-10fe-4f53-9159-b134539ac594", "subscriptionId is wrong")
        assert.equal(config.services[0].tenantId, "microsoft.onmicrosoft.com", " tenantid is wrong")
        assert.equal(config.services[0].resourceGroup, "testGroup", "resourceGroup is wrong")
        assert.equal(config.services[0].connectionString, "testConnection", "connection missing");
        assert.equal(config.services[0].container, "testContainer2", "container missing");
    });

    it("msbot update cosmosdb", async () => {
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        await bot.saveAs("save.bot");

        let p = await exec(`node ${msbot} connect cosmosdb -b save.bot -n TestCosmos --serviceName testCosmos --endpoint http://localhost:8081 --key testKey --database testDatabase --collection testCollection -s 2f510b5e-10fe-4f53-9159-b134539ac594 --tenantId microsoft.onmicrosoft.com --resourceGroup testGroup `);

        let command = `node ${msbot} update cosmosdb `;
        command += `-b save.bot `;
        command += `--serviceName testCosmos `;
        command += `--database testDatbase2`;
        p = await exec(command);

        let config = await bf.BotConfiguration.load("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "cosmosdb", "type is wrong");
        assert.equal(config.services[0].name, "TestCosmos", "name is wrong");
        assert.equal(config.services[0].serviceName, "testCosmos", "servicename is wrong");
        assert.ok(config.services[0].id.length > 0, "id is wrong");
        assert.equal(config.services[0].subscriptionId, "2f510b5e-10fe-4f53-9159-b134539ac594", "subscriptionId is wrong")
        assert.equal(config.services[0].tenantId, "microsoft.onmicrosoft.com", " tenantid is wrong")
        assert.equal(config.services[0].resourceGroup, "testGroup", "resourceGroup is wrong")
        assert.equal(config.services[0].endpoint, "http://localhost:8081", "endpoint is wrong");
        assert.equal(config.services[0].key, "testKey", "key is missing");
        assert.equal(config.services[0].database, "testDatbase2", "database missing");
        assert.equal(config.services[0].collection, "testCollection", "collection missing");

        command = `node ${msbot} update cosmosdb `;
        command += `-b save.bot `;
        command += `--id ${config.services[0].id} `;
        command += `--database testDatbase3`;
        p = await exec(command);

        config = await bf.BotConfiguration.load("save.bot");
        assert.equal(config.services[0].database, "testDatbase3", "database missing");
    });


    it("msbot update dispatch", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.saveAs("save.bot");

        let p = await exec(`node ${msbot} connect luis -b save.bot  -n LUIS -a 2f510b5e-10fe-4f53-9159-b134539ac594 --authoringKey 2f510b5e-10fe-4f53-9159-b134539ac594 --subscriptionKey 2f510b5e-10fe-4f53-9159-b134539ac594 --version 1.0`);
        let result = JSON.parse(p.stdout);
        p = await exec(`node ${msbot} connect dispatch -b save.bot  -n Dispatch -a e06e3198-45fd-494a-8086-028d260a484b --authoringKey e06e3198-45fd-494a-8086-028d260a484b --subscriptionKey e06e3198-45fd-494a-8086-028d260a484b --version 1.0 --ids ${result.id}`);

        let command = `node ${msbot} update dispatch `;
        command += `-b save.bot `;
        command += `--appId e06e3198-45fd-494a-8086-028d260a484b  `;
        command += `--name Dispatch2`;
        p = await exec(command);

        let config = await bf.BotConfiguration.load("save.bot");

        assert.equal(config.services.length, 2, "service is not saved");
        assert.equal(config.services[0].type, "luis", "type is wrong");
        assert.equal(config.services[0].name, "LUIS", "name is wrong");
        assert.equal(config.services[0].region, "westus", "region is wrong");
        assert.equal(config.services[0].appId, "2f510b5e-10fe-4f53-9159-b134539ac594", "appId is wrong")
        assert.equal(config.services[0].subscriptionKey, "2f510b5e-10fe-4f53-9159-b134539ac594", "subscriptionKey is wrong")
        assert.equal(config.services[0].authoringKey, "2f510b5e-10fe-4f53-9159-b134539ac594", "authoringKey is wrong")
        assert.equal(config.services[0].version, 1.0, "version is wrong")
        assert.equal(config.services[1].type, "dispatch", "dispatch type is wrong");
        assert.equal(config.services[1].name, "Dispatch2", "dispatch name is wrong");
        assert.equal(config.services[1].appId, "e06e3198-45fd-494a-8086-028d260a484b", "dispatch appId is wrong");
        assert.equal(config.services[1].subscriptionKey, "e06e3198-45fd-494a-8086-028d260a484b", "dispatch subscriptionKey is wrong");
        assert.equal(config.services[1].authoringKey, "e06e3198-45fd-494a-8086-028d260a484b", "dispatch authoringKey is wrong");
        assert.equal(config.services[1].version, 1.0, "dispatch version is wrong");
        assert.equal(config.services[1].serviceIds.length, 1, "dispatch serviceIds is wrong");
        assert.equal(config.services[1].serviceIds[0], result.id, "dispatch serviceIds[0] is wrong");

        command = `node ${msbot} update dispatch `;
        command += `-b save.bot `;
        command += `--id ${config.services[1].id}  `;
        command += `--name Dispatch3`;
        p = await exec(command);

        config = await bf.BotConfiguration.load("save.bot");
        assert.equal(config.services[1].name, "Dispatch3", "dispatch name is wrong");
    });

    it("msbot update luis", async () => {
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.saveAs("save.bot");

        let p = await exec(`node ${msbot} connect luis -b save.bot  -n LUIS -a 2f510b5e-10fe-4f53-9159-b134539ac594 --authoringKey 2f510b5e-10fe-4f53-9159-b134539ac594 --subscriptionKey 2f510b5e-10fe-4f53-9159-b134539ac594 --region eastus --version 1.0`);

        let command = `node ${msbot} update luis `;
        command += `-b save.bot `;
        command += `--appId 2f510b5e-10fe-4f53-9159-b134539ac594  `;
        command += `--subscriptionKey 0000000f-1000-0000-0000-000000000002        `;
        p = await exec(command);

        let config = await bf.BotConfiguration.load("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "luis", "type is wrong");
        assert.equal(config.services[0].name, "LUIS", "name is wrong");
        assert.equal(config.services[0].region, "eastus", "region is wrong");
        assert.equal(config.services[0].appId, "2f510b5e-10fe-4f53-9159-b134539ac594", "appId is wrong")
        assert.equal(config.services[0].subscriptionKey, "0000000f-1000-0000-0000-000000000002", "subscriptionKey is wrong")
        assert.equal(config.services[0].authoringKey, "2f510b5e-10fe-4f53-9159-b134539ac594", "authoringKey is wrong")
        assert.equal(config.services[0].version, 1.0, "version is wrong")

        command = `node ${msbot} update luis `;
        command += `-b save.bot `;
        command += `--id ${config.services[0].id}  `;
        command += `--subscriptionKey 0000000f-1000-0000-0000-000000000003 `;
        command += `--version 0.2        `;
        p = await exec(command);

        config = await bf.BotConfiguration.load("save.bot");
        assert.equal(config.services[0].subscriptionKey, "0000000f-1000-0000-0000-000000000003", "subscriptionKey is wrong")
        assert.equal(config.services[0].version, "0.2", "version is wrong")
    });

    it("msbot update endpoint", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.saveAs("save.bot");

        let p = await exec(`node ${msbot} connect endpoint -b save.bot  -n Endpoint2 --endpoint https://foo.com/api/messages --appId 2f510b5e-10fe-4f53-9159-b134539ac594 --appPassword appPassword`);

        let command = `node ${msbot} update endpoint `;
        command += `-b save.bot `;
        command += `--endpoint https://foo.com/api/messages `;
        command += `--appPassword thisIsNew`;
        p = await exec(command);

        let config = await bf.BotConfiguration.load("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "endpoint", "type is wrong");
        assert.equal(config.services[0].name, "Endpoint2", "name is wrong");
        assert.equal(config.services[0].appId, "2f510b5e-10fe-4f53-9159-b134539ac594", "appId is wrong")
        assert.equal(config.services[0].appPassword, "thisIsNew", "appPassword is wrong")
        assert.equal(config.services[0].endpoint, "https://foo.com/api/messages", "endpoint is wrong")

        command = `node ${msbot} update endpoint `;
        command += `-b save.bot `;
        command += `--id ${config.services[0].id} `;
        command += `--appPassword thisIsNew2`;
        p = await exec(command);

        config = await bf.BotConfiguration.load("save.bot");
        assert.equal(config.services[0].appPassword, "thisIsNew2", "appPassword is wrong")
    });

    it("msbot update generic", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        await bot.saveAs("save.bot");

        let command = `node ${msbot} connect generic `;
        command += `-b save.bot `;
        command += `-n TestGeneric `;
        command += `--url https://bing.com `;
        command += `--keys "{\\"key1\\":\\"value1\\"}" `;
        command += ``;
        let p = await exec(command);

        command = `node ${msbot} update generic `;
        command += `-b save.bot `;
        command += `--url https://bing.com `;
        command += `--keys "{\\"key1\\":\\"value2\\"}" `;
        p = await exec(command);

        let config = await bf.BotConfiguration.load("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "generic", "type is wrong");
        assert.equal(config.services[0].name, "TestGeneric", "name is wrong");
        assert.ok(config.services[0].id.length > 0, "id is wrong");
        assert.equal(config.services[0].url, "https://bing.com", "url missing");
        assert.equal(config.services[0].configuration.key1, "value2", "missing configuration");

        command = `node ${msbot} update generic `;
        command += `-b save.bot `;
        command += `--id ${config.services[0].id} `;
        command += `--keys "{\\"key1\\":\\"value3\\"}" `;
        p = await exec(command);

        config = await bf.BotConfiguration.load("save.bot");
        assert.equal(config.services[0].configuration.key1, "value3", "missing configuration");
    });

    it("msbot update qna", async () => {
        let secret = bf.BotConfiguration.generateKey();
        let bot = new bf.BotConfiguration();
        bot.name = "test";
        bot.description = "testd";
        await bot.saveAs("save.bot");

        let p = await exec(`node ${msbot} connect qna -b save.bot  -n QnA --hostname https://foo.com/qnamaker -k 20000000-0000-0000-0000-000000020000 --subscriptionKey 2f510b5e-10fe-4f53-9159-b134539ac594 --endpointKey  2f510b5e-10fe-4f53-9159-b134539ac594 `);

        command = `node ${msbot} update qna `;
        command += `-b save.bot `;
        command += `--kbId 20000000-0000-0000-0000-000000020000 `;
        command += `--endpointKey 20000000-0000-0000-0000-000000020001 `;
        p = await exec(command);

        let config = await bf.BotConfiguration.load("save.bot");

        assert.equal(config.services.length, 1, "service is not saved");
        assert.equal(config.services[0].type, "qna", "type is wrong");
        assert.equal(config.services[0].name, "QnA", "name is wrong");
        assert.equal(config.services[0].kbId, "20000000-0000-0000-0000-000000020000", "kbId is wrong")
        assert.equal(config.services[0].subscriptionKey, "2f510b5e-10fe-4f53-9159-b134539ac594", "subscriptionKey is wrong")
        assert.equal(config.services[0].endpointKey, "20000000-0000-0000-0000-000000020001", "endpointKey is wrong")
        assert.equal(config.services[0].hostname, "https://foo.com/qnamaker", "hostname is wrong")

        command = `node ${msbot} update qna `;
        command += `-b save.bot `;
        command += `--id ${config.services[0].id} `;
        command += `--endpointKey 20000000-0000-0000-0000-000000020002 `;
        p = await exec(command);

        config = await bf.BotConfiguration.load("save.bot");
        assert.equal(config.services[0].endpointKey, "20000000-0000-0000-0000-000000020002", "endpointKey is wrong")
    });

});

