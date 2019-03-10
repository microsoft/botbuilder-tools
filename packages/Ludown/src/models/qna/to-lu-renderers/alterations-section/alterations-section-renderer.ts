import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { IQnaAlterationsDocument } from 'src/interfaces/qna/alterations/IQnaAlterationsDocument';
import { alterationRenderer } from './alteration-renderer';

/**
 * @description
 * Renders the QnA alterations document section to Lu file format.
 *
 * @param alterationsDocument The QnA alteratiosn document object.
 * @param writer The writer used to write the Lu file.
 */
export const alterationsSectionRenderer = (alterationsDocument: IQnaAlterationsDocument, writer: IMarkdownWriter) => {
	if (!alterationsDocument.wordAlterations || alterationsDocument.wordAlterations.length === 0) {
		return;
	}

	writer.addComment('# QnA Alterations');
	writer.addNewLine();

	alterationsDocument.wordAlterations.forEach(alteration => alterationRenderer(alteration, writer));
};
