import * as vscode from 'vscode';
import { TemplateEngine } from 'botbuilder-lg';

export class DataStorage {
    public static compItems: vscode.CompletionItem[] = []; // code Completion Item
    public static engine: TemplateEngine = undefined;
}