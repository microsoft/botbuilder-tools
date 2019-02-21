import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { IEntity } from '../../../../interfaces/luis/entities/IEntity';

/**
 * @description
 * Renders the given entity to Lu file format.
 *
 * @param entity The entity object to render.
 * @param writer The writer used to write the Lu file.
 */
export const simpleEntityRenderer = (entity: IEntity, writer: IMarkdownWriter) => {
    writer.addStatement(`$${entity.name}:Simple`);
    writer.addNewLine();
};
