import { expect } from 'chai';
import * as fs from 'fs-extra';
import * as glob from 'globby';
import 'mocha';
import * as ct from '../src/cogTracker';

describe('Test .cog indexing library', async () => {
    let tracker = new ct.CogTracker();
    before(async () => {
        await tracker.addCogFiles(["test/examples/*.cog"]);
    });

    it('index all', () => expect(tracker.cogs.length).equal(6));

    it('errors', () => expect(tracker.cogs.filter((f) => f.errors.length > 0).length).equal(3));

    it('definitions', () => expect(size(tracker.allDefinitions())).equal(18));

    it('missing', () => expect(size(tracker.missingDefinitions())).equal(2));

    it('multiple', () => expect(size(tracker.multipleDefinitions())).equal(1));

    it('clone', () => {
        let foo = tracker.cloneCog("foo");
        expect(foo, "Can't find cog").to.equal(undefined);
        let original = tracker.findCog("root");
        expect(original, "Can't find cog").to.not.equal(undefined);
        let copy = tracker.cloneCog("root");
        if (original && copy) {
            let len = original.body.recognizers.length;
            copy.body.recognizers.pop();
            expect(len === copy.body.recognizers.length + 1).is.true;
            tracker.updateCog(copy);
            let newCog = tracker.findCog("root");
            if (newCog) {
                expect(copy, "Update should be object").is.equal(newCog);
                expect(newCog.save, "Saved should be true").is.true;
                verify(tracker);
            } else {
                expect.fail("Did not update");
            }
        } else {
            expect.fail("Can't clone");
        }
    });

    it('write', async () => {
        await fs.remove("test.out");
        let savesBefore = size(tracker.cogs.filter((c) => c.save));
        await tracker.writeCogs("test.out");
        let savesAfter = size(tracker.cogs.filter((c) => c.save));
        expect(savesAfter).equals(0);
        let saved = 0;
        for(let file of glob.sync("test.out/**/*.cog")) {
            let cog = tracker.findCogFile(file);
            expect(cog, `${cog} is not found as ${file}`).is.not.equal(undefined);
            ++saved;
        }
        expect(saved).equals(savesBefore);
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

function checkDef(def: ct.Definition, tracker: ct.CogTracker): void {
    if (def.id) {
        expect(findDefinition(tracker.idTo.get(def.id), def), `${def} in idTo`).is.true;
    }
    if (def.type) {
        expect(findDefinition(tracker.typeTo.get(def.type), def), `${def} in idType`).is.true;
    } else {
        expect(findDefinition(tracker.missingTypes, def), `${def} in missingTypes`).is.true;
    }
    for (let used of def.usedBy) {
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