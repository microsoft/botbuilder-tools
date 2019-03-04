/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import { BotConfiguration, BotRecipe, IBlobResource, IBlobStorageService, IConnectedService, ICosmosDBResource, ICosmosDBService, IDispatchResource, IDispatchService, IEndpointService, IFileResource, IFileService, IGenericResource, IGenericService, ILuisService, IQnAService, IResource, IUrlResource, ServiceTypes } from 'botframework-config';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as fsx from 'fs-extra';
import * as process from 'process';
import { spawnAsync } from './processUtils';
import { regionToLuisAuthoringRegionMap } from './utils';

export interface ExportOptions {
    // should resources be downloaded info folder
    download: boolean;

    // progress callback during export
    progress?: (service: IConnectedService, command: string, index: number, total: number) => void
}

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    program.help();
};

interface IExportArgs {
    bot: string;
    folder: string;
    secret: string;
    quiet: boolean;
    verbose: boolean;
    args: string[];
}

program
    .name('msbot export services')
    .description('export all of the connected services to local folder with .bot.recipe file to support cloning')
    .option('-f, --folder <folder>', 'path to folder to place exported resources')
    .option('--verbose', 'show verbose export information')
    .option('-q, --quiet', 'disable output')
    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .option('--prefix', 'Append [msbot] prefix to all messages')
    .action((cmd: program.Command, actions: program.Command) => undefined);

const command: program.Command = program.parse(process.argv);
const args: IExportArgs = <IExportArgs>{};
Object.assign(args, command);
args.verbose = process.env.VERBOSE === 'verbose';

