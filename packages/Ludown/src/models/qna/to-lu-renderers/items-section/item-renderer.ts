import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { IKnowledgeBaseItem } from 'src/interfaces/qna/knowledge-base-items/IKnowledgeBaseItem';
import { itemFiltersSectionRenderer } from './item-filters-section-renderer';

/**
 * @description
 * Renders the QnA knowledge base item object to Lu file format.
 *
 * @param knowledgeBaseItem The QnA knowledge base item object.
 * @param writer The writer used to write the Lu file.
 */
export const itemRenderer = (knowledgeBaseItem: IKnowledgeBaseItem, writer: IMarkdownWriter) => {
	writer.addComment(`Source: ${knowledgeBaseItem.source}`);

	if (!knowledgeBaseItem.questions || knowledgeBaseItem.questions.length === 0) {
		return;
	}

	const questionsToPrint = knowledgeBaseItem.questions.slice();

	writer.addSecondLevelHeader(`? ${questionsToPrint[0]}`);
	questionsToPrint.splice(0, 1);

	questionsToPrint.forEach(question => writer.addListItem(question));
	writer.addNewLine();

	itemFiltersSectionRenderer(knowledgeBaseItem, writer);

	writer.addStatement(`\`\`\`markdown`);
	writer.addStatement(knowledgeBaseItem.answer);
	writer.addStatement('```');
	writer.addNewLine();
};
