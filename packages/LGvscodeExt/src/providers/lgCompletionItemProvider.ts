/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as vscode from 'vscode';
import * as constants from '../constants';
import { TemplateEngine } from 'botbuilder-lg';

/**
 * Code completions provide context sensitive suggestions to the user.
 * @see https://code.visualstudio.com/api/language-extensions/programmatic-language-features#show-code-completion-proposals
 * @export
 * @class LGCompletionItemProvider
 * @implements [CompletionItemProvider](#vscode.CompletionItemProvider)
 */
export class LGCompletionItemProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        const buildInfunctionItem: vscode.CompletionItem[] = constants.buildInfunctionNames.map(item => new vscode.CompletionItem(item));
        let engine: TemplateEngine = TemplateEngine.fromText(document.getText());

        const templateNameItem: vscode.CompletionItem[] = engine.templates.map(item => new vscode.CompletionItem(item.Name));

        return [...buildInfunctionItem, ...templateNameItem];
    }
}