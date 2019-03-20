import { IOutputWriterFactory } from '../../interfaces/helpers/IOutputWriterFactory';
import { ITypedFile } from '../../interfaces/helpers/ITypedFile';

/**
 * @description
 * Represents a factory for creating a handler to write data to stdout.
 */
export const stdoutWriterFactory: IOutputWriterFactory = () => {
	return {
		write: async (data: ITypedFile) => {
			process.stdout.write(data.content, 'utf-8');
		}
	};
};
