#!/usr/bin/env node
import * as msRest from '@azure/ms-rest-js';
import * as fs from 'async-file';
import * as chalk from 'chalk';
import * as latestVersion from 'latest-version';
import { LuisAuthoring } from 'luis-apis';
import { AppsAddResponse, AppsGetResponse, AzureClouds, AzureRegions, LuisApp } from 'luis-apis/typings/lib/models';
import * as path from 'path';
import * as process from 'process';
import * as txtfile from 'read-text-file';
import * as semver from 'semver';
import { help } from './help';
import { IConfig } from './IConfig';
import { LuisRecognizer } from './LuisRecognizer';
import { runCommand } from './utils';
const username = require('username');
const pkg = require('../package.json');
const minimist = require('minimist');
const delay = require('await-delay');

runProgram()
    .then(() => process.exit())
    .catch(async (err) => {
        await error(err.message);
        process.exit(1);
    });

/**
 * Entry for the app
 *
 * @returns {Promise<void>}
 */
async function runProgram() {
    let latest = await latestVersion(pkg.name, { version: `>${pkg.version}` })
        .catch(_error => pkg.version);

    if (semver.gt(latest, pkg.version)) {
        process.stderr.write(chalk.default.white(`\n     Update available `));
        process.stderr.write(chalk.default.grey(`${pkg.version}`));
        process.stderr.write(chalk.default.white(` -> `));
        process.stderr.write(chalk.default.greenBright(`${latest}\n`));
        process.stderr.write(chalk.default.white(`     Run `));
        process.stderr.write(chalk.default.blueBright(`npm i -g ${pkg.name} `));
        process.stderr.write(chalk.default.white(`to update.\n\n`));
    }

    let argvFragment = process.argv.slice(2);

    let args = minimist(argvFragment, { string: ['versionId'] });

    if (args.help ||
        args.h ||
        args['!'] ||
        args._.includes('help')) {
        return help(process.stdout);
    }

    if (args.version || args.v) {
        return process.stdout.write(require(path.join(__dirname, '../package.json')).version + "\n");
    }

    if (!args.config) {
        args.config = './models.config'
    }

    if (!await fs.exists(args.config)) {
        return error(`missing models.config file or --config argument`);
    }

    if (!args.environment) {
        args.environment = await username();
    }

    let json = await txtfile.read(args.config);
    let config: IConfig;
    try {
        config = JSON.parse(json);
    } catch (err) {
        throw new Error(chalk.default.red(`Error parsing ${args.config}:\n${err}`));
    }

    for (let path of config.models) {
        if (!await fs.exists(path)) {
            throw new Error(`config file ${path} does not exist`);
        }
    }

    delete args.config;
    Object.assign(config, args);

    if (!config.autodelete) {
        config.autodelete = true;
    }

    if (!config.authoringKey) {
        throw new Error('missing authoringkey');
    }

    if (!config.name) {
        throw new Error('missing name');
    }
    if (!config.defaultLanguage) {
        config.defaultLanguage = "en-us";
    }

    if (!config.authoringRegion) {
        config.authoringRegion = 'westus';
    } else {
        if (config.authoringRegion != 'westus' &&
            config.authoringRegion != 'westeurope' &&
            config.authoringRegion != 'australiaeast') {
            throw new Error(`${config.authoringRegion} is not a valid authoring region (westus|westeurope|australiaeast)`);
        }
    }

    if (!config.folder) {
        config.folder = 'models';
    }

    console.log(`Building models for environment [${chalk.default.bold(<string>config.environment)}] targeting [${chalk.default.bold(config.authoringRegion)}] authoring region`);

    await runBuild(config);
}

async function error(message: string) {
    process.stderr.write(chalk.default.redBright(message) + '\n');
    await help(process.stdout);
    return;
}

async function runBuild(config: IConfig) {
    let credentials = new msRest.ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": config.authoringKey } });
    const client = new LuisAuthoring(<any>credentials);

    for (let modelPath of config.models) {
        await processLuVariants(client, config, modelPath);
    }

}

