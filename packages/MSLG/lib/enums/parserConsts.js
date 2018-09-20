/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
module.exports = {
    CONDITION: 'CASE:',
    INTENT: "#",
    DEFAULT: "DEFAULT:",
    ELSE: "Else",
    FILEREF: "[",
    ENTITY: '$',
    COMMENT: '>',
    TOKENIZER: {
        OPERATORS: {
            '=': {
                name: 'EQUAL',
                value: '=',
                completionToken: [],
                composites: []
            },
            '(': {
                name: 'OPENPARAN',
                value: '(',
                completionToken: [],
                composites: []
            },
            ')': {
                name: 'CLOSEPARAN',
                value: ')',
                completionToken: [],
                composites: []
            },
            '{': {
                name: 'OPENPARANCURLEY',
                value: '{',
                completionToken: [],
                composites: []
            },
            '}': {
                name: 'CLOSEPARANCURLEY',
                value: '}',
                completionToken: [],
                composites: []
            },
            '!': {
                name: 'NOTEQUAL',
                completionToken: ['='],
                value: '!=',
                composites: []
            },
            '>': {
                name: 'GREATERTHAN',
                value: '>',
                completionToken: [],
                composites: [
                    {
                        '=': {
                            name: 'GREATERTHANEQUAL',
                            value: '>='
                        }
                    }
                ]
            },
            '<': {
                name: 'LESSTHAN',
                value: '<',
                completionToken: [],
                composites: [
                    {
                        '=': {
                            name: 'LESSTHANEQUAL',
                            value: '<='
                        }
                    }
                ]
            },
            '&': {
                name: 'AND',
                completionToken: ['&'],
                value: '&&',
                composites: []
            },
            '|': {
                name: 'OR',
                completionToken: ['|'],
                value: '||',
                composites: []
            },
            ',': {
                name: 'COMMA',
                completionToken: [],
                value: ',',
                composites: []
            }
            
        }
    }
};