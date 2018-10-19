/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import { BotConfiguration, IQnAService, ServiceTypes } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as getStdin from 'get-stdin';
import * as txtfile from 'read-text-file';
import { stdoutAsync } from './stdioAsync';

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    showErrorHelp();
};

interface IQnaArgs extends IQnAService {
    bot: string;
    secret: string;
    stdin: boolean;
    input?: string;
    [key: string]: string | boolean | undefined;
}

program
    .name('msbot update qna')
    .description('update the bot to a QnA knowledgebase (--id or --kbId is required)')
    .option('--id <id>', 'service id')
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
const args: IQnaArgs = <IQnaArgs>{};
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

    if (!args.id && !args.kbId) {
        throw new Error('requires --id or --kbId');
    }

    for (const service of config.services) {
        if (service.type === ServiceTypes.QnA) {
            const qnaService = <IQnAService>service;
            if (qnaService.id === args.id || qnaService.kbId === args.kbId) {
                if (args.hasOwnProperty('name'))
                    qnaService.name = args.name;
                if (args.kbId)
                    qnaService.kbId = args.kbId;
                if (args.subscriptionKey)
                    qnaService.subscriptionKey = args.subscriptionKey;
                if (args.endpointKey)
                    qnaService.endpointKey = args.endpointKey;
                if (args.hostname)
                    qnaService.hostname = args.hostname;
                await config.save(args.secret);
                await stdoutAsync(JSON.stringify(qnaService, null, 2));
                return config;
            }
        }
    }
    throw new Error(`QnaMaker Service ${args.kbId} was not found in the bot file`);
}

function showErrorHelp(): void {
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
}
