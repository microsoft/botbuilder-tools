import { IInputFile } from './IInputFile';

/**
 * @description
 * Represents an interface for any data reader
 */
export interface IInputReader {
	read(path?: string): Promise<IInputFile[]>;
}

/**
 * @description
 * Represents a factory that creates input readers
 */
export type IInputReaderFactory = (factoryState?) => IInputReader;
