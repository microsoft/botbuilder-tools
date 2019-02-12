import 'mocha';
import {expect} from 'chai';
import * as indexer from '../src/cogIndex';
describe('Test .cog indexing library', async () => {
    it('index all', async () => {
        let result = await indexer.index(["test/examples/*.cog"]);
        expect(result.success).true; 
        let index = result.result;
        expect(size(index.allDefinitions())).is.equal(13);
        expect(size(index.missingDefinitions())).is.equal(2);
        expect(size(index.multipleDefinitions())).is.equal(2);
    });
});

function size<T>(iterable: Iterable<T>) : number {
    let i = 0;
    for(let _x of iterable) {
        ++i;
    }
    return i;
}