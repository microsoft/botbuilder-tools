/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as vscode from 'vscode';
import * as util from '../util';
import { Template, Templates } from 'botbuilder-lg';
import { buildInfunctionsMap } from '../buildinFunctions';

/**
 * Hovers show information about the symbol/object that's below the mouse cursor. This is usually the type of the symbol and a description.
 * @see https://code.visualstudio.com/api/language-extensions/programmatic-language-features#show-hovers
 * @export
 * @class LGHoverProvider
 * @implements [HoverProvider ](#vscode.HoverProvider )
 */

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.languages.registerHoverProvider('*', new LGHoverProvider()));
}

class LGHoverProvider implements vscode.HoverProvider {
    provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
        if (!util.isLgFile(document.fileName)) {
            return;
        }

        const wordRange = document.getWordRangeAtPosition(position, /[a-zA-Z0-9_ \-\.]+/);
        if (!wordRange) {
            return undefined;
        }

        let wordName = document.getText(wordRange);

        // template reference hover
        const templates: Templates = util.getAllTemplatesFromCurrentLGFile(document.uri);
        const template: Template = templates.toArray().find(u=>u.name === wordName);
        if (template !== undefined) {
            const contents = [];
            contents.push(new vscode.MarkdownString(template.sourceRange.source));
            contents.push(new vscode.MarkdownString(template.body));
            return new vscode.Hover(contents, wordRange);
        }

        // builtin function may has prefix builtin.
        if (wordName.startsWith('builtin.')) {
            wordName = wordName.substring('builtin.'.length);
        }

        // buildin functions info
        if (buildInfunctionsMap.has(wordName))
        {   
            const functionEntity = buildInfunctionsMap.get(wordName);
            const returnType = util.getreturnTypeStrFromReturnType(functionEntity.returntype);
            const functionIntroduction = `${wordName}(${functionEntity.params.join(", ")}): ${returnType}`;

            const contents = [];
            contents.push(new vscode.MarkdownString(functionIntroduction));
            contents.push(new vscode.MarkdownString(functionEntity.introduction));
            return new vscode.Hover(contents, wordRange);
        }

        return undefined;
    }
    
}


