/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { TemplateEngine } from 'botbuilder-lg';
import * as vscode from 'vscode';

export class DataStorage {
    public static templateEngineMap: Map<string, TemplateEngineEntity> = new Map<string, TemplateEngineEntity>(); // file path -> templateEngine
}

export class TemplateEngineEntity {
    public constructor(uri: vscode.Uri, templateEngine: TemplateEngine) {
        this.templateEngine = templateEngine;
        this.uri = uri;
    }
    public uri: vscode.Uri;
    public templateEngine: TemplateEngine;
}