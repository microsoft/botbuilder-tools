#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import * as fs from 'fs-extra';
import * as glob from 'globby';
import * as os from 'os';
import * as path from 'path';
import * as readline from 'readline';
import * as st from './schemaTracker';

export class LGFile {
    file: string;
    templates: Template[];

    constructor(file: string) {
        this.file = file;
        this.templates = [];
    }

    toString(): string {
        return path.basename(this.file, ".schema");
    }

    locale(): string {
        let filename = path.basename(this.file, ".lg");
        let start = filename.indexOf("-");
        return start === -1 ? "" : filename.substring(filename.indexOf("-") + 1);
    }
}

export class Template {
    name: string;
    locale: string;
    file?: LGFile;
    line?: number;
    contents?: string;

    constructor(name: string, locale: string, contents?: string, file?: LGFile, line?: number) {
        this.name = name;
        this.locale = locale;
        this.file = file;
        this.line = line;
        this.contents = contents;
        if (file) {
            file.templates.push(this);
        }
    }

    equalContents(other: Template): boolean {
        return this.contents === other.contents;
    }

    toString(): string {
        return `${this.file}:${this.name}`;
    }
}

export class LGTracker {
    /** Files that have been added to the tracker. */
    files: LGFile[];

    /** Hierarchical object with $templates at leaves. */
    index: any;

    schema: st.schemaTracker;

    constructor(schema?: st.schemaTracker) {
        this.files = [];
        this.index = {};
        if (schema) {
            this.schema = schema;
            for (let type of schema.typeToType.values()) {
                for (let name of type.lgProperties) {
                    let fullName = name.replace('/', '.');
                    this.addTemplate(new Template(fullName, ""));
                }
            }
        } else {
            this.schema = new st.schemaTracker();
        }
    }


    addTemplate(template: Template) {
        let locale = template.locale;
        if (!this.index.hasOwnProperty(locale)) {
            this.index[locale] = {};
        }
        let root = this.index[locale];
        let pathName = template.name ? template.name.split('.') : "";
        for (let pos = 0; pos < pathName.length; ++pos) {
            let name = pathName[pos];
            if (!root.hasOwnProperty(name)) {
                root[name] = {};
            }
            root = root[name];
        }
        if (!root.hasOwnProperty("$templates")) {
            root.$templates = [];
        }
        if (root.$templates.length == 1 && root.$templates[0].definition === undefined) {
            root.$templates.pop();
        }
        root.$templates.push(template);
    }

    /** Add LG file to tracker.  */
    async addLGFile(lgPath: string, log?: (msg: string) => void): Promise<void> {
        if (!log) log = (_msg) => {};
        log(`Adding ${lgPath}`);
        let file = new LGFile(lgPath)
        let namePath: string[] = [];
        let indent = 1;
        let lineNum = 0;
        let definition = "";
        return this.readLines(lgPath,
            (line) => {
                if (line.startsWith('#')) {
                    if (definition) {
                        this.addTemplate(new Template(this.pathToName(namePath), file.locale(), definition, file, lineNum));
                        definition = "";
                    }
                    let pos = 1;
                    while (line.length > pos && line[pos] === "#") {
                        ++pos;
                    }
                    while (pos < indent) {
                        namePath.pop();
                        --indent;
                    }
                    while (pos > indent) {
                        namePath.push(".");
                        ++indent;
                    }
                    let templateName = line.substring(pos).trim();
                    let templatePath = templateName.split('.');
                    for (let name of templatePath) {
                        namePath.push(name);
                        ++indent;
                    }
                } else {
                    definition += line + os.EOL;
                }
                ++lineNum;
            },
            () => {
                if (definition) {
                    this.addTemplate(new Template(this.pathToName(namePath), file.locale(), definition, file, lineNum));
                }
                this.files.push(file);
            });
    }

    /** Add all LG files matching glob patterns to tracker. */
    async addLGFiles(patterns: string[], log?: (msg: string) => void): Promise<void> {
        for (let path of await glob(patterns)) {
            await this.addLGFile(path, log);
        }
    }

