import { name } from 'commander';
import { version } from '../../package.json';
import { preCommandInit } from '../helpers/pre-command-init.js';
import { extractArguments } from '../utils/argument-extractor';
import { printError } from '../utils/printers';
import { invalidCommandValidatorFactory } from '../utils/validators/invalid-command-validator';

/**
 * @description
 * Fires up the main ludown command.
 */
export const init = () => {
    const resolvedArguments = extractArguments(process.argv);
    const allowableCommands = ['parse', 'p', 'refresh', 'd', 'translate', 't'];

    // Run precommand initializers.
    preCommandInit();

    // Register the ludown sub commands and their aliases.
    const ludownCommand = name('ludown')
        .description('Ludown is a command line tool to bootstrap language understanding models from .lu files.')
        .version(version, '-v, --version');

    ludownCommand
        .command('parse', 'Convert .lu file(s) into LUIS JSON OR QnA Maker JSON files.')
        .alias('p');

    ludownCommand
        .command('refresh', 'Convert LUIS JSON and/ or QnAMaker JSON file into .lu file')
        .alias('d');

    ludownCommand
        .command('translate', 'Translate .lu files')
        .alias('t');

    // Fire the command parser to handle version and help options.
    ludownCommand.parse(process.argv);

    invalidCommandValidatorFactory(allowableCommands).execute(resolvedArguments.command)
        .catch(err => {
            printError(`The specified command ("${err.data}") is invalid.`);
            ludownCommand.help();
        });
};
