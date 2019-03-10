import { IQnaAlterationsDocument } from 'src/interfaces/qna/alterations/IQnaAlterationsDocument';
import { alterationImporter } from './alteration-importer';

/**
 * @description
 * Creates an alterations document from a QnA alterations JSON object.
 *
 * @param state The QnA alterations document JSON object.
 */
export const alterationsDocumentImporter: (state) => IQnaAlterationsDocument = state => {
	return { wordAlterations: state.wordAlterations.map(alteration => alterationImporter(alteration)) };
};
