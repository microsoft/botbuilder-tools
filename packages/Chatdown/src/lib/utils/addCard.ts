import {
  AnimationCard,
  Attachment,
  AudioCard,
  BasicCard,
  HeroCard,
  MediaCard,
  OAuthCard,
  ReceiptCard,
  SigninCard,
  ThumbnailCard,
  VideoCard
} from 'botframework-schema';
import chalk from 'chalk';
import { CardContentTypes } from '../enums';
import { Activity } from '../serializable';

/**
 * Parses markdown containing an Adaptive Card and adds
 * it to the specified Activity.
 *
 * @example
 * herocard=
 *     Title:xxx
 *     subtitle: xxx
 *     Text: xxxx
 *     image: url
 *     Buttons: Option 1|Option 2|Option 3
 * @param {string} contentType The card's content type - see cardContentTypes.ts
 * @param {Activity} activity The Activity to add the card to
 * @param {string} cardSource
 */
declare type Card =
  VideoCard
  & AnimationCard
  & AudioCard
  & BasicCard
  & HeroCard
  & MediaCard
  & OAuthCard
  & ReceiptCard
  & SigninCard
  & ThumbnailCard;

export function addCard(contentType: CardContentTypes, activity: Activity, cardSource: string): void {
  let card = { buttons: [] } as Card;
  let lines = cardSource.split(/\r?\n/);
  for (let line of lines) {
    let [property, value] = line.split('=', 2).map(str => str.trim());
    property = property.toLowerCase();

    switch (property) {
      case 'title':
      case 'subtitle':
      case 'text':
      case 'aspect':
      case 'value':
      case 'connectioname':
        card[property] = value;
        break;

      case 'image':
        card.image = { url: value, alt: '' };
        break;

      case 'images':
        if (!card.images) {
          card.images = [];
        }
        card.images.push({ url: value });
        break;

      case 'media':
        if (!card.media) {
          card.media = [];
        }
        card.media.push({ url: value });
        break;

      case 'buttons':
        const buttons = value.split('|').map(button => ({
          title: button.trim(),
          type: 'imBack',
          value: button.trim(),
          channelData: ''
        }));
        card.buttons.push(...buttons);
        break;

      case 'autostart':
      case 'sharable':
      case 'autoloop':
        card[property] = value.toLowerCase() === 'true';
        break;

      case '':
        break;

      default:
        console.warn(chalk.red.bold(`Skipping unknown card property ${ property }\n${ line }`));
        break;
    }
  }
  const attachment: Attachment = { contentType, content: card };
  (activity.attachments || (activity.attachments = [])).push(attachment);
}

module.exports = { addCard };
