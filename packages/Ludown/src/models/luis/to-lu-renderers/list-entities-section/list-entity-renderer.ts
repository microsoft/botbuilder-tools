import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { IListEntity } from '../../../../interfaces/luis/entities/IListEntity';

/**
 * @description
 * Renders the given list entity to Lu file format.
 *
 * @param entity The list entity object to render.
 * @param writer The writer used to write the Lu file.
 */
export const listEntityRenderer = (entity: IListEntity, writer: IMarkdownWriter) => {
    entity.subLists.forEach(s => {
        writer.addStatement(`$${entity.name}:${s.canonicalForm}=`);
        s.list.forEach(l => writer.addListItem(l));
        writer.addNewLine();
    });
};
