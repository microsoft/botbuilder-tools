/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as vscode from 'vscode';
import { LGTemplate, StaticChecker, Diagnostic, LGParser, Position, Range} from 'botbuilder-lg';
import * as util from '../util';

export function activate(context: vscode.ExtensionContext) {
    const collection: vscode.DiagnosticCollection = vscode.languages.createDiagnosticCollection('lg');
	if (vscode.window.activeTextEditor && util.IsLgFile(vscode.window.activeTextEditor.document.fileName)) {
        updateDiagnostics(vscode.window.activeTextEditor.document, collection);
    }

    // if you want to trigger the event for each text change, use: vscode.workspace.onDidChangeTextDocument
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(e => {
        if (util.IsLgFile(vscode.window.activeTextEditor.document.fileName))
        {
            updateDiagnostics(e, collection);
        }
    }));

    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(e => {
        if (util.IsLgFile(e.fileName))
        {
            updateDiagnostics(e, collection);
        }
    }));
}

function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
    // special case
    if(document.fileName.endsWith('.git')) {
        return;
    }
    
	if (util.IsLgFile(document.fileName)) {
        var diagnostics = getLGDiagnostics(document.getText());
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

function getLGDiagnostics(lgFileContent: string): Diagnostic[] {
    let diagnostics: Diagnostic[] = [];
    let templates: LGTemplate[] = [];
    const parseResult: { isValid: boolean; templates: LGTemplate[]; error: Diagnostic } = LGParser.TryParse(lgFileContent);
    if (parseResult.isValid) {
        // Get static check diagnostics
        templates = parseResult.templates;
        if (templates !== undefined && templates.length > 0) {
            diagnostics = new StaticChecker(templates).Check();
        }
    } else {
    // Get parser diagnostic
    const start: Position = parseResult.error.Range.Start;
    const end: Position = parseResult.error.Range.End;
    const error: Diagnostic = new Diagnostic(
        new Range(
            new Position(start.Line, start.Character),
            new Position(end.Line, end.Character)),
        parseResult.error.Message,
        parseResult.error.Severity);
    
        diagnostics = diagnostics.concat(error);
    }

    return diagnostics;
}