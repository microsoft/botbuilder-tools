/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import * as fs from 'fs-extra';
import * as path from 'path';
import * as crypto from 'crypto';
import mimeTypes from 'mime-types';
import { ActivityTypes, AttachmentLayoutTypes } from 'botframework-schema';
import { isCard } from './enums';
import { addCard, parseConfigurationHeader } from './utils';
import * as  request from 'request-promise-native';
import { EOL } from 'os';
import { Activity, ChannelAccount, ConversationAccount } from './serializable';
import { ConfigurationOptions } from '../types/configurationOptions';
import { TransientParserModel } from '../types/transientParserModel';

let activityId = 1;

// Matches [someActivityOrInstruction=value]
const commandRegExp = /(?:\[)([\s\S]*?)(?:])/i;
const configurationRegExp = /^(bot|user|users|channelId)(?:=)/;
const messageTimeGap = 2000;
let now = Date.now();
now -= now % 1000; // nearest second
let workingDirectory;

/**
 * Entry for chatdown markup parsing.
 *
 * @param {string} fileContents UTF-8 encoded bytes to parse.
 * @param {ConfigurationOptions} options The k/v pair representing the configuration options
 * @returns {Promise<Array>} Resolves with an array of Activity objects.
 */
export async function chatdown(fileContents: string, options: ConfigurationOptions = {} as ConfigurationOptions) {
    if (options.static || options.s) {
        now = new Date(2015, 9, 15, 12, 0, 0, 0).getTime();
    }
    // Resolve file paths based on the input file with a fallback to the cwd
    workingDirectory = options.in ? path.dirname(path.resolve(options.in)) : __dirname;
    const activities = [];
    const lines = fileLineIterator(fileContents.trim() + EOL);
    // Aggregate the contents of each line until
    // we reach a new activity.
    let aggregate = '';
    // Read each line, derive activities with messages, then
    // return them as the payload
    let conversationId = getHashCode(fileContents);
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
            initConversation(parserModel, conversationId, activities);
        }

        // process transcript lines
        if (parserModel.newMessageRegEx.test(line)) {

            // process aggregate activities
            aggregate = aggregate.trim();
            if (aggregate.length > 0) {
                const newActivities = await readCommandsFromAggregate(options, aggregate);
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
        const newActivities = await readCommandsFromAggregate(options, aggregate);
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
        id: getHashCode(parserModel.bot),
        name: parserModel.bot,
        role: 'bot'
    });
    parserModel.accounts[parserModel.bot.toLowerCase()] = parserModel.accounts.bot;

    // first activity should be a ConversationUpdate, create and add it
    let conversationUpdate = createConversationUpdate(parserModel, [parserModel.accounts.bot], []);

    for (let user of parserModel.users) {
        user = user.trim();
        parserModel.accounts[user.toLowerCase()] = new ChannelAccount({
            id: getHashCode(user),
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
 * @param {*} args
 * @param {ChannelAccount} from
 * @param {ChannelAccount[]} membersAdded
 * @param {ChannelAccount[]} membersRemoved
 */
function createConversationUpdate(args, membersAdded, membersRemoved) {
    let conversationUpdateActivity = createActivity({
        type: activityTypes.conversationupdate,
        recipient: args[args.botId],
        conversationId: args.conversation.id
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
 * @param {string} aggregate The aggregate text to derive activities from.
 *
 * @returns {Promise<*>} Resolves to the number of new activities encountered or null if no new activities resulted
 */
async function readCommandsFromAggregate(args, aggregate) {
    const newActivities = [];
    commandRegExp.lastIndex = 0;
    let result;
    let delay = messageTimeGap;
    let currentActivity = createActivity({
        type: activityTypes.Message,
        from: args.from,
        recipient: args.recipient,
        conversationId: args.conversation.id
    });
    currentActivity.text = '';
    while ((result = commandRegExp.exec(aggregate))) {
        // typeOrField should always be listed first
        let match = result[1]; // result[] doesn't have [] on it
        let lines = match.split(EOL);
        let split = lines[0].indexOf('=');
        let typeOrField = split > 0 ? lines[0].substring(0, split).trim() : lines[0].trim();
        let rest = (split > 0) ? lines[0].substring(split + 1).trim() : undefined;
        if (lines.length > 1)
            rest = match.substr(match.indexOf(EOL) + EOL.length);
        const type = activityTypes[typeOrField.toLowerCase()];
        const field = activityFields[typeOrField.toLowerCase()];
        const instruction = instructions[typeOrField.toLowerCase()];
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
                    type: activityTypes.Message,
                    from: args.from,
                    recipient: args.recipient,
                    conversationId: args.conversation.id
                });
                currentActivity.text = '';
            }
            aggregate = aggregate.substr(result.index);

            switch (type) {
                case activityTypes.typing: {
                    let newActivity = createActivity({
                        type,
                        recipient: args.recipient,
                        from: args.from,
                        conversationId: args.conversation.id
                    });
                    newActivity.timestamp = getIncrementedDate(100);
                    newActivities.push(newActivity);
                    break;
                }
                case activityTypes.conversationupdate:
                    processConversationUpdate(args, newActivities, rest);
                    break;
            }
        } else if (instruction) {
            switch (instruction) {
                case instructions.delay:
                    delay = parseInt(rest);
                    break;
            }
        } else if (field) {
            // As more activity fields are supported,
            // this should become a util or helper class.
            switch (field) {
                case activityFields.attachment:
                    await addAttachment(currentActivity, rest);
                    break;
                case activityFields.attachmentLayout:
                    addAttachmentLayout(currentActivity, rest);
                    break;
                case activityFields.suggestions:
                    addSuggestions(currentActivity, rest);
                    break;
                case activityFields.basiccard:
                case activityFields.heroCard:
                    addCard(cardContentTypes.hero, currentActivity, rest);
                    break;
                case activityFields.thumbnailCard:
                    addCard(cardContentTypes.thumbnail, currentActivity, rest);
                    break;
                case activityFields.animationCard:
                    addCard(cardContentTypes.animation, currentActivity, rest);
                    break;
                case activityFields.mediaCard:
                    addCard(cardContentTypes.media, currentActivity, rest);
                    break;
                case activityFields.audioCard:
                    addCard(cardContentTypes.audio, currentActivity, rest);
                    break;
                case activityFields.videoCard:
                    addCard(cardContentTypes.video, currentActivity, rest);
                    break;
                // case activityFields.receiptCard:
                //     addCard(cardContentTypes.receipt, currentActivity, rest);
                //     break;
                case activityFields.signInCard:
                    addCard(cardContentTypes.signIn, currentActivity, rest);
                    break;
                case activityFields.oauthCard:
                    addCard(cardContentTypes.oauth, currentActivity, rest);
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

function processConversationUpdate(args, activities, rest) {
    let conversationUpdate = createConversationUpdate(args,
        /*from*/ null,
        /* membersAdded*/[],
        /* membersRemoved*/[])
    conversationUpdate.timestamp = getIncrementedDate(100);

    let lines = rest.split(EOL);
    for (let line of lines) {
        let start = line.indexOf('=');
        let property = line.substr(0, start).trim().toLowerCase();
        let value = line.substr(start + 1).trim();
        switch (property) {
            case 'added':
            case 'membersadded': {
                let membersAdded = value.split(',');
                for (let memberAdded of membersAdded) {
                    memberAdded = memberAdded.trim();

                    // add the account if we don't know it already
                    if (!args.accounts[memberAdded.toLowerCase()]) {
                        args.accounts[memberAdded.toLowerCase()] = new ChannelAccount({
                            id: getHashCode(memberAdded),
                            name: memberAdded,
                            role: 'user'
                        });
                    }

                    conversationUpdate.membersAdded.push(args.accounts[memberAdded.toLowerCase()]);
                }
                break;
            }
            case 'removed':
            case 'membersremoved': {
                let membersRemoved = value.split(',');
                for (let memberRemoved of membersRemoved) {
                    memberRemoved = memberRemoved.trim();
                    conversationUpdate.membersRemoved.push(args.accounts[memberRemoved.toLowerCase()]);
                }
                break;
            }
            default:
                throw new Error(`Unknown ConversationUpdate Property ${ property }`);
        }
    }
    activities.push(conversationUpdate);
}


function addAttachmentLayout(currentActivity, rest) {
    if (rest && rest.toLowerCase() === AttachmentLayoutTypes.Carousel)
        currentActivity.attachmentLayout = AttachmentLayoutTypes.Carousel;
    else if (rest && rest.toLowerCase() === AttachmentLayoutTypes.List)
        currentActivity.attachmentLayout = AttachmentLayoutTypes.List;
    else
        console.error(`AttachmentLayout of ${ rest[0] } is not List or Carousel`);
}

/**
 * Add suggested actions support
 * Example: [suggestions=Option 1|Option 2|Option 3]
 * @param {*} currentActivity
 * @param {*} rest
 */
function addSuggestions(currentActivity, rest) {
    currentActivity.suggestedActions = { actions: [] };
    let actions = rest.split('|');
    for (let action of actions) {
        currentActivity.suggestedActions.actions.push({ title: action.trim(), type: 'imBack', value: action.trim() });
    }
}

/**
 * Adds an attachment to the activity. If a mimetype is
 * specified, it is used as is. Otherwise, it is derived
 * from the file extension.
 *
 * @param {Activity} activity The activity to add the attachment to
 * @param {string} arg
 *
 * @returns {Promise<number>} The new number of attachments for the activity
 */
async function addAttachment(activity, arg) {
    let parts = arg.trim().split(' ');
    let contentUrl = parts[0].trim();
    let contentType = (parts.length > 1) ? parts[1].trim() : undefined;
    if (contentType) {
        contentType = contentType.toLowerCase();
        if (cardContentTypes[contentType])
            contentType = cardContentTypes[contentType];
    } else {
        contentType = mimeTypes.lookup(contentUrl) || cardContentTypes[path.extname(contentUrl)];

        if (!contentType && contentUrl.startsWith('http')) {
            let options = { method: 'HEAD', uri: contentUrl };
            let response = await request(options);
            contentType = response['content-type'].split(';')[0];
        }
    }

    const charset = mimeTypes.charset(contentType);

    // if not a url
    if (!contentUrl.startsWith('http')) {
        // read the file
        let content = await readAttachmentFile(contentUrl, contentType);
        // if it is not a card
        if (!isCard(contentType) && charset !== 'UTF-8') {
            // send as base64
            contentUrl = `data:${ contentType };base64,${ Buffer.from(content).toString('base64') }`;
            content = undefined;
        } else {
            contentUrl = undefined;
        }
        return (activity.attachments || (activity.attachments = [])).push(new Attachment({
            contentType,
            contentUrl,
            content
        }));
    }
    // send as contentUrl
    return (activity.attachments || (activity.attachments = [])).push(new Attachment({ contentType, contentUrl }));
}

/**
 * Utility function for reading the attachment
 *
 * @param fileLocation
 * @param contentType
 * @returns {*}
 */
async function readAttachmentFile(fileLocation, contentType) {
    let resolvedFileLocation = path.join(workingDirectory, fileLocation);
    let exists = fs.pathExistsSync(resolvedFileLocation);

    // fallback to cwd
    if (!exists) {
        resolvedFileLocation = path.resolve(fileLocation);
    }
    // Throws if the fallback does not exist.
    if (contentType.includes('json') || isCard(contentType)) {
        return fs.readJsonSync(resolvedFileLocation);
    } else {
        return fs.readFileSync(resolvedFileLocation);
    }
}

/**
 * Utility for creating a new serializable Activity.
 *
 * @param {ActivityTypes} type The Activity type
 * @param {string} to The recipient of the Activity
 * @param {string} from The sender of the Activity
 * @param {string} conversationId The id of the conversation
 * @returns {Activity} The newly created activity
 */
function createActivity({ type = ActivityTypes.Message, recipient, from, conversationId }) {
    const activity = new Activity({ from, recipient, type, id: '' + activityId++ });
    activity.conversation = new ConversationAccount({ id: conversationId });
    return activity;
}

function getIncrementedDate(byThisAmount = messageTimeGap) {
    return new Date(now += byThisAmount).toISOString();
}

/**
 * Generator producing a well-known Symbol for
 * iterating each line in the UTF-8 encoded string.
 *
 * @param {string} fileContents The contents containing the lines to iterate.
 */
function* fileLineIterator(fileContents) {
    var parts = fileContents.split(/\r?\n/);
    for (let part of parts) {
        yield part;
    }
}

function getHashCode(contents) {
    return crypto.createHash('sha1').update(contents).digest('base64')
}
