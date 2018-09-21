/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import { BotConfiguration, IQnAService, QnaMakerService } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as getStdin from 'get-stdin';
import * as txtfile from 'read-text-file';
import * as validurl from 'valid-url';
import { stdoutAsync } from './stdioAsync';
import { uuidValidate } from './utils';

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    showErrorHelp();
};

interface IConnectQnaArgs extends IQnAService {
    bot: string;
    secret: string;
    stdin: boolean;
    input?: string;
    [key: string]: string | boolean | undefined;
}

program
    .name('msbot connect qna')
    .description('Connect the bot to a QnA knowledgebase')
    .option('-n, --name <name>', 'name for the QNA knowledgebase')
    .option('-k, --kbId <kbId>', 'QnA Knowledgebase Id ')
    .option('--subscriptionKey <subscriptionKey>',
            'Azure Cognitive Service subscriptionKey/accessKey for calling the QnA management API (from azure portal)')
    .option('--endpointKey <endpointKey>',
            'endpointKey for calling the QnA service (from https://qnamaker.ai portal or qnamaker list endpointkeys command)')
    .option('--hostname <url>', 'url for private QnA service (example: https://myqna.azurewebsites.net)')

    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--input <jsonfile>', 'path to arguments in JSON format { id:\'\',name:\'\', ... }')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .option('--stdin', 'arguments are passed in as JSON object via stdin')
    .option('--prefix', 'Append [msbot] prefix to all messages')
    .action((cmd: program.Command, actions: program.Command) => undefined);

const command: program.Command = program.parse(process.argv);
const args: IConnectQnaArgs = <IConnectQnaArgs>{};
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
            .then(processConnectQnaArgs)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    } else {
        BotConfiguration.load(args.bot, args.secret)
            .then(processConnectQnaArgs)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    }
}

async function processConnectQnaArgs(config: BotConfiguration): Promise<BotConfiguration> {
    args.name = args.hasOwnProperty('name') ? args.name : config.name;

    if (args.stdin) {
        Object.assign(args, JSON.parse(await getStdin()));
    } else if (args.input != null) {
        Object.assign(args, JSON.parse(await txtfile.read(<string>args.input)));
    }

    if (!args.kbId || !uuidValidate(args.kbId)) {
        throw new Error('bad or missing --kbId');
    }

    if (!args.hasOwnProperty('name')) {
        throw new Error('missing --name');
    }

    if (!args.subscriptionKey || !uuidValidate(args.subscriptionKey)) {
        throw new Error('bad or missing --subscriptionKey');
        }
    if (!args.endpointKey || !uuidValidate(args.endpointKey)) {
        throw new Error('bad or missing --endpointKey');
        }
    if (!args.hostname || !validurl.isWebUri(args.hostname)) {
        throw new Error('bad or missing --hostname');
        }

    // add the service
    const newService: QnaMakerService = new QnaMakerService({
        name: args.name,
        kbId: args.kbId,
        subscriptionKey: args.subscriptionKey,
        endpointKey: args.endpointKey,
        hostname: args.hostname
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
