import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { IQnaAlteration } from 'src/interfaces/qna/alterations/IQnaAlteration';

/**
 * @description
 * Renders the QnA alteration object to Lu file format.
 *
 * @param alteration The QnA alteration object.
 * @param writer The writer used to write the Lu file.
 */
export const alterationRenderer = (alteration: IQnaAlteration, writer: IMarkdownWriter) => {
	if (!alteration.alterations || alteration.alterations.length === 0) {
		return;
	}

	const alterationsToPrint = alteration.alterations.slice();

	writer.addStatement(`$${alterationsToPrint[0]} : qna-alterations =`);
	alterationsToPrint.splice(0, 1);

	alterationsToPrint.forEach(alteration => writer.addListItem(alteration));
	writer.addNewLine();
};
