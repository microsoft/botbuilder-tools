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
    [key: string]: string;
}

program
    .name('msbot list')
    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .action((cmd: program.Command, actions: program.Command) => undefined);

const args: IListArgs = {
    bot: '',
    secret: ''
};

const commands: program.Command = program.parse(process.argv);
for (const i of commands.args) {
    if (args.hasOwnProperty(i)) {
        args[i] = commands[i];
    }
}

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
    const services: IConnectedService[] = config.services;

    console.log(JSON.stringify(config, null, 4));

    return config;
}

function showErrorHelp(): void {
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
}
