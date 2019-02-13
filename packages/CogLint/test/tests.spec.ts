import 'mocha';
import { expect } from 'chai';
import * as ct from '../src/cogTracker';

describe('Test .cog indexing library', async () => {
    it('index all', async () => {
        let tracker = new ct.CogTracker();
        await tracker.addCogFiles(["test/examples/*.cog"]);
        expect(tracker.cogs.length).equal(5);
        expect(tracker.cogs.filter((f) => f.errors.length > 0).length).equal(3);
        expect(size(tracker.allDefinitions())).equal(13);
        expect(size(tracker.missingDefinitions())).equal(2);
        expect(size(tracker.multipleDefinitions())).equal(2);
        tracker.writeCogs("test.out/");
        for (let cog of tracker.cogs) {
            tracker.removeCog(cog);
            verifyRemoved(tracker, cog);
        }
    });
});

function size<T>(iterable: Iterable<T>): number {
    let i = 0;
    let it = iterable[Symbol.iterator]();
    while (!it.next().done)++i;
    return i;
}

function verifyRemoved(tracker: ct.CogTracker, cog: ct.Cog) {
    for (let def of tracker.allDefinitions()) {
        expect(def.cog).not.equal(cog);
        for (let used of def.usedBy) {
            expect(used.cog).not.equal(cog);
        }
    }
}