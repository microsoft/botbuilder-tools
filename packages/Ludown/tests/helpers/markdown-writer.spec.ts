import { markdownWriterFactory } from '../../src/helpers/markdown-writer';

describe('Markdown writer', () => {
	it('should write correct first level header', () => {
		const result = markdownWriterFactory()
			.addFirstLevelHeader('Testing header')
			.render();

		expect(result).toBe('# Testing header\n');
	});

	it('should write correct second level header', () => {
		const result = markdownWriterFactory()
			.addSecondLevelHeader('Testing header')
			.render();

		expect(result).toBe('## Testing header\n');
	});

	it('should write correct third level header', () => {
		const result = markdownWriterFactory()
			.addThirdLevelHeader('Testing header')
			.render();

		expect(result).toBe('### Testing header\n');
	});

	it('should write correct statement', () => {
		const result = markdownWriterFactory()
			.addStatement('Testing statement')
			.render();

		expect(result).toBe('Testing statement\n');
	});

	it('should write correct list item', () => {
		const result = markdownWriterFactory()
			.addListItem('Testing list item')
			.render();

		expect(result).toBe('- Testing list item\n');
	});

	it('should write correct list item with correct indentation', () => {
		const result = markdownWriterFactory()
			.addListItem('Testing list item', 3)
			.render();

		expect(result).toBe('   - Testing list item\n');
	});

	it('should write correct comment', () => {
		const result = markdownWriterFactory()
			.addComment('Testing comment')
			.render();

		expect(result).toBe('> Testing comment\n');
	});

	it('should write correct link', () => {
		const result = markdownWriterFactory()
			.addLink('Test link text', 'Test link href')
			.render();

		expect(result).toBe('[Test link text](Test link href)\n');
	});

	it('should write correct header', () => {
		const result = markdownWriterFactory()
			.addNewLine()
			.render();

		expect(result).toBe('\n');
	});
});
