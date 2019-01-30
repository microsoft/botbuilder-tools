/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import { AppInsightsService, BlobStorageService, BotConfiguration, BotRecipe, BotService, CosmosDbService, DispatchService, EndpointService, FileService, GenericService, IBlobResource, IBotService, ICosmosDBResource, IDispatchResource, IDispatchService, IEndpointService, IFileResource, IGenericResource, ILuisService, IResource, IUrlResource, LuisService, QnaMakerService, ServiceTypes } from 'botframework-config';
import * as chalk from 'chalk';
import * as child_process from 'child_process';
import * as program from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import * as txtfile from 'read-text-file';
import * as readline from 'readline-sync';
import * as url from 'url';
import * as util from 'util';
import * as uuid from 'uuid';
import { spawnAsync } from './processUtils';
import { logAsync } from './stdioAsync';
import { luisPublishRegions, RegionCodes, regionToAppInsightRegionNameMap, regionToLuisAuthoringRegionMap, regionToLuisPublishRegionMap, regionToSearchRegionMap } from './utils';
const Table = require('cli-table3');
const opn = require('opn');
const commandExistsSync = require('command-exists').sync;
const exec = util.promisify(child_process.exec);

const AZCLIMINVERSION = '(2.0.53)'; // This corresponds to the AZ CLI version that shipped after the Bot Builder 4.2 release (December 2018).

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    program.help();
};

interface ICloneArgs {
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
    luisAuthoringRegion: string;
    luisAuthoringKey: string;
    luisPublishRegion: string | undefined;
    luisSubscriptionKey: string;
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
}

program
    .name('msbot clone services')
    .option('-n, --name <name>', 'Name of new bot')
    .option('-f, --folder <folder>', 'Path to folder containing exported resources')
    .option('-l, --location <location>', 'Location to create the bot service in (westus, ...)')
    .option('--luisAuthoringKey <luisAuthoringKey>', 'Authoring key from the appropriate luisAuthoringRegion for LUIS resources')
    .option('--luisAuthoringRegion <luisAuthoringRegion>', '(OPTIONAL) [westus|westeurope|australiaeast] authoring region to put LUIS models into (default is based on location)')
    .option('--luisPublishRegion <luisRegion>', '(OPTIONAL) Region to publish LUIS models to (default fallback is based location || luisAuthoringRegion)')
    .option('--subscriptionId <subscriptionId>', '(OPTIONAL) Azure subscriptionId to clone bot to, if not passed then current az account will be used')
    .option('--insightsRegion <insightsRegion>', '(OPTIONAL) Region to create appInsights account in (default is based on location)')
    .option('--groupName <groupName>', '(OPTIONAL) groupName for cloned bot, if not passed then new bot name will be used for the new group')
    .option('--sdkLanguage <sdkLanguage>', '(OPTIONAL) language for bot [Csharp|Node] (Default:CSharp)')
    .option('--sdkVersion <sdkVersion>', '(OPTIONAL) SDK version for bot [v3|v4] (Default:v4)')
    .option('--prefix', 'Append [msbot] prefix to all messages')
    .option('--appId <appId>', '(OPTIONAL) Application ID for an existing application, if not passed then a new Application will be created')
    .option('--appSecret <appSecret>', '(OPTIONAL) Application Secret for an existing application, if not passed then a new Application will be created')
    .option('--proj-file <projfile>', '(OPTIONAL) The local project file to created bot service')
    .option('--code-dir <path>', '(OPTIONAL) Passing in --code-dir will auto publish the folder path to created bot service')
    .option('-q, --quiet', 'Minimize output')
    .option('--verbose', 'Show commands')
    .option('--force', 'Do not prompt for confirmation')
    .description('allows you to clone all of the services a bot uses into a new Azure resource group')
    .action((cmd: program.Command, actions: program.Command) => undefined);

const cmd: program.Command = program.parse(process.argv);
const args = <ICloneArgs>{};
Object.assign(args, cmd);

if (typeof (args.name) != 'string') {
    console.error(chalk.default.redBright('missing --name argument'));
    showErrorHelp();
}

if (args.name.length < 4 || args.name.length > 42) {
    console.error(chalk.default.redBright('name has to be between 4 and 42 characters long'));
    showErrorHelp();
}

// verify that the user has AZ CLI
if (!commandExistsSync('az')) {
    console.error(chalk.default.redBright('AZ CLI is not installed or cannot be found. \n\nSee https://aka.ms/msbot-clone-services for pre-requisites.'));
    showErrorHelp();
}

if (fs.existsSync(args.name + '.bot')) {
    console.error(chalk.default.redBright(`${args.name}.bot already exists. Please choose a different name or delete ${args.name}.bot and try again.`));
    showErrorHelp();
}

if (!args.folder) {
    console.error(chalk.default.redBright(`missing --folder argument`));
    showErrorHelp();
}

if (!fs.existsSync(path.join(args.folder, 'bot.recipe'))) {
    console.error(chalk.default.redBright(`No bot.recipe file found under ${args.folder}. Please provide the folder that contains the recipe file`));
    showErrorHelp();
}

if (!args.location) {
    console.error(chalk.default.redBright(`missing --location argument`));
    showErrorHelp();
}

