/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as vscode from 'vscode';
import {LGDiagnostics} from './lgDiagnostics';
import * as util from './util';
import {LGDebugPanel} from './providers/lgDebugPanel';
import {LGCompletionItemProvider} from './providers/lgCompletionItemProvider';
import {LGDefinitionProvider} from './providers/lgDefinitionProvider';
import { LG_MODE } from './lgMode';


/**
 * Main vs code Extension code part
 *
 * @export
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext) {
    // LG debug webview window
    context.subscriptions.push(vscode.commands.registerCommand('lgLiveTest.start', () => {
       LGDebugPanel.createOrShow(context.extensionPath);
    }));

    // language diagnostic feature
	const collection: vscode.DiagnosticCollection = vscode.languages.createDiagnosticCollection('lg');
	if (vscode.window.activeTextEditor && util.IsLgFile(vscode.window.activeTextEditor.document.fileName)) {
        updateDiagnostics(vscode.window.activeTextEditor.document, collection);
    }

    // if you want to check diagnostic for each text change, use: vscode.workspace.onDidChangeTextDocument
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(e => updateDiagnostics(e, collection)));
    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(e => updateDiagnostics(e, collection)));
    
    // code complete feature
    let buildinFunctionsCompletionItemProvider: vscode.Disposable =
    vscode.languages.registerCompletionItemProvider(LG_MODE, new LGCompletionItemProvider());
    context.subscriptions.push(buildinFunctionsCompletionItemProvider);
    
    // Show Definitions of a template symbol
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(LG_MODE, new LGDefinitionProvider()));
}

function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
    if(document.fileName.endsWith('.git')) {
        return;
    }
    
	if (util.IsLgFile(document.fileName)) {
        var diagnostics = LGDiagnostics.GetLGDiagnostics(document.getText());
        var vscodeDiagnostics: vscode.Diagnostic[] = diagnostics.map(u => 
            new vscode.Diagnostic(
                new vscode.Range(
                    new vscode.Position(u.Range.Start.Line, u.Range.Start.Character),
                    new vscode.Position(u.Range.End.Line, u.Range.End.Character)),
                u.Message,
                u.Severity
            )
            );
        collection.set(document.uri, vscodeDiagnostics);
    } else {
        collection.clear();
    }
}

export function deactivate() {
}