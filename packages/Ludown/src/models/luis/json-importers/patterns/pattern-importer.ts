import { IPattern } from '../../../../interfaces/luis/patterns/IPattern';

/**
 * @description
 * Creates pattern objects from a LUIS JSON file.
 *
 * @param state The LUIS JSON object.
 */
export const patternImporter: (state) => IPattern[] = state => {
	return state.patterns.map(p => ({
		pattern: p.pattern,
		intent: p.intent
	}));
};
