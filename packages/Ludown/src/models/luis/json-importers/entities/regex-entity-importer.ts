import { IRegexEntity } from '../../../../interfaces/luis/entities/IRegexEntity';
import { entityImporter } from './sub-importers/base-entity-importer';

/**
 * @description
 * Creates regex entity objects from a LUIS JSON file.
 *
 * @param state The LUIS JSON object.
 */
export const regexEntityImporter: (state) => IRegexEntity[] = state => {
    return state.regex_entities.map(r => ({ ...entityImporter(r), regex: r.regexPattern }));
};
