import { IExtractedArguments } from '../interfaces/utils/IExtractedArguments';

/**
 * @description
 * Extracts the command and arguments from the process command
 * line arguments.
 *
 * NodeJS application command line arguments get their arguments
 * as follows:
 *
 * {path} {bin} {arguments passed to the binFile}
 *
 * These are all concatenated to an array. So a command like this:
 *
 * ludown parse --in ./sample.lu
 *
 * Would be passed to the process as:
 *
 * ['path/to/node', 'ludown', 'parse', '--in', './sample.lu']
 *
 * We are only interested in parsing the string entries starting from
 * index 2 of the array of arguments.
 *
 * @param processArgs The raw command line arguments.
 * @returns An object containing the normalized command and arguments.
 */
export const extractArguments = (processArgs: string[]): IExtractedArguments => {
    const normalize = (data: string) => data ? data.trim().toLocaleLowerCase() : '';

    const command = normalize(processArgs[2]);

    const args = processArgs
        .slice(3)
        .map(normalize);

    return { command, args };
};
