/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as vscode from 'vscode';
import { Templates } from 'botbuilder-lg';
import * as path from 'path';
import * as fs from 'fs';
import { DataStorage, TemplatesEntity } from '../dataStorage';
import * as util from '../util';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('lgLiveTest.start', () => {
        LGDebugPanel.createOrShow(context.extensionPath);
     }));
}

/**
 * VebView for LG debugger
 *
 * @export
 * @class LGDebugPanel
 */
export class LGDebugPanel {
    /**
     * Track the currently panel. Only allow a single panel to exist at a time.
     */
    public static currentPanel: LGDebugPanel | undefined;
    public static readonly viewType: string = 'lgDebug';
    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionPath: string;
    private _disposables: vscode.Disposable[] = [];

    /**
     * Command lgLivingTest.start runner
     *
     * @static
     * @returns
     * @memberof LGDebugPanel
     */
    public static createOrShow(extensionPath: string): void {
        // If already have a panel, show it.
        if (LGDebugPanel.currentPanel) {
            LGDebugPanel.currentPanel._panel.reveal(vscode.ViewColumn.Beside);
            return;
        }

        // If not, create one.
        const panel = vscode.window.createWebviewPanel(LGDebugPanel.viewType, "LG debug", vscode.ViewColumn.Beside, {
            enableScripts: true
        });

        LGDebugPanel.currentPanel = new LGDebugPanel(panel, extensionPath);
    }

    public dispose() {
        LGDebugPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const x: vscode.Disposable = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private constructor(panel: vscode.WebviewPanel, extensionPath: string) {
        this._panel = panel;
        this._extensionPath = extensionPath;
        this._update();
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        this._panel.onDidChangeViewState(e => {
            if (this._panel.visible) {
                this._update();
            }
        }, null, this._disposables);

        // receive maeeage from webview
        this._panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'passScope':{
                    try {
                        const scope:any = JSON.parse(message.scopeValue);
                        const templateName: string = message.templateName;
                        const inlineText: string = message.inlineText;
                        const iterations:number = message.iterations;
                        let results = [];
                        
                        //let engineEntity: TemplateEngineEntity = DataStorage.templateEngineMap.get(vscode.window.visibleTextEditors[0].document.uri.fsPath);
                        let engineEntity: TemplatesEntity = DataStorage.templatesMap.get(vscode.window.visibleTextEditors[0].document.uri.fsPath);
                        if (engineEntity === undefined) {
                            vscode.window.showErrorMessage("please fix errors first.");
                        } else {
                            const engine: Templates = engineEntity.templates;

                            if(engine === undefined) {
                                vscode.window.showErrorMessage("please fix all errors first.");
                            } else {
                                const evaledResults = engine.expandTemplate(templateName, scope);
                                if (iterations >= evaledResults.length) {
                                    results = evaledResults;
                                } else {
                                    results = evaledResults.slice(0, iterations);
                                }
                                // send result to webview
                                this._panel.webview.postMessage({ command: 'evaluateResults', results: results });
                            }
                        }
                    } catch(e){
                        vscode.window.showErrorMessage(e.message);
                   }

                   break;
                }
            
                case 'getTemplates': {
                    try {
                        const source: any = message.source;
                        let result: string[] = [];
                        let templates = util.getAllTemplatesFromCurrentLGFile(vscode.window.visibleTextEditors[0].document.uri).toArray();
                        if (templates.length === 0) {
                            vscode.window.showErrorMessage("please fix all errors first.");
                        } else {
                            for (const template of templates) {
                                if (!result.includes(template.name)) {
                                    result.push(template.name);
                                }
                                
                            }
                        }

                        this._panel.webview.postMessage({ command: 'TemplateName', results: result });
                    } catch (e) {
                        vscode.window.showErrorMessage(e.message);
                    }

                    break;
                }
            
                case 'passTemplateSource': {
                    try {
                        const source: any = message.source;
                        let result: string[] = [];
                        if (source === "Template Name"){
                            let templates = util.getAllTemplatesFromCurrentLGFile(vscode.window.visibleTextEditors[0].document.uri).toArray();
                        if (templates.length === 0) {
                            vscode.window.showErrorMessage("please fix all errors first.");
                        } else {
                            for (const template of templates) {
                                result.push(template.name);
                            }
                        }

                        this._panel.webview.postMessage({ command: 'TemplateName', results: result });
                        }
                    } catch (e) {
                        vscode.window.showErrorMessage(e.message);
                    }

                    break;
                }

            }
        }, null, this._disposables);
    }

    private _update():void {
        this._panel.webview.html = this._getHtmlForWebview();
        this._panel.title = 'Language Generation Tester';
    }

    private _getHtmlForWebview(): string {
        const htmlFilePath: string = path.join(this._extensionPath, 'resources', 'lgPreviewTemplate.html');
        const htmlContent: string = fs.readFileSync(htmlFilePath, 'utf-8');
        return htmlContent;
    }
}