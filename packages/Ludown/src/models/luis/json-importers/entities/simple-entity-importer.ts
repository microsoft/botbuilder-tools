import { IEntity } from '../../../../interfaces/luis/entities/IEntity';
import { entityImporter } from './sub-importers/base-entity-importer';

/**
 * @description
 * Creates simple entity objects from a LUIS JSON file.
 *
 * @param state The LUIS JSON object.
 */
export const simpleEntityImporter: (state) => IEntity[] = state => {
	return state.entities.filter(e => e.children === undefined).map(entityImporter);
};
