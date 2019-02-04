import { IValidatorFactory } from '../../interfaces/utils/validators/IValidatorFactory';
import { intersection } from 'lodash';
import { ERROR_CODE } from '../../models/error-codes';

/**
 * @description
 * An argument bag is one where
 */
export type ArgumentBag = string[];

/**
 * @description
 * A factory method that creates a validator that searches for an argument bag
 * that does not exist. This function is based on the fact that if you fail to
 * find a fallacy, then the premises is true. If you can't find any argument
 * bags that don't exist, then the arguments are valid.
 *
 * @param factoryState
 */
export const missingArgumentValidatorFactory: IValidatorFactory = (factoryState: ArgumentBag[]) => {
    const doesArgBagExist = (argBag: ArgumentBag, haystack: Object) => intersection(Object.keys(haystack), argBag).length !== 0;

    return {
        execute: (programState: Object) => {
            const missingArgBag = factoryState.find(bag => !doesArgBagExist(bag, programState));

            return !missingArgBag ? Promise.resolve(true) : Promise.reject({ code: ERROR_CODE.MISSING_ARGUMENTS, data: missingArgBag });
        }
    }
}
