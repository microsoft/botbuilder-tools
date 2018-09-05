/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
import { BotConfiguration, GenericService, IGenericService } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';

program.Command.prototype.unknownOption = function (flag: any) {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    showErrorHelp();
};

interface ConnectGenericArgs extends IGenericService  {
    bot: string;
    secret: string;
    stdin: boolean;
    input?: string;
    keys: string;
}

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

let args = <ConnectGenericArgs><any>program.parse(process.argv);

if (process.argv.length < 3) {
    program.help();
} else {
    if (!args.bot) {
        BotConfiguration.loadBotFromFolder(process.cwd(), args.secret)
            .then(processConnectFile)
            .catch((reason) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    } else {
        BotConfiguration.load(args.bot, args.secret)
            .then(processConnectFile)
            .catch((reason) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    }
}

async function processConnectFile(config: BotConfiguration): Promise<BotConfiguration> {
    args.name = args.hasOwnProperty('name') ? args.name : config.name;

    if (!args.url)
        throw new Error('mising --url');

    if (!args.configuration) {
        args.configuration = {};
        if (args.keys) {
            let keys = JSON.parse(args.keys);
            for (let key in keys) {
                args.configuration[key] = keys[key].toString();
            }
        }
    }

    // add the service
    let newService = new GenericService({
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