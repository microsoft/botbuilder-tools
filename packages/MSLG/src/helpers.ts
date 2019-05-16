import * as path from 'path';
import * as fs from 'fs-extra';
const NEWLINE = require('os').EOL;
const ANY_NEWLINE = /\r\n|\r|\n/g;

export class helpers {
    public static findLGFiles(inputFolder: string, getSubFolders: boolean): any[] {
        let results: any[] = [];
        const luExt = '.lg';
        fs.readdirSync(inputFolder).forEach(function (dirContent) {
            dirContent = path.resolve(inputFolder, dirContent);
            if (getSubFolders && fs.statSync(dirContent).isDirectory()) {
                results = results.concat(helpers.findLGFiles(dirContent, getSubFolders));
            }
            if (fs.statSync(dirContent).isFile()) {
                if (dirContent.endsWith(luExt)) {
                    results.push(dirContent);
                }
            }
        });

        return results;
    }

    public static sanitizeNewLines(fileContent: string) {
        return fileContent.replace(ANY_NEWLINE, NEWLINE);
    }
}

export enum ErrorType {
    Error = '[Error]',
    Warning = '[Warning]'
}

export class Block {
    public block: string;
    public start: number;
    public end: number;

    constructor(block: string, start: number, end: number) {
        this.block = block;
        this.start = start;
        this.end = end;
    }
}

export class TranslateLine {
    public text: string;
    public localize: boolean;
    public idx: number;

    constructor(text: string, localize: boolean, idx: number = -1) {
        this.text = text;
        this.localize = localize;
        this.idx = idx;
    }
}

export const PARSERCONSTS = {
    TEMPLATENAME: "#",
    CONDITIONIF: "IF:",
    CONDITIONELSEIF: "ELSEIF:",
    CONDITIONELSE: "ELSE:",
    COMMENT: ">",
    MULTILINE: "```",
    SEPARATOR: "-"
};