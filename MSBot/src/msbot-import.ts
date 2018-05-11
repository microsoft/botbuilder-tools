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
    importDir: string;
    bot?: string;
    secret?: string;
    output?: string;
    authoringKey: string;
    subscriptionKey: string;
    environment?: string;
    region: string;
}

program
    .name('msbot import')
    .description('import connected services to local files')
    .arguments("<importDir>")
    .option('--authoringKey <authoringkey>', 'authoring key for using manipulating LUIS apps via the authoring API (See http://aka.ms/luiskeys for help)')
    .option('--region <region>', 'LUIS authoring region like "westus"')
    .option('--subscriptionKey <subscriptionKey>', 'Azure Cognitive Service subscriptionKey/accessKey for calling the QnA management API (from azure portal)')
    .option('--environment <environment>', 'QnA Maker environment to use, either prod or test, defaults to prod.')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .option("-o, --output <path>", 'output directory for new .bot file.  If not present will default to current directory.')
    .action((cmd, actions) => {
    });

let args = <ImportArgs><any>program.parse(process.argv);
processImportArgs(args);

function ensureDir(dir: string) {
    if (fs.existsSync(dir))
        del.sync([dir + '/*'], { force: true });
    else
        fs.mkdirSync(dir);
}

function luisImport(service: IConnectedService, dir: string) {
    var luis = <ILuisService>service;
    var cmd = 'luis import version'
        + ' --appId ' + luis.appId
        + ' --authoringKey ' + luis.authoringKey
        + ' --versionId ' + luis.version
        // TODO: This should be comeing from the .bot file
        + ' --endpointBasePath ' + 'https://westus.api.cognitive.microsoft.com/luis/api/v2.0';
    luis.appId = "";
    luis.authoringKey = "";
    luis.subscriptionKey = "";
    return exec(cmd)
        .then(function (res: any) {
            return fs.writeJSON(dir + "/" + luis.name + ".json", res);
        });
}

async function processImportArgs(args: ImportArgs): Promise<void> {
    // Process each service in config and add to appropriate directory
    var outputDir = (args.output || ".");
    if (!args.environment)
        args.environment = "prod";
    var dispatchDir = args.importDir + "/dispatch";
    var fileDir = args.importDir + "/file";
    var luisDir = args.importDir + "/luis";
    var qnaDir = args.importDir + "/qna";
    ensureDir(outputDir);
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

