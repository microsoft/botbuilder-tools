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
        this.SynonymsList = this.ExtractSynonymsList(parseTree);
    }

    ExtractName(parseTree) {
        return parseTree.entityLine().entityName().getText();
    }

    ExtractType(parseTree) {
        return parseTree.entityLine().entityType().getText();
    }

    ExtractSynonymsList(parseTree) {
        var synonymsList = [];
        if (parseTree.entityListBody()) {
            for (const normalItemStr of parseTree.entityListBody().normalItemString()) {
                var itemStr = normalItemStr.getText();
                synonymsList.push(itemStr.substr(itemStr.indexOf('-') + 1).trim());
            }
        }

        return synonymsList;
    }
}

module.exports = LUEntity;