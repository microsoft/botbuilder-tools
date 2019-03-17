import { IQnaKnowledgeBaseItem } from '../../../../interfaces/qna/knowledge-base-items/IKnowledgeBaseItem';
import { knowledgeBaseItemFilterImporter } from './knowledge-base-item-filter-importer';

/**
 * @description
 * Creates knowledge base items from a QnA JSON object.
 *
 * @param state The QnA JSON object.
 */
export const knowledgeBaseItemImporter: (state) => IQnaKnowledgeBaseItem[] = state => {
	return state.qnaDocuments.map(document => ({
		source: document.source,
		answer: document.answer,
		questions: document.questions,
		filters: knowledgeBaseItemFilterImporter(document)
	}));
};
