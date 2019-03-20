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

					return;
				}

				const pathInfo = fs.lstatSync(resolvedPath);

				if (opts.isDirectory && !pathInfo.isDirectory()) {
					reject({
						code: ERROR_CODE.NOT_A_DIRECTORY,
						data: resolvedPath,
						message: `The path ("${resolvedPath}") is not a directory.`
					});

					return;
				} else if (!opts.isDirectory && pathInfo.isDirectory()) {
					reject({
						code: ERROR_CODE.NOT_A_FILE,
						data: resolvedPath,
						message: `The path ("${resolvedPath}") is not a file.`
					});

					return;
				}

				const accessLevel = opts.accessLevel || 'read';
				let accessConstant: number;

				switch (accessLevel) {
					case 'read':
						accessConstant = fs.constants.R_OK;
						break;
					case 'write':
						accessConstant = fs.constants.W_OK;
						break;
					case 'read-write':
						accessConstant = fs.constants.F_OK;
						break;
					default:
						accessConstant = fs.constants.R_OK;
				}

				try {
					fs.accessSync(resolvedPath, accessConstant);
				} catch {
					reject({
						code: ERROR_CODE.INVALID_FS_PERMISSIONS,
						data: resolvedPath,
						message: `The user has no ${opts.accessLevel} permissions on the path ("${resolvedPath}").`
					});

					return;
				}

				resolve(true);
			});
		}
	};
};
