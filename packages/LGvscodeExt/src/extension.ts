/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as vscode from 'vscode';
import {LGDebugPanel} from './providers/debugPanel';
import * as listEditing from './providers/listEditing';
import * as completion from './providers/completion';
import * as diagnostics from './providers/diagnostics';
import * as templateEngineParser from './providers/templateEngineParser';
import * as definition from './providers/definition';

/**
 * Main vs code Extension code part
 *
 * @export
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext) {
    activeLGExt(context);

    // LG debug webview window
    context.subscriptions.push(vscode.commands.registerCommand('lgLiveTest.start', () => {
       LGDebugPanel.createOrShow(context.extensionPath);
    }));
}

function activeLGExt(context: vscode.ExtensionContext) {
    listEditing.activate(context);
    completion.activate(context);
    diagnostics.activate(context);
    templateEngineParser.activate(context);
    definition.activate(context);
}