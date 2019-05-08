import { IUtterance } from '../../../../interfaces/luis/utterances/IUtterance';

/**
 * @description
 * Creates utterance objects from a LUIS JSON file.
 *
 * @param state The LUIS JSON object.
 */
export const utteranceImporter: (state) => IUtterance[] = state => {
	return state.utterances.map(u => ({
		text: u.text,
		intent: u.intent,
		entities: u.entities.map(entity => ({
			name: entity.entity,
			startPosition: entity.startPos,
			endPosition: entity.endPos
		}))
	}));
};
