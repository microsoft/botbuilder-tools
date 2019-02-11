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
    /** $type of the copmonent or "" if undefined. */
    type: string;

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
    constructor(type: string, id?: string, file?: string, path?: string) {
        this.type = type || "";
        this.id = id;
        this.file = file;
        this.path = path;
        this.usedBy = [];
    }

    usedByString() : string {
        let result = "";
        if (this.usedBy.length > 0) {
            result = "used by";
            for(let user of this.usedBy) {
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

    constructor() {
        this.idTo = new Map<string, Definition[]>();
        this.typeTo = new Map<string, Array<Definition>>();
    }

    /**
     * Add a new definition to the index.
     * @param type $type of the component.
     * @param id $id of the component.
     * @param file file that defines the component.
     * @param path path within the file for defining the component.
     */
    addDefinition(definition: Definition) {
        if (!this.typeTo.has(definition.type)) {
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
                (<Definition[]>this.typeTo.get(definition.type)).push(definition);
            }
        } else {
            (<Definition[]>this.typeTo.get(definition.type)).push(definition);
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

    /** Component definitions that are missing $type. */
    * missingTypes(): Iterable<Definition> {
        if (this.typeTo.has("")) {
            for(let def of <Definition[]>this.typeTo.get("")) {
                yield def;
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
export async function index(patterns: Array<string>, started?: Started, failed?:Failed): Promise<IndexResult> {
    const result: IndexResult = {
        result: new DefinitionMap(),
        success: true
    };
    if (!started) started = (_file) => {};
    if (!failed) failed = (_error) => true;
    let filePaths = glob.sync(patterns);
    if (filePaths.length == 0) {
        result.success = false;
    } else {
        for (let filePath of filePaths) {
            try {
                started(filePath);
                const schema = JSON.parse(fs.readFileSync(filePath).toString());
                walkSchema(schema, "", (elt, path) => {
                    if (elt.$type) {
                        result.result.addDefinition(new Definition(elt.$type, elt.$id, filePath, path));
                    } else if (elt.$id || elt.$ref) { // Missing type
                        result.result.addDefinition(new Definition("", elt.$id, filePath, path));
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

function walkSchema(schema: any, path: string, fun: (val: any, path: string) => boolean): boolean {
    let done = fun(schema, path);
    if (!done) {
        if (Array.isArray(schema)) {
            let i = 0;
            for (let val of schema) {
                done = walkSchema(val, `${path}[${i}]`, fun);
                if (done) break;
                ++i;
            }
        }
        else if (typeof schema === 'object') {
            for (let val in schema) {
                done = walkSchema(schema[val], `${path}/${val}`, fun);
                if (done) break;
            }
        }
    }
    return done;
}
