#!/usr/bin/env node
import * as msRest from '@azure/ms-rest-js';
import * as fs from 'async-file';
import * as chalk from 'chalk';
import * as latestVersion from 'latest-version';
import { LuisAuthoring } from 'luis-apis';
import { AppsAddResponse, AppsGetResponse, AzureClouds, AzureRegions, LuisApp } from 'luis-apis/typings/lib/models';
import * as path from 'path';
import * as process from 'process';
import { env } from 'process';
import * as txtfile from 'read-text-file';
import * as semver from 'semver';
import { help } from './help';
import { IConfig } from './IConfig';
import { ILuisSettings } from './ILuisSettings';
import { LuisRecognizer } from './LuisRecognizer';
import { runCommand } from './utils';
const username = require('username');
const pkg = require('../package.json');
const minimist = require('minimist');
const delay = require('await-delay');

runProgram()
    .then(() => process.exit())
    .catch((err) => {
        error(err.message);
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
    if (argvFragment.length == 2 && argvFragment[0] == 'add') {
        let luFile = path.join(process.cwd(), argvFragment[1]);

        // look for luconfig.json
        return patchConfig(luFile, (config, relativePath) => {
            for (let model of config.models) {
                if (model == relativePath) {
                    console.log(`${relativePath} already in luconfig.json`);
                    return false;
                }
            }
            config.models.push(relativePath);
            console.log(`${relativePath} added to luconfig.json`);
            return true;
        });
    }

    if (argvFragment.length == 2 && argvFragment[0] == 'remove') {
        let luFile = path.join(process.cwd(), argvFragment[1]);

        // look for luconfig.json
        return patchConfig(luFile, (config, relativePath) => {
            for (let i =0; i < config.models.length; i++) {
                let model = config.models[i];
                if (model == relativePath) {
                    config.models.splice(i, 1);
                    console.log(`${relativePath} removed from luconfig.json`);
                    return true;
                }
            }
            console.log(`${relativePath} wasn't in luconfig.json`);
            return false;
        });
    }

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
        args.config = './luconfig.json'
    }

    if (!await fs.exists(args.config)) {
        return error(`missing luconfig.json file or --config argument`);
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
        // try environment
        if (env.LUIS_AUTHORING_KEY) {
            config.authoringKey = env.LUIS_AUTHORING_KEY;
        } else {
            try {
                let luisrcJson = JSON.parse(await txtfile.read(path.join(process.cwd(), '.luisrc')));
                config.authoringKey = luisrcJson.authoringKey;
            } catch (e) {
                // Do nothing
            }
            if (!config.authoringKey) {
                throw new Error('missing authoringkey');
            }
        }
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
        config.folder = '.';
    }

    console.log(`Building models for environment [${chalk.default.bold(<string>config.environment)}] targeting [${chalk.default.bold(config.authoringRegion)}] authoring region`);

    await runBuild(config);
}

function error(message: string) {
    process.stderr.write(chalk.default.redBright(message) + '\n');
    help(process.stdout);
    return;
}

async function runBuild(config: IConfig) {
    let credentials = new msRest.ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": config.authoringKey } });
    const client = new LuisAuthoring(<any>credentials);

    for (let modelPath of config.models) {
        await processLuVariants(client, config, modelPath);
    }

    let endpointKeymsg = chalk.default.greenBright('luis:endpointKey');
    console.log(chalk.default.cyanBright(`NOTE: You will need to add ${endpointKeymsg} setting to your environment for these models to work.`));
    console.log(chalk.default.cyanBright(`For dotnet:`));
    console.log(chalk.default.greenBright(`    dotnet user-secrets set luis:endpointKey ${config.authoringKey}`));
    console.log(chalk.default.cyanBright(`For node, add to .env file:`));
    console.log(chalk.default.greenBright(`    luis:endpointKey=${config.authoringKey}`));
}

