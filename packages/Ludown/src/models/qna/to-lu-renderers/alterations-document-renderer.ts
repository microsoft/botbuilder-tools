import { markdownWriterFactory } from '../../../helpers/markdown-writer';
import { IQnaAlterationsDocument } from '../../../interfaces/qna/alterations/IQnaAlterationsDocument';
import { alterationsSectionRenderer } from './alterations-section/alterations-section-renderer';

/**
 * @description
 * Renders the QnA alterations base object to Lu file format.
 *
 * @param alterationDocument The QnA alterations base object.
 */
export const alterationsDocumentRenderer = (alterationDocument: IQnaAlterationsDocument): string => {
	const writer = markdownWriterFactory();

	alterationsSectionRenderer(alterationDocument, writer);

	return writer.render();
};
