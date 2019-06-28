/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as vscode from 'vscode';
import { TemplateEngine, LGTemplate} from 'botbuilder-lg';
import * as util from '../util';
import { DataStorage } from '../dataStorage';


export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.languages.registerDefinitionProvider('*', new LGDefinitionProvider()));
}

/**
 * Allow the user to see the definition of variables/functions/methods right where the variables/functions/methods are being used.
 * @see https://code.visualstudio.com/api/language-extensions/programmatic-language-features#show-definitions-of-a-symbol
 * @export
 * @class LGDefinitionProvider
 * @implements {vscode.DefinitionProvider}
 */
class LGDefinitionProvider implements vscode.DefinitionProvider{
    provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Definition> {
        if (!util.IsLgFile(document.fileName)) {
            return;
        }

        return new vscode.Location(document.uri, this.getReference(document, position));
    }

    private getReference(document: vscode.TextDocument, position: vscode.Position): vscode.Position {
        try {
            const lineText: string = document.lineAt(position.line).text;
            const wordRange = document.getWordRangeAtPosition(position, /[a-zA-Z0-9_ \-\.]+/);
            if (!wordRange) {
                return undefined;
            }
            const templateName = document.getText(wordRange);
            
            let engine: TemplateEngine = DataStorage.templateEngineMap.get(document.uri.fsPath);
            if (engine === undefined) {
                return undefined;
            }

            const templates: LGTemplate[] = engine.templates;
            const template: LGTemplate = templates.find(u=>u.Name === templateName);
            if (template === undefined)
                return undefined;

            const lineNumber: number = template.ParseTree.start.line - 1;
            const columnNumber: number = template.ParseTree.start.charPositionInLine;
            return new vscode.Position(lineNumber, columnNumber);
        } catch(e){
            return undefined;
       }
    }
}