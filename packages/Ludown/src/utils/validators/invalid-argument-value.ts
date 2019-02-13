import { IValidatorFactory } from '../../interfaces/utils/validators/IValidatorFactory';
import { IValidatorInputDto } from '../../interfaces/utils/validators/IValidatorInputDto';
import { ERROR_CODE } from '../../models/error-codes';

/**
 * @description
 * Generates a factory function that validates whether the given value matches one
 * of the factory created list of allowable values.
 *
 * @param allowableValues The list of allowable values to check the given state
 * value against.
 * @returns Promise of true on resolve and an IValidatorErrorObject on rejection.
 */
export const invalidArgumentValueValidatorFactory: IValidatorFactory = (allowableValues: string[]) => {
    return {
        execute: (state: IValidatorInputDto) => {
            return new Promise((resolve, reject) => {
                if (!state) {
                    reject({
                        code: ERROR_CODE.INVALID_ARGUMENT_VALUE,
                        data: state,
                        message: 'Undefined value provided'
                    });
                }
                else if (!allowableValues.includes(state.value)) {
                    reject({
                        code: ERROR_CODE.INVALID_ARGUMENT_VALUE,
                        data: state,
                        message: `Invalid value ("${state.value}") provided for option ("${state.name}")`
                    });
                }
                else {
                    resolve(true);
                }
            });
        }
    };
};
