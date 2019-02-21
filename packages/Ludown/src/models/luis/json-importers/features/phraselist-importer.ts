import { IPhraseList } from '../../../../interfaces/luis/features/IPhraseList';

/**
 * @description
 * Creates phrase list objects from a LUIS JSON file.
 *
 * @param state The LUIS JSON object.
 */
export const phraseListImporter: (state) => IPhraseList[] = state => {
    return state.model_features.map(f => ({ name: f.name, values: f.words, interchangeable: f.mode }));
};
