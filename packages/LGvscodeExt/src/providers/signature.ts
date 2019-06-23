/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as vscode from 'vscode';
import * as util from '../util';

/**
 * When the user enters a function or method, display information about the function/method that is being called.
 * @see https://code.visualstudio.com/api/language-extensions/programmatic-language-features#help-with-function-and-method-signatures
 * @export
 * @class LGSignatureHelpProvider 
 * @implements [SignatureHelpProvider  ](#vscode.SignatureHelpProvider  )
 */

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.languages.registerSignatureHelpProvider('*', new LGSignatureHelpProvider(), '(', ','));
}

class LGSignatureHelpProvider  implements vscode.SignatureHelpProvider  {
    provideSignatureHelp(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.SignatureHelp> {
        if (!util.IsLgFile(document.fileName)) {
            return;
        }

        // TODO
        throw new Error("Method not implemented.");
    }
    
}


