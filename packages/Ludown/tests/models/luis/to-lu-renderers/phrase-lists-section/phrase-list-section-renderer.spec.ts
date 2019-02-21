import { markdownWriter } from '../../../../../src/helpers/markdown-writer';
import { phraseListSectionRenderer } from '../../../../../src/models/luis/to-lu-renderers/phrase-lists-section/phrase-lists-section-renderer';

describe('Phrase list section renderer', () => {
    const runTestCase = (sampleApp) => {
        const writer = markdownWriter();
        phraseListSectionRenderer(sampleApp, writer);

        return writer.render();
    };

    it('should output correct section text when phrase list is given.', () => {
        const output = runTestCase({
            phraseLists: [
                { name: 'Feature 1', values: 'value1,value2', interchangeable: true }
            ]
        });

        expect(output).toBe('> # Phrase list definitions\n\n$Feature 1:PhraseList interchangeable\n- value1\n- value2\n\n');
    });

    it('should exclude interchangeable keyword when phrase list mode is false.', () => {
        const output = runTestCase({
            phraseLists: [
                { name: 'Feature 1', values: 'value1,value2', interchangeable: false }
            ]
        });

        expect(output).toBe('> # Phrase list definitions\n\n$Feature 1:PhraseList\n- value1\n- value2\n\n');
    });

    it('should render multiple phrase list features correctly when present.', () => {
        const output = runTestCase({
            phraseLists: [
                { name: 'Feature 1', values: 'value1', interchangeable: false },
                { name: 'Feature 2', values: 'value2', interchangeable: false }
            ]
        });

        expect(output).toBe('> # Phrase list definitions\n\n$Feature 1:PhraseList\n- value1\n\n$Feature 2:PhraseList\n- value2\n\n');
    });

    it('should not render phrase list section when no phrase lists are present.', () => {
        const output = runTestCase({});

        expect(output).toBe('');
    });
});
