/**
 * @module botbuilder-lg-vscode
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

// todo should add params info and other info og the function
export const buildInfunctionNames: string[] = [
    'min','max','average','sum','exists','length','replace','replaceIgnoreCase','split','substring','toLower','toUpper',
    'trim','count','contains','contains','join','first','last','foreach','addDays','addHours','addMinutes','addSeconds',
    'dayOfMonth','dayOfWeek','dayOfYear','month','date','year','utcNow','formatDateTime','subtractFromTime','dateReadBack',
    'getTimeOfDay','float','int','string','bool','createArray','Constant','if','rand','json',
    'getProperty','addProperty','removeProperty','setProperty','endsWith','startsWith','countWord','addOrdinal','guid',
    'indexOf','lastIndexOf','union','intersection ','skip','take','filterNotEqual','subArray','array','binary','dataUri',
    'dataUriToBinary','dataUriToString','decodeUriComponent','base64','base64ToBinary','base64ToString','uriComponent',
    'uriComponentToString','xml','range','getFutureTime','getPastTime','addToTime','convertFromUtc', 'convertToUtc','startOfDay',
    'startOfHour','startOfMonth','ticks','uriHost','uriPath','uriPathAndQuery','uriPort',
    'uriQuery','uriScheme','coalesce','xpath',
];

export const buildInfunctions: functionItem[] = [
    // todo. it is a long time work....
]

class functionItem {
    public name: string; // function name
    public params: paramItem[]; // params
    public returnType: string; // return type;
}

class paramItem {
    public required: boolean; // is param required
    public name: string; // param name
    public type: string; // param type, string, number , object
}