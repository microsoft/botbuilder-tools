/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { TextDocument, Range, Position, workspace } from "vscode";

export function IsLgFile(fileName: string): boolean {
    if(fileName === undefined || !fileName.endsWith('.lg')) {
        return false;
    }
    return true;
}

export function isInFencedCodeBlock(doc: TextDocument, position: Position): boolean {
    let textBefore = doc.getText(new Range(new Position(0, 0), position));
    let matches = textBefore.match(/```[\w ]*$/gm);
    if (matches == null) {
        return false;
    } else {
        return matches.length % 2 != 0;
    }
}