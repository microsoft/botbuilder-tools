import { Command, name } from 'commander';
import { execute } from '../command-handlers/ludown-refresh';
import { IValidatorErrorObject } from '../interfaces/utils/validators/IValidatorErrorObject';
import * as ludownRefreshRes from '../res/ludown-refresh.json';
import { commandExecuterFactory } from '../utils/command-factory';
import { printError } from '../utils/printers';
import { missingArgumentValidatorFactory } from '../utils/validators/missing-argument-validator';

/**
 * @description
 * Fires up the ludown refresh command.
 */
export const mainCommand = commandExecuterFactory(async (args: string[]) => {
	const refreshCommand = name('ludown refresh')
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
		.parse(args);

	try {
		await validateCommand(refreshCommand);
		await execute(refreshCommand);
	} catch (err) {
		printError((<IValidatorErrorObject>err).message);
		refreshCommand.help();
	}
});

mainCommand.execute();

/**
 * @description
 * Run all validations on the refresh command arguments.
 *
 * @param refreshCommand The object that contains the arguments to validate.
 * @returns A promise of the validation statuses.
 */
async function validateCommand(refreshCommand: Command): Promise<boolean[]> {
	const validations: Promise<boolean>[] = [];

	validations.push(missingArgumentValidatorFactory([['luis_file', 'qna_file', 'qna_alteration_file', 'stdin']]).execute(refreshCommand));

	return Promise.all(validations);
}
