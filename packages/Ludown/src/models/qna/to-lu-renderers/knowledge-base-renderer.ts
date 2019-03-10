import { IKnowledgeBase } from '../../../interfaces/qna/knowledge-bases/IKnowledgeBase';
import { markdownWriterFactory } from '../../../helpers/markdown-writer';
import { itemsSectionRenderer } from './items-section/items-section-renderer';

/**
 * @description
 * Renders the QnA knowledge base to Lu file format.
 *
 * @param knowledgeBase The QnA knowledge base object.
 */
export const knowledgeBaseRenderer = (knowledgeBase: IKnowledgeBase): string => {
	const writer = markdownWriterFactory();

	itemsSectionRenderer(knowledgeBase, writer);

	return writer.render();
};
