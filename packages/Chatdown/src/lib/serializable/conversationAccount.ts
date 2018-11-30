/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import { ConversationAccount as IConversationAccount, RoleTypes } from 'botframework-schema';

export class ConversationAccount implements Partial<IConversationAccount> {
  public aadObjectId: string;
  public conversationType: string;
  public id: string;
  public isGroup: boolean;
  public name: string;
  public role: RoleTypes;

  constructor({ aadObjectId, conversationType, id, isGroup, name, role }: Partial<IConversationAccount> = {}) {
    Object.assign(this, { aadObjectId, conversationType, id, isGroup, name, role });
  }
}
