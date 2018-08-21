/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const qnaAlterations = {
    alterations : class {
        /**
         * @property {string []} alterations
        */
        constructor(alterations) {
            this.alterations = alterations?alterations:[];
        }
    },
    qnaAlterations : class {
        /**
         * @property {alterations []} wordAlterations
         */
        constructor(wordAlterations) {
            this.wordAlterations = wordAlterations?wordAlterations:[];
        }
    }
};

module.exports = qnaAlterations;