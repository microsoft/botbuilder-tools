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
    }

    ExtractName(parseTree) {
        return parseTree.entityLine().entityName().getText();
    }

    ExtractType(parseTree) {
        return parseTree.entityLine().entityType().getText();
    }
}

module.exports = LUEntity;