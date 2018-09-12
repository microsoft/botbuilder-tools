/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import { BotConfiguration, BotRecipe, IConnectedService } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as process from 'process';

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    program.help();
};

interface IExportArgs {
    bot: string;
    folder: string;
    secret: string;
    quiet: boolean;
    verbose: boolean;
    args: string[];
}

program
    .name('msbot export services')
    .description('export all of the connected services to local folder with .bot.recipe file to support cloning')
    .option('-f, --folder <folder>', 'path to folder to place exported resources')
    .option('--verbose', 'show verbose export information')
    .option('-q, --quiet', 'disable output')
    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .action((cmd: program.Command, actions: program.Command) => undefined);
program.parse(process.argv);

const command: program.Command = program.parse(process.argv);
const args: IExportArgs = <IExportArgs>{};
Object.assign(args, command);

if (!args.bot) {
    BotConfiguration.loadBotFromFolder(process.cwd(), args.secret)
        .then(processConfiguration)
        .catch((reason: Error) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
} else {
    BotConfiguration.load(args.bot, args.secret)
        .then(processConfiguration)
        .catch((reason: Error) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
}

async function processConfiguration(config: BotConfiguration): Promise<void> {
    if (!args.folder) {
        throw new Error('missing --folder argument');
    }
    try {

        const recipe: BotRecipe = await config.export(args.folder, {
            progress: (service: IConnectedService, newCommand: string, index: number, total: number): void => {
                if (!args.quiet) {
                    const output: string = `exporting ${chalk.default.bold(service.name)} [${service.type}] (${index}/${total})`;
                    if (args.verbose) {
                        console.warn(chalk.default.bold(`[msbot] ${output}`));
                        console.log(chalk.default.italic(`[msbot] ${newCommand}\n`));
                    } else {
                        console.warn(`[msbot] ${output}`);
                    }
                }
            }
        });
    } catch (error) {
        const lines: string[] = error.message.split('\n');
        for (const line of lines) {
            // trim to copywrite symbol, help from inner process command line args is inappropriate
            if (line.indexOf('©') > 0) {
                process.exit(1); }
            console.error(chalk.default.redBright(line));
        }
    }

}

function showErrorHelp(): void {
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
}
