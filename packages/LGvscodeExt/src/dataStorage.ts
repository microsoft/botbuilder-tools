import * as vscode from 'vscode';
import { TemplateEngine } from 'botbuilder-lg';

export class DataStorage {
    public static templateEngineMap: Map<string, TemplateEngine> = new Map<string, TemplateEngine>(); // uri-> templateEngine
}