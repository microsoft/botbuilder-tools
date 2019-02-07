import { missingArgumentValidatorFactory } from '../../src/utils/validators/missing-argument-validator';

describe('Missing argument validator', () => {
    it('should resolve with true when passed arguments exist', (done) => {
        missingArgumentValidatorFactory([['arg1']]).execute({ arg1: 'Exists' })
            .then(value => {
                expect(value).toBeTruthy();
                done();
            });
    });

    it('should resolve with true when at least one of the passed arguments exists', (done) => {
        missingArgumentValidatorFactory([['arg1', 'arg2']]).execute({ arg1: 'Exists' })
            .then(value => {
                expect(value).toBeTruthy();
                done();
            });
    });

    it('should resolve with true when at least one of the passed arguments exists', (done) => {
        missingArgumentValidatorFactory([['arg1', 'arg2']]).execute({ arg1: 'Exists' })
            .then(value => {
                expect(value).toBeTruthy();
                done();
            });
    });

    it('should resolve when state and args are empty', (done) => {
        missingArgumentValidatorFactory([]).execute({ arg1: 'Exists' })
            .then(value => {
                expect(value).toBeTruthy();
                done();
            });
    });

    it('should reject with the missing args bag when it doesnt exist', (done) => {
        missingArgumentValidatorFactory([['arg1', 'arg2'], ['arg3', 'arg4']]).execute({ arg3: 'Exists' })
            .catch(data => {
                expect(data).toEqual({ code: 0, data: ['arg1', 'arg2'] });
                done();
            });
    });
});
