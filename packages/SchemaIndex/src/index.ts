#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import * as fs from 'fs';
import * as glob from 'globby';

export class Definition {
    type: string;
    file?: string;
    path?: string
    id?: string;
    usedBy: Definition[];

    constructor(type: string, id?: string, file?: string, path?: string) {
        this.type = type;
        this.id = id;
        this.file = file;
        this.path = path;
        this.usedBy = [];
    }

    toString() : string {
        return `${this.type}[${this.id || ""}](${this.file}#${this.path})`;
    }

    locator(): string {
        return `${this.file}#${this.path}`;
    }
}

export class DefinitionMap {
    idTo: Map<string, Definition>;
    typeTo: Map<string, Definition[]>;

    constructor() {
        this.idTo = new Map<string, Definition>();
        this.typeTo = new Map<string, Array<Definition>>();
    }

    addDefinition(type: string, id?: string, file?: string, path?: string, logger?: Logger): boolean {
        const definition = new Definition(type, id, file, path);
        let success = true;
        if (!logger) logger = (_kind, _msg) => { };
        if (!this.typeTo.has(definition.type)) {
            this.typeTo.set(definition.type, []);
        }
        if (definition.id) {
            if (this.idTo.has(definition.id)) {
                // Reference already existed, check for consistency
                let old = <Definition>this.idTo.get(definition.id);
                if (old.file || old.path) {
                    logger(MsgKind.error, `${id} is defined in both ${old.file}#${old.path} and ${definition.file}#${definition.path}`);
                    success = false;
                }
                if (old.type != definition.type) {
                    logger(MsgKind.error, `${id} is referred to as ${old.type} and defined as ${definition.type}`);
                    success = false;
                }
                if (success) {
                    old.file = definition.file;
                    old.path = definition.path;
                }
            } else {
                this.idTo.set(definition.id, definition);
                (<Definition[]>this.typeTo.get(definition.type)).push(definition);
            }
        } else {
            (<Definition[]>this.typeTo.get(definition.type)).push(definition);
        }
        return success;
    }

    addReference(id: string, source: Definition): void {
        if (!this.idTo.has(id)) {
            // ID does not exist so add place holder
            let definition = new Definition(source.type, id);
            this.idTo.set(id, definition);
            (<Definition[]>this.typeTo.get(source.type)).push(definition);
        }
        (<Definition>this.idTo.get(id)).usedBy.push(source);
    }

    * missingDefinitions() : Iterable<Definition> {
        for(let def of this.idTo.values()) {
            if (!def.file) {
                yield def;
            }
        }
    }

    * missingTypes() : Iterable<Definition> {
        return this.typeTo.get("");
    }
}

export interface IResult<T> {
    result: T;
    success: boolean;
}

export const enum MsgKind {
    msg,
    warning,
    error
}

export type Logger = (kind: MsgKind, msg: string) => void;

export async function index(patterns: Array<string>, logger?: Logger): Promise<IResult<DefinitionMap>> {
    const result: IResult<DefinitionMap> = {
        result: new DefinitionMap(),
        success: true
    };
    if (!logger) logger = (_kind, _msg) => { };
    try {
        let filePaths = glob.sync(patterns);
        if (filePaths.length == 0) {
            result.success = false;
        } else {
            for (let filePath of filePaths) {
                logger(MsgKind.msg, `parsing: ${filePath}`);
                const schema = JSON.parse(fs.readFileSync(filePath).toString());
                walkSchema(schema, "", (elt, path) => {
                    if (elt.$type) {
                        result.result.addDefinition(elt.$type, elt.$id, filePath, path, logger);
                    } else if (elt.$id) {
                        result.result.addDefinition("", elt.$id, filePath, path, logger);
                    }
                    if (elt.$ref) {
                        result.result.addReference(elt.$ref, new Definition(elt.$type || "", elt.$id, filePath, path));
                    }
                    return false;
                });
            }
        }
    } catch (e) {
        logger(MsgKind.error, e.message);
        result.success = false;
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
