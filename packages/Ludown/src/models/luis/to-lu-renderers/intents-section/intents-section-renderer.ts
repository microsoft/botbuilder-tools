import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { IApp } from '../../../../interfaces/luis/apps/IApp';
import { IIntentData } from '../../../../interfaces/luis/intents/IIntent';
import { intentRenderer } from './intent-renderer';

/**
 * @description
 * Renders the LUIS app object entities section to Lu file format.
 *
 * @param app The LUIS app object.
 * @param writer The writer used to write the Lu file.
 */
export const intentsSectionRenderer = (app: IApp, writer: IMarkdownWriter) => {
	if (!app.intents || app.intents.length === 0) {
		return;
	}

	writer.addComment('# Intent definitions');
	writer.addNewLine();

	const intentDataMap = getDataPerIntent(app);
	app.intents.forEach(intent => intentRenderer(intent, intentDataMap.get(intent.name), writer));
};

/**
 * @description
 * Structures the utterances and patterns into a hash map of their parent intent.
 * This will aid us in rendering the utterances and patterns that belong to each
 * intent consecutively with more optimal running time.
 *
 * @param app The LUIS app object.
 * @returns A map of each intent and the data (utterances/patterns) that belong
 * to that intent.
 */
function getDataPerIntent(app: IApp): Map<string, IIntentData> {
	const intentDataMap = new Map<string, IIntentData>();

	app.intents.forEach(intent => intentDataMap.set(intent.name, { utterances: [], patterns: [] }));

	app.utterances.forEach(u => intentDataMap.get(u.intent).utterances.push(u));
	app.patterns.forEach(p => intentDataMap.get(p.intent).patterns.push(p));

	return intentDataMap;
}
