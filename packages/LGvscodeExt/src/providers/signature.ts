/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as vscode from 'vscode';
import * as util from '../util';
import { buildInfunctionsMap} from '../buildinFunctions';

/**
 * When the user enters a function or method, display information about the function/method that is being called.
 * @see https://code.visualstudio.com/api/language-extensions/programmatic-language-features#help-with-function-and-method-signatures
 * @export
 * @class LGSignatureHelpProvider 
 * @implements [SignatureHelpProvider](#vscode.SignatureHelpProvider)
 */

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.languages.registerSignatureHelpProvider('*', new LGSignatureHelpProvider(), '(', ','));
}

class LGSignatureHelpProvider implements vscode.SignatureHelpProvider  {
    provideSignatureHelp(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.SignatureHelp> {
        if (!util.IsLgFile(document.fileName)) {
            return;
        }
        let signatureHelp: vscode.SignatureHelp = new vscode.SignatureHelp();

        const {functionName, paramIndex} = this.ParseFunction(document, position);
        if (!buildInfunctionsMap.has(functionName)) {
            return undefined;
        }

        signatureHelp.activeParameter = paramIndex;
        signatureHelp.activeSignature = 0;


        const functionEntity = buildInfunctionsMap.get(functionName);
        let paramInfoList: vscode.ParameterInformation[] = [];
        functionEntity.Params.forEach(u => paramInfoList.push(new vscode.ParameterInformation(u)));
        
        const returnType = util.GetreturnTypeStrFromReturnType(functionEntity.Returntype);
        const sigLabel = `${functionName}(${functionEntity.Params.join(", ")}): ${returnType}`;
        var sigInfo = new vscode.SignatureInformation(sigLabel);
        sigInfo.parameters = paramInfoList;
        
        signatureHelp.signatures = [sigInfo];

        return signatureHelp;
    }

    

    ParseFunction(document: vscode.TextDocument, position: vscode.Position) : {functionName:string, paramIndex: number}
    {
        let functionName: string = "";
        let paramIndex: number = 0;
        let range: vscode.Range = new vscode.Range(new vscode.Position(position.line, 0), position);
        var text: string = document.getText(range);
        let bracketsDiffNumber = 0;  // right bracket number - left bracket number, if bracketsDiffNumber === 0, present that is out of param inner scope
        for (let i = text.length - 1; i >= 0; i--) {
            var currentChar: string = text.charAt(i);
            if (currentChar === ',' && bracketsDiffNumber === 0) {
                paramIndex++;
            } else if (currentChar === '(' && bracketsDiffNumber === 0 && i > 0) {
                const wordRange = document.getWordRangeAtPosition(new vscode.Position(position.line, i - 1));
                if (wordRange !== undefined) {
                    functionName = document.getText(wordRange);
                    break;
                }
            } else if (currentChar === ')') {
                bracketsDiffNumber++;
            } else if (currentChar === '(') {
                bracketsDiffNumber--;
            }
        }

        return { functionName, paramIndex };
    }
    
}


