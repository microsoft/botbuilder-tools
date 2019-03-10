import { knowledgeBaseItemImporter } from '../knowledge-base-items/knowledge-base-item-importer';
import { IKnowledgeBase } from 'src/interfaces/qna/knowledge-bases/IKnowledgeBase';

/**
 * @description
 * Creates a knowledge base from a QnA JSON object.
 *
 * @param state The QnA JSON object.
 */
export const knowledgeBaseImporter: (state) => IKnowledgeBase = state => {
	return { items: knowledgeBaseItemImporter(state) };
};
