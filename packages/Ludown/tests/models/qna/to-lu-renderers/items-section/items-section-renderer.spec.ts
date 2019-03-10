import { markdownWriterFactory } from '../../../../../src/helpers/markdown-writer';
import { itemsSectionRenderer } from '../../../../../src/models/qna/to-lu-renderers/items-section/items-section-renderer';

describe('QnA items section', () => {
	const runTestCase = sampleDocument => {
		const writer = markdownWriterFactory();
		itemsSectionRenderer(sampleDocument, writer);

		return writer.render();
	};

	it('should output correct section text when items are present', () => {
		const output = runTestCase({
			items: [
				{
					answer: 'Answer1',
					source: 'Source1',
					questions: ['Question1A', 'Question1B'],
					filters: []
				}
			]
		});

		expect(output).toBe('> # QnA pairs\n\n> Source: Source1\n## ? Question1A\n- Question1B\n\n```markdown\nAnswer1\n```\n\n');
	});

	it('should output correct section text when items and filters are present', () => {
		const output = runTestCase({
			items: [
				{
					answer: 'Answer2',
					source: 'Source2',
					questions: ['Question2'],
					filters: [
						{
							name: 'name2',
							value: 'value2'
						}
					]
				}
			]
		});

		expect(output).toBe(
			'> # QnA pairs\n\n> Source: Source2\n## ? Question2\n\n\n**Filters:**\n- name2 = value2\n\n```markdown\nAnswer2\n```\n\n'
		);
	});

	it('should not output anything if items are empty or do not exist.', () => {
		const output = runTestCase({});

		expect(output).toBe('');
	});
});
