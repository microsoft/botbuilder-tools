const EntityDefinitionContext = require('./generated/LUFileParser').LUFileParser.EntityDefinitionContext;
const Diagnostic = require('./diagnostic').Diagnostic;
const DiagnosticSeverity = require('./diagnostic').DiagnosticSeverity;

class LUEntity {
    /**
     * 
     * @param {EntityDefinitionContext} parseTree 
     * @param {string} source 
     */
    constructor(parseTree, source = '') {
        this.ParseTree = parseTree;
        this.Source = source;
        this.Name = this.ExtractName(parseTree);
        this.Type = this.ExtractType(parseTree);
        this.SynonymsOrPhraseList = this.ExtractSynonymsOrPhraseList(parseTree);

        this.Errors = [];
        if (this.Type.indexOf('=') > -1 && this.SynonymsOrPhraseList.length === 0) {
            this.Errors.push(new Diagnostic(undefined, `No synonyms list found for list entity: # ${this.Name}`,  DiagnosticSeverity.WARN));
        }
    }

    ExtractName(parseTree) {
        return parseTree.entityLine().entityName().getText().trim();
    }

    ExtractType(parseTree) {
        return parseTree.entityLine().entityType().getText().trim();
    }

    ExtractSynonymsOrPhraseList(parseTree) {
        var synonymsOrPhraseList = [];
        if (parseTree.entityListBody()) {
            for (const normalItemStr of parseTree.entityListBody().normalItemString()) {
                var itemStr = normalItemStr.getText().trim();
                synonymsOrPhraseList.push(itemStr.substr(1).trim());
            }
        }

        return synonymsOrPhraseList;
    }
}

module.exports = LUEntity;