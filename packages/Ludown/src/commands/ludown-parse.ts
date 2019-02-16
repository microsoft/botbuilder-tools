import { name } from 'commander';
import * as ludownParseRes from '../res/ludown-parse.json';
import { extractArguments } from '../utils/argument-extractor';
import { commandExecuterFactory } from '../utils/command-factory.js';
import { printError } from '../utils/printers';
import { invalidCommandValidatorFactory } from '../utils/validators/invalid-command-validator';

/**
 * @description
 * Fires up the main ludown parse command.
 */
export const init = () => {
    const mainCommand = commandExecuterFactory(() => {
        const resolvedArguments = extractArguments(process.argv);
        const allowableCommands = ['toluis', 'toqna'];

        // Register the ludown parse sub commands and their aliases.
        const parseCommand = name('ludown parse')
            .description(ludownParseRes.description);

        parseCommand
            .command('ToLuis', ludownParseRes.commands.toluis)
            .alias('toluis');

        parseCommand
            .command('ToQna', ludownParseRes.commands.toqna)
            .alias('toqna');

        // Fire the command parser to handle version and help options.
        parseCommand.parse(process.argv);

        // Validate the given sub commands.
        invalidCommandValidatorFactory(allowableCommands).execute(resolvedArguments.command)
            .catch(err => {
                printError(err.message);
                parseCommand.help();
            });
    });

    mainCommand.execute();
};
