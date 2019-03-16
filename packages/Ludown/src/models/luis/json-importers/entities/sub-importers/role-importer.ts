import { IRole } from '../../../../../interfaces/luis/entities/composers/IRole';

/**
 * @description
 * Creates a role object from a LUIS JSON file.
 *
 * @param state The role JSON object.
 */
export const roleImporter: (state) => IRole = state => state;
