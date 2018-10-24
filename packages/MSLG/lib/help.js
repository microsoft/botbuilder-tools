/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
const Table = require('cli-table3');
const chalk = require('chalk');
const path = require('path');
const txtfile = require('read-text-file');
const windowSize = require('window-size');

const manifest = require('./api/mslg');
const { getServiceManifest } = require('../lib/utils/argsUtil');

/**
 * Displays help content from the arguments.
 *
 * @param args The arguments input by the user
 * @returns {Promise<void>}
 */
module.exports = async function help(args, output) {
    if (!output)
        output = process.stderr;

    output.write('Language Generation Command Line Interface - © 2018 Microsoft Corporation\n\n');
    const helpContents = await getHelpContents(args, output);
    let width = windowSize ? windowSize.width : 250;

    let leftColWidth = 0;
    for (let hc of helpContents) {
        if (hc.table && hc.table[0].length > 0) {
            for (let row in hc.table) {
                let len = hc.table[row][0].length;
                if (len > leftColWidth) {
                    leftColWidth = Math.min(len, Math.floor(width / 3));
                }
            }
        }
    }

    helpContents.forEach(helpContent => {
        output.write(chalk.white.bold(helpContent.head + '\n'));
        if (helpContent.table && helpContent.table[0].length > 0) {
            const rows = helpContent.table[0].length;
            let i = rows - 1;

            const colWidthsFor2On = ((width * .85) - leftColWidth) / i;
            const colWidths = [leftColWidth];

            while (i--) {
                colWidths.push(Number.parseInt(colWidthsFor2On));
            }

            const table = new Table({
                // don't use lines for table
                chars: {
                    'top': '', 'top-mid': '', 'top-left': '', 'top-right': '',
                    'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
                    'left': '', 'left-mid': '', 'right': '', 'right-mid': '',
                    'mid': '', 'mid-mid': '', 'middle': ''
                },
                colWidths,
                style: { 'padding-left': 1, 'padding-right': 1 },
                wordWrap: true
            });
            table.push(...helpContent.table);
            output.write(table.toString());
        }
        output.write('\n\n');
    });
}

/**
 * Retrieves help content vie the qnamaker.json from
 * the arguments input by the user.
 *
* @param args The arguments input by the user
* @returns {Promise<*>}
*/
async function getHelpContents(args, output) {
    if ('!' in args) {
        return getAllCommands(output);
    }

    if (args._.length == 0) {
        return getGeneralHelpContents(output);
    }
    else if (args._.length == 1) {
        return getVerbHelp(args._[0], output);
    } else if (args._.length >= 2) {
        const serviceManifest = getServiceManifest(args);
        if (serviceManifest) {
            const { operation } = serviceManifest;

            output.write(`${operation.description}\n\n`);
            output.write(`Usage:\n${chalk.cyan.bold(operation.command)}\n\n`);
        } else {
            return getVerbHelp(args._[0], output);
        }
    }

    const serviceManifest = getServiceManifest(args);
    if (serviceManifest) {
        return getHelpContentsForService(serviceManifest, output);
    }

    return getGeneralHelpContents(output);
}

let configSection = {
    head: 'Configuration and Overrides:',
    table: [
        [chalk.cyan.bold('--authoringKey <key>'), 'Specifies the LG authoring key. Overrides the .lgrc value and the LG_AUTHORING_KEY environment variable.'],
        [chalk.cyan.bold('--endpointBasePath <path>'), 'Specifies the base URI for all requests. Overrides the .lgrc value and the LG_ENDPOINT_BASE_PATH environment variable.'],
        [chalk.cyan.bold('--lgAppId <appId>'), 'Specifies the public LG application id. Overrides the .lgrc value and the LG_APP_ID environment variable.'],
        [chalk.cyan.bold('--appName <name>'), 'Specifies the public LG application name. Overrides the .lgrc value and the LG_APP_NAME environment variable.'],
        [chalk.cyan.bold('--appLocale <locale>'), 'Specifies the public LG application locale. Overrides the .lgrc value and the LG_APP_LOCALE environment variable.'],
        [chalk.cyan.bold('--appVersion <version>'), 'Specifies the public LG application version. Overrides the .lgrc value and the LG_APP_VERSION environment variable.'],


    ]
};

