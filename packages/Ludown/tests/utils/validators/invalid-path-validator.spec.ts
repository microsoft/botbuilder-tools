import * as mockFs from 'mock-fs';
import * as path from 'path';
import { ERROR_CODE } from '../../../src/models/error-codes';
import { invalidPathValidatorFactory } from '../../../src/utils/validators/invalid-path-validator';

describe('Invalid path validator', () => {
	beforeEach(() =>
		mockFs({
			'mock.txt': 'Sample mocked text file',
			'mock-dir': {},
			'mock-file-no-read.txt': mockFs.file({ content: 'Sample no file read', mode: 0o0000 })
		})
	);
	afterEach(() => mockFs.restore());

	it('should resolve when directory flag is false and path resolves to an existent file.', async () => {
		const data = await invalidPathValidatorFactory({ isDirectory: false }).execute('./mock.txt');

		expect(data).toBeTruthy();
	});

	it('should resolve when directory flag is true and path resolves to an existent directory.', async () => {
		const data = await invalidPathValidatorFactory({ isDirectory: true }).execute('./mock-dir');

		expect(data).toBeTruthy();
	});

	it('should reject when path does not exist.', async () => {
		try {
			await invalidPathValidatorFactory({ isDirectory: true }).execute('./non-existent-file.txt');
		} catch (err) {
			const resolvedPath = path.resolve('./non-existent-file.txt');

			expect(err).toEqual({
				code: ERROR_CODE.PATH_NOT_FOUND,
				data: resolvedPath,
				message: `The path ("${resolvedPath}") does not exist.`
			});
		}
	});

	it('should reject when directory flag is true and path is of a file.', async () => {
		try {
			await invalidPathValidatorFactory({ isDirectory: true }).execute('./mock.txt');
		} catch (err) {
			const resolvedPath = path.resolve('./mock.txt');

			expect(err).toEqual({
				code: ERROR_CODE.NOT_A_DIRECTORY,
				data: resolvedPath,
				message: `The path ("${resolvedPath}") is not a directory.`
			});
		}
	});

	it('should reject when directory flag is false and path is of a directory.', async () => {
		try {
			await invalidPathValidatorFactory({ isDirectory: false }).execute('./mock-dir');
		} catch (err) {
			const resolvedPath = path.resolve('./mock-dir');

			expect(err).toEqual({
				code: ERROR_CODE.NOT_A_FILE,
				data: resolvedPath,
				message: `The path ("${resolvedPath}") is not a file.`
			});
		}
	});

	it('should reject when file access is read and file has no read permissions', async () => {
		try {
			await invalidPathValidatorFactory({ isDirectory: false, accessLevel: 'read' }).execute('./mock-file-no-read.txt');
		} catch (err) {
			const resolvedPath = path.resolve('./mock-file-no-read.txt');

			expect(err).toEqual({
				code: ERROR_CODE.INVALID_FS_PERMISSIONS,
				data: resolvedPath,
				message: `The user has no read permissions on the path ("${resolvedPath}").`
			});
		}
	});

	it('should reject when file access is write and file has no write permissions', async () => {
		try {
			await invalidPathValidatorFactory({ isDirectory: false, accessLevel: 'write' }).execute('./mock-file-no-read.txt');
		} catch (err) {
			const resolvedPath = path.resolve('./mock-file-no-read.txt');

			expect(err).toEqual({
				code: ERROR_CODE.INVALID_FS_PERMISSIONS,
				data: resolvedPath,
				message: `The user has no write permissions on the path ("${resolvedPath}").`
			});
		}
	});

	it('should reject when file access is read-write and file has no read-write permissions', async () => {
		try {
			await invalidPathValidatorFactory({ isDirectory: false, accessLevel: 'read-write' }).execute('./mock-file-no-read.txt');
		} catch (err) {
			const resolvedPath = path.resolve('./mock-file-no-read.txt');

			expect(err).toEqual({
				code: ERROR_CODE.INVALID_FS_PERMISSIONS,
				data: resolvedPath,
				message: `The user has no read-write permissions on the path ("${resolvedPath}").`
			});
		}
	});
});
