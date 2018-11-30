import { ActivityTypes, AttachmentLayoutTypes } from 'botframework-schema';
import { EOL } from 'os';
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import * as path from 'path';
import {
  ActivityFields,
  ActivityFieldToCardContentType,
  findActivityFieldFrom,
  findActivityTypeFrom,
  findInstructionFrom,
  Instructions,
} from './enums';
import { Activity, ChannelAccount, ConversationAccount } from './serializable';
import { ConfigurationOptions } from './types/configurationOptions';
import { TransientParserModel } from './types/transientParserModel';
import {
  addAttachmentToActivity,
  addCard,
  createActivity,
  createBase64HashCode,
  getIncrementedDate,
  mapTrim,
  messageTimeGap,
  parseConfigurationHeader,
  setStaticDate,
  setWorkingDirectory
} from './utils';

// Matches [someActivityOrInstruction=value]
const commandRegExp = /(?:\[)([\s\S]*?)(?:])/i;
const configurationRegExp = /^(bot|user|users|channelId)(?:=)/;

/**
 * Entry for chatdown markup parsing.
 *
 * @param {string} fileContents UTF-8 encoded bytes to parse.
 * @param {ConfigurationOptions} options The k/v pair representing the configuration options
 * @returns {Promise<Array>} Resolves with an array of Activity objects.
 */
export async function chatdown(fileContents: string, options: ConfigurationOptions = {} as ConfigurationOptions) {
  if (options.static || options.s) {
    setStaticDate(new Date(2015, 9, 15, 12, 0, 0, 0));
  }
  // Resolve file paths based on the input file with a fallback to the cwd
  setWorkingDirectory(options.in ? path.normalize(options.in) : __dirname);
  const activities = [];
  const lines = fileLineIterator(fileContents.trim() + EOL);
  // Aggregate the contents of each line until
  // we reach a new activity.
  let aggregate = '';
  // Read each line, derive activities with messages, then
  // return them as the payload
  const parserModel = { bot: 'bot', users: [] } as TransientParserModel;
  let inHeader = true;
  for (let line of lines) {
    // pick up settings from the first lines
    if (inHeader && configurationRegExp.test(line)) {
      parseConfigurationHeader(line, parserModel);
      continue;
    }

    if (inHeader) {
      inHeader = false;
      if (!parserModel.users.length) {
        parserModel.users = ['user'];
      }

      // starting the transcript, initialize the bot/user data accounts
      initConversation(parserModel, createBase64HashCode(fileContents), activities);
    }

    // process transcript lines
    if (parserModel.newMessageRegEx.test(line)) {

      // process aggregate activities
      aggregate = aggregate.trim();
      if (aggregate.length > 0) {
        const newActivities = await readCommandsFromAggregate(parserModel, aggregate);
        if (newActivities) {
          activities.push(...newActivities);
        }
      }

      let matches = parserModel.newMessageRegEx.exec(line);
      let speaker = matches[1];
      let customRecipient = matches[3];
      parserModel.from = parserModel.accounts[speaker.toLowerCase()];

      if (customRecipient) {
        parserModel.recipient = parserModel.accounts[customRecipient.toLowerCase()];
      } else {
        // pick recipient based on role
        if (parserModel.from.role === 'bot') {
          // default for bot is last user
          parserModel.recipient = parserModel.accounts[parserModel.user.toLowerCase()];
        } else {
          // default recipient for a user is the bot
          parserModel.recipient = parserModel.accounts[parserModel.bot.toLowerCase()];
          // remember this user as last user to speak
          parserModel.user = parserModel.from.name;
          parserModel.accounts.user = parserModel.accounts[parserModel.user.toLowerCase()];
        }
      }
      // aggregate starts new with this line
      aggregate = line.substr(matches[0].length).trim() + EOL;
    } else {
      // Not a new message but could contain
      // an activity on the line by itself.
      aggregate += line + EOL;
    }
  }

  // end of file, process aggregate
  if (aggregate && aggregate.trim().length > 0) {
    const newActivities = await readCommandsFromAggregate(parserModel, aggregate);
    if (newActivities) {
      activities.push(...newActivities);
    }
  }
  return activities;
}

