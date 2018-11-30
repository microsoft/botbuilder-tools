/**
 * Utility for creating a new serializable Activity.
 *
 * @param {ActivityTypes} type The Activity type
 * @param {string} to The recipient of the Activity
 * @param {string} from The sender of the Activity
 * @param {string} conversationId The id of the conversation
 * @returns {Activity} The newly created activity
 */
import { ActivityTypes } from 'botframework-schema';
import { Activity, ConversationAccount } from '../serializable';

let activityId = 1;

export function createActivity({ type = ActivityTypes.Message, recipient, from, conversationId }: any): Activity {
  const activity = new Activity({ from, recipient, type, id: '' + activityId++ });
  activity.conversation = new ConversationAccount({ id: conversationId });
  return activity;
}
