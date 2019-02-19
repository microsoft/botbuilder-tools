import { IEntity } from '../../../../interfaces/luis/entities/IEntity';
import { entityImporter } from './sub-importers/base-entity-importer';

/**
 * @description
 * Creates prebuilt entity objects from a LUIS JSON file.
 *
 * @param state The LUIS JSON object.
 */
export const prebuiltEntityImporter: (state) => IEntity[] = (state) => {
    return state.prebuiltEntities.map(entityImporter);
};
