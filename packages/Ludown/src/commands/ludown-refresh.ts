import { Command, name } from 'commander';
import * as ludownRefreshRes from '../res/ludown-refresh.json';
import { commandExecuterFactory } from '../utils/command-factory';
import { printError } from '../utils/printers.js';
import { invalidPathValidator } from '../utils/validators/invalid-path-validator.js';
import { missingArgumentValidatorFactory } from '../utils/validators/missing-argument-validator.js';

/**
 * @description
 * Fires up the ludown refresh command.
 */
const mainCommand = commandExecuterFactory(() => {
    const refreshCommand = name('ludown translate')
        .description(ludownRefreshRes.description)
        .usage(ludownRefreshRes.usage);

    refreshCommand
        .option('-i, --luis_file <LUIS_JSON_File>', ludownRefreshRes.options.luis_file)
        .option('-q, --qna_file <QNA_FILE>', ludownRefreshRes.options.qna_file)
        .option('-a, --qna_alteration_file <QNA_ALT_FILE>', ludownRefreshRes.options.qna_alteration_file)
        .option('-o, --out_folder <outputFolder> [optional]', ludownRefreshRes.options.out_folder)
        .option('-n, --lu_file <LU_File>', ludownRefreshRes.options.lu_file)
        .option('--verbose', ludownRefreshRes.options.verbose)
        .option('-s, --skip_header', ludownRefreshRes.options.skip_header)
        .option('--stdin', ludownRefreshRes.options.stdin)
        .option('--stdout', ludownRefreshRes.options.stdout)
        .parse(process.argv);

    validateCommand(refreshCommand)
        .then(() => { /** Fire handler here */ })
        .catch(err => {
            printError(err.message);
            refreshCommand.help();
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
function validateCommand(refreshCommand: Command): Promise<boolean[]> {
    const validations: Promise<boolean>[] = [];
    const invalidPathFactory = invalidPathValidator(false);

    validations.push(missingArgumentValidatorFactory([['luis_file', 'qna_file', 'qna_alteration_file', 'stdin']]).execute(refreshCommand));

    ['luis_file', 'qna_file', 'qna_alteration_file'].forEach(key => {
        if (refreshCommand[key]) {
            validations.push(invalidPathFactory.execute(refreshCommand[key]));
        }
    });

    return Promise.all(validations);
}
