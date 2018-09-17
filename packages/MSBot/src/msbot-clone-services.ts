/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
import { AppInsightsService, BlobStorageService, BotConfiguration, BotRecipe, BotService, CosmosDbService, DispatchService, EndpointService, FileService, GenericService, IBlobResource, IBotService, ICosmosDBResource, IDispatchResource, IDispatchService, IEndpointService, IFileResource, IGenericResource, IResource, IUrlResource, LuisService, QnaMakerService, ServiceTypes } from 'botframework-config';
import * as chalk from 'chalk';
import * as child_process from 'child_process';
import * as program from 'commander';
import * as path from 'path';
import * as process from 'process';
import * as txtfile from 'read-text-file';
import * as url from 'url';
import * as util from 'util';
import { spawnAsync } from './processUtils';
let opn = require('opn');
let exec = util.promisify(child_process.exec);

import { showMessage } from './utils';
require('log-prefix')(() => showMessage('%s'));
program.option('--verbose', 'Add [msbot] prefix to all messages');

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    program.help();
};

interface ICloneArgs {
    name: string;
    folder: string;
    location: string;
    subscriptionId: string;
    tenantId: string;
    groupName: string;
    secret: string;
    quiet: boolean;
    verbose: boolean;
    luisAuthoringKey: string;
    luisSubscriptionKey: string;
    qnaSubscriptionKey: string;
    luisRegion: string;
    args: string[];
}

program
    .name('msbot clone services')
    .option('-n, --name <name>', 'name of new bot')
    .option('-f, --folder <folder>', 'path to folder containing exported resources')
    .option('-l, --location <location>', 'location to create the bot service in (westus, ...)')
    .option('--luisAuthoringKey <luisAuthoringKey>', 'authoring key for creating luis resources')
    .option('--subscriptionId <subscriptionId>', '(OPTIONAL) Azure subscriptionId to clone bot to, if not passed then current az account will be used')
    .option('--groupName <groupName>', '(OPTIONAL) groupName for cloned bot, if not passed then new bot name will be used for the new group')
    .option('--verbose', 'show verbose information')
    .option('-q, --quiet', 'disable output')
    .description('allows you to clone all of the services a bot into a new azure resource group')
    .action((cmd: program.Command, actions: program.Command) => undefined);
program.parse(process.argv);

const command: program.Command = program.parse(process.argv);
const args = <ICloneArgs>{};
Object.assign(args, command);

if (typeof (args.name) != 'string') {
    console.error(chalk.default.redBright('missing --name argument'));
    showErrorHelp();
}

let config = new BotConfiguration();
config.name = args.name;
config.saveAs(config.name + '.bot')
    .then(processConfiguration)
    .catch((reason) => {
        if (reason.message) {
            console.error(chalk.default.redBright(reason.message));
        } else {
            console.error(chalk.default.redBright(reason));
        }
        showErrorHelp();
    });

