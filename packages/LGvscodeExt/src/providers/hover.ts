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
import { LGTemplate, TemplateEngine} from 'botbuilder-lg';
import { buildInfunctionNames } from '../buildinFunctions';

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
        if (!util.IsLgFile(document.fileName)) {
            return;
        }

        const wordRange = document.getWordRangeAtPosition(position, /[a-zA-Z0-9_ \-\.]+/);
        if (!wordRange) {
            return undefined;
        }

        const wordName = document.getText(wordRange);

        // template reference hover
        let engine: TemplateEngine = DataStorage.templateEngineMap.get(document.uri.fsPath);
        if (engine !== undefined) {
            const templates: LGTemplate[] = engine.templates;
            const template: LGTemplate = templates.find(u=>u.Name === wordName);
            if (template !== undefined) {
                const contents = [];
                contents.push(new vscode.MarkdownString(template.Source));
                contents.push(new vscode.MarkdownString(template.Body));
                return new vscode.Hover(contents, wordRange);
            }
        }

        // buildin functions info
        if (buildInfunctionNames.includes(wordName))
        {
            const contents = [];
                contents.push(new vscode.MarkdownString("Buildin function"));
                contents.push(new vscode.MarkdownString("introduction, coming soon~"));
                return new vscode.Hover(contents, wordRange);
        }

        return undefined;
    }
    
}


