import { IEntity } from '../../../../interfaces/luis/entities/IEntity';
import { entityImporter } from './sub-importers/base-entity-importer';

/**
 * @description
 * Creates pattern entity objects from a LUIS JSON file.
 *
 * @param state The LUIS JSON object.
 */
export const patternEntityImporter: (state) => IEntity[] = state => {
	return state.patternAnyEntities.map(entityImporter);
};
