#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import * as ajv from 'ajv';
import * as fs from 'fs-extra';
import * as path from 'path';
const http = require('http');
const https = require('https');

export class SchemaTracker {
    /** Map from type name to information about that type. */
    typeToType: Map<string, Type>;

    private validator: ajv.Ajv;

    constructor() {
        this.typeToType = new Map<string, Type>();
        this.validator = new ajv();
    }

    async getValidator(schemaPath: string): Promise<[ajv.ValidateFunction, boolean]> {
        let validator = this.validator.getSchema(schemaPath);
        let added = false;
        if (!validator) {
            let schemaObject = await fs.readJSON(schemaPath);
            added = true;
            if (schemaObject.oneOf) {
                const defRef = "#/definitions/";
                const unionRole = "unionType(";
                let processRole = (role: string, type: Type) => {
                    if (role.startsWith(unionRole)) {
                        role = role.substring(unionRole.length, role.length - 1);
                        let unionType = this.typeToType.get(role);
                        if (!unionType) {
                            unionType = new Type(role);
                            this.typeToType.set(role, unionType);
                        }
                        unionType.addImplementation(type);
                    }
                };
                for (let one of schemaObject.oneOf) {
                    let ref = one.$ref;
                    // NOTE: Assuming schema file format is from httpSchema or we will ignore.
                    // Assumption is that a given type name is the same across different schemas.
                    // All .dialog in one app should use the same app.schema, but if you are using 
                    // a .dialog from another app then it will use its own schema which if it follows the rules
                    // should have globally unique type names.
                    if (ref.startsWith(defRef)) {
                        ref = ref.substring(defRef.length);
                        if (!this.typeToType.get(ref)) {
                            let def = schemaObject.definitions[ref];
                            if (def) {
                                let type = new Type(ref, def);
                                this.typeToType.set(ref, type);
                                if (def.$role) {
                                    if (typeof def.$role === "string") {
                                        processRole(def.$role, type);
                                    } else {
                                        for (let role of def.$role) {
                                            processRole(role, type);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            let metaSchemaName = schemaObject.$schema;
            let metaSchemaCache = path.join(__dirname, path.basename(metaSchemaName));
            let metaSchema: any;
            if (!await fs.pathExists(metaSchemaCache)) {
                try {
                    let metaSchemaDefinition = await this.getURL(metaSchemaName);
                    metaSchema = JSON.parse(metaSchemaDefinition);
                } catch (e) {
                    throw new Error(`Could not parse ${metaSchemaName}`);
                }
                await fs.writeJSON(metaSchemaCache, metaSchema, { spaces: 4 });
            } else {
                metaSchema = await fs.readJSON(metaSchemaCache);
            }
            if (!this.validator.getSchema(metaSchemaName)) {
                this.validator.addSchema(metaSchema, metaSchemaName);
            }
            this.validator.addSchema(schemaObject, schemaPath);
            validator = this.validator.getSchema(schemaPath);
        }
        return [validator, added];
    }

    private async getURL(url: string): Promise<any> {
        return new Promise((resolve, reject) => {

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

/** Information about a type. */
export class Type {
    /** Name of the type. */
    name: string;

    /** Paths to lg properties for concrete types. */
    lgProperties: string[];

    /** Possible types for a union type. */
    implementations: Type[];

    /** Union types this type is part of. */
    unionTypes: Type[];

    constructor(name: string, schema?: any) {
        this.name = name;
        this.lgProperties = [];
        this.implementations = [];
        this.unionTypes = [];
        if (schema) {
            this.walkProps(schema, name);
        }
    }

    addImplementation(type: Type) {
        this.implementations.push(type);
        type.unionTypes.push(this);
    }

    toString(): string {
        return this.name;
    }

    private walkProps(val: any, path: string) {
        if (val.properties) {
            for (let propName in val.properties) {
                let prop = val.properties[propName];
                let newPath = `${path}/${propName}`;
                if (prop.$role === "lg") {
                    this.lgProperties.push(newPath);
                } else if (prop.properties) {
                    this.walkProps(prop, newPath);
                }
            }
        }
    }
}

