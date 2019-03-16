/**
 * @description
 * Represents an entity label in a LUIS utterance.
 */
export interface IUtteranceLabel {
	name: string;

	startPosition: number;

	endPosition: number;
}
