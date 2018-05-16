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
var botPath: string;
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
    var luis = <ILuisService>service;
    var cmd = 'luis export version'
        + ' --appId ' + luis.appId
        + ' --authoringKey ' + luis.authoringKey
        + ' --versionId ' + luis.versionId
        // TODO: This should be coming from the .bot file
        // Need to fix ILuisService to include it.  Init does specify it now.
        + ' --endpointBasePath ' + luis.authoringEndpoint;
    luis.id = "";
    luis.appId = "";
    luis.authoringKey = "";
    luis.publishedKey = "";
    return exec(cmd)
        .then(function (res: any) {
            return fs.writeJSON(dir + "/" + luis.name + ".json", res);
        });
}

async function processExportArgs(config: BotConfig): Promise<void> {
    // Process each service in config and add to appropriate directory
    var output = (args.output || botPath) + "/" + config.name;
    var dispatchDir = output + "/dispatch";
    var fileDir = output + "/file";
    var luisDir = output + "/luis";
    var qnaDir = output + "/qna";
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
                        + ' --environment ' + qna.environment;
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
            var path = output + '/' + Path.basename(args.bot);
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

