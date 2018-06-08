/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import * as chalk from 'chalk';
import * as program from 'commander';
import * as fs from 'fs-extra';
import * as getStdin from 'get-stdin';
const Path = require('path');
import { BotConfig } from './BotConfig';
const exec = require('child-process-promise').exec;
const del = require('del');
import { ILuisService, ServiceType, IQnAService, IDispatchService, IFileService, IConnectedService } from '.';

program.Command.prototype.unknownOption = function (flag: any) {
    console.error(chalk.default.redBright(`Unknown arguments: ${process.argv.slice(2).join(' ')}`));
    program.help();
};

interface ImportArgs {
    args: string[];
    authoringKey: string;
    output?: string;
    publishedKey: string;
    publishedEndpoint: string;
    region: string;

    // QnA
    environment?: string;
    subscriptionKey: string;

    // Common
    secret?: string;
}

program
    .name('msbot import <importDir>')
    .description('import connected services from the importDir and generate services and a .bot file.')
    .option("<importDir>", "Directory with export files.")
    .option('-a, --authoringKey <authoringkey>', 'authoring key for using manipulating LUIS apps via the authoring API (See http://aka.ms/luiskeys for help)')
    .option('-r --region <region>', 'LUIS authoring region like "westus" which is the default.')
    .option('--publishedKey <publishedKey>', 'Key for calling published LUIS endpoint, default is authoringKey')
    .option('--publishedEndpoint <publishedEndpoint>', 'How to call published LUIS model, default is authoring region')
    .option('-s, --subscriptionKey <subscriptionKey>', 'Azure Cognitive Service subscriptionKey/accessKey for calling the QnA management API (from azure portal)')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .option("-o, --output <path>", 'output directory for new .bot file.  If not present will default to current directory.')
    .action((cmd: any, actions: any) => {
    });

let args = <ImportArgs><any>program.parse(process.argv);
processImportArgs(args);

function ensureDir(dir: string) {
    if (fs.existsSync(dir))
        del.sync([dir + '/*'], { force: true });
    else
        fs.mkdirSync(dir);
}

function findService(type: string, name: string, bot: BotConfig) {
    return bot.services.find(service => service.type === type && service.name === name);
}

function findLuisService(name: string, bot: BotConfig) {
    let service = <ILuisService>findService("luis", name, bot);
    if (!service) {
        service = <ILuisService>findService("dispatch", name, bot);
    }
    return service;
}

function findQnAService(name: string, bot: BotConfig) {
    return <IQnAService>findService("qna", name, bot);
}

function findFileService(name: string, bot: BotConfig) {
    return <IFileService>findService("file", name, bot);
}

async function luisImport(path: string, args: ImportArgs, bot: BotConfig, map: { [key: string]: string }) {
    let name = Path.basename(path, ".json");
    let service = findLuisService(name, bot);
    if (!service) throw ".Bot file is missing exported service " + name;
    if (!args.authoringKey) throw "Must include --authoringKey to import LUIS models";
    service.authoringKey = args.authoringKey;
    if (args.region) {
        service.authoringEndpoint = "https://" + args.region + ".api.cognitive.microsoft.com/luis/api/v2.0";
    }
    service.publishedKey = args.publishedKey && service.authoringKey;
    if (args.publishedEndpoint) {
        service.publishedEndpoint = args.publishedEndpoint;
    } else if (service.publishedEndpoint) {
        service.publishedEndpoint = service.publishedEndpoint.replace(/(.*\/\/)([^.]*)/, "$1" + args.region);
    }
    let keyAndBase =
        ' --authoringKey "' + service.authoringKey + '"'
        + ' --endpointBasePath "' + service.authoringEndpoint + '"';
    let importCmd = 'luis import application'
        + ' --in "' + path + '"' + keyAndBase;
    return exec(importCmd)
        .then(function (res: any) {
            let model = JSON.parse(res.stdout);
            service.appId = model.id;
            map[<string>service.id] = model.id;
            service.id = model.id;
            if (!service.publishedEndpoint) {
                service.publishedEndpoint = service.authoringEndpoint + "/apps/" + service.appId;
            }
            let trainCmd = 'luis train version'
                + ' --appId "' + service.appId + '"'
                + ' --versionId "' + service.versionId + '"';
            + keyAndBase;
            return exec(trainCmd)
        })
        .then(function (train: any) {
            let publishCmd = 'luis publish version'
                + ' --appId "' + service.appId
                + ' --versionId "' + service.versionId + '"';
            + keyAndBase;
            return exec(publishCmd)
        })
        .catch(function (err: any) {
            let list = 'luis list apps' + keyAndBase;
            return exec(list)
                .then(function (listRes: any) {
                    let apps = JSON.parse(listRes.stdout);
                    let app = apps.find(function (a: any) { return a.name === name; } );
                    if (app) {
                        console.error("LUIS already includes service " + name);
                        service.appId = app.id;
                        map[<string>service.id] = app.id;
                        service.id = app.id;
                    } else {
                        throw "Failed importing LUIS service " + name;
                    }
                });
        });
}