let globalArgs = {
    head: 'Global Arguments:',
    table: [
        [chalk.cyan.bold('--help,    -h'), 'Prints this help file.'],
        [chalk.cyan.bold('--version, -v'), 'Prints the version of this cli tool'],
        [chalk.cyan.bold('--!          '), 'Dumps all documented commands to the console with descriptions']
    ]
};

/**
 * General help contents
 *
 * @returns {*[]}
 */
function getGeneralHelpContents() {
    let options = {
        head: chalk.bold(`Available actions are:`),
        table: [
            [chalk.cyan.bold('init'), 'Initializes the .lgrc file with settings'],
            [chalk.cyan.bold("create"), "create resource"],
            [chalk.cyan.bold("delete"), "delete resource"],
            [chalk.cyan.bold("get"), "list resource(s)"],
            [chalk.cyan.bold("update"), "update resource"],
            [chalk.cyan.bold("replace"), "replace a resource"],
            [chalk.cyan.bold("set"), "change the .lgrc settings"],
            [chalk.cyan.bold("parse"), "parse input .lg file(s), collate them and write the output to disk"],
            [chalk.cyan.bold("translate"), "localize .lg file(s) and write output files."]
        ]
    };

    const sections = [];
    sections.push(options);
    sections.push(configSection);
    sections.push(globalArgs);
    return sections;
}

/**
 * General verb help contents
 *
 * @returns {*[]}
 */
function getVerbHelp(verb, output) {
    const  targets = [];
    const  options = {
        head: `Available resources for ${chalk.bold(verb)}:`,
        table: []
    };

    // special verbs
    switch (verb) {
    case "parse":
        output.write(chalk.cyan.bold("mslg parse <args>\n\n"));
        options.table.push([chalk.cyan.bold('-l, --lgFolder <inputFolder>'), 'Folder that has the .lg file. By default mslg will only look at the current folder. To look at all subfolders, include -s']);
        options.table.push([chalk.cyan.bold('-s, --subfolder'), '[Optional] Include sub-folders as well when looking for .lg files']);
        options.table.push([chalk.cyan.bold('-o, --outFolder <outputFolder>'), '[Optional] Output folder for all files the tool will generate']);
        options.table.push([chalk.cyan.bold('-n, --lgAppName <name>'), '[Optional] Output LG app name']);
        options.table.push([chalk.cyan.bold('--verbose'), '[Optional] Get verbose messages from parser']);
        return [options, globalArgs];
    case "translate":
        output.write(chalk.cyan.bold("mslg translate <args>\n\n"));
        options.table.push([chalk.cyan.bold('--in <lgFile>'), '.lu file to parse']);
        options.table.push([chalk.cyan.bold('-t, --toLang <tgtLang>'), 'Target language to translate to. See https://aka.ms/translate-langs for list of supported langauges and codes.']);
        options.table.push([chalk.cyan.bold('-k, --translateKey <trKey>'), 'Your translation key. See https://aka.ms/translate-key to get your key']);
        options.table.push([chalk.cyan.bold('-l, --lgFolder <inputFolder>'), '[Optional] Folder that has .lg files. By default mslg will only look at the current folder. To look at all subfolders, include -s']);
        options.table.push([chalk.cyan.bold('-o, --outFolder <outputFolder>'), '[Optional] Output folder for all files the tool will generate']);
        options.table.push([chalk.cyan.bold('-f, --srcLang <srcLang>'), '[Optional] Source language. When omitted, source language is automatically detected. See https://aka.ms/translate-langs for list of supported languages and codes']);
        options.table.push([chalk.cyan.bold('-s, --subfolder'), '[Optional] Include sub-folders as well when looking for .lg files']);
        options.table.push([chalk.cyan.bold('-n, --lgFile <LGFile>'), '[Optional] Output .lg file name']);
        options.table.push([chalk.cyan.bold('-c, --translateComments'), '[Optional] Translate comments in .lg files']);
        options.table.push([chalk.cyan.bold('-u, --translateLinkText'), '[Optional] Translate link text for .lg file references']);
        options.table.push([chalk.cyan.bold('--verbose'), '[Optional] Get verbose messages from translator']);
        return [options, globalArgs];
    case "set":
        output.write(chalk.cyan.bold("mslg set <.lgrcSetting> <value>\n\n"));
        options.table.push([chalk.cyan.bold("--authoringKey <authoringKey>"), "change the active authoringKey"]);
        options.table.push([chalk.cyan.bold("--endpointKey <endpointKey>"), "change the active endpointKey"]);
        options.table.push([chalk.cyan.bold("--endpointBasePath <endpointBasePath>"), "change the active endpointBasePath"]);
        options.table.push([chalk.cyan.bold("--lgAppId <lgAppId>"), "change the active lg app id "]);
        options.table.push([chalk.cyan.bold("--lgAppName <lgAppName>"), "change the active lg app name "]);
        options.table.push([chalk.cyan.bold("--lgAppLocale <lgAppLocale>"), "change the active lg app locale"]);
        options.table.push([chalk.cyan.bold("--lgAppDomain <lgAppDomain>"), "change the active lg app domain"]);
        options.table.push([chalk.cyan.bold("--lgAppVersion <lgAppVersion>"), "change the active lg app version"]);
        return [options, globalArgs];
    case "init":
        output.write(chalk.cyan.bold("mslg init\n\n"));
        return [globalArgs];
    }

    for (const apiGroupName in manifest) {
        const category = manifest[apiGroupName];

        for (let operationKey in category.operations) {
            let operation = category.operations[operationKey];
            if (operation.methodAlias === verb) {
                let target = operation.target[0];
                if (targets.indexOf(target) < 0) {
                    targets.push(target);
                }
            }
        }
    }

    if (targets.length == 0)
        return getGeneralHelpContents(output);

    targets.sort();
    for (let verb of targets) {
        options.table.push([chalk.cyan.bold(verb), '']);
    }
    return [options, configSection, globalArgs];
}

