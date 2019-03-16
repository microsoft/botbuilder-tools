import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { ILuisApp } from '../../../../interfaces/luis/apps/IApp';
import { prebuiltEntityRenderer } from './prebuilt-entity-renderer';

/**
 * @description
 * Renders the LUIS app object entities section to Lu file format.
 *
 * @param app The LUIS app object.
 * @param writer The writer used to write the Lu file.
 */
export const prebuiltEntitiesSectionRenderer = (app: ILuisApp, writer: IMarkdownWriter) => {
	if (!app.prebuiltEntities || app.prebuiltEntities.length === 0) {
		return;
	}

	writer.addComment('# Prebuilt entity definitions');
	writer.addNewLine();

	app.prebuiltEntities.forEach(entity => prebuiltEntityRenderer(entity, writer));
};
