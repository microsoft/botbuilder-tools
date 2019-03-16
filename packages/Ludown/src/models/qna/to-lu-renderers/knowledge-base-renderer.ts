import { IMarkdownWriter } from '../../../interfaces/helpers/IMarkdownWriter';
import { IQnaKnowledgeBase } from '../../../interfaces/qna/knowledge-bases/IKnowledgeBase';
import { itemsSectionRenderer } from './items-section/items-section-renderer';

/**
 * @description
 * Renders the QnA knowledge base to Lu file format.
 *
 * @param knowledgeBase The QnA knowledge base object.
 */
export const qnaKnowledgeBaseRenderer = (knowledgeBase: IQnaKnowledgeBase, writer: IMarkdownWriter): string => {
	itemsSectionRenderer(knowledgeBase, writer);

	return writer.render();
};
