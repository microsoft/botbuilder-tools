import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { IQnaKnowledgeBaseItem } from 'src/interfaces/qna/knowledge-base-items/IKnowledgeBaseItem';
import { itemFilterRenderer } from './item-filter-renderer';

/**
 * @description
 * Renders the QnA knowledge base item filters section to Lu file format.
 *
 * @param knowledgeBaseItem The QnA knowledge base item object.
 * @param writer The writer used to write the Lu file.
 */
export const itemFiltersSectionRenderer = (knowledgeBaseItem: IQnaKnowledgeBaseItem, writer: IMarkdownWriter) => {
	if (!knowledgeBaseItem.filters || knowledgeBaseItem.filters.length === 0) {
		return;
	}

	writer.addNewLine();
	writer.addStatement('**Filters:**');

	knowledgeBaseItem.filters.forEach(filter => itemFilterRenderer(filter, writer));
	writer.addNewLine();
};
