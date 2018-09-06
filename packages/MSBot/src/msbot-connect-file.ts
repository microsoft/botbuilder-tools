/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
import { BotConfiguration, FileService, IFileService } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as path from 'path';

program.Command.prototype.unknownOption = function (): void {
    console.error(chalk.default.redBright(`Unknown arguments: ${process.argv.slice(2).join(' ')}`));
    showErrorHelp();
};

interface IConnectFileArgs extends IFileService {
    bot: string;
    file: string;
    secret: string;
}

program
    .name('msbot connect file')
    .description('Connect a file to the bot')
    .option('-n, --name <name>', 'name of the file service')
    .option('-f, --file <file>', 'path to file to connect to')
    .option('-b, --bot <bot>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .action((filePath: program.Command, actions: program.Command) => {
        if (filePath) {
            actions.filePath = filePath; }
    });

const commands: program.Command = program.parse(process.argv);
const args: IConnectFileArgs = {
    bot: '',
    secret: '',
    path: '',
    name: ''
};

Object.assign(args, commands);

if (process.argv.length < 3) {
    program.help();
} else {
    if (!args.bot) {
        BotConfiguration.loadBotFromFolder(process.cwd(), args.secret)
            .then(processConnectFile)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    } else {
        BotConfiguration.load(args.bot, args.secret)
            .then(processConnectFile)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    }
}

async function processConnectFile(config: BotConfiguration): Promise<BotConfiguration> {
    if (!args.path && !args.file)
        throw new Error('missing --file');

    // add the service
    const newService = new FileService({
        name: path.basename(args.file || args.path),
        path: (args.file || args.path).replace('\\','/')
    } as IFileService);
    const id = config.connectService(newService);
    await config.save(args.secret);
    process.stdout.write(JSON.stringify(config.findService(id), null, 2));

    return config;
}

function showErrorHelp(): void {
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
}
