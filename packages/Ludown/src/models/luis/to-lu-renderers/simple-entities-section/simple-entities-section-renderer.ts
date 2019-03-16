import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { ILuisApp } from '../../../../interfaces/luis/apps/IApp';
import { simpleEntityRenderer } from './simple-entity-renderer';

/**
 * @description
 * Renders the LUIS app object entities section to Lu file format.
 *
 * @param app The LUIS app object.
 * @param writer The writer used to write the Lu file.
 */
export const simpleEntitiesSectionRenderer = (app: ILuisApp, writer: IMarkdownWriter) => {
	if (!app.entities || app.entities.length === 0) {
		return;
	}

	writer.addComment('# Entity definitions');
	writer.addNewLine();

	app.entities.forEach(entity => simpleEntityRenderer(entity, writer));
};
