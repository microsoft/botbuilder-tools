import { IIntent } from '../../../../interfaces/luis/intents/IIntent';

/**
 * @description
 * Creates intent objects from a LUIS JSON file.
 *
 * @param state The LUIS JSON object.
 */
export const intentImporter: (state) => IIntent[] = state => {
	return state.intents.map(i => ({ name: i.name }));
};
