import { missingArgumentValidatorFactory } from '../../../src/utils/validators/missing-argument-validator';

describe('Missing argument validator', () => {
	it('should resolve with true when passed arguments exist.', async () => {
		const value = await missingArgumentValidatorFactory([['arg1']]).execute({ arg1: 'Exists' });

		expect(value).toBeTruthy();
	});

	it('should resolve with true when at least one of the passed arguments exists.', async () => {
		const value = await missingArgumentValidatorFactory([['arg1', 'arg2']]).execute({ arg1: 'Exists' });

		expect(value).toBeTruthy();
	});

	it('should resolve with true when at least one of the passed arguments exists.', async () => {
		const value = await missingArgumentValidatorFactory([['arg1', 'arg2']]).execute({ arg1: 'Exists' });

		expect(value).toBeTruthy();
	});

	it('should resolve when state and args are empty.', async () => {
		const value = await missingArgumentValidatorFactory([]).execute({ arg1: 'Exists' });

		expect(value).toBeTruthy();
	});

	it('should reject with the missing args bag when none of its arguments exist and output correct error message.', async () => {
		try {
			await missingArgumentValidatorFactory([['arg1'], ['arg3', 'arg4']]).execute({ arg3: 'Exists' });
		} catch (err) {
			expect(err).toEqual({
				code: 0,
				data: ['arg1'],
				message: 'The option ("arg1") is required.'
			});
		}
	});

	it('should reject with the missing args bag when none of its arguments exist and output correct error message.', async () => {
		try {
			await missingArgumentValidatorFactory([['arg1', 'arg2'], ['arg3', 'arg4']]).execute({ arg3: 'Exists' });
		} catch (err) {
			expect(err).toEqual({
				code: 0,
				data: ['arg1', 'arg2'],
				message: 'At least one of the options ["arg1","arg2"] is required.'
			});
		}
	});
});
