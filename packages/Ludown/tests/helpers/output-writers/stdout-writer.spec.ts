import { stdoutWriterFactory } from '../../../src/helpers/output-writers/stdout-writer';

describe('Stdout writer', () => {
	const originalStdout = process.stdout.write;
	let buffer;

	beforeEach(() => {
		buffer = '';
		process.stdout.write = data => (buffer = data);
	});

	afterEach(() => (process.stdout.write = originalStdout));

	it('should write to stdout successfuly when content is given', async () => {
		await stdoutWriterFactory().write('New content');

		expect(buffer).toEqual('New content');
	});
});
