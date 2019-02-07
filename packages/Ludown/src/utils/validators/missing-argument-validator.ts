import { intersection } from 'lodash';
import { IValidatorFactory } from '../../interfaces/utils/validators/IValidatorFactory';
import { ERROR_CODE } from '../../models/error-codes';

/**
 * @description
 * An argument bag is an array of strings denoting arguments to be
 * passed to the command, where at least one argument of this array
 * can be present to validate. For example: ['in_file', 'in_folder']
 * denotes an argument array where either the 'in_file' or the 'in_folder'
 * arguments if present, would be sufficient. However if none of them were,
 * then validation on the argument bag will fail.
 */
export type ArgumentBag = string[];

/**
 * @description
 * A factory method that creates a validator that searches for an argument bag
 * that does not exist. This function is based on the fact that if you fail to
 * find a fallacy, then the premises is true. If you can't find any argument
 * bags that don't exist, then the arguments are valid.
 *
 * @param factoryState An array of argument bags for validation
 * @returns Promise of true on resolve and an IValidatorErrorObject on rejection.
 */
export const missingArgumentValidatorFactory: IValidatorFactory = (factoryState: ArgumentBag[]) => {
    const doesArgBagExist = (argBag: ArgumentBag, haystack: Object) => intersection(Object.keys(haystack), argBag).length !== 0;

    return {
        execute: (programState: Object) => {
            const missingArgBag = factoryState.find(bag => !doesArgBagExist(bag, programState));

            return new Promise((resolve, reject) => !missingArgBag ?
                resolve(true) :
                reject({ code: ERROR_CODE.MISSING_ARGUMENTS, data: missingArgBag })
            );
        }
    };
};
