/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const exportsObj = {
    parser: {
        parse: require('./parser').parse,
        collate: require('./parser').collate
    }
};

module.exports = exportsObj;