"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
const botframework_config_1 = require("botframework-config");
const chalk = require("chalk");
const program = require("commander");
program.Command.prototype.unknownOption = function (flag) {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    showErrorHelp();
};
program
    .name('msbot connect generic')
    .description('Connect a generic service to the bot')
    .option('-n, --name <name>', 'name of the service')
    .option('-u, --url <url>', 'deep link url for the service\n')
    .option('--keys <keys>', 'serialized json key/value configuration for the service')
    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--input <jsonfile>', 'path to arguments in JSON format { id:\'\',name:\'\', ... }')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .option('--stdin', 'arguments are passed in as JSON object via stdin')
    .action((filePath, actions) => {
    if (filePath)
        actions.filePath = filePath;
});
let args = program.parse(process.argv);
if (process.argv.length < 3) {
    program.help();
}
else {
    if (!args.bot) {
        botframework_config_1.BotConfiguration.loadBotFromFolder(process.cwd(), args.secret)
            .then(processConnectFile)
            .catch((reason) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
    }
    else {
        botframework_config_1.BotConfiguration.load(args.bot, args.secret)
            .then(processConnectFile)
            .catch((reason) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
    }
}
async function processConnectFile(config) {
    args.name = args.hasOwnProperty('name') ? args.name : config.name;
    if (!args.url)
        throw new Error('mising --url');
    if (!args.configuration) {
        args.configuration = {};
        if (args.keys) {
            var keys = JSON.parse(args.keys);
            for (var key in keys) {
                args.configuration[key] = keys[key].toString();
            }
        }
    }
    // add the service
    let newService = new botframework_config_1.GenericService({
        name: args.hasOwnProperty('name') ? args.name : args.url,
        url: args.url,
        configuration: args.configuration
    });
    let id = config.connectService(newService);
    await config.save(args.secret);
    process.stdout.write(JSON.stringify(config.findService(id), null, 2));
    return config;
}
function showErrorHelp() {
    program.outputHelp((str) => {
        console.error(str);
        return '';
    });
    process.exit(1);
}
//# sourceMappingURL=msbot-connect-generic.js.map