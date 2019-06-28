/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { TextDocument, Range, Position, workspace } from "vscode";
import { LGTemplate, TemplateEngine } from "botbuilder-lg";
import { DataStorage } from "./dataStorage";

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

export function GetAllTemplatesFromCurrentLGFile(lgPath: string) :LGTemplate[] {
    let engine: TemplateEngine = DataStorage.templateEngineMap.get(lgPath);
    if (engine === undefined) {
        return [];
    }

    return engine.templates;
}

export function GetAllTemplateFromCurrentWorkspace() :LGTemplate[] {
    let templates: LGTemplate[] = [];

    DataStorage.templateEngineMap.forEach(u => templates = templates.concat(u.templates));

    templates = templates.filter((resource: LGTemplate, index: number, self: LGTemplate[]) =>
        index === self.findIndex((t: LGTemplate) => (
            t.Name === resource.Name && t.Source === resource.Source
        ))
    );

    return templates;
}