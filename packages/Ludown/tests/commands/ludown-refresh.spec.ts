import * as mockFs from 'mock-fs';
import * as ludownRefreshHandler from '../../src/command-handlers/ludown-refresh';
import * as ludownRefresh from '../../src/commands/ludown-refresh';

describe('Ludown refresh', () => {
	let handlerSpy: jasmine.Spy;

	beforeEach(() => {
		handlerSpy = spyOn(ludownRefreshHandler, 'execute');

		mockFs({
			'luis.json': '{}',
			'qna.json': '{}',
			'qnaAlterations.json': '{}',
			outFolder: {}
		});
	});
	afterEach(() => mockFs.restore());

	it('should fire execute function if all required inputs are present', async done => {
		ludownRefresh.mainCommand.execute();
	});
});
