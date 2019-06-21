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
        
        // []() suggestion
        if (/\[[^\]]*\]\([^\)]*$/.test(lineTextBefore)) {
            return new Promise((res, _) => {
                let paths: string[] = [];

                DataStorage.templateEngineMap.forEach(u => paths = paths.concat(u.templates.map(u => u.Source)));
                paths = Array.from(new Set(paths));

                const headingCompletions = paths.reduce((prev, curr) => {
                    var relativePath = path.relative(document.uri.fsPath, curr).replace('\\','/');
                    let item = new vscode.CompletionItem(relativePath, vscode.CompletionItemKind.Reference);
                    item.detail = curr;
                    prev.push(item);
                    return prev;
                }, []);

                res(headingCompletions);
            });
        } else if (/\[[^\]]*$/.test(lineTextBefore)) {
            // input [ ] prompt template suggestion
            return new Promise((res, _) => {
                let templates: LGTemplate[] = [];

                DataStorage.templateEngineMap.forEach(u => templates = templates.concat(u.templates));

                const headingCompletions = templates.reduce((prev, curr) => {
                    let item = new vscode.CompletionItem(curr.Name, vscode.CompletionItemKind.Reference);
                    
                    item.detail = `${curr.Source}`;
                    
                    const lgParser = LGParser.Parse(document.getText());
                    var relativePath = path.relative(document.uri.fsPath, curr.Source).replace('\\','/');

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


