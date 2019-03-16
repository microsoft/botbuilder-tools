import * as readline from 'readline';
import { IInputFile } from '../../interfaces/helpers/IInputFile';
import { IInputReader } from '../../interfaces/helpers/IInputReaderFactory';

/**
 * @description
 * Represents a factory that reads input from the stdin stream.
 */
export const stdinReader: IInputReader = {
	read: async (_: string) => {
		const reader = readline.createInterface({
			input: process.stdin,
			crlfDelay: Infinity,
			terminal: false
		});

		let buffer = '';
		reader.on('line', line => (buffer += `${line}\n`));

		const file: IInputFile = {
			name: 'stdin',
			content: buffer
		};

		return [file];
	}
};
