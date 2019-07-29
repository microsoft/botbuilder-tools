const EntityDefinitionContext = require('./generated/LUFileParser').LUFileParser.EntityDefinitionContext;

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
                var itemStr = normalItemStr.getText();
                synonymsOrPhraseList.push(itemStr.trim().substr(1).trim());
            }
        }

        return synonymsOrPhraseList;
    }
}

module.exports = LUEntity;