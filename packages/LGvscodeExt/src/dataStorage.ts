/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { TemplateEngine } from 'botbuilder-lg';

export class DataStorage {
    public static templateEngineMap: Map<string, TemplateEngine> = new Map<string, TemplateEngine>(); // file path -> templateEngine
}