#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const pkg = require('../package.json');
const semver = require('semver');
let requiredVersion = pkg.engines.node;
if (!semver.satisfies(process.version, requiredVersion)) {
    console.log(`Required node version ${requiredVersion} not satisfied with current version ${process.version}.`);
    process.exit(1);
}

global.lgFileExt = ".lg";
global.fetch = require('node-fetch'); // Browser compatibility
const assert = require('assert');
const minimist = require('minimist');
const chalk = require('chalk');
const txtfile = require('read-text-file');
const path = require('path');
const readline = require('readline');
const fs = require('fs-extra');

const api = require('../lib/api');
const mslg = require('../lib');
const help = require('../lib/help');
const parser = require('../lib/utils/parser')
const translator = require('../lib/utils/translate')
const Exception = require('../lib/utils/exception');
const helpers = require('../lib/utils/helpers');
const { getServiceManifest } = require('../lib/utils/argsUtil');
const { ServiceBase } = require('../lib/api/serviceBase');
const retCode = require('../lib/enums/errorCodes');

let args;

/**
 * Entry for the app
 *
 * @returns {Promise<void>}
 */
async function runProgram() {
    let argvFragment = process.argv.slice(2);
    if (argvFragment.length === 0) {
        argvFragment = ['-h'];
    }
    args = minimist(argvFragment);

    if (args['!'] ||
        args.help ||
        args.h ||
        args._.includes('help')) {
        return help(args, process.stdout);
    }

    if (args._.length == 1 && args._[0] == "init") {
        const result = await initializeConfig();
        if (result) {
            process.stdout.write(chalk.green.bold(`\nSuccessfully wrote ${process.cwd()}/.lgrc\n`));
        }
        return;
    }

    if (args.version || args.v) {
        return process.stdout.write(require(path.join(__dirname, '../package.json')).version + "\n");
    }

    let body = null;
    const config = await composeConfig(args);
    ServiceBase.config = config;

    // special non-operation commands
    switch(args._[0]){
        case "set":
            return await handleSetCommand(args, config);
        case "parse":
            return await handleParseCommand(args);
        case "translate":
            return await handleTranslateCommand(args);
        case "replace": {
            if(args._[1] == "model")
                body = await handleReplaceCommand(args, config);
            break;
        }
        case "create": {
            if(args._[1] == "model")
                body = await handleCreateModelCommand(args, config);
            else if(args._[1] == "endpoint")
                body = await handleCreateEndpointCommand(args, config);
            break;
        }
    }

    const serviceManifest = getServiceManifest(args);
    let requestBody = await validateArguments(serviceManifest, body);

    // Confirm if delete operation
    if(serviceManifest.operation.methodAlias == "delete"){
        if(!args.f && !args.force){

            const prompt = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            const answer = await new Promise((resolve) => {
                function doPrompt(promptMessage) {
                    prompt.question(promptMessage, response => {
                        resolve(response);
                    });
                }
                doPrompt(`Are you sure you would like to delete ${args._[1]} with id ${args.id}? [no] `);
            });

            if (answer.trim()[0] == 'n') {
                process.stderr.write('Operation Canceled');
                return;
            }
        }
    }

    let response = await mslg(config, serviceManifest, args, requestBody);

    if (response.ok) {
        process.stdout.write(chalk.green.bold("\nOperation Succeeded\n\n"));
        if (response.resId) {
            const region = helpers.extractRegion(config.endpointBasePath);
            process.stdout.write(chalk.green.bold("\nResolver Application: \n"));
            process.stdout.write(JSON.stringify({
                applicationLocale: config.lgAppLocale,
                applicationId: config.lgAppName,
                applicationVersion: config.lgAppVersion,
                applicationRegion: region,
            }, null, 2) + "\n");
        }
    } else if (response.result.error) {
        throw new Exception(retCode.LG_SERVICE_FAIL, JSON.stringify(result.error, null, 4));
    }

    // special case response (for msbot)
    switch (serviceManifest.operation.name) {
        default: {
            // dump json as json stringified
            if (typeof response.result == 'string')
                process.stdout.write(response.result + "\n");
            else
                process.stdout.write(JSON.stringify(response.result, null, 2) + "\n");
            break;
        }
    }

}

