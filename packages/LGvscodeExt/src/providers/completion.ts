/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as vscode from 'vscode';
import * as util from '../util';
import { DataStorage } from '../dataStorage';
import { LGTemplate, LGParser } from 'botbuilder-lg';
import * as path from 'path';
import { buildInfunctionsMap } from '../buildinFunctions';

/**
 * Code completions provide context sensitive suggestions to the user.
 * @see https://code.visualstudio.com/api/language-extensions/programmatic-language-features#show-code-completion-proposals
 * @export
 * @class LGCompletionItemProvider
 * @implements [CompletionItemProvider](#vscode.CompletionItemProvider)
 */

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('*', new LGCompletionItemProvider(), '{', '(', '['));
}

class LGCompletionItemProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        if (!util.IsLgFile(document.fileName)) {
            return;
        }
        
        const lineTextBefore = document.lineAt(position.line).text.substring(0, position.character);
        const lineTextAfter = document.lineAt(position.line).text.substring(position.character);
        
        // []() suggestion
        if (/\[[^\]]*\]\([^\)]*$/.test(lineTextBefore) && !util.isInFencedCodeBlock(document, position)) {
            return new Promise((res, _) => {
                let paths: string[] = [];

                DataStorage.templateEngineMap.forEach(u => paths = paths.concat(u.templateEngine.templates.map(u => u.Source)));
                paths = Array.from(new Set(paths));

                const headingCompletions = paths.reduce((prev, curr) => {
                    var relativePath = path.relative(path.dirname(document.uri.fsPath), curr);
                    let item = new vscode.CompletionItem(relativePath, vscode.CompletionItemKind.Reference);
                    item.detail = curr;
                    prev.push(item);
                    return prev;
                }, []);

                res(headingCompletions);
            });
        } else if (/\[[^\]]*$/.test(lineTextBefore) && !util.isInFencedCodeBlock(document, position)) {
            // input [ ] prompt template suggestion
            return new Promise((res, _) => {
                let templates: LGTemplate[] = util.GetAllTemplateFromCurrentWorkspace();

                const headingCompletions = templates.reduce((prev, curr) => {
                    let item = new vscode.CompletionItem(curr.Name, vscode.CompletionItemKind.Reference);
                    
                    item.detail = `${curr.Source}`;
                    
                    const lgParser = LGParser.Parse(document.getText());
                    var relativePath = path.relative(path.dirname(document.uri.fsPath), curr.Source);

                    if (curr.Source !== document.uri.fsPath && !lgParser.Imports.map(u => u.Id).includes(relativePath)) {
                        var edit =  vscode.TextEdit.insert(new vscode.Position(0,0), `[import](${relativePath})\r\n`);
                        item.additionalTextEdits = [edit];
                    }
                    if (!prev.includes(item)) {
                        prev.push(item);
                    }
                    
                    return prev;
                }, []);

                res(headingCompletions);
            });
        } else if (/lgTemplate\($/.test(lineTextBefore)) {
            // lgTemplate completion
            return new Promise((res, _) => {
                let templates: LGTemplate[] = util.GetAllTemplateFromCurrentWorkspace();

                const headingCompletions = templates.reduce((prev, curr) => {
                    let item = new vscode.CompletionItem(curr.Name, vscode.CompletionItemKind.Reference);
                    item.insertText = `'${curr.Name}'`;
                    item.detail = `${curr.Source}`;
                    
                    const lgParser = LGParser.Parse(document.getText());
                    var relativePath = path.relative(path.dirname(document.uri.fsPath), curr.Source);

                    if (curr.Source !== document.uri.fsPath && !lgParser.Imports.map(u => u.Id).includes(relativePath)) {
                        var edit =  vscode.TextEdit.insert(new vscode.Position(0,0), `[import](${relativePath})\r\n`);
                        item.additionalTextEdits = [edit];
                    }
                    if (!prev.includes(item)) {
                        prev.push(item);
                    }
                    
                    return prev;
                }, []);

                res(headingCompletions);
            });
        } else if (/\{[^\}]*$/.test(lineTextBefore)) {
            // buildin function prompt in expression
            let items: vscode.CompletionItem[] = [];
            buildInfunctionsMap.forEach((value, key) => {
                let completionItem = new vscode.CompletionItem(key);
                const returnType = util.GetreturnTypeStrFromReturnType(value.Returntype);
                completionItem.detail = `(method) ${key}(${value.Params.join(", ")}): ${returnType}`;
                completionItem.documentation = value.Introduction;
                items.push(completionItem);
            });
            
            return items;
        } else {
            return [];
        }
    }

    
}


