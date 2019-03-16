import { IMarkdownWriter } from '../../../interfaces/helpers/IMarkdownWriter';
import { ILuisApp } from '../../../interfaces/luis/apps/IApp';
import { intentsSectionRenderer } from './intents-section/intents-section-renderer';
import { listEntitiesSectionRenderer } from './list-entities-section/list-entities-section-renderer';
import { phraseListSectionRenderer } from './phrase-lists-section/phrase-lists-section-renderer';
import { prebuiltEntitiesSectionRenderer } from './prebuilt-entities-section/prebuilt-entities-section-renderer';
import { regexEntitiesSectionRenderer } from './regex-entities-section/regex-entities-section-renderer';
import { simpleEntitiesSectionRenderer } from './simple-entities-section/simple-entities-section-renderer';

/**
 * @description
 * Renders the given app to Lu file format.
 *
 * @param app The app object to render.
 */
export const luisAppRenderer = (app: ILuisApp, writer: IMarkdownWriter): string => {
	intentsSectionRenderer(app, writer);
	simpleEntitiesSectionRenderer(app, writer);
	prebuiltEntitiesSectionRenderer(app, writer);
	phraseListSectionRenderer(app, writer);
	listEntitiesSectionRenderer(app, writer);
	regexEntitiesSectionRenderer(app, writer);

	return writer.render();
};
