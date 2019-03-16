import { IMarkdownWriter } from '../../../interfaces/helpers/IMarkdownWriter';
import { IQnaAlterationsDocument } from '../../../interfaces/qna/alterations/IQnaAlterationsDocument';
import { alterationsSectionRenderer } from './alterations-section/alterations-section-renderer';

/**
 * @description
 * Renders the QnA alterations base object to Lu file format.
 *
 * @param alterationDocument The QnA alterations base object.
 */
export const qnaAlterationsDocumentRenderer = (alterationDocument: IQnaAlterationsDocument, writer: IMarkdownWriter): string => {
	alterationsSectionRenderer(alterationDocument, writer);

	return writer.render();
};
