#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const pkg = require('../package.json');
let args = '';

process.argv.forEach((val, index) => {
    if (index > 1) {
        args = args + ' ' + val;
    }
});
args = args.trim();
if (args == '-v' || args == '--version') {
    return process.stdout.write(pkg.version);
}

process.argv= [process.argv[0], process.argv[1], __dirname + '/netcoreapp2.1/Dispatch.dll', ...process.argv.slice(2)]
require("dotnet-2.1")
