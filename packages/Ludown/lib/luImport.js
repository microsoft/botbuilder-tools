const ImportDefinitionContext = require('./generated/LUFileParser').LUFileParser.ImportDefinitionContext;
const DiagnosticSeverity = require('./diagnostic').DiagnosticSeverity;
const BuildDiagnostic = require('./diagnostic').BuildDiagnostic;

class LUImport {
    /**
     * 
     * @param {ImportDefinitionContext} parseTree 
     * @param {string} source 
     */
    constructor(parseTree, source = '') {
        this.ParseTree = parseTree;
        this.Source = source;
        this.Description = this.ExtractDescription(parseTree);
        let result = this.ExtractPath(parseTree, source);
        this.Path = result.importPath;
        this.Errors = result.errors;
    }

    ExtractDescription(parseTree) {
        return parseTree.IMPORT_DESC().getText();
    }

    ExtractPath(parseTree, source) {
        let errors = [];
        let importPath = parseTree.IMPORT_PATH().getText().replace('(', '').replace(')', '');
        if (importPath === undefined || importPath === '') {
            let errorMsg = `LU file reference path is empty: "${parseTree.getText()}"`;
            let error = BuildDiagnostic({
                message: errorMsg,
                severity: DiagnosticSeverity.ERROR,
                context: parseTree,
                source: source
            })

            errors.push(error);
        }

        return { importPath, errors };
    }
}

module.exports = LUImport;