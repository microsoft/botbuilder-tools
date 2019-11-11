/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as vscode from 'vscode';
import { LGTemplate, StaticChecker, Diagnostic, LGParser, Position, Range, TemplateEngine, DiagnosticSeverity} from 'botbuilder-lg';
import * as util from '../util';

/**
 * Diagnostics are a way to indicate issues with the code.
 * @see https://code.visualstudio.com/api/language-extensions/programmatic-language-features#provide-diagnostics
 */
export function activate(context: vscode.ExtensionContext) {
    const collection: vscode.DiagnosticCollection = vscode.languages.createDiagnosticCollection('lg');

    setInterval(() => {
        const editer = vscode.window.activeTextEditor;
        if (editer !== undefined && util.IsLgFile(editer.document.fileName)) {
            updateDiagnostics(editer.document, collection);
         }
    }, 3000);

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

    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(e => {
        if (util.IsLgFile(e.document.fileName))
        {
            updateDiagnostics(e.document, collection);
        }
    }));
}

function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
    // special case
    if(document.fileName.endsWith('.git')) {
        return;
    }
    
	if (util.IsLgFile(document.fileName)) {
        var diagnostics = new StaticChecker().checkFile(document.uri.fsPath);
        var vscodeDiagnostics: vscode.Diagnostic[] = [];
        const confDiagLevel = vscode.workspace.getConfiguration().get('LG.Expression.ignoreUnknownFunction');
        const confCustomFuncListSetting: string = vscode.workspace.getConfiguration().get('LG.Expression.customFunctionList');
        var customFunctionList: string[] = [];
        if (confCustomFuncListSetting.length >= 1) {
            customFunctionList = confCustomFuncListSetting.split(",").map(u => u.trim());
        }
        diagnostics.forEach(u => {
            const isUnkownFuncDiag: boolean = u.Message.includes("it's not a built-in function or a customized function in expression");
            let ignored = false;
            const funcName = extractFuncName(u.Message);
            console.log(funcName);
            if (customFunctionList.includes(funcName)) {
                ignored = true;
            } else {
                switch (confDiagLevel) {
                    case "ignore":
                        if (isUnkownFuncDiag) {
                            ignored = true;
                        }
                        break;
                
                    case "warn":
                            if (isUnkownFuncDiag) {
                                u.Severity = DiagnosticSeverity.Warning;
                            }
                        break;
                    default:
                        break;
                }
            }

            if (!ignored){
                const diagItem = new vscode.Diagnostic(
                    new vscode.Range(
                        new vscode.Position(u.Range.Start.Line - 1, u.Range.Start.Character),
                        new vscode.Position(u.Range.End.Line - 1, u.Range.End.Character)),
                    u.Message,
                    u.Severity
                );
                vscodeDiagnostics.push(diagItem);
            }
        });
        
        collection.set(document.uri, vscodeDiagnostics);
    } else {
        collection.clear();
    }
}

function extractFuncName(errorMessage: string): string {
    const message = errorMessage.match(/error message:\s+([\w][\w0-9_]*)\s+does\snot\shave/)[1];
    return message;
}