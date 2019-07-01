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

/**
 * Diagnostics are a way to indicate issues with the code.
 * @see https://code.visualstudio.com/api/language-extensions/programmatic-language-features#provide-diagnostics
 */
export function activate(context: vscode.ExtensionContext) {
    const collection: vscode.DiagnosticCollection = vscode.languages.createDiagnosticCollection('lg');
	if (vscode.window.activeTextEditor && util.IsLgFile(vscode.window.activeTextEditor.document.fileName)) {
        setInterval(() => updateDiagnostics(vscode.window.activeTextEditor.document, collection), 3000);
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
        var diagnostics = getLGDiagnostics(document);
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

function getLGDiagnostics(document: vscode.TextDocument): Diagnostic[] {
    let diagnostics: Diagnostic[] = [];
    let templatesWithoutImport: LGTemplate[] = [];
    let templatesWithImport: LGTemplate[] = util.GetAllTemplatesFromCurrentLGFile(document.uri.fsPath);
    
    if (templatesWithImport === undefined || templatesWithImport.length === 0) {
        return diagnostics;
    }

    const parseResult: { isValid: boolean; templates: LGTemplate[]; error: Diagnostic } = LGParser.TryParse(document.getText());
    if (parseResult.isValid) {
        // Get static check diagnostics
        // templates does not includes import items. So if you use a template reference does not in current lg file, error result
        // will poped up.
        templatesWithoutImport = parseResult.templates;
        if (templatesWithoutImport !== undefined && templatesWithoutImport.length > 0) {
            diagnostics = new StaticChecker(templatesWithoutImport).Check();
        }

        // remove templatename not found errors with default importResolver
        if (diagnostics !== undefined && diagnostics.length > 0) {
            diagnostics = diagnostics.filter((diagnostic) => {
                if (diagnostic === undefined) {
                    return false;
                } else if (!diagnostic.Message.endsWith('template not found')) {
                    return true;
                } else {
                    const templateNameResult: RegExpExecArray = /\[([^)]*)\]/.exec(diagnostic.Message);
                    if (templateNameResult === null || templateNameResult === undefined) {
                        return true;
                    }

                    const templateName: string = templateNameResult[1];
                    if (templatesWithImport.map(u=>u.Name).includes(templateName)) {
                        // this template is exist in the import file
                        return false;
                    }
                    return true;
                }
              });
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