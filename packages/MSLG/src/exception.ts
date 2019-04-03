/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
export class Exception {

    public errCode: string;
    public text: string;

    constructor(errCode: any, text: any) {
        if (errCode === Object(errCode)) {
            this.text = errCode.text ? errCode.text : '';
            this.errCode = errCode.errCode ? errCode.errCode : 99;
        } else {
            this.text = text ? text : '';
            this.errCode = errCode ? errCode : 99;
        }
    }
};