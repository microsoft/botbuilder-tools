import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { IPattern } from '../../../../interfaces/luis/patterns/IPattern';

/**
 * @description
 * Renders the given pattern to Lu file format.
 *
 * @param pattern The pattern object to render.
 * @param writer The writer used to write the Lu file.
 */
export const patternRenderer = (pattern: IPattern, writer: IMarkdownWriter) => {
	writer.addListItem(pattern.pattern);
};
