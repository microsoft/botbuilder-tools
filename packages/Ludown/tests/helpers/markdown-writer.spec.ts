import { markdownWriter } from '../../src/helpers/markdown-writer';

describe('Markdown writer', () => {
    it('should write correct first level header', () => {
        const result = markdownWriter().addFirstLevelHeader('Testing header').render();

        expect(result).toBe('# Testing header\n');
    });

    it('should write correct second level header', () => {
        const result = markdownWriter().addSecondLevelHeader('Testing header').render();

        expect(result).toBe('## Testing header\n');
    });

    it('should write correct third level header', () => {
        const result = markdownWriter().addThirdLevelHeader('Testing header').render();

        expect(result).toBe('### Testing header\n');
    });

    it('should write correct statement', () => {
        const result = markdownWriter().addStatement('Testing statement').render();

        expect(result).toBe('Testing statement\n');
    });

    it('should write correct list item', () => {
        const result = markdownWriter().addListItem('Testing list item').render();

        expect(result).toBe('- Testing list item\n');
    });

    it('should write correct list item with correct indentation', () => {
        const result = markdownWriter().addListItem('Testing list item', 3).render();

        expect(result).toBe('   - Testing list item\n');
    });

    it('should write correct comment', () => {
        const result = markdownWriter().addComment('Testing comment').render();

        expect(result).toBe('> Testing comment\n');
    });

    it('should write correct link', () => {
        const result = markdownWriter().addLink('Test link text', 'Test link href').render();

        expect(result).toBe('[Test link text](Test link href)\n');
    });

    it('should write correct header', () => {
        const result = markdownWriter().addNewLine().render();

        expect(result).toBe('\n');
    });
});
