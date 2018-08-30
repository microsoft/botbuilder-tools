/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
import { BotConfiguration, EndpointService } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as fsx from 'fs-extra';
import * as readline from 'readline-sync';

program.Command.prototype.unknownOption = function (flag: any) {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    program.help();
};

interface InitArgs {
    name: string;
    description: string;
    secret: boolean;
    endpoint: string;
    appId: string;
    appPassword: string;
    quiet: boolean;
}

program
    .name('msbot init')
    .option('-n, --name <name>', 'name of the bot')
    .option('-a, --appId  <appid>', 'Microsoft AppId used for auth with the endpoint')
    .option('-p, --appPassword <password>', 'Microsoft app password used for auth with the endpoint')
    .option('-e, --endpoint <endpoint>', 'local endpoint for the bot')
    .option('--secret', 'generate a secret and encrypt service keys with it')
    .option('-q, --quiet', 'do not prompt')
    .action((name, x) => {
        console.log(name);
    });

let args: InitArgs = <InitArgs><any>program.parse(process.argv);

if (!args.quiet) {

    let exists = fsx.existsSync(`${args.name}.bot`);
    while (((!args.hasOwnProperty('name') || args.name.length == 0)) || exists) {
        if (exists)
            console.log(`${args.name}.bot already exists`);
        args.name = readline.question(`What name would you like for your bot? `);
        exists = fsx.existsSync(`${args.name}.bot`);
    }

    while (!args.endpoint || args.endpoint.length == 0) {
        args.endpoint = readline.question(`What localhost endpoint does your bot use for debugging [Example: http://localhost:3978/api/messages]? `, {
            defaultInput: `http://localhost:3978/api/messages`
        });
    }

    if (!args.appId || args.appId.length == 0) {
        const answer = readline.question(`Do you have an appId for endpoint? [no] `, {
            defaultInput: 'no'
        });
        if (answer == 'y' || answer == 'yes') {
            args.appId = readline.question(`What is your appId for ${args.endpoint}? [none] `, {
                defaultInput: ''
            });
        }
    }

    while (args.appId && args.appId.length > 0 && (!args.appPassword || args.appPassword.length == 0)) {
        args.appPassword = readline.question(`What is your appPassword for ${args.endpoint}? `, {
            defaultInput: ''
        });
    }

    if (!args.secret) {
        const answer = readline.question(`=== Your bot file contains service keys and we strongly recommend you encrypt them to keep them safe. ===\nWould you like to encrypt your keys with a secret? [yes] `, {
            defaultInput: 'yes'
        });
        args.secret = answer == 'y' || answer == 'yes';
    }
}

let secret: string | undefined;

if (args.secret) {
    secret = BotConfiguration.generateKey();
}

if (!args.name) {
    console.error('missing --name argument');
}
else {
    const bot = new BotConfiguration();
    bot.name = args.name;
    bot.description = args.desc;

    bot.connectService(new EndpointService({
        name: args.name,
        endpoint: args.endpoint,
        appId: args.appId || '',
        appPassword: args.appPassword || ''
    }));

    let filename = bot.name + '.bot';
    bot.saveAs(filename, secret);
    let result = {
        status: 'OK',
        file: filename,
        secret: secret
    };
    if (args.quiet)
        console.log(JSON.stringify(result, null, 2));
    else {
        console.log(`created ${filename}`);
        if (secret) {
            console.log(`Your bot is encrypted with secret:\n${secret}\n\nPlease save this secret in a secure place to keep your keys safe.`);
        }
    }
}
