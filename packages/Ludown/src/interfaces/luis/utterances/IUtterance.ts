import { IEntity } from '../entities/IEntity';
import { IUtteranceLabel } from './IUtteranceLabel';

/**
 * @description
 * Represents a LUIS utterance.
 */
export interface IUtterance {
	text: string;

	intent: string;

	entities: IUtteranceLabel[];
}
