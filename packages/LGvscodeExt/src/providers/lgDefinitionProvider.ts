/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as vscode from 'vscode';
import { TemplateEngine, LGTemplate, Position } from 'botbuilder-lg';
import * as util from '../util';

/**
 * Allow the user to see the definition of variables/functions/methods right where the variables/functions/methods are being used.
 * @see https://code.visualstudio.com/api/language-extensions/programmatic-language-features#show-definitions-of-a-symbol
 * @export
 * @class LGDefinitionProvider
 * @implements {vscode.DefinitionProvider}
 */
export class LGDefinitionProvider implements vscode.DefinitionProvider{
    provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Definition> {
        if (!util.IsLgFile(document.fileName)) {
            return;
        }

        return new vscode.Location(document.uri, this.getReference(document, position));
    }

    private getReference(document: vscode.TextDocument, position: vscode.Position): vscode.Position {
        try {
            const lineText: string = document.lineAt(position.line).text;
            var templateName: string = this.findTemplateName(lineText, position.character);
            let engine: TemplateEngine = TemplateEngine.fromText(document.getText());
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

    private findTemplateName(lineText: string, column: number): string {
        let startIndex: number = column;
        const borderCharacters: string[] = ['[',']','(',')'];
        while (startIndex >= 0 && !borderCharacters.includes(lineText[startIndex])) {
            startIndex--;
        }
        if (startIndex < 0 || lineText[startIndex] !== '[') return undefined;

        let endIndex: number = column;
        while (endIndex <= lineText.length && !borderCharacters.includes(lineText[startIndex])) {
                endIndex++;
        }
        if (endIndex >= lineText.length || lineText[endIndex] === ')' || lineText[endIndex] === '[' ) return undefined;

        return lineText.substring(startIndex + 1, endIndex);
    }
}