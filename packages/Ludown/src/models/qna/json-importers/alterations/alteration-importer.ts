import { IQnaAlteration } from 'src/interfaces/qna/alterations/IQnaAlteration';

/**
 * @description
 * Creates word alterations from a QnA alteration JSON object.
 *
 * @param state The QnA alteration JSON object.
 */
export const alterationImporter: (state) => IQnaAlteration[] = state => {
	return state.wordAlterations.map(wordAlteration => ({ alterations: wordAlteration.alterations }));
};
