/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
import { BotConfiguration, IConnectedService } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as process from 'process';

program.Command.prototype.unknownOption = (): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${process.argv.slice(2).join(' ')}`));
    showErrorHelp();
};

interface IListArgs {
    bot: string;
    secret: string;
    service: string;
    args: string[];
    [key: string]: string | string[];
}

program
    .name('msbot get <serviceNameOrId>')
    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .action((cmd: program.Command, actions: program.Command) => undefined);

const args = <IListArgs><any>program.parse(process.argv);

if (!args.bot) {
    BotConfiguration.loadBotFromFolder(process.cwd(), args.secret)
        .then(processListArgs)
        .catch((reason: Error) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
} else {
    BotConfiguration.load(args.bot, args.secret)
        .then(processListArgs)
        .catch((reason: Error) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
}

async function processListArgs(config: BotConfiguration): Promise<BotConfiguration> {

    if (args.args.length < 2) {
        throw new Error('missing the service id or name');
    }
    const nameOrId: string = args.args[0];
    const service: IConnectedService = config.findServiceByNameOrId(nameOrId);
    if (service == null) {
        throw new Error(`${nameOrId} was not found in ${config.getPath()}`);
    }
    console.log(JSON.stringify(service, null, 4));

    return config;
}

function showErrorHelp(): void {
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
}
