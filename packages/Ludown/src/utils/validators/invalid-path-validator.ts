import { existsSync, lstatSync } from 'fs';
import { IValidatorFactory } from '../../interfaces/utils/validators/IValidatorFactory';
import { ERROR_CODE } from '../../models/error-codes';

/**
 * @description
 * Checks if the path given is existent and is valid based on whether the path
 * was to be that of a file or a directory.
 *
 * @param isDirectory A boolean to indicate whether the path is a file or a directory.
 */
export const invalidPathValidator: IValidatorFactory = (isDirectory: boolean) => {
    return {
        execute: (inputPath: string) => {
            return new Promise((resolve, reject) => {
                if (!existsSync(inputPath)) {
                    reject({ code: ERROR_CODE.PATH_NOT_FOUND, data: inputPath });
                }

                const pathInfo = lstatSync(inputPath);

                if (isDirectory && !pathInfo.isDirectory()) {
                    reject({ code: ERROR_CODE.NOT_A_DIRECTORY, data: inputPath });
                }
                else if (!isDirectory && pathInfo.isDirectory()) {
                    reject({ code: ERROR_CODE.NOT_A_FILE, data: inputPath });
                }
                else {
                    resolve(true);
                }
            });
        }
    };
};
