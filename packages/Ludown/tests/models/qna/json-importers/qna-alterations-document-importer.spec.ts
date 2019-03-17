import { ERROR_CODE } from '../../../../src/models/error-codes';
import { qnaAlterationsDocumentImporter } from '../../../../src/models/qna/json-importers/qna-alterations-document-importer';

describe('QnA alterations document JSON importer', () => {
	it('should resolve with Qna alterations document when correct JSON format is provided.', async () => {
		const sampleJsonFile = { wordAlterations: [{ alterations: ['qnamaker', 'qna maker'] }] };
		const qnaAlterationsDocument = await qnaAlterationsDocumentImporter(JSON.stringify(sampleJsonFile));

		expect(qnaAlterationsDocument).toEqual({
			wordAlterations: [{ alterations: ['qnamaker', 'qna maker'] }]
		});
	});

	it('should reject with invalid JSON error when invalid JSON is provided.', async () => {
		try {
			await qnaAlterationsDocumentImporter('SomeInvalidJSONText');
		} catch (err) {
			expect(err).toEqual({
				code: ERROR_CODE.INVALID_JSON_FILE,
				data: 'SomeInvalidJSONText',
				message: 'The provided JSON file is invalid.'
			});
		}
	});

	it('should reject with invalid QnA alterations document JSON format error when invalid document is provided.', async () => {
		const invalidQnaAlterationsDocument = { name: 'Omar', age: 27, trait: 'Awesome' };
		const invalidJSONString = JSON.stringify(invalidQnaAlterationsDocument);

		try {
			await qnaAlterationsDocumentImporter(invalidJSONString);
		} catch (err) {
			expect(err).toEqual({
				code: ERROR_CODE.INVALID_QNA_ALTERATIONS_JSON_FILE,
				data: invalidQnaAlterationsDocument,
				message: 'Failed to parse the provided QnA alterations JSON file.'
			});
		}
	});
});
