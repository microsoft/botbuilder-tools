#!/usr/bin/env node
import * as fs from 'async-file';
import * as chalk from 'chalk';
import * as latestVersion from 'latest-version';
import * as path from 'path';
import * as process from 'process';
import { env } from 'process';
import * as txtfile from 'read-text-file';
import * as semver from 'semver';
import { help } from './help';
import { IConfig } from './IConfig';
import { runCommand } from './utils';
import { runBuild } from '.';
const username = require('username');
const pkg = require('../package.json');
const minimist = require('minimist');

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
            for (let i = 0; i < config.models.length; i++) {
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

    if (args.endpointKeys) {

        await exportEndpointKeys(args.endpointKeys);
        return;
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

async function exportEndpointKeys(group: string): Promise<void> {
    let settings: any = {
        'luis': {
            'endpointKeys': {
            }
        }
    };

    let cognitiveServices: any = await runCommand(`az cognitiveservices account list  -g ${group}`, false);
    let commands: { [key: string]: Promise<any> } = {};
    let promises: Promise<any>[] = [];

    for (let cognitiveService of cognitiveServices) {
        if (cognitiveService.kind == "LUIS") {
            commands[cognitiveService.location] = runCommand(`az cognitiveservices account keys list -g ${group} -n ${cognitiveService.name}`, false);
            promises.push(commands[cognitiveService.location]);
        }
    }

    await Promise.all(promises);

    for (let location in commands) {
        let command = commands[location];
        let keys = await command;
        let setting = `luis:endpointKeys:${location}=${keys.key1}`;
        settings.luis.endpointKeys[location] = keys.key1;
        console.log(setting);
    }

    await fs.writeTextFile("luis.endpointKeys.json", JSON.stringify(settings, null, 4));
    return;
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
