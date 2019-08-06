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

const BuildDiagnostic =function(parameter) {
    let message = parameter.message;
    const severity = parameter.severity === undefined ? DiagnosticSeverity.ERROR : parameter.severity;
    const context = parameter.context;
    const startPosition = context === undefined ? new Position(0, 0) : new Position(context.start.line - 1, context.start.column);
    const stopPosition = context === undefined ? new Position(0, 0) : new Position(context.stop.line - 1, context.stop.column + context.stop.text.length);
    const range = new Range(startPosition, stopPosition);
    message = `error message: ${message}`;
    if (parameter.source !== undefined && parameter.source !== '') {
        message = `source: ${parameter.source}, ${message}`;
    }

    return new Diagnostic(range, message, severity);
}

module.exports = {
    Diagnostic: Diagnostic,
    Range: Range,
    Position: Position,
    DiagnosticSeverity: DiagnosticSeverity,
    BuildDiagnostic: BuildDiagnostic
}
