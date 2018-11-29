export enum ActivityFields {
    Attachment = 'attachment',
    AttachmentLayout = 'attachmentLayout',
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

const base = 'application/vnd.microsoft.card.';

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

export const isCard = function (contentType: string) {
    return contentType.includes(base);
};

export enum Instructions {
    Delay = 'delay'
}
