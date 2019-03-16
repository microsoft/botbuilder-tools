import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { IQnaKnowledgeBaseItemFilter } from 'src/interfaces/qna/knowledge-base-items/IKnoweldgeBaseItemFilter';

/**
 * @description
 * Renders the QnA knowledge base item filter object to Lu file format.
 *
 * @param knowledgeBaseItemFilter The QnA knowledge base item filter object.
 * @param writer The writer used to write the Lu file.
 */
export const itemFilterRenderer = (knowledgeBaseItemFilter: IQnaKnowledgeBaseItemFilter, writer: IMarkdownWriter) => {
	writer.addListItem(`${knowledgeBaseItemFilter.name} = ${knowledgeBaseItemFilter.value}`);
};
