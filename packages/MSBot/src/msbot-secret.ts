/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import { BotConfiguration } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    showErrorHelp();
};

interface ISecretArgs {
    bot: string;
    secret: string;
    clear: boolean;
    new: boolean;
    [key: string]: string | boolean;
}

program
    .name('msbot secret')
    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--secret <secret>', 'secret used to confirm you can do secret operations')
    .option('-c, --clear', 'clear the secret and store keys unencrypted')
    .option('-n, --new', 'generate a new secret and store keys encrypted')
    .option('--prefix', 'Append [msbot] prefix to all messages')
    .action((cmd: program.Command, actions: program.Command) => undefined);

const command: program.Command = program.parse(process.argv);
const args: ISecretArgs = <ISecretArgs>{};
Object.assign(args, command);

if (process.argv.length < 3) {
    showErrorHelp();
} else {
    if (!args.bot) {
        BotConfiguration.loadBotFromFolder(process.cwd(), args.secret)
            .then(processSecret)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    } else {
        BotConfiguration.load(args.bot, args.secret)
            .then(processSecret)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    }
}

async function processSecret(config: BotConfiguration): Promise<BotConfiguration> {
    if (!args.clear && !args.new) {
        throw new Error('missing --clear and/or --new switches');
    }

    if (args.new) {
        config.clearSecret();
        args.secret = BotConfiguration.generateKey();
        console.log(
            `Your bot is encrypted with secret:\n${args.secret}\n\nPlease save this secret in a secure place to keep your keys safe.`);
    } else if (args.clear) {
        config.clearSecret();
        console.log('Your bot file and keys are now unencrypted');
        delete args.secret;
    }

    await config.save(args.secret);

    return config;
}

function showErrorHelp(): void {
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
}
