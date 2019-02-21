import { markdownWriter } from '../../../../../src/helpers/markdown-writer';
import { simpleEntitiesSectionRenderer } from '../../../../../src/models/luis/to-lu-renderers/simple-entities-section/simple-entities-section-renderer';

describe('Simple entities section', () => {
    const runTestCase = (sampleApp) => {
        const writer = markdownWriter();
        simpleEntitiesSectionRenderer(sampleApp, writer);

        return writer.render();
    };

    it('should output correct section text when entities are given.', () => {
        const output = runTestCase({ entities: [{ name: 'Entity1' }, { name: 'Entity2' }] });

        expect(output).toBe('> # Entity definitions\n\n$Entity1:Simple\n\n$Entity2:Simple\n\n');
    });

    it('should not output anything if entities are empty or do not exist.', () => {
        const output = runTestCase({});

        expect(output).toBe('');
    });
});