async function processConfiguration(): Promise<void> {
    if (!args.folder) {
        throw new Error('missing --folder argument');
    }

    if (!args.location) {
        throw new Error('missing --location argument');
    }

    let recipeJson = await txtfile.read(path.join(args.folder, `bot.recipe`));
    let recipe = <BotRecipe>JSON.parse(recipeJson);

    try {
        let command = null;
        let p = null;

        // verify az command exists and is correct version
         await checkAzBotServiceVersion();

        // get subscription account data
        command = `az account show`;
        if (args.subscriptionId) {
            command += `--subscription ${args.subscriptionId}`;
        }

        logCommand(args, `Fetching subscription account`, command);
        p = await exec(command);
        let azAccount = JSON.parse(p.stdout);
        args.subscriptionId = azAccount.id;
        args.tenantId = azAccount.tenantId;
        if (!args.quiet) {
            console.log(`Creating resources in subscription: ${azAccount.name} ${azAccount.id}`);
        }

        // create group
        let azGroup: any;
        let azBot: IBotService | undefined;
        let azQnaSubscription: any;
        let azLuisSubscription: any;

        // make sure we have args for services and provisioned LUIS and QnA cognitive services
        for (let resource of recipe.resources) {
            switch (resource.type) {
                case ServiceTypes.Luis:
                case ServiceTypes.Dispatch:
                    if (!args.luisAuthoringKey) {
                        throw new Error('missing --luisAuthoringKey argument');
                    }
                    if (!azLuisSubscription) {
                        if (!azGroup) {
                            azGroup = await createGroup();
                        }

                        // create luis subscription
                        let luisCogsName = `${args.name}-LUIS`;
                        command = `az cognitiveservices account create -g ${azGroup.name} --kind LUIS -n "${luisCogsName}" --location ${args.location} --sku S0 --yes`;
                        logCommand(args, `Creating LUIS Cognitive Service [${luisCogsName}]`, command);
                        p = await exec(command);
                        azLuisSubscription = JSON.parse(p.stdout);

                        // get keys
                        command = `az cognitiveservices account keys list -g ${azGroup.name} -n "${luisCogsName}"`;
                        logCommand(args, `Fetching LUIS Keys [${luisCogsName}]`, command);
                        p = await exec(command);
                        let luisKeys = JSON.parse(p.stdout);
                        args.luisSubscriptionKey = luisKeys.key1;
                        args.luisRegion = args.location;
                    }
                    break;

                case ServiceTypes.QnA:
                    if (!azQnaSubscription) {
                        if (!azGroup) {
                            azGroup = await createGroup();
                        }

                        if (!azBot) {
                            azBot = await createBot();
                        }
                        // create qnaMaker service in resource group

                        // we have a group, and app service, 

                        // provision search instance
                        let searchName = args.name.toLowerCase() + '-search';
                        command = `az search service create -g ${azGroup.name} -n "${searchName}" --sku standard`;
                        logCommand(args, `Creating Azure Search Service [${searchName}]`, command);
                        p = await exec(command);
                        let searchResult = JSON.parse(p.stdout);

                        // get search keys
                        command = `az search admin-key show -g ${azGroup.name} --service-name "${searchName}"`;
                        logCommand(args, `Fetching Azure Search Service keys [${searchName}]`, command);
                        p = await exec(command);
                        let searchKeys = JSON.parse(p.stdout);

                        // create qna host service
                        let qnaHostName = args.name + '-qnahost';
                        command = `az webapp create -g ${azGroup.name} -n ${qnaHostName} --plan ${args.name}`;
                        logCommand(args, `Creating QnA Maker host web service [${qnaHostName}]`, command);
                        p = await exec(command);
                        let createQnaWeb = JSON.parse(p.stdout);

                        // configure qna web service settings
                        command = `az webapp config appsettings set -g ${azGroup.name} -n ${qnaHostName} --settings `;
                        command += `"AzureSearchName=${searchName}" `;
                        command += `AzureSearchAdminKey=${searchKeys.primaryKey} `;
                        command += `PrimaryEndpointKey=${qnaHostName}-PrimaryEndpointKey  `;
                        command += `SecondaryEndpointKey=${qnaHostName}-SecondaryEndpointKey `;
                        command += `DefaultAnswer="No good match found in KB." `;
                        command += `QNAMAKER_EXTENSION_VERSION="latest"`;
                        logCommand(args, `Configuring QnA Maker host web service settings [${qnaHostName}]`, command);
                        p = await exec(command);

                        command = `az webapp cors add -g ${azGroup.name} -n ${qnaHostName} -a "*"`;
                        logCommand(args, `Configuring QnA Maker host web service CORS [${qnaHostName}]`, command);
                        p = await exec(command);

                        // create qnamaker account
                        let qnaAccountName = args.name + '-QnAMaker';
                        command = `az cognitiveservices account create -g ${azGroup.name} --kind QnAMaker -n "${qnaAccountName}" --sku S0 `;
                        command += `--location ${azGroup.location} --yes `;
                        command += `--api-properties qnaRuntimeEndpoint=https://${qnaHostName}.azurewebsites.net`;
                        logCommand(args, `Creating QnA Maker Cognitive Service [${qnaAccountName}]`, command);
                        p = await exec(command);
                        azQnaSubscription = JSON.parse(p.stdout);

                        // get qna subscriptionKey
                        command = `az cognitiveservices account keys list -g ${azGroup.name} -n "${qnaAccountName}"`;
                        logCommand(args, `Fetching QnA Maker Cognitive Service [${qnaAccountName}]`, command);
                        p = await exec(command);
                        let azQnaKeys = JSON.parse(p.stdout);
                        args.qnaSubscriptionKey = azQnaKeys.key1;
                    }
                    break;

                default:
                    if (!args.location) {
                        throw new Error('missing --location argument');
                    }
                    break;
            }
        }
        // create group if not created yet
        if (!azGroup) {
            azGroup = await createGroup();
        }

        // create bot if not created yet
        if (!azBot) {
            azBot = await createBot();
        }

        let azBotEndpoint = <IEndpointService><any>azBot;

        command = `az bot show -g ${args.name} -n ${args.name}`;
        logCommand(args, `Fetching bot extended information [${args.name}]`, command);
        p = await exec(command);
        let azBotExtended = JSON.parse(p.stdout);

        // fetch co-created resources so we can get blob and appinsights data
        command = `az resource list -g ${azGroup.name}`;
        logCommand(args, `Fetching co-created resources [${args.name}]`, command);
        p = await exec(command);
        let azGroupResources = JSON.parse(p.stdout);
        let appInsightInfo;
        let storageInfo;
        for (let groupResource of azGroupResources) {
            if (groupResource.type == "microsoft.insights/components") {
                appInsightInfo = groupResource;
            } else if (groupResource.type == "Microsoft.Storage/storageAccounts") {
                storageInfo = groupResource;
            }
        }

        for (let resource of recipe.resources) {
            switch (resource.type) {

                case ServiceTypes.AppInsights:
                    {
                        // this was created via az bot create, hook it up
                        config.services.push(new AppInsightsService({
                            type: ServiceTypes.AppInsights,
                            id: resource.id,
                            tenantId: args.tenantId,
                            subscriptionId: args.subscriptionId,
                            resourceGroup: args.groupName,
                            name: appInsightInfo.name,
                            serviceName: appInsightInfo.name,
                            instrumentationKey: azBotExtended.properties.developerAppInsightKey,
                            applicationId: azBotExtended.properties.developerAppInsightsApplicationId,
                            apiKeys: azBotExtended.properties.developerAppInsightsApiKey
                        }));
                        await config.save();
                    }
                    break;

                case ServiceTypes.BlobStorage:
                    {
                        // this was created via az bot create, get the connection string and then hook it up
                        command = `az storage account show-connection-string -g ${azGroup.name} -n "${storageInfo.name}"`;
                        logCommand(args, `Fetching Azure Blob Storage connection string [${args.name}]`, command);
                        p = await exec(command);
                        let blobConnection = JSON.parse(p.stdout);

                        let blobResource = <IBlobResource>resource;
                        config.services.push(new BlobStorageService({
                            type: ServiceTypes.BlobStorage,
                            id: resource.id,
                            name: storageInfo.name,
                            serviceName: storageInfo.name,
                            tenantId: args.tenantId,
                            subscriptionId: args.subscriptionId,
                            resourceGroup: args.groupName,
                            connectionString: blobConnection.connectionString,
                            container: blobResource.container
                        }));
                        await config.save();
                    }
                    break;

                case ServiceTypes.Bot:
                    {
                        // created via az bot create, register the result
                        config.services.push(new BotService({
                            type: ServiceTypes.Bot,
                            id: resource.id,
                            name: azBot.name,
                            tenantId: args.tenantId,
                            subscriptionId: args.subscriptionId,
                            resourceGroup: args.groupName,
                            serviceName: azBot.name,
                            appId: azBot.appId
                        }));
                        await config.save();
                    }
                    break;

                case ServiceTypes.CosmosDB:
                    {
                        let cosmosResource = <ICosmosDBResource>resource;
                        let cosmosName = `${args.name.toLowerCase()}`;

                        // az cosmosdb create --n name -g Group1
                        command = `az cosmosdb create -n ${cosmosName} -g ${azGroup.name}`;
                        logCommand(args, `Creating Azure CosmosDB account [${cosmosName}] (long operation)`, command);
                        p = await exec(command);
                        let cosmosDb = JSON.parse(p.stdout);

                        // get keys
                        command = `az cosmosdb list-keys -g ${azGroup.name} -n ${cosmosName}`;
                        logCommand(args, `Fetching Azure CosmosDB account keys [${args.name}]`, command);
                        p = await exec(command);
                        let cosmosDbKeys = JSON.parse(p.stdout);

                        // az cosmosdb database create -n clonebot1cosmosdb --key <key> -d db1 --url-connection https://clonebot1cosmosdb.documents.azure.com:443/
                        command = `az cosmosdb database create -g ${azGroup.name} -n ${cosmosName} --key ${cosmosDbKeys.primaryMasterKey} -d ${cosmosResource.database} --url-connection https://${cosmosName}.documents.azure.com:443/`;
                        logCommand(args, `Creating Azure CosmosDB database [${cosmosResource.database}]`, command);
                        p = await exec(command);

                        // az cosmosdb collection create -n clonebot1cosmosdb --key <key> -d db1 --url-connection https://clonebot1cosmosdb.documents.azure.com:443/ --collection-name collection
                        command = `az cosmosdb collection create -g ${azGroup.name} -n ${cosmosName} --key ${cosmosDbKeys.primaryMasterKey} -d ${cosmosResource.database} --url-connection https://${cosmosName}.documents.azure.com:443/ --collection-name ${cosmosResource.collection}`;
                        logCommand(args, `Creating Azure CosmosDB collection [${cosmosResource.collection}]`, command);
                        p = await exec(command);

                        // get connection string is broken
                        // command = `az cosmosdb list-connection-strings -g ${azGroup.name} -n ${args.name}`;
                        // logCommand(args, `Fetching cosmosdb connection strings ${cosmosResource.collection}`, command);
                        // p = await exec(command);
                        // let connections = JSON.parse(p.stdout);

                        // register it as a service
                        config.services.push(new CosmosDbService({
                            type: ServiceTypes.CosmosDB,
                            id: cosmosResource.id,
                            name: cosmosName,
                            serviceName: cosmosName,
                            tenantId: args.tenantId,
                            subscriptionId: args.subscriptionId,
                            resourceGroup: args.groupName,
                            endpoint: `https://${cosmosName}.documents.azure.com:443/`,
                            key: cosmosDbKeys.primaryMasterKey,
                            database: cosmosResource.database,
                            collection: cosmosResource.collection,
                        }));
                    }
                    await config.save();
                    break;

                case ServiceTypes.Endpoint:
                    {
                        let urlResource = <IUrlResource>resource;
                        if (urlResource.url && urlResource.url.indexOf('localhost') > 0) {
                            // add localhost record as is, but add appId/password
                            config.services.push(new EndpointService({
                                type: ServiceTypes.Endpoint,
                                id: resource.id,
                                name: resource.name,
                                appId: azBotEndpoint.appId,
                                appPassword: azBotEndpoint.appPassword,
                                endpoint: urlResource.url
                            }));
                        } else {
                            // merge oldUrl and new Url hostname
                            let oldUrl = new url.URL(urlResource.url);
                            let azUrl = new url.URL(azBotEndpoint.endpoint);
                            oldUrl.hostname = azUrl.hostname;

                            config.services.push(new EndpointService({
                                type: ServiceTypes.Endpoint,
                                id: resource.id,
                                name: resource.name,
                                appId: azBotEndpoint.appId,
                                appPassword: azBotEndpoint.appPassword,
                                endpoint: oldUrl.href
                            }));

                            if (oldUrl != azUrl) {
                                // TODO update bot service record with merged url

                            }
                        }
                        await config.save();
                    }
                    break;

                case ServiceTypes.File:
                    {
                        let fileResource = <IFileResource>resource;
                        config.services.push(new FileService({
                            type: ServiceTypes.File,
                            id: fileResource.id,
                            name: fileResource.name,
                            path: fileResource.path,
                        }));
                        await config.save();
                    }
                    break;

                case ServiceTypes.Generic:
                    {
                        let genericResource = <IGenericResource>resource;
                        config.services.push(new GenericService({
                            type: ServiceTypes.Generic,
                            id: genericResource.id,
                            name: genericResource.name,
                            url: genericResource.url,
                            configuration: genericResource.configuration,
                        }));
                        await config.save();
                    }
                    break;

                case ServiceTypes.Dispatch:
                    {
                        let luisService = await importAndTrainLuisApp(resource);
                        let dispatchResource = <IDispatchResource>resource;
                        let dispatchService: IDispatchService = Object.assign({ serviceIds: dispatchResource.serviceIds, }, luisService);
                        (<any>dispatchService).type = ServiceTypes.Dispatch;
                        dispatchService.id = resource.id; // keep same resource id
                        config.services.push(new DispatchService(dispatchService));
                        await config.save();
                    }
                    break;

                case ServiceTypes.Luis:
                    {
                        let luisService = await importAndTrainLuisApp(resource);
                        luisService.id = `${resource.id}`; // keep same resource id
                        config.services.push(luisService);
                        await config.save();
                    }
                    break;

                case ServiceTypes.QnA:
                    {
                        // qnamaker create kb --subscriptionKey c87eb99bfc274a4db6b671b43f867575  --name testtesttest --in qna.json --wait --msbot -q
                        let qnaPath = path.join(args.folder, `${resource.id}.qna`);
                        let kbName = `${args.name}-${resource.name}`;
                        command = `qnamaker create kb --subscriptionKey ${args.qnaSubscriptionKey} --name "${kbName}" --in ${qnaPath} --wait --msbot -q`;
                        logCommand(args, `Creating QnA Maker KB [${kbName}]`, command);
                        p = await exec(command);
                        let service = new QnaMakerService(JSON.parse(p.stdout));
                        service.id = `${resource.id}`; // keep id
                        service.name = kbName;
                        config.services.push(service);
                        await config.save();
                    }
                    break;

                default:
                    break;
            }
        }

        // hook up appinsights and blob storage if it hasn't been already
        if (azBot) {
            let hasBot = false;
            let hasBlob = false;
            let hasAppInsights = false;
            for (let service of config.services) {
                switch (service.type) {
                    case ServiceTypes.AppInsights:
                        hasAppInsights = true;
                        break;
                    case ServiceTypes.BlobStorage:
                        hasBlob = true;
                        break;
                    case ServiceTypes.Bot:
                        hasBot = true;
                        break;
                }
            }
            if (!hasBot && azBot) {
                // created via az bot create, register the result
                config.connectService(new BotService({
                    name: azBot.name,
                    tenantId: args.tenantId,
                    subscriptionId: args.subscriptionId,
                    resourceGroup: args.groupName,
                    serviceName: azBot.name,
                    appId: azBot.appId
                }));

                // add endpoint
                config.connectService(new EndpointService({
                    type: ServiceTypes.Endpoint,
                    name: azBot.name,
                    appId: azBotEndpoint.appId,
                    appPassword: azBotEndpoint.appPassword,
                    endpoint: azBotEndpoint.endpoint
                }));

                await config.save();
            }

            if (!hasAppInsights && azBotExtended) {
                // this was created via az bot create, hook it up
                config.connectService(new AppInsightsService({
                    tenantId: args.tenantId,
                    subscriptionId: args.subscriptionId,
                    resourceGroup: args.groupName,
                    name: appInsightInfo.name,
                    serviceName: appInsightInfo.name,
                    instrumentationKey: azBotExtended.properties.developerAppInsightKey,
                    applicationId: azBotExtended.properties.developerAppInsightsApplicationId,
                    apiKeys: azBotExtended.properties.developerAppInsightsApiKey
                }));
                await config.save();
            }

            if (!hasBlob && storageInfo) {
                // this was created via az bot create, get the connection string and then hook it up
                command = `az storage account show-connection-string -g ${azGroup.name} -n "${storageInfo.name}"`;
                logCommand(args, `Fetching storage connection string [${storageInfo.name}]`, command);
                p = await exec(command);
                let blobConnection = JSON.parse(p.stdout);

                config.connectService(new BlobStorageService({
                    name: storageInfo.name,
                    serviceName: storageInfo.name,
                    tenantId: args.tenantId,
                    subscriptionId: args.subscriptionId,
                    resourceGroup: args.groupName,
                    connectionString: blobConnection.connectionString,
                    container: null
                }));
                await config.save();
            }
        }
        console.log(`${config.getPath()} created.`);
        console.log(`Done cloning.`);
    } catch (error) {
        let lines = error.message.split('\n');
        let message = '';
        for (let line of lines) {
            // trim to copywrite symbol, help from inner process command line args is inappropriate
            if (line.indexOf('©') > 0)
                break;
            message += line;
        }
        throw new Error(message);
    }
}



