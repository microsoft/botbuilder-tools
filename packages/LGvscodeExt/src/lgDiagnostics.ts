/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LGTemplate, StaticChecker, Diagnostic, LGParser, Position, Range} from 'botbuilder-lg';


/**
 * Get diagnostics from botbuilder-lg library
 *
 * @export
 * @class LGDiagnostics
 */
export class LGDiagnostics 
{
    public static GetLGDiagnostics(lgFileContent: string): Diagnostic[] {
        let diagnostics: Diagnostic[] = [];
        let templates: LGTemplate[] = [];
        const parseResult: { isValid: boolean; templates: LGTemplate[]; error: Diagnostic } = LGParser.TryParse(lgFileContent);
        if (parseResult.isValid) {
            // Get static check diagnostics
            templates = parseResult.templates;
            if (templates !== undefined && templates.length > 0) {
                diagnostics = new StaticChecker(templates).Check();
            }
        } else {
        // Get parser diagnostic
        const start: Position = parseResult.error.Range.Start;
        const end: Position = parseResult.error.Range.End;
        const error: Diagnostic = new Diagnostic(
            new Range(
                new Position(start.Line, start.Character),
                new Position(end.Line, end.Character)),
            parseResult.error.Message,
            parseResult.error.Severity);
        
            diagnostics = diagnostics.concat(error);
        }

        return diagnostics;
    }
}