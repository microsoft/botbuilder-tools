/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ReturnType } from "botbuilder-expression";
export class FunctionEntity {
    public constructor(params: string[], returntype: ReturnType, introduction: string) {
        this.Params = params;
        this.Returntype = returntype;
        this.Introduction = introduction;
    }
    public Params: string[];
    public Returntype: ReturnType;
    public Introduction: string;
}

// todo should add params info and other info og the function
export const buildInfunctionsMap: Map<string, FunctionEntity> = new Map<string, FunctionEntity> ([
    ['min', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    ['max', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the largest value from a collection')],
    //['average', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    ['sum', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Return the result from adding numbers in a list.')],
    ['exists', new FunctionEntity(['expression: expression'], ReturnType.Boolean, 'Returns the smallest value from a collection')],
    ['length', new FunctionEntity(['str: string'], ReturnType.Number, 'Returns the length of a string')],
    ['replace', new FunctionEntity(['text: string', 'oldText: string', 'newText: string'], ReturnType.String, 'Replace a substring with the specified string, and return the updated string. case sensitive')],
    ['replaceIgnoreCase', new FunctionEntity(['text: string', 'oldText: string', 'newText: string'], ReturnType.String, 'Replace a substring with the specified string, and return the updated string. Case in-sensitive')],
    ['split', new FunctionEntity(['text: string', 'delimiter: string'], ReturnType.Object, 'Returns an array that contains substrings based on the delimiter specified.')],
    ['substring', new FunctionEntity(['text: string', 'startIndex: number', 'length?: number'], ReturnType.String, 'Returns characters from a string. Substring(sourceString, startPos, endPos). startPos cannot be less than 0. endPos greater than source strings length will be taken as the max length of the string')],
    ['toLower', new FunctionEntity(['text: string'], ReturnType.String, 'Convert a string to all upper case characters')],
    ['toUpper', new FunctionEntity(['text: string'], ReturnType.String, 'Convert a string to all lower case characters')],
    ['trim', new FunctionEntity(['text: string'], ReturnType.String, 'Remove leading and trailing white spaces from a string')],
    ['count', new FunctionEntity(['collection: string|Array'], ReturnType.Number, 'Returns the number of items in the collection')],
    ['contains', new FunctionEntity(['collection: stirng|Array|Map', 'value: stirng|Array|Map'], ReturnType.Boolean, 'Works to find an item in a string or to find an item in an array or to find a parameter in a complex object. E.g. contains(‘hello world, ‘hello); contains([‘1’, ‘2’], ‘1’); contains({“foo”:”bar”}, “foo”)')],
    ['join', new FunctionEntity(['collection: Array', 'delimiter: string'], ReturnType.String, 'Return a string that has all the items from an array and has each character separated by a delimiter.')],
    ['first', new FunctionEntity(['collection: string|Array'], ReturnType.Object, 'Returns the first item from the collection')],
    ['last', new FunctionEntity(['collection: string|Array'], ReturnType.Object, 'Returns the last item from the collection')],
    ['foreach', new FunctionEntity(['collection: Array', 'iteratorName: string', 'function: any'], ReturnType.Object, 'Operate on each element and return the new collection')],
    ['addDays', new FunctionEntity(['timestamp: string', 'days: number', 'format?: string'], ReturnType.String, 'Add number of specified days to a given timestamp')],
    ['addHours', new FunctionEntity(['timestamp: string', 'hours: number', 'format?: string'], ReturnType.String, 'Add specified number of hours to a given timestamp')],
    ['addMinutes', new FunctionEntity(['timestamp: string', 'minutes: number', 'format?: string'], ReturnType.String, 'Add specified number of minutes to a given timestamp')],
    ['addSeconds', new FunctionEntity(['timestamp: string', 'seconds: number', 'format?: string'], ReturnType.String, 'Add specified number of seconds to a given timestamp')],
    ['dayOfMonth', new FunctionEntity(['timestamp: string'], ReturnType.Number, 'Returns day of month for a given timestamp or timex expression.')],
    //['month', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the month of given timestamp')],
    //['date', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns date for a given timestamp')],
    //['year', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns year for the given timestamp')],
    ['utcNow', new FunctionEntity(['format?: string'], ReturnType.String, 'Returns current timestamp as string')],
    ['formatDateTime', new FunctionEntity(['timestamp: string', 'format?: string'], ReturnType.String, 'Return a timestamp in the specified format.')],
    ['subtractFromTime', new FunctionEntity(['timestamp: string', 'interval: number', 'timeUnit: string','format?: string'], ReturnType.String, 'Subtract a number of time units from a timestamp.')],
    ['dateReadBack', new FunctionEntity(['...numbers: number[]'], ReturnType.String, 'Uses the date-time library to provide a date readback. dateReadBack(currentDate, targetDate). E.g. dateReadBack(‘2016/05/30’,’2016/05/23’)=>"Yesterday"')],
    //['getTimeOfDay', new FunctionEntity(['...numbers: number[]'], ReturnType.String, 'Returns time of day for a given timestamp (midnight = 12AM, morning = 12:01AM – 11:59PM, noon = 12PM, afternoon = 12:01PM -05:59PM, evening = 06:00PM – 10:00PM, night = 10:01PM – 11:59PM)')],
    ['float', new FunctionEntity(['value: string'], ReturnType.Number, 'Return floating point representation of the specified string or the string itself if conversion is not possible')],
    ['int', new FunctionEntity(['value: string'], ReturnType.Number, 'Return integer representation of the specified string or the string itself if conversion is not possible')],
    ['string', new FunctionEntity(['value: any'], ReturnType.String, 'Return string version of the specified value')],
    ['bool', new FunctionEntity(['value: any'], ReturnType.Boolean, 'Return Boolean representation of the specified string. Bool(‘true’), bool(1)')],
    ['createArray', new FunctionEntity(['...objects: any[]'], ReturnType.Object, 'Create an array from multiple inputs')],
    ['if', new FunctionEntity(['expression: boolean', 'valueIfTrue: any', 'valueIfFalse: any'], ReturnType.Object, 'if(exp, valueIfTrue, valueIfFalse)')],
    ['rand', new FunctionEntity(['minValue: number', 'maxValue: number'], ReturnType.Number, 'Returns a random number between specified min and max value – rand(<minValue>, <maxValue>)')],
    //['json', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['getProperty', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['addProperty', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['removeProperty', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['setProperty', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['endsWith', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['startsWith', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['countWord', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['addOrdinal', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['indexOf', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['lastIndexOf', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['union', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['intersection', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['skip', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['take', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['filterNotEqual', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['subArray', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['array', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['binary', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['dataUri', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['dataUriToBinary', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['dataUriToString', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['decodeUriComponent', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['base64', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['base64ToBinary', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['base64ToString', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['dataUriTouriComponentBinary', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['uriComponentToString', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['xml', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['range', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['getFutureTime', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['getPastTime', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['addToTime', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['convertFromUtc', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['convertToUtc', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['startOfDay', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['uriQuery', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['uriScheme', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['coalesce', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')],
    //['xpath', new FunctionEntity(['...numbers: number[]'], ReturnType.Number, 'Returns the smallest value from a collection')]
]);

