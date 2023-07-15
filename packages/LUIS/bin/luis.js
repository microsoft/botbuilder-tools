#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/*eslint no-console: ["error", { allow: ["log"] }] */

const pkg = require('../package.json');
const semver = require('semver');
const stdin = require('get-stdin');
const msRest = require("@azure/ms-rest-js");
const { LuisAuthoring } = require('../lib/luisAuthoring');
const getOperation = require('./getOperation');
var pos = require("cli-position");
const Table = require('cli-table3');
const { performance } = require('perf_hooks');

function stdoutAsync(output) { return new Promise((done) => process.stdout.write(output, "utf-8", () => done())); }

let requiredVersion = pkg.engines.node;
if (!semver.satisfies(process.version, requiredVersion)) {
    console.log(`Required node version ${requiredVersion} not satisfied with current version ${process.version}.`);
    process.exit(1);
}

global.fetch = require('node-fetch'); // Browser compatibility
const assert = require('assert');
const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const readlineSync = require('readline-sync');
const minimist = require('minimist');
const chalk = require('chalk');
const request = require('request-promise');

const help = require('./help');
const Delay = require('await-delay');
const intercept = require("intercept-stdout");
const latestVersion = require('latest-version');
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

    let latest = await latestVersion(pkg.name, { version: `>${pkg.version}` })
        .catch(() => pkg.version);
    if (semver.gt(latest, pkg.version)) {
        process.stderr.write(chalk.default.white(`\n     Update available `));
        process.stderr.write(chalk.default.grey(`${pkg.version}`));
        process.stderr.write(chalk.default.white(` -> `));
        process.stderr.write(chalk.default.greenBright(`${latest}\n`));
        process.stderr.write(chalk.default.white(`     Run `));
        process.stderr.write(chalk.default.blueBright(`npm i -g ${pkg.name} `));
        process.stderr.write(chalk.default.white(`to update.\n\n`));
    }

    args = minimist(argvFragment, { string: ['versionId'] });
    if (args._[0] == "luis")
        args._ = args._.slice(1);
    if (args.prefix) {
        intercept(function (txt) {
            return `[${pkg.name}]\n${txt}`;
        });
    }
    if (args.help ||
        args.h ||
        args['!'] ||
        args._.includes('help')) {
        return help(args, process.stdout);
    }
    if (args.version || args.v) {
        return process.stdout.write(require(path.join(__dirname, '../package.json')).version + "\n");
    }

    // we have to run init before we attempt tload
    if (args._[0] == "init") {
        const result = await initializeConfig();
        if (result) {
            process.stdout.write(`Successfully wrote ${process.cwd()}/.luisrc\n`);
        }
        return;
    }

    const config = await composeConfig();
    let serviceIn = {};
    if (args.stdin) {
        process.env.PREFIX = 'prefix';
        let json = await stdin();
        serviceIn = JSON.parse(json);
    }

    args.authoringKey = args.authoringKey || serviceIn.authoringKey || config.authoringKey;
    args.subscriptionKey = args.subscriptionKey || args.s || serviceIn.subscriptionKey || config.subscriptionKey;
    args.appId = args.appId || args.applicationId || args.a || serviceIn.appId || config.appId;
    args.versionId = args.versionId || args.version || serviceIn.versionId || config.versionId || serviceIn.version;
    args.region = args.region || serviceIn.region || config.region || "westus";
    args.cloud = args.cloud || serviceIn.cloud || config.cloud || (args.region == "virginia" ? "us" : "com");
    args.customHeaders = { "accept-language": "en-US" };
    args.endpoint = args.endpoint || serviceIn.endpoint || config.endpoint || `https://${args.region}.api.cognitive.microsoft.${args.cloud}`;

    validateConfig(args);

    let credentials = new msRest.ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": args.authoringKey } });
    const client = new LuisAuthoring(args.endpoint, credentials);

    // NOTE: This should not be necessary to do. It is required because the swagger file defines a template of
    // x-ms-parameterized-host/hostTemplate: "{Endpoint}/luis/api/v2.0" which does not seem to be picked up
    // properly by autorest.  In particular the baseUri on the client is just "{Endpoint}" and the operations
    // assume the presence of luis/api/v2.0 so you are missing the middle part of the URL.
    // Instead of using autorest here, we should be using the officially supported client and that client
    // should take in the full authoring endpoint.
    client.baseUri = `{Endpoint}/luis/api/v2.0`;

    // special non-operation commands
    switch (args._[0]) {
        case "query":
            return await handleQueryCommand(args, config);
        case "set":
            return await handleSetCommand(args, config, client);
    }
    let verb = (args._.length >= 1) ? args._[0].toLowerCase() : undefined;
    let target = (args._.length >= 2) ? args._[1].toLowerCase() : undefined;
    const operation = getOperation(verb, target);
    const requestBody = await validateArguments(args, operation);

    // INVOKE operation
    let result = {};
    let outputFilePath = '';

    switch (verb) {
        // ------------------ ADD  ------------------
        case "add":
            switch (target) {
                case "app":
                case "application":
                    result = await client.apps.add(requestBody, args);
                    result = await client.apps.get(result.body, args);
                    // Write output to console and return
                    await writeAppToConsole(config, args, requestBody, result);
                    return;
                case "appazureaccount":
                    var options = Object.assign({}, { azureAccountInfoObject: requestBody }, args);
                    result = await client.azureAccounts.assignToApp(args.appId, options);
                    break;
                case "closedlist":
                    result = await client.model.addClosedList(args.appId, args.versionId, requestBody, args);
                    break;
                case "closedlistentityrole":
                    result = await client.model.createClosedListEntityRole(args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "compositeentity":
                    result = await client.model.addCompositeEntity(args.appId, args.versionId, requestBody, args);
                    break;
                case "compositeentitychild":
                    result = await client.model.addCompositeEntityChild(args.appId, args.versionId, args.cEntityId, requestBody, args);
                    break;
                case "compositeentityrole":
                    result = await client.model.createCompositeEntityRole(args.appId, args.versionId, args.cEntityId, requestBody, args);
                    break;
                case "customprebuiltdomain":
                    result = await client.model.addCustomPrebuiltDomain(args.appId, args.versionId, requestBody, args);
                    break;
                case "customprebuiltentity":
                    result = await client.model.addCustomPrebuiltEntity(args.appId, args.versionId, requestBody, args);
                    break;
                case "customprebuiltentityrole":
                    result = await client.model.createCustomPrebuiltEntityRole(args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "customprebuiltintent":
                    result = await client.model.addCustomPrebuiltIntent(args.appId, args.versionId, requestBody, args);
                    break;
                case "entity":
                    result = await client.model.addEntity(args.appId, args.versionId, requestBody, args);
                    break;
                case "entityrole":
                    result = await client.model.createEntityRole(args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "example":
                    result = await client.examples.add(args.appId, args.versionId, requestBody, args);
                    break;
                case "examples":
                    result = await client.examples.batch(args.appId, args.versionId, requestBody, args);
                    break;
                case "explicitlistitem":
                    result = await client.model.addExplicitListItem(args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "hierarchicalentity":
                    result = await client.model.addHierarchicalEntity(args.appId, args.versionId, requestBody, args);
                    break;
                case "hierarchicalentitychild":
                    result = await client.model.addHierarchicalEntityChild(args.appId, args.versionId, args.hEntityId, requestBody, args);
                    break;
                case "hierarchicalentityrole":
                    result = await client.model.createHierarchicalEntityRole(args.appId, args.versionId, args.hEntityId, requestBody, args);
                    break;
                case "intent":
                    result = await client.model.addIntent(args.appId, args.versionId, requestBody, args);
                    break;
                case "pattern":
                    result = await client.pattern.addPattern(args.appId, args.versionId, requestBody, args);
                    break;
                case "patternentityrole":
                    result = await client.model.createPatternAnyEntityRole(args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "patterns":
                    result = await client.pattern.batchAddPatterns(args.appId, args.versionId, requestBody, args);
                    break;
                case "permissions":
                    result = await client.permissions.add(args.appId, requestBody, args);
                    break;
                case "phraselist":
                    result = await client.features.addPhraseList(args.appId, args.versionId, requestBody, args);
                    break;
                case "prebuilt":
                    result = await client.model.addPrebuilt(args.appId, args.versionId, requestBody, args);
                    break;
                case "prebuiltentityrole":
                    result = await client.model.createPrebuiltEntityRole(args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "regexentity":
                    result = await client.model.createRegexEntityModel(args.appId, args.versionId, requestBody, args);
                    break;
                case "regexentityrole":
                    result = await client.model.createRegexEntityRole(args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "sublist":
                    result = await client.model.addSubList(args.appId, args.versionId, args.clEntityId, requestBody, args);
                    break;
                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;
        // ------------------ CLONE ------------------
        case "clone":
            switch (target) {
                case "version":
                    result = await client.versions.clone(args.appId, args.versionId, requestBody, args);
                    break;

                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;
        // ------------------ DELETE ------------------
        case "delete":
            switch (target) {
                case "app":
                case "application":
                    {
                        let app = await client.apps.get(args.appId, args);
                        if (app.error) {
                            throw new Error(app.error);
                        }

                        if (!args.force) {
                            let answer = readlineSync.question(`Are you sure you want to delete the application ${app.name} (${app.id}) and delete its connected service relations if any? [no] `, { defaultResponse: 'no' });
                            if (answer.length == 0 || answer[0] != 'y') {
                                process.stderr.write('delete operation canceled\n');
                                process.exit(1);
                                return;
                            }
                        }
                        result = await client.apps.deleteMethod(args.appId, { force: args.force }, args);
                    }
                    break;

                case "version":
                    {
                        let app = await client.apps.get(args.appId, args);
                        if (app.error) {
                            throw new Error(app.error);
                        }
                        if (!args.force) {
                            let answer = readlineSync.question(`Are you sure you want to delete the application ${app.name} version ${args.versionId}? [no] `, { defaultResponse: 'no' });
                            if (answer.length == 0 || answer[0] != 'y') {
                                process.stderr.write('delete operation canceled\n');
                                process.exit(1);
                                return;
                            }
                        }
                        result = await client.versions.deleteMethod(args.appId, args.versionId, args);
                    }
                    break;
                case "appazureaccount":
                    {
                        let app = await client.apps.get(args.appId, args);
                        if (app.error) {
                            throw new Error(app.error);
                        }
                        if (!args.force) {
                            let answer = readlineSync.question(`Are you sure you want to remove this assigned azure account from application ${app.name}? [no] `, { defaultResponse: 'no' });
                            if (answer.length == 0 || answer[0] != 'y') {
                                process.stderr.write('delete operation canceled\n');
                                process.exit(1);
                                return;
                            }
                        }
                        var azureOptions = Object.assign({}, { azureAccountInfoObject: requestBody }, args);
                        result = await client.azureAccounts.removeFromApp(args.appId, azureOptions);
                    }
                    break;

                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;
        // ------------------ EXPORT ------------------
        case "export":
            switch (target) {
                case "version":
                    result = await client.versions.exportMethod(args.appId, args.versionId, args);
                    result = sortExportedApp(result);
                    break;
                case "closedlist":
                    result = await client.model.getClosedList(args.appId, args.versionId, args.clEntityId, args);
                    break;
                case "closedlistentityrole":
                    result = await client.model.getClosedListEntityRole(args.appId, args.versionId, args.entityId, args.roleId, args);
                    break;
                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;
        // ------------------ PACKAGE ------------------
        case "package":
            switch (target) {
                case "slot":
                    result = await client.apps.packagePublishedApplicationAsGzip(args.appId, args.slotName, args);
                    outputFilePath = path.join(args.outputFolderPath, `${args.appId}_${args.slotName}.gz`);
                    break;
                case "version":
                    result = await client.apps.packageTrainedApplicationAsGzip(args.appId, args.versionId, args);
                    outputFilePath = path.join(args.outputFolderPath, `${args.appId}_v${args.versionId}.gz`);
                    break;
                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;
        // ------------------ GET ------------------
        case "get":
            switch (target) {
                case "app":
                case "application":
                    result = await client.apps.get(args.appId, args);

                    // Write output to console and return
                    await writeAppToConsole(config, args, requestBody, result);
                    return;

                case "closedlist":
                    result = await client.model.getClosedList(args.appId, args.versionId, args.clEntityId, args);
                    break;
                case "closedlistentityrole":
                    result = await client.model.getClosedListEntityRole(args.appId, args.versionId, args.entityId, args.roleId, args);
                    break;
                case "compositeentity":
                    result = await client.model.getCompositeEntity(args.appId, args.versionId, args.cEntityId, args);
                    break;
                case "compositeentityrole":
                    result = await client.model.getCompositeEntityRole(args.appId, args.versionId, args.cEntityId, args.roleId, args);
                    break;
                //case "customprebuiltdomain":
                //case "customprebuiltentityrole":
                case "entity":
                    result = await client.model.getEntity(args.appId, args.versionId, args.entityId, args);
                    break;
                case "entityrole":
                    result = await client.model.getEntityRole(args.appId, args.versionId, args.entityId, args.roleId, args);
                    break;
                case "explicitlistitem":
                    result = await client.model.getExplicitListItem(args.appId, args.versionId, args.entityId, args.itemId, args);
                    break;
                case "explicitlistitems":
                    result = await client.model.getExplicitList(args.region, args.appId, args.versionId, args.entityId, args);
                    break;
                case "hierarchicalentity":
                    result = await client.model.getHierarchicalEntity(args.appId, args.versionId, args.hEntityId, args);
                    break;
                case "hierarchicalentitychild":
                    result = await client.model.getHierarchicalEntityChild(args.appId, args.versionId, args.hEntityId, args.hChildId, args);
                    break;
                case "hierarchicalentityrole":
                    result = await client.model.getHierarchicalEntityRole(args.appId, args.versionId, args.hEntityId, args.roleId, args);
                    break;
                case "intent":
                    result = await client.model.getIntent(args.appId, args.versionId, args.intentId, args);
                    break;
                case "pattern":
                    result = await client.features.getPatternFeatureInfo(args.appId, args.versionId, args.patternId, args);
                    break;
                case "patternentityrole":
                    result = await client.model.getPatternAnyEntityRole(args.appId, args.versionId, args.entityId, args.roleId, args);
                    break;
                case "phraselist":
                    result = await client.features.getPhraseList(args.appId, args.versionId, args.phraselistId, args);
                    break;
                case "prebuilt":
                    result = await client.model.getPrebuilt(args.appId, args.versionId, args.prebuiltId, args);
                    break;
                case "prebuiltentityrole":
                    result = await client.model.getPrebuiltEntityRole(args.appId, args.versionId, args.entityId, args.roleId, args);
                    break;
                case "regexentity":
                    result = await client.model.getRegexEntityEntityInfo(args.appId, args.versionId, args.regexEntityId, args);
                    break;
                case "regexentityrole":
                    result = await client.model.getRegexEntityRole(args.appId, args.versionId, args.entityId, args.roleId, args);
                    break;
                case "settings":
                    result = await client.apps.getSettings(args.appId, requestBody, args);
                    break;
                case "status":
                    result = await client.train.getStatus(args.appId, args.versionId, args);
                    if (args.wait) {
                        result = await waitForTrainingToComplete(client, args);
                    }
                    break;
                case "version":
                    result = await client.versions.get(args.appId, args.versionId, args);
                    break;
                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;
        // ------------------ ""IMPORT"" ------------------
        case "import":
            switch (target) {
                case "app":
                case "application":
                    if (args.appName) {
                        requestBody.name = args.appName;
                    }
                    result = await client.apps.importMethod(requestBody, args);
                    result = await client.apps.get(result.body, args);

                    // Write output to console and return
                    await writeAppToConsole(config, args, requestBody, result);
                    return;

                case "version":
                    result = await client.versions.importMethod(args.appId, requestBody, args);
                    if (args.msbot) {
                        let version = result.body;
                        result = await client.apps.get(args.appId || args.applicationId || config.applicationId, args);
                        result.version = version;

                        // Write output to console and return
                        await writeAppToConsole(config, args, requestBody, result);
                    }
                    return;
            }
            throw new Error(`Unknown resource: ${target}`);

        // ------------------ INIT ------------------
        case "init":
            break;

        // ------------------ LIST ------------------
        case "list":
            switch (target) {
                case "apps":
                case "applications":
                    result = await client.apps.list(args);
                    break;
                case "endpoints":
                    result = await client.apps.listEndpoints(args.appId, args);
                    break;
                case "examples":
                    result = await client.examples.list(args.appId, args.versionId, args);
                    break;
                case "features":
                    result = await client.features.list(args.appId, args.versionId, args);
                    break;
                case "permissions":
                    result = await client.permissions.list(args.appId, args);
                    break;
                case "versions":
                    result = await client.versions.list(args.appId, args);
                    break;
                case "querylogs":
                    result = await client.apps.downloadQueryLogsWithHttpOperationResponse(args.appId);
                    break;
                // --- model methods---
                case "closedlists":
                    result = await client.model.listClosedLists(args.appId, args.versionId, args);
                    break;
                case "compositeentities":
                    result = await client.model.listCompositeEntities(args.appId, args.versionId, args);
                    break;
                case "customprebuiltentities":
                    result = await client.model.listCustomPrebuiltEntities(args.appId, args.versionId, args);
                    break;
                case "customprebuiltintents":
                    result = await client.model.listCustomPrebuiltIntents(args.appId, args.versionId, args);
                    break;
                case "customprebuiltmodels":
                    result = await client.model.listCustomPrebuiltModels(args.appId, args.versionId, args);
                    break;
                case "entities":
                    result = await client.model.listEntities(args.appId, args.versionId, args);
                    break;
                case "hierarchicalentities":
                    result = await client.model.listHierarchicalEntities(args.appId, args.versionId, args);
                    break;
                case "intents":
                    result = await client.model.listIntents(args.appId, args.versionId, args);
                    break;
                case "models":
                    result = await client.model.listModels(args.appId, args.versionId, args);
                    break;
                case "prebuiltentities":
                    result = await client.model.listPrebuiltEntities(args.appId, args.versionId, args);
                    break;
                case "prebuilts":
                    result = await client.model.listPrebuilts(args.appId, args.versionId, args);
                    break;
                case "versionsettings":
                    result = await client.settings.list(args.appId, args.versionId, args);
                    break;
                case "userazureaccounts":
                    result = await client.azureAccounts.listUserLUISAccounts(args);
                    break;
                case "appazureaccounts":
                    result = await client.azureAccounts.getAssigned(args.appId, args);
                    break;
                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;
        // ------------------ PUBLISH ------------------
        case "publish":
            switch (target) {
                case "version":
                    result = await client.apps.publish(args.appId, requestBody, args);
                    break;

                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;
        // ------------------ SUGGEST ------------------
        case "suggest":
            switch (target) {
                case "intents":
                    result = await client.model.listIntentSuggestions(args.appId, args.versionId, args.intentId, args);
                    break;
                case "entities":
                    result = await client.model.listEntitySuggestions(args.appId, args.versionId, args.entityId, args);
                    break;

                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;
        // ------------------ TRAIN ------------------
        case "train":
            switch (target) {
                case "version":
                    result = await client.train.trainVersion(args.appId, args.versionId, args);

                    if (args.wait) {
                        result = await waitForTrainingToComplete(client, args);
                    }
                    break;

                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;

        // ------------------- RENAME ----------------
        case "rename":
            switch (target) {

                case "version":
                    result = await client.versions.update(args.appId, args.versionId, requestBody, args);
                    break;
                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;

        // ------------------ UPDATE ------------------
        case "update":
            switch (target) {
                case "app":
                case "application":
                    result = await client.apps.update(args.appId, requestBody, args);
                    break;
                case "closedlist":
                    result = await client.model.updateClosedList(args.appId, args.versionId, args.clEntityId, requestBody, args);
                    break;
                case "closedlistentityrole":
                    result = await client.model.updateClosedListEntityRole(args.appId, args.versionId, args.entityId, args.roleId, requestBody, args);
                    break;
                case "compositeentity":
                    result = await client.model.updateCompositeEntity(args.appId, args.versionId, args.cEntityId, requestBody, args);
                    break;
                case "compositeentityrole":
                    result = await client.model.updateCompositeEntityRole(args.appId, args.versionId, args.cEntityId, args.roleId, requestBody, args);
                    break;
                case "customprebuiltentityrole":
                    result = await client.model.updateCustomPrebuiltEntityRole(args.appId, args.versionId, args.entityId, args.roleId, requestBody, args);
                    break;
                case "entity":
                    result = await client.model.updateEntity(args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "entityrole":
                    result = await client.model.updateEntityRole(args.appId, args.versionId, args.entityId, args.roleId, requestBody, args);
                    break;
                case "explicitlistitem":
                    result = await client.model.updateExplicitListItem(args.appId, args.versionId, args.entityId, args.itemId, requestBody, args);
                    break;
                case "hierarchicalentity":
                    result = await client.model.updateHierarchicalEntity(args.appId, args.versionId, args.hEntityId, requestBody, args);
                    break;
                case "hierarchicalentitychild":
                    result = await client.model.updateHierarchicalEntityChild(args.appId, args.versionId, args.hEntityId, args.hChildId, requestBody, args);
                    break;
                case "hierarchicalentityrole":
                    result = await client.model.updateHierarchicalEntityRole(args.appId, args.versionId, args.hEntityId, args.roleId, requestBody, args);
                    break;
                case "intent":
                    result = await client.model.updateIntent(args.appId, args.versionId, args.intentId, requestBody, args);
                    break;
                case "pattern":
                    result = await client.model.updatePatternAnyEntityModel(args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "patternentityrole":
                    result = await client.model.updatePatternAnyEntityRole(args.appId, args.versionId, args.entityId, args.roleId, requestBody, args);
                    break;
                case "patterns":
                    result = await client.pattern.updatePatterns(args.appId, args.versionId, requestBody, args);
                    break;
                case "permissions":
                    result = await client.permissions.update(args.appId, requestBody, args);
                    break;
                case "phraselist":
                    result = await client.features.updatePhraseList(args.appId, args.versionId, requestBody, args);
                    break;
                case "prebuiltentityrole":
                    result = await client.model.updatePrebuiltEntityRole(args.appId, args.versionId, args.entityId, args.roleId, requestBody, args);
                    break;
                case "regexentity":
                    result = await client.model.updateRegexEntityModel(args.appId, args.versionId, args.regexEntityId, requestBody, args);
                    break;
                case "regexentityrole":
                    result = await client.model.updateRegexEntityRole(args.appId, args.versionId, args.entityId, args.roleId, requestBody, args);
                    break;
                case "settings":
                    result = await client.apps.updateSettings(args.appId, requestBody, args);
                    break;
                case "versionsettings":
                    result = await client.settings.update(args.appId, args.versionId, requestBody, args);
                    break;
                case "sublist":
                    result = await client.model.updateSubList(args.appId, args.versionId, args.clEntityId, args.subListId, requestBody, args);
                    break;
                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;


        default:
            throw new Error(`Unknown verb: ${verb}`);
    }

    if (result && result.error) {
        throw new Error(result.error.message);
    }

    if (verb != "package") {
        if (result.readableStreamBody) {
            result = await new Promise((resolve) => {
                var body = '';
                var stream = result.readableStreamBody;
                stream.on('readable', () => body += stream.read());
                stream.on('end', () => {
                    resolve(body);
                });
            });
            await stdoutAsync(result);
        } else {
            await stdoutAsync((result ? JSON.stringify(result, null, 2) : 'OK') + "\n");
        }
    }
    else {
        // Packaging APIs
        if (result.readableStreamBody) {
            result = await new Promise((resolve) => {
                var stream = result.readableStreamBody;
                let body = [];
                stream.on('readable', function () {
                    let chunk;
                    while ((chunk = stream.read()) != null) {
                        body.push(chunk);
                    }
                });
                stream.on('end', () => {
                    var buffer = Buffer.concat(body);
                    resolve(buffer);
                });
            });

            await fs.writeFile(outputFilePath, result);

            await stdoutAsync(`Package file successfully written in: ${outputFilePath}`);
        }
    }
}

function sortExportedApp(result) {
    result = sortExportedAppPatterns(result);
    result = sortExportedAppPatternEntities(result);

    return result;
}

function sortExportedAppPatterns(result) {
    if (Array.isArray(result.patterns) && result.patterns.length) {
        result.patterns = result.patterns.sort((a, b) => {
            if (!a || !a.intent) return -1;
            if (!b || !b.intent) return 1;

            const diff = a.intent.localeCompare(b.intent);
            if (diff) return diff;

            if (!a.pattern) return -1;
            if (!b.pattern) return 1;
            return a.pattern.localeCompare(b.pattern);
        });
    }

    return result;
}

function sortExportedAppPatternEntities(result) {
    if (Array.isArray(result.patternAnyEntities) && result.patternAnyEntities.length) {
        result.patternAnyEntities = result.patternAnyEntities.sort((a, b) => {
            if (!a || !a.name) return -1;
            if (!b || !b.name) return 1;
            return a.name.localeCompare(b.name);
        });
    }

    return result;
}

async function writeAppToConsole(config, args, requestBody, result) {
    if (result.error) {
        throw new Error(result.error.message);
    }
    if (args.msbot) {
        await stdoutAsync(JSON.stringify({
            type: "luis",
            name: result.name,
            appId: result.id || result.appId,
            authoringKey: args.authoringKey || config.authoringKey,
            subscriptionKey: args.subscriptionKey || config.subscriptionKey || config.authoringKey,
            version: result.activeVersion || requestBody.initialVersionId || requestBody.versionId,
            region: args.region || config.region
        }, null, 2) + "\n");
    }
    else {
        await stdoutAsync(JSON.stringify(result, null, 2) + "\n");
    }
}

/**
 * Walks the user though the creation of the .luisrc
 * file and writes it to disk. the App and Version IDs
 * are optional but if omitted, --appId and --versionId
 * flags may be required for some commands.
 *
 * @returns {Promise<*>}
 */
async function initializeConfig() {
    process.stdout.write(chalk.cyan.bold('\nThis util will walk you through creating a .luisrc file\n\nPress ^C at any time to quit.\n\n'));
    //const validRegions = 'westus westus2 eastus eastus2 westcentralus southcentralus westeurope northeurope southeastasia eastasia australiaeast brazilsouth'.split(' ');
    const validRegions = 'westus westeurope australiaeast'.split(' ');
    const questions = [
        'What is your LUIS Authoring key (from luis.ai portal User Settings page)? ',
        `What is your region? [${validRegions.join(', ')}] `,
        'What is your LUIS App ID? [Default: skip] ',
        'What is your LUIS Version ID? [Default: 0.1] ',
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
                    if (i === 1 && (!response || !validRegions.includes(response))) {
                        doPrompt(chalk.red.bold(`${response} is not a valid region`) + '\n' + question);
                    } else {
                        resolve(response);
                    }
                });
            }

            doPrompt(question);
        });
        if (i == 2 && answer.trim().length == 0)
            break;
        answers.push(answer.trim());
    }

    const [authoringKey, region, appId, versionId] = answers;
    const config = Object.assign({}, {
        appId,
        authoringKey,
        versionId,
        region: region,
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
    await fs.writeJson(path.join(process.cwd(), '.luisrc'), config, { spaces: 2 });
    return true;
}

async function waitForTrainingToComplete(client, args) {

    const models = await client.model.listModels(args.appId, args.versionId, args);
    const modelMap = {};
    for (let model of models) {
        modelMap[model.id] = { name: model.name, type: model.readableType };
    }

    let loop = true;
    do {
        let result = await client.train.getStatus(args.appId, args.versionId, args);

        if (!(args.q || args.quiet)) {

            const table = new Table({
                // don't use lines for table
                chars: {
                    'top': '', 'top-mid': '', 'top-left': '', 'top-right': '',
                    'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
                    'left': '', 'left-mid': '', 'right': '', 'right-mid': '',
                    'mid': '', 'mid-mid': '', 'middle': ''
                },
                head: [chalk.default.bold('Model'), chalk.default.bold('Type'), chalk.default.bold('StatusId'), chalk.default.bold('Status'), ''],
                colWidths: [35, 20, 10, 10, 10],
                style: { 'padding-left': 1, 'padding-right': 1 },
                wordWrap: true
            });

            for (let item of result) {
                table.push([modelMap[item.modelId].name, modelMap[item.modelId].type, item.details.statusId, item.details.status, item.details.failureReason]);
            }

            process.stderr.write(table.toString() + "\n");
        }

        // get completed or up to date items
        let completedItems = result.filter(item => { return (item.details.status == "Success") || (item.details.status == "UpToDate") || (item.details.status == 'Fail') });
        if (completedItems.length == result.length)
            return result;

        await Delay(2000);

        // move back to top of table...
        if (!(args.q || args.quiet)) {
            pos.moveUp(result.length + 1);
        }
    } while (loop);
}

/**
 * Retrieves the input file to send as
 * the body of the request.
 *
 * @param args
 * @returns {Promise<*>}
 */
async function getFileInput(filename) {
    if (typeof filename !== 'string') {
        return null;
    }
    // Let any errors fall through to the runProgram() promise
    return await fs.readJSON(path.resolve(filename));
}

/**
 * Composes the config from the 3 sources that it may reside.
 * Precedence is 1. Arguments, 2. luisrc and 3. env variables
 *
 * @returns {Promise<*>}
 */
async function composeConfig() {
    const { LUIS_APP_ID, LUIS_AUTHORING_KEY, LUIS_VERSION_ID, LUIS_REGION } = process.env;

    const {
        appId: args_appId,
        authoringKey: args_authoringKey,
        versionId: args_versionId,
        region: args_region
    } = args;

    let luisrcJson = {};
    let config;
    try {
        await fs.access(path.join(process.cwd(), '.luisrc'), fs.R_OK);
        luisrcJson = await fs.readJSON(path.join(process.cwd(), '.luisrc'));
    } catch (e) {
        // Do nothing
    } finally {
        config = {
            appId: (args_appId || luisrcJson.appId || LUIS_APP_ID),
            authoringKey: (args_authoringKey || luisrcJson.authoringKey || LUIS_AUTHORING_KEY),
            versionId: (args_versionId || luisrcJson.versionId || LUIS_VERSION_ID),
            region: (args_region || luisrcJson.region || LUIS_REGION)
        };
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
    // appId and versionId are not validated here since
    // not all operations require these to be present.
    // Validation of specific params are done in the
    // ServiceBase.js
    const { authoringKey, region } = config;
    const messageTail = `is missing from the configuration.\n\nDid you run ${chalk.cyan.bold('luis init')} yet?`;

    assert(typeof authoringKey === 'string', `The authoringKey  ${messageTail}`);
    assert(typeof region === 'string', `The region ${messageTail}`);
    assert(args.region == 'westus' || args.region == 'westeurope' || args.region == 'australiaeast' || args.region == 'virginia', `${args.region} is not a valid authoring region.  Valid values are [westus|westeurope|australiaeast|virginia]`);
}

/**
 * Provides basic validation of the command arguments.
 *
 * @param serviceManifest
 */
async function validateArguments(args, operation) {
    let error = new Error();
    let body = undefined;

    error.name = 'ArgumentError';
    if (!operation) {
        let verbs = ["add", "clone", "delete", "export", "package", "get", "import", "list", "publish", "query", "set", "suggest", "train", "update"];
        if (verbs.indexOf(args._[0]) < 0)
            error.message = `'${args._[0]}' is not a valid action`;
        else if (args._.length >= 2)
            error.message = `'${args._[1]}' is not a valid resource`;
        else
            error.message = `missing resource\n`;
        throw error;
    }

    switch (operation.target[0]) {
        case "userazureaccounts":
        case "appazureaccounts":
            switch (operation.methodAlias) {
                case "list":
                    if (args.hasOwnProperty("armToken")) {
                        args.customHeaders["Authorization"] = `Bearer ${args.armToken}`;
                        operation.entityName = operation.entityName.replace('armToken', '');
                        operation.entityType = operation.entityType.replace('armToken', '');
                    }
                    break;
            }
            break;
        case "appazureaccount":
            switch (operation.methodAlias) {
                case "add":
                case "delete":
                    if (args.hasOwnProperty("armToken")) {
                        args.customHeaders["Authorization"] = `Bearer ${args.armToken}`;
                        operation.entityName = operation.entityName.replace('armToken', '');
                        operation.entityType = operation.entityType.replace('armToken', '');
                    }
                    break;
            }
            break;
    }

    const extractEntities = async (entitySpecified) => {
        if (entitySpecified) {
            const files = args.in.split(',');
            const getFileInputPromises = files.map(async (file) => {
                return await getFileInput(file);
            });
            const fileInput = await Promise.all(getFileInputPromises);
            body = fileInput.reduce((accumulator, currentValue) => (Object.assign(accumulator, currentValue)), {});
            if (body.armToken) {
                args.customHeaders["Authorization"] = `Bearer ${body.armToken}`;
            }
        }
        else {
            // make up a request body from command line args
            switch (operation.target[0]) {
                case "version":
                    switch (operation.methodAlias) {
                        case "publish":
                            if (args.versionId) {
                                body = {
                                    versionId: `${args.versionId}`,
                                    isStaging: args.staging === 'true'
                                };
                            }
                            break;
                        case "rename":
                        case "update":
                        case "clone":
                            if (args.newVersionId) {
                                body = {
                                    version: `${args.newVersionId}`
                                };
                            }
                            break;
                    }
                    break;

                case "settings":
                    switch (operation.methodAlias) {
                        case "update":
                            if (args.hasOwnProperty("public")) {
                                body = {
                                    isPublic: args.public === 'true'
                                };
                            }
                            break;
                    }
                    break;
                case "versionsettings":
                    switch (operation.methodAlias) {
                        case "update":
                            if (args.hasOwnProperty("useAllTrainingData")) {
                                body = [{
                                    name: "UseAllTrainingData",
                                    value: args.useAllTrainingData === 'true' ? 'true' : 'false'
                                }];
                            }
                            break;
                    }
                    break;
                case "appazureaccount":
                    if (args.azureSubscriptionId && args.resourceGroup && args.accountName) {
                        body = {
                            azureSubscriptionId: `${args.azureSubscriptionId}`,
                            resourceGroup: `${args.resourceGroup}`,
                            accountName: `${args.accountName}`
                        };
                    }
                    break;

                default:
                    error.message = `The --in requires an input of type: ${operation.entityType}`;
                    throw error;
            }
        }
    }

    const entitySpecified = typeof args.in === 'string';
    const entityRequired = !!operation.entityName;
    
    if (entityRequired) {
      await extractEntities(entitySpecified);
    }

    return body;
    // Note that the ServiceBase will validate params that may be required.
}

async function handleQueryCommand(args, config) {
    let query = args.q || args.query;
    if (!query) {
        process.stderr.write(chalk.red.bold(`missing -q\n`));
        return help(args);
    }
    if (!args.appId) {
        process.stderr.write(chalk.red.bold(`missing --appId\n`));
        return help(args);
    }

    let subscriptionKey = args.subscriptionKey || config.authoringKey;
    if (!subscriptionKey) {
        process.stderr.write(chalk.red.bold(`missing --subscriptionKey\n`));
        return help(args);
    }
    let uri;
    if (args.endpoint) {
        uri = `${args.endpoint}/luis/v2.0/apps/${args.appId}`;
    } else {
        if (args.region && args.cloud) {
            uri = `https://${args.region}.api.cognitive.microsoft.${args.cloud}/luis/v2.0/apps/${args.appId}`;
        }
        else {
            process.stderr.write(chalk.red.bold(`missing --region or --endpoint\n`));
            return help(args);
        }
    }

    if (query && subscriptionKey && uri) {
        var qargs = {
            log: !args.nologging,
            staging: args.staging,
            "subscription-key": `${subscriptionKey}`,
            verbose: args.verbose,
            q: `${query}`
        };
        if (args.spellCheck) {
            qargs.spellCheck = true;
            qargs["bing-spell-check-subscription-key"] = args.spellCheck;
        }
        if (args.timezoneOffset) {
            qargs.timezoneOffset = args.timezoneOffset;
        }
        var options = {
            uri: uri,
            method: "GET",
            qs: qargs,
            json: true
        }
        let timings = args.t || args.timing;
        if (args.timing) {
            let samples = typeof timings === 'boolean' ? 5 : timings;
            let total = 0.0;
            let sq = 0.0;
            let min = Number.MAX_VALUE;
            let max = Number.MIN_VALUE;
            let values = [];
            for (let i = 0; i <= samples; ++i) {
                let start = performance.now();
                await request(options);
                let elapsed = performance.now() - start;
                console.log(`${i}: ${elapsed} ms`);
                if (i > 0) {
                    total += elapsed;
                    sq += elapsed * elapsed;
                    if (elapsed > max) max = elapsed;
                    if (elapsed < min) min = elapsed;
                    values.push(elapsed);
                }
            }
            values.sort((a, b) => a - b);
            let variance = (sq - (total * total / samples)) / (samples - 1);
            let p95 = values[Math.floor((samples - 1) * 0.95)];
            console.log(`Timing after 1st: [${min} ms, ${total / samples} ms, ${max} ms], stddev ${Math.sqrt(variance)} ms, P95 ${p95} ms`)
        }
        else {
            let result = await request(options);
            await stdoutAsync(JSON.stringify(result, null, 2) + "\n");
        }
        return;
    }
    return help(args);
}

async function handleSetCommand(args, config, client) {
    if (args.length == 1 && !(args.a || args.appId || args.applicationId || args.versionId || args.authoringKey || args.region || args.versionId || args.endpoint)) {
        process.stderr.write(chalk.red.bold(`missing .luisrc argument name: [-appId|--applicationId|--versionId|--region|--authoringKey || --endpoint]\n`));
        return help(args);
    }
    config.region = args.region || config.region;
    config.authoringKey = args.authoringKey || config.authoringKey;
    config.versionId = args.versionId || config.versionId;
    config.appId = args.appId || args.applicationId || config.appId;
    if (args.endpoint) config.endpoint = args.endpoint;
    if (args._.length > 1) {
        let targetAppName = args._[1].toLowerCase();
        if (targetAppName) {
            let results = await client.apps.list(args);

            if (results.error) {
                throw new Error(results.error);
            }
            let found = false;
            for (let app of results) {
                if (app.name.toLowerCase() == targetAppName || app.id.toLowerCase() == targetAppName) {
                    config.appId = app.id;
                    config.versionId = app.activeVersion;
                    found = true;
                    break;
                }
            }
            if (!found)
                throw new Error(`Did not find an application with id or name of '${targetAppName}'`);
        }
    }
    await fs.writeJson(path.join(process.cwd(), '.luisrc'), config, { spaces: 2 });
    await stdoutAsync(JSON.stringify(config, null, 4) + "\n");
    return true;
}

runProgram()
    .then(() => process.exit())
    .catch(async (error) => {
        process.stderr.write('\n' + chalk.red.bold(error.message + '\n\n'));
        await help(args);
        process.exitCode = 1;
    });
