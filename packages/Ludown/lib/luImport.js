const ImportDefinitionContext = require('./generated/LUFileParser').LUFileParser.ImportDefinitionContext;

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
        this.Path = this.ExtractPath(parseTree);
    }

    ExtractDescription(parseTree) {
        return parseTree.IMPORT_DESC().getText();
    }

    ExtractPath(parseTree) {
        return parseTree.IMPORT_PATH().getText();
    }
}

module.exports = LUImport;