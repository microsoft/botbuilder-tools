import { markdownWriter } from '../../../../../src/helpers/markdown-writer';
import { utteranceRenderer } from '../../../../../src/models/luis/to-lu-renderers/intents-section/utterance-renderer';

describe('Utterance renderer', () => {
    const runTestCase = (sampleUtterance) => {
        const writer = markdownWriter();
        utteranceRenderer(sampleUtterance, writer);

        return writer.render();
    };

    it('should output correct interpolation for given utterance.', () => {
        const output = runTestCase({
            text: 'should i take my coat out tonight?',
            entities: [
                { name: 'WeatherItem', startPosition: 17, endPosition: 20 },
                { name: 'datetime', startPosition: 26, endPosition: 32 }
            ]
        });

        expect(output).toBe('- should i take my {WeatherItem=coat} out {datetime=tonight}?\n');
    });

    it('should skip entity labels that are out of bounds.', () => {
        const output = runTestCase({
            text: 'should i take my coat out tonight?',
            entities: [
                { name: 'WeatherItem', startPosition: 40, endPosition: 50 },
                { name: 'datetime', startPosition: 26, endPosition: 32 }
            ]
        });

        expect(output).toBe('- should i take my coat out {datetime=tonight}?\n');
    });

    it('should output utterance as is if no entities were labeled.', () => {
        const output = runTestCase({
            text: 'should i take my coat out tonight?',
            entities: []
        });

        expect(output).toBe('- should i take my coat out tonight?\n');
    });

    it('should not output anything if overlapping labels were present.', () => {
        const output = runTestCase({
            text: 'should i take my coat out tonight?',
            entities: [
                { name: 'WeatherItem', startPosition: 17, endPosition: 20 },
                { name: 'WeatherItem', startPosition: 14, endPosition: 20 }
            ]
        });

        expect(output).toBe('');
    });
});
