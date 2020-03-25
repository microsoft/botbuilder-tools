/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { TextDocument, Range, Position } from "vscode";
import { Template, Templates, } from "botbuilder-lg";
import { DataStorage, TemplatesEntity } from "./dataStorage";
import * as vscode from 'vscode';
import { ReturnType } from "adaptive-expressions";
import { buildInfunctionsMap, FunctionEntity } from './buildinFunctions';

export function isLgFile(fileName: string): boolean {
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

export function getAllTemplatesFromCurrentLGFile(lgFileUri: vscode.Uri) : Templates {
    let engineEntity: TemplatesEntity = DataStorage.templatesMap.get(lgFileUri.fsPath);
    if (engineEntity === undefined || engineEntity.templates === undefined) {
        return new Templates();
    }

    return engineEntity.templates;
}

export function getreturnTypeStrFromReturnType(returnType: ReturnType): string {
    let result = '';
    switch(returnType) {
        case ReturnType.Boolean: result = "boolean";break;
        case ReturnType.Number: result = "number";break;
        case ReturnType.Object: result = "any";break;
        case ReturnType.String: result = "string";break;
    }

    return result;
}

export function getAllFunctions(lgFileUri: vscode.Uri): Map<string, FunctionEntity> {
    const functions: Map<string, FunctionEntity> = new Map<string, FunctionEntity>();

    for (const func of buildInfunctionsMap) {
        functions.set(func[0],func[1]);
    }

    const templates: Templates = getAllTemplatesFromCurrentLGFile(lgFileUri);

    for (const template of templates) {
        var functionEntity = new FunctionEntity(template.parameters, ReturnType.Object, 'Template reference');
        functions.set(template.name, functionEntity);
    }

    return functions;
}