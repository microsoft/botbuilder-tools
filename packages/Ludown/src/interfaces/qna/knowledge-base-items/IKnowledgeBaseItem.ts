import { IKnowledgeBaseItemFilter } from './IKnoweldgeBaseItemFilter';

/**
 * @description
 * Represents a QNA knowledge base document item.
 */
export interface IKnowledgeBaseItem {
	source: string;

	questions: string[];

	answer: string;

	filters: IKnowledgeBaseItemFilter[];
}
