#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import * as ajv from 'ajv';
import * as fs from 'fs-extra';
import * as glob from 'globby';
import * as path from 'path';
let clone = require('clone');

/** Top-level cog definition that would be found in a file. */
export class Cog {
    /** The path relative to the CogTracker root where the cog came from or should be written to. */
    file: string;

    /** Definition of this cog or undefined if file did not parse. */
    body?: any;

    /** Any errors found in validating definition. */
    errors: Error[];

    /** TRUE if cog should be written, i.e. changed since read. */
    save: boolean;

    id() :string {
        return path.basename(this.file, ".cog");
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
    * @param cog The cog that contains the definition. (undefined for forward reference.)
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
                result = this.cog.file.localeCompare(definition.cog.file);
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
            let id = this.cog ? this.cog.id() : "undefined";
            return `(${id}#${this.path})`;
        }
    }
}

/** Tracks cogs and the definitions they contain. */
export class CogTracker {
    /** Paths will be relative to root directory. */
    root: string;
    
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

    private validator: ajv.Ajv;

    constructor(root?: string) {
        this.root = root || process.cwd();
        this.idTo = new Map<string, Definition[]>();
        this.typeTo = new Map<string, Definition[]>();
        this.missingTypes = [];
        this.cogs = [];
        this.validator = new ajv();
    }

    /** Add a new Cog file to the tracker. */
    async addCog(cog: Cog): Promise<void> {
        try {
            const schemaFile = cog.body.$schema;
            if (schemaFile) {
                let validator = this.validator.getSchema(schemaFile);
                if (!validator) {
                    let schemaPath = path.join(path.dirname(cog.file), schemaFile);
                    let schemaObject = await fs.readJSON(schemaPath);
                    let metaSchemaName = schemaObject.$schema;
                    let metaSchemaCache = path.join(__dirname, path.basename(metaSchemaName));
                    let metaSchema: any;
                    if (!await fs.pathExists(metaSchemaCache)) {
                        metaSchema = JSON.parse(await this.getURL(metaSchemaName));
                        await fs.writeJSON(metaSchemaCache, metaSchema);
                    } else {
                        metaSchema = fs.readJSON(metaSchemaCache);
                    }
                    this.validator.addSchema(metaSchema, metaSchemaName);
                    this.validator.addSchema(schemaObject, schemaFile);
                    validator = this.validator.getSchema(schemaFile);
                }
                let validation = validator(cog.body, cog.file);
                if (!validation && validator.errors) {
                    for (let err of validator.errors) {
                        let path = err.dataPath;
                        if (path.startsWith(cog.file)) {
                            path = path.substring(cog.file.length);
                        }
                        cog.errors.push(new Error(`${path} ${err.message}`));
                    }
                }
            } else {
                cog.errors.push(new Error(`${cog} does not have a $schema.`));
            }
            if (cog.body.$id) {
                cog.errors.push(new Error(`Cog cannot have $id at the root because it is defined by the filename.`))
            }
            cog.body.$id = cog.id();
            this.walkJSON(cog.body, "", (elt, path) => {
                if (elt.$id && !this.isValidID(elt.$id)) {
                    cog.errors.push(new Error(`${elt.$id} is not a valid id.`));
                }
                let id = elt.$id || undefined;
                if (elt.$type) {
                    this.addDefinition(new Definition(elt.$type, id, cog, path));
                } else if (elt.$id || elt.$ref) { // Missing type
                    this.addDefinition(new Definition(undefined, id, cog, path));
                }
                if (elt.$ref) {
                    this.addReference(elt.$ref, new Definition(elt.$type, id, cog, path));
                }
                return false;
            });
            // Assume we will save it and reset this when coming from file
            cog.save = true;
        } catch (e) {
            cog.errors.push(e);
        }
        this.cogs.push(cog);
    }

    /** Read a cog file and add it to the tracker. */
    async addCogFile(file: string): Promise<Cog> {
        let cog: Cog;
        let rel = path.relative(this.root, file);
        try {
            cog = new Cog(rel, await fs.readJSON(rel));
            await this.addCog(cog);
        } catch (e) {
            // File is not valid JSON
            cog = new Cog(rel);
            cog.errors.push(e);
            this.cogs.push(cog);
        }
        cog.save = false;
        return cog;
    }

    /** Add cog files that match patterns to tracker. */
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
    }

    /** Find an existing cog or return undefined. */
    findCog(file: string): undefined | Cog {
        let fullFile = path.resolve(file);
        let result: undefined | Cog;
        for (let cog of this.cogs) {
            if (cog.file === fullFile) {
                result = cog;
                break;
            }
        }
        return result;
    }

    /** Clone an existing cog so you can modify it and then call updateCog. */
    cloneCog(file: string): undefined | Cog {
        let cog = this.findCog(file);
        return cog ? clone(cog, false) : undefined;
    }

    /** Update or add a cog. */
    async updateCog(cog: Cog): Promise<void> {
        let oldCog = this.findCog(cog.file);
        if (oldCog) {
            this.removeCog(oldCog);
        }
        await this.addCog(cog);
    }

    /** Write out cog files with save true and reset the flag. 
     * @param root If present this is the new root and paths below will be relative to process.cwd.
    */
    async writeCogs(root?: string): Promise<void> {
        for (let cog of this.cogs) {
            if (cog.save) {
                let filePath = root ? path.join(path.resolve(root), path.relative(process.cwd(), cog.file)) : cog.file;
                let dir = path.dirname(filePath);
                await fs.mkdirp(dir);
                let oldID = cog.id();
                delete cog.body.$id;
                await fs.writeJSON(filePath, cog.body, { spaces: 4 });
                cog.file = filePath;
                cog.body.$id = oldID;
                cog.save = false;
            }
        }
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
     * @param ref Reference found in $ref.
     * @param source Definition that contains $ref.
     */
    private addReference(ref: string, source: Definition): void {
        let fullRef = this.expandRef(ref, <Cog> source.cog);
        if (!this.idTo.has(fullRef)) {
            // ID does not exist so add place holder
            let definition = new Definition(source.type, fullRef);
            this.addDefinition(definition);
            this.idTo.set(fullRef, [definition]);
        }
        for (let idDef of (<Definition[]>this.idTo.get(fullRef))) {
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

    private isValidID(id: string): boolean {
        let ok = true;
        // NOTE: Could exclude more, including [] and ~ but in our case we are never interpreting as JSON Path.
        const exclude = ['/', '#'];
        for (let ch of id) {
            if (exclude.indexOf(ch) != -1) {
                ok = false;
                break;
            }
        }
        return ok;
    }

    private expandRef(ref: string, cog: Cog): string {
        return ref.startsWith('#') ? `${cog.id()}${ref}` : ref;
    }

    private async getURL(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const http = require('http'),
                https = require('https');
    
            let client = http;
    
            if (url.toString().indexOf("https") === 0) {
                client = https;
            }
    
            client.get(url, (resp: any) => {
                let data = '';
    
                // A chunk of data has been recieved.
                resp.on('data', (chunk: any) => {
                    data += chunk;
                });
    
                // The whole response has been received. 
                resp.on('end', () => {
                    resolve(data);
                });
    
            }).on("error", (err: any) => {
                reject(err);
            });
        });
    };
    
}

