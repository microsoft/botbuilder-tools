import { IEntity } from '../../../../../interfaces/luis/entities/IEntity';
import { roleImporter } from './role-importer';

/**
 * @description
 * Creates an entity object from a LUIS JSON file.
 *
 * @param state The entity JSON object.
 */
export const entityImporter: (state) => IEntity = state => {
	return {
		name: state.name,
		roles: state.roles.map(roleImporter)
	};
};
