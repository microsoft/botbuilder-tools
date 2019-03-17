/**
 * @description
 * Represents any JSON importer that the tool will use.
 */
export type IJsonImporter = (jsonString: string) => Promise<Object>;
