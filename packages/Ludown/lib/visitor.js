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
                    let entityObjects = this.extractEntityFromUtterence(innerNode.getText());
                    if (entityObjects[0].entityValue !== undefined) {
                        // simple entitiy
                        utterance = utterance.concat(entityObjects[0].entityValue);
                        for (const entityObject of entityObjects) {
                            let startPos = utterance.lastIndexOf(entityObject.entityValue);
                            let endPos = startPos + entityObject.entityValue.length - 1;
                            entities.push({
                                type: LUISObjNameEnum.ENTITIES,
                                entity: entityObject.entityName,
                                role: entityObject.role,
                                startPos: startPos,
                                endPos: endPos
                            });
                        }
                    } else {
                        // pattern.any entity
                        utterance = utterance.concat(innerNode.getText());
                        entities.push({
                            type: LUISObjNameEnum.PATTERNANYENTITY,
                            entity: entityObject[0].entityName,
                            role: entityObject[0].roleName
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
        let entities = []
        exp = exp.substring(1, exp.length - 1).trim();

        let equalIndex = exp.indexOf('=');
        
        if (equalIndex !== -1) {
            let entityName = exp.substring(0, equalIndex).trim();
            let entityValue = exp.substring(equalIndex + 1).trim();
            let compositeEntityLeftIndex = entityValue.indexOf('{');
            let compositeEntityRightIndex = entityValue.indexOf('}');
            let updatedEntityValue = entityValue;
            while (compositeEntityLeftIndex > -1 && compositeEntityRightIndex > -1)
            {
                let compositeEntityDefinition = updatedEntityValue.substring(compositeEntityLeftIndex + 1, compositeEntityRightIndex).trim();
                let compositeEntityEqualIndex = compositeEntityDefinition.indexOf('=');
                if (compositeEntityEqualIndex != -1) {
                    let compositeEntityName = compositeEntityDefinition.substring(0, compositeEntityEqualIndex).trim();
                    let compositeEntityValue = compositeEntityDefinition.substring(compositeEntityEqualIndex + 1).trim();
                    entities.push({ entityName: compositeEntityName, entityValue: compositeEntityValue });
                    updatedEntityValue = updatedEntityValue.substring(0, compositeEntityLeftIndex) + compositeEntityValue + updatedEntityValue.substring(compositeEntityRightIndex + 1);
                    compositeEntityLeftIndex = updatedEntityValue.indexOf('{');
                    compositeEntityRightIndex = updatedEntityValue.indexOf('}');
                }
            }

            entities.unshift({ entityName, entityValue: updatedEntityValue });

            entities.forEach(entity => {
                let colonIndex = entity.entityName.indexOf(':');
                if (colonIndex !== -1) {
                    let entityName = entity.entityName.substring(0, colonIndex).trim();
                    let roleName = entity.entityName.substring(colonIndex + 1).trim();
                    entity.entityName = entityName;
                    entity.role = roleName;
                }
            });
        } else {
            let colonIndex = exp.indexOf(':');
            if (colonIndex !== -1) {
                let entityName = exp.substring(0, colonIndex).trim();
                let roleName = exp.substring(colonIndex + 1).trim();
                entities.push({ entityName, undefined, roleName });
            } else {
                let entityName = exp.trim();
                entities.push({ entityName, undefined });
            }
        }

        return entities;
    }
}

module.exports = Visitor;