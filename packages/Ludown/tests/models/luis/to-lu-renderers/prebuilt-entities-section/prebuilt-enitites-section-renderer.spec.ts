import { markdownWriter } from '../../../../../src/helpers/markdown-writer';
import { prebuiltEntitiesSectionRenderer } from '../../../../../src/models/luis/to-lu-renderers/prebuilt-entities-section/prebuilt-entities-section-renderer';

describe('Prebuilt entities section', () => {
    const runTestCase = (sampleApp) => {
        const writer = markdownWriter();
        prebuiltEntitiesSectionRenderer(sampleApp, writer);

        return writer.render();
    };

    it('should output correct section text when prebuilt entities are given.', () => {
        const output = runTestCase({ prebuiltEntities: [{ name: 'datetime' }, { name: 'number' }] });

        expect(output).toBe('> # Prebuilt entity definitions\n\n$PREBUILT:datetime\n\n$PREBUILT:number\n\n');
    });

    it('should not output anything if entities are empty or do not exist.', () => {
        const output = runTestCase({});

        expect(output).toBe('');
    });
});
