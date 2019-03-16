import { IQnaKnowledgeBaseItemFilter } from './IKnoweldgeBaseItemFilter';

/**
 * @description
 * Represents a QNA knowledge base document item.
 */
export interface IQnaKnowledgeBaseItem {
	source: string;

	questions: string[];

	answer: string;

	filters: IQnaKnowledgeBaseItemFilter[];
}
