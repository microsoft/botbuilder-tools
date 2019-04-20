#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
export * from './lgTracker';
export * from './schemaTracker';
import * as fs from 'fs-extra';
import glob from 'globby';
import * as lgt from './lgTracker';
import * as path from 'path';
import * as st from './schemaTracker';

let clone = require('clone');

/** Top-level dialog definition that would be found in a file. */
export class Dialog {
    /** The path relative to the DialogTracker root where the dialog came from or should be written to. */
    file: string;

    /** Definition of this dialog or undefined if file did not parse. */
    body?: any;

    /** Any errors found in validating definition. */
    errors: Error[];

    /** TRUE if dialog should be written, i.e. changed since read. */
    save: boolean;

    /** Return the id of the dialog, i.e. the base filename. */
    id(): string {
        return path.basename(this.file, ".dialog");
    }

    /** Base schema for dialog. */
    schema(): string {
        return this.body.$schema;
    }

    constructor(file: string, body?: object) {
        this.file = file;
        if (!path.isAbsolute) {
            throw new Error(`${file} must be an absolute path.`);
        }
        this.body = body;
        this.errors = [];
        this.save = true;
    }

    toString(): string {
        return path.relative(process.cwd(), this.file);
    }
}

/** Definition of a Bot Framework component. */
export class Definition {
    /** $type definition of the copmonent or undefined. */
    type?: st.Type;

    /** dialog that contains definition. */
    dialog?: Dialog;

    /** Path within the dialog that leads to the component definition. */
    path?: string;

    /** $id of the component if present, otherwise undefined. */
    id?: string;

    /** Where this definition is being used. */
    usedBy: Definition[];

    /** ID of definition being copied from. */
    copy?: string;

    /**
    * Construct a component definition.
    * @param type The $type of the component.
    * @param id The $id of the component if present.
    * @param dialog The dialog that contains the definition. (undefined for forward reference.)
    * @param path The path within the file to the component.
    * @param copy The id of the copied definition.
    */
    constructor(type?: st.Type, id?: string, dialog?: Dialog, path?: string, copy?: string) {
        this.type = type;
        this.id = id;
        this.dialog = dialog;
        this.path = path;
        this.copy = copy;
        this.usedBy = [];
    }

    /** Compare definitions and return -1 for less than, 0 for equals and +1 for greater than. */
    compare(definition: Definition): number {
        let result: number;
        if (this.dialog != undefined && this.path != undefined
            && definition.dialog != undefined && definition.path != undefined) { // Actual definitions
            if (this.dialog === definition.dialog) {
                if (this.path === definition.path) {
                    result = 0;
                } else {
                    result = this.path.localeCompare(definition.path);
                }
            } else {
                result = this.dialog.file.localeCompare(definition.dialog.file);
            }
        } else if (this.dialog != undefined && this.path != undefined) {
            result = +1;
        } else if (definition.dialog != undefined && definition.path != undefined) {
            result = -1;
        } else if (this.id != undefined && this.type != undefined
            && definition.id != undefined && definition.type != undefined) {
            if (this.id === definition.id) {
                if (this.type === definition.type) {
                    result = 0;
                } else {
                    result = this.type.name.localeCompare(definition.type.name);
                }
            } else {
                result = this.id.localeCompare(definition.id);
            }
        } else {
            if (this.id != undefined && this.type != undefined) {
                result = -1;
            } else if (definition.id != undefined && definition.type != undefined) {
                result = +1;
            } else {
                result = -1;
            }
        }
        return result;
    }

    usedByString(): string {
        let result = "";
        if (this.usedBy.length > 0) {
            result = "used by";
            for (let user of this.usedBy) {
                result += " " + user.locatorString();
            }
        }
        return result;
    }

    toString(): string {
        return `${this.type}${this.locatorString()}`;
    }

    locatorString(): string {
        if (this.id) {
            return `[${this.id}]`;
        } else {
            return this.pathString();
        }
    }

