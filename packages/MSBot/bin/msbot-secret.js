"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
const botframework_config_1 = require("botframework-config");
const chalk = require("chalk");
const program = require("commander");
program.Command.prototype.unknownOption = function (flag) {
    console.error(chalk.default.redBright(`Unknown arguments: ${process.argv.slice(2).join(' ')}`));
    showErrorHelp();
};
program
    .name('msbot secret')
    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--secret <secret>', 'secret used to confirm you can do secret operations')
    .option('-c, --clear', 'clear the secret and store keys unencrypted')
    .option('-n, --new', 'generate a new secret and store keys encrypted')
    .action((name, x) => {
    console.log(name);
});
let args = program.parse(process.argv);
if (process.argv.length < 3) {
    showErrorHelp();
}
else {
    if (!args.bot) {
        botframework_config_1.BotConfiguration.loadBotFromFolder(process.cwd(), args.secret)
            .then(processSecret)
            .catch((reason) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
    }
    else {
        botframework_config_1.BotConfiguration.load(args.bot, args.secret)
            .then(processSecret)
            .catch((reason) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
    }
}
async function processSecret(config) {
    if (!args.clear && !args.new) {
        throw new Error('missing --clear and/or --new switches');
    }
    if (args.new) {
        config.clearSecret();
        args.secret = botframework_config_1.BotConfiguration.generateKey();
        console.log(`Your bot is encrypted with secret:\n${args.secret}\n\nPlease save this secret in a secure place to keep your keys safe.`);
    }
    else if (args.clear) {
        config.clearSecret();
        console.log('Your bot file and keys are now unencrypted');
        delete args.secret;
    }
    await config.save(args.secret);
    return config;
}
function showErrorHelp() {
    program.outputHelp((str) => {
        console.error(str);
        return '';
    });
    process.exit(1);
}
//# sourceMappingURL=msbot-secret.js.map