async function processLuVariants(client: LuisAuthoring, config: IConfig, modelPath: string): Promise<void> {
    let rootFolder = path.dirname(modelPath);
    let rootFile = path.basename(modelPath, '.lu');
    let rootCulture = getCultureFromPath(modelPath) || config.defaultLanguage;
    if (rootFile.indexOf(rootCulture) > 0) {
        rootFile = rootFile.replace(rootCulture, '');
    }

    // get all lu variations from same folder as the .lu file
    let files = await fs.readdir(rootFolder);
    let luFileVariants: string[] = [];
    files.forEach(file => {
        if (path.extname(file) == '.lu' && file.startsWith(rootFile)) {
            luFileVariants.push(path.join(rootFolder, path.basename(file)));
        }
    })

    // get current .dialog definitions from the config.folder
    if (!await fs.exists(<string>config.folder)) {
        await fs.createDirectory(<string>config.folder);
    }

    // load settings
    let luisSettings: ILuisSettings = <any>{
        luis: {
        }
    };
    let luisSettingsPath = path.join(<string>config.folder, `luis.settings.${config.environment}.${config.authoringRegion}.json`);
    if (await fs.exists(luisSettingsPath)) {
        let json = await fs.readTextFile(luisSettingsPath);
        luisSettings = JSON.parse(json);
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
        let dialogFile = path.join(rootFolder, `${targetFileName}.dialog`);
        let recognizer = await LuisRecognizer.load(luFileVariant, targetFileName, dialogFile, luisSettings);
        if (!recognizer.getAppId()) {
            for (let app of apps) {
                if (app.name == appName) {
                    recognizer.setAppId(<string>app.id);
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
            appInfo = await client.apps.get(<AzureRegions>config.authoringRegion, <AzureClouds>"com", <string>recognizer.getAppId());
        } catch (err) {
            // create the application
            await createApplication(appName, client, config, rootFile, culture, recognizer);

            appInfo = await client.apps.get(<AzureRegions>config.authoringRegion, <AzureClouds>"com", <string>recognizer.getAppId());
        }

        recognizer.versionId = appInfo.activeVersion;

        let training = await updateModel(config, client, recognizer, appInfo);
        if (training) {
            recognizersToPublish.push(recognizer);
        }
        await recognizer.save();

        luisSettings.luis[targetFileName.split('.').join('_')] = recognizer.getAppId();
    }

    // save multirecognizer
    let multiLanguageDialog = path.join(rootFolder, `${rootFile}.lu.dialog`);
    await fs.writeTextFile(<string>multiLanguageDialog, JSON.stringify(multiRecognizer, null, 4), 'utf8');

    // save settings
    await fs.writeTextFile(luisSettingsPath, JSON.stringify(luisSettings, null, 4), 'utf8');

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
    recognizer.setAppId(response.body);
    await recognizer.save();
    await delay(500);
    return response;
}

// returns true if it needs to be trained and published
async function updateModel(config: IConfig, client: LuisAuthoring, recognizer: LuisRecognizer, appInfo: AppsGetResponse): Promise<boolean> {

    // get activeVersion
    var activeVersionInfo = await client.versions.get(<AzureRegions>config.authoringRegion, <AzureClouds>"com", recognizer.getAppId(), appInfo.activeVersion || '');
    await delay(500);

    let luFile = recognizer.getLuPath();

    var stats = await fs.stat(<string>luFile);

    // if different, then update 
    if (config.force || recognizer.versionId == "0000000000" ||
        (activeVersionInfo && <Date>activeVersionInfo.lastModifiedDateTime < stats.mtime)) {
        console.log(`${luFile} updating`);
        let outFolder = path.dirname(luFile);
        let outFileName = path.basename(luFile) + ".json";
        let outFile = path.join(outFolder, outFileName);
        // run ludown on file
        await runCommand(`ludown parse ToLuis --in ${luFile} -o ${outFolder} --out ${outFileName}`);
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
        await client.versions.importMethod(<AzureRegions>config.authoringRegion, <AzureClouds>"com", <string>recognizer.getAppId(), newVersion, { versionId: newVersionId });
        // console.log(JSON.stringify(importResult.body));
        await delay(500);

        // train the version
        console.log(`${luFile} training version=${newVersionId}`);
        await client.train.trainVersion(<AzureRegions>config.authoringRegion, <AzureClouds>"com", recognizer.getAppId(), newVersionId);

        recognizer.save();

        await delay(500);
        return true;
    } else {
        console.log(`${luFile} no changes`);
        return false;
    }
}

async function publishModel(config: IConfig, client: LuisAuthoring, recognizer: LuisRecognizer): Promise<void> {
    let versions = await client.versions.list(<AzureRegions>config.authoringRegion, <AzureClouds>"com", recognizer.getAppId());

    process.stdout.write(`${recognizer.getLuPath()} waiting for training for version=${recognizer.versionId}...`);
    let done = true;
    do {
        await delay(5000);
        await process.stdout.write('.');
        let trainingStatus = await client.train.getStatus(<AzureRegions>config.authoringRegion, <AzureClouds>"com", recognizer.getAppId(), <string>recognizer.versionId);

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
    await client.apps.publish(<AzureRegions>config.authoringRegion, <AzureClouds>"com", recognizer.getAppId(),
        {
            "versionId": <string>recognizer.versionId,
            "isStaging": false
        });

    if (config.autodelete) {
        for (let version of versions) {
            if (version.version != recognizer.versionId) {
                console.log(`${recognizer.getLuPath()} deleting version=${version.version}...`);
                await client.versions.deleteMethod(<AzureRegions>config.authoringRegion, <AzureClouds>"com", recognizer.getAppId(), <string>version.version);
                await delay(500);
            }
        }
    }

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

async function patchConfig(luFile: string, patch: { (config: IConfig, relative: string): boolean }): Promise<void> {
    let found = false;
    let cd = process.cwd();
    while (!found) {
        let configPath = path.join(cd, "luconfig.json");
        if (await fs.exists(configPath)) {
            found = true;

            let json = await txtfile.read(configPath);
            let config: IConfig;
            try {
                config = JSON.parse(json);
                let relativePath = path.relative(cd, luFile).replace(/\\/g, '/');
                if (patch(config, relativePath)) {
                    await fs.writeTextFile(configPath, JSON.stringify(config, null, 4), "utf8");
                }
                return;
            } catch (err) {
                throw new Error(chalk.default.red(`Error parsing ${configPath}:\n${err}`));
            }
        }
        else {
            // go to parent folder
            cd = path.dirname(cd);
            if (!cd || cd.length <= 3) {
                throw new Error("no luconfig.json file was found in this folder or parent folders");
            }
        }
    }

}