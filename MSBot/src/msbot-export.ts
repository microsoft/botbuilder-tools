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

interface ExportArgs {
    bot: string;
    secret: string;
    output?: string;
}

program
    .name('msbot export')
    .description('export all of the connected services to local files.')
    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .option("-o, --output <path>", 'output directory.  If not present will default to bot file directory.')
    .action((cmd, actions) => {
    });

let args = <ExportArgs><any>program.parse(process.argv);
let botPath: string;
if (!args.bot) {
    botPath = process.cwd();
    BotConfig.LoadBotFromFolder(process.cwd(), args.secret)
        .then(processExportArgs)
        .catch((reason) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
} else {
    botPath = Path.dirname(args.bot);
    BotConfig.Load(args.bot, args.secret)
        .then(processExportArgs)
        .catch((reason) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            showErrorHelp();
        });
}

function ensureDir(dir: string) {
    if (fs.existsSync(dir))
        del.sync([dir + '/*'], { force: true });
    else
        fs.mkdirSync(dir);
}

async function luisExport(service: IConnectedService, dir: string) {
    let luis = <ILuisService>service;
    if (!luis.authoringEndpoint) {
        luis.authoringEndpoint = "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/";
    }
    let cmd = 'luis export version'
        + ' --appId "' + luis.appId + '"'
        + ' --authoringKey "' + luis.authoringKey + '"'
        + ' --versionId "' + luis.version + '"'
        + ' --endpointBasePath "' + luis.authoringEndpoint + '"';
    luis.appId = "";
    luis.authoringKey = "";
    luis.subscriptionKey = "";
    return exec(cmd)
        .then(function (res: any) {
            return fs.writeJSON(dir + "/" + luis.name + ".json", JSON.parse(res.stdout), {spaces: 2});
        });
}

async function processExportArgs(config: BotConfig): Promise<void> {
    // Process each service in config and add to appropriate directory
    let output = (args.output || botPath) + "/" + config.name;
    let dispatchDir = output + "/dispatch";
    let fileDir = output + "/file";
    let luisDir = output + "/luis";
    let qnaDir = output + "/qna";
    ensureDir(output);
    ensureDir(dispatchDir);
    ensureDir(fileDir);
    ensureDir(luisDir);
    ensureDir(qnaDir);
    Promise.all(
        config.services.map(service => {
            switch (service.type) {
                case ServiceType.Dispatch: {
                    return luisExport(service, dispatchDir);
                }
                case ServiceType.File: {
                    let file = <IFileService>service;
                    let path = file.filePath;
                    file.filePath = "";
                    return fs.copy(path, fileDir + "/" + Path.basename(path));
                }
                case ServiceType.Luis: {
                    return luisExport(service, luisDir);
                }
                case ServiceType.QnA: {
                    let qna = <IQnAService>service;
                    if (!qna.environment) {
                        qna.environment = "prod";
                    }
                    let cmd = 'qnamaker export kb'
                        + ' --kbId "' + qna.kbId
                        + '" --subscriptionKey "' + qna.subscriptionKey
                        + '" --environment "' + qna.environment + '"';
                    qna.kbId = "";
                    qna.endpointKey = "";
                    qna.hostname = "";
                    qna.subscriptionKey = "";
                    return exec(cmd)
                        .then(function (res: any) {
                            let obj = JSON.parse(res.stdout);
                            obj.qnaList = obj.qnaDocuments;
                            delete obj.qnaDocuments;
                            return fs.writeJSON(qnaDir + "/" + qna.name + ".json", obj, {spaces:2});
                        })
                }
            }
        }))
        .then(res => {
            let path = output + '/' + Path.basename(args.bot);
            return fs.writeJSON(path, config, { spaces: 2 });
        })
        .catch(err => {
            console.log(err);
        })
}

function showErrorHelp() {
    program.outputHelp((str) => {
        console.error(str);
        return '';
    });
    process.exit(1);
}

