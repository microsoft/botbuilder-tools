/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import { BotConfiguration, DispatchService, IConnectedService, IDispatchService } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as getStdin from 'get-stdin';
import * as txtfile from 'read-text-file';
import { stdoutAsync } from './stdioAsync';
import { uuidValidate } from './utils';

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    showErrorHelp();
};

interface IConnectDispatchArgs extends IDispatchService {
    bot: string;
    secret: string;
    stdin: boolean;
    input?: string;
    ids?: string;
    services: IConnectedService[];
}

program
    .name('msbot connect dispatch')
    .description('Connect the bot to a dispatch model')
    .option('-n, --name <name>', 'name for the dispatch')
    .option('-a, --appId <appid>', 'LUID AppId for the dispatch app')
    .option('--version <version>', 'version for the dispatch app, (example: 0.1)')
    .option('--authoringKey <authoringkey>', 'authoring key for using manipulating the dispatch model via the LUIS authoring API\n')
    .option('r, --region <region>', 'region to use (defaults to westus)')
    .option('--subscriptionKey <subscriptionKey>', '(OPTIONAL) subscription key used for querying the dispatch model')
    .option('--ids <ids>', '(OPTIONAL) comma delimited list of service ids in this bot (qna or luis) to build a dispatch model over.')

    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--input <jsonfile>', 'path to arguments in JSON format { id:\'\',name:\'\', ... }')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .option('--stdin', 'arguments are passed in as JSON object via stdin')
    .option('--prefix', 'Append [msbot] prefix to all messages')
    .action((cmd: program.Command, actions: program.Command) => undefined);

const command: program.Command = program.parse(process.argv);
const args: IConnectDispatchArgs = <IConnectDispatchArgs>{};
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
            .then(processConnectDispatch)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    } else {
        BotConfiguration.load(args.bot, args.secret)
            .then(processConnectDispatch)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    }
}

async function processConnectDispatch(config: BotConfiguration): Promise<BotConfiguration> {
    args.name = args.hasOwnProperty('name') ? args.name : config.name;

    if (args.stdin) {
        Object.assign(args, JSON.parse(await getStdin()));
    } else if (args.input != null) {
        Object.assign(args, JSON.parse(await txtfile.read(<string>args.input)));
    }

    if (!args.hasOwnProperty('name')) {
        throw new Error('Bad or missing --name');
    }

    if (!args.appId || !uuidValidate(args.appId)) {
        throw new Error('bad or missing --appId');
    }

    if (!args.version) {
        throw new Error('bad or missing --version');
    }
    args.version = args.version.toString();

    if (!args.authoringKey || !uuidValidate(args.authoringKey)) {
        throw new Error('bad or missing --authoringKey');
    }

    if (args.subscriptionKey && !uuidValidate(args.subscriptionKey)) {
        throw new Error('bad --subscriptionKey');
    }

    if (args.ids && args.ids.length > 0) {
        args.serviceIds = args.ids.split(',');
    }

    if (args.services) {
        let botConfig2 = BotConfiguration.fromJSON({ services: args.services });

        for (let service of botConfig2.services) {
            if (service.id) {
                if (!config.findService(service.id)) {
                    config.services.push(service);
                }
            }
        }
    }

    const newService = new DispatchService({
        name: args.name,
        appId: args.appId,
        authoringKey: args.authoringKey,
        subscriptionKey: args.subscriptionKey,
        version: args.version,
        region: args.region,
        serviceIds: args.serviceIds
    });

    // add the service
    const id: string = config.connectService(newService);
    await config.save(args.secret);
    await stdoutAsync(JSON.stringify(config.findService(id), null, 2));
    return config;
}

function showErrorHelp(): void {
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
}

interface ITempDispatchService extends IDispatchService {
    [key: string]: string | string[] | undefined | boolean | IConnectedService[];
}
