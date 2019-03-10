import { markdownWriterFactory } from '../../../../../src/helpers/markdown-writer';
import { regexEntitiesSectionRenderer } from '../../../../../src/models/luis/to-lu-renderers/regex-entities-section/regex-entities-section-renderer';

describe('Regex entities section', () => {
	const runTestCase = sampleApp => {
		const writer = markdownWriterFactory();
		regexEntitiesSectionRenderer(sampleApp, writer);

		return writer.render();
	};

	it('should output correct section text when regex entities are given.', () => {
		const output = runTestCase({ regexEntities: [{ name: 'Entity1', regex: 'test' }] });

		expect(output).toBe('> # Regex entity definitions\n\n$Entity1:/test/\n\n');
	});

	it('should not output anything if regex entities are empty or do not exist.', () => {
		const output = runTestCase({});

		expect(output).toBe('');
	});
});
