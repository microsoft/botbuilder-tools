import * as stdin from 'mock-stdin';
import { stdinReaderFactory } from '../../../src/helpers/input-readers/stdin-reader';

// tslint:disable: no-floating-promises no-unsafe-any
describe('Stdin reader', () => {
	let stdinHandler;

	beforeEach(() => (stdinHandler = stdin.stdin()));

	it('should resolve with the input given in stdin.', async done => {
		stdinReaderFactory()
			.read()
			.then(files => {
				expect(files.length).toEqual(1);
				expect(files[0]).toEqual({
					name: 'stdin',
					content: 'Some text\n'
				});

				done();
			});

		stdinHandler.send('Some text', 'utf-8');
		stdinHandler.end();
	});

	it('should resolve with the multi-line input given in stdin.', async done => {
		stdinReaderFactory()
			.read()
			.then(files => {
				expect(files.length).toEqual(1);
				expect(files[0]).toEqual({
					name: 'stdin',
					content: 'Line 1\nLine 2\n'
				});

				done();
			});

		stdinHandler.send(['Line 1', 'Line 2']);
		stdinHandler.end();
	});
});
