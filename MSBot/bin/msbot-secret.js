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
    .option('--secret <secret>', 'secret used to encrypt service keys')
    .option('-c, --clear', 'clear the secret and store keys unencrypted')
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
    if (args.clear) {
        config.clearSecret();
        delete args.secret;
    }
    await config.save(undefined, args.secret);
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