async function processLuVariants(client: LuisAuthoring, config: IConfig, modelPath: string): Promise<void> {
    let rootFolder = path.dirname(modelPath);
    let rootFile = path.basename(modelPath, '.lu');
    let rootCulture = getCultureFromPath(modelPath) || config.defaultLanguage;
    if (rootFile.indexOf(rootCulture) > 0) {
        rootFile = rootFile.replace(rootCulture, '');
    }


    // get all lu variations from same folder as the .lu file
    let dialogFiles = await fs.readdir(rootFolder);
    let luFileVariants: string[] = [];
    dialogFiles.forEach(file => {
        if (path.extname(file) == '.lu' && file.startsWith(rootFile)) {
            luFileVariants.push(path.join(rootFolder, path.basename(file)));
        }
    })

    // get current .dialog definitions from the config.folder
    if (!await fs.exists(<string>config.folder)) {
        await fs.createDirectory(<string>config.folder);
    }

    dialogFiles = await fs.readdir(config.folder || '');

    // let recognizers: { [key: string]: LuisRecognizer } = {};
    let environmentFolder = path.join(<string>config.folder, <string>config.environment);
    if (!await fs.exists(environmentFolder)) {
        await fs.createDirectory(environmentFolder);
    }

    let authoringRegionFolder = path.join(environmentFolder, <string>config.authoringRegion);
    if (!await fs.exists(authoringRegionFolder)) {
        await fs.createDirectory(authoringRegionFolder);
    }

    let recognizersToPublish: LuisRecognizer[] = [];
    let apps = await client.apps.list(<AzureRegions>config.authoringRegion, <AzureClouds>"com");

    let multiRecognizer: any = {
        "$type": "Microsoft.MultiLanguageRecognizer",
        "recognizers": {
        }
    };

    for (var luFileVariant of luFileVariants) {
        let culture = getCultureFromPath(luFileVariant) || config.defaultLanguage;
        let targetFileName = path.basename(luFileVariant);
        if (targetFileName.indexOf(culture) < 0) {
            targetFileName = targetFileName.replace('.lu', `.${culture}.lu`);
        }

        // mybot-tomlm-dialog.en-us.lu
        let appName = `${config.name}(${config.environment})-${targetFileName}`;
        
        // tomlm/authoringRegion-mybot-tomlm-dialog.en-us.lu.dialog
        let dialogFile = path.join(authoringRegionFolder, `${targetFileName}.dialog`);
        let recognizer = await LuisRecognizer.load(luFileVariant, dialogFile);

        if (recognizer.applicationId == null) {
            for (let app of apps) {
                if (app.name == appName) {
                    recognizer.applicationId = <string>app.id;
                    break;
                }
            }
        }

        // add to multiLanguageRecognizer
        multiRecognizer.recognizers[culture] = path.basename(dialogFile, '.dialog');
        if (culture.toLowerCase() === config.defaultLanguage.toLowerCase()) {
            multiRecognizer.recognizers[''] = path.basename(dialogFile, '.dialog');
        }

        let appInfo: AppsGetResponse;
        try {
            // get app info
            appInfo = await client.apps.get(<AzureRegions>config.authoringRegion, <AzureClouds>"com", <string>recognizer.applicationId);
        } catch (err) {
            // create the application
            await createApplication(appName, client, config, rootFile, culture, recognizer);

            appInfo = await client.apps.get(<AzureRegions>config.authoringRegion, <AzureClouds>"com", <string>recognizer.applicationId);
        }

        recognizer.versionId = appInfo.activeVersion;

        let training = await updateModel(config, client, recognizer, appInfo);
        if (training) {
            recognizersToPublish.push(recognizer);
        }
        await recognizer.save();
    }

    // save multirecognizer
    let multiLanguageDialog = path.join(authoringRegionFolder, `${rootFile}.lu.dialog`);
    await fs.writeTextFile(<string>multiLanguageDialog, JSON.stringify(multiRecognizer, null, 4), 'utf8');

    // wait for training to complete and publish
    for (let recognizer of recognizersToPublish) {
        await publishModel(config, client, recognizer);
    }

    return;
}


