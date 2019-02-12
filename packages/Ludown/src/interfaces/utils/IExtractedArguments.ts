/**
 * @description
 * Represnts the data extracted by an argument extractor from the
 * arguments passed by a node process to the program.
 */
export interface IExtractedArguments {
    command: string;

    args: string[];
}
