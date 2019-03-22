/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import * as chalk from 'chalk';
import * as child_process from 'child_process';
import * as program from 'commander';
import * as fs from 'fs';
import * as process from 'process';
import * as util from 'util';
import { spawnAsync } from './processUtils';
const Table = require('cli-table3');
const opn = require('opn');
const commandExistsSync = require('command-exists').sync;
const exec = util.promisify(child_process.exec);

const BOTSERVICEMINVERSION = '(0.4.3)';
const AZCLIMINVERSION = '(2.0.52)'; // This corresponds to the AZ CLI version that shipped in line with Bot Builder 4.2 release (December 2018).
// Bot service extension 0.4.2 requires AZ CLI version >= 2.0.46.

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    program.help();
};

interface ICreateArgs {
    name: string;
    folder: string;
    location: string;
    subscriptionName: string;
    subscriptionId: string;
    tenantId: string;
    groupName: string;
    secret: string;
    quiet: boolean;
    verbose: boolean;
    insightsRegion: string;
    qnaSubscriptionKey: string;
    sdkVersion: string;
    sdkLanguage: string;
    appId: string;
    appSecret: string;
    args: string[];
    force: boolean;
    decorate: boolean;
    codeDir: string;
    projFile: string;
    searchSku: string;
}

program
    .name('msbot create')
    .option('-n, --name <name>', 'name of new bot')
    .option('-l, --location <location>', 'location to create the bot service in (westus, ...)')
    .option('--subscriptionId <subscriptionId>', '(OPTIONAL) Azure subscriptionId to create bot to, if not passed then current az account will be used')
    .option('--insightsRegion <insightsRegion>', '(OPTIONAL) region to create appInsights account in (default is based on location)')
    .option('--groupName <groupName>', '(OPTIONAL) groupName for created bot, if not passed then new bot name will be used for the new group')
    .option('--sdkLanguage <sdkLanguage>', '(OPTIONAL) language for bot [Csharp|Node] (Default:CSharp)')
    .option('--sdkVersion <sdkVersion>', '(OPTIONAL) SDK version for bot [v3|v4] (Default:v4)')
    .option('--prefix', 'Append [msbot] prefix to all messages')
    .option('--appId <appId>', '(OPTIONAL) Application ID for an existing application, if not passed then a new Application will be created')
    .option('--appSecret <appSecret>', '(OPTIONAL) Application Secret for an existing application, if not passed then a new Application will be created')
    .option('--proj-file <projfile>', '(OPTIONAL) auto publish the local project file to created bot service')
    .option('--code-dir <path>', '(OPTIONAL) auto publish the folder path to created bot service')
    .option('--searchSku <searchSku>', '(OPTIONAL) Set the Sku for provisioned azure search (free|basic|standard|standard2|standard3|...)')
    .option('-q, --quiet', 'minimize output')
    .option('--verbose', 'show commands')
    .option('-f, --force', 'do not prompt for confirmation')
    .description('allows you to create a bot in a new azure resource group')
    .action((cmd: program.Command, actions: program.Command) => undefined);

const cmd: program.Command = program.parse(process.argv);
const args = <ICreateArgs>{};
Object.assign(args, cmd);

if (typeof (args.name) != 'string') {
    console.error(chalk.default.redBright('missing --name argument'));
    showErrorHelp();
}

processConfiguration()
    .then((result) => {
        fs.unlinkSync('bot.recipe');
    })
    .catch((reason) => {
        fs.unlinkSync('bot.recipe');
        if (reason.message) {
            console.error(chalk.default.redBright(reason.message.replace('clone services', 'create')));
        } else {
            console.error(chalk.default.redBright(reason.replace('clone services', 'create')));
        }
        showErrorHelp();
    });

async function processConfiguration(): Promise<void> {
    if ((<any>args)['proj-file']) {
        args.projFile = (<string>(<any>args)['proj-file']);
        console.log(args.projFile);
    }
    else if ((<any>args)['code-dir']) {
        args.codeDir = (<string>(<any>args)['code-dir']);
        console.log(args.codeDir);
    }

    let recipe = {
        "version": "1.0",
        "resources": [
            {
                "type": "endpoint",
                "id": "1",
                "name": "development",
                "url": "http://localhost:3978/api/messages"
            },
            {
                "type": "endpoint",
                "id": "2",
                "name": "production",
                "url": "https://your-bot-url.azurewebsites.net/api/messages"
            },
            {
                "type": "abs",
                "id": "3",
                "name": ""
            },
            {
                "type": "appInsights",
                "id": "4",
                "name": ""
            },
            {
                "type": "blob",
                "id": "5",
                "name": "",
                "container": "botstatestore"
            }
        ]
    };
    fs.writeFileSync("bot.recipe", JSON.stringify(recipe, null, 4), { encoding: 'utf8' });
    let command = `msbot clone services -f . --name ${args.name} -l ${args.location} `;
    if (args.groupName)
        command += ` --groupname ${args.groupName}`;

    if (args.codeDir)
        command += ` --code-dir ${args.codeDir}`;

    if (args.projFile)
        command += ` --proj-file ${args.projFile}`;

    if (args.verbose)
        command += ` --verbose`;

    if (args.quiet)
        command += ` --quiet`;

    if (args.force)
        command += ` --force`;

    if (args.appId)
        command += ` --appId ${args.appId}`;

    if (args.appSecret)
        command += ` --appSecret ${args.appSecret}`;

    if (args.subscriptionId)
        command += ` --subscriptionId ${args.subscriptionId}`;

    if (args.insightsRegion)
        command += ` --insightsRegion ${args.insightsRegion}`;

    if (args.groupName)
        command += ` --groupName ${args.groupName}`;

    if (args.sdkLanguage)
        command += ` --sdkLanguage ${args.sdkLanguage}`;

    if (args.searchSku)
        command += ` --searchSku ${args.searchSku}`;

    await spawnAsync(command, (out) => process.stdout.write(out.replace("clone services", "create")), (err) => { }/* process.stderr.write(err)*/);
};

async function runCommand(command: string, description: string): Promise<any> {
    // logCommand(args, description, command);
    let p = await exec(command);
    try {
        return JSON.parse(p.stdout);
    } catch (err) {
        return p.stdout;
    }
}

function logCommand(args: ICreateArgs, message: string, command: string) {
    if (!args.quiet) {
        console.log(chalk.default.bold(message));
        if (args.verbose) {
            console.log(chalk.default.cyan(command));
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
