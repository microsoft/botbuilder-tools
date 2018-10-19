/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import { BotConfiguration, ILuisService, LuisService } from 'botframework-config';
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

interface IConnectLuisArgs extends ILuisService {
    bot: string;
    secret: string;
    stdin: boolean;
    input?: string;
}

program
    .name('msbot connect luis')
    .description('Connect the bot to a LUIS application')
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
const args: IConnectLuisArgs = <IConnectLuisArgs>{};
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
            .then(processConnectLuisArgs)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    } else {
        BotConfiguration.load(args.bot, args.secret)
            .then(processConnectLuisArgs)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    }
}

async function processConnectLuisArgs(config: BotConfiguration): Promise<BotConfiguration> {

    args.name = args.hasOwnProperty('name') ? args.name : config.name;

    if (args.stdin) {
        Object.assign(args, JSON.parse(await getStdin()));
    } else if (args.input) {
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

    if (!args.authoringKey || !uuidValidate(args.authoringKey)) {
        throw new Error('bad or missing --authoringKey');
    }

    if (!args.region || args.region.length === 0) {
        args.region = 'westus';
    }

    //if (!args.subscriptionKey || !uuidValidate(args.subscriptionKey))
    //    throw new Error("bad or missing --subscriptionKey");

    // add the service
    const newService: LuisService = new LuisService({
        name: args.name,
        appId: args.appId,
        version: args.version,
        authoringKey: args.authoringKey,
        subscriptionKey: args.subscriptionKey,
        region: args.region
    });
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
