import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { IApp } from '../../../../interfaces/luis/apps/IApp';
import { listEntityRenderer } from './list-entity-renderer';

/**
 * @description
 * Renders the LUIS app object entities section to Lu file format.
 *
 * @param app The LUIS app object.
 * @param writer The writer used to write the Lu file.
 */
export const listEntitiesSectionRenderer = (app: IApp, writer: IMarkdownWriter) => {
    if (!app.listEntities || app.listEntities.length === 0) {
        return;
    }

    writer.addComment('# List entity definitions');
    writer.addNewLine();

    app.listEntities.forEach(entity => listEntityRenderer(entity, writer));
};
