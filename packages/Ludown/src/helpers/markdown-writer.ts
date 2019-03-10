import { IMarkdownWriter } from '../interfaces/helpers/IMarkdownWriter';

/**
 * @description
 * Represents a markdown writer object that provides a simplistic SDK for writing
 * markdown files.
 */
export const markdownWriterFactory: () => IMarkdownWriter = () => {
	let output = '';

	return {
		addFirstLevelHeader(header: string) {
			output = output.concat(`# ${header}\n`);

			return this;
		},
		addSecondLevelHeader(header: string) {
			output = output.concat(`## ${header}\n`);

			return this;
		},
		addThirdLevelHeader(header: string) {
			output = output.concat(`### ${header}\n`);

			return this;
		},
		addStatement(statement: string) {
			output = output.concat(`${statement}\n`);

			return this;
		},
		addListItem(statement: string, indentation: number = 0) {
			const spaces = ' '.repeat(indentation);
			output = output.concat(`${spaces}- ${statement}\n`);

			return this;
		},
		addComment(comment: string) {
			output = output.concat(`> ${comment}\n`);

			return this;
		},
		addLink(text: string, href: string) {
			output = output.concat(`[${text}](${href})\n`);

			return this;
		},
		addNewLine(): IMarkdownWriter {
			output = output.concat('\n');

			return this;
		},
		render() {
			return output;
		}
	};
};
