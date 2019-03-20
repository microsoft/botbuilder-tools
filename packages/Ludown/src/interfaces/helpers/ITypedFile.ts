import { FILE_TYPE } from '../../models/file-types';
import { IInputFile } from './IInputFile';

/**
 * @description
 * Represents a file read of input with the its type information
 * known and appended.
 */
export interface ITypedFile extends IInputFile {
	fileType?: FILE_TYPE;
}
