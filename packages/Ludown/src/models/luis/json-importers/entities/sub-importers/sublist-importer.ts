import { ISublist } from '../../../../../interfaces/luis/entities/composers/ISublist';

/**
 * @description
 * Creates a sublist object from a LUIS JSON file.
 *
 * @param state The sublist JSON object.
 */
export const sublistImporter: (state) => ISublist = (state) => {
    return {
        canonicalForm: state.canonicalForm,
        list: state.list
    };
};
