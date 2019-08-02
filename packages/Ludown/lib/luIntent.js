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
        const result = this.ExtractUtteranceAndEntitiesMap(parseTree);
        this.UtteranceAndEntitiesMap = result.utteranceAndEntitiesMap;
        this.Errors = result.errors;
    }

    ExtractName(parseTree) {
        return parseTree.intentNameLine().intentName().getText().trim();
    }

    ExtractUtteranceAndEntitiesMap(parseTree) {
        let utteranceAndEntitiesMap = [];
        let errors = [];
        if (parseTree.intentBody() && parseTree.intentBody().normalIntentBody()) {
            for (const normalIntentStr of parseTree.intentBody().normalIntentBody().normalIntentString()) {
                let utteranceAndEntities = visitor.visitNormalIntentStringContext(normalIntentStr);
                utteranceAndEntitiesMap.push(utteranceAndEntities);
                let leftBracketIndex = utteranceAndEntities.utterance.indexOf('{');
                let rightBracketIndex = utteranceAndEntities.utterance.indexOf('}');
                let equalIndex = utteranceAndEntities.utterance.indexOf('=');
                if (leftBracketIndex > 0 && equalIndex > leftBracketIndex && rightBracketIndex > equalIndex) {
                    errors.push(new Diagnostic(undefined, `Utterance "${normalIntentStr.getText().trim()}" has nested composite references. e.g. {a = {b = x}} is valid but {a = {b = {c = x}}} is invalid.`));
                }
            }
        }

        if (utteranceAndEntitiesMap.length === 0) {
            errors.push(new Diagnostic(undefined, `No utterances found for intent: # ${this.Name}`,  DiagnosticSeverity.WARN));
        }

        return { utteranceAndEntitiesMap, errors };
    }
}

module.exports = LUIntent;