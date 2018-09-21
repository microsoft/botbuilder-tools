/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import { BotConfiguration, IAppInsightsService, ServiceTypes } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as getStdin from 'get-stdin';
import * as txtfile from 'read-text-file';
import { stdoutAsync } from './stdioAsync';

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    showErrorHelp();
};

interface IAppInsightsArgs extends IAppInsightsService {
    bot: string;
    secret: string;
    stdin: boolean;
    input?: string;
    keys: string;
}

program
    .name('msbot update appinsights ')
    .description('update the bot file to Azure App Insights (--id or --serviceName is required)')
    .option('--id <id>', 'service id')
    .option('-n, --name <name>', 'friendly name (defaults to serviceName)')
    .option('-t, --tenantId <tenantId>', 'Azure Tenant id (either GUID or xxx.onmicrosoft.com)')
    .option('-s, --subscriptionId <subscriptionId>', 'Azure Subscription Id')
    .option('-r, --resourceGroup <resourceGroup>', 'Azure resource group name')
    .option('-s, --serviceName <serviceName>', 'Azure service name')
    .option('-i, --instrumentationKey <instrumentationKey>', 'App Insights InstrumentationKey')
    .option('-a, --applicationId <applicationId>', '(OPTIONAL) App Insights Application Id')
    .option('--keys <keys>', `Json app keys, example: {'key1':'value1','key2':'value2'} `)

    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--input <jsonfile>', 'path to arguments in JSON format { id:\'\',name:\'\', ... }')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .option('--stdin', 'arguments are passed in as JSON object via stdin')
    .option('--prefix', 'Append [msbot] prefix to all messages')
    .action((cmd: program.Command, actions: program.Command) => undefined);

const command: program.Command = program.parse(process.argv);
const args: IAppInsightsArgs = <IAppInsightsArgs>{};
Object.assign(args, command);

if (args.stdin) {
    //force verbosity output if args are passed via stdin
    process.env.PREFIX = 'prefix';
}

if (process.argv.length < 3) {
    program.help();
} else {
    if (!args.bot) {
        BotConfiguration.loadBotFromFolder(process.cwd(), args.secret)
            .then(processUpdateArgs)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    } else {
        BotConfiguration.load(args.bot, args.secret)
            .then(processUpdateArgs)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    }
}

async function processUpdateArgs(config: BotConfiguration): Promise<BotConfiguration> {
    if (args.stdin) {
        Object.assign(args, JSON.parse(await getStdin()));
    } else if (args.input != null) {
        Object.assign(args, JSON.parse(await txtfile.read(<string>args.input)));
    }

    if (!args.id && !args.serviceName) {
        throw new Error('requires --id or --serviceName');
    }

    if (args.keys) {
        args.apiKeys = JSON.parse(args.keys);
    }

    for (const service of config.services) {
        if (service.type === ServiceTypes.AppInsights) {
            const appInsights = <IAppInsightsService>service;
            if (appInsights.id === args.id || appInsights.serviceName === args.serviceName) {
                if (args.hasOwnProperty('name'))
                    appInsights.name = args.name;
                if (args.tenantId)
                    appInsights.tenantId = args.tenantId;
                if (args.subscriptionId)
                    appInsights.subscriptionId = args.subscriptionId;
                if (args.resourceGroup)
                    appInsights.resourceGroup = args.resourceGroup;
                if (args.serviceName)
                    appInsights.serviceName = args.serviceName;
                if (args.instrumentationKey)
                    appInsights.instrumentationKey = args.instrumentationKey;
                if (args.apiKeys)
                    appInsights.apiKeys = args.apiKeys;
                await config.save(args.secret);
                await stdoutAsync(JSON.stringify(appInsights, null, 2));
                return config;
            }
        }
    }
    throw new Error(`AppInsights service ${args.serviceName} was not found in the bot file`);
}

function showErrorHelp(): void {
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
}
