/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import { BotConfiguration, BotService, EndpointService, IBotService, IConnectedService, ServiceTypes } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as getStdin from 'get-stdin';
import * as txtfile from 'read-text-file';
import * as url from 'url';
import { stdoutAsync } from './stdioAsync';
import { uuidValidate } from './utils';

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    showErrorHelp();
};

interface IConnectAzureArgs extends IBotService {
    bot: string;
    secret: string;
    stdin: boolean;
    input?: string;
    appId: string;
    appPassword?: string;
    endpoint?: string;
}

program
    .name('msbot connect bot')
    .description('Connect the bot to Azure Bot Service')
    .option('--serviceName <serviceName>', 'Azure Bot Service bot id')
    .option('-n, --name <name>', 'Friendly name for this service (defaults to serviceName)')
    .option('-t, --tenantId <tenantId>', 'id of the tenant for the Azure service (either GUID or xxx.onmicrosoft.com)')
    .option('-s, --subscriptionId <subscriptionId>', 'GUID of the subscription for the Azure Service')
    .option('-r, --resourceGroup <resourceGroup>', 'name of the resourceGroup for the Azure Service')
    .option('-a, --appId  <appid>', 'Microsoft AppId for the Azure Bot Service\n')
    .option('-e, --endpoint <endpoint>', '(OPTIONAL) Registered endpoint url for the Azure Bot Service')
    .option('-p, --appPassword  <appPassword>', '(OPTIONAL) Microsoft AppPassword for the Azure Bot Service\n')

    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--input <jsonfile>', 'path to arguments in JSON format { id:\'\',name:\'\', ... }')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .option('--stdin', 'arguments are passed in as JSON object via stdin')
    .option('--prefix', 'Append [msbot] prefix to all messages')
    .action((cmd: program.Command, actions: program.Command) => undefined);

const command: program.Command = program.parse(process.argv);
const args: IConnectAzureArgs = <IConnectAzureArgs>{};
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
            .then(processConnectAzureArgs)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    } else {
        BotConfiguration.load(args.bot, args.secret)
            .then(processConnectAzureArgs)
            .catch((reason: Error) => {
                console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
                showErrorHelp();
            });
    }
}

async function processConnectAzureArgs(config: BotConfiguration): Promise<BotConfiguration> {
    if (args.stdin) {
        Object.assign(args, JSON.parse(await getStdin()));
    } else if (args.input != null) {
        Object.assign(args, JSON.parse(await txtfile.read(<string>args.input)));
    }

    args.serviceName = args.serviceName || args.name || args.id || '';

    if (!args.serviceName || args.serviceName.length === 0) {
        throw new Error('Bad or missing --serviceName');
    }

    if (!args.tenantId || args.tenantId.length === 0) {
        throw new Error('Bad or missing --tenantId');
    }

    if (!args.subscriptionId || !uuidValidate(args.subscriptionId)) {
        throw new Error('Bad or missing --subscriptionId');
    }

    if (!args.resourceGroup || args.resourceGroup.length === 0) {
        throw new Error('Bad or missing --resourceGroup for registered bot');
    }

    if (!args.appId || !uuidValidate(args.appId)) {
        throw new Error('Bad or missing --appId');
    }

    const services: IConnectedService[] = [];
    const service: BotService = new BotService({
        name: args.hasOwnProperty('name') ? args.name : args.serviceName,
        serviceName: args.serviceName,
        tenantId: args.tenantId,
        subscriptionId: args.subscriptionId,
        resourceGroup: args.resourceGroup,
        appId: args.appId
    });
    config.connectService(service);
    services.push(service);

    if (!args.endpoint || !(new url.URL(args.endpoint).protocol.startsWith('http'))) {
        throw new Error('Bad or missing --endpoint');
    }

    if (!args.appPassword || args.appPassword.length === 0) {
        throw new Error('Bad or missing --appPassword');
    }

    const endpointService: EndpointService = new EndpointService({
        type: ServiceTypes.Endpoint,
        name: args.hasOwnProperty('name') ? args.name : args.endpoint,
        appId: args.appId,
        appPassword: args.appPassword,
        endpoint: args.endpoint
    });
    config.connectService(endpointService);
    services.push(endpointService);
    await config.save(args.secret);
    await stdoutAsync(JSON.stringify(services, null, 2));

    return config;
}

function showErrorHelp(): void {
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
}