/**
 * Walks the user though the creation of the .lgrc
 * file and writes it to disk. 
 *
 * @returns {Promise<*>}
 */
async function initializeConfig() {
    process.stdout.write(chalk.cyan.bold('\nThis util will walk you through creating a .lgrc file\n\nPress ^C at any time to quit.\n\n'));
    const validRegions = 'westus northeurope eastasia northcentralus eastus develop'.split(' ');

    const questions = [
        'What is your LG authoring/subscription key? (found on the Cognitive Services Azure portal page under "access keys") ',
        `What is your region? [${validRegions.join(', ')}] `,
        'What would you like to use as your active LG App Name? [none] ',
        'What would you like to use as your active LG App Locale? [en-US] ',
        'What would you like to use as your active LG App Version? [0.1] ',
    ];

    const prompt = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const answers = [];
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const answer = await new Promise((resolve) => {

            function doPrompt(promptMessage) {
                prompt.question(promptMessage, response => {
                    resolve(response);
                });
            }

            doPrompt(question);
        });
        answers.push(answer.trim());
    }

    const [authoringKey, region, lgAppName, lgAppLocale, lgAppVersion] = answers;
    const config = Object.assign({}, {
        authoringKey,
        endpointBasePath: `https://${region == "" ? 'westus' : region}.cris.ai`,
        lgAppName,
        lgAppLocale: lgAppLocale == "" ? "en-US":lgAppLocale,
        lgAppVersion: lgAppVersion == "" ? "0.1":lgAppVersion
    });

    try {
        await new Promise((resolve, reject) => {
            const confirmation = `\n\nDoes this look ok?\n${JSON.stringify(config, null, 2)}\n[Yes]/No: `;
            prompt.question(confirmation, response => {
                /^(y|yes)$/.test((response || 'yes').toLowerCase()) ? resolve(response) : reject();
            });
        });
    } catch (e) {
        return false;
    }
    await fs.writeJson(path.join(process.cwd(), '.lgrc'), config, { spaces: 2 });
    return true;
}

/**
 * Retrieves the input file to send as
 * the body of the request.
 *
 * @param args
 * @returns {Promise<*>}
 */
async function getFileInput(filepath, toJSON = true) {
    if (typeof filepath !== 'string' || !fs.existsSync(filepath)) {
        throw new Exception(retCode.INVALID_INPUT, `${filepath} is not a valid file path or file does not exist`);
    }
    // Let any errors fall through to the runProgram() promise
    const contents = await txtfile.read(path.resolve(filepath))
    return toJSON ? JSON.parse(contents) : contents;
}

/**
 * Composes the config from the 3 sources that it may reside.
 * Precedence is 1. Arguments, 2. lgrc and 3. env variables
 *
 * @returns {Promise<*>}
 */
async function composeConfig(args) {
    const { LG_AUTHORING_KEY, LG_ENDPOINT_KEY, LG_ENDPOINT_BASE_PATH, LG_APP_ID, LG_APP_NAME, LG_APP_LOCALE, LG_APP_DOMAIN, LG_APP_VERSION} = process.env;
    const { authoringKey, endpointKey, endpointBasePath, id, lgAppId, appName, lgAppLocale, lgAppDomain, lgAppVersion } = args;

    let lgrcJson = {};
    let config;
    try {
        await fs.access(path.join(process.cwd(), '.lgrc'), fs.R_OK);
        lgrcJson = JSON.parse(await txtfile.read(path.join(process.cwd(), '.lgrc')));
    } catch (e) {
        // Do nothing
    } finally {
        config = {
            authoringKey: (authoringKey || lgrcJson.authoringKey || LG_AUTHORING_KEY),
            endpointKey: (endpointKey || lgrcJson.endpointKey || LG_ENDPOINT_KEY),
            endpointBasePath: (endpointBasePath || lgrcJson.endpointBasePath || LG_ENDPOINT_BASE_PATH),
            lgAppId: (id || lgAppId || lgrcJson.lgAppId || LG_APP_ID),
            lgAppName: (appName || lgrcJson.lgAppName || LG_APP_NAME),
            lgAppLocale: (lgAppLocale || lgrcJson.lgAppLocale || LG_APP_LOCALE),
            lgAppDomain: (lgAppDomain || lgrcJson.lgAppDomain || LG_APP_DOMAIN),
            lgAppVersion: (lgAppVersion || lgrcJson.lgAppVersion || LG_APP_VERSION)
        };
        if(args._[0] !== "parse" && args._[0] !== "translate") validateConfig(config);
    }
    return config;
}

