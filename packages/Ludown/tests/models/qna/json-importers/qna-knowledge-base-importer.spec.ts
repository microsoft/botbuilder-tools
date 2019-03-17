import { ERROR_CODE } from '../../../../src/models/error-codes';
import { qnaKnowledgeBaseImporter } from '../../../../src/models/qna/json-importers/qna-knowledge-base-importer';

describe('QnA Knowledge base JSON importer', () => {
	it('should resolve with Qna knowledge base when correct JSON format is provided.', async () => {
		const sampleJsonFile = {
			qnaDocuments: [{ answer: 'Sample answer', source: 'Sample source', questions: ['Sample question?'], metadata: [] }]
		};
		const qnaKnowledgeBase = await qnaKnowledgeBaseImporter(JSON.stringify(sampleJsonFile));

		expect(qnaKnowledgeBase).toEqual({
			items: [{ source: 'Sample source', answer: 'Sample answer', questions: ['Sample question?'], filters: [] }]
		});
	});

	it('should reject with invalid JSON error when invalid JSON is provided.', async () => {
		try {
			await qnaKnowledgeBaseImporter('SomeInvalidJSONText');
		} catch (err) {
			expect(err).toEqual({
				code: ERROR_CODE.INVALID_JSON_FILE,
				data: 'SomeInvalidJSONText',
				message: 'The provided JSON file is invalid.'
			});
		}
	});

	it('should reject with invalid QnA knowledge base JSON format error when invalid QnA knowledge base is provided.', async () => {
		const invalidQnaKnowledgeBase = { name: 'Omar', age: 27, trait: 'Awesome' };
		const invalidJSONString = JSON.stringify(invalidQnaKnowledgeBase);

		try {
			await qnaKnowledgeBaseImporter(invalidJSONString);
		} catch (err) {
			expect(err).toEqual({
				code: ERROR_CODE.INVALID_QNA_KNOWLEDGE_BASE_JSON_FILE,
				data: invalidQnaKnowledgeBase,
				message: 'Failed to parse the provided QnA knowledge base JSON file.'
			});
		}
	});
});
