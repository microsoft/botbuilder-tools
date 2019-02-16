import { Command, name } from 'commander';
import * as ludownParseRes from '../res/ludown-parse-toqna.json';
import { commandExecuterFactory } from '../utils/command-factory';
import { printError } from '../utils/printers.js';
import { invalidPathValidator } from '../utils/validators/invalid-path-validator.js';
import { missingArgumentValidatorFactory } from '../utils/validators/missing-argument-validator.js';

/**
 * @description
 * Fires up the ludown parse toqna command.
 */
const mainCommand = commandExecuterFactory(() => {
    const parseCommand = name('ludown parse ToQna')
        .description(ludownParseRes.description)
        .usage(ludownParseRes.usage);

    parseCommand
        .option('--in <luFile>', ludownParseRes.options.in)
        .option('-l, --lu_folder <inputFolder>', ludownParseRes.options.lu_folder)
        .option('-o, --out_folder <outputFolder>', ludownParseRes.options.out_folder)
        .option('-s, --subfolder', ludownParseRes.options.subfolder)
        .option('-n, --qna_name <QnA_KB_Name>', ludownParseRes.options.qna_name)
        .option('-a, --write_qna_alterations', ludownParseRes.options.write_qna_alterations)
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
 * @param parseCommand The object that contains the arguments to validate.
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

    return Promise.all(validations);
}
