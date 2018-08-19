let bf = require('botframework-config');
let assert = require('assert');
let util = require('util');
let fs = require('fs');
let exec = util.promisify(require('child_process').exec);

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
