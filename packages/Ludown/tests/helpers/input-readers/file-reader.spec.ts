import * as mockFs from 'mock-fs';
import { fileReader } from '../../../src/helpers/input-readers/file-reader';

describe('Invalid path validator', () => {
	beforeEach(() => mockFs({ 'mock1.txt': 'Sample1', 'mock2.txt': 'Sample2' }));
	afterEach(() => mockFs.restore());

	it('should resolve with the file with the given path.', async () => {
		const files = await fileReader().read('./mock1.txt');

		expect(files.length).toEqual(1);
		expect(files[0]).toEqual({
			name: 'mock1.txt',
			content: 'Sample1'
		});
	});

	it('should resolve with the file with the given path.', async () => {
		const files = await fileReader().read('./mock2.txt');

		expect(files.length).toEqual(1);
		expect(files[0]).toEqual({
			name: 'mock2.txt',
			content: 'Sample2'
		});
	});
});
