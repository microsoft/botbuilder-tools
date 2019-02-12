import 'mocha';
import {expect} from 'chai';
import * as indexer from '../src/cogIndex';
describe('Test .cog indexing library', async () => {
    it('index all', async () => {
        let index = await indexer.index(["test/examples/*.cog"]);
        expect(index.files.length).equal(6);
        expect(index.files.filter((f) => f.errors.length > 0).length).equals(2);
        expect(size(index.allDefinitions())).equal(13);
        expect(size(index.missingDefinitions())).equal(2);
        expect(size(index.multipleDefinitions())).equal(2);
    });
});

function size<T>(iterable: Iterable<T>) : number {
    let i = 0;
    for(let _x of iterable) {
        ++i;
    }
    return i;
}