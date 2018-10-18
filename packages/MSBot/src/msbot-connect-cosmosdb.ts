/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import { BotConfiguration, CosmosDbService, ICosmosDBService } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as getStdin from 'get-stdin';
import * as txtfile from 'read-text-file';
import { stdoutAsync } from './stdioAsync';
import { uuidValidate } from './utils';

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    showErrorHelp();
};

interface IConnectCosmosDbArgs extends ICosmosDBService {
    bot: string;
    secret: string;
    stdin: boolean;
    input?: string;
}

program
    .name('msbot connect cosmosdb')
    .description('Connect the bot to Azure CosmosDb Service')
    .option('-n, --name <name>', 'friendly name (defaults to serviceName)')
    .option('-t, --tenantId <tenantId>', 'Azure Tenant id (either GUID or xxx.onmicrosoft.com)')
    .option('-s, --subscriptionId <subscriptionId>', 'Azure Subscription Id')
    .option('-r, --resourceGroup <resourceGroup>', 'Azure resource group name')
    .option('--serviceName <serviceName>', 'Azure service name')
    .option('-e, --endpoint <endpoint>', 'CosmosDB endpoint url')
    .option('-k, --key <key>', 'CosmosDB auth key')
    .option('-d, --database <database>', 'database name')
    .option('-c, --collection <collection>', 'collection name')

    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--input <jsonfile>', 'path to arguments in JSON format { id:\'\',name:\'\', ... }')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .option('--stdin', 'arguments are passed in as JSON object via stdin')
    .option('--prefix', 'Append [msbot] prefix to all messages')
    .action((cmd: program.Command, actions: program.Command) => undefined);

const command: program.Command = program.parse(process.argv);
const args: IConnectCosmosDbArgs = <IConnectCosmosDbArgs>{};
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
        throw new Error('Bad or missing --resourceGroup');
    }

    if (!args.endpoint || args.endpoint.length === 0) {
        throw new Error('Bad or missing --key');
    }

    if (!args.key || args.key.length === 0) {
        throw new Error('Bad or missing --key');
    }

    if (!args.database || args.database.length === 0) {
        throw new Error('Bad or missing --database');
    }

    if (!args.collection || args.collection.length === 0) {
        throw new Error('Bad or missing --collection');
    }

    const service: CosmosDbService = new CosmosDbService({
        name: args.hasOwnProperty('name') ? args.name : args.serviceName,
        serviceName: args.serviceName,
        tenantId: args.tenantId,
        subscriptionId: args.subscriptionId,
        resourceGroup: args.resourceGroup,
        endpoint: args.endpoint,
        key: args.key,
        database: args.database,
        collection: args.collection
    });
    const id: string = config.connectService(service);
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