    pathString(): string {
        let id = this.dialog ? this.dialog.id() : "undefined";
        return `(${id}#${this.path})`;
    }
}

/** Tracks cogs and the definitions they contain. */
export class DialogTracker {
    /** Paths will be relative to root directory. */
    root: string;

    /** Tracker for information about schemas. */
    schema: st.SchemaTracker;

    /** Tracker for LG information. */
    lg: lgt.LGTracker;

    /** 
     * Map from $id to the definition.
     * If there are more than one, then it is multiply defined.
     * If any of them are missing dialog, then there is a $copy, but no definition.
     */
    idToDef: Map<string, Definition[]>;

    /** Map from a type to all instances of that type. */
    typeToDef: Map<string, Definition[]>;

    /** Definitions that are missing a $type. */
    missingTypes: Definition[];

    /** Top-level cogs in tracker. */
    dialogs: Dialog[];

    constructor(schema: st.SchemaTracker, root?: string) {
        this.schema = schema;
        this.lg = new lgt.LGTracker(schema);
        this.root = root || process.cwd();
        this.idToDef = new Map<string, Definition[]>();
        this.typeToDef = new Map<string, Definition[]>();
        this.missingTypes = [];
        this.dialogs = [];
    }

    /** Add a new Dialog file to the tracker. */
    async addDialog(dialog: Dialog): Promise<void> {
        try {
            const schemaFile = dialog.body.$schema;
            if (schemaFile) {
                let schemaPath = path.join(path.dirname(dialog.file), schemaFile);
                let [validator, added] = await this.schema.getValidator(schemaPath);
                let validation = validator(dialog.body, dialog.file);
                if (!validation && validator.errors) {
                    for (let err of validator.errors) {
                        let path = err.dataPath;
                        if (path.startsWith(dialog.file)) {
                            path = path.substring(dialog.file.length);
                        }
                        dialog.errors.push(new Error(`${path} ${err.message}`));
                    }
                }
                if (added) {
                    // Add .lg files from schema
                    let pattern = path.join(path.dirname(schemaPath), path.basename(schemaPath, ".schema") + "*.lg");
                    await this.lg.addLGFiles([pattern]);
                }
            } else {
                dialog.errors.push(new Error(`${dialog} does not have a $schema.`));
            }
            if (dialog.body.$id) {
                dialog.errors.push(new Error(`dialog cannot have $id at the root because it is defined by the filename.`))
            }
            // Expand $id to include root dialog
            walkJSON(dialog.body, "", (elt) => {
                if (elt.$id) {
                    elt.$id = dialog.id() + "#" + elt.$id;
                }
                return false;
            });
            dialog.body.$id = dialog.id();
            walkJSON(dialog.body, "", (elt, path) => {
                if (elt.$type) {
                    let def = new Definition(this.schema.typeToType.get(elt.$type), elt.$id, dialog, path, elt.$copy);
                    this.addDefinition(def);
                    if (elt.$copy) {
                        this.addReference(elt.$copy, def);
                    }
                } else if (elt.$id || elt.$copy) { // Missing type
                    this.addDefinition(new Definition(undefined, elt.$id, dialog, path, elt.$copy));
                }
                return false;
            });
            // Ensure we have templates for this specific dialog
            if (dialog.id()) {
                let type = this.schema.typeToType.get(dialog.body.$type);
                if (type) {
                    for (let fullName of type.lgProperties) {
                        let propName = dialog.id() + fullName.substring(fullName.indexOf("/")).replace(/\//g, '.');
                        this.lg.addTemplate(new lgt.Template(propName, undefined, ""))
                    }
                }
            }
            // Assume we will save it and reset this when coming from file
            dialog.save = true;
        } catch (e) {
            dialog.errors.push(e);
        }
        this.dialogs.push(dialog);
    }

    /** Read a dialog file and add it to the tracker. */
    async addDialogFile(file: string): Promise<Dialog> {
        let dialog: Dialog;
        let rel = path.relative(this.root, file);
        try {
            dialog = new Dialog(rel, await fs.readJSON(rel));
            await this.addDialog(dialog);
        } catch (e) {
            // File is not valid JSON
            dialog = new Dialog(rel);
            dialog.errors.push(e);
            this.dialogs.push(dialog);
        }
        dialog.save = false;
        return dialog;
    }

    /** Add dialog files that match patterns to tracker. */
    async addDialogFiles(patterns: string[]): Promise<void> {
        let filePaths = await glob(patterns);
        for (let filePath of filePaths) {
            await this.addDialogFile(filePath);
        }
    }

    /** Remove dialog from tracker. */
    removeDialog(dialog: Dialog) {
        this.dialogs = this.dialogs.filter((c) => c != dialog);
        for (let definition of this.allDefinitions()) {
            if (definition.dialog === dialog) {
                this.removeDefinition(definition);
            }
        }
    }

    /** Find an existing dialog or return undefined. */
    findDialog(id: string): undefined | Dialog {
        let result: undefined | Dialog;
        for (let dialog of this.dialogs) {
            if (dialog.id() === id) {
                result = dialog;
                break;
            }
        }
        return result;
    }

    /** Find the dialog corresponding to a file path. */
    findDialogFile(file: string): undefined | Dialog {
        return this.findDialog(path.basename(file, ".dialog"));
    }

    /** Clone an existing dialog so you can modify it and then call updateDialog. */
    cloneDialog(file: string): undefined | Dialog {
        let dialog = this.findDialog(file);
        return dialog ? clone(dialog, false) : undefined;
    }

    /** Update or add a dialog. */
    async updateDialog(dialog: Dialog): Promise<void> {
        let oldDialog = this.findDialog(dialog.id());
        if (oldDialog) {
            this.removeDialog(oldDialog);
        }
        await this.addDialog(dialog);
    }

    /** Write out dialog files with save true and reset the flag. 
     * @param root If present this is the new root and paths below will be relative to process.cwd.
    */
    async writeDialogs(root?: string): Promise<void> {
        for (let dialog of this.dialogs) {
            if (dialog.save) {
                let filePath = root ? path.join(path.resolve(root), path.relative(process.cwd(), dialog.file)) : dialog.file;
                let dir = path.dirname(filePath);
                await fs.mkdirp(dir);
                let oldID = dialog.id();
                delete dialog.body.$id;
                await fs.writeJSON(filePath, dialog.body, { spaces: 4 });
                dialog.file = path.relative(process.cwd(), filePath);
                dialog.body.$id = oldID;
                dialog.save = false;
            }
        }
    }

    /** Update .lg files based on current state. */
    async writeLG(basePath: string, log?: (msg: string) => void) {
        this.lg.writeFiles(basePath, undefined, log);
    }

    /** All definitions. */
    * allDefinitions(): Iterable<Definition> {
        for (let defs of this.typeToDef.values()) {
            for (let def of defs) {
                yield def;
            }
        }
        for (let def of this.missingTypes) {
            yield def;
        }
    }

    /** Definitions that try to define the same $id. */
    * multipleDefinitions(): Iterable<Definition[]> {
        for (let def of this.idToDef.values()) {
            if (def.length > 1) {
                let type = def[0].type;
                if (!def.find((d) => d.type != type)) {
                    yield def;
                }
            }
        }
    }

    /** Definitions that are referred to through $copy, but are not defined. */
    * missingDefinitions(): Iterable<Definition> {
        for (let defs of this.idToDef.values()) {
            for (let def of defs) {
                if (!def.dialog) {
                    yield def;
                }
            }
        }
    }

    /** Definitions with ids that are unused. */
    * unusedIDs(): Iterable<Definition> {
        for (let defs of this.idToDef.values()) {
            for (let def of defs) {
                if (def.usedBy.length == 0) {
                    yield def;
                }
            }
        }
    }

    /** Add a new definition to the tracker.
    * The definition might be a forward reference.
    */
    private addDefinition(definition: Definition) {
        if (definition.type && !this.typeToDef.has(definition.type.name)) {
            this.typeToDef.set(definition.type.name, []);
        }
        if (definition.id) {
            let add = true;
            if (this.idToDef.has(definition.id)) {
                // Reference already existed, check for consistency
                // Merge if possible, otherwise add
                for (let old of <Definition[]>this.idToDef.get(definition.id)) {
                    if (!old.dialog && !old.path && old.type === definition.type) {
                        add = false;
                        old.dialog = definition.dialog;
                        old.path = definition.path;
                        break;
                    }
                }
            } else {
                this.idToDef.set(definition.id, []);
            }
            if (add) {
                (<Definition[]>this.idToDef.get(definition.id)).push(definition);
                if (definition.type) {
                    (<Definition[]>this.typeToDef.get(definition.type.name)).push(definition);
                } else {
                    this.missingTypes.push(definition);
                }
            }
        } else {
            if (definition.type) {
                (<Definition[]>this.typeToDef.get(definition.type.name)).push(definition);
            } else {
                this.missingTypes.push(definition);
            }
        }
    }

    /**
     * Add reference to a $id.
     * @param ref Reference found in $copy.
     * @param source Definition that contains $copy.
     */
    private addReference(ref: string, source: Definition): void {
        let fullRef = this.expandRef(ref, <Dialog>source.dialog);
        if (!this.idToDef.has(fullRef)) {
            // ID does not exist so add place holder
            let definition = new Definition(source.type, fullRef);
            this.addDefinition(definition);
            this.idToDef.set(fullRef, [definition]);
        }
        let copyDef = (<Definition[]>this.idToDef.get(fullRef));
        for (let idDef of copyDef) {
            idDef.usedBy.push(source);
        }
    }

    /** Remove definition from tracker. */
    private removeDefinition(definition: Definition): boolean {
        let found = false;
        if (definition.id && this.idToDef.has(definition.id)) {
            // Remove from ids
            const defs = <Definition[]>this.idToDef.get(definition.id);
            const newDefs = defs.filter((d) => d.compare(definition) != 0);
            if (newDefs.length == 0) {
                this.idToDef.delete(definition.id);
            } else {
                this.idToDef.set(definition.id, newDefs);
            }
            found = newDefs.length != defs.length;
        }
        if (definition.type && this.typeToDef.has(definition.type.name)) {
            const defs = <Definition[]>this.typeToDef.get(definition.type.name);
            const newDefs = defs.filter((d) => d.compare(definition) != 0);
            if (newDefs.length == 0) {
                this.typeToDef.delete(definition.type.name);
            } else {
                this.typeToDef.set(definition.type.name, newDefs);
            }
            found = found || newDefs.length != defs.length;
        } else {
            // Remove from missing types
            let newDefs = this.missingTypes.filter((d) => d.compare(definition) != 0);
            found = found || newDefs.length != this.missingTypes.length;
            this.missingTypes = newDefs;
        }
        // Remove from all usedBy.
        for (let def of this.allDefinitions()) {
            def.usedBy = def.usedBy.filter((d) => d.compare(definition) != 0);
        }
        return found;
    }

    private expandRef(ref: string, dialog: Dialog): string {
        return ref.startsWith('#') ? `${dialog.id()}${ref}` : ref;
    }
}

function walkJSON(json: any, path: string, fun: (val: any, path: string) => boolean): boolean {
    let done = fun(json, path);
    if (!done) {
        if (Array.isArray(json)) {
            let i = 0;
            for (let val of json) {
                done = walkJSON(val, `${path}[${i}]`, fun);
                if (done) break;
                ++i;
            }
        } else if (typeof json === 'object') {
            for (let val in json) {
                done = walkJSON(json[val], `${path}/${val}`, fun);
                if (done) break;
            }
        }
    }
    return done;
}

