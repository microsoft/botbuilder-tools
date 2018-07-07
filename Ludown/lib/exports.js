#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
export const helpers = require('./enums/CLI-errors');
module.exports = require('./parseFileContents');
export const translate = require('./translate-helpers');