const operations = require('./operations');

module.exports = function getOperation(verb, target) {
    if (!verb)
        throw new Error(`verb is missing`);
    if (!target)
        throw new Error(`resource is missing`);
    let operation;
    let verbFound = false;
    for (let iOperation in operations) {
        const operation = operations[iOperation];

        if (operation.methodAlias == verb) {
            verbFound = true;

            if (operation.target.indexOf(target.toLowerCase()) >= 0) {
                return operation;
            }
        }
    }
    return null;
}

