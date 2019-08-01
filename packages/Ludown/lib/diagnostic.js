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

module.exports = {
    Diagnostic: Diagnostic,
    Range: Range,
    Position: Position,
    DiagnosticSeverity: DiagnosticSeverity
}
