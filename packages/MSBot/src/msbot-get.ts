/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
import { BotConfiguration } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as process from 'process';

program.Command.prototype.unknownOption = function (flag: any) {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    showErrorHelp();
};

interface ListArgs {
    bot: string;
    secret: string;
    service: string;
    args: string[];
}

program
    .name('msbot get <serviceNameOrId>')
    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .action((cmd, actions) => {
    });

let args = <ListArgs><any>program.parse(process.argv);

if (!args.bot) {
    BotConfiguration.loadBotFromFolder(process.cwd(), args.secret)
        .then(processListArgs)
        .catch((reason) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
} else {
    BotConfiguration.load(args.bot, args.secret)
        .then(processListArgs)
        .catch((reason) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
}


async function processListArgs(config: BotConfiguration): Promise<BotConfiguration> {

    if (args.args.length < 2) {
        throw new Error('missing the service id or name');
    }
    let nameOrId = args.args[0];
    var service = config.findServiceByNameOrId(nameOrId);
    if (service == null) {
        throw new Error(`${nameOrId} was not found in ${config.getPath()}`);
    }
    console.log(JSON.stringify(service, null, 4));
    return config;
}

function showErrorHelp()
{
    program.outputHelp((str) => {
        console.error(str);
        return '';
    });
    process.exit(1);
}