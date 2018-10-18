/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import { BotConfiguration, FileService, IFileService } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as path from 'path';
import { stdoutAsync } from './stdioAsync';

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
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
    .option('-p, --path <path>', 'path to file to connect to')
    .option('-b, --bot <bot>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .option('--prefix', 'Append [msbot] prefix to all messages')
    .action((filePath: program.Command, actions: program.Command) => {
        if (filePath) {
            actions.filePath = filePath;
        }
    });

const command: program.Command = program.parse(process.argv);
const args: IConnectFileArgs = <IConnectFileArgs>{};
Object.assign(args, command);

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
    if (!args.path && !args.file) {
        throw new Error('missing --file'); }

    // add the service
    const newService: FileService = new FileService({
        name: path.basename(args.file || args.path),
        path: (args.file || args.path).replace('\\', '/')
    } as IFileService);
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
