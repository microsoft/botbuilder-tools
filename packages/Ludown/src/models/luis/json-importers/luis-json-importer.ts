import { IJsonImporter } from '../../../interfaces/helpers/IJsonImporter';
import { ERROR_CODE } from '../../../models/error-codes';
import { appImporter } from '../../../models/luis/json-importers/apps/app-importer';

/**
 * @description
 * Represents a JSON importer for a LUIS application.
 */
export const luisJsonImporter: IJsonImporter = async (jsonString: string) => {
	return new Promise((resolve, reject) => {
		let luisFileData: Object;

		try {
			luisFileData = JSON.parse(jsonString);
		} catch {
			reject({
				code: ERROR_CODE.INVALID_JSON_FILE,
				data: jsonString,
				message: 'The provided JSON file is invalid.'
			});
		}

		try {
			resolve(appImporter(luisFileData));
		} catch {
			reject({
				code: ERROR_CODE.INVALID_LUIS_JSON_FILE,
				data: luisFileData,
				message: 'Failed to parse the provided LUIS JSON file.'
			});
		}
	});
};