/**
 * Validates the config object to contain the
 * fields necessary for endpoint calls.
 *
 * @param {*} config The config object to validate
 */
function validateConfig(config) {
    // appId, endpointKey are not validated here since
    // not all operations require these to be present.
    // Validation of specific params are done in the
    // ServiceBase.js
    const { authoringKey, endpointBasePath } = config;
    const messageTail = `is missing from the configuration.\n\nDid you run ${chalk.cyan.bold('mslg init')} yet?`;
    if(!(typeof authoringKey === 'string'))
        throw new Exception(retCode.INVALID_INPUT, `The authoringKey ${messageTail}`);
    if(!(typeof endpointBasePath === 'string'))
        throw new Exception(retCode.INVALID_INPUT, `The endpointBasePath ${messageTail}`);
}

/**
 * Provides basic validation of the command arguments.
 *
 * @param serviceManifest
 */
async function validateArguments(serviceManifest, requestBody) {
    let body = undefined;

    if (!serviceManifest) {
        throw new Exception(retCode.INVALID_INPUT, "The operation does not exist.");
    }

    const { operation } = serviceManifest;
    if (!operation) {
        throw new Exception(retCode.INVALID_INPUT, "The operation does not exist.");
    }

    const entitySpecified = (args.config && typeof args.config === 'string') || (requestBody != undefined);
    const entityRequired = !!operation.entityName;

    if (!entityRequired && entitySpecified) {
        throw new Exception(retCode.INVALID_INPUT, `The ${operation.name} operation does not accept an input`);
    }

    if (entityRequired) {
        if (entitySpecified) {
            body = requestBody ? requestBody:(await getFileInput(args.config));
        }
        else {
            throw new Exception(retCode.INVALID_INPUT, `The ${operation.name} requires an input of type: ${operation.entityType}`);
        }
    }

    if (serviceManifest.operation.params && !requestBody) {
        for (let param of serviceManifest.operation.params) {
            if (param.required) {
                if (!args[param.name] && !args[param.alias || param.name]) {
                    throw new Exception(retCode.INVALID_INPUT, `The --${param.name} argument is missing and required`);
                }
            }
        }
    }

    // Note that the ServiceBase will validate params that may be required.
    return body;
}

/**
 * Exits with a non-zero status and prints
 * the error if present or displays the help
 *
 * @param error
 */
async function handleError(error) {
    process.stderr.write('\n' + chalk.red.bold(error.text + '\n\n'));
    await help(args);
    return error.errCode;
}

async function handleParseCommand(args){
    if (!(args["l"] || args["lgFolder"] || args["lg"] || args["in"])) 
        throw new Exception(retCode.INVALID_INPUT, "No input folder specified");
    await parser.parseCollateAndWriteOut(args, true);
    return true;
}

async function handleTranslateCommand(args){
    if (!(args["in"] || (args["lgFolder"] || args["l"] || args["lg"]))) 
        throw new Exception(retCode.INVALID_INPUT, "No .lg file or folder specified.");
    if(!(args["k"] || args["translateKey"])) 
        throw new Exception(retCode.INVALID_INPUT, "No translate key provided.");
    if(!(args["t"] || args["toLang"])) 
        throw new Exception(retCode.INVALID_INPUT, "No target language provided.");

    await translator.translateContent(args);
    return true;
}

