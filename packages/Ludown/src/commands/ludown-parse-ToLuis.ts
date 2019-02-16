import { Command, name } from 'commander';
import * as ludownParseRes from '../res/ludown-parse-toluis.json';
import * as luisLocales from '../res/luis-locales.json';
import { commandExecuterFactory } from '../utils/command-factory';
import { printError } from '../utils/printers.js';
import { invalidArgumentValueValidatorFactory } from '../utils/validators/invalid-argument-value.js';
import { invalidPathValidator } from '../utils/validators/invalid-path-validator.js';
import { missingArgumentValidatorFactory } from '../utils/validators/missing-argument-validator.js';

/**
 * @description
 * Fires up the ludown parse toluis command.
 */
const mainCommand = commandExecuterFactory(() => {
    const parseCommand = name('ludown translate')
        .description(ludownParseRes.description)
        .usage(ludownParseRes.usage);

    parseCommand
        .option('--in <luFile>', ludownParseRes.options.in)
        .option('-l, --lu_folder <inputFolder>', ludownParseRes.options.lu_folder)
        .option('-o, --out_folder <outputFolder>', ludownParseRes.options.out_folder)
        .option('-s, --subfolder', ludownParseRes.options.subfolder)
        .option('-n, --luis_name <luis_appName>', ludownParseRes.options.luis_name)
        .option('-d, --luis_desc <luis_appDesc>', ludownParseRes.options.luis_desc)
        .option('-i, --luis_versionId <luis_versionId>', ludownParseRes.options.luis_versionId, '0.1')
        .option('-c, --luis_culture <luis_appCulture>', ludownParseRes.options.luis_culture, 'en-us')
        .option('-t, --write_luis_batch_tests', ludownParseRes.options.write_luis_batch_tests)
        .option('--out <OutFileName>', ludownParseRes.options.out)
        .option('--verbose', ludownParseRes.options.verbose)
        .parse(process.argv);

    validateCommand(parseCommand)
        .then(() => { /** Fire handler here */ })
        .catch(err => {
            printError(err.message);
            parseCommand.help();
        });
});

mainCommand.execute();

/**
 * @description
 * Run all validations on the refresh command arguments.
 *
 * @param translateCommand The object that contains the arguments to validate.
 * @returns A promise of the validation statuses.
 */
function validateCommand(parseCommand: Command): Promise<boolean[]> {
    const validations: Promise<boolean>[] = [];

    validations.push(missingArgumentValidatorFactory([['in', 'lu_folder']]).execute(parseCommand));

    if (parseCommand.in) {
        validations.push(invalidPathValidator(false).execute(parseCommand.in));
    }

    if (parseCommand.lu_folder) {
        validations.push(invalidPathValidator(true).execute(parseCommand.lu_folder));
    }

    if (parseCommand.luis_culture) {
        validations.push(invalidArgumentValueValidatorFactory(luisLocales).execute({
            name: 'luis_culture',
            value: parseCommand.luis_culture
        }));
    }

    return Promise.all(validations);
}
