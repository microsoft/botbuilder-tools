import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { IQnaKnowledgeBase } from '../../../../interfaces/qna/knowledge-bases/IKnowledgeBase';
import { itemRenderer } from './item-renderer';

/**
 * @description
 * Renders the QnA knowledge base object items section to Lu file format.
 *
 * @param knowledgeBase The QnA knowledge base object.
 * @param writer The writer used to write the Lu file.
 */
export const itemsSectionRenderer = (knowledgeBase: IQnaKnowledgeBase, writer: IMarkdownWriter) => {
	if (!knowledgeBase.items || knowledgeBase.items.length === 0) {
		return;
	}

	writer.addComment('# QnA pairs');
	writer.addNewLine();

	knowledgeBase.items.forEach(item => itemRenderer(item, writer));
};
