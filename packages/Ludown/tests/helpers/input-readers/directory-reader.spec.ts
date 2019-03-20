import * as mockFs from 'mock-fs';
import { directoryReaderFactory } from '../../../src/helpers/input-readers/directory-reader';

describe('Directory reader', () => {
	beforeEach(() =>
		mockFs({
			sameExt: { 'mock1.txt': 'Sample1', 'mock2.txt': 'Sample2' },
			diffExt: { 'mock1.txt': 'Sample1', 'mock2.log': 'Sample2' },
			recursive: {
				'mock1.txt': 'Sample1',
				sub: {
					'mock2.txt': 'Sample2'
				}
			}
		})
	);
	afterEach(() => mockFs.restore());

	it('should resolve with the files in the given directory path.', async () => {
		const files = await directoryReaderFactory({ extension: '.txt', recursive: true }).read('./sameExt');

		expect(files.length).toEqual(2);
		expect(files).toEqual([{ name: 'mock1.txt', content: 'Sample1' }, { name: 'mock2.txt', content: 'Sample2' }]);
	});

	it('should skip the files that dont match the extension given.', async () => {
		const files = await directoryReaderFactory({ extension: '.txt', recursive: true }).read('./diffExt');

		expect(files.length).toEqual(1);
		expect(files).toEqual([{ name: 'mock1.txt', content: 'Sample1' }]);
	});

	it('should not recurse when recursive flag is false.', async () => {
		const files = await directoryReaderFactory({ extension: '.txt', recursive: false }).read('./recursive');

		expect(files.length).toEqual(1);
		expect(files).toEqual([{ name: 'mock1.txt', content: 'Sample1' }]);
	});

	it('should recurse when recursive flag is true.', async () => {
		const files = await directoryReaderFactory({ extension: '.txt', recursive: true }).read('./recursive');

		expect(files.length).toEqual(2);
		expect(files).toEqual([{ name: 'mock1.txt', content: 'Sample1' }, { name: 'mock2.txt', content: 'Sample2' }]);
	});
});
