const chalk = require('chalk');

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
function addCard(contentType, activity, cardSource) {
    let card = { buttons: [] };
    let lines = cardSource.split(/\r?\n/);
    for (let line of lines) {
        let [ property, value ] = line.split('=', 2)
            .map(str => str.trim());

        switch (property) {
            case 'title':
            case 'subtitle':
            case 'text':
            case 'aspect':
            case 'value':
            case 'connectioname':
                card[ property ] = value;
                break;

            case 'image':
                card.image = { url: value };
                break;

            case 'images':
                if (!card.images) {
                    card.images = [];
                }
                card.images.push({ url: value });
                break;

            case 'media':
                if (!card.media)
                    card.media = [];
                card.media.push({ url: value });
                break;

            case 'buttons':
                const buttons = value.split('|').map(button => ( {
                    title: button.trim(),
                    type: 'imBack',
                    value: button.trim()
                } ));
                card.buttons.push(...buttons);
                break;

            case 'autostart':
            case 'sharable':
            case 'autoloop':
                card[ property ] = value.toLowerCase() === 'true';
                break;

            case '':
                break;

            default:
                console.warn(chalk.red.bold(`Skipping unknown card property ${ property }\n${ line }`));
                break;
        }
    }
    let attachment = { contentType, content: card };
    ( activity.attachments || ( activity.attachments = [] ) ).push(attachment);
}

module.exports = { addCard };
