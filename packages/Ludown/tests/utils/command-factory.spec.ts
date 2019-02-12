import { commandExecuterFactory } from '../../src/utils/command-factory';

describe('Command factory', () => {
    it('should construct object correctly', () => {
        const factory = commandExecuterFactory(() => 'noop');

        expect(factory.execute).toBeDefined();
    });

    it('should call command handler function when defined', () => {
        const spy = jasmine.createSpy('Factory Noop Handler');
        const factory = commandExecuterFactory(spy);

        factory.execute();

        expect(spy).toHaveBeenCalled();
    });
});
