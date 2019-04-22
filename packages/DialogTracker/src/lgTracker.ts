#!/usr/bin/env node
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import * as fs from 'fs-extra';
import glob from 'globby';
import * as os from 'os';
import * as path from 'path';
import * as readline from 'readline';
import * as st from './schemaTracker';

/** .lg file and the templates defined in it. */
export class LGFile {

    /** Path to .lg file. */
    file: string;

    /** Templates defined in file. */
    templates: Template[];

    /** True if flat naming is used. */
    isFlat: boolean;

    constructor(file: string) {
        this.file = file;
        this.templates = [];
        this.isFlat = true;
    }

    toString(): string {
        return path.basename(this.file, ".schema");
    }

    /** Locale as defined by filename-locale.lg. */
    locale(): string {
        let filename = path.basename(this.file, ".lg");
        let start = filename.indexOf("-");
        return start === -1 ? "" : filename.substring(filename.indexOf("-") + 1);
    }
}

/** Template in a .lg file. */
export class Template {

    /** Full name of the template. */
    name: string;

    /** The template locale. */
    locale?: string;

    /** File that contained definition. */
    file?: LGFile;

    /** Line number where definition is found. */
    line?: number;

    /** Content of template. */
    contents?: string;

    /** Comments before template. */
    comments?: string;

    /** constructor
     * @param name Full name using . as delimiters.
     * @param locale Locale of template or undefined for all locales.
     * @param contents Definition of template.
     * @param file File containing template.
     * @param line Line number in file where template is defined.
     * @param comments Comments before template definition.
     */
    constructor(name: string, locale?: string, contents?: string, file?: LGFile, line?: number, comments?: string) {
        this.name = name;
        this.locale = locale;
        this.file = file;
        this.line = line;
        this.contents = contents ? contents.trimRight() : contents;
        this.comments = comments ? comments.trimRight() : comments;
        if (file) {
            file.templates.push(this);
        }
    }

    /** Replace template with new template if old template is undefined, empty or identical. */
    replaceIf(other: Template): boolean {
        let replace = (this.contents === undefined && other.contents != undefined)
            || (this.contents === "" && other.contents != undefined && other.contents != "")
            || (this.contents === other.contents);
        if (replace) {
            this.name = other.name;
            this.locale = other.locale;
            this.file = other.file;
            this.line = other.line;
            this.contents = other.contents;
            this.comments = other.comments;
        }
        return replace;
    }

    /** Test to see if template definition is empty. */
    isEmpty(): boolean {
        return this.contents === undefined || this.contents === "";
    }

    toString(): string {
        return `${this.file}:${this.name}`;
    }
}

/** Track LG file contents. */
export class LGTracker {
    /** Files that have been added to the tracker. */
    files: LGFile[];

    /** Hierarchical object with $templates at leaves. */
    index: any;

    /** Track schemas where .lg properties are defined. */
    schema: st.SchemaTracker;

