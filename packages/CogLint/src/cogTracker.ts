#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import * as fs from 'fs';
import * as glob from 'globby';
import * as ajv from 'ajv';
import * as path from 'path';

/** Top-level cog definition that would be found in a file. */
export class Cog {
    /** The path to where the cog came from or should be written to. */
    file: string;

    /** Definition of this cog or undefined if file did not parse. */
    definition?: any;

    /** Any errors found in validating definition. */
    errors: Error[];

    constructor(file: string, definition?: object) {
        this.file = file;
        this.definition = definition;
        this.errors = [];
    }

    toString(): string {
        return this.file;
    }

    /** ID of this component which is derived from file name. */
    id(): string {
        return path.basename(this.file, ".cog");
    }
}

/** Definition of a Bot Framework component. */
export class Definition {
    /** $type of the copmonent or undefined. */
    type?: string;

    /** Cog that contains definition. */
    cog?: Cog;

    /** Path within the cog that leads to the component definition. */
    path?: string;

    /** $id of the component if present, otherwise undefined. */
    id?: string;

    /** Where this definition is being used. */
    usedBy: Definition[];

    /**
    * Construct a component definition.
    * @param type The $type of the component.
    * @param id The $id of the component if present.
    * @param cog The cog that contains the definition.
    * @param path The path within the file to the component.
    */
    constructor(type?: string, id?: string, cog?: Cog, path?: string) {
        this.type = type;
        this.id = id;
        this.cog = cog;
        this.path = path;
        this.usedBy = [];
    }

    /** Compare definitions and return -1 for less than, 0 for equals and +1 for greater than. */
    compare(definition: Definition): number {
        let result: number;
        if (this.cog != undefined && this.path != undefined
            && definition.cog != undefined && definition.path != undefined) { // Actual definitions
            if (this.cog === definition.cog) {
                if (this.path === definition.path) {
                    result = 0;
                } else {
                    result = this.path.localeCompare(definition.path);
                }
            } else {
                result = this.cog.id().localeCompare(definition.cog.id());
            }
        } else if (this.cog != undefined && this.path != undefined) {
            result = +1;
        } else if (definition.cog != undefined && definition.path != undefined) {
            result = -1;
        } else if (this.id != undefined && this.type != undefined
            && definition.id != undefined && definition.type != undefined) {
            if (this.id === definition.id) {
                if (this.type === definition.type) {
                    result = 0;
                } else {
                    result = this.type.localeCompare(definition.type);
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
                result += " " + user.locator();
            }
        }
        return result;
    }

    toString(): string {
        return `${this.type}[${this.id || ""}](${this.cog}#${this.path})`;
    }

    locator(): string {
        return `${this.cog}#${this.path}`;
    }
}

/** Tracks cogs and the definitions they contain. */
export class CogTracker {
    /** 
     * Map from $id to the definition.
     * If there are more than one, then it is multiply defined.
     * If any of them are missing cog, then there is a $ref, but no definition.
     */
    idTo: Map<string, Definition[]>;

    /** Map from a type to all instances of that type. */
    typeTo: Map<string, Definition[]>;

    /** Definitions that are missing a $type. */
    missingTypes: Definition[];

    /** Top-level cogs in tracker. */
    cogs: Cog[];

    validator: ajv.Ajv;

    constructor() {
        this.idTo = new Map<string, Definition[]>();
        this.typeTo = new Map<string, Definition[]>();
        this.missingTypes = [];
        this.cogs = [];
        this.validator = new ajv();
    }

    async addCog(body: any, file: string): Promise<Cog> {
        let cog = new Cog(file, body);
        try {
            const schemaFile = body.$schema;
            if (schemaFile) {
                let validator = this.validator.getSchema(schemaFile);
                if (!validator) {
                    let schemaPath = path.join(path.dirname(file), schemaFile);
                    let schemaObject = JSON.parse(fs.readFileSync(schemaPath).toString());
                    this.validator.addSchema(schemaObject, schemaFile);
                    validator = this.validator.getSchema(schemaFile);
                }
                let validation = validator(body, file);
                if (!validation && validator.errors) {
                    for (let err of validator.errors) {
                        cog.errors.push(new Error(`${err.dataPath} ${err.message}`));
                    }
                }
            } else {
                throw new Error(`${file} does not have a $schema.`);
            }
            this.walkJSON(body, "", (elt, path) => {
                if (elt.$type) {
                    this.addDefinition(new Definition(elt.$type, elt.$id, cog, path));
                } else if (elt.$id || elt.$ref) { // Missing type
                    this.addDefinition(new Definition(undefined, elt.$id, cog, path));
                }
                if (elt.$ref) {
                    this.addReference(elt.$ref, new Definition(elt.$type, elt.$id, cog, path));
                }
                return false;
            });
        } catch (e) {
            cog.errors.push(e);
        }
        this.cogs.push(cog);
        return cog;
    }