if (!Object.values(RegionCodes).find((r) => args.location == r)) {
    console.error(chalk.default.redBright(`${args.location} is not a valid region code.  Supported Regions are:\n${Object.values(RegionCodes).join(',\n')}`));
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
    if (!args.sdkVersion) {
        args.sdkVersion = "v4";
    }

    if (!args.sdkLanguage) {
        if (fs.existsSync("package.json")) {
            args.sdkLanguage = "Node";
        } else {
            args.sdkLanguage = "CSharp";
        }
    }

    if (!args.groupName) {
        args.groupName = args.name;
    }

    if ((<any>args)['proj-file']) {
        args.projFile = (<string>(<any>args)['proj-file']);
        console.log(args.projFile);
    }
    else if ((<any>args)['code-dir']) {
        args.codeDir = (<string>(<any>args)['code-dir']);
        console.log(args.codeDir);
    }

    if (!args.projFile && !args.codeDir) {
        let files = fs.readdirSync('.');
        for (let file of files) {
            if (path.extname(file) == '.csproj') {
                args.projFile = file;
                break;
            }
        }
    }

    // verify az command exists and is correct version
    await checkAzBotServiceVersion();

    if (args.projFile) {
        await checkDotNetRequirement();
    }

    let recipeJson = await txtfile.read(path.join(args.folder, `bot.recipe`));
    let recipe = <BotRecipe>JSON.parse(recipeJson);

    // get subscription account data
    let command: string = `az account show `;
    if (args.subscriptionId) {
        command += `--subscription ${args.subscriptionId}`;
    }

    let azAccount = await runCommand(command, `Fetching subscription account`);
    args.subscriptionName = azAccount.name;
    args.subscriptionId = azAccount.id;
    args.tenantId = azAccount.tenantId;

    try {
        // pass 0 - tell the user what are going to create
        if (!args.quiet) {
            let bot = 0;
            let appInsights = 0;
            let storage = 0;
            let sitePlan = 0;
            console.log("The following services will be created by this operation:");

            const table = new Table({
                // don't use lines for table
                chars: {
                    'top': '', 'top-mid': '', 'top-left': '', 'top-right': '',
                    'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
                    'left': '', 'left-mid': '', 'right': '', 'right-mid': '',
                    'mid': '', 'mid-mid': '', 'middle': ''
                },
                head: [chalk.default.bold('Service'), chalk.default.bold('Location'), chalk.default.bold('SKU'), chalk.default.bold("Resource Group")],
                colWidths: [40, 20, 20, 20],
                style: { 'padding-left': 1, 'padding-right': 1 },
                wordWrap: true
            });

            let hasSitePlan = false;
            let rows = [];
            for (let resource of recipe.resources) {
                switch (resource.type) {
                    case ServiceTypes.AppInsights:
                        let appInsightsRegion = regionToAppInsightRegionNameMap[args.location];
                        if (appInsightsRegion) {
                            rows.push([`Azure AppInsights Service`, `${appInsightsRegion}`, `F0`, args.groupName]);
                        }
                        break;

                    case ServiceTypes.BlobStorage:
                        rows.push(['Azure Blob Storage Service', `${args.location}`, 'Standard_LRS', args.groupName]);
                        break;

                    case ServiceTypes.Bot:
                        rows.push([`Azure Bot Service Registration`, `Global`, ``, args.groupName]);
                        if (!hasSitePlan) {
                            rows.push([`Azure App Site Plan`, `${args.location}`, `S1`, args.groupName]);
                            hasSitePlan = true;
                        }
                        rows.push([`Azure WebApp Service (Bot)`, `${args.location}`, ``, args.groupName]);
                        break;

                    case ServiceTypes.CosmosDB:
                        rows.push([`Azure CosmosDB Service`, `${args.location}`, `1 write region`, args.groupName]);
                        break;

                    case ServiceTypes.Endpoint:
                        break;

                    case ServiceTypes.File:
                        break;

                    case ServiceTypes.Generic:
                        break;

                    case ServiceTypes.Dispatch:
                    case ServiceTypes.Luis:
                        if (!args.luisAuthoringKey) {
                            throw new Error('missing --luisAuthoringKey argument');
                        }

                        if (!args.luisPublishRegion) {
                            args.luisPublishRegion = luisPublishRegions.find((value) => value == args.location);
                            if (!args.luisPublishRegion) {
                                args.luisPublishRegion = regionToLuisPublishRegionMap[args.location];
                            }
                        }

                        if (resource.type == ServiceTypes.Dispatch)
                            rows.push([`Azure LUIS Cognitive Service (Dispatch)`, `${args.luisPublishRegion}`, `S0`, args.groupName]);
                        else
                            rows.push([`Azure LUIS Cognitive Service`, `${args.luisPublishRegion}`, `S0`, args.groupName]);
                        break;

                    case ServiceTypes.QnA:
                        rows.push([`Azure QnA Maker Service`, `westus`, `S0`, args.groupName]);
                        if (!hasSitePlan) {
                            rows.push([`Azure App Site Plan`, `${args.location}`, `S1`, args.groupName]);
                            hasSitePlan = true;
                        }
                        rows.push([`Azure WebApp Service (QnA)`, `${args.location}`, ``, args.groupName]);
                        rows.push([`Azure Search Service`, `${regionToSearchRegionMap[args.location]}`, `Standard`, args.groupName]);
                        break;

                    default:
                        break;
                }
            }
            rows.sort((a, b) => a[0].localeCompare(b[0]));
            for (let row of rows)
                table.push(row);
            await logAsync(table.toString());

            console.log(`Resources will be created in subscription: ${chalk.default.bold(azAccount.name)} (${azAccount.id})`);
            if (!args.force) {
                const answer = readline.question(`Would you like to perform this operation? [y/n]`);
                if (answer == "no" || answer == "n") {
                    // remove orphaned bot file if it exists
                    if (fs.existsSync(args.name + '.bot')) fs.unlinkSync(args.name + '.bot');
                    console.log("Canceling the operation");
                    process.exit(1);
                }
            }
        }

        // pass 1 - create bot if we are going to need one.  This will create 
        // * group
        // * sitePlan
        // * site
        // * appInsights
        // * storage
        // create group
        let azGroup: any;
        let azBot: IBotService | undefined;
        let azSitePlan: any;
        let storageInfo;
        let azQnaSubscription: any;
        let azLuisSubscription: any;
        let azAppInsights: any;
        let azBotExtended: any;
        let azBotEndpoint: IEndpointService | undefined;


        // create group if not created yet
        azGroup = await createGroup();

        for (let resource of recipe.resources) {
            if (resource.type == ServiceTypes.Bot) {
                if (!azBot) {
                    azBot = await createBot();
                    azBotEndpoint = <IEndpointService><any>azBot;

                    azBotExtended = await runCommand(`az bot show -g ${args.groupName} -n ${args.name} --subscription ${args.subscriptionId}`,
                        `Fetching bot extended information [${args.name}]`);

                    // fetch co-created resources so we can get blob and appinsights data
                    let azGroupResources = await runCommand(`az resource list -g ${azGroup.name} --subscription ${args.subscriptionId}`,
                        `Fetching co-created resources [${args.name}]`);
                    let botWebSite;
                    for (let resource of azGroupResources) {
                        switch (resource.type) {
                            case "microsoft.insights/components":
                                azAppInsights = resource;
                                break;
                            case "Microsoft.Storage/storageAccounts":
                                storageInfo = resource;
                                break;
                            case "Microsoft.Web/serverfarms":
                                azSitePlan = resource;
                                break;
                            case "Microsoft.Web/sites":
                                // the website for the bot does have the bot name in it (qna host does)
                                if (resource.name.indexOf('-qnahost') < 0)
                                    botWebSite = resource;
                                break;
                        }
                    }
                    // get appSettings from botAppSite (specifically to get secret)
                    if (botWebSite) {
                        let botAppSettings = await runCommand(`az webapp config appsettings list -g ${args.groupName} -n ${botWebSite.name} --subscription ${args.subscriptionId}`,
                            `Fetching bot website appsettings [${args.name}]`);
                        for (let setting of botAppSettings) {
                            if (setting.name == "botFileSecret") {
                                args.secret = setting.value;
                                break;
                            }
                        }

                        if (!args.secret) {
                            args.secret = BotConfiguration.generateKey();
                            // set the appsetting
                            await runCommand(`az webapp config appsettings set -g ${args.groupName} -n ${botWebSite.name} --settings botFileSecret="${args.secret}" --subscription ${args.subscriptionId}`,
                                `Setting bot website appsettings secret [${args.name}]`);
                        }

                    } else {
                        throw new Error('botsite was not found');
                    }

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
            }
        }

        // pass 2 - create LUIS and QNA cognitive service subscriptions (and hosting services)
        for (let resource of recipe.resources) {
            switch (resource.type) {
                case ServiceTypes.Luis:
                case ServiceTypes.Dispatch:
                    if (!azLuisSubscription) {
                        if (!args.luisAuthoringRegion) {
                            if (regionToLuisAuthoringRegionMap.hasOwnProperty(args.location))
                                args.luisAuthoringRegion = regionToLuisAuthoringRegionMap[args.location];
                            else
                                throw new Error(`${args.location} does not have a valid luisAuthoringRegion.  Pass --luisAuthoringRegion to tell us which region you are in`);
                        }

                        if (!args.luisPublishRegion) {
                            args.luisPublishRegion = luisPublishRegions.find((value) => value == args.location);
                            if (!args.luisPublishRegion) {
                                args.luisPublishRegion = regionToLuisAuthoringRegionMap[args.location];
                            }
                        }

                        // create luis subscription
                        let luisCogsName = `${args.name}-LUIS`;
                        azLuisSubscription = await runCommand(`az cognitiveservices account create -g ${azGroup.name} --kind LUIS -n "${luisCogsName}" --location ${args.luisPublishRegion} --sku S0 --yes --subscription ${args.subscriptionId}`,
                            `Creating LUIS Cognitive Service [${luisCogsName}]`);

                        // get keys
                        let luisKeys = await runCommand(`az cognitiveservices account keys list -g ${azGroup.name} -n "${luisCogsName}" --subscription ${args.subscriptionId}`,
                            `Fetching LUIS Keys [${luisCogsName}]`);
                        args.luisSubscriptionKey = luisKeys.key1;
                    }
                    break;

                case ServiceTypes.QnA:
                    if (!azQnaSubscription) {

                        if (!azSitePlan) {
                            azSitePlan = await runCommand(`az appservice plan create -g  ${args.groupName} --sku s1 --name ${args.name} --subscription ${args.subscriptionId}`,
                                `Creating site plan [${args.name}]`);
                        }
                        // create qnaMaker service in resource group

                        // we have a group, and app service, 

                        // provision search instance
                        let searchName = args.name.toLowerCase() + '-search';
                        let searchResult = await runCommand(`az search service create -g ${azGroup.name} -n "${searchName}" --location ${regionToSearchRegionMap[args.location]} --sku standard --subscription ${args.subscriptionId}`,
                            `Creating Azure Search Service [${searchName}]`);

                        // get search keys
                        let searchKeys = await runCommand(`az search admin-key show -g ${azGroup.name} --service-name "${searchName}" --subscription ${args.subscriptionId}`,
                            `Fetching Azure Search Service keys [${searchName}]`);

                        // create qna host service
                        let qnaHostName = args.name + '-qnahost';
                        let createQnaWeb = await runCommand(`az webapp create -g ${azGroup.name} -n ${qnaHostName} --plan ${args.name} --subscription ${args.subscriptionId}`,
                            `Creating QnA Maker host web service [${qnaHostName}]`);

                        // configure qna web service settings
                        command = `az webapp config appsettings set -g ${azGroup.name} -n ${qnaHostName} --subscription ${args.subscriptionId} --settings `;
                        command += `"AzureSearchName=${searchName}" `;
                        command += `AzureSearchAdminKey=${searchKeys.primaryKey} `;
                        command += `PrimaryEndpointKey=${qnaHostName}-PrimaryEndpointKey  `;
                        command += `SecondaryEndpointKey=${qnaHostName}-SecondaryEndpointKey `;
                        command += `DefaultAnswer="No good match found in KB." `;
                        command += `QNAMAKER_EXTENSION_VERSION="latest"`;
                        await runCommand(command, `Configuring QnA Maker host web service settings [${qnaHostName}]`);

                        await runCommand(`az webapp cors add -g ${azGroup.name} -n ${qnaHostName} -a "*" --subscription ${args.subscriptionId}`,
                            `Configuring QnA Maker host web service CORS [${qnaHostName}]`);

                        // create qnamaker account
                        let qnaAccountName = args.name + '-QnAMaker';
                        command = `az cognitiveservices account create -g ${azGroup.name} --kind QnAMaker -n "${qnaAccountName}" --sku S0 --subscription ${args.subscriptionId} `;
                        // NOTE: currently qnamaker is only available in westus
                        command += `--location westus --yes `;
                        command += `--api-properties qnaRuntimeEndpoint=https://${qnaHostName}.azurewebsites.net`;
                        azQnaSubscription = await runCommand(command, `Creating QnA Maker Cognitive Service [${qnaAccountName}]`);

                        // get qna subscriptionKey
                        let azQnaKeys = await runCommand(`az cognitiveservices account keys list -g ${azGroup.name} -n "${qnaAccountName}" --subscription ${args.subscriptionId}`,
                            `Fetching QnA Maker Cognitive Service [${qnaAccountName}]`);
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

        // pass 3- create the actual services
        for (let resource of recipe.resources) {

            switch (resource.type) {

                case ServiceTypes.AppInsights:
                    {
                        // this was created via az bot create, hook it up
                        if (azAppInsights && resource.id) {
                            let appInsights = await getAppInsightsService(azAppInsights);
                            appInsights.id = resource.id; // keep original id
                            config.services.push(appInsights);
                        } else {
                            console.warn("WARNING: No bot appInsights plan was created because no bot was created");
                        }
                        await config.save();
                    }
                    break;

                case ServiceTypes.BlobStorage:
                    {
                        // this was created via az bot create, get the connection string and then hook it up
                        if (!storageInfo) {
                            let storageName: string = `${azGroup.name.toLowerCase() + generateShortId()}storage`;
                            storageInfo = await runCommand(`az storage account create -g ${azGroup.name} -n "${storageName}" --location ${args.location} --sku Standard_LRS --subscription ${args.subscriptionId}`,
                                `Creating Azure Blob Storage  [${storageName}]`);
                        }

                        if (storageInfo) {
                            let blobConnection = await runCommand(`az storage account show-connection-string -g ${azGroup.name} -n "${storageInfo.name}" --subscription ${args.subscriptionId}`,
                                `Fetching Azure Blob Storage connection string [${args.name}]`);

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
                        }
                        await config.save();
                    }
                    break;

                case ServiceTypes.Bot:
                    {
                        // already created
                    }
                    break;

                case ServiceTypes.CosmosDB:
                    {
                        let cosmosResource = <ICosmosDBResource>resource;
                        let cosmosName = `${args.name.toLowerCase()}`;

                        // az cosmosdb create --n name -g Group1
                        let cosmosDb = await runCommand(`az cosmosdb create -n ${cosmosName} -g ${azGroup.name} --subscription ${args.subscriptionId}`,
                            `Creating Azure CosmosDB account [${cosmosName}] ${chalk.default.italic.yellow(`(Please be patient, this may take 5 minutes)`)}`);

                        // get keys
                        let cosmosDbKeys = await runCommand(`az cosmosdb list-keys -g ${azGroup.name} -n ${cosmosName} --subscription ${args.subscriptionId}`,
                            `Fetching Azure CosmosDB account keys [${args.name}]`);

                        // az cosmosdb database create -n clonebot1cosmosdb --key <key> -d db1 --url-connection https://clonebot1cosmosdb.documents.azure.com:443/
                        await runCommand(`az cosmosdb database create -g ${azGroup.name} -n ${cosmosName} --key ${cosmosDbKeys.primaryMasterKey} -d ${cosmosResource.database} --url-connection https://${cosmosName}.documents.azure.com:443/ --subscription ${args.subscriptionId}`,
                            `Creating Azure CosmosDB database [${cosmosResource.database}]`);

                        // az cosmosdb collection create -n clonebot1cosmosdb --key <key> -d db1 --url-connection https://clonebot1cosmosdb.documents.azure.com:443/ --collection-name collection
                        await runCommand(`az cosmosdb collection create -g ${azGroup.name} -n ${cosmosName} --key ${cosmosDbKeys.primaryMasterKey} -d ${cosmosResource.database} --url-connection https://${cosmosName}.documents.azure.com:443/ --collection-name ${cosmosResource.collection} --subscription ${args.subscriptionId}`,
                            `Creating Azure CosmosDB collection [${cosmosResource.collection}]`);

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
                                appId: (azBotEndpoint) ? azBotEndpoint.appId : '',
                                appPassword: (azBotEndpoint) ? azBotEndpoint.appPassword : '',
                                endpoint: urlResource.url
                            }));
                        } else {
                            // merge oldUrl and new Url hostname
                            let oldUrl = new url.URL(urlResource.url);
                            if (azBotEndpoint) {

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
                            } else {
                                console.warn("There is no cloud endpoint to because there is no bot created");
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
                        if (!commandExistsSync('luis')) {
                            console.error(chalk.default.redBright(`Unable to find LUIS CLI. Please install via npm i -g luis-apis and try again. \n\nSee https://aka.ms/msbot-clone-services for pre-requisites.`))
                            showErrorHelp();
                        }
                        let luisService = await importAndTrainLuisApp(resource);
                        luisService.id = `${resource.id}`; // keep same resource id
                        config.services.push(luisService);
                        await config.save();
                    }
                    break;

                case ServiceTypes.QnA:
                    {
                        if (!commandExistsSync('qnamaker')) {
                            console.error(chalk.default.redBright(`Unable to find QnAMaker CLI. Please install via npm i -g qnamaker and try again. \n\nSee https://aka.ms/msbot-clone-services for pre-requisites.`))
                            showErrorHelp();
                        }
                        // qnamaker create kb --subscriptionKey c87eb99bfc274a4db6b671b43f867575  --name testtesttest --in qna.json --wait --msbot -q
                        let qnaPath = path.join(args.folder, `${resource.id}.qna`);
                        let kbName = resource.name;

                        let svc = await runCommand(`qnamaker create kb --subscriptionKey ${args.qnaSubscriptionKey} --name "${kbName}" --in ${qnaPath} --wait --msbot -q`,
                            `Creating QnA Maker KB [${kbName}]`);
                        let service = new QnaMakerService(svc);
                        service.id = `${resource.id}`; // keep id
                        service.name = kbName;
                        config.services.push(service);
                        await config.save();

                        // publish  
                        try {
                            await runCommand(`qnamaker publish kb --subscriptionKey ${service.subscriptionKey} --kbId ${service.kbId} --hostname ${service.hostname} --endpointKey ${service.endpointKey}`,
                                `Publishing QnA Maker KB [${kbName}]`);
                        } catch (err) {
                            console.warn(err.message || err);
                        }
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
            if (!hasBot) {
                // created via az bot create, register the result
                config.connectService(new BotService({
                    name: azBot.name,
                    tenantId: args.tenantId,
                    subscriptionId: args.subscriptionId,
                    resourceGroup: args.groupName,
                    serviceName: azBot.name,
                    appId: azBot.appId
                }));
            }

            if (azBotEndpoint) {
                // add endpoint
                config.connectService(new EndpointService({
                    type: ServiceTypes.Endpoint,
                    name: "production",
                    appId: azBotEndpoint.appId,
                    appPassword: azBotEndpoint.appPassword,
                    endpoint: azBotEndpoint.endpoint
                }));

                await config.save();
            }

            if (!hasAppInsights) {
                if (azAppInsights) {
                    let appInsights = await getAppInsightsService(azAppInsights);
                    config.connectService(appInsights);
                } else {
                    console.warn("WARNING: No bot appInsights plan was created because no bot was created");
                }
                await config.save();
            }

            if (!hasBlob && storageInfo) {
                // this was created via az bot create, get the connection string and then hook it up
                let blobConnection = await runCommand(`az storage account show-connection-string -g ${azGroup.name} -n "${storageInfo.name}" --subscription ${args.subscriptionId}`,
                    `Fetching storage connection string [${storageInfo.name}]`);

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

        if (args.secret) {
            console.log(`\nThe secret used to decrypt ${config.getPath()} is:`);
            console.log(chalk.default.magentaBright(args.secret));

            console.log(chalk.default.yellowBright(`\nNOTE: This secret is not recoverable and you should save it in a safe place according to best security practices.`));
            console.log(chalk.default.yellowBright(`      Copy this secret and use it to open the ${config.getPath()} the first time.`));
            await config.save(args.secret);
        }

        if (azBot) {
            // update local safe settings
            await updateLocalSafeSettings(azBot);

            // publish local bot code to web service
            await publishBot(azBot);

            // show emulator url with secret 
            if (args.secret) {
                let fullPath = path.resolve(process.cwd(), config.getPath());
                let productionEndpoint = config.findServiceByNameOrId('production');
                let botFileUrl = `bfemulator://bot.open?path=${encodeURIComponent(fullPath)}&secret=${encodeURIComponent(args.secret)}`;
                if (productionEndpoint) {
                    botFileUrl += `&id=${productionEndpoint.id}`;
                }
                console.log('To open this bot file in emulator:');
                console.log(chalk.default.cyanBright(botFileUrl));

                // auto launch emulator with url so it can memorize the secret so you don't need to remember it.  <whew!>
                process.env.ELECTRON_NO_ATTACH_CONSOLE = "true";
                opn(botFileUrl, { wait: false });
            }
        }

        console.log(`Done.`);
    } catch (error) {
        if (error.message) {

            let lines = error.message.split('\n');
            let message = '';
            for (let line of lines) {
                // trim to copyright symbol, help from inner process command line args is inappropriate
                if (line.indexOf('©') > 0)
                    break;
                message += line;
            }
            throw new Error(message);
        }
        throw new Error(error);
    }
}

async function checkDotNetRequirement(): Promise<void> {
    let minVersion = [2, 1, 500];
    if (!commandExistsSync('dotnet')) {
        ShowDotnetRequirementHelp(minVersion);
        process.exit(1);
    }
    else {
        let dotnetVersion = <string>await runCommand('dotnet --version', 'checking dotnet requirement');
        let versions = dotnetVersion.split('.');
        if (parseInt(versions[0]) < minVersion[0]) {
            ShowDotnetRequirementHelp(minVersion);
            process.exit(1);
        } else if (parseInt(versions[0]) == minVersion[0] && parseInt(versions[1]) < minVersion[1]) {
            ShowDotnetRequirementHelp(minVersion);
            process.exit(1);
        } else if (parseInt(versions[0]) == minVersion[0] && parseInt(versions[1]) == minVersion[1] && parseInt(versions[2]) < minVersion[2]) {
            ShowDotnetRequirementHelp(minVersion);
            process.exit(1);
        }
    }
}

function ShowDotnetRequirementHelp(minVersion: number[]) {
    console.error(chalk.default.redBright(`This operation requires Dotnet Core SDK ${minVersion.join('.')} or newer to be installed.`));
    console.error(chalk.default.redBright('Go to https://www.microsoft.com/net/download to install on your system.'));
}

/**
 * Updates local appsettings.json and .env files with botFilePath and botFileSecret entries.
 * @param {IBotService} azBot 
 */
async function updateLocalSafeSettings(azBot?: IBotService): Promise<void> {
    if (azBot) {

        // update local environment settings
        if (fs.existsSync('appsettings.json')) {
            console.log(`Updating appsettings.json with botFilePath=${config.getPath()}`);
            let settings = JSON.parse(txtfile.readSync('appsettings.json'));
            settings.botFilePath = config.getPath();
            fs.writeFileSync('appsettings.json', JSON.stringify(settings, null, 4), { encoding: 'utf8' });

            if (args.secret) {

                // some projfiles won't have a userSecret set, check for it
                if (args.projFile) {
                    let proj = txtfile.readSync(args.projFile);
                    if (proj.indexOf('<UserSecretsId>') < 0) {
                        // doesn't have it, add one
                        let end = proj.indexOf('</Project');
                        let newProj = proj.substring(0, end);
                        newProj += `<PropertyGroup><UserSecretsId>${uuid.v4()}</UserSecretsId></PropertyGroup>\n`;
                        newProj += proj.substring(end);
                        fs.writeFileSync(args.projFile, newProj, { encoding: 'utf8' });
                    }
                }

                // save secret
                await runCommand(`dotnet user-secrets set botFileSecret ${args.secret}`, `Saving the botFileSecret with dotnet user-secrets`);

                // make sure that startup.cs has configuration information
                if (fs.existsSync('startup.cs')) {
                    let startup = txtfile.readSync('startup.cs');
                    // if it doesn't have .AddUserSecrets call
                    if (startup.indexOf('.AddUserSecrets') < 0) {
                        let i = startup.indexOf('Configuration = builder.Build();');
                        if (i > 0) {
                            let newStartup = startup.substring(0, i);
                            console.log('Updating startup.cs to use user-secrets');
                            newStartup += 'if (env.IsDevelopment()) \n                builder.AddUserSecrets<Startup>();\n\n                ' + startup.substring(i);
                            fs.writeFileSync('startup.cs', newStartup, { encoding: 'utf8' });
                        } else {
                            console.log(chalk.default.yellow('You need to add following code to your dotnet configuration\n'));
                            console.log('if (env.IsDevelopment()) builder.AddUserSecrets<Startup>();')
                        }
                    }
                }
            }
        } else if (fs.existsSync('.env')) {
            console.log(`Updating .env with path and secret`);
            let lines = txtfile.readSync('.env').split('\n');
            let newEnv = '';
            let pathLine = `botFilePath="${config.getPath()}"\n`;
            let secretLine = `botFileSecret="${args.secret}"\n`;
            let foundPath = false;
            let foundSecret = false;
            for (let line of lines) {
                let i = line.indexOf('=');
                if (i > 0) {
                    let name = line.substring(0, i);
                    let value = line.substring(i + 1);
                    switch (name) {
                        case 'botFilePath':
                            newEnv += pathLine;
                            foundPath = true;
                            break;
                        case "botFileSecret":
                            newEnv += secretLine;
                            foundSecret = true;
                            break;
                        default:
                            newEnv += line + '\n';
                            break;
                    }
                } else {
                    // pass through
                    newEnv += line + '\n';
                }
            }
            if (!foundPath) {
                newEnv += pathLine;
            }
            if (!foundSecret) {
                newEnv += secretLine;
            }

            fs.writeFileSync('.env', newEnv.trimRight(), { encoding: 'utf8' });
        }
    }
}

/**
 * Calls creates a publish command and potentially calls it if code-dir is passed in.
 * Also creates local scripts to make it easier to publish local source code by already having the code formulated.
 * @param azBot
 */
async function publishBot(azBot: IBotService): Promise<void> {
    let azPublishCmd: string = createPublishCmds(azBot);
    let result: string | null = null;
    if (args.codeDir) {
        azPublishCmd += `--code-dir "${args.codeDir}" `;
        result = await runCommand(azPublishCmd, `Publishing the local folder ${args.codeDir} to ${args.name} service`);
    }
    await createLocalPublishCmds(azPublishCmd, !!result);
}

function createPublishCmds(azBot: IBotService): string {
    let azPublishCmd = `az bot publish --resource-group ${args.groupName} -n ${azBot.name} --subscription ${args.subscriptionId} -v ${args.sdkVersion || 'v4'} `;
    if (args.projFile) {
        azPublishCmd += `--proj-name "${args.projFile}" `;
    }
    if (args.verbose) {
        azPublishCmd += '--verbose ';
    }
    
    return azPublishCmd;
}

async function createLocalPublishCmds(azCmd: string, didPublishOccur: boolean): Promise<void> {
    if (!didPublishOccur) {
        console.log(chalk.default.yellowBright(`Your local bot was not published to Azure.`));
        console.log(chalk.default.yellowBright(`This was due to --code-dir not being passed in to \`msbot clone services\`.`));
    }
    console.log('You can publish your bot to the web using the following az bot publish command:');
    console.log(chalk.default.cyanBright('    ' + azCmd));

    console.log(`To make it easy to use that we have created ` + chalk.default.cyanBright('publish.cmd/sh') + ' batch file which you can use to publish any time to update your deployment.');
    fs.writeFileSync('publish.cmd', azCmd, { encoding: 'utf8' });
    fs.writeFileSync('publish', '#!/bin/bash\n' + azCmd, { encoding: 'utf8' });
    fs.chmodSync('publish', '755');
}

async function getAppInsightsService(azAppInsights: any): Promise<AppInsightsService> {
    let appInsights = await runCommand(`az resource show -g ${args.groupName} -n ${azAppInsights.name}  --resource-type microsoft.insights/components --subscription ${args.subscriptionId}`, `Fetching Azure AppInsights information [${azAppInsights.name}]`);
    return new AppInsightsService({
        type: ServiceTypes.AppInsights,
        tenantId: args.tenantId,
        subscriptionId: args.subscriptionId,
        resourceGroup: args.groupName,
        name: azAppInsights.name,
        serviceName: azAppInsights.name,
        instrumentationKey: appInsights.properties.InstrumentationKey,
        applicationId: appInsights.properties.AppId,
        apiKeys: {}
    });
}

async function runCommand(command: string, description: string): Promise<any> {
    logCommand(args, description, command);
    let p = await exec(command);
    try {
        return JSON.parse(p.stdout);
    } catch (err) {
        return p.stdout;
    }
}

async function checkAzBotServiceVersion() {
    let command = `az -v `;
    console.log(chalk.default.yellow(`With msbot 4.3.2 and later, the only AZ CLI prerequisite is having an AZ CLI version >= 2.0.53. If you have the botservice extension installed as well, please remove this via "az extension remove --name botservice".`));
    logCommand(args, `Checking az botservice version`, command);
    let p = await exec(command);
    let azCLIVersion = new ServiceVersion('(0.0.0)');
    for (let line of p.stdout.split('\n')) {
        if (line.startsWith('azure-cli')) {
            let newAZCLIVersion = new ServiceVersion(line);
            if (azCLIVersion.isOlder(newAZCLIVersion))
                azCLIVersion = newAZCLIVersion;
            break;
        }
    }
    let neededAZCLIVersion = new ServiceVersion(AZCLIMINVERSION);
    if (azCLIVersion.isOlder(neededAZCLIVersion)) {
        console.error(chalk.default.redBright(`You need to upgrade your AZ CLI version to >= ${neededAZCLIVersion.major}.${neededAZCLIVersion.minor}.${neededAZCLIVersion.patch}.
        You can install the latest AZ CLI from https://aka.ms/az-cli-download`));
        // remove orphaned bot file if it exists
        if (fs.existsSync(args.name + '.bot')) fs.unlinkSync(args.name + '.bot');
        process.exit(1);
    }
    return { command, p };
}


async function importAndTrainLuisApp(luisResource: IResource): Promise<LuisService> {
    let luisPath = path.join(args.folder, `${luisResource.id}.luis`);
    let luisService: LuisService;
    const luisAuthoringRegion = regionToLuisAuthoringRegionMap[args.location];
    let luisAppName = `${args.name}_${luisResource.name}`;
    let svcOut = <ILuisService>await runCommand(`luis import application --region ${luisAuthoringRegion} --appName "${luisAppName}" --in ${luisPath} --authoringKey ${args.luisAuthoringKey} --msbot`,
        `Creating and importing LUIS application [${luisAppName}]`);
    luisService = new LuisService(svcOut);

    // mark application as public (TEMPORARY, THIS SHOULD BE REMOVED ONCE LUIS PROVIDES KEY ASSIGN API)
    await runCommand(`luis update settings --region ${luisAuthoringRegion} --appId ${luisService.appId} --authoringKey ${luisService.authoringKey} --public true`,
        `Updating LUIS settings [${luisService.name}]`);

    try {
        let command = `luis train version --region ${luisAuthoringRegion} --appId ${luisService.appId} --authoringKey ${luisService.authoringKey} --versionId "${luisService.version}" --wait `;
        logCommand(args, `Training LUIS application [${luisService.name}]`, command);
        await spawnAsync(command, (out) => process.stdout.write(out), (err) => process.stderr.write(err));

        // publish application
        await runCommand(`luis publish version --region ${luisAuthoringRegion} --appId ${luisService.appId} --authoringKey ${luisService.authoringKey} --versionId "${luisService.version}" --publishRegion ${args.luisPublishRegion} `,
            `Publishing LUIS application [${luisService.name}] to ${args.luisPublishRegion}`);
    } catch (err) {
        console.warn(`WARNING: Failed to train or publish the LUIS application.\n${err.message || err}`);
    }

    return luisService;
}

async function createBot(): Promise<IBotService> {
    args.insightsRegion = args.insightsRegion || regionToAppInsightRegionNameMap[args.location];
    let command = `az bot create -g ${args.groupName} --name ${args.name} --kind webapp --location ${args.location} --insights-location "${args.insightsRegion}" --subscription ${args.subscriptionId}`;
    if (args.sdkVersion) {
        command += ` --version ${args.sdkVersion}`;
    }

    if (args.sdkLanguage) {
        command += ` --lang ${args.sdkLanguage}`;
    }

    // If we have an ApplicationID and Secret then we use this rather than auto-provision which can sometimes fail
    if (args.appId && args.appSecret) {
        console.log(`Using the provided ApplicationId and Secret rather than auto-provisioning`);
        command += ` --appid ${args.appId}`;
        command += ` -p "${args.appSecret}"`;
    }

    if (args.verbose) {
        command += ` --verbose`;
    }

    logCommand(args, `Creating Azure Bot Service [${args.name}]`, command);

    let stdout = await spawnAsync(command, undefined, (stderr) => {
        if (stderr.indexOf('https://microsoft.com/devicelogin') > 0) {
            console.log(`[az bot] ${stderr.replace('WARNING: ', '')}`);
            opn('https://microsoft.com/devicelogin');
        }
        else if (stderr.indexOf('Provisioning') > 0) {
            // we need to show warning to user so we can get instructions on logging in
            console.log(`[az bot] ${stderr.replace('WARNING: ', '')} ${chalk.default.italic.yellow(`(Please be patient, this may take several minutes)`)}`);
        }
    });
    let botService = <IBotService>JSON.parse(stdout);
    return botService;
}

async function createGroup(): Promise<any> {
    if (!args.location) {
        throw new Error('missing --location argument');
    }
    if (!args.groupName) {
        throw new Error('missing --groupName argument');
    }
    let azGroup = await runCommand(`az group create -g ${args.groupName} -l ${args.location} --subscription ${args.subscriptionId}`,
        `Creating Azure group [${args.groupName}]`);
    args.groupName = azGroup.name;
    return azGroup;
}

function showErrorHelp() {
    program.outputHelp((str) => {
        console.error(str);
        return '';
    });
    console.log(chalk.default.bold(`NOTE: You did not complete the operation.`));
    if (typeof (args.name) == 'string') {
        if (args.groupName && args.subscriptionId) {
            console.log('To delete the group and resources run:');
            console.log(chalk.default.italic(`az group delete -g ${args.groupName} --no-wait --subscription ${args.subscriptionId}`));
        }
    }
    process.exit(1);
}

function logCommand(args: ICloneArgs, message: string, command: string) {
    if (!args.quiet) {
        console.log(chalk.default.bold(message));
        if (args.verbose) {
            console.log(chalk.default.cyan(command));
        }
    }
}

function generateShortId() {
    // Generate pseudo-random 6-character UID
    return Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
}

class ServiceVersion {
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

    public isOlder(version: ServiceVersion): boolean {
        if (version.major == this.major && version.minor == this.minor && version.patch == this.patch)
            return false;

        if (version.major > this.major)
            return true;

        if (version.minor > this.minor)
            return true;

        if (version.patch > this.patch)
            return true;

        return false;
    }
}
