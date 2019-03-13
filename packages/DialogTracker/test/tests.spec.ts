#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import * as dt from '../src/DialogTracker';
import { expect } from 'chai';
import * as fs from 'fs-extra';
import glob from 'globby';
import 'mocha';
import * as path from 'path';
let cs = require('Dialogschema/lib/DialogSchema');

describe('Test .dialog indexing library', async () => {
    let schemas = new dt.SchemaTracker();
    let tracker = new dt.DialogTracker(schemas);

    before(async () => {
        // If you want to regenerate the oracle *.schema and *.lg files
        // 1) Run schemas/makeschemas.cmd
        // 2) Run DialogLint examples/*.dialog -w examples/app.lg (or execute "Launch program")
        await fs.remove("test.out");
        await fs.mkdirp("test.out");
        for(let file of await glob(["test/**/*.schema", "test/**/*.lg", "test/**/*.dialog", "test/**/*.cmd"])) {
            await fs.copy(file, path.join("test.out", file.substring(file.indexOf("/") + 1)));
        }
        process.chdir("test.out");
        await fs.remove("examples/app.schema");
        await fs.remove("examples/app.lg");
        await fs.remove("examples/app-en-us.lg");
        await cs.mergeSchemas(["schemas/*.schema"], "examples/app.schema", true);
        await cs.mergeSchemas(["schemas/prompt.schema"], "examples/promptOnly.schema", true);
        tracker.root = process.cwd();
        await tracker.addDialogFiles(["examples/*.dialog"]);
        await tracker.writeLG("examples/app.lg");
    });

    it('index all', () => expect(tracker.dialogs.length).equal(8));

    it('errors', () => expect(tracker.dialogs.filter((f) => f.errors.length > 0).length).equal(3));

    it('definitions', () => expect(size(tracker.allDefinitions())).equal(21));

    it('missing', () => expect(size(tracker.missingDefinitions())).equal(2));

    it('multiple', () => expect(size(tracker.multipleDefinitions())).equal(1));

    it(`types`, () => expect(tracker.schema.typeToType.size).equal(5));

    it('clone', async () => {
        let foo = tracker.cloneDialog("foo");
        expect(foo, "Can't find dialog").to.equal(undefined);
        let original = tracker.findDialog("root");
        expect(original, "Can't find dialog").to.not.equal(undefined);
        let copy = tracker.cloneDialog("root");
        if (original && copy) {
            let len = original.body.recognizers.length;
            copy.body.recognizers.pop();
            expect(len === copy.body.recognizers.length + 1).is.true;
            await tracker.updateDialog(copy);
            let newDialog = tracker.findDialog("root");
            if (newDialog) {
                expect(copy, "Update should be object").is.equal(newDialog);
                expect(newDialog.save, "Saved should be true").is.true;
                verify(tracker);
            } else {
                expect.fail("Did not update");
            }
        } else {
            expect.fail("Can't clone");
        }
    });

    it('write', async () => {
        let savesBefore = size(tracker.dialogs.filter((c) => c.save));
        await tracker.writeDialogs("Dialogs");
        let savesAfter = size(tracker.dialogs.filter((c) => c.save));
        expect(savesAfter).equals(0);
        let saved = 0;
        for(let file of await glob("Dialogs/examples/*.dialog")) {
            let dialog = tracker.findDialogFile(file);
            expect(dialog, `${dialog} is not found as ${file}`).is.not.equal(undefined);
            ++saved;
        }
        expect(saved).equals(savesBefore);
    });

    it('remove', () => {
        for (let dialog of tracker.dialogs) {
            tracker.removeDialog(dialog);
            verifyRemoved(tracker, dialog);
        }
    });

    it('files', async () => {
        for(let file of await glob(["../test/examples/*", "../test/schemas/*"])) {
            let newFile = path.join(process.cwd(), file.substring("../test/".length));
            if (!await fs.pathExists(newFile)) {
                expect.fail(`${newFile} is missing`);
            }
            let contents = (await fs.readFile(file)).toString();
            let newContents = (await fs.readFile(newFile)).toString();
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

function verify(tracker: dt.DialogTracker) {
    for (let def of tracker.allDefinitions()) {
        checkDef(def, tracker);
    }
}

function checkDef(def: dt.Definition, tracker: dt.DialogTracker): void {
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

function findDefinition(definitions: undefined | dt.Definition[], definition: dt.Definition): boolean {
    let ok = false;
    if (definitions) {
        ok = definitions.findIndex((d) => d.compare(definition) == 0) != -1;
    }
    return ok;
}

function verifyRemoved(tracker: dt.DialogTracker, dialog: dt.Dialog) {
    for (let def of tracker.allDefinitions()) {
        expect(def.dialog).not.equal(dialog);
        for (let used of def.usedBy) {
            expect(used.dialog).not.equal(dialog);
        }
    }
}