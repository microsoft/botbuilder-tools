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
        return filename.substring(filename.indexOf("-") + 1);
    }
}

export class Template {
    file: LGFile;
    name: string;
    line: number;
    contents: string;

    constructor(file: LGFile, name: string, line: number, definition: string) {
        this.file = file;
        this.name = name;
        this.line = line;
        this.contents = definition;
        file.templates.push(this);
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

    constructor() {
        this.files = [];
        this.index = {};
    }

    /** Add LG file to tracker.  */
    async addLGFile(lgPath: string): Promise<void> {
        let file = new LGFile(lgPath)
        let namePath: string[] = [];
        let indent = 1;
        let lineNum = 0;
        let definition = "";
        this.readLines(lgPath,
            (line) => {
                if (line.startsWith('#')) {
                    if (definition) {
                        this.addTemplate(file, namePath, lineNum, definition);
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
                    this.addTemplate(file, namePath, lineNum, definition);
                }
            });
    }

    /** Add all LG files matching glob patterns to tracker. */
    async addLGFiles(patterns: string[]): Promise<void> {
        for (let path of await glob(patterns)) {
            await this.addLGFile(path);
        }
    }

    async writeFiles(basePath: string, flat?: boolean): Promise<void> {
        for (let key in this.index) {
            let filename = path.join(path.dirname(basePath), path.basename(basePath, ".lg") + (key ? `-${key}` : "") + ".lg");
            let [contents, hasTemplate] = this.buildContents(this.index[key], 1, flat);
            if (hasTemplate) {
                await fs.outputFile(filename, contents);
            }
        }
    }

    /** Union templates into this one. */
    union(other: LGTracker): void {
        this.unionR(this.index, other.index);
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
                for (let template of <Template[]>val.$templates) {
                    if (flat && template.name) {
                        contents += `# ${template.name}${os.EOL}`;
                    }
                    contents += template.contents + os.EOL;
                }
                hasTemplate = hasTemplate || val.$templates.length > 0;
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

    private unionR(current: any, other: any) {
        for (let key in other) {
            if (!current.hasOwnProperty(key)) {
                current[key] = other[key];
            } else {
                let oldVal = current[key];
                let newVal = other[key];
                if (key === "$templates") {
                    this.mergeTemplates(oldVal, newVal);
                } else {
                    this.unionR(oldVal, newVal);
                }
            }
        }
    }

    private mergeTemplates(current: Template[], other: Template[]) {
        for (let newTemplate of other) {
            let found = false;
            for (let oldTemplate of current) {
                if (newTemplate.equalContents(oldTemplate)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                current.push(newTemplate);
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

    private addTemplate(file: LGFile, pathName: string[], lineNum: number, definition: string) {
        let template = new Template(file, this.pathToName(pathName), lineNum, definition);
        let locale = file.locale();
        if (!this.index.hasOwnProperty(locale)) {
            this.index[locale] = {};
        }
        let root = this.index[locale];
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
        root.$templates.push(template);
    }

    private pathToName(pathName: string[]): string {
        let name = pathName[0];
        for (let i = 1; i < pathName.length; ++i) {
            name = name + "." + pathName[i];
        }
        return name;
    }

    private readLines(path: string, lineFun: (line: string) => void, closeFun?: () => void): void {
        let lineReader = readline.createInterface({
            input: fs.createReadStream(path)
        });
        lineReader.on('line', lineFun);
        if (closeFun) {
            lineReader.on('close', closeFun);
        }
    }
}
