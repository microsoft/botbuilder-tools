const lp = require('./generated/LUFileParser').LUFileParser;
const LUISObjNameEnum = require('./enums/luisobjenum');

class Visitor {
    /**
     * @param {lp.NormalIntentStringContext} ctx
     * @returns {object}
     */
    static visitNormalIntentStringContext(ctx) {
        let utterance = '';
        let entities = [];
        for (const node of ctx.children) {
            const innerNode = node;
            switch (innerNode.symbol.type) {
                case lp.DASH: break;
                case lp.EXPRESSION: {
                    let entityObject = this.extractEntityFromUtterence(innerNode.getText());
                    if (entityObject.entityValue !== undefined) {
                        // simple entitiy
                        utterance = utterance.concat(entityObject.entityValue);
                        let startPos = utterance.lastIndexOf(entityObject.entityValue);
                        let endPos = startPos + entityObject.entityValue.length - 1;
                        entities.push({
                            type: LUISObjNameEnum.ENTITIES,
                            entity: entityObject.entityName,
                            startPos: startPos,
                            endPos: endPos
                        });
                    } else {
                        // pattern.any entity
                        utterance = utterance.concat(innerNode.getText());
                        entities.push({
                            type: LUISObjNameEnum.PATTERNANYENTITY,
                            entity: entityObject.entityName
                        })
                    }
                    break;
                }
                default: {
                    utterance = utterance.concat(innerNode.getText());
                    break;
                }
            }
        }

        return { utterance, entities };
    }

    /**
     * @param {string} exp 
     * @returns {object}
     */
    static extractEntityFromUtterence(exp) {
        exp = exp.replace(/(^{*)/g, '')
            .replace(/(}*$)/g, '');

        let equalIndex = exp.indexOf('=');
        if (equalIndex != -1) {
            let entityName = exp.substring(0, equalIndex).trim();
            let entityValue = exp.substring(equalIndex + 1).trim();

            return { entityName, entityValue };
        } else {
            let entityName = exp.trim();

            return { entityName, undefined };
        }
    }
}

module.exports = Visitor;