async function handleCreateModelCommand(args, config){
    const lgInput = (args.l || args.lg || args.lgFolder || args.in);
    if(!lgInput)
        throw(new Exception(retCode.INVALID_INPUT, "No .lg file or folder specified."));
    
    const { lgAppName, lgAppLocale, lgAppDomain, lgAppVersion } = config;

    let model = {
        modelKind: "LanguageGeneration",
        name: lgAppName,
        locale: lgAppLocale,
        properties: {
            Domain: lgAppDomain,
            Version: lgAppVersion
        }
    };

    if(!(model.modelKind && model.name && model.locale && model.properties.Version) && !args.config)
        throw new Exception(retCode.INVALID_INPUT, "One or more argument is missing for creating an LG model.\n\nDid you run 'mslg init' yet? You can also pass a definition file for the missing arguments.");

    // Assume domain = app name
    if(model.properties.Domain === undefined) model.properties.Domain = model.name;

    // read lg file/folder
    try {
        if(lgInput.endsWith(lgFileExt))
            model.text = await parser.parseFile(lgInput, args.verbose);
        else
            model.text = await parser.parseCollateAndWriteOut(args, false);
    } catch (err) {
        throw (err);
    }

    // read model metadata if definition file exist and overwrite existing model
    if(args.config)
        model = Object.assign(model, await getFileInput(args.config, true));
   
    return model;
}

async function handleCreateEndpointCommand(args, config){
    const { lgAppId, lgAppName, lgAppLocale} = config;

    let model = {
        models: [{id: lgAppId}],
        locale: lgAppLocale,
        name: lgAppName
    };

    if(args.config){
        model = Object.assign(model, await getFileInput(args.config, true));
    }

    return model;
}

async function handleReplaceCommand(args, config){
    const lgInput = (args.l || args.lg || args.lgFolder);
    if(!lgInput)
        throw(new Exception(retCode.INVALID_INPUT, "No .lg file or folder specified."));

    try{
        // get model with id
        const service = new api["Models"]();
        const response = await service["getModel"](args);
        const text = await response.text();
        const existingModel = JSON.parse(text);
    
        // get metadata 
        let model = {
            modelKind: existingModel.modelKind,
            name: existingModel.name,
            locale: existingModel.locale,
            properties: {
                Domain: existingModel.properties.Domain,
                Version: existingModel.properties.Version
            }
        };

        // read lg file/folder
        if(lgInput.endsWith(lgFileExt))
            model.text = await parser.parseFile(lgInput, args.verbose);
        else
            model.text = await parser.parseCollateAndWriteOut(args, false);
        return model;
    }catch (err){
        throw (err);
    }
}

async function handleSetCommand(args, config) {
    if (args._.length == 1 && !( args.authoringKey || args.endpointKey || args.endpointBasePath || args.lgAppId || args.appName || args.appLocale || args.lgAppDomain || args.LG_APP_VERSION )) {
        process.stderr.write(chalk.red.bold(`missing .lgrc argument name: [--authoringKey|--endpointKey|--endpointBasePath|--lgAppId|--appName|--appLocale|--lgAppDomain|--appVersion]\n`));
        return help(args);
    }

    config.authoringKey = args.authoringKey || config.authoringKey;
    config.endpointKey = args.endpointKey || config.endpointKey;
    config.endpointBasePath = args.endpointBasePath || config.endpointBasePath;
    config.lgAppId = args.id || args.lgAppId || config.lgAppId;
    config.lgAppName = args.appName || config.lgAppName;
    config.lgAppLocale = args.appLocale || config.lgAppLocale;
    config.lgAppDomain = args.lgAppDomain || config.lgAppDomain;
    config.lgAppVersion = args.appVersion || config.lgAppVersion;

    await fs.writeJson(path.join(process.cwd(), '.lgrc'), config, { spaces: 2 });
    process.stdout.write(JSON.stringify(config, null, 4) + "\n");
    return true;
}

runProgram()
    .then(process.exit)
    .catch(handleError)
    .then(process.exit);
