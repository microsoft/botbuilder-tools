import { ActivityTypes } from 'botframework-schema';

export enum ActivityFields {
  Attachment = 'attachment',
  AttachmentLayout = 'attachmentLayout',
  BasicCard = 'basiccard',
  Suggestions = 'suggestions',
  HeroCard = 'herocard',
  ThumbnailCard = 'thumbnailcard',
  MediaCard = 'mediacard',
  AnimationCard = 'animationcard',
  AudioCard = 'audiocard',
  VideoCard = 'videocard',
  OauthCard = 'oauthcard',
  SignInCard = 'signincard',
  ReceiptCard = 'receiptcard',
}

const activityFieldKeys = Object.keys(ActivityFields);

export function findActivityFieldFrom(value: string): ActivityFields {
  const lowerCaseValue = value.toLowerCase();
  const match = activityFieldKeys.find(key => key.toLowerCase() === lowerCaseValue || ActivityFields[key].toLowerCase() === lowerCaseValue);
  return ActivityFields[match];
}

export enum CardContentTypes {
  Animation = 'application/vnd.microsoft.card.animation',
  Audio = 'application/vnd.microsoft.card.audio',
  Hero = 'application/vnd.microsoft.card.hero',
  Receipt = 'application/vnd.microsoft.card.receipt',
  Thumbnail = 'application/vnd.microsoft.card.thumbnail',
  SignIn = 'application/vnd.microsoft.card.signin',
  Oauth = 'application/vnd.microsoft.card.oauth',
  Media = 'application/vnd.microsoft.card.media',
  Video = 'application/vnd.microsoft.card.video',
  AdaptiveCard = 'application/vnd.microsoft.card.adaptive'
}

export const ActivityFieldToCardContentType = {
  [ActivityFields.BasicCard]: CardContentTypes.Hero,
  [ActivityFields.HeroCard]: CardContentTypes.Hero,
  [ActivityFields.ThumbnailCard]: CardContentTypes.Thumbnail,
  [ActivityFields.AnimationCard]: CardContentTypes.Animation,
  [ActivityFields.MediaCard]: CardContentTypes.Media,
  [ActivityFields.AudioCard]: CardContentTypes.Audio,
  [ActivityFields.VideoCard]: CardContentTypes.Video,
  [ActivityFields.SignInCard]: CardContentTypes.SignIn,
  [ActivityFields.OauthCard]: CardContentTypes.Oauth
};

export const isCard = function (contentType: string) {
  return contentType.includes('application/vnd.microsoft.card.');
};

export enum Instructions {
  Delay = 'delay'
}

const instructionKeys = Object.keys(Instructions);

export function findInstructionFrom(value: string): Instructions {
  const lowerCaseValue = value.toLowerCase();
  const match = instructionKeys.find(key => key.toLowerCase() === lowerCaseValue || Instructions[key].toLowerCase() === lowerCaseValue);
  return Instructions[match];
}

const activityTypeFields = Object.keys(ActivityTypes);

export function findActivityTypeFrom(value: string): ActivityTypes {
  const lowerCaseValue = value.toLowerCase();
  const match = activityTypeFields.find(key => key.toLowerCase() === lowerCaseValue || ActivityTypes[key].toLowerCase() === lowerCaseValue);
  return ActivityTypes[match];
}
