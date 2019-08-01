const IntentDefinitionContext = require('./generated/LUFileParser').LUFileParser.IntentDefinitionContext;
const visitor = require('./visitor');
const Diagnostic = require('./diagnostic').Diagnostic;
const DiagnosticSeverity = require('./diagnostic').DiagnosticSeverity;

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
        this.UtteranceAndEntitiesMap = this.ExtractUtteranceAndEntitiesMap(parseTree);

        this.Errors = [];
        if (this.UtteranceAndEntitiesMap.length === 0) {
            this.Errors.push(new Diagnostic(undefined, `No utterances found for intent: # ${this.Name}`,  DiagnosticSeverity.WARN));
        }
    }

    ExtractName(parseTree) {
        return parseTree.intentNameLine().intentName().getText().trim();
    }

    ExtractUtteranceAndEntitiesMap(parseTree) {
        let UtteranceAndEntitiesMap = [];
        if (parseTree.intentBody() && parseTree.intentBody().normalIntentBody()) {
            for (const normalIntentStr of parseTree.intentBody().normalIntentBody().normalIntentString()) {
                let utteranceAndEntities = visitor.visitNormalIntentStringContext(normalIntentStr);
                UtteranceAndEntitiesMap.push(utteranceAndEntities);
            }
        }

        return UtteranceAndEntitiesMap;
    }
}

module.exports = LUIntent;