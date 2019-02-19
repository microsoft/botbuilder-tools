import { IList } from '../../../../../interfaces/luis/entities/composers/IList';
import { sublistImporter } from './sublist-importer';

/**
 * @description
 * Creates a list entity object from a LUIS JSON file.
 *
 * @param state The list entity JSON object.
 */
export const listImporter: (state) => IList = (state) => {
    return { subLists: state.subLists.map(sublistImporter) };
};
