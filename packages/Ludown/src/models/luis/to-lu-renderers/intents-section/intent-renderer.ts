import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { IIntent, IIntentData } from '../../../../interfaces/luis/intents/IIntent';
import { patternRenderer } from './pattern-renderer';
import { utteranceRenderer } from './utterance-renderer';

/**
 * @description
 * Renders the given intent to Lu file format.
 *
 * @param intent The intent object to render.
 * @param writer The writer used to write the Lu file.
 */
export const intentRenderer = (intent: IIntent, data: IIntentData, writer: IMarkdownWriter) => {
    writer.addSecondLevelHeader(intent.name);

    data.utterances.forEach(utterance => utteranceRenderer(utterance, writer));
    data.patterns.forEach(pattern => patternRenderer(pattern, writer));

    writer.addNewLine();
    writer.addNewLine();
};