async function createApplication(name: string, client: LuisAuthoring, config: IConfig, rootFile: string, culture: string, recognizer: LuisRecognizer): Promise<AppsAddResponse> {
    console.log(`creating LUIS.ai application: ${name} version:0000000000`);
    let response = await client.apps.add(<AzureRegions>config.authoringRegion, <AzureClouds>"com", {
        "name": name,
        "description": `Model for ${config.name} app, targetting ${config.environment} for ${rootFile}.lu file`,
        "culture": culture,
        "usageScenario": "",
        "domain": "",
        "initialVersionId": "0000000000"
    }, {});
    recognizer.applicationId = response.body;
    await recognizer.save();
    await delay(500);
    return response;
}

// returns true if it needs to be trained and published
async function updateModel(config: IConfig, client: LuisAuthoring, recognizer: LuisRecognizer, appInfo: AppsGetResponse): Promise<boolean> {

    // get activeVersion
    var activeVersionInfo = await client.versions.get(<AzureRegions>config.authoringRegion, <AzureClouds>"com", recognizer.applicationId || '', appInfo.activeVersion || '');
    await delay(500);

    let luFile = recognizer.getLuPath();

    var stats = await fs.stat(<string>luFile);

    // if different, then update 
    if (config.force || recognizer.versionId == "0000000000" ||
        (activeVersionInfo && <Date>activeVersionInfo.lastModifiedDateTime < stats.mtime)) {
        console.log(`${luFile} updating`);
        let outFile = luFile + ".json";

        // run ludown on file
        await runCommand(`ludown parse ToLuis --in ${luFile} --out ${outFile}`);
        let newJson = await txtfile.read(outFile);
        await fs.delete(outFile);

        let newVersion = <LuisApp>JSON.parse(newJson);
        newVersion.name = appInfo.name;
        newVersion.desc = appInfo.description;
        newVersion.culture = appInfo.culture;

        // increment version
        let newVersionId = pad(parseInt(<string>appInfo.activeVersion) + 1, 10);
        newVersion.versionId = newVersionId;
        recognizer.versionId = newVersionId;

        // import new version
        console.log(`${luFile} creating version=${newVersionId}`);
        await client.versions.importMethod(<AzureRegions>config.authoringRegion, <AzureClouds>"com", <string>recognizer.applicationId, newVersion, { versionId: newVersionId });
        // console.log(JSON.stringify(importResult.body));
        await delay(500);

        // train the version
        console.log(`${luFile} training version=${newVersionId}`);
        await client.train.trainVersion(<AzureRegions>config.authoringRegion, <AzureClouds>"com", recognizer.applicationId || '', newVersionId);

        recognizer.save();

        await delay(500);
        return true;
    } else {
        console.log(`${luFile} no changes`);
        return false;
    }
}

async function publishModel(config: IConfig, client: LuisAuthoring, recognizer: LuisRecognizer): Promise<void> {
    process.stdout.write(`${recognizer.getLuPath()} waiting for training for version=${recognizer.versionId}...`);
    let done = true;
    do {
        await delay(5000);
        await process.stdout.write('.');
        let trainingStatus = await client.train.getStatus(<AzureRegions>config.authoringRegion, <AzureClouds>"com", recognizer.applicationId || '', <string>recognizer.versionId);

        done = true;
        for (let status of trainingStatus) {
            if (status.details) {
                if (status.details.status == 'InProgress') {
                    done = false;
                    break;
                }
            }
        }
    } while (!done);
    process.stdout.write('done\n');

    // publish the version
    console.log(`${recognizer.getLuPath()} publishing version=${recognizer.versionId}`);
    await client.apps.publish(<AzureRegions>config.authoringRegion, <AzureClouds>"com", recognizer.applicationId || '',
        {
            "versionId": <string>recognizer.versionId,
            "isStaging": false
        });

    console.log(`${recognizer.getLuPath()} finished`);
}

function getCultureFromPath(file: string): string | null {
    let fn = path.basename(file, path.extname(file));
    let lang = path.extname(fn).substring(1);
    switch (lang.toLowerCase()) {
        case 'en-us':
        case 'zh-cn':
        case 'nl-nl':
        case 'fr-fr':
        case 'fr-ca':
        case 'de-de':
        case 'it-it':
        case 'ja-jp':
        case 'ko-kr':
        case 'pt-br':
        case 'es-es':
        case 'es-mx':
        case 'tr-tr':
            return lang;
        default:
            return null;
    }
}


function pad(num: number, size: number) {
    return ('000000000000000' + num).substr(-size);
}
