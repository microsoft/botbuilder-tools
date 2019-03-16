import { ERROR_CODE } from '../../../src/models/error-codes';
import { invalidArgumentValueValidatorFactory } from '../../../src/utils/validators/invalid-argument-value';

describe('Invalid argument value', () => {
	it('should resolve successfully when value given is included in list of allowable values.', async done => {
		const result = await invalidArgumentValueValidatorFactory(['1', '2', '3']).execute({ name: 'option1', value: '1' });

		expect(result).toBeTruthy();
		done();
	});

	it('should reject with an error when the value given is not included in the list of allowable values.', async done => {
		try {
			await invalidArgumentValueValidatorFactory(['1', '2', '3']).execute({ name: 'option1', value: '4' });
		} catch (err) {
			expect(err).toEqual({
				code: ERROR_CODE.INVALID_ARGUMENT_VALUE,
				data: { name: 'option1', value: '4' },
				message: 'Invalid value ("4") provided for option ("option1")'
			});
			done();
		}
	});

	it('should reject with an error when the allowable values array is empty.', async done => {
		try {
			await invalidArgumentValueValidatorFactory([]).execute({ name: 'option1', value: '1' });
		} catch (err) {
			expect(err).toEqual({
				code: ERROR_CODE.INVALID_ARGUMENT_VALUE,
				data: { name: 'option1', value: '1' },
				message: 'Invalid value ("1") provided for option ("option1")'
			});
			done();
		}
	});

	it('should reject with an error when the value to check is undefined.', async done => {
		try {
			await invalidArgumentValueValidatorFactory(['1', '2', '3']).execute(undefined);
		} catch (err) {
			expect(err).toEqual({
				code: ERROR_CODE.INVALID_ARGUMENT_VALUE,
				data: undefined,
				message: 'Undefined value provided'
			});
			done();
		}
	});
});
