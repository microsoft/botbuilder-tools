import { ERROR_CODE } from '../../../models/error-codes';

/**
 * @description
 * Represents the error object that validators output when their validation
 * function fails.
 */
export interface IValidatorErrorObject {
    code: ERROR_CODE;
    data: Object;
    message: string;
}
