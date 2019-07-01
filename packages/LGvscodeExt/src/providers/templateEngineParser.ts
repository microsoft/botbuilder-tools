/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as vscode from 'vscode';
import { TemplateEngine } from 'botbuilder-lg';
import * as util from '../util';
import { DataStorage, TemplateEngineEntity } from '../dataStorage';

export function activate(context: vscode.ExtensionContext) {
    if (vscode.window.activeTextEditor && util.IsLgFile(vscode.window.activeTextEditor.document.fileName)) {
        triggerLGFileFinder();
    }

    // if you want to trigger the event for each text change, use: vscode.workspace.onDidChangeTextDocument
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(e => {
        if (util.IsLgFile(vscode.window.activeTextEditor.document.fileName))
        {
            triggerLGFileFinder();
        }
    }));

    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(e => {
        if (util.IsLgFile(e.fileName))
        {
            updateTemplateEngine(e.uri);
        }
    }));

    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(e => {
        if (util.IsLgFile(e.document.fileName))
        {
            updateTemplateEngine(e.document.uri);
        }
    }));
}

function triggerLGFileFinder() {
    vscode.workspace.findFiles('**/*.lg').then(uris => {
        updateTemplateEngineMap(uris);
    });
}

function updateTemplateEngineMap(uris: vscode.Uri[]) {
    DataStorage.templateEngineMap.clear();
    uris.forEach(uri => {
        updateTemplateEngine(uri);
    });

}

function updateTemplateEngine(uri: vscode.Uri) {
    let engine: TemplateEngine = new TemplateEngine();

    try {
        engine = engine.addFile(uri.fsPath);
    }
    catch(e)
    {
        // ignore it
        //vscode.window.showWarningMessage(e.message);
    }

    DataStorage.templateEngineMap.set(uri.fsPath, new TemplateEngineEntity(uri, engine));
}