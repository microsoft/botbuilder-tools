/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
const manifest = require('../api/mslg');

function getServiceManifest(args) {
    if (args._.length < 1)
        return null; //bail show help
    const verb = args._[0];
    const target = (args._.length >= 2) ? args._[1] : undefined;

    const payload = getOperation(verb, target);
    return payload;
}


function getOperation(verb, target) {
    for (let apiGroupName in manifest) {
        let apiGroup = manifest[apiGroupName];
        for (let operationKey in apiGroup.operations) {
            let operation = apiGroup.operations[operationKey];
            if ((operation.methodAlias === verb) &&
                ((operation.target.length === 0 && !target) ||
                    (target && operation.target.indexOf(target.toLowerCase()) >= 0))) {
                return Object.assign({
                    operation: operation,
                    identifier: apiGroup.className,
                }, apiGroup);
            }
        }
    }
    return null;
}


module.exports = {
    getServiceManifest,
    getOperation
};