import 'mocha';
import { expect } from 'chai';
import * as ct from '../src/cogTracker';

describe('Test .cog indexing library', async () => {
    let tracker = new ct.CogTracker();
    before(async () => {
        await tracker.addCogFiles(["test/examples/*.cog"]);
    });

    it('index all', () => expect(tracker.cogs.length).equal(6));

    it('errors', () => expect(tracker.cogs.filter((f) => f.errors.length > 0).length).equal(3));

    it('definitions', () => expect(size(tracker.allDefinitions())).equal(19));

    it('missing', () => expect(size(tracker.missingDefinitions())).equal(3));

    it('multiple', () => expect(size(tracker.multipleDefinitions())).equal(1));

    it('clone', () => {
        let foo = tracker.cloneCog("foo");
        expect(foo).to.equal(undefined);
        let copy = tracker.cloneCog("test/examples/root.cog");
        expect(copy).to.not.equal(undefined);
        if (copy) {
            tracker.updateCog(copy);
            verify(tracker);
        }
    });

    it('remove', () => {
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

function verify(tracker: ct.CogTracker) {
    for (let def of tracker.allDefinitions()) {
        checkDef(def, tracker);
    }
}

function checkDef(def: ct.Definition, tracker: ct.CogTracker) : void {
    if (def.id) {
        expect(findDefinition(tracker.idTo.get(def.id), def)).is.true;
    }
    if (def.type) {
        expect(findDefinition(tracker.typeTo.get(def.type), def)).is.true;
    } else {
        expect(findDefinition(tracker.missingTypes, def)).is.true;
    }
    for(let used of def.usedBy) {
        checkDef(used, tracker);
    }
}

function findDefinition(definitions: undefined | ct.Definition[], definition: ct.Definition): boolean {
    let ok = false;
    if (definitions) {
        ok = definitions.findIndex((d) => d.compare(definition) == 0) != -1;
    }
    return ok;
}

function verifyRemoved(tracker: ct.CogTracker, cog: ct.Cog) {
    for (let def of tracker.allDefinitions()) {
        expect(def.cog).not.equal(cog);
        for (let used of def.usedBy) {
            expect(used.cog).not.equal(cog);
        }
    }
}