function initConversation(parserModel: TransientParserModel, conversationId: string, activities: Activity[]) {
  parserModel.conversation = new ConversationAccount({ id: conversationId });
  parserModel.accounts = {} as any;
  parserModel.accounts.bot = new ChannelAccount({
    id: createBase64HashCode(parserModel.bot),
    name: parserModel.bot,
    role: 'bot'
  });
  parserModel.accounts[parserModel.bot.toLowerCase()] = parserModel.accounts.bot;

  // first activity should be a ConversationUpdate, create and add it
  const conversationUpdate = createConversationUpdate(parserModel, [parserModel.accounts.bot], []);

  for (let user of parserModel.users) {
    user = user.trim();
    parserModel.accounts[user.toLowerCase()] = new ChannelAccount({
      id: createBase64HashCode(user),
      name: user,
      role: 'user'
    });
    if (!parserModel.user) {
      // first user is default user
      parserModel.user = user;
      parserModel.accounts.user = parserModel.accounts[user.toLowerCase()];
    }
  }
  // define matching statements regex for users
  const { users, bot } = parserModel;
  parserModel.newMessageRegEx = new RegExp(`^(${ users.join('|') }|${ bot }|bot|user)(->(${ users.join('|') }))??:`, 'i');
  activities.push(conversationUpdate);
}

/**
 * create ConversationUpdate Activity
 * @param {*} parserModel
 * @param {ChannelAccount[]} membersAdded
 * @param {ChannelAccount[]} membersRemoved
 */
function createConversationUpdate(parserModel: TransientParserModel, membersAdded?: ChannelAccount[], membersRemoved?: ChannelAccount[]) {
  let conversationUpdateActivity = createActivity({
    type: ActivityTypes.ConversationUpdate,
    recipient: parserModel.accounts.bot,
    conversationId: parserModel.conversation.id
  });
  conversationUpdateActivity.membersAdded = membersAdded || [];
  conversationUpdateActivity.membersRemoved = membersRemoved || [];
  conversationUpdateActivity.timestamp = getIncrementedDate(100);
  return conversationUpdateActivity;
}

/**
 * Reads activities from a text aggregate. Aggregates
 * form when multiple activities occur in the context of a
 * single participant as is the case for attachments.
 *
 * @param {TransientParserModel} parserModel
 * @param {string} aggregate The aggregate text to derive activities from.
 *
 * @returns {Promise<*>} Resolves to the number of new activities encountered or null if no new activities resulted
 */
async function readCommandsFromAggregate(parserModel: TransientParserModel, aggregate: string) {
  const newActivities = [];
  commandRegExp.lastIndex = 0;
  let delay = messageTimeGap;
  let currentActivity = createActivity({
    type: ActivityTypes.Message,
    from: parserModel.from,
    recipient: parserModel.recipient,
    conversationId: parserModel.conversation.id
  });
  currentActivity.text = '';
  let result: RegExpExecArray | null;
  while ((result = commandRegExp.exec(aggregate))) {
    // typeOrField should always be listed first
    const [, match = ''] = result; // result[] doesn't have [] on it
    const [typeOrField, ...rest] = match.split('=').map(mapTrim);
    const unparsedSource = rest.join('=');
    const type = findActivityTypeFrom(typeOrField);
    const field = findActivityFieldFrom(typeOrField);
    const instruction = findInstructionFrom(typeOrField);
    // This isn't an activity - bail
    if (!type && !field && !instruction) {
      // skip unknown tag
      let value = aggregate.substr(0, result.index + result[0].length);
      currentActivity.text += value;
      aggregate = aggregate.substring(value.length);
      continue;
    }

    // Indicates a new activity -
    // As more activity types are supported, this should
    // become a util or helper class.
    if (type) {
      let text = aggregate.substr(0, result.index).trim();
      if (text.length > 0) {
        currentActivity.text = text;
        currentActivity.timestamp = getIncrementedDate(delay);
        newActivities.push(currentActivity);
        // reset
        delay = messageTimeGap;
        currentActivity = createActivity({
          type: ActivityTypes.Message,
          from: parserModel.from,
          recipient: parserModel.recipient,
          conversationId: parserModel.conversation.id
        });
        currentActivity.text = '';
      }
      aggregate = aggregate.substr(result.index);
      if (type === ActivityTypes.Typing) {
        let newActivity = createActivity({
          type,
          recipient: parserModel.recipient,
          from: parserModel.from,
          conversationId: parserModel.conversation.id
        });
        newActivity.timestamp = getIncrementedDate(100);
        newActivities.push(newActivity);
      } else if (type === ActivityTypes.ConversationUpdate) {
        processConversationUpdate(parserModel, newActivities, unparsedSource);
      }
    } else if (instruction && instruction === Instructions.Delay) {
      delay = ~~rest;
    } else if (field) {
      // As more activity fields are supported,
      // this should become a util or helper class.
      switch (field) {
        case ActivityFields.Attachment:
          await addAttachmentToActivity(currentActivity, unparsedSource);
          break;

        case ActivityFields.AttachmentLayout:
          addAttachmentLayout(currentActivity, unparsedSource as AttachmentLayoutTypes);
          break;

        case ActivityFields.Suggestions:
          addSuggestions(currentActivity, unparsedSource);
          break;

        default:
          addCard(ActivityFieldToCardContentType[field], currentActivity, unparsedSource);
          break;
      }
    }
    // Trim off this activity or activity field and continue.
    aggregate = aggregate.replace(`[${ result[1] }]`, '');
    commandRegExp.lastIndex = 0;
  }
  currentActivity.text += aggregate.trim();
  currentActivity.timestamp = getIncrementedDate(delay);

  // if we have content, then add it
  if (currentActivity.text.length > 0 ||
    (currentActivity.attachments && currentActivity.attachments.length > 0) ||
    (currentActivity.suggestedActions && currentActivity.suggestedActions.actions.length > 0)) {
    newActivities.push(currentActivity);
  }
  return newActivities.length ? newActivities : null;
}

