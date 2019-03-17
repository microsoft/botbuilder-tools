import { ERROR_CODE } from '../../../../src/models/error-codes';
import { luisJsonImporter } from '../../../../src/models/luis/json-importers/luis-json-importer';

describe('Luis JSON importer', () => {
	it('should resolve with luis app when correct JSON format is provided.', async () => {
		const sampleJsonFile = {
			intents: [{ name: 'AlarmSetter' }],
			entities: [{ name: 'Alarm', roles: [] }],
			closedLists: [],
			patternAnyEntities: [],
			regex_entities: [],
			prebuiltEntities: [],
			model_features: [],
			patterns: [],
			utterances: []
		};
		const luisApp = await luisJsonImporter(JSON.stringify(sampleJsonFile));

		expect(luisApp).toEqual({
			intents: [{ name: 'AlarmSetter' }],
			entities: [{ name: 'Alarm', roles: [] }],
			hierarchicalEntities: [],
			listEntities: [],
			patternEntities: [],
			regexEntities: [],
			prebuiltEntities: [],
			phraseLists: [],
			patterns: [],
			utterances: []
		});
	});

	it('should reject with invalid JSON error when invalid JSON is provided.', async () => {
		try {
			await luisJsonImporter('SomeInvalidJSONText');
		} catch (err) {
			expect(err).toEqual({
				code: ERROR_CODE.INVALID_JSON_FILE,
				data: 'SomeInvalidJSONText',
				message: 'The provided JSON file is invalid.'
			});
		}
	});

	it('should reject with invalid LUIS JSON format error when invalid LUIS JSON is provided.', async () => {
		const invalidLuisApp = { name: 'Omar', age: 27, trait: 'Awesome' };
		const invalidJSONString = JSON.stringify(invalidLuisApp);

		try {
			await luisJsonImporter(invalidJSONString);
		} catch (err) {
			expect(err).toEqual({
				code: ERROR_CODE.INVALID_LUIS_JSON_FILE,
				data: invalidLuisApp,
				message: 'Failed to parse the provided LUIS JSON file.'
			});
		}
	});
});