    async addCogFile(file: string): Promise<Cog> {
        let cog: Cog;
        try {
            cog = await this.addCog(JSON.parse(fs.readFileSync(file).toString()), file);
        } catch (e) {
            // File is not valid JSON
            cog = new Cog(file);
            cog.errors.push(e);
            this.cogs.push(cog);
        }
        return cog;
    }

    /** Add files that match patterns to tracker. */
    async addCogFiles(patterns: string[]): Promise<void> {
        let filePaths = glob.sync(patterns);
        for (let filePath of filePaths) {
            await this.addCogFile(filePath);
        }
    }

    /** Remove cog from tracker. */
    removeCog(cog: Cog) {
        this.cogs = this.cogs.filter((c) => c != cog);
        for (let definition of this.allDefinitions()) {
            if (definition.cog === cog) {
                this.removeDefinition(definition);
            }
        }
        // this.verifyRemoved(this, cog);
    }

    /** All definitions. */
    * allDefinitions(): Iterable<Definition> {
        for (let defs of this.typeTo.values()) {
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
        for (let def of this.idTo.values()) {
            if (def.length > 1) {
                yield def;
            }
        }
    }

    /** Definitions that are referred to through $ref, but are not defined. */
    * missingDefinitions(): Iterable<Definition> {
        for (let defs of this.idTo.values()) {
            for (let def of defs) {
                if (!def.cog) {
                    yield def;
                }
            }
        }
    }

    /** Definitions with ids that are unused. */
    * unusedIDs(): Iterable<Definition> {
        for (let defs of this.idTo.values()) {
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
        if (definition.type && !this.typeTo.has(definition.type)) {
            this.typeTo.set(definition.type, []);
        }
        if (definition.id) {
            let add = true;
            if (this.idTo.has(definition.id)) {
                // Reference already existed, check for consistency
                // Merge if possible, otherwise add
                for (let old of <Definition[]>this.idTo.get(definition.id)) {
                    if (!old.cog && !old.path && old.type == definition.type) {
                        add = false;
                        old.cog = definition.cog;
                        old.path = definition.path;
                        break;
                    }
                }
            } else {
                this.idTo.set(definition.id, []);
            }
            if (add) {
                (<Definition[]>this.idTo.get(definition.id)).push(definition);
                if (definition.type) {
                    (<Definition[]>this.typeTo.get(definition.type)).push(definition);
                } else {
                    this.missingTypes.push(definition);
                }
            }
        } else {
            if (definition.type) {
                (<Definition[]>this.typeTo.get(definition.type)).push(definition);
            } else {
                this.missingTypes.push(definition);
            }
        }
    }

    /**
     * Add reference to a $id.
     * @param id Reference found in $ref.
     * @param source Definition with $ref.
     */
    private addReference(id: string, source: Definition): void {
        if (!this.idTo.has(id)) {
            // ID does not exist so add place holder
            let definition = new Definition(source.type, id);
            this.addDefinition(definition);
            this.idTo.set(id, [definition]);
        }
        for (let idDef of (<Definition[]>this.idTo.get(id))) {
            idDef.usedBy.push(source);
        }
    }

    /** Remove definition from tracker. */
    private removeDefinition(definition: Definition): boolean {
        let found = false;
        if (definition.id && this.idTo.has(definition.id)) {
            // Remove from ids
            const defs = <Definition[]>this.idTo.get(definition.id);
            const newDefs = defs.filter((d) => d.compare(definition) != 0);
            if (newDefs.length == 0) {
                this.idTo.delete(definition.id);
            } else {
                this.idTo.set(definition.id, newDefs);
            }
            found = newDefs.length != defs.length;
        }
        if (definition.type && this.typeTo.has(definition.type)) {
            const defs = <Definition[]>this.typeTo.get(definition.type);
            const newDefs = defs.filter((d) => d.compare(definition) != 0);
            if (newDefs.length == 0) {
                this.typeTo.delete(definition.type);
            } else {
                this.typeTo.set(definition.type, newDefs);
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

    private walkJSON(json: any, path: string, fun: (val: any, path: string) => boolean): boolean {
        let done = fun(json, path);
        if (!done) {
            if (Array.isArray(json)) {
                let i = 0;
                for (let val of json) {
                    done = this.walkJSON(val, `${path}[${i}]`, fun);
                    if (done) break;
                    ++i;
                }
            } else if (typeof json === 'object') {
                for (let val in json) {
                    done = this.walkJSON(json[val], `${path}/${val}`, fun);
                    if (done) break;
                }
            }
        }
        return done;
    }

    /*
    private verifyRemoved(tracker: CogTracker, cog: Cog) {
        for (let def of tracker.allDefinitions()) {
            if (def.cog === cog) {
                console.log(`*** ${def}`);
            }
            for (let used of def.usedBy) {
                if (used.cog === cog) {
                    console.log(`*** used ${used}`);
                }
            }
        }
    }
    */
}

