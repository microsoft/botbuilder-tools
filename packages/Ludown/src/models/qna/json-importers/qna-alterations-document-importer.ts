import { IJsonImporter } from '../../../interfaces/helpers/IJsonImporter';
import { ERROR_CODE } from '../../../models/error-codes';
import { alterationsDocumentImporter } from './alterations/alterations-document-importer';

/**
 * @description
 * Represents a JSON importer for a QNA alterations document.
 */
export const qnaAlterationsDocumentImporter: IJsonImporter = async (jsonString: string) => {
	return new Promise((resolve, reject) => {
		let qnaDocumentData: Object;

		try {
			qnaDocumentData = JSON.parse(jsonString);
		} catch {
			reject({
				code: ERROR_CODE.INVALID_JSON_FILE,
				data: jsonString,
				message: 'The provided JSON file is invalid.'
			});
		}

		try {
			resolve(alterationsDocumentImporter(qnaDocumentData));
		} catch {
			reject({
				code: ERROR_CODE.INVALID_QNA_ALTERATIONS_JSON_FILE,
				data: qnaDocumentData,
				message: 'Failed to parse the provided QnA alterations JSON file.'
			});
		}
	});
};
