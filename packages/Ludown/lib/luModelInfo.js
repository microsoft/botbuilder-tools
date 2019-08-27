const ModelInfoDefinitionContext = require('./generated/LUFileParser').LUFileParser.ModelInfoDefinitionContext;
const DiagnosticSeverity = require('./diagnostic').DiagnosticSeverity;
const BuildDiagnostic = require('./diagnostic').BuildDiagnostic;

class LUModelInfo {
    /**
     * 
     * @param {ImportDefinitionContext} parseTree 
     */
    constructor(parseTree) {
        this.ParseTree = parseTree;
        this.ModelInfo = parseTree.getText();
    }
}

module.exports = LUModelInfo;