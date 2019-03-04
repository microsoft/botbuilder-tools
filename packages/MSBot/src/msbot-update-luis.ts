/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import { BotConfiguration, ILuisService, ServiceTypes } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as getStdin from 'get-stdin';
import * as txtfile from 'read-text-file';
import { stdoutAsync } from './stdioAsync';

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    showErrorHelp();
};

interface ILuisArgs extends ILuisService {
    bot: string;
    secret: string;
    stdin: boolean;
    input?: string;
}

program
    .name('msbot update luis')
    .description('update the bot to a LUIS application (--id or --appId is required)')
    .option('--id <id>', 'service id')
    .option('-n, --name <name>', 'name for the LUIS app')
    .option('-a, --appId <appid>', 'AppId for the LUIS App')
    .option('--version <version>', 'version for the LUIS App, (example: v0.1)')
    .option('-r, --region <region>', 'region for the LUIS App, (default:westus)')
    .option('--authoringKey <authoringkey>',
            'authoring key for using manipulating LUIS apps via the authoring API (See http://aka.ms/luiskeys for help)')
    .option('--subscriptionKey <subscriptionKey>', '(OPTIONAL) subscription key used for querying a LUIS model\n')

    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--input <jsonfile>', 'path to arguments in JSON format { id:\'\',name:\'\', ... }')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .option('--stdin', 'arguments are passed in as JSON object via stdin')
    .option('--prefix', 'Append [msbot] prefix to all messages')
    .action((cmd: program.Command, actions: program.Command) => undefined);

const command: program.Command = program.parse(process.argv);
const args: ILuisArgs = <ILuisArgs>{};
Object.assign(args, command);

if (args.stdin) {
    //force verbosity output if args are passed via stdin
    process.env.PREFIX = 'prefix';
}

if (process.argv.length < 3) {
    program.help();
} else {
    if (!args.bot) {
        BotConfiguration.loadBotFromFolder(process.cwd(), args.secret)
            .then(processArgs)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    } else {
        BotConfiguration.load(args.bot, args.secret)
            .then(processArgs)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    }
}

async function processArgs(config: BotConfiguration): Promise<BotConfiguration> {
    if (args.stdin) {
        Object.assign(args, JSON.parse(await getStdin()));
    } else if (args.input) {
        Object.assign(args, JSON.parse(await txtfile.read(<string>args.input)));
    }

    if (!args.id && !args.appId) {
        throw new Error('requires --id or --appId');
    }

    for (const service of config.services) {
        if (service.type === ServiceTypes.Luis) {
            const luisService = <ILuisService>service;
            if (luisService.id === args.id || luisService.appId === args.appId) {
                if (args.hasOwnProperty('name'))
                    luisService.name = args.name;
                if (args.appId)
                    luisService.appId = args.appId;
                if (args.subscriptionKey)
                    luisService.subscriptionKey = args.subscriptionKey;
                if (args.authoringKey)
                    luisService.authoringKey = args.authoringKey;
                if (args.region)
                    luisService.region = args.region;
                if (args.version)
                    luisService.version = args.version;
                await config.save(args.secret);
                await stdoutAsync(JSON.stringify(luisService, null, 2));
                return config;
            }
        }
    }
    throw new Error(`LUIS Service ${args.appId} was not found in the bot file`);
}

function showErrorHelp(): void {
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
}
