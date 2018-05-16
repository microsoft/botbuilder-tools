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
    .option('--publishedKey <publishedKey>', 'Key for calling published endpoint, default is authoringKey')
    .option('--publishedEndpoint <publishedEndpoint>', 'How to call published model, default is authoring region')
    .option('-s, --subscriptionKey <subscriptionKey>', 'Azure Cognitive Service subscriptionKey/accessKey for calling the QnA management API (from azure portal)')
    .option('-e, --environment <environment>', 'QnA Maker environment to use, either prod or test, defaults to prod.')
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
    return <ILuisService>findService("luis", name, bot);
}

async function luisImport(path: string, args: ImportArgs, bot: BotConfig) {
    var name = Path.basename(path, ".json");
    var service = findLuisService(name, bot);
    if (!service) throw ".Bot file is missing exported service " + name;
    service.authoringKey = args.authoringKey;
    service.authoringEndpoint = "http://" + args.region + ".api.cognitive.microsoft.com/luis/api/v2.0";
    service.publishedKey = args.publishedKey && service.authoringKey;
    if (args.publishedEndpoint) {
        service.publishedEndpoint = args.publishedEndpoint;
    } else if (service.publishedEndpoint) {
        service.publishedEndpoint = service.publishedEndpoint.replace(/(.*\/\/)([^.]*)/, "$1" + args.region);
    }
    var importCmd = 'luis import version'
        + ' --in "' + path
        + '" --authoringKey "' + service.authoringKey
        + '" --versionId "' + service.versionId
        + '" --endpointBasePath "' + service.authoringEndpoint + '"';
    return exec(importCmd)
        .then(function (model: any) {
            service.appId = model.id;
            service.id = model.id;
            if (!service.publishedEndpoint)
                service.publishedEndpoint = service.authoringEndpoint + "/apps/" + service.appId;
            var trainCmd = 'luis train version'
                + ' --appId "' + service.appId
                + '" --authoringKey "' + service.authoringKey
                + '" --endpointBasePath "' + service.authoringEndpoint
                + '" --versionId "' + service.versionId + '"';
            return exec(trainCmd)
        })
        .then(function (train: any) {
            var publishCmd = 'luis publish version'
                + ' --appId "' + service.appId
                + '" --authoringKey "' + service.authoringKey
                + '" --endpointBasePath "' + service.authoringEndpoint
                + '" --versionId "' + service.versionId + '"';
            // TODO: How do you specify environment?  Can get from publishedEndpoint to add param, but don't know how to specify here
            return exec(publishCmd)
        })
        .catch(function (err: any) {
            console.error("Failed importing LUIS service " + name);
            console.error(err.toString());
        });
}

async function qnaImport(file: string, args: ImportArgs) {
    /* TODO
    var cmd = 'qnamaker import version'
        + ' --authoringKey ' + args.authoringKey
        + ' --versionId ' + luis.version
        // TODO: This should be comeing from the .bot file
        + ' --endpointBasePath ' + 'https://westus.api.cognitive.microsoft.com/luis/api/v2.0';
    // luis.appId = "";
    // luis.authoringKey = "";
    // luis.subscriptionKey = "";
    return exec(cmd)
        .then(function (res: any) {
            return fs.writeJSON(dir + "/" + luis.name + ".json", res);
        });
        */
}


async function processImportArgs(args: ImportArgs): Promise<void> {
    var importDir = args.args[0];
    var outputDir = (args.output || ".");
    if (!args.environment)
        args.environment = "prod";
    var dispatchDir = importDir + "/dispatch/";
    var fileDir = importDir + "/file/";
    var luisDir = importDir + "/luis/";
    var qnaDir = importDir + "/qna/";

    BotConfig.LoadBotFromFolder(importDir, undefined)
        .then(bot => {
            Promise.all(
                [fs.readdir(luisDir)
                    .then(files => {
                        return Promise.all(files.map(file => { return luisImport(luisDir + file, args, bot); }));
                    }),
                fs.readdir(qnaDir)
                    .then(files => {
                        return Promise.all(files.map(file => { return qnaImport(file, args); }))
                    })
                ]);
        })
        .catch((reason) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });

    /*
    Promise.all(
        config.services.map(service => {
            switch (service.type) {
                case ServiceType.Dispatch: {
                    return luisExport(service, dispatchDir);
                }
                case ServiceType.File: {
                    var file = <IFileService>service;
                    return fs.copy(file.filePath, fileDir + "/" + Path.basename(file.filePath));
                }
                case ServiceType.Luis: {
                    return luisExport(service, luisDir);
                }
                case ServiceType.QnA: {
                    var qna = <IQnAService>service;
                    var cmd = 'qnamaker export kb'
                        + ' --kbId ' + qna.kbId
                        + ' --subscriptionKey ' + qna.subscriptionKey
                        // TODO: Environment should come from .bot file
                        + ' --environment ' + 'prod';
                    qna.kbId = "";
                    qna.endpointKey = "";
                    qna.hostname = "";
                    qna.subscriptionKey = "";
                    return exec(cmd)
                        .then(function (res: any) {
                            return fs.writeJSON(qnaDir + "/" + qna.name + ".json", res);
                        })
                }
            }
        }))
        .then(res => {
            var path = outputDir + '/' + Path.basename(args.bot);
            return fs.writeJSON(path, config, {spaces: 2});
            
        })
        .catch(err => {
            console.log(err);
        })
        */
}

function showErrorHelp() {
    program.outputHelp((str) => {
        console.error(str);
        return '';
    });
    process.exit(1);
}