    async writeFiles(basePath: string, flat?: boolean, log?: (name: string) => void): Promise<void> {
        if (!log) log = (_name) => { };
        for (let key in this.index) {
            let filename = path.join(path.dirname(basePath), path.basename(basePath, ".lg") + (key ? `-${key}` : "") + ".lg");
            if (await fs.pathExists(filename)) {
                log(`Merging existing ${filename}`);
                let old = new LGTracker(this.schema);
                await old.addLGFile(filename);
                this.union(old, true);
            }
            log(`Writing ${filename}`);
            let [contents] = this.buildContents(this.index[key], 1, flat);
            await fs.outputFile(filename, contents);
        }
    }

    /** Union templates into this one. */
    union(other: LGTracker, front: boolean): void {
        this.unionR(this.index, other.index, front);
        this.files.push.apply(other.files);
    }

    /** Subtract templates from this one. */
    diff(other: LGTracker): void {
        this.diffR(this.index, other.index);
    }

    private buildContents(val: any, depth: number, flat?: boolean): [string, boolean] {
        let contents = "";
        let hasTemplate = false;
        for (let key in val) {
            if (key === "$templates") {
                if (val.$templates.length > 0) {
                    let template = val.$templates[0];
                    if (flat && template.name) {
                        contents += `# ${template.name}${os.EOL}`;
                    }
                    contents += template.contents || os.EOL;
                    hasTemplate = true;
                }
            } else {
                let [childContents, childTemplate] = this.buildContents(val[key], depth + 1, flat);
                if (childTemplate) {
                    if (flat) {
                        contents += childContents;
                    } else {
                        contents += `${"#".repeat(depth)} ${key}${os.EOL}${childContents}`;
                    }
                    hasTemplate = true;
                }
            }
        }
        return [contents, hasTemplate];
    }

    private diffR(current: any, other: any): boolean {
        let remove = true;
        for (let key in other) {
            if (current.hasOwnProperty(key)) {
                let oldVal = current[key];
                let newVal = other[key];
                if (key === "$templates") {
                    this.diffTemplates(oldVal, newVal);
                    remove = remove && current.$templates.length == 0;
                } else {
                    if (!this.diffR(oldVal, newVal)) {
                        remove = false;
                    } else {
                        delete current[key];
                    }
                }
            }
        }
        return remove;
    }

    private unionR(current: any, other: any, front?: boolean) {
        for (let key in other) {
            if (!current.hasOwnProperty(key)) {
                current[key] = other[key];
            } else {
                let oldVal = current[key];
                let newVal = other[key];
                if (key === "$templates") {
                    this.mergeTemplates(oldVal, newVal, front);
                } else {
                    this.unionR(oldVal, newVal, front);
                }
            }
        }
    }

    private mergeTemplates(current: Template[], other: Template[], front?: boolean) {
        if (current.length == 1 && !current[0].contents) {
            // Remove empty definition
            current.shift();
        }
        for (let newTemplate of other) {
            let found = false;
            for (let oldTemplate of current) {
                if (newTemplate.equalContents(oldTemplate)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                if (front) {
                    current.unshift(newTemplate);
                } else {
                    current.push(newTemplate);
                }
            }
        }
    }

    private diffTemplates(current: Template[], other: Template[]) {
        for (let newTemplate of other) {
            let pos = 0;
            for (let oldTemplate of current) {
                if (newTemplate.equalContents(oldTemplate)) {
                    current.splice(pos, 1);
                    break;
                }
            }
        }
    }


    private pathToName(pathName: string[]): string {
        let name = pathName[0];
        for (let i = 1; i < pathName.length; ++i) {
            name = name + "." + pathName[i];
        }
        return name;
    }

    private readLines(path: string, lineFun: (line: string) => void, closeFun?: () => void): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let lineReader = readline.createInterface({
                input: fs.createReadStream(path)
            });
            lineReader.on('line', (line) => {
                try {
                    lineFun(line);
                } catch (e) {
                    reject(e);
                }
            });
            lineReader.on('close', () => {
                if (closeFun) closeFun();
                resolve();
            });
        });
    }
}
