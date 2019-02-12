import { extractArguments } from '../../src/utils/argument-extractor';

describe('Argument extractor', () => {
    it('should return normalized arguments when given an array of unnormalized arguments', () => {
        const output = extractArguments(['path', 'ludown', 'cOMmand', 'arg1', 'Arg2', 'ARG3  ', '   arG4   ']);

        expect(output).toEqual({
            command: 'command',
            args: ['arg1', 'arg2', 'arg3', 'arg4']
        });
    });

    it('should return empty command and arguments when input array is of length less than 3', () => {
        const output = extractArguments(['path', 'ludown']);

        expect(output).toEqual({
            command: '',
            args: []
        });
    });

    it('should return empty arguments when input array is of length less than 4', () => {
        const output = extractArguments(['path', 'ludown', 'coMMand']);

        expect(output).toEqual({
            command: 'command',
            args: []
        });
    });
});
