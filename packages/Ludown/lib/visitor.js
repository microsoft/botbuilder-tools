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
        let errorMsgs = [];
        for (const node of ctx.children) {
            const innerNode = node;
            switch (innerNode.symbol.type) {
                case lp.DASH: break;
                case lp.EXPRESSION: {
                    let result = this.extractEntityFromUtterence(innerNode.getText());
                    let entityObjects = result.entities;
                    errorMsgs = errorMsgs.concat(result.errorMsgs);
                    if (entityObjects[entityObjects.length - 1].entityValue !== undefined) {
                        // simple entitiy
                        utterance = utterance.concat(entityObjects[entityObjects.length - 1].entityValue);
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
                            entity: entityObjects[0].entityName,
                            role: entityObjects[0].role
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

        return { utterance, entities, errorMsgs };
    }

    /**
     * @param {string} exp 
     * @returns {object}
     */
    static extractEntityFromUtterence(exp) {
        let entities = [];
        let errorMsgs = [];

        exp = exp.substring(1, exp.length - 1).trim();
        let equalIndex = exp.indexOf('=');
        if (equalIndex !== -1) {
            // entity with labelled value
            let entityName = exp.substring(0, equalIndex).trim();
            let entityValue = exp.substring(equalIndex + 1).trim();

            let updatedEntityValue = entityValue;
            let compositeEntityRightIndex = updatedEntityValue.indexOf('}');
            let compositeEntityLeftIndex = updatedEntityValue.substring(0, compositeEntityRightIndex).lastIndexOf('{');
            while (compositeEntityLeftIndex > -1 && compositeEntityRightIndex > compositeEntityLeftIndex) {
                // composite entities
                let compositeEntityDefinition = updatedEntityValue.substring(compositeEntityLeftIndex + 1, compositeEntityRightIndex).trim();
                let compositeEntityEqualIndex = compositeEntityDefinition.indexOf('=');
                if (compositeEntityEqualIndex !== -1) {
                    let compositeEntityName = compositeEntityDefinition.substring(0, compositeEntityEqualIndex).trim();
                    let compositeEntityValue = compositeEntityDefinition.substring(compositeEntityEqualIndex + 1).trim();
                    entities.push({ entityName: compositeEntityName, entityValue: compositeEntityValue });
                    updatedEntityValue = updatedEntityValue.substring(0, compositeEntityLeftIndex) + compositeEntityValue + updatedEntityValue.substring(compositeEntityRightIndex + 1);
                    compositeEntityRightIndex = updatedEntityValue.indexOf('}');
                    compositeEntityLeftIndex = updatedEntityValue.substring(0, compositeEntityRightIndex).lastIndexOf('{');
                } else {
                    errorMsgs.push(`Composite entity "${entityName}" includes pattern.any entity "${compositeEntityDefinition}".\r\n\tComposites cannot include pattern.any entity as a child.`)
                    break;
                }
            }

            entities.push({ entityName: entityName, entityValue: updatedEntityValue });
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
            // pattern.any entity
            let colonIndex = exp.indexOf(':');
            if (colonIndex !== -1) {
                let entityName = exp.substring(0, colonIndex).trim();
                let roleName = exp.substring(colonIndex + 1).trim();
                entities.push({ entityName: entityName, role: roleName });
            } else {
                let entityName = exp.trim();
                entities.push({ entityName: entityName });
            }
        }

        return { entities, errorMsgs };
    }
}

module.exports = Visitor;