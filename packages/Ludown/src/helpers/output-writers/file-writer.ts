import * as fs from 'fs';
import * as path from 'path';
import { IOutputWriterFactory } from '../../interfaces/helpers/IOutputWriterFactory';
import { invalidPathValidatorFactory } from '../../utils/validators/invalid-path-validator';

/**
 * @description
 * Represents a factory for creating a handler to write data to a file.
 *
 * @param filePath The path to write the file to.
 */
export const fileWriterFactory: IOutputWriterFactory = (dirPath: string, filePath: string) => {
	return {
		write: async (data: string) => {
			await invalidPathValidatorFactory({ isDirectory: true, accessLevel: 'write' }).execute(dirPath);

			const resolvedPath = path.resolve(dirPath, filePath);

			fs.writeFileSync(resolvedPath, data, { encoding: 'utf-8' });
		}
	};
};
