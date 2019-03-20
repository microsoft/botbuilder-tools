import * as fs from 'fs';
import * as path from 'path';
import { IPathValidatorOptions } from '../../interfaces/utils/validators/IPathValidatorOptions';
import { IValidatorFactory } from '../../interfaces/utils/validators/IValidatorFactory';
import { ERROR_CODE } from '../../models/error-codes';

/**
 * @description
 * Checks if the path given is existent and is valid based on whether the path
 * was to be that of a file or a directory.
 *
 * @param isDirectory A boolean to indicate whether the path is a file or a directory.
 * @returns Promise of true on resolve and an IValidatorErrorObject on rejection.
 */
export const invalidPathValidatorFactory: IValidatorFactory<IPathValidatorOptions> = (opts: IPathValidatorOptions) => {
	return {
		execute: async (inputPath: string): Promise<boolean> => {
			const resolvedPath = path.resolve(inputPath);

			return new Promise((resolve, reject) => {
				if (!fs.existsSync(resolvedPath)) {
					reject({
						code: ERROR_CODE.PATH_NOT_FOUND,
						data: resolvedPath,
						message: `The path ("${resolvedPath}") does not exist.`
					});
				}

				const pathInfo = fs.lstatSync(resolvedPath);

				if (opts.isDirectory && !pathInfo.isDirectory()) {
					reject({
						code: ERROR_CODE.NOT_A_DIRECTORY,
						data: resolvedPath,
						message: `The path ("${resolvedPath}") is not a directory.`
					});
				} else if (!opts.isDirectory && pathInfo.isDirectory()) {
					reject({
						code: ERROR_CODE.NOT_A_FILE,
						data: resolvedPath,
						message: `The path ("${resolvedPath}") is not a file.`
					});
				}

				try {
					fs.accessSync(resolvedPath, fs.constants.R_OK);
				} catch {
					reject({
						code: ERROR_CODE.NOT_A_FILE,
						data: resolvedPath,
						message: `The user has no read permissions on the path ("${resolvedPath}").`
					});
				}

				resolve(true);
			});
		}
	};
};
