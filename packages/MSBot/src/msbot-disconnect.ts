/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import { BotConfiguration, IConnectedService } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`[msbot] Unknown arguments: ${flag}`));
    showErrorHelp();
};

interface IDisconnectServiceArgs {
    bot: string;
    idOrName: string;
    secret: string;
    [key: string]: string;
}

program
    .name('msbot disconnect')
    .arguments('<service_id_or_Name>')
    .description('disconnect a connected service by id or name')
    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .action((idOrName: program.Command, actions: program.Command) => {
        actions.idOrName = idOrName;
    });

const command: program.Command = program.parse(process.argv);
const args: IDisconnectServiceArgs = <IDisconnectServiceArgs>{};
Object.assign(args, command);

if (process.argv.length < 3) {
    program.help();
} else {
    if (!args.bot) {
        BotConfiguration.loadBotFromFolder(process.cwd(), args.secret)
            .then(processDisconnectArgs)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(`[msbot] ${reason.toString().split('\n')[0]}`));
                showErrorHelp();
            });
    } else {
        BotConfiguration.load(args.bot, args.secret)
            .then(processDisconnectArgs)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(`[msbot] ${reason.toString().split('\n')[0]}`));
                showErrorHelp();
            });
    }
}

async function processDisconnectArgs(config: BotConfiguration): Promise<BotConfiguration> {
    if (!args.idOrName) {
        throw new Error('missing id or name of service to disconnect');
    }

    const removedService: IConnectedService = config.disconnectServiceByNameOrId(args.idOrName);
    if (removedService != null) {
        await config.save(args.secret);
        process.stdout.write(`Disconnected ${removedService.type}:${removedService.name} ${removedService.id}`);
    }

    return config;
}

function showErrorHelp(): void {
    program.outputHelp((str: string) => {
        console.error(`[msbot] ${str}`);

        return '';
    });
    process.exit(1);
}
