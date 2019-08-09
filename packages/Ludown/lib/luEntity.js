const EntityDefinitionContext = require('./generated/LUFileParser').LUFileParser.EntityDefinitionContext;
const DiagnosticSeverity = require('./diagnostic').DiagnosticSeverity;
const BuildDiagnostic = require('./diagnostic').BuildDiagnostic;

class LUEntity {
    /**
     * 
     * @param {EntityDefinitionContext} parseTree 
     */
    constructor(parseTree) {
        this.ParseTree = parseTree;
        this.Name = this.ExtractName(parseTree);
        this.Type = this.ExtractType(parseTree);
        const result = this.ExtractSynonymsOrPhraseList(parseTree);
        this.SynonymsOrPhraseList = result.synonymsOrPhraseList;
        this.Errors = result.errors;
    }

    ExtractName(parseTree) {
        return parseTree.entityLine().entityName().getText().trim();
    }

    ExtractType(parseTree) {
        return parseTree.entityLine().entityType().getText().trim();
    }

    ExtractSynonymsOrPhraseList(parseTree) {
        let synonymsOrPhraseList = [];
        let errors = [];

        if (parseTree.entityListBody()) {
            for (const normalItemStr of parseTree.entityListBody().normalItemString()) {
                var itemStr = normalItemStr.getText().trim();
                synonymsOrPhraseList.push(itemStr.substr(1).trim());
            }
        }

        if (this.Type.indexOf('=') > -1 && synonymsOrPhraseList.length === 0) {
            let errorMsg = `no synonyms list found for list entity definition: "${parseTree.entityLine().getText()}"`;
            let error = BuildDiagnostic({
                message: errorMsg,
                context: parseTree.entityLine(),
                severity: DiagnosticSeverity.WARN
            })

            errors.push(error);
        }

        return { synonymsOrPhraseList, errors };
    }
}

module.exports = LUEntity;