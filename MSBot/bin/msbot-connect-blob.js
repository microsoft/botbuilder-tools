"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
const botframework_config_1 = require("botframework-config");
const chalk = require("chalk");
const program = require("commander");
const getStdin = require("get-stdin");
const txtfile = require("read-text-file");
const utils_1 = require("./utils");
program.Command.prototype.unknownOption = function (flag) {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    showErrorHelp();
};
program
    .name('msbot connect blob')
    .description('Connect the bot to Azure Blob Storage Service')
    .option('-n, --name <name>', 'friendly name (defaults to serviceName)')
    .option('-t, --tenantId <tenantId>', 'Azure Tenant id (either GUID or xxx.onmicrosoft.com)')
    .option('-s, --subscriptionId <subscriptionId>', 'Azure Subscription Id')
    .option('-r, --resourceGroup <resourceGroup>', 'Azure resource group name')
    .option('--serviceName <serviceName>', 'Azure service name')
    .option('--connectionString <connectionString>', 'Blob storage connection string')
    .option('-c, --container <container>', "blob container name")
    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--input <jsonfile>', 'path to arguments in JSON format { id:\'\',name:\'\', ... }')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .option('--stdin', 'arguments are passed in as JSON object via stdin')
    .action((cmd, actions) => {
});
let args = program.parse(process.argv);
if (process.argv.length < 3) {
    program.help();
}
else {
    if (!args.bot) {
        botframework_config_1.BotConfiguration.loadBotFromFolder(process.cwd(), args.secret)
            .then(processConnectAzureArgs)
            .catch((reason) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
    }
    else {
        botframework_config_1.BotConfiguration.load(args.bot, args.secret)
            .then(processConnectAzureArgs)
            .catch((reason) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
    }
}
async function processConnectAzureArgs(config) {
    if (args.stdin) {
        Object.assign(args, JSON.parse(await getStdin()));
    }
    else if (args.input != null) {
        Object.assign(args, JSON.parse(await txtfile.read(args.input)));
    }
    if (!args.serviceName || args.serviceName.length == 0)
        throw new Error('Bad or missing --serviceName');
    if (!args.tenantId || args.tenantId.length == 0)
        throw new Error('Bad or missing --tenantId');
    if (!args.subscriptionId || !utils_1.uuidValidate(args.subscriptionId))
        throw new Error('Bad or missing --subscriptionId');
    if (!args.resourceGroup || args.resourceGroup.length == 0)
        throw new Error('Bad or missing --resourceGroup');
    if (!args.connectionString || args.connectionString.length == 0)
        throw new Error('Bad or missing --connectionString');
    if (!args.container || args.container.length == 0)
        throw new Error('Bad or missing --container');
    let services = [];
    let service = new botframework_config_1.BlobStorageService({
        name: args.hasOwnProperty('name') ? args.name : args.serviceName,
        serviceName: args.serviceName,
        tenantId: args.tenantId,
        subscriptionId: args.subscriptionId,
        resourceGroup: args.resourceGroup,
        connectionString: args.connectionString,
        container: args.container
    });
    let id = config.connectService(service);
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
//# sourceMappingURL=msbot-connect-blob.js.map