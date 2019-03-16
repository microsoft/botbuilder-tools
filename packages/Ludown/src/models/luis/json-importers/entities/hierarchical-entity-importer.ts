import { IHierarchicalEntity } from '../../../../interfaces/luis/entities/IHierarchicalEntity';
import { entityImporter } from './sub-importers/base-entity-importer';
import { parentImporter } from './sub-importers/parent-importer';

/**
 * @description
 * Creates hierarchical entity objects from a LUIS JSON file.
 *
 * @param state The LUIS JSON object.
 */
export const hierarchicalEntityImporter: (state) => IHierarchicalEntity[] = state => {
	return state.entities.filter(e => e.children !== undefined).map(e => ({ ...entityImporter(e), ...parentImporter(e) }));
};
