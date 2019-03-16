import { IParent } from '../../../../../interfaces/luis/entities/composers/IParent';

/**
 * @description
 * Creates a parent entity object from a LUIS JSON file.
 *
 * @param state The parent entity JSON object.
 */
export const parentImporter: (state) => IParent = state => {
	return { children: state.children };
};
