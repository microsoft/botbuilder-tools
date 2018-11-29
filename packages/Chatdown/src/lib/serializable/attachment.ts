/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import { Attachment as IAttachment } from 'botframework-schema';

export class Attachment implements Partial<IAttachment> {
    public content: any;
    public contentType: string;
    public contentUrl: string;

    constructor({ contentType = '', contentUrl = undefined, content = undefined }: Partial<IAttachment> = {}) {
        Object.assign(this, { contentType, contentUrl, content });
    }
}
