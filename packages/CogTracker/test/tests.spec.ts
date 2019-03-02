#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import * as ct from '../src/cogTracker';
import { expect } from 'chai';
import * as fs from 'fs-extra';
import * as glob from 'globby';
import 'mocha';
import * as path from 'path';
import * as cs from 'cogschema';

describe('Test .cog indexing library', async () => {
    let schemas = new ct.SchemaTracker();
    let tracker = new ct.CogTracker(schemas);

    before(async () => {
        // If you want to regenerate the oracle *.schema and *.lg files
        // 1) Run schemas/makeschemas.cmd
        // 2) Run cogLint examples/*.cog -w examples/app.lg (or execute "Launch program")
        await fs.remove("test.out");
        await fs.mkdirp("test.out");
        for(let file of glob.sync(["test/**/*.schema", "test/**/*.lg", "test/**/*.cog", "test/**/*.cmd"])) {
            await fs.copy(file, path.join("test.out", file.substring(file.indexOf("/") + 1)));
        }
        process.chdir("test.out");
        await fs.remove("examples/app.schema");
        await fs.remove("examples/app.lg");
        await fs.remove("examples/app-en-us.lg");
        await fs.remove("examples/app.flat.lg");
        await fs.remove("examples/app.flat-en-us.lg");
        await cs.mergeSchemas(["schemas/*.schema"], "examples/app.schema", false);
        await cs.mergeSchemas(["schemas/prompt.schema"], "examples\promptOnly.schema", false);
        await cs.mergeSchemas(["schemas/*.schema"], "examples/app.flat.schema", true);
        tracker.root = process.cwd();
        await tracker.addCogFiles(["examples/*.cog"]);
        await tracker.writeLG("examples/app.lg");
    });

    it('index all', () => expect(tracker.cogs.length).equal(8));

    it('errors', () => expect(tracker.cogs.filter((f) => f.errors.length > 0).length).equal(3));

    it('definitions', () => expect(size(tracker.allDefinitions())).equal(21));

    it('missing', () => expect(size(tracker.missingDefinitions())).equal(2));

    it('multiple', () => expect(size(tracker.multipleDefinitions())).equal(1));

    it(`types`, () => expect(tracker.schema.typeToType.size).equal(5));

    it('clone', async () => {
        let foo = tracker.cloneCog("foo");
        expect(foo, "Can't find cog").to.equal(undefined);
        let original = tracker.findCog("root");
        expect(original, "Can't find cog").to.not.equal(undefined);
        let copy = tracker.cloneCog("root");
        if (original && copy) {
            let len = original.body.recognizers.length;
            copy.body.recognizers.pop();
            expect(len === copy.body.recognizers.length + 1).is.true;
            await tracker.updateCog(copy);
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
        let savesBefore = size(tracker.cogs.filter((c) => c.save));
        await tracker.writeCogs("cogs");
        let savesAfter = size(tracker.cogs.filter((c) => c.save));
        expect(savesAfter).equals(0);
        let saved = 0;
        for(let file of glob.sync("cogs/examples/*.cog")) {
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

    it('files', async () => {
        for(let file of glob.sync(["../test/examples/*", "../test/schemas/*"])) {
            let newFile = path.join(process.cwd(), file.substring("../test/".length));
            if (!await fs.pathExists(newFile)) {
                expect.fail(`${newFile} is missing`);
            }
            let contents = (await fs.readFile(file)).toString();
            let newContents = (await fs.readFile(newFile)).toString();
            expect
            expect(newContents === contents, `${newFile} has changed`).is.true;
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
        expect(findDefinition(tracker.idToDef.get(def.id), def), `${def} in idTo`).is.true;
    }
    if (def.type) {
        expect(findDefinition(tracker.typeToDef.get(def.type.name), def), `${def} in idType`).is.true;
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