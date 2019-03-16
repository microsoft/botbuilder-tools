import { IEntity } from './IEntity';

/**
 * @description
 * Represents a LUIS regex entity.
 */
export interface IRegexEntity extends IEntity {
	regex: string;
}
