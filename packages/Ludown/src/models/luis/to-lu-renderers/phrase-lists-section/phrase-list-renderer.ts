import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { IPhraseList } from '../../../../interfaces/luis/features/IPhraseList';

/**
 * @description
 * Renders the given phrase list to Lu file format.
 *
 * @param phraseList The phrase list object to render.
 * @param writer The writer used to write the Lu file.
 */
export const phraseListRenderer = (phraseList: IPhraseList, writer: IMarkdownWriter) => {
	let phraseListTitle = `$${phraseList.name}:PhraseList`;

	if (phraseList.interchangeable) {
		phraseListTitle = phraseListTitle.concat(' interchangeable');
	}

	writer.addStatement(phraseListTitle);

	phraseList.values.split(',').forEach(val => writer.addListItem(val));

	writer.addNewLine();
};
