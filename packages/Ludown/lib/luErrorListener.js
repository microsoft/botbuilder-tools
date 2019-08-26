const antlr4 = require('antlr4');
const Position = require('./diagnostic').Position;
const Range = require('./diagnostic').Range;
const Diagnostic = require('./diagnostic').Diagnostic;
const AntlrTokens = require('./diagnostic').AntlrTokens;

let LUErrorListener = function(errors) {
    antlr4.error.ErrorListener.call(this);
    this.errors = errors;
    return this;
}

LUErrorListener.prototype = Object.create(antlr4.error.ErrorListener.prototype);
LUErrorListener.prototype.constructor = LUErrorListener;
LUErrorListener.prototype.syntaxError = function(recognizer, offendingSymbol, line, charPositionInLine, msg, e) {
    const startPosition = new Position(line, charPositionInLine);
    const stopPosition = new Position(line, charPositionInLine + offendingSymbol.stop - offendingSymbol.start + 1);
    const range = new Range(startPosition, stopPosition);
    msg = `syntax error: ` + msg;
    const invalidToken = msg.match(/'([^']+)'/)[1];
    const expectedTokenStr = msg.substring(msg.indexOf('{') + 1, msg.lastIndexOf('}'));
    const expectedTokens = expectedTokenStr.split(',');
    if (expectedTokenStr.length > 0 && expectedTokens.length > 0) {
        msg = `syntax error: invalid input '${invalidToken}' detected. Expecting one of this - `;
        expectedTokens.forEach(token => {
            msg += AntlrTokens[token.trim()] + ', ';
        });

        msg = msg.substring(0, msg.lastIndexOf(', '));
    }
    
    const diagnostic = new Diagnostic(range, msg);
    this.errors.push(diagnostic);
}

module.exports = LUErrorListener;