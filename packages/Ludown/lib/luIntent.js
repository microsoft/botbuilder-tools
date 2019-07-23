const IntentDefinitionContext = require('./generated/LUFileParser').LUFileParser.IntentDefinitionContext;

class LUIntent {
    /**
     * 
     * @param {IntentDefinitionContext} parseTree 
     * @param {string} source 
     */
    constructor(parseTree, source = '') {
        this.ParseTree = parseTree;
        this.Source = source;

        this.Name = this.ExtractName(parseTree);
        this.Body = this.ExtractBody(parseTree);
    }

    ExtractName(parseTree) {
        return parseTree.intentNameLine().intentName().getText();
    }

    ExtractBody(parseTree) {
        if (parseTree.intentBody() === undefined) {
            return undefined;
        }

        const eof = '<EOF>';
        const originText = parseTree.intentBody().getText();
        let result = originText.endsWith(eof) ? originText.substr(0, originText.length - eof.length) : originText;
        result = result.replace(/\n$/g, '').replace(/\r$/, '');

        return result;
    }
}

module.exports = LUIntent;