function processConversationUpdate(parserModel: TransientParserModel, activities: Activity[], rest: string) {
  let conversationUpdate = createConversationUpdate(parserModel);
  conversationUpdate.timestamp = getIncrementedDate(100);

  let lines = rest.split(EOL);
  for (let line of lines) {
    let [property, ...value] = line.split('=').map(mapTrim);
    const members = value.join().split(',').map(mapTrim);

    if (/(added)$/i.test(property)) { // 'added' or 'membersadded'
      for (let memberAdded of members) {
        const memberAddedLowerCase = memberAdded.toLowerCase();
        // add the account if we don't know it already
        if (!parserModel.accounts[memberAddedLowerCase]) {
          parserModel.accounts[memberAddedLowerCase] = new ChannelAccount({
            id: createBase64HashCode(memberAdded),
            name: memberAdded,
            role: 'user'
          });
        }

        conversationUpdate.membersAdded.push(parserModel.accounts[memberAddedLowerCase]);
      }
    } else if (/(removed)$/i.test(property)) { // 'removed' and 'membersremoved'
      for (let memberRemoved of members) {
        const memberRemovedLowerCase = memberRemoved.toLowerCase();
        conversationUpdate.membersRemoved.push(parserModel.accounts[memberRemovedLowerCase]);
      }
    } else {
      throw new Error(`Unknown ConversationUpdate Property ${ property }`);
    }
  }
  activities.push(conversationUpdate);
}

function addAttachmentLayout(currentActivity: Activity, type: AttachmentLayoutTypes) {
  if (type.toLowerCase() === AttachmentLayoutTypes.Carousel) {
    currentActivity.attachmentLayout = AttachmentLayoutTypes.Carousel;
  } else if (type.toLowerCase() === AttachmentLayoutTypes.List) {
    currentActivity.attachmentLayout = AttachmentLayoutTypes.List;
  } else {
    console.error(`AttachmentLayout of ${ type } is not List or Carousel`);
  }
}

/**
 * Add suggested actions support
 * Example: [suggestions=Option 1|Option 2|Option 3]
 * @param {Activity} currentActivity
 * @param {string} actionsSource
 */
function addSuggestions(currentActivity: Activity, actionsSource: string) {
  currentActivity.suggestedActions = { actions: [], to: undefined };
  let actions = actionsSource.split('|');
  for (let action of actions) {
    currentActivity.suggestedActions.actions.push({
      title: action.trim(),
      type: 'imBack',
      value: action.trim(),
      channelData: undefined
    });
  }
}

/**
 * Generator producing a well-known Symbol for
 * iterating each line in the UTF-8 encoded string.
 *
 * @param {string} fileContents The contents containing the lines to iterate.
 */
function* fileLineIterator(fileContents: string): IterableIterator<string> {
  const parts = fileContents.split(/\r?\n/);
  for (let part of parts) {
    yield part;
  }
}