if (!args.bot) {
    BotConfiguration.loadBotFromFolder(process.cwd(), args.secret)
        .then(processConfiguration)
        .catch((reason: Error) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
} else {
    BotConfiguration.load(args.bot, args.secret)
        .then(processConfiguration)
        .catch((reason: Error) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
}

async function processConfiguration(config: BotConfiguration): Promise<void> {
    if (!args.folder) {
        throw new Error('missing --folder argument');
    }
    try {

        const recipe: BotRecipe = await exportBot(config, args.folder, {
            progress: (service: IConnectedService, newCommand: string, index: number, total: number): void => {
                if (!args.quiet) {
                    const output: string = `exporting ${chalk.default.bold(service.name)} [${service.type}] (${index}/${total})`;
                    if (args.verbose) {
                        console.warn(chalk.default.bold(output));
                        console.log(chalk.default.italic(`${newCommand}\n`));
                    } else {
                        console.warn(output);
                    }
                }
            }
        });
    } catch (error) {
        const lines: string[] = error.message.split('\n');
        for (const line of lines) {
            // trim to copywrite symbol, help from inner process command line args is inappropriate
            if (line.indexOf('©') > 0) {
                process.exit(1);
            }
            console.error(chalk.default.redBright(line));
        }
    }

}

// export the services from the bot file as resource files and recipe file
async function exportBot(config: BotConfiguration, folder: string, exportOptions?: Partial<ExportOptions>): Promise<BotRecipe> {
    let options = Object.assign({ download: true }, exportOptions);

    let recipe = new BotRecipe();

    await fsx.ensureDir(folder);

    let index = 0;
    for (let service of config.services) {
        index++;

        switch (service.type) {
            case ServiceTypes.Dispatch:
                {
                    await exportLuisService(service);

                    let dispatchResource: IDispatchResource = {
                        type: service.type,
                        id: service.id,
                        name: service.name,
                        serviceIds: (<IDispatchService>service).serviceIds
                    };
                    recipe.resources.push(dispatchResource);
                }
                break;
            case ServiceTypes.Luis:
                {
                    await exportLuisService(service);

                    let resource: IResource = {
                        type: service.type,
                        id: service.id,
                        name: service.name
                    };
                    recipe.resources.push(resource);
                }
                break;

            case ServiceTypes.QnA:
                {
                    let qnaService = <IQnAService>service;
                    if (options.download) {
                        let command = `qnamaker export kb --kbId ${qnaService.kbId} --environment prod --subscriptionKey ${qnaService.subscriptionKey} --hostname ${qnaService.hostname} --endpointKey ${qnaService.endpointKey}`;
                        if (options.progress) {
                            options.progress(service, command, index, config.services.length);
                        }
                        let json = '';
                        await spawnAsync(command, (stdout) => json += stdout, (stderr) => console.error(stderr));
                        // make sure it's json
                        JSON.parse(json);
                        await fsx.writeFile(folder + `/${qnaService.id}.qna`, json, { encoding: 'utf8' });
                    }
                    else {
                        if (options.progress) {
                            options.progress(service, '', index, config.services.length);
                        }
                    }

                    let resource: IResource = {
                        type: service.type,
                        id: service.id,
                        name: service.name
                    };
                    recipe.resources.push(resource);
                }
                break;

            case ServiceTypes.Endpoint:
                {
                    if (options.progress) {
                        options.progress(service, '', index, config.services.length);
                    }
                    let endpointResource: IUrlResource = {
                        type: ServiceTypes.Endpoint,
                        id: service.id,
                        name: service.name,
                        url: (<IEndpointService>service).endpoint
                    };
                    recipe.resources.push(endpointResource);
                }
                break;

            case ServiceTypes.BlobStorage:
                {
                    if (options.progress) {
                        options.progress(service, '', index, config.services.length);
                    }
                    let blobResource: IBlobResource = {
                        type: ServiceTypes.BlobStorage,
                        id: service.id,
                        name: service.name,
                        container: (<IBlobStorageService>service).container || ''
                    };
                    recipe.resources.push(blobResource);
                }
                break;

            case ServiceTypes.CosmosDB:
                {
                    if (options.progress) {
                        options.progress(service, '', index, config.services.length);
                    }
                    let cosmosDBResource: ICosmosDBResource = {
                        type: ServiceTypes.CosmosDB,
                        id: service.id,
                        name: service.name,
                        database: (<ICosmosDBService>service).database,
                        collection: (<ICosmosDBService>service).collection,
                    };
                    recipe.resources.push(cosmosDBResource);
                }
                break;

            case ServiceTypes.File:
                {
                    if (options.progress) {
                        options.progress(service, '', index, config.services.length);
                    }
                    let fileResource: IFileResource = {
                        type: ServiceTypes.File,
                        id: service.id,
                        name: service.name,
                        path: (<IFileService>service).path,
                    };
                    recipe.resources.push(fileResource);
                }
                break;

            case ServiceTypes.Generic:
                {
                    if (options.progress) {
                        options.progress(service, '', index, config.services.length);
                    }
                    console.warn(`WARNING: Generic services cannot be cloned and all configuration data will be passed unchanged and unencrypted `);
                    let genericService = <IGenericService>service;
                    let genericResource: IGenericResource = {
                        type: ServiceTypes.Generic,
                        id: service.id,
                        name: service.name,
                        url: genericService.url,
                        configuration: genericService.configuration,
                    };
                    recipe.resources.push(genericResource);
                }
                break;

            case ServiceTypes.Bot:
                {
                    if (options.progress) {
                        options.progress(service, '', index, config.services.length);
                    }

                    let resource: IResource = {
                        type: service.type,
                        id: service.id,
                        name: service.name
                    };
                    recipe.resources.push(resource);
                }
                break;

            case ServiceTypes.AppInsights:
                {
                    if (options.progress) {
                        options.progress(service, '', index, config.services.length);
                    }
                    let resource: IResource = {
                        type: service.type,
                        id: service.id,
                        name: service.name
                    };
                    recipe.resources.push(resource);
                }
                break;

            default:
                if (options.progress) {
                    options.progress(service, '', index, config.services.length);
                }
                console.warn(`WARNING: Unknown service type [${service.type}].  This service will not be exported.`);
                break;
        }
    }
    await fsx.writeFile(folder + `/bot.recipe`, JSON.stringify(recipe, null, 2), { encoding: 'utf8' });
    return recipe;

    async function exportLuisService(service: IConnectedService) {
        let luisService = <ILuisService>service;
        if (options.download) {
            const luisAuthoringRegion = regionToLuisAuthoringRegionMap[luisService.region];
            let command = `luis export version --region ${luisAuthoringRegion} --appId ${luisService.appId} --authoringKey ${luisService.authoringKey} --versionId "${luisService.version}"`;
            if (options.progress) {
                options.progress(service, command, index, config.services.length);
            }
            let json = '';
            await spawnAsync(command, (stdout) => json += stdout, (stderr) => console.error(stderr));
            // make sure it's json
            try {
                JSON.parse(json);
            } catch(err) {
                throw new Error(`${err.message || err}\n${json}`);
            }
            await fsx.writeFile(folder + `/${luisService.id}.luis`, json, { encoding: 'utf8' });
        }
        else {
            if (options.progress) {
                options.progress(service, '', index, config.services.length);
            }
        }
    }
}


function showErrorHelp(): void {
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
}
