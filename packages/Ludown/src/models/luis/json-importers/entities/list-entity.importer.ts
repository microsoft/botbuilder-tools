import { IListEntity } from '../../../../interfaces/luis/entities/IListEntity';
import { entityImporter } from './sub-importers/base-entity-importer';
import { listImporter } from './sub-importers/list-importer';

/**
 * @description
 * Creates list entity objects from a LUIS JSON file.
 *
 * @param state The LUIS JSON object.
 */
export const listEntityImporter: (state) => IListEntity[] = (state) => {
    return state.closedLists.map(c => ({ ...entityImporter(state), ...listImporter(state) }));
};