    constructor(schema?: st.SchemaTracker) {
        this.files = [];
        this.index = {};
        if (schema) {
            this.schema = schema;
            for (let type of schema.typeToType.values()) {
                for (let name of type.lgProperties) {
                    let fullName = name.replace(/\//g, '.');
                    this.addTemplate(new Template(fullName, "", ""));
                }
            }
        } else {
            this.schema = new st.SchemaTracker();
        }
    }

    /** Add a template to the tracker. 
     * If the locale is undefined will be added to all locales.
    */
    addTemplate(template: Template) {
        let locale = template.locale;
        if (locale === undefined) {
            for (let loc in this.index) {
                let newTemplate = new Template(template.name, loc, template.contents, template.file, template.line, template.comments);
                this.addTemplate(newTemplate);
            }
        } else {
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
            this.mergeTemplates(root.$templates, [template]);
        }
    }

    /** Add LG file to tracker.  */
    async addLGFile(lgPath: string, log?: (msg: string) => void): Promise<LGFile> {
        if (!log) log = (_msg) => { };
        log(`Adding ${lgPath}`);
        let file = new LGFile(lgPath);
        let namePath: string[] = [];
        let indent = 1;
        let lineNum = 0;
        let contents = "";
        let lastComments = "";
        let comments = "";
        return this.readLines(lgPath,
            (fullLine) => {
                let line = fullLine.trim();
                if (line.startsWith('#')) {
                    if (contents || lastComments) {
                        this.addTemplate(new Template(this.pathToName(namePath), file.locale(), contents, file, lineNum, lastComments));
                    }
                    lastComments = comments;
                    contents = "";
                    comments = "";
                    let pos = 1;
                    while (line.length > pos && line[pos] === "#") {
                        ++pos;
                    }
                    if (pos > 1) file.isFlat = false;
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
                } else if (line.startsWith(">")) {
                    comments += fullLine + os.EOL;
                } else if (line === "" || line.startsWith("-")) {
                    contents += comments + fullLine + os.EOL;
                    comments = "";
                } else {
                    contents += fullLine + os.EOL;
                }
                ++lineNum;
            },
            () => {
                if (contents || comments || lastComments) {
                    contents += comments;
                    this.addTemplate(new Template(this.pathToName(namePath), file.locale(), contents, file, lineNum, lastComments));
                }
                this.files.push(file);
            }).then(() => file);
    }

    /** Add all LG files matching glob patterns to tracker. */
    async addLGFiles(patterns: string[], log?: (msg: string) => void): Promise<void> {
        for (let path of await glob(patterns)) {
            await this.addLGFile(path, log);
        }
    }

    /** Write out compiled .lg files, one per locale.
     * @param basePath Base filename and path without locale.
     * @param flat True to produce flat template names instead of hierarchical.  If undefined will be from existing file format.
     * @param log Logger for output.
     * 
     * A template definition is found by looking for in order: <id>.<property>, all <$copySrcId>.<property> then <type>.<property>.
     * For each template we look for .lg files that correspond to id's that contain the definition, then global.lg.
     * If no value is found we look at type.lg.
     * Once we find a definition, then we put that definition into <id>.<property> in the compiled file.
     * If you have an anonymous definition, then it will use the <$copySrcID>.<property> or <type>.<property> definition at runtime.
     * At runtime we also do language fallback.
     */
    async writeFiles(basePath: string, flat?: boolean, log?: (name: string) => void): Promise<void> {
        if (!log) log = (_name) => { };
        for (let key in this.index) {
            let filename = path.join(path.dirname(basePath), path.basename(basePath, ".lg") + (key ? `-${key}` : "") + ".lg");
            let fileFlat = flat;
            if (await fs.pathExists(filename)) {
                log(`Merging existing ${filename}`);
                let old = new LGTracker(this.schema);
                let oldFile = await old.addLGFile(filename);
                if (fileFlat === undefined) {
                    // Preserve old file format
                    fileFlat = oldFile.isFlat;
                }
                this.union(old, true);
            }
            log(`Writing ${filename}`);
            let [contents] = this.buildContents(this.index[key], 1, fileFlat);
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

    /** Return multiply defined templates. */
    * multiplyDefined(): Iterable<Template[]> {
        yield* this.multiplyDefinedR(this.index);
    }

    private * multiplyDefinedR(elt: any): Iterable<Template[]> {
        for (let key in elt) {
            if (key === "$templates") {
                if (elt.$templates.length > 1) {
                    yield elt.$templates;
                }
            } else {
                yield* this.multiplyDefinedR(elt[key]);
            }
        }
    }

    private buildContents(val: any, depth: number, flat?: boolean): [string, boolean] {
        let contents = "";
        let hasTemplate = false;
        for (let key of Object.keys(val).sort()) {
            if (key === "$templates") {
                let first = true;
                for (let template of val.$templates) {
                    let templateContents = "";
                    if (flat) {
                        if (template.comments) {
                            templateContents += template.comments + os.EOL;
                        }
                        templateContents += `# ${template.name}${os.EOL}`;
                    } else {
                        if (first) {
                            first = false;
                        }
                        else {
                            const altDef = "> *** Alternative Definition ***";
                            if (!template.comments || !template.comments.startsWith(altDef)) {
                                templateContents += altDef + os.EOL;
                            }
                            if (template.comments) {
                                templateContents += template.comments + os.EOL;
                            }
                            templateContents += `${"#".repeat(depth - 1)} ${template.name.substring(template.name.lastIndexOf("."))}` + os.EOL;
                        }
                    }
                    if (template.contents) {
                        templateContents += template.contents + os.EOL;
                    }
                    contents += templateContents + os.EOL;
                }
                hasTemplate = true;
            } else {
                let [childContents, childTemplate] = this.buildContents(val[key], depth + 1, flat);
                if (childTemplate) {
                    if (flat) {
                        contents += childContents;
                    } else {
                        let child = val[key];
                        if (child.$templates && child.$templates.length > 0 && child.$templates[0].comments) {
                            contents += child.$templates[0].comments + os.EOL;
                        }
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
        for (let newTemplate of other) {
            let found = false;
            for (let oldTemplate of current) {
                found = oldTemplate.replaceIf(newTemplate);
                if (found) {
                    break;
                }
            }
            if (!found && (current.length == 0 || !newTemplate.isEmpty())) {
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
                if (newTemplate.contents === oldTemplate.contents) {
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
