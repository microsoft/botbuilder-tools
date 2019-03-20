import { Command } from 'commander';
import * as path from 'path';
import { fileReaderFactory } from '../helpers/input-readers/file-reader';
import { stdinReaderFactory } from '../helpers/input-readers/stdin-reader';
import { markdownWriterFactory } from '../helpers/markdown-writer';
import { fileWriterFactory } from '../helpers/output-writers/file-writer';
import { stdoutWriterFactory } from '../helpers/output-writers/stdout-writer';
import { IMarkdownWriter } from '../interfaces/helpers/IMarkdownWriter';
import { ITypedFile } from '../interfaces/helpers/ITypedFile';
import { IQnaAlterationsDocument } from '../interfaces/qna/alterations/IQnaAlterationsDocument';
import { IQnaKnowledgeBase } from '../interfaces/qna/knowledge-bases/IKnowledgeBase';
import { ERROR_CODE } from '../models/error-codes';
import { FILE_TYPE } from '../models/file-types';
import { luisJsonImporter } from '../models/luis/json-importers/luis-json-importer';
import { luisAppRenderer } from '../models/luis/to-lu-renderers/app-renderer';
import { qnaAlterationsDocumentImporter } from '../models/qna/json-importers/qna-alterations-document-importer';
import { qnaKnowledgeBaseImporter } from '../models/qna/json-importers/qna-knowledge-base-importer';
import { qnaAlterationsDocumentRenderer } from '../models/qna/to-lu-renderers/alterations-document-renderer';
import { qnaKnowledgeBaseRenderer } from '../models/qna/to-lu-renderers/knowledge-base-renderer';

/**
 * @description
 * Executes the refresh command by following these steps:
 *
 * - Reads in the files to process.
 * - Converts each file to its corresponding data structure.
 * - Creates a markdown file writer instance to write the data.
 * - Outputs the file in the given path with the given name.
 *
 * @param refreshCommand The command that was executed by the user.
 */
export const execute = async (refreshCommand: Command) => {
	const writer = markdownWriterFactory();

	const files = await readFiles(refreshCommand);

	for (const file of files) {
		await processFile(file, writer);
	}

	await writeFiles(refreshCommand, files, writer);
};

/**
 * @description
 * Reads the files to process according to the provided inputs.
 *
 * @param refreshCommand The command that was executed.
 * @returns An array of file data with their names and types.
 */
async function readFiles(refreshCommand: Command): Promise<ITypedFile[]> {
	const files: ITypedFile[] = [];

	if (refreshCommand['lu_file']) {
		const luFiles = (await fileReaderFactory().read(refreshCommand['lu_file'])).map(file => ({ ...file, fileType: FILE_TYPE.LUIS }));
		files.push(...luFiles);
	}

	if (refreshCommand['qna_file']) {
		const qnaFiles = (await fileReaderFactory().read(refreshCommand['qna_file'])).map(file => ({ ...file, fileType: FILE_TYPE.QNA }));
		files.push(...qnaFiles);
	}

	if (refreshCommand['qna_alteration_file']) {
		const qnaAlterationFiles = (await fileReaderFactory().read(refreshCommand['qna_alteration_file'])).map(file => ({
			...file,
			fileType: FILE_TYPE.QNA_ALTERATIONS
		}));
		files.push(...qnaAlterationFiles);
	}

	if (refreshCommand['stdin']) {
		const stdinFiles = (await stdinReaderFactory().read()).map(file => ({ ...file, fileType: undefined }));
		files.push(...stdinFiles);
	}

	return files;
}

/**
 * @description
 * Processes the file given by rendering it to LU format.
 *
 * @param file The file to render.
 * @param writer The writer used to write the markdown file.
 */
async function processFile(file: ITypedFile, writer: IMarkdownWriter): Promise<void> {
	const jsonContent = file.content;

	switch (file.fileType) {
		case FILE_TYPE.LUIS:
			const luisApp = await luisJsonImporter(jsonContent);
			luisAppRenderer(luisApp, writer);
			break;
		case FILE_TYPE.QNA:
			const qnaKnowledgeBase = await qnaKnowledgeBaseImporter(jsonContent);
			qnaKnowledgeBaseRenderer(<IQnaKnowledgeBase>qnaKnowledgeBase, writer);
			break;
		case FILE_TYPE.QNA_ALTERATIONS:
			const qnaAlterationsDocument = await qnaAlterationsDocumentImporter(jsonContent);
			qnaAlterationsDocumentRenderer(<IQnaAlterationsDocument>qnaAlterationsDocument, writer);
			break;
		default:
			await processStdin(jsonContent, writer);
	}
}

/**
 * @description
 * Handles the input when it is of stdin type.
 *
 * @param jsonContent The (alleged) json content to process.
 * @param writer The writer used to writer the markdown file.
 */
async function processStdin(jsonContent: string, writer: IMarkdownWriter): Promise<void> {
	const importers = [luisJsonImporter, qnaKnowledgeBaseImporter, qnaAlterationsDocumentImporter];
	const renderers = [luisAppRenderer, qnaKnowledgeBaseRenderer, qnaAlterationsDocumentRenderer];

	for (const i of importers.keys()) {
		try {
			const importedData: any = await importers[i](jsonContent);
			renderers[i](importedData, writer);

			return;
		} catch {
			continue;
		}
	}

	// If the content was not handled by any of the importers, it is invalid.
	throw {
		code: ERROR_CODE.INVALID_STDIN,
		data: jsonContent,
		message: 'Could not parse stdin into valid data.'
	};
}

/**
 * @description
 * Wrtites the markdown writer content into a file in a directory based on the options
 * specified in the refresh command.
 *
 * @param refreshCommand The command that was executed.
 * @param files The files that were read.
 * @param writer The writer that was used to store the markdown data.
 */
async function writeFiles(refreshCommand: Command, files: ITypedFile[], writer: IMarkdownWriter): Promise<void> {
	if (refreshCommand['stdout']) {
		await stdoutWriterFactory().write(writer.render());

		return;
	}

	let directoryPath: string;
	let fileName: string;

	if (refreshCommand['out_folder']) {
		directoryPath = path.resolve(refreshCommand['out_folder']);
	} else {
		directoryPath = process.cwd();
	}

	if (refreshCommand['lu_file']) {
		fileName = `${refreshCommand['lu_file']}${path.extname(refreshCommand['lu_file']) === '' ? '.lu' : ''}`;
	} else {
		fileName = files
			.map(file => file.name)
			.map(name => path.basename(name, path.extname(name)))
			.reduce((finalName, name) => finalName.concat(name), '');
	}

	await fileWriterFactory(directoryPath, fileName).write(writer.render());
}
