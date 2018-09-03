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
    console.error(chalk.default.redBright(`Unknown arguments: ${process.argv.slice(2).join(' ')}`));
    program.help();
};

interface ExportArgs {
    bot: string;
    folder: string;
    secret: string;
    quiet: boolean;
    verbose: boolean;
    args: string[];
}

program
    .name('msbot export')
    .description('export all of the connected services to local folder with .bot.recipe file to support cloning')
    .option('-f, --folder <folder>', 'path to folder to place exported resources')
    .option('--verbose', 'show verbose export information')
    .option('-q, --quiet', 'disable output')
    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .action((cmd, actions) => undefined);
program.parse(process.argv);

let args = <ExportArgs><any>program.parse(process.argv);

if (!args.bot) {
    BotConfiguration.loadBotFromFolder(process.cwd(), args.secret)
        .then(processConfiguration)
        .catch((reason) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
} else {
    BotConfiguration.load(args.bot, args.secret)
        .then(processConfiguration)
        .catch((reason) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
}

async function processConfiguration(config: BotConfiguration): Promise<void> {
    if (!args.folder) {
        throw new Error('missing --folder argument');
    }
    try {

        let recipe = await config.export(args.folder, (service, command, index, total) => {
            if (!args.quiet) {
                let output = `exporting ${chalk.default.bold(service.name)} [${service.type}] (${index}/${total})`;
                if (args.verbose) {
                    console.warn(chalk.default.bold(output));
                    console.log(chalk.default.italic(command + '\n'));
                } else {
                    console.warn(output);
                }
            }
        });
    } catch (error) {
        let lines = error.message.split('\n');
        let message = '';
        for (let line of lines) {
            // trim to copywrite symbol, help from inner process command line args is inappropriate
            if (line.indexOf('©') > 0)
                process.exit(1);
            console.error(chalk.default.redBright(line));
        }
    }

}

function showErrorHelp() {
    program.outputHelp((str) => {
        console.error(str);
        return '';
    });
    process.exit(1);
}