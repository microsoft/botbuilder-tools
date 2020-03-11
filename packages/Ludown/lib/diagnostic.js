/**
 * Diagnostic class
 */
class Diagnostic {
    constructor(range, message, severity = DiagnosticSeverity.ERROR) {
        this.Message = message;
        this.Range = range;
        this.Severity = severity;
    }

    toString() {
        // ignore error range if source is "inline"
        if (this.Range === undefined) {
            return `[${DiagnosticSeverity[this.Severity]}] ${this.Message.toString()}`;
        }
        else {
            return `[${DiagnosticSeverity[this.Severity]}] ${this.Range.toString()}: ${this.Message.toString()}`;
        }
    }
}

/**
 * Range class
 */
class Range {
    constructor(start, end) {
        this.Start = start;
        this.End = end;
    }

    toString() {
        let result = this.Start.toString();
        if (this.Start.Line <= this.End.Line && this.Start.Character < this.End.Character) {
            result += ' - ';
            result += this.End.toString();
        }

        return result;
    };
}

/**
 * Position class
 */
class Position {
    constructor(line, character) {
        this.Line = line;
        this.Character = character;
    }

    toString() { return `line ${this.Line}:${this.Character}` };
}

/**
 * DiagnosticSeverity enum
 */
const DiagnosticSeverity = {
    ERROR: 'ERROR',
    WARN: 'WARN'
}

const AntlrTokens = {
    '<EOF>': 'end of file',
    'MODEL_INFO': 'model description',
    'NEWLINE': 'new line',
    'QNA': 'QnA definition',
    'HASH': 'Intent definition',
    'DOLLAR': 'Entity definition',
    'IMPORT_DESC': 'Import statement',
    'WS': 'Whitespace',
    'FILTER_MARK': 'QnA filtering section',
    "'**Filters:**'": 'QnA filtering section',
    'MULTI_LINE_TEXT': 'multiple line text'
}

const BuildDiagnostic =function(parameter) {
    let message = parameter.message;
    const severity = parameter.severity === undefined ? DiagnosticSeverity.ERROR : parameter.severity;

    let range;
    const context = parameter.context;
    if (context !== undefined) {
        const startPosition = new Position(context.start.line, context.start.column);
        const stopPosition = new Position(context.stop.line, context.stop.column + context.stop.text.length);
        range = new Range(startPosition, stopPosition);
    }
        
    return new Diagnostic(range, message, severity);
}

module.exports = {
    Diagnostic: Diagnostic,
    Range: Range,
    Position: Position,
    DiagnosticSeverity: DiagnosticSeverity,
    AntlrTokens: AntlrTokens,
    BuildDiagnostic: BuildDiagnostic
}
