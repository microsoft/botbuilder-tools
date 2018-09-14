/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import { BotConfiguration, IBlobStorageService, ServiceTypes } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as getStdin from 'get-stdin';
import * as txtfile from 'read-text-file';

import { showMessage } from './utils';
require('log-prefix')(() => showMessage('%s'));
program.option('--verbose', 'Add [msbot] prefix to all messages');

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    showErrorHelp();
};

interface IBlobArgs extends IBlobStorageService {
    bot: string;
    secret: string;
    stdin: boolean;
    input?: string;
}

program
    .name('msbot update blob')
    .description('update the bot to Azure Blob Storage Service')
    .option('-n, --name <name>', 'friendly name (defaults to serviceName)')
    .option('--serviceName <serviceName>', 'Azure service name')
    .option('--connectionString <connectionString>', 'Blob storage connection string')
    .option('-c, --container <container>', 'blob container name')

    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--input <jsonfile>', 'path to arguments in JSON format { id:\'\',name:\'\', ... }')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .option('--stdin', 'arguments are passed in as JSON object via stdin')
    .action((cmd: program.Command, actions: program.Command) => undefined);

const command: program.Command = program.parse(process.argv);
const args: IBlobArgs = <IBlobArgs>{};
Object.assign(args, command);

if (args.stdin) {
    //force verbosity output if args are passed via stdin
    process.env.VERBOSE = 'verbose';
}

if (process.argv.length < 3) {
    program.help();
} else {
    if (!args.bot) {
        BotConfiguration.loadBotFromFolder(process.cwd(), args.secret)
            .then(processUpdateArgs)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    } else {
        BotConfiguration.load(args.bot, args.secret)
            .then(processUpdateArgs)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    }
}

async function processUpdateArgs(config: BotConfiguration): Promise<BotConfiguration> {
    if (args.stdin) {
        Object.assign(args, JSON.parse(await getStdin()));
    } else if (args.input != null) {
        Object.assign(args, JSON.parse(await txtfile.read(<string>args.input)));
    }

    if (!args.serviceName || args.serviceName.length === 0) {
        throw new Error('Bad or missing --serviceName');
    }

    for (const service of config.services) {
        if (service.type === ServiceTypes.BlobStorage) {
            const blobService = <IBlobStorageService>service;
            if (blobService.serviceName === args.serviceName) {
                if (args.connectionString) {
                    blobService.connectionString = args.connectionString;
                }
                if (args.hasOwnProperty('name')) {
                    blobService.name = args.name;
                }
                if (args.container) {
                    blobService.container = args.container;
                }
                await config.save(args.secret);
                process.stdout.write(JSON.stringify(blobService, null, 2));
                return config;
            }
        }
    }
    throw new Error(`Blob service ${args.serviceName} was not found in the bot file`);
}

function showErrorHelp(): void {
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
}
