import { IJsonImporter } from '../../../interfaces/helpers/IJsonImporter';
import { ERROR_CODE } from '../../../models/error-codes';
import { knowledgeBaseImporter } from './knowledge-bases/knowledge-base-importer';

/**
 * @description
 * Represents a JSON importer for a QNA knowledge base.
 */
export const qnaKnowledgeBaseImporter: IJsonImporter = async (jsonString: string) => {
	return new Promise((resolve, reject) => {
		let qnaFileData: Object;

		try {
			qnaFileData = JSON.parse(jsonString);
		} catch {
			reject({
				code: ERROR_CODE.INVALID_JSON_FILE,
				data: jsonString,
				message: 'The provided JSON file is invalid.'
			});
		}

		try {
			resolve(knowledgeBaseImporter(qnaFileData));
		} catch {
			reject({
				code: ERROR_CODE.INVALID_QNA_KNOWLEDGE_BASE_JSON_FILE,
				data: qnaFileData,
				message: 'Failed to parse the provided QnA knowledge base JSON file.'
			});
		}
	});
};
