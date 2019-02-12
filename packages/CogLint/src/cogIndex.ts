#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import * as fs from 'fs';
import * as glob from 'globby';

/** Definition of a Bot Framework component. */
export class Definition {
    /** $type of the copmonent or undefined. */
    type?: string;

    /** Path to the file that contains the component definition. */
    file?: string;

    /** Path within the file that leads to the component definition. */
    path?: string;

    /** $id of the component if present, otherwise undefined. */
    id?: string;

    /** Where this definition is being used. */
    usedBy: Definition[];

    /**
    * Construct a component definition.
    * @param type The $type of the component.
    * @param id The $id of the component if present.
    * @param file The file that defines the component.
    * @param path The path within the file to the component.
    */
    constructor(type?: string, id?: string, file?: string, path?: string) {
        this.type = type;
        this.id = id;
        this.file = file;
        this.path = path;
        this.usedBy = [];
    }

    compare(definition: Definition): number {
        let result : number;
        if (this.file && this.path && definition.file && definition.path) { // Actual definitions
            if (this.file === definition.file) {
                if (this.path === definition.path) {
                    result = 0;
                } else {
                    result = this.path.localeCompare(definition.path);
                }
            } else {
                result = this.file.localeCompare(definition.file);
            }
        } else if (this.file && this.path) {
            result = -1;
        } else if (definition.file && definition.path) {
            result = +1;
        } else if (this.id && this.type && definition.id && definition.type) {
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
            if (this.id && this.type) {
                result = -1;
            } else if (definition.id && definition.type) {
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
        return `${this.type}[${this.id || ""}](${this.file}#${this.path})`;
    }

    locator(): string {
        return `${this.file}#${this.path}`;
    }
}

/** Maps from $id to definition and $type to definition */
export class DefinitionMap {
    /** 
     * Map from $id to the definition.
     * If there are more than one, then it is multiply defined.
     * If any of them are missing file and path then there is a $ref, but no definition.
     */
    idTo: Map<string, Definition[]>;

    /** Map from a type to all components of that type. */
    typeTo: Map<string, Definition[]>;

    /** Definitions that are missing a $type. */
    missingTypes: Definition[];

    constructor() {
        this.idTo = new Map<string, Definition[]>();
        this.typeTo = new Map<string, Array<Definition>>();
        this.missingTypes = [];
    }

    /**
     * Add a new definition to the index.
     * @param type $type of the component.
     * @param id $id of the component.
     * @param file file that defines the component.
     * @param path path within the file for defining the component.
     */
    addDefinition(definition: Definition) {
        if (definition.type && !this.typeTo.has(definition.type)) {
            this.typeTo.set(definition.type, []);
        }
        if (definition.id) {
            let add = true;
            if (this.idTo.has(definition.id)) {
                // Reference already existed, check for consistency
                // Merge if possible, otherwise add
                for (let old of <Definition[]>this.idTo.get(definition.id)) {
                    if (!old.file && !old.path && old.type == definition.type) {
                        add = false;
                        old.file = definition.file;
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
    addReference(id: string, source: Definition): void {
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

    /**
     * Remove definition from map.
     * @param definition Definition to remove.
     */
    removeDefinition(definition: Definition): boolean {
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
            let newDefs = this.missingTypes.filter((d) => d.compare(definition) == 0);
            found = found || newDefs.length != this.missingTypes.length;
        }
        // Remove from all usedBy.
        for(let def of this.allDefinitions()) {
            def.usedBy = def.usedBy.filter((d) => d.compare(definition) != 0);
        }
        return found;
    }

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
                if (!def.file) {
                    yield def;
                }
            }
        }
    }
}

/** Result of indexing files. */
export interface IndexResult {
    /** Resulting index map. */
    result: DefinitionMap;
    /** true if all files were parsed correcly. */
    success: boolean;
}

export type Started = (file: string) => void;
export type Failed = (error: Error) => boolean;

/**
 * Index JSON files using $type, $id and $ref.
 * @param patterns Glob patterns for files to analyze.
 * @param started Callback called as each file starts.
 * @param failed Callback called if file analysis fails.  
 */
export async function index(patterns: Array<string>, started?: Started, failed?: Failed): Promise<IndexResult> {
    const result: IndexResult = {
        result: new DefinitionMap(),
        success: true
    };
    if (!started) started = (_file) => { };
    if (!failed) failed = (_error) => true;
    let filePaths = glob.sync(patterns);
    if (filePaths.length == 0) {
        result.success = false;
    } else {
        for (let filePath of filePaths) {
            try {
                started(filePath);
                const schema = JSON.parse(fs.readFileSync(filePath).toString());
                walkJSON(schema, "", (elt, path) => {
                    if (elt.$type) {
                        result.result.addDefinition(new Definition(elt.$type, elt.$id, filePath, path));
                    } else if (elt.$id || elt.$ref) { // Missing type
                        result.result.addDefinition(new Definition(undefined, elt.$id, filePath, path));
                    }
                    if (elt.$ref) {
                        result.result.addReference(elt.$ref, new Definition(elt.$type, elt.$id, filePath, path));
                    }
                    return false;
                });
            } catch (e) {
                if (!failed(e)) break;
                result.success = false;
            }
        }
    }
    return result;
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
