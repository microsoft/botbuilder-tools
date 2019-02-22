import { markdownWriter } from '../../../../../src/helpers/markdown-writer';
import { listEntitiesSectionRenderer } from '../../../../../src/models/luis/to-lu-renderers/list-entities-section/list-entities-section-renderer';

describe('Simple entities section', () => {
    const runTestCase = (sampleApp) => {
        const writer = markdownWriter();
        listEntitiesSectionRenderer(sampleApp, writer);

        return writer.render();
    };

    it('should output correct section text when list entities are given.', () => {
        const output = runTestCase({
            listEntities: [{
                name: 'Entity1',
                subLists: [
                    {
                        canonicalForm: 'form1',
                        list: ['alt1', 'alt2']
                    },
                    {
                        canonicalForm: 'form2',
                        list: ['alt3', 'alt4']
                    }
                ]
            }]
        });

        expect(output).toBe('> # List entity definitions\n\n$Entity1:form1=\n- alt1\n- alt2\n\n$Entity1:form2=\n- alt3\n- alt4\n\n');
    });

    it('should not output anything if list entities are empty or do not exist.', () => {
        const output = runTestCase({});

        expect(output).toBe('');
    });
});
