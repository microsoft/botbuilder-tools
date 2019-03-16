import { IQnaKnowledgeBase } from '../../../../interfaces/qna/knowledge-bases/IKnowledgeBase';
import { knowledgeBaseItemImporter } from '../knowledge-base-items/knowledge-base-item-importer';

/**
 * @description
 * Creates a knowledge base from a QnA JSON object.
 *
 * @param state The QnA JSON object.
 */
export const knowledgeBaseImporter: (state) => IQnaKnowledgeBase = state => {
	return { items: knowledgeBaseItemImporter(state) };
};
