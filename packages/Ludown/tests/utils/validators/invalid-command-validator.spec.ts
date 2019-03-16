import { ERROR_CODE } from '../../../src/models/error-codes';
import { invalidCommandValidatorFactory } from '../../../src/utils/validators/invalid-command-validator';

describe('Invalid command validator', () => {
	it('should resolve when given command is allowed.', async () => {
		const value = await invalidCommandValidatorFactory(['command1', 'command2', 'command3']).execute('command2');

		expect(value).toBeTruthy();
	});

	it('should reject when given command is not in the allowed list.', async () => {
		try {
			await invalidCommandValidatorFactory(['command1', 'command2', 'command3']).execute('command4');
		} catch (err) {
			expect(err).toEqual({
				code: ERROR_CODE.UNKNOWN_COMMAND,
				data: 'command4',
				message: 'The specified command ("command4") is invalid.'
			});
		}
	});
});
