import { ArgumentBag, missingArgumentValidatorFactory } from '../../src/utils/validators/missing-argument-validator';

describe('Missing argument validator', () => {
    const getResults = (factoryArgs: ArgumentBag[], state: Object) => {
        const validator = missingArgumentValidatorFactory(factoryArgs);

        return validator.execute(state);
    };

    it('should resolve with true when passed arguments exist', (done) => {
        const result = getResults([['arg1']], { arg1: 'Exists' });

        result.then(value => {
            expect(value).toBeTruthy();
            done();
        });
    });

    it('should resolve with true when at least one of the passed arguments exists', (done) => {
        const result = getResults([['arg1', 'arg2']], { arg1: 'Exists' });

        result.then(value => {
            expect(value).toBeTruthy();
            done();
        });
    });

    it('should resolve with true when at least one of the passed arguments exists', (done) => {
        const result = getResults([['arg1', 'arg2']], { arg1: 'Exists' });

        result.then(value => {
            expect(value).toBeTruthy();
            done();
        });
    });

    it('should resolve when state and args are empty', (done) => {
        const result = getResults([], { arg1: 'Exists' });

        result.then(value => {
            expect(value).toBeTruthy();
            done();
        });
    });

    it('should reject with the missing args bag when it doesnt exist', (done) => {
        const result = getResults([['arg1', 'arg2'], ['arg3', 'arg4']], { arg3: 'Exists' });

        result.catch(data => {
            expect(data).toEqual({ code: 0, data: ['arg1', 'arg2'] });
            done();
        });
    });
});
