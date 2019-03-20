import * as fs from 'fs';
import * as mockFs from 'mock-fs';
import { fileWriterFactory } from '../../../src/helpers/output-writers/file-writer';

describe('File writer', () => {
	beforeEach(() =>
		mockFs({
			mockDir: {
				'mock.txt': 'Sample content'
			}
		})
	);

	it('should write the file successfuly when content is given', async () => {
		await fileWriterFactory('./mockDir', 'mock.txt').write('New content');

		const newContent = fs.readFileSync('./mockDir/mock.txt', { encoding: 'utf-8' });

		expect(newContent).toEqual('New content');
	});
});
