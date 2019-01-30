/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import { BotConfiguration, IDispatchService, ServiceTypes } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as getStdin from 'get-stdin';
import * as txtfile from 'read-text-file';
import { stdoutAsync } from './stdioAsync';

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    showErrorHelp();
};

interface IDispatchArgs extends IDispatchService {
    bot: string;
    secret: string;
    stdin: boolean;
    input?: string;
    ids?: string;
}

program
    .name('msbot update dispatch')
    .description('update the bot to a dispatch model (--id or --appId is required)')
    .option('--id <id>', 'service id')
    .option('-n, --name <name>', 'name for the dispatch')
    .option('-a, --appId <appid>', 'LUID AppId for the dispatch app')
    .option('--version <version>', 'version for the dispatch app, (example: 0.1)')
    .option('--authoringKey <authoringkey>', 'authoring key for using manipulating the dispatch model via the LUIS authoring API\n')
    .option('r, --region <region>', 'region to use (defaults to westus)')
    .option('--subscriptionKey <subscriptionKey>', '(OPTIONAL) subscription key used for querying the dispatch model')
    .option('--ids <ids>',
        '(OPTIONAL) comma delimited list of service ids in this bot (qna or luis) to build a dispatch model over.')

    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--input <jsonfile>', 'path to arguments in JSON format { id:\'\',name:\'\', ... }')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .option('--stdin', 'arguments are passed in as JSON object via stdin')
    .option('--prefix', 'Append [msbot] prefix to all messages')
    .action((cmd: program.Command, actions: program.Command) => undefined);

const command: program.Command = program.parse(process.argv);
const args: IDispatchArgs = <IDispatchArgs>{};
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
    } else if (args.input != null) {
        Object.assign(args, JSON.parse(await txtfile.read(<string>args.input)));
    }

    if (!args.id && !args.appId) {
        throw new Error('requires --id or --appId');
    }

    if (args.version) {
        args.version = args.version.toString();
    }

    if (args.ids && args.ids.length > 0) {
        args.serviceIds = args.ids.split(',');
    }

    for (const service of config.services) {
        if (service.type === ServiceTypes.Dispatch) {
            const dispatchService = <IDispatchService>service;
            if (dispatchService.id === args.id || dispatchService.appId === args.appId) {
                if (args.hasOwnProperty('name'))
                    dispatchService.name = args.name;
                if (args.appId)
                    dispatchService.appId = args.appId;
                if (args.subscriptionKey)
                    dispatchService.subscriptionKey = args.subscriptionKey;
                if (args.authoringKey)
                    dispatchService.authoringKey = args.authoringKey;
                if (args.region)
                    dispatchService.region = args.region;
                if (args.serviceIds)
                    dispatchService.serviceIds = args.serviceIds;
                await config.save(args.secret);
                await stdoutAsync(JSON.stringify(dispatchService, null, 2));
                return config;
            }
        }
    }
    throw new Error(`Dispatch Service ${args.appId} was not found in the bot file`);
}

function showErrorHelp(): void {
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
}
