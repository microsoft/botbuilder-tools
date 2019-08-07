const IntentDefinitionContext = require('./generated/LUFileParser').LUFileParser.IntentDefinitionContext;
const visitor = require('./visitor');
const DiagnosticSeverity = require('./diagnostic').DiagnosticSeverity;
const BuildDiagnostic = require('./diagnostic').BuildDiagnostic;
const LUISObjNameEnum = require('./enums/luisobjenum');

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
        const result = this.ExtractUtteranceAndEntitiesMap(parseTree, source);
        this.UtteranceAndEntitiesMap = result.utteranceAndEntitiesMap;
        this.Errors = result.errors;
    }

    ExtractName(parseTree) {
        return parseTree.intentNameLine().intentName().getText().trim();
    }

    ExtractUtteranceAndEntitiesMap(parseTree, source) {
        let utteranceAndEntitiesMap = [];
        let errors = [];
        if (parseTree.intentBody() && parseTree.intentBody().normalIntentBody()) {
            for (const normalIntentStr of parseTree.intentBody().normalIntentBody().normalIntentString()) {
                let utteranceAndEntities = visitor.visitNormalIntentStringContext(normalIntentStr);
                utteranceAndEntities.context = normalIntentStr;
                utteranceAndEntitiesMap.push(utteranceAndEntities);
                let leftBracketIndex = utteranceAndEntities.utterance.indexOf('{');
                let rightBracketIndex = utteranceAndEntities.utterance.indexOf('}');
                let equalIndex = utteranceAndEntities.utterance.indexOf('=');
                if (leftBracketIndex >= 0 && equalIndex > leftBracketIndex && rightBracketIndex > equalIndex) {
                    let errorMsg = `utterance "${normalIntentStr.getText().trim()}" has nested composite references. e.g. {a = {b = x}} is valid but {a = {b = {c = x}}} is invalid.`
                    let error = BuildDiagnostic({
                        message: errorMsg,
                        severity: DiagnosticSeverity.ERROR,
                        context: normalIntentStr,
                        source: source
                    })

                    errors.push(error);
                }

                if (utteranceAndEntities.entities.length > 1
                    && utteranceAndEntities.entities[0].type !== LUISObjNameEnum.PATTERNANYENTITY 
                    && leftBracketIndex >= 0
                    && rightBracketIndex > leftBracketIndex
                    && equalIndex === -1) {
                    let errorMsg = `Composite entity "${utteranceAndEntities.entities[0].entity}" includes pattern.any entity "${utteranceAndEntities.utterance}".\r\n\tComposites cannot include pattern.any entity as a child.`
                    let error = BuildDiagnostic({
                        message: errorMsg,
                        severity: DiagnosticSeverity.ERROR,
                        context: normalIntentStr,
                        source: source
                    })

                    errors.push(error);
                }
            }
        }

        if (utteranceAndEntitiesMap.length === 0) {
            let errorMsg = `no utterances found for intent definition: "# ${this.Name}"`
            let error = BuildDiagnostic({
                message: errorMsg,
                severity: DiagnosticSeverity.WARN,
                context: parseTree.intentNameLine(),
                source: source
            })

            errors.push(error);
        }

        return { utteranceAndEntitiesMap, errors };
    }
}

module.exports = LUIntent;