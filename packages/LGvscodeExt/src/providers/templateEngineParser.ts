/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as vscode from 'vscode';
import { Templates } from 'botbuilder-lg';
import * as util from '../util';
import { DataStorage, TemplatesEntity } from '../dataStorage';

export function activate(context: vscode.ExtensionContext) {
    if (vscode.window.activeTextEditor) {
        triggerLGFileFinder();
    }

    setInterval(() => {
        const editer = vscode.window.activeTextEditor;
        if (editer !== undefined && util.isLgFile(editer.document.fileName)) {
            updateTemplateEngine(editer.document.uri);
         }
    }, 3000);

    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(e => {
        if (util.isLgFile(e.fileName))
        {
            updateTemplateEngine(e.uri);
        }
    }));
}

function triggerLGFileFinder() {
    vscode.workspace.findFiles('**/*.lg').then(uris => {
        updateTemplateEngineMap(uris);
    });
}

function updateTemplateEngineMap(uris: vscode.Uri[]) {
    DataStorage.templatesMap.clear();
    uris.forEach(uri => {
        updateTemplateEngine(uri);
    });

}

function updateTemplateEngine(uri: vscode.Uri) {
    let engine: Templates = Templates.parseFile(uri.fsPath);

    DataStorage.templatesMap.set(uri.fsPath, new TemplatesEntity(uri, engine));
}