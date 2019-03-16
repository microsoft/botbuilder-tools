import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { ILuisApp } from '../../../../interfaces/luis/apps/IApp';
import { phraseListRenderer } from './phrase-list-renderer';

/**
 * @description
 * Renders the LUIS app object phrase list section to Lu file format.
 *
 * @param app The LUIS app object.
 * @param writer The writer used to write the Lu file.
 */
export const phraseListSectionRenderer = (app: ILuisApp, writer: IMarkdownWriter) => {
	if (!app.phraseLists || app.phraseLists.length === 0) {
		return;
	}

	writer.addComment('# Phrase list definitions');
	writer.addNewLine();

	app.phraseLists.forEach(phraseList => phraseListRenderer(phraseList, writer));
};
