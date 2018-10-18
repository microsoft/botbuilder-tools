/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
import * as chalk from 'chalk';
import * as program from 'commander';

program.option('--prefix', 'Append [msbot] prefix to all messages');

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    showErrorHelp();
};

program
    .name('msbot update')
    .command('appinsights', 'update Azure AppInsights')
    .command('blob', 'update Azure Blob storage')
    .command('cosmosdb', 'update Azure CosmosDB')
    .command('dispatch', 'update Dispatch model')
    .command('endpoint', 'update endpoint')
    .command('generic', 'update generic service configuration')
    .command('luis', 'update LUIS application')
    .command('qna', 'update QNA service');

const args: program.Command = program.parse(process.argv);

// args should be undefined is subcommand is executed
if (args) {
    const a: string[] = process.argv.slice(2);
    console.error(chalk.default.redBright(`Unknown arguments: ${a.join(' ')}`));
    showErrorHelp();
}

function showErrorHelp(): void {
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
}
