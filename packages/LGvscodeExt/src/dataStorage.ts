import * as vscode from 'vscode';
import { TemplateEngine } from 'botbuilder-lg';

export class DataStorage {
    public static templateNames: string[] = []; // code Completion Item
    public static engine: TemplateEngine = undefined;
}