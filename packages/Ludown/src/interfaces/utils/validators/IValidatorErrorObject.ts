import { ERROR_CODE } from '../../../models/error-codes';

export interface IValidatorErrorObject {
    code: ERROR_CODE;
    data: any;
}
