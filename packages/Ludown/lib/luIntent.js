const IntentDefinitionContext = require('./generated/LUFileParser').LUFileParser.IntentDefinitionContext;
const visitor = require('./visitor');
const DiagnosticSeverity = require('./diagnostic').DiagnosticSeverity;
const BuildDiagnostic = require('./diagnostic').BuildDiagnostic;
const LUISObjNameEnum = require('./enums/luisobjenum');

class LUIntent {
    /**
     * 
     * @param {IntentDefinitionContext} parseTree 
     */
    constructor(parseTree) {
        this.ParseTree = parseTree;
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
                utteranceAndEntities.context = normalIntentStr;
                utteranceAndEntitiesMap.push(utteranceAndEntities);
                utteranceAndEntities.errorMsgs.forEach(errorMsg => errors.push(BuildDiagnostic({
                    message: errorMsg,
                    context: normalIntentStr
                })))
            }
        }

        if (utteranceAndEntitiesMap.length === 0) {
            let errorMsg = `no utterances found for intent definition: "# ${this.Name}"`
            let error = BuildDiagnostic({
                message: errorMsg,
                context: parseTree.intentNameLine(),
                severity: DiagnosticSeverity.WARN
            })

            errors.push(error);
        }

        return { utteranceAndEntitiesMap, errors };
    }
}

module.exports = LUIntent;