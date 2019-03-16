import * as readline from 'readline';
import { IInputReaderFactory } from '../../interfaces/helpers/IInputReaderFactory';

/**
 * @description
 * Represents a factory that reads input from the stdin stream.
 */
export const stdinReader: IInputReaderFactory = () => {
	return {
		read: async (_: string) => {
			const reader = readline.createInterface({
				input: process.stdin,
				crlfDelay: Infinity,
				terminal: false
			});

			return new Promise(resolve => {
				let buffer = '';

				reader.on('line', line => (buffer += `${line}\n`));
				reader.on('close', () => resolve([{ name: 'stdin', content: buffer }]));
			});
		}
	};
};
