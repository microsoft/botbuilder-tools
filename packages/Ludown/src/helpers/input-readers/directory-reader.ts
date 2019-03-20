import * as fs from 'fs';
import * as path from 'path';
import { IDirectoryReaderOptions } from '../../interfaces/helpers/IDirectoryReaderOptions';
import { IInputReaderFactory } from '../../interfaces/helpers/IInputReaderFactory';
import { invalidPathValidatorFactory } from '../../utils/validators/invalid-path-validator';

/**
 * @description
 * Represents a factory that validates the given path and reads the
 * content of the file.
 */
export const directoryReader: IInputReaderFactory<IDirectoryReaderOptions> = (options: IDirectoryReaderOptions) => {
	return {
		read: async (directoryPath: string) => {
			await invalidPathValidatorFactory(true).execute(directoryPath);

			const resolvedPath = path.resolve(directoryPath);

			const filePaths = getFilePathsInDirectory(resolvedPath, options);

			return filePaths.map(filePath => ({
				name: path.basename(filePath),
				content: fs.readFileSync(filePath, { encoding: 'utf-8' })
			}));
		}
	};
};

/**
 * @description
 * Gets all the files in the given directory that match the given
 * extension. If the recursive flag is true, sub directories are
 * searched as well.
 *
 * @param directoryPath The path of the directory to start search.
 * @param options The search options.
 * @returns An array of strings, where each string is a file path.
 */
function getFilePathsInDirectory(directoryPath: string, options: IDirectoryReaderOptions): string[] {
	let results = [];

	fs.readdirSync(directoryPath).forEach(filePath => {
		const resolvedPath = path.resolve(directoryPath, filePath);
		const fileStats = fs.statSync(resolvedPath);

		if (options.recursive && fileStats.isDirectory()) {
			results = results.concat(getFilePathsInDirectory(resolvedPath, options));
		}

		if (fileStats.isFile() && path.extname(resolvedPath) === options.extension) {
			results.push(resolvedPath);
		}
	});

	return results;
}
