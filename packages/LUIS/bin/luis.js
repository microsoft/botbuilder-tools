#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/*eslint no-console: ["error", { allow: ["log"] }] */

const pkg = require('../package.json');
const semver = require('semver');
const stdin = require('get-stdin');
const msRest = require("ms-rest-js");
const { LuisAuthoring } = require('../lib/luisAuthoring');
const getOperation = require('./getOperation');
var pos = require("cli-position");
const Table = require('cli-table3');

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
const txtfile = require('read-text-file');

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
        .catch(error => pkg.version);
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

    if (args.help ||
        args.h ||
        args['!'] ||
        args._.includes('help')) {
        return help(args, process.stdout);
    }
    if (args.prefix) {
        const unhook_intercept = intercept(function (txt) {
            return `[${pkg.name}]\n${txt}`;
        });
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
    args.customHeaders = { "accept-language": "en-US" };

    validateConfig(args);

    let credentials = new msRest.ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": args.authoringKey } });
    const client = new LuisAuthoring(credentials);

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

    switch (verb) {
        // ------------------ ADD  ------------------
        case "add":
            switch (target) {
                case "app":
                case "application":
                    result = await client.apps.add(args.region, requestBody, args);
                    result = await client.apps.get(args.region, result, args);

                    // Write output to console and return
                    await writeAppToConsole(config, args, requestBody, result);
                    return;
                case "closedlist":
                    result = await client.model.addClosedList(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "closedlistentityrole":
                    result = await client.model.createClosedListEntityRole(args.region, args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "compositeentity":
                    result = await client.model.addCompositeEntity(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "compositeentitychild":
                    result = await client.model.addCompositeEntityChild(args.region, args.appId, args.versionId, args.cEntityId, requestBody, args);
                    break;
                case "compositeentityrole":
                    result = await client.model.createCompositeEntityRole(args.region, args.appId, args.versionId, args.cEntityId, requestBody, args);
                    break;
                case "customprebuiltdomain":
                    result = await client.model.addCustomPrebuiltDomain(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "customprebuiltentity":
                    result = await client.model.addCustomPrebuiltEntity(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "customprebuiltentityrole":
                    result = await client.model.createCustomPrebuiltEntityRole(args.region, args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "customprebuiltintent":
                    result = await client.model.addCustomPrebuiltIntent(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "entity":
                    result = await client.model.addEntity(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "entityrole":
                    result = await client.model.createEntityRole(args.region, args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "example":
                    result = await client.examples.add(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "examples":
                    result = await client.examples.batch(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "explicitlistitem":
                    result = await client.model.addExplicitListItem(args.region, args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "hierarchicalentity":
                    result = await client.model.addHierarchicalEntity(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "hierarchicalentitychild":
                    result = await client.model.addHierarchicalEntityChild(args.region, args.appId, args.versionId, args.hEntityId, requestBody, args);
                    break;
                case "hierarchicalentityrole":
                    result = await client.model.createHierarchicalEntityRole(args.region, args.appId, args.versionId, args.hEntityId, requestBody, args);
                    break;
                case "intent":
                    result = await client.model.addIntent(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "pattern":
                    result = await client.pattern.addPattern(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "patternentityrole":
                    result = await client.model.createPatternAnyEntityRole(args.region, args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "patterns":
                    result = await client.pattern.batchAddPatterns(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "permissions":
                    result = await client.permissions.add(args.region, args.appId, requestBody, args);
                    break;
                case "phraselist":
                    result = await client.features.addPhraseList(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "prebuilt":
                    result = await client.model.addPrebuilt(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "prebuiltentityrole":
                    result = await client.model.createPrebuiltEntityRole(args.region, args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "regexentity":
                    result = await client.model.createRegexEntityModel(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "regexentityrole":
                    result = await client.model.createRegexEntityRole(args.region, args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "sublist":
                    result = await client.model.addSubList(args.region, args.appId, args.versionId, args.clEntityId, requestBody, args);
                    break;
                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;
        // ------------------ CLONE ------------------
        case "clone":
            switch (target) {
                case "version":
                    result = await client.versions.clone(args.region, args.appId, args.versionId, requestBody, args);
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
                        let app = await client.apps.get(args.region, args.appId, args);
                        if (app.error) {
                            throw new Error(app.error);
                        }

                        if (!args.force) {
                            let answer = readlineSync.question(`Are you sure you want to delete the application ${app.name} (${app.id})? [no] `, { defaultResponse: 'no' });
                            if (answer.length == 0 || answer[0] != 'y') {
                                process.stderr.write('delete operation canceled\n');
                                process.exit(1);
                                return;
                            }
                        }
                        result = await client.apps.deleteMethod(args.region, args.appId, args);
                    }
                    break;

                case "version":
                    {
                        let app = await client.apps.get(args.region, args.appId, args);
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
                        result = await client.versions.deleteMethod(args.region, args.appId, args.versionId, args);
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
                    result = await client.versions.exportMethod(args.region, args.appId, args.versionId, args);
                    break;
                case "closedlist":
                    result = await client.model.getClosedList(args.region, args.appId, args.versionId, args.clEntityId, args);
                    break;
                case "closedlistentityrole":
                    result = await client.model.getClosedListEntityRole(args.region, args.appId, args.versionId, args.entityId, args.roleId, args);
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
                    result = await client.apps.get(args.region, args.appId, args);

                    // Write output to console and return
                    await writeAppToConsole(config, args, requestBody, result);
                    return;

                case "closedlist":
                    result = await client.model.getClosedList(args.region, args.appId, args.versionId, args.clEntityId, args);
                    break;
                case "closedlistentityrole":
                    result = await client.model.getClosedListEntityRole(args.region, args.appId, args.versionId, args.entityId, args.roleId, args);
                    break;
                case "compositeentity":
                    result = await client.model.getCompositeEntity(args.region, args.appId, args.versionId, args.cEntityId, args);
                    break;
                case "compositeentityrole":
                    result = await client.model.getCompositeEntityRole(args.region, args.appId, args.versionId, args.cEntityId, args.roleId, args);
                    break;
                //case "customprebuiltdomain":
                //case "customprebuiltentityrole":
                case "entity":
                    result = await client.model.getEntity(args.region, args.appId, args.versionId, args.entityId, args);
                    break;
                case "entityrole":
                    result = await client.model.getEntityRole(args.region, args.appId, args.versionId, args.entityId, args.roleId, args);
                    break;
                case "explicitlistitem":
                    result = await client.model.getExplicitListItem(args.region, args.appId, args.versionId, args.entityId, args.itemId, args);
                    break;
                case "hierarchicalentity":
                    result = await client.model.getHierarchicalEntity(args.region, args.appId, args.versionId, args.hEntityId, args);
                    break;
                case "hierarchicalentitychild":
                    result = await client.model.getHierarchicalEntityChild(args.region, args.appId, args.versionId, args.hEntityId, args.hChildId, args);
                    break;
                case "hierarchicalentityrole":
                    result = await client.model.getHierarchicalEntityRole(args.region, args.appId, args.versionId, args.hEntityId, args.roleId, args);
                    break;
                case "intent":
                    result = await client.model.getIntent(args.region, args.appId, args.versionId, args.intentId, args);
                    break;
                case "pattern":
                    result = await client.features.getPatternFeatureInfo(args.region, args.appId, args.versionId, args.patternId, args);
                    break;
                case "patternentityrole":
                    result = await client.model.getPatternAnyEntityRole(args.region, args.appId, args.versionId, args.entityId, args.roleId, args);
                    break;
                case "phraselist":
                    result = await client.features.getPhraseList(args.region, args.appId, args.versionId, args.phraselistId, args);
                    break;
                case "prebuilt":
                    result = await client.model.getPrebuilt(args.region, args.appId, args.versionId, args.prebuiltId, args);
                    break;
                case "prebuiltentityrole":
                    result = await client.model.getPrebuiltEntityRole(args.region, args.appId, args.versionId, args.entityId, args.roleId, args);
                    break;
                case "regexentity":
                    result = await client.model.getRegexEntityEntityInfo(args.region, args.appId, args.versionId, args.regexEntityId, args);
                    break;
                case "regexentityrole":
                    result = await client.model.getRegexEntityRole(args.region, args.appId, args.versionId, args.entityId, args.roleId, args);
                    break;
                case "settings":
                    result = await client.apps.getSettings(args.region, args.appId, requestBody, args);
                    break;
                case "status":
                    result = await client.train.getStatus(args.region, args.appId, args.versionId, args);
                    if (args.wait) {
                        result = await waitForTrainingToComplete(client, args);
                    }
                    break;
                case "version":
                    result = await client.versions.get(args.region, args.appId, args.versionId, args);
                    break;
                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;
        // ------------------ IMPORT ------------------
        case "import":
            switch (target) {
                case "app":
                case "application":
                    if (args.appName) {
                        requestBody.name = args.appName;
                    }
                    result = await client.apps.importMethod(args.region, requestBody, args);
                    result = await client.apps.get(args.region, result, args);

                    // Write output to console and return
                    await writeAppToConsole(config, args, requestBody, result);
                    return;

                case "version":
                    result = await client.versions.importMethod(args.region, args.appId, requestBody, args);
                    if (args.msbot) {
                        let version = result.version;
                        result = await client.apps.get(args.region, args.appId || args.applicationId || config.applicationId, args);
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
                    result = await client.apps.list(args.region, args);
                    break;
                case "examples":
                    result = await client.examples.list(args.region, args.appId, args.versionId, args);
                    break;
                case "features":
                    result = await client.features.list(args.region, args.appId, args.versionId, args);
                    break;
                case "permissions":
                    result = await client.permissions.list(args.region, args.appId, args);
                    break;
                case "versions":
                    result = await client.versions.list(args.region, args.appId, args);
                    break;
                // --- model methods---
                case "closedlists":
                    result = await client.model.listClosedLists(args.region, args.appId, args.versionId, args);
                    break;
                case "compositeentities":
                    result = await client.model.listCompositeEntities(args.region, args.appId, args.versionId, args);
                    break;
                case "customprebuiltentities":
                    result = await client.model.listCustomPrebuiltEntities(args.region, args.appId, args.versionId, args);
                    break;
                case "customprebuiltintents":
                    result = await client.model.listCustomPrebuiltIntents(args.region, args.appId, args.versionId, args);
                    break;
                case "customprebuiltmodels":
                    result = await client.model.listCustomPrebuiltModels(args.region, args.appId, args.versionId, args);
                    break;
                case "entities":
                    result = await client.model.listEntities(args.region, args.appId, args.versionId, args);
                    break;
                case "hierarchicalentities":
                    result = await client.model.listHierarchicalEntities(args.region, args.appId, args.versionId, args);
                    break;
                case "intents":
                    result = await client.model.listIntents(args.region, args.appId, args.versionId, args);
                    break;
                case "models":
                    result = await client.model.listModels(args.region, args.appId, args.versionId, args);
                    break;
                case "prebuiltentities":
                    result = await client.model.listPrebuiltEntities(args.region, args.appId, args.versionId, args);
                    break;
                case "prebuilts":
                    result = await client.model.listPrebuilts(args.region, args.appId, args.versionId, args);
                    break;
                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;
        // ------------------ PUBLISH ------------------
        case "publish":
            switch (target) {
                case "version":
                    result = await client.apps.publish(args.region, args.appId, requestBody, args);
                    break;

                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;
        // ------------------ SUGGEST ------------------
        case "suggest":
            switch (target) {
                case "intents":
                    result = await client.apps.publish(args.region, args.appId, requestBody, args);
                    break;
                case "entities":
                    result = await client.apps.publish(args.region, args.appId, requestBody, args);
                    break;

                default:
                    throw new Error(`Unknown resource: ${target}`);
            }
            break;
        // ------------------ TRAIN ------------------
        case "train":
            switch (target) {
                case "version":
                    result = await client.train.trainVersion(args.region, args.appId, args.versionId, args);

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
                    result = await client.versions.update(args.region, args.appId, args.versionId, requestBody, args);
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
                    result = await client.apps.update(args.region, args.appId, requestBody, args);
                    break;
                case "closedlist":
                    result = await client.model.updateClosedList(args.region, args.appId, args.versionId, args.clEntityId, requestBody, args);
                    break;
                case "closedlistentityrole":
                    result = await client.model.updateClosedListEntityRole(args.region, args.appId, args.versionId, args.entityId, args.roleId, requestBody, args);
                    break;
                case "compositeentity":
                    result = await client.model.updateCompositeEntity(args.region, args.appId, args.versionId, args.cEntityId, requestBody, args);
                    break;
                case "compositeentityrole":
                    result = await client.model.updateCompositeEntityRole(args.region, args.appId, args.versionId, args.cEntityId, args.roleId, requestBody, args);
                    break;
                case "customprebuiltentityrole":
                    result = await client.model.updateCustomPrebuiltEntityRole(args.region, args.appId, args.versionId, args.entityId, args.roleId, requestBody, args);
                    break;
                case "entity":
                    result = await client.model.updateEntity(args.region, args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "entityrole":
                    result = await client.model.updateEntityRole(args.region, args.appId, args.versionId, args.entityId, args.roleId, requestBody, args);
                    break;
                case "explicitlistitem":
                    result = await client.model.updateExplicitListItem(args.region, args.appId, args.versionId, args.entityId, args.itemId, requestBody, args);
                    break;
                case "hierarchicalentity":
                    result = await client.model.updateHierarchicalEntity(args.region, args.appId, args.versionId, args.hEntityId, requestBody, args);
                    break;
                case "hierarchicalentitychild":
                    result = await client.model.updateHierarchicalEntityChild(args.region, args.appId, args.versionId, args.hEntityId, args.hChildId, requestBody, args);
                    break;
                case "hierarchicalentityrole":
                    result = await client.model.updateHierarchicalEntityRole(args.region, args.appId, args.versionId, args.hEntityId, args.roleId, requestBody, args);
                    break;
                case "intent":
                    result = await client.model.updateIntent(args.region, args.appId, args.versionId, args.intentId, requestBody, args);
                    break;
                case "pattern":
                    result = await client.model.updatePatternAnyEntityModel(args.region, args.appId, args.versionId, args.entityId, requestBody, args);
                    break;
                case "patternentityrole":
                    result = await client.model.updatePatternAnyEntityRole(args.region, args.appId, args.versionId, args.entityId, args.roleId, requestBody, args);
                    break;
                case "patterns":
                    result = await client.pattern.updatePatterns(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "permissions":
                    result = await client.permissions.update(args.region, args.appId, requestBody, args);
                    break;
                case "phraselist":
                    result = await client.features.updatePhraseList(args.region, args.appId, args.versionId, requestBody, args);
                    break;
                case "prebuiltentityrole":
                    result = await client.model.updatePrebuiltEntityRole(args.region, args.appId, args.versionId, args.entityId, args.roleId, requestBody, args);
                    break;
                case "regexentity":
                    result = await client.model.updateRegexEntityModel(args.region, args.appId, args.versionId, args.regexEntityId, requestBody, args);
                    break;
                case "regexentityrole":
                    result = await client.model.updateRegexEntityRole(args.region, args.appId, args.versionId, args.entityId, args.roleId, requestBody, args);
                    break;
                case "settings":
                    result = await client.apps.updateSettings(args.region, args.appId, requestBody, args);
                    break;
                case "sublist":
                    result = await client.model.updateSubList(args.region, args.appId, args.versionId, args.clEntityId, args.subListId, requestBody, args);
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

    await stdoutAsync((result ? JSON.stringify(result, null, 2) : 'OK') + "\n");
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

    const models = await client.model.listModels(args.region, args.appId, args.versionId, args);
    const modelMap = {};
    for (let model of models) {
        modelMap[model.id] = { name: model.name, type: model.readableType };
    }

    do {
        let result = await client.train.getStatus(args.region, args.appId, args.versionId, args);

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
    } while (true);
}

/**
 * Retrieves the input file to send as
 * the body of the request.
 *
 * @param args
 * @returns {Promise<*>}
 */
async function getFileInput(args) {
    if (typeof args.in !== 'string') {
        return null;
    }
    // Let any errors fall through to the runProgram() promise
    return JSON.parse(await txtfile.read(path.resolve(args.in)));
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
        luisrcJson = JSON.parse(await txtfile.read(path.join(process.cwd(), '.luisrc')));
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
    assert(args.region == "westus" || args.region == 'westeurope' || args.region == 'australiaeast', `${args.region} is not a valid authoring region.  Valid values are [westus|westeuerope|australiaest]`);
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
        let verbs = ["add", "clone", "delete", "export", "get", "import", "list", "publish", "query", "set", "suggest", "train", "update"];
        if (verbs.indexOf(args._[0]) < 0)
            error.message = `'${args._[0]}' is not a valid action`;
        else if (args._.length >= 2)
            error.message = `'${args._[1]}' is not a valid resource`;
        else
            error.message = `missing resource\n`;
        throw error;
    }

    const entitySpecified = typeof args.in === 'string';
    const entityRequired = !!operation.entityName;

    if (entityRequired) {
        if (entitySpecified) {
            body = await getFileInput(args);
        }
        else {
            // make up a request body from command line args
            switch (operation.target[0]) {
                case "version":
                    switch (operation.methodAlias) {
                        case "publish":
                            if (args.region && args.versionId) {
                                body = {
                                    versionId: `${args.versionId}`,
                                    isStaging: args.staging === 'true',
                                    region: args.publishRegion
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

                default:
                    error.message = `The --in requires an input of type: ${operation.entityType}`;
                    throw error;
            }
        }
    }
    return body;
    // Note that the ServiceBase will validate params that may be required.
}

async function handleQueryCommand(args, config) {
    let query = args.q || args.question;
    if (!query) {
        process.stderr.write(chalk.red.bold(`missing -q\n`));
        return help(args);
    }
    let appId = args.appId || config.appId;
    if (!appId) {
        process.stderr.write(chalk.red.bold(`missing --appid\n`));
        return help(args);
    }

    let subscriptionKey = args.subscriptionKey || config.authoringKey;
    if (!subscriptionKey) {
        process.stderr.write(chalk.red.bold(`missing --subscriptionKey\n`));
        return help(args);
    }
    let region = args.region || config.region;
    if (!region) {
        process.stderr.write(chalk.red.bold(`missing --region\n`));
        return help(args);
    }

    if (query && appId && subscriptionKey && region) {
        var options = {
            uri: `https://${region}.api.cognitive.microsoft.com/luis/v2.0/apps/${appId}`,
            method: "GET",
            qs: {  // Query string like ?key=value&...
                "subscription-key": `${subscriptionKey}`,
                verbose: true,
                timezoneOffset: 0,
                q: `${query}`
            },
            json: true
        }

        let result = await request(options);
        await stdoutAsync(JSON.stringify(result, null, 2) + "\n");
        return;
    }
    return help(args);
}

async function handleSetCommand(args, config, client) {
    if (args.length == 1 && !(args.a || args.appId || args.applicationId || args.versionId || args.authoringKey || args.region || args.versionId)) {
        process.stderr.write(chalk.red.bold(`missing .luisrc argument name: [-appId|--applicationId|--versionId|--region|--authoringKey]\n`));
        return help(args);
    }
    config.region = args.region || config.region;
    config.authoringKey = args.authoringKey || config.authoringKey;
    config.versionId = args.versionId || config.versionId;
    config.appId = args.appId || args.applicationId || config.appId;
    if (args._.length > 1) {
        let targetAppName = args._[1].toLowerCase();
        if (targetAppName) {
            let results = await client.apps.list(args.region, args);

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