/**
 * Walks the mslg.json and pulls out all
 * commands that are supported.
 *
 * @returns {*[]}
 */
function getAllCommands() {
    let resourceTypes = [];
    let tables = {};
    Object.keys(manifest).forEach(key => {
        const { [key]: category } = manifest;
        Object.keys(category.operations).forEach((operationKey) => {
            let operation = category.operations[operationKey];
            let opCategory = operation.target[0] || operation.methodAlias;
            if (resourceTypes.indexOf(opCategory) < 0) {
                resourceTypes.push(opCategory);
                tables[opCategory] = [];
            }
            tables[opCategory].push([chalk.cyan.bold(operation.command), operation.description]);
        });
    });

    resourceTypes.sort();

    const sections = [];
    for (let resourceType of resourceTypes) {
        tables[resourceType].sort((a, b) => a[0].localeCompare(b[0]));
        sections.push({
            head: chalk.white.bold(resourceType),
            table: tables[resourceType]
        });
    }

    return sections;
}

/**
 * Gets the help content for a target or sub target.
 *
 * @param {*} serviceManifest The manifest entry containing the operations
 * @param {string} categoryName The name of the category it belongs to
 * @param {string} targetName The name of the target (if present)
 * @param {string} subTargetName the name of the subTarget (if present)
 *
 * @returns {Array}
 */
function getHelpContentsForService(serviceManifest) {
    const { operation } = serviceManifest;

    const sections = [];
    // params table is shown only if we have a single
    // operation with 1 or more params.
    if (serviceManifest.operation) {
        let paramsHelp = { head: '', table: [] };
        if (serviceManifest.operation.params) {
            const { params } = operation;
            paramsHelp = {
                head: `Command arguments are:`,
                table: params.map(param => [chalk.cyan.bold(`--${param.alias || param.name} <${param.type}>${param.required ? ' (required)' : ''}`), param.description])
            };
            if (operation.entityName) {
                paramsHelp.table.unshift([chalk.cyan.bold(`--config ${operation.entityType}.json`), `The ${operation.entityType} object to send in the body of the request. This overrides the values in .lgrc`],
                    ['', chalk.dim(getEntityTypeExample(operation.entityType))]);
            }
        } else if (operation.entityName) {
            paramsHelp = {
                head: `Command arguments are:`,
                table: [
                    [chalk.cyan.bold(`--config ${operation.entityType}.json`), `The ${operation.entityType} object to send in the body of the request`],
                    ['', chalk.dim(getEntityTypeExample(operation.entityType))]
                ]
            };
        }

        if (paramsHelp.table.length > 0)
            sections.push(paramsHelp);
    }
    sections.push(configSection);
    sections.push(globalArgs);
    return sections;
}


function getEntityTypeExample(entityType) {
    try {
        const examplePath = path.join(__dirname, `../examples/${entityType}.json`);
        const json = txtfile.readSync(examplePath).replace(/[\r\f]+/g, '\n');
        return json;
    } catch (error) {
        return `{/*example for ${entityType} missing*/}`;
    }
}