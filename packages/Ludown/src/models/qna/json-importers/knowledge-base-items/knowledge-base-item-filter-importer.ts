import { IKnowledgeBaseItemFilter } from '../../../../interfaces/qna/knowledge-base-items/IKnoweldgeBaseItemFilter';

/**
 * @description
 * Creates filter objects from a QnA document JSON object.
 *
 * @param state The QnA document JSON object.
 */
export const knowledgeBaseItemFilterImporter: (state) => IKnowledgeBaseItemFilter[] = state => {
	return state.metadata.map(datum => ({ name: datum.name, value: datum.value }));
};
