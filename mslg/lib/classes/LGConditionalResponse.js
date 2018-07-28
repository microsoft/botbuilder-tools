/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const validation = require('../validation');
const LGConditionalResponse = class {
    /**
     * @property {string} condition
     */
    /**
     * @property {string []} variations
     */
    constructor(condition, variations) {
        if(condition) {
            try {
                // TODO: finish condition validation. Condition can be an expression or a callback function
                // validation.validateCondition(condition);
            } catch (err) {
                throw (err);
            }
        }
        this.condition = condition?condition:'';
        this.variations = variations?variations:[];
    }
};
module.exports = LGConditionalResponse;