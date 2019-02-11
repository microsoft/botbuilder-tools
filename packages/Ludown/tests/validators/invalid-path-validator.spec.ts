import * as mockFs from 'mock-fs';
import { ERROR_CODE } from '../../src/models/error-codes';
import { invalidPathValidator } from '../../src/utils/validators/invalid-path-validator';

describe('Invalid path validator', () => {
    beforeAll(() => {
        mockFs({
            './mock.txt': 'Sample mocked text file',
            './mock-dir': {}
        });
    });

    afterAll(() => {
        mockFs.restore();
    });

    it('should resolve when directory flag is false and path resolves to an existent file', (done) => {
        invalidPathValidator(false).execute('./mock.txt').then(data => {
            expect(data).toBeTruthy();
            done();
        });
    });

    it('should resolve when directory flag is true and path resolves to an existent directory', (done) => {
        invalidPathValidator(true).execute('./mock-dir').then(data => {
            expect(data).toBeTruthy();
            done();
        });
    });

    it('should reject when path does not exist', (done) => {
        invalidPathValidator(true).execute('./non-existent-file.txt').catch(err => {
            expect(err).toEqual({ code: ERROR_CODE.PATH_NOT_FOUND, data: './non-existent-file.txt' });
            done();
        });
    });

    it('should reject when directory flag is true and path is of a file', (done) => {
        invalidPathValidator(true).execute('./mock.txt').catch(err => {
            expect(err).toEqual({ code: ERROR_CODE.NOT_A_DIRECTORY, data: './mock.txt' });
            done();
        });
    });

    it('should reject when directory flag is false and path is of a directory', (done) => {
        invalidPathValidator(false).execute('./mock-dir').catch(err => {
            expect(err).toEqual({ code: ERROR_CODE.NOT_A_FILE, data: './mock-dir' });
            done();
        });
    });
});
