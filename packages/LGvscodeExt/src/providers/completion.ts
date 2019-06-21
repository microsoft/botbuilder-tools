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

/**
 * Code completions provide context sensitive suggestions to the user.
 * @see https://code.visualstudio.com/api/language-extensions/programmatic-language-features#show-code-completion-proposals
 * @export
 * @class LGCompletionItemProvider
 * @implements [CompletionItemProvider](#vscode.CompletionItemProvider)
 */

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('*', new LGCompletionItemProvider(), '{', '(', '\\', '/', '[', '#'));
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
        
        // TODO
        // 1. when add a template from another file, should add [import](filepath)
        // 2. give suggestion for import feature

        // input [ ] prompt template suggestion
        if (/\[[^\]]*$/.test(lineTextBefore)) {
            return new Promise((res, _) => {
                let templates: string[] = [];
                DataStorage.templateEngineMap.forEach(u => templates = templates.concat(u.templates.map(k => k.Name)));

                const headingCompletions = templates.reduce((prev, curr) => {
                    let item = new vscode.CompletionItem(curr, vscode.CompletionItemKind.Reference);
                    prev.push(item);
                    return prev;
                }, []);

                res(headingCompletions);
            });
        } else if (/\{[^\}]*$/.test(lineTextBefore)) {
            // buildin function prompt in expression
            const buildInfunctionItem: vscode.CompletionItem[] = this.buildInfunctionNames.map(item => new vscode.CompletionItem(item));
            return [...buildInfunctionItem];
        } else {
            return[];
        }
    }

    buildInfunctionNames: string[] = [
        'min','max','average','sum','exists','length','replace','replaceIgnoreCase','split','substring','toLower','toUpper',
        'trim','count','contains','contains','join','first','last','foreach','addDays','addHours','addMinutes','addSeconds',
        'dayOfMonth','dayOfWeek','dayOfYear','month','date','year','utcNow','formatDateTime','subtractFromTime','dateReadBack',
        'getTimeOfDay','float','int','string','bool','Accessor','Element','createArray','Constant','Lambda','if','rand','json',
        'getProperty','addProperty','removeProperty','setProperty','endsWith','startsWith','countWord','addOrdinal','guid',
        'indexOf','lastIndexOf','union','intersection ','skip','take','filterNotEqual','subArray','array','binary','dataUri',
        'dataUriToBinary','dataUriToString','decodeUriComponent','base64','base64ToBinary','base64ToString','uriComponent',
        'uriComponentToString','xml','range','getFutureTime','getPastTime','addToTime','convertFromUtc','convertTimeZone',
        'convertToUtc','startOfDay','startOfHour','startOfMonth','ticks','uriHost','uriPath','uriPathAndQuery','uriPort',
        'uriQuery','uriScheme','coalesce','xpath',
    ];
}


