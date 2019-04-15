import * as msRest from '@azure/ms-rest-js';
import * as fs from 'async-file';
import * as chalk from 'chalk';
import * as latestVersion from 'latest-version';
import { LuisAuthoring } from 'luis-apis';
import { AzureClouds, AzureRegions, LuisApp } from 'luis-apis/typings/lib/models';
import * as path from 'path';
import * as process from 'process';
import * as txtfile from 'read-text-file';
import * as semver from 'semver';
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
        return help();
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
    console.log(`Target Environment:${args.environment}`);

    let json = await txtfile.read(args.config);
    let config: IConfig = JSON.parse(json);
    console.log(JSON.stringify(config, null, 4));

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

    if (!config.region) {
        config.region = 'westus';
    }

    if (!config.folder) {
        config.folder = 'models';
    }

    await runBuild(config);
}

async function help() {
    process.stdout.write('LUIS Command Line Interface - © 2018 Microsoft Corporation\n\n');
    return;
}


async function error(message: string) {
    process.stderr.write(chalk.default.red(message));
    await help();
    return;
}

async function runBuild(config: IConfig) {
    let credentials = new msRest.ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": config.authoringKey } });
    const client = new LuisAuthoring(<any>credentials);

    for (let modelPath of config.models) {
        await processLuModelPath(client, config, modelPath);
    }

}

async function processLuModelPath(client: LuisAuthoring, config: IConfig, modelPath: string): Promise<void> {
    let rootFolder = path.dirname(modelPath);
    let rootFile = path.basename(modelPath, '.lu');

    // get all lu variations from same folder as the .lu file
    let dialogFiles = await fs.readdir(rootFolder);
    let luFiles: string[] = [];
    dialogFiles.forEach(file => {
        if (path.extname(file) == '.lu' && file.startsWith(rootFile)) {
            luFiles.push(path.join(rootFolder, path.basename(file)));
        }
    })

    // get current .dialog definitions from the config.folder
    if (!await fs.exists(<string>config.folder)) {
        await fs.createDirectory(<string>config.folder);
    }

    dialogFiles = await fs.readdir(config.folder || '');

    // let recognizers: { [key: string]: LuisRecognizer } = {};
    for (var luFile of luFiles) {
        let dialogFile = path.join(<string>config.folder, path.basename(luFile, '.lu') + '.dialog');
        let recognizer = await LuisRecognizer.load(dialogFile);
        if (recognizer.applicationId == null) {
            // create the application
            let culture = recognizer.getCulture();
            let name = `${config.name}-${config.environment}-${config.region}-${culture}-${rootFile}.lu`;
            console.log(`creating application: ${name}`)
            let response = await client.apps.add(<AzureRegions>config.region,
                <AzureClouds>"com", {
                    "name": name,
                    "description": `Model for ${config.name} app, targetting ${config.environment} for ${rootFile}.lu file`,
                    "culture": recognizer.getCulture(),
                    "usageScenario": "",
                    "domain": "",
                    "initialVersionId": "0000000000"
                }, {});
            recognizer.applicationId = response.body;
            recognizer.endpoint = `https://${config.region}.api.cognitive.microsoft.com/`;
            await recognizer.save();
        } else {
            await updateModel(config, client, luFiles, recognizer);
        }
    }
    return;
}


async function updateModel(config: IConfig, client: LuisAuthoring, luFiles: string[], recognizer: LuisRecognizer) {

    // get app info
    let appInfo = await client.apps.get(<AzureRegions>config.region, <AzureClouds>"com", recognizer.applicationId || '');

    // get activeVersion
    //let activeVersion = await client.versions.exportMethod(<AzureRegions>config.region, <AzureClouds>"com", recognizer.applicationId || '', appInfo.activeVersion || '');
    var activeVersionInfo = await client.versions.get(<AzureRegions>config.region, <AzureClouds>"com", recognizer.applicationId || '', appInfo.activeVersion || '');

    let luFile = recognizer.getLuFile(luFiles);

    var stats = await fs.stat(<string>luFile);

    // if different, then update 
    if (activeVersionInfo && <Date>activeVersionInfo.lastModifiedDateTime < stats.mtime) {
        console.log(`${luFile} changed`);
        let outFile = luFile + ".json";

        // run ludown on file
        await runCommand(`ludown parse ToLuis --in ${luFile} --out ${outFile}`);
        let newJson = await txtfile.read(outFile);
        // await fs.delete(outFile);

        let newVersion = <LuisApp>JSON.parse(newJson);
        newVersion.name = appInfo.name;
        newVersion.desc = appInfo.description;
        newVersion.culture = appInfo.culture;
        
        // increment version
        let newVersionId = pad(parseInt(<string>appInfo.activeVersion) + 1, 10);
        newVersion.versionId = newVersionId;

        // import new version
        console.log(`${luFile} creating new version=${newVersionId}`);
        await client.versions.importMethod(<AzureRegions>config.region, <AzureClouds>"com", <string>recognizer.applicationId, newVersion, { versionId: newVersionId });
        // console.log(JSON.stringify(importResult.body));

        // train the version
        console.log(`${luFile} training new version=${newVersionId}`);
        let trainResult = await client.train.trainVersion(<AzureRegions>config.region, <AzureClouds>"com", recognizer.applicationId || '', newVersionId);

        if (trainResult.status == 'Queued') {
            let done = true;
            do {
                await delay(1000);
                let trainingStatus = await client.train.getStatus(<AzureRegions>config.region, <AzureClouds>"com", recognizer.applicationId || '', newVersionId);

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
        }

        // publish the version
        console.log(`${luFile} publishing new version=${newVersionId}`);
        let publishResult = await client.apps.publish(<AzureRegions>config.region, <AzureClouds>"com", recognizer.applicationId || '',
            {
                "versionId": newVersionId,
                "isStaging": false
            });
        console.log(JSON.stringify(publishResult));
    } else {
        console.log(`${luFile} no changes`);
    }
}

function pad(num: number, size: number) {
    return ('000000000000000' + num).substr(-size);
}