async function qnaImport(path: string, args: ImportArgs, bot: BotConfig, map: { [key: string]: string }) {
    let name = Path.basename(path, ".json");
    let service = findQnAService(name, bot);
    let key = ' --subscriptionKey "' + args.subscriptionKey + '"';
    if (!args.subscriptionKey) throw "Must include --subscriptionKey to import QnA Maker.";
    service.subscriptionKey = args.subscriptionKey;
    let list = 'qnamaker list kbs' + key;
    let isNew: boolean = false;
    return exec(list)
        .then(function (listRes: any) {
            let kbs: any[] = JSON.parse(listRes.stdout).knowledgebases;
            let kb = kbs.find(kb => kb.name === service.name);
            if (kb) {
                console.error("QnA Maker already has knowledge base " + service.name);
            } else {
                let create = 'qnamaker create kb'
                    + ' --in "' + path + '"'
                    + key
                    + ' --wait ' + ' -q'
                    + ' --name "' + service.name + '"';
                return exec(create);
            }
        })
        .then(function (createRes: any) {
            let list = 'qnamaker list kbs' + key;
            return exec(list);
        })
        .then(function (listRes: any) {
            let kbs: any[] = JSON.parse(listRes.stdout).knowledgebases;
            let kb = kbs.find(kb => kb.name === service.name);
            service.kbId = kb.id;
            map[<string>service.id] = kb.id;
            service.id = kb.id;
            let publish = 'qnamaker publish kb'
                + ' --kbId "' + service.kbId + '"'
                + ' --environment ' + service.environment
                + key;
            return exec(publish);
        })
        .then(function (publishRes: any) {
            let keysCmd = "qnamaker list endpointkeys" + key;
            return exec(keysCmd);
        })
        .then(function (keysRes: any) {
            let keys = JSON.parse(keysRes.stdout);
            service.endpointKey = keys.primaryEndpointKey;
        })
        .catch(function (err: any) {
            throw "Failed importing QnA Maker service " + name;
        });
}

async function fileImport(path: string, args: ImportArgs, bot: BotConfig, map: { [key: string]: string }) {
    let name = Path.basename(path);
    let service = findFileService(name, bot);
    service.filePath = path.replace(/\//g, '\\');
    map[<string>service.id] = service.filePath;
    service.id = service.filePath;
}

async function processImportArgs(args: ImportArgs): Promise<void> {
    let importDir = args.args[0];
    let outputDir = (args.output || ".");
    let dispatchDir = importDir + "/dispatch/";
    let fileDir = importDir + "/file/";
    let luisDir = importDir + "/luis/";
    let qnaDir = importDir + "/qna/";
    let newBot: BotConfig;
    let map: { [key: string]: string } = {};

    BotConfig.LoadBotFromFolder(importDir, undefined)
        .then(bot => {
            newBot = bot;
            return Promise.all(
                [
                    fs.readdir(luisDir)
                        .then(files => {
                            return Promise.all(files.map(file => { return luisImport(luisDir + file, args, bot, map); }));
                        }),
                    fs.readdir(dispatchDir)
                        .then(files => {
                            return Promise.all(files.map(file => { return luisImport(dispatchDir + file, args, bot, map); }));
                        }),
                    fs.readdir(qnaDir)
                        .then(files => {
                            return Promise.all(files.map(file => { return qnaImport(qnaDir + file, args, bot, map); }))
                        }),
                    fs.readdir(fileDir)
                        .then(files => {
                            return Promise.all(files.map(file => { return fileImport(fileDir + file, args, bot, map); }));
                        })
                ]);
        })
        .then((res) => {
            for (let service of newBot.services) {
                if (service.type === "dispatch") {
                    let dispatch = <IDispatchService>service;
                    dispatch.serviceIds = dispatch.serviceIds.map(function (value) {
                        return map[value];
                    });
                }
            }
            var outPath = outputDir + '/' + newBot.name + '.bot';
            return fs.writeJSON(outPath, newBot, { spaces: 2 })
                .then(function (res: any) { console.error("Successfully imported services from " + importDir + " and new bot file is in " + outPath );});
        })
        .catch((reason) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });

    function showErrorHelp() {
        program.outputHelp((str) => {
            console.error(str);
            return '';
        });
        process.exit(1);
    }
}
