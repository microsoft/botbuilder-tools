/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import { ChannelAccount as IChannelAccount, RoleTypes } from 'botframework-schema';

export class ChannelAccount implements Partial<IChannelAccount> {
  public aadObjectId: string;
  public id: string;
  public name: string;
  public role: RoleTypes | string;

  constructor({ aadObjectId, id = 'joe@smith.com', name, role }: Partial<IChannelAccount> = {}) {
    Object.assign(this, { aadObjectId, id, name, role });
  }
}
