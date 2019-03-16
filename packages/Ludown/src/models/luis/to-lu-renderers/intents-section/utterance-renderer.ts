import { IMarkdownWriter } from '../../../../interfaces/helpers/IMarkdownWriter';
import { IUtterance } from '../../../../interfaces/luis/utterances/IUtterance';
import { IUtteranceLabel } from '../../../../interfaces/luis/utterances/IUtteranceLabel';
import { printWarn } from '../../../../utils/printers';

/**
 * @description
 * Renders the given utterance to Lu file format.
 *
 * @param utterance The utterance object to render.
 * @param writer The writer used to write the Lu file.
 */
export const utteranceRenderer = (utterance: IUtterance, writer: IMarkdownWriter) => {
	if (utterance.entities.length === 0) {
		writer.addListItem(utterance.text);

		return;
	}

	if (doUtteranceLabelsOverlap(utterance.entities)) {
		printWarn(`Utterance ("${utterance.text}") has overlapping entities. This utterance will be skipped.`);

		return;
	}

	writer.addListItem(getUtteranceTextWithReplacedLabels(utterance));
};

/**
 * @description
 * Sorts the utterance labels by their start position.
 *
 * @param labels The labels to sort.
 * @returns The sorted labels.
 */
function sortUtteranceLabelsByStartPosition(labels: IUtteranceLabel[]): IUtteranceLabel[] {
	return labels.sort((a, b) => (a.startPosition < b.startPosition ? -1 : 1));
}

/**
 * @description
 * Checks if any entity labels in the utterance overlap.
 *
 * @param labels The labels to check.
 * @returns True if there are labels that overlap and false otherwise.
 */
function doUtteranceLabelsOverlap(labels: IUtteranceLabel[]): boolean {
	const sortedLabels = sortUtteranceLabelsByStartPosition(labels);
	const index = sortedLabels.reduce((overlapIndex, label) => {
		if (overlapIndex === Number.NEGATIVE_INFINITY) {
			return label.endPosition;
		}
		if (overlapIndex === -1) {
			return overlapIndex;
		}
		if (overlapIndex >= label.startPosition) {
			return -1;
		}

		return label.endPosition;
	}, Number.NEGATIVE_INFINITY);

	return index === -1;
}

/**
 * @description
 * Gets the utterance text with the labels appended in the text with
 * the correct interpolation syntax.
 *
 * @param utterance The utterance to output interpolation syntax for.
 * @returns The utterance text interpolated with entity labels.
 */
function getUtteranceTextWithReplacedLabels(utterance: IUtterance): string {
	const sortedLabels = sortUtteranceLabelsByStartPosition(utterance.entities);
	let interpolatedText = utterance.text;
	let offset = 0;

	sortedLabels.forEach(label => {
		// Creates the interpolation from the original utterance text and the current label.
		const labelWords = utterance.text.substring(label.startPosition, label.endPosition + 1);

		if (labelWords.length === 0) {
			const indicesPrint = `Indices (${label.startPosition} - ${label.endPosition})`;
			const locationPrint = `entity ("${label.name}") in utterance ("${utterance.text}")`;

			printWarn(`${indicesPrint} of ${locationPrint} do not correspond to tokens. This entity will be skipped.`);

			return;
		}

		const interpolation = `{${label.name}=${labelWords}}`;

		// Replaces the interpolation in place of the original text in the utterance.
		const prefix = interpolatedText.substring(0, label.startPosition + offset);
		const suffix = interpolatedText.substring(label.endPosition + 1 + offset);
		interpolatedText = prefix + interpolation + suffix;
		offset += interpolation.length - labelWords.length;
	});

	return interpolatedText;
}
