import * as fs from 'fs';
import * as path from 'path';
import { IInputFile } from '../../interfaces/helpers/IInputFile';
import { IInputReaderFactory } from '../../interfaces/helpers/IInputReaderFactory';
import { invalidPathValidatorFactory } from '../../utils/validators/invalid-path-validator';

/**
 * @description
 * Represents a factory that validates the given path and reads the
 * content of the file.
 */
export const fileReaderFactory: IInputReaderFactory<void> = () => {
	return {
		read: async (filePath: string) => {
			await invalidPathValidatorFactory({ isDirectory: false }).execute(filePath);

			const resolvedPath = path.resolve(filePath);

			const file: IInputFile = {
				name: path.basename(resolvedPath),
				content: fs.readFileSync(resolvedPath, { encoding: 'utf-8' })
			};

			return [file];
		}
	};
};
