#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import chalk from 'chalk';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as pkg from '../../package.json';
import * as semver from 'semver';
import * as minimist from 'minimist';
import * as readTextFile from 'read-text-file';
import * as glob from 'glob';
import * as latestVersion from 'latest-version';
import * as intercept from 'intercept-stdout';
import { Activity } from 'botframework-schema';

const requiredVersion = pkg.engines.node;
if (!semver.satisfies(process.version, requiredVersion)) {
    console.log(`Required node version ${ requiredVersion } not satisfied with current version ${ process.version }.`);
    process.exit(1);
}
const help = require('../lib/help');
const chatdown = require('../lib/index');

/**
 * Retrieves the content to be parsed from a file if
 * the --in argument was specified or from the stdin
 * stream otherwise. Currently, interactive mode is
 * not supported and will timeout if no data is received
 * from stdin within 1000ms.
 *
 * @param args An object containing the argument k/v pairs
 * @returns {Promise} a Promise that resolves to the content to be parsed
 */
function getInput(args: { [key: string]: any }) {
    if (args._.length > 0) {
        args.in = args._[0];
        return readTextFile.readSync(path.resolve(args.in));
    } else {
        return new Promise((resolve, reject) => {
            const { stdin } = process;
            let timeout = setTimeout(reject, 1000);
            let input = '';

            stdin.setEncoding('utf8');
            stdin.on('data', chunk => {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                input += chunk;
            });

            stdin.on('end', () => {
                resolve(input);
            });

            stdin.on('error', error => reject(error));
        });
    }
}

/**
 * Writes the output either to a file if --out is
 * specified or to stdout otherwise.
 *
 * @param {Array<Activity>} activities The array of activities resulting from the dialog read
 * @param args An object containing the argument k/v pairs
 * @returns {Promise<boolean>} True if written to stdout
 */
async function writeOut(activities: Activity[], args: { [key: string]: any }) {
    const output = JSON.stringify(activities, null, 2);
    return new Promise(resolve => process.stdout.write(output, 'utf-8', () => resolve(true)));
}

/**
 * Processes multiple files, and writes them to the output directory.
 *
 * @param {string} inputDir String representing a glob that specifies the input directory
 * @param {string} outputDir String representing the output directory for the processed files
 * @returns {Promise<number} The length of the files array that was processed
 */
async function processFiles(inputDir: string, outputDir: string): Promise<number> {
    let files = glob.sync(inputDir, { 'ignore': ['**/node_modules/**'] });
    for (let i = 0; i < files.length; i++) {
        let fileName = files[i];
        const slashIndex = fileName.lastIndexOf('/');
        if (slashIndex !== -1) {
            fileName = fileName.substr(slashIndex);
        }
        fileName = fileName.split('.')[0];
        const activities = await chatdown(readTextFile.readSync(files[i]));
        const filePath = `${ outputDir }/${ fileName }.transcript`;
        await fs.ensureFile(filePath);
        await fs.writeJson(filePath, activities, { spaces: 2 });
    }
    return files.length;
}

/**
 * Runs the program
 *
 * @returns {Promise<number>} The exit code of the program. 0 if successful, > 0 if an error occurred
 */
async function runProgram(): Promise<0 | 1> {
    const args = minimist(process.argv.slice(2));

    if (args.prefix) {
        intercept(function (txt: string) {
            return `[${ pkg.name }]\n${ txt }`;
        });
    }

    let latest = await latestVersion(pkg.name, { version: `>${ pkg.version }` })
        .catch(() => pkg.version);
    if (semver.gt(latest, pkg.version)) {
        process.stderr.write(chalk.white(`\n     Update available `));
        process.stderr.write(chalk.grey(`${ pkg.version }`));
        process.stderr.write(chalk.white(` -> `));
        process.stderr.write(chalk.greenBright(`${ latest }\n`));
        process.stderr.write(chalk.white(`     Run `));
        process.stderr.write(chalk.blueBright(`npm i -g ${ pkg.name } `));
        process.stderr.write(chalk.white(`to update.\n`));
    }

    if (args.version || args.v) {
        process.stdout.write(pkg.version);
        return 0;
    }

    if (args.h || args.help) {
        help(process.stdout);
        return 0;
    }

    if (args.f || args.folder) {
        let inputDir = args.f.trim();
        let outputDir = (args.o || args.out_folder) ? args.o.trim() : './';
        if (outputDir.substr(0, 2) === './') {
            outputDir = path.resolve(process.cwd(), outputDir.substr(2));
        }
        const len = await processFiles(inputDir, outputDir);
        process.stdout.write(chalk`{green Successfully wrote ${ '' + len } files}\n`);
        return 0;
    } else {
        const fileContents = await getInput(args);
        if (fileContents) {
            const activities = await chatdown(fileContents, args);
            const writeConfirmation = await writeOut(activities, args);

            if (typeof writeConfirmation === 'string') {
                process.stdout.write(chalk`{green Successfully wrote file:} {blue ${ writeConfirmation }}\n`);
            }
            return 0;
        } else {
            help();
            return 1;
        }
    }
}

/**
 * Utility function that exist the process with an
 * optional error. If an Error is received, the error
 * message is written to stdout, otherwise, the help
 * content are displayed.
 *
 * @param {*} error Either an instance of Error or null
 */
function exitWithError(error: Error | null) {
    if (error instanceof Error) {
        process.stderr.write(chalk.red(error.toString()));
    } else {
        help();
    }
    process.exit(1);
}

runProgram()
    .then(() => process.exit(0))
    .catch(exitWithError);
