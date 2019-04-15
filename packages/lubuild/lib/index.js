"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const msRest = require("@azure/ms-rest-js");
const fs = require("async-file");
const chalk = require("chalk");
const latestVersion = require("latest-version");
const luis_apis_1 = require("luis-apis");
const path = require("path");
const process = require("process");
const txtfile = require("read-text-file");
const semver = require("semver");
const LuisRecognizer_1 = require("./LuisRecognizer");
const utils_1 = require("./utils");
const username = require('username');
const pkg = require('../package.json');
const minimist = require('minimist');
const delay = require('await-delay');
runProgram()
    .then(() => process.exit())
    .catch((err) => __awaiter(this, void 0, void 0, function* () {
    yield error(err.message);
    process.exit(1);
}));
/**
 * Entry for the app
 *
 * @returns {Promise<void>}
 */
function runProgram() {
    return __awaiter(this, void 0, void 0, function* () {
        let latest = yield latestVersion(pkg.name, { version: `>${pkg.version}` })
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
            args.config = './models.config';
        }
        if (!(yield fs.exists(args.config))) {
            return error(`missing models.config file or --config argument`);
        }
        if (!args.environment) {
            args.environment = yield username();
        }
        console.log(`Target Environment:${args.environment}`);
        let json = yield txtfile.read(args.config);
        let config = JSON.parse(json);
        console.log(JSON.stringify(config, null, 4));
        for (let path of config.models) {
            if (!(yield fs.exists(path))) {
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
        yield runBuild(config);
    });
}
function help() {
    return __awaiter(this, void 0, void 0, function* () {
        process.stdout.write('LUIS Command Line Interface - © 2018 Microsoft Corporation\n\n');
        return;
    });
}
function error(message) {
    return __awaiter(this, void 0, void 0, function* () {
        process.stderr.write(chalk.default.red(message));
        yield help();
        return;
    });
}
function runBuild(config) {
    return __awaiter(this, void 0, void 0, function* () {
        let credentials = new msRest.ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": config.authoringKey } });
        const client = new luis_apis_1.LuisAuthoring(credentials);
        for (let modelPath of config.models) {
            yield processLuModelPath(client, config, modelPath);
        }
    });
}
function processLuModelPath(client, config, modelPath) {
    return __awaiter(this, void 0, void 0, function* () {
        let rootFolder = path.dirname(modelPath);
        let rootFile = path.basename(modelPath, '.lu');
        // get all lu variations from same folder as the .lu file
        let dialogFiles = yield fs.readdir(rootFolder);
        let luFiles = [];
        dialogFiles.forEach(file => {
            if (path.extname(file) == '.lu' && file.startsWith(rootFile)) {
                luFiles.push(path.join(rootFolder, path.basename(file)));
            }
        });
        // get current .dialog definitions from the config.folder
        if (!(yield fs.exists(config.folder))) {
            yield fs.createDirectory(config.folder);
        }
        dialogFiles = yield fs.readdir(config.folder || '');
        // let recognizers: { [key: string]: LuisRecognizer } = {};
        for (var luFile of luFiles) {
            let dialogFile = path.join(config.folder, path.basename(luFile, '.lu') + '.dialog');
            let recognizer = yield LuisRecognizer_1.LuisRecognizer.load(dialogFile);
            if (recognizer.applicationId == null) {
                // create the application
                let culture = recognizer.getCulture();
                let name = `${config.name}-${config.environment}-${config.region}-${culture}-${rootFile}.lu`;
                console.log(`creating application: ${name}`);
                let response = yield client.apps.add(config.region, "com", {
                    "name": name,
                    "description": `Model for ${config.name} app, targetting ${config.environment} for ${rootFile}.lu file`,
                    "culture": recognizer.getCulture(),
                    "usageScenario": "",
                    "domain": "",
                    "initialVersionId": "0000000000"
                }, {});
                recognizer.applicationId = response.body;
                recognizer.endpoint = `https://${config.region}.api.cognitive.microsoft.com/`;
                yield recognizer.save();
            }
            else {
                yield updateModel(config, client, luFiles, recognizer);
            }
        }
        return;
    });
}
function updateModel(config, client, luFiles, recognizer) {
    return __awaiter(this, void 0, void 0, function* () {
        // get app info
        let appInfo = yield client.apps.get(config.region, "com", recognizer.applicationId || '');
        // get activeVersion
        //let activeVersion = await client.versions.exportMethod(<AzureRegions>config.region, <AzureClouds>"com", recognizer.applicationId || '', appInfo.activeVersion || '');
        var activeVersionInfo = yield client.versions.get(config.region, "com", recognizer.applicationId || '', appInfo.activeVersion || '');
        let luFile = recognizer.getLuFile(luFiles);
        var stats = yield fs.stat(luFile);
        // if different, then update 
        if (activeVersionInfo && activeVersionInfo.lastModifiedDateTime < stats.mtime) {
            console.log(`${luFile} changed`);
            let outFile = luFile + ".json";
            // run ludown on file
            yield utils_1.runCommand(`ludown parse ToLuis --in ${luFile} --out ${outFile}`);
            let newJson = yield txtfile.read(outFile);
            // await fs.delete(outFile);
            let newVersion = JSON.parse(newJson);
            newVersion.name = appInfo.name;
            newVersion.desc = appInfo.description;
            newVersion.culture = appInfo.culture;
            // increment version
            let newVersionId = pad(parseInt(appInfo.activeVersion) + 1, 10);
            newVersion.versionId = newVersionId;
            // import new version
            console.log(`${luFile} creating new version=${newVersionId}`);
            yield client.versions.importMethod(config.region, "com", recognizer.applicationId, newVersion, { versionId: newVersionId });
            // console.log(JSON.stringify(importResult.body));
            // train the version
            console.log(`${luFile} training new version=${newVersionId}`);
            let trainResult = yield client.train.trainVersion(config.region, "com", recognizer.applicationId || '', newVersionId);
            if (trainResult.status == 'Queued') {
                let done = true;
                do {
                    yield delay(1000);
                    let trainingStatus = yield client.train.getStatus(config.region, "com", recognizer.applicationId || '', newVersionId);
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
            let publishResult = yield client.apps.publish(config.region, "com", recognizer.applicationId || '', {
                "versionId": newVersionId,
                "isStaging": false
            });
            console.log(JSON.stringify(publishResult));
        }
        else {
            console.log(`${luFile} no changes`);
        }
    });
}
function pad(num, size) {
    return ('000000000000000' + num).substr(-size);
}
//# sourceMappingURL=index.js.map