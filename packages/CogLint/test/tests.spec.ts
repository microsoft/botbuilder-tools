import 'mocha';
import { expect } from 'chai';
import * as indexer from '../src/cogIndex';
describe('Test .cog indexing library', async () => {
    it('index all', async () => {
        let index = await indexer.index(["test/examples/*.cog"]);
        expect(index.files.length).equal(6);
        expect(index.files.filter((f) => f.errors.length > 0).length).equals(2);
        expect(size(index.allDefinitions())).equal(13);
        expect(size(index.missingDefinitions())).equal(2);
        expect(size(index.multipleDefinitions())).equal(2);
        for (let def of index.allDefinitions()) {
            index.removeDefinition(def);
            verifyRemoved(index, def);
        }
    });
});

function size<T>(iterable: Iterable<T>): number {
    let i = 0;
    let it = iterable[Symbol.iterator]();
    while (!it.next().done)++i;
    return i;
}

function verifyRemoved(index: indexer.DefinitionMap, definition: indexer.Definition) {
    if (definition.id) {
        let defs = index.idTo.get(definition.id);
        if (defs) {
            for (let def of defs) {
                if (definition.compare(def) == 0) {
                    expect.fail(`${definition.toString()} was not removed from idTo.`);
                }
            }
        }
        let types = definition.type ? index.typeTo.get(definition.type) : index.missingTypes;
        if (types) {
            for (let def of types) {
                if (definition.compare(def) == 0) {
                    expect.fail(`${definition.toString()} was not removed from typeTo.`);
                }
            }
        }
        for (let def of index.allDefinitions()) {
            for (let used of def.usedBy) {
                if (definition.compare(used) == 0) {
                    expect.fail(`${definition.toString()} was not removed from usedBy.`);
                }
            }
        }
    }
}