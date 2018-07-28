/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const EntityTypeEnum = require('../enums/LGEntityType');
class LGEntity {
    /**
     * @property {String} name
     */
    /**
     * @property {EntityType} entityType
     */
    /**
     * @property {kvpair[]} attributions
     */
    constructor(name, entityType, attributions) {
        this.name = name?name:undefined;
        this.entityType = entityType?LGEntity.getEntityType(entityType):EntityTypeEnum.String.name;
        this.attributions = attributions?attributions:[];
    }
};

module.exports = LGEntity;

LGEntity.getEntityType = function(entityType) {
    for (var key in EntityTypeEnum) {
        if (!EntityTypeEnum.hasOwnProperty(key)) continue;
        if(EntityTypeEnum[key].acceptedTypeNames.includes(entityType)) return EntityTypeEnum[key].name;
    }
    return EntityTypeEnum.String.name;
};