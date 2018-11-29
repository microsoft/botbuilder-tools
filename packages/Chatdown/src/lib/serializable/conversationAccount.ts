/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import { ConversationAccount as IConversationAccount } from 'botframework-schema';

export class ConversationAccount implements Partial<IConversationAccount> {
    public conversationType: string;
    public id: string;
    public isGroup: boolean;
    public name: string;

    constructor({ aadObjectId, conversationType, id, isGroup, name }: Partial<IConversationAccount> = {}) {
        Object.assign(this, { aadObjectId, conversationType, id, isGroup, name });
    }
}
