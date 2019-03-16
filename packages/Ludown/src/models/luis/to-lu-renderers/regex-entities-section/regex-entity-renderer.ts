import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { IRegexEntity } from '../../../../interfaces/luis/entities/IRegexEntity';

/**
 * @description
 * Renders the given regex entity to Lu file format.
 *
 * @param entity The regex entity object to render.
 * @param writer The writer used to write the Lu file.
 */
export const regexEntityRenderer = (entity: IRegexEntity, writer: IMarkdownWriter) => {
	writer.addStatement(`$${entity.name}:/${entity.regex}/`);
	writer.addNewLine();
};
