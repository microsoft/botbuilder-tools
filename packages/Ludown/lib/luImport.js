const ImportDefinitionContext = require('./generated/LUFileParser').LUFileParser.ImportDefinitionContext;
const DiagnosticSeverity = require('./diagnostic').DiagnosticSeverity;
const BuildDiagnostic = require('./diagnostic').BuildDiagnostic;

class LUImport {
    /**
     * 
     * @param {ImportDefinitionContext} parseTree 
     */
    constructor(parseTree) {
        this.ParseTree = parseTree;
        this.Description = this.ExtractDescription(parseTree);
        let result = this.ExtractPath(parseTree);
        this.Path = result.importPath;
        this.Errors = result.errors;
    }

    ExtractDescription(parseTree) {
        return parseTree.IMPORT_DESC().getText();
    }

    ExtractPath(parseTree) {
        let errors = [];
        let importPath = parseTree.IMPORT_PATH().getText().replace('(', '').replace(')', '');
        if (importPath === undefined || importPath === '') {
            let errorMsg = `LU file reference path is empty: "${parseTree.getText()}"`;
            let error = BuildDiagnostic({
                message: errorMsg,
                context: parseTree
            })

            errors.push(error);
        }

        return { importPath, errors };
    }
}

module.exports = LUImport;