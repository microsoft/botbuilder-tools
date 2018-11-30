/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import {
  Activity as IActivity,
  ActivityTypes,
  Attachment,
  AttachmentLayoutTypes,
  ChannelAccount,
  ConversationAccount,
  SuggestedActions
} from 'botframework-schema';

const FIELDS = Symbol('activityFields');

export class Activity implements Partial<IActivity> {
  public attachmentLayout: AttachmentLayoutTypes | string;
  public attachments: Attachment[];
  public channelId: string;
  public conversation: ConversationAccount;
  public from: ChannelAccount;
  public id: string;
  public membersAdded: ChannelAccount[];
  public membersRemoved: ChannelAccount[];
  public recipient: ChannelAccount;
  public suggestedActions: SuggestedActions;
  public text: string;
  public timestamp: Date;
  public type: ActivityTypes | string;

  private [FIELDS] = [
    'attachmentLayout',
    'suggestedActions',
    'membersAdded',
    'membersRemoved',
    'attachments',
    'channelId',
    'conversation',
    'from',
    'id',
    'recipient',
    'text',
    'timestamp',
    'type',
  ];

  constructor(source: Partial<IActivity>) {
    const fields = this[FIELDS].reduce((agg, field) => (agg[field] = source[field], agg), {});
    Object.assign(this, fields);
  }
}
