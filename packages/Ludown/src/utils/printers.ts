import chalk from 'chalk';
import { configs } from './configs';
import { logger } from './logger';

/**
 * @description
 * Writes the message given to the standard output.
 *
 * @param message The message to write.
 * @param color An optional color to write it with
 */
export const printInfo = (message: string, color?: string) => {
    const colorToUse = color || 'white';
    process.stdout.write(chalk[colorToUse](message));
};

/**
 * @description
 * Writes the message given to the standard output in green color.
 *
 * @param message The message to write.
 */
export const printSuccess = (message: string) => {
    process.stdout.write(chalk.greenBright(message));
};

/**
 * @description
 * Writes the message given to the standard output in red color.
 *
 * @param message The message to write.
 */
export const printError = (message: string) => {
    process.stderr.write(chalk.redBright(message));
};

/**
 * @description
 * Logs the message to a log file if debug mode is on.
 *
 * @param message The message to write.
 */
export const log = (message: string) => {
    if (configs.debug) {
        logger.buffer(message);
    }
};
