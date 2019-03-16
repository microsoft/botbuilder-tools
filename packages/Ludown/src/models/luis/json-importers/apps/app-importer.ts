import { IApp } from '../../../../interfaces/luis/apps/IApp';
import { hierarchicalEntityImporter } from '../entities/hierarchical-entity-importer';
import { listEntityImporter } from '../entities/list-entity.importer';
import { patternEntityImporter } from '../entities/pattern-entity-importer';
import { prebuiltEntityImporter } from '../entities/prebuilt-entity-importer';
import { regexEntityImporter } from '../entities/regex-entity-importer';
import { simpleEntityImporter } from '../entities/simple-entity-importer';
import { phraseListImporter } from '../features/phraselist-importer';
import { intentImporter } from '../intents/intent-importer';
import { patternImporter } from '../patterns/pattern-importer';
import { utteranceImporter } from '../utterances/utterance-importer';

/**
 * @description
 * Creates a phrase list object from a LUIS JSON file.
 *
 * @param state The phrase list JSON object.
 */
export const appImporter: (state) => IApp = state => {
	return {
		intents: intentImporter(state),
		entities: simpleEntityImporter(state),
		hierarchicalEntities: hierarchicalEntityImporter(state),
		listEntities: listEntityImporter(state),
		patternEntities: patternEntityImporter(state),
		regexEntities: regexEntityImporter(state),
		prebuiltEntities: prebuiltEntityImporter(state),
		phraseLists: phraseListImporter(state),
		utterances: utteranceImporter(state),
		patterns: patternImporter(state)
	};
};
