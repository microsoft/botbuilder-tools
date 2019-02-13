import { existsSync, lstatSync } from 'fs';
import * as path from 'path';
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
            const resolvedPath = path.resolve(inputPath);

            return new Promise((resolve, reject) => {
                if (!existsSync(resolvedPath)) {
                    reject({
                        code: ERROR_CODE.PATH_NOT_FOUND,
                        data: resolvedPath,
                        message: `The path ("${resolvedPath}") does not exist.`
                    });
                }

                const pathInfo = lstatSync(resolvedPath);

                if (isDirectory && !pathInfo.isDirectory()) {
                    reject({
                        code: ERROR_CODE.NOT_A_DIRECTORY,
                        data: resolvedPath,
                        message: `The path ("${resolvedPath}") is not a directory.`
                    });
                }
                else if (!isDirectory && pathInfo.isDirectory()) {
                    reject({
                        code: ERROR_CODE.NOT_A_FILE,
                        data: resolvedPath,
                        message: `The path ("${resolvedPath}") is not a file.`
                    });
                }
                else {
                    resolve(true);
                }
            });
        }
    };
};
