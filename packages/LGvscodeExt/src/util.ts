import { TextDocument, Range, Position, workspace } from "vscode";

/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */


export function IsLgFile(fileName: string): boolean {
    if(fileName === undefined || !fileName.endsWith('.lg')) {
        return false;
    }
    return true;
}

export function isInFencedCodeBlock(doc: TextDocument, lineNum: number): boolean {
    let textBefore = doc.getText(new Range(new Position(0, 0), new Position(lineNum, 0)));
    let matches = textBefore.match(/^```[\w ]*$/gm);
    if (matches == null) {
        return false;
    } else {
        return matches.length % 2 != 0;
    }
}