async function checkAzBotServiceVersion() {
    let command = `az -v `;
    logCommand(args, `Checking az botservice version`, command);
    let p = await exec(command);
    let version = new AzBotServiceVersion('(0.0.0)');
    let azVersionCount = 0;
    for (let line of p.stdout.split('\n')) {
        if (line.startsWith('botservice')) {
            azVersionCount++;
            let newVersion = new AzBotServiceVersion(line);
            if (version.isOlder(newVersion))
                version = newVersion;
        }
    }
    let neededVersion = new AzBotServiceVersion('(0.4.0)');
    if (version.isOlder(neededVersion)) {
        console.error(chalk.default.redBright(`[msbot] You need to upgrade your az botservice version to >= ${neededVersion.major}.${neededVersion.minor}.${neededVersion.patch}.
To do this run:
   az extension remove -n botservice
   az extension add -n botservice
`));
        process.exit(1);
    }
    return { command, p };
}

async function importAndTrainLuisApp(luisResource: IResource): Promise<LuisService> {
    let luisPath = path.join(args.folder, `${luisResource.id}.luis`);
    let luisService: LuisService;

    let luisAppName = `${args.name}-${luisResource.name}`;
    let command = `luis import application --appName "${luisAppName}" --in ${luisPath} --authoringKey ${args.luisAuthoringKey} --msbot`;
    logCommand(args, `Creating and importing LUIS application [${luisAppName}]`, command);
    let p = await exec(command);
    luisService = new LuisService(JSON.parse(p.stdout));

    command = `luis train version --appId ${luisService.appId} --authoringKey ${luisService.authoringKey} --versionId "${luisService.version}" --wait `;
    logCommand(args, `Training LUIS application [${luisService.name}]`, command);
    await spawnAsync(command);

    // publish application
    command = `luis publish version --appId ${luisService.appId} --authoringKey ${luisService.authoringKey} --versionId "${luisService.version}" --region ${luisService.region} `;
    logCommand(args, `Publishing LUIS application [${luisService.name}]`, command);
    await exec(command);

    // mark application as public (TEMPORARY, THIS SHOULD BE REMOVED ONCE LUIS PROVIDES KEY ASSIGN API)
    command = `luis update settings --appId ${luisService.appId} --authoringKey ${luisService.authoringKey} --public true`;
    logCommand(args, `Updating LUIS settings [${luisService.name}]`, command);
    await exec(command);

    return luisService;
}

