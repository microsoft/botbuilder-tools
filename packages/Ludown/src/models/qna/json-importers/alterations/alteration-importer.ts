import { IQnaAlteration } from '../../../../interfaces/qna/alterations/IQnaAlteration';

/**
 * @description
 * Creates word alterations from a QnA alteration JSON object.
 *
 * @param state The QnA alteration JSON object.
 */
export const alterationImporter: (state) => IQnaAlteration = state => {
	return { alterations: state.alterations };
};
