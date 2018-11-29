/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import { Activity as IActivity, ActivityTypes, Attachment, ChannelAccount, ConversationAccount } from 'botframework-schema';

export class Activity implements Partial<IActivity> {
    public attachments: Attachment[];
    public channelId: string;
    public conversation: ConversationAccount;
    public from: ChannelAccount;
    public id: string;
    public recipient: ChannelAccount;
    public timestamp: Date;
    public type: ActivityTypes | string;

    constructor({ attachments, conversation, id, recipient, from, text, timestamp, type, channelId = 'chatdown' }: Partial<IActivity> = {}) {
        Object.assign(this, { attachments, conversation, id, recipient, from, text, timestamp, type, channelId });
    }
}
