import { markdownWriter } from '../../../../../src/helpers/markdown-writer';
import { intentsSectionRenderer } from '../../../../../src/models/luis/to-lu-renderers/intents-section/intents-section-renderer';

describe('Intents section renderer', () => {
    const runTestCase = (sampleApp) => {
        const writer = markdownWriter();
        intentsSectionRenderer(sampleApp, writer);

        return writer.render();
    };

    it('should render each intent and the utternaces/patterns it owns', () => {
        const output = runTestCase({
            intents: [{ name: 'IntentA' }, { name: 'IntentB' }],
            utterances: [
                { text: 'U1', intent: 'IntentA', entities: [] },
                { text: 'U2', intent: 'IntentB', entities: [] }
            ],
            patterns: [
                { pattern: 'P1', intent: 'IntentA' },
                { pattern: 'P2', intent: 'IntentB' }
            ]
        });

        expect(output).toBe(`> # Intent definitions\n\n## IntentA\n- U1\n- P1\n\n\n## IntentB\n- U2\n- P2\n\n\n`);
    });

    it('should not output anything if intents are empty or do not exist.', () => {
        const output = runTestCase({});

        expect(output).toBe('');
    });
});
