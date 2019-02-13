import { IValidatorFactory } from '../../interfaces/utils/validators/IValidatorFactory';
import { ERROR_CODE } from '../../models/error-codes';

/**
 * @description
 * Generates a factory function that validates whether the given command matches one
 * of the factory created list of allowable commands.
 *
 * @param allowableCommands The list of allowable commands to check the program command
 * state against.
 * @returns Promise of true on resolve and an IValidatorErrorObject on rejection.
 */
export const invalidCommandValidatorFactory: IValidatorFactory = (allowableCommands: string[]) => {
    return {
        execute: (command: string) => {
            return new Promise((resolve, reject) => allowableCommands.includes(command) ?
                resolve(true) :
                reject({
                    code: ERROR_CODE.UNKNOWN_COMMAND,
                    data: command,
                    message: `The specified command ("${command}") is invalid.`
                })
            );
        }
    };
};
