import { preCommandInit } from '../helpers/pre-command-init';

/**
 * @description
 * A factory to create a command executor. This allows flexibility to add
 * pre and post command actions across all commands easily.
 *
 * @param commandHandler The main command function that contains the command
 * logic to execute.
 */
export const commandExecuterFactory = (commandHandler: Function) => {
    return {
        execute: () => {
            preCommandInit();

            if (commandHandler) {
                commandHandler();
            }
        }
    };
};