async function createBot(): Promise<IBotService> {
    let command = `az bot create -g ${args.name} --name ${args.name} --kind webapp --location ${args.location}`;
    logCommand(args, `Creating Azure Bot Service [${args.name}]`, command);

    let stdout = await spawnAsync(command, undefined, (stderr) => {
        if (stderr.indexOf('https://microsoft.com/devicelogin') > 0) {
            console.warn(`[az bot] ${stderr.replace('WARNING: ', '')}`);
            opn('https://microsoft.com/devicelogin');
        }
        else if (stderr.indexOf('Provisioning') > 0) {
            // we need to show warning to user so we can get instructions on logging in
            console.warn(`[az bot] ${stderr.replace('WARNING: ', '')} (this will take several minutes)`);
        }
    });
    return <IBotService>JSON.parse(stdout);
}

async function createGroup(): Promise<any> {
    if (!args.location) {
        throw new Error('missing --location argument');
    }

    let command = `az group create -g ${args.name} -l ${args.location}`;
    logCommand(args, `Creating Azure group [${args.name}]`, command);
    let p = await exec(command);
    let azGroup = JSON.parse(p.stdout);
    args.groupName = azGroup.name;
    return azGroup;
}

function showErrorHelp() {
    program.outputHelp((str) => {
        console.error(str);
        return '';
    });
    console.log(chalk.default.bold(`NOTE: You did not complete clone process.`));
    if (typeof (args.name) == 'string') {
        console.log('To delete the group and resources run:');
        console.log(chalk.default.italic(`az group delete -g ${args.name} --no-wait`));
    }
    process.exit(1);
}

function logCommand(args: ICloneArgs, message: string, command: string) {
    if (!args.quiet) {
        console.log(chalk.default.bold(message));
        if (args.verbose) {
            console.log(chalk.default.italic(command));
        }
    }
}

class AzBotServiceVersion {
    constructor(version: string) {
        const versionPattern = /([0-9]+)\.([0-9]+)\.([0-9]+)\)/;
        const versions = versionPattern.exec(version) || ['0', '0', '0', '0'];
        this.major = parseInt(versions[1]);
        this.minor = parseInt(versions[2]);
        this.patch = parseInt(versions[3]);
    }

    public major: number;
    public minor: number;
    public patch: number;

    public isOlder(version: AzBotServiceVersion): boolean {
        if (version.major == this.major && version.minor == this.minor && version.patch == this.patch)
            return false;

        if (version.major >= this.major)
            return true;

        if (version.minor >= this.minor)
            return true;

        if (version.patch >= this.patch)
            return true;

        return false;
    }
}
