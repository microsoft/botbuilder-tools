import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { ILuisApp } from '../../../../interfaces/luis/apps/IApp';
import { regexEntityRenderer } from './regex-entity-renderer';

/**
 * @description
 * Renders the LUIS app object regex entities section to Lu file format.
 *
 * @param app The LUIS app object.
 * @param writer The writer used to write the Lu file.
 */
export const regexEntitiesSectionRenderer = (app: ILuisApp, writer: IMarkdownWriter) => {
	if (!app.regexEntities || app.regexEntities.length === 0) {
		return;
	}

	writer.addComment('# Regex entity definitions');
	writer.addNewLine();

	app.regexEntities.forEach(regexEntity => regexEntityRenderer(regexEntity, writer));
};
