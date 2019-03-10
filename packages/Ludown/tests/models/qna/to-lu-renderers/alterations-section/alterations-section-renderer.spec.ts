import { markdownWriter } from '../../../../../src/helpers/markdown-writer';
import { alterationsSectionRenderer } from '../../../../../src/models/qna/to-lu-renderers/alterations-section/alterations-section-renderer';

describe('QnA alterations section', () => {
	const runTestCase = sampleDocument => {
		const writer = markdownWriter();
		alterationsSectionRenderer(sampleDocument, writer);

		return writer.render();
	};

	it('should output correct section text when alterations are present', () => {
		const output = runTestCase({
			wordAlterations: [
				{
					alterations: ['Alt1', 'Alt2']
				},
				{
					alterations: ['Alt3', 'Alt4']
				}
			]
		});

		expect(output).toBe('> # QnA Alterations\n\n$Alt1 : qna-alterations =\n- Alt2\n\n$Alt3 : qna-alterations =\n- Alt4\n\n');
	});

	it('should not output anything if items are empty or do not exist.', () => {
		const output = runTestCase({});

		expect(output).toBe('');
	});
});
