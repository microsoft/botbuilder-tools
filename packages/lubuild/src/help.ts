/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import * as chalk from 'chalk';
const Table = require('cli-table3');

const windowSize = require('window-size');

/**
 * Displays help content from the arguments.
 *
 * @param args The arguments input by the user
 * @returns {Promise<void>}
 */
export function help(output: NodeJS.WriteStream) {
    if (!output)
        output = process.stdout;

    output.write('LUBUILD Command Line Interface - © 2018 Microsoft Corporation\n\n');
    const helpContents = getHelpContents();

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

    for (let helpContent of helpContents) {
        output.write(chalk.default.white.bold(helpContent.head + '\n'));
        if (helpContent.table && helpContent.table[0].length > 0) {
            const rows = helpContent.table[0].length;
            let i = rows - 1;

            let colWidthsFor2On = ((width * .85) - leftColWidth) / i;
            let colWidths = [leftColWidth];

            while (i--) {
                colWidths.push(~~colWidthsFor2On);
            }

            let table = new Table({
                // don't use lines for table
                "chars" : {
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
    };
}




/**
 * General help contents
 *
 * @returns {*[]}
 */
function getHelpContents() {
    let sections = [];

    sections.push({
        head: chalk.default.bold(`Configuration Settings:`),
        table: [
            [chalk.default.cyan.bold('--authoringKey [key]'), 'Specifies the LUIS authoring  key (from luis.ai portal user settings page).'],
            [chalk.default.cyan.bold('--environment [name]'), '(OPTIONAL) sets the target environment (Default: useralias)'],
            [chalk.default.cyan.bold('--authoringRegion [westus|westeurope|australiaeast]'), '(OPTIONAL) overrides models.config with the authoring region for all requests. (Default:westus)'],
            [chalk.default.cyan.bold('--config [folder]'), '(OPTIONAL) specifies the models file (Default: ./models.config)'],
            [chalk.default.cyan.bold('--name [projectname]'), '(OPTIONAL) overrides config file with project name '],
            [chalk.default.cyan.bold('--folder [foldernmae]'), '(OPTIONAL) overrides config file with output folder name'],
            [chalk.default.cyan.bold('--force'), '(OPTIONAL) Force all models to be updated '],
        ]
    });

    sections.push({
        head: 'Global Arguments:',
        table: [
            [chalk.default.cyan.bold('--help,    -h'), `Prints this help file. `],
            [chalk.default.cyan.bold('--version, -v'), 'Prints the version of this cli tool'],
        ]
    });
    return sections;
}

