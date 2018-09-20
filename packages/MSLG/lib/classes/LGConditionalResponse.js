/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class LGConditionalResponse {
    /**
     * @property {string} condition
     */
    /**
     * @property {string []} variations
     */
    constructor(condition = '', variations = []) {
        this.condition = condition?condition:'';
        this.variations = variations?variations:[];
    }
};
module.exports = LGConditionalResponse;