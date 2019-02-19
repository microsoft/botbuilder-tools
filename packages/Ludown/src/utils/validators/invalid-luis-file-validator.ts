import { IApp } from '../../interfaces/luis/apps/IApp';
import { IValidatorFactory } from '../../interfaces/utils/validators/IValidatorFactory';
import { ERROR_CODE } from '../../models/error-codes';
import { appImporter } from '../../models/luis/json-importers/apps/app-importer';

/**
 * @description
 * Checks if the file is a valid LUIS JSON file.
 *
 * @returns Promise of true on resolve and an IValidatorErrorObject on rejection.
 */
export const invalidLuisFileValidatorFactory: IValidatorFactory = () => {
    return {
        execute: (jsonString: string) => {
            return new Promise((resolve, reject) => {
                let luisFileData: Object;

                try {
                    luisFileData = JSON.parse(jsonString);
                }
                catch
                {
                    reject({ code: ERROR_CODE.INVALID_JSON_FILE, data: jsonString, message: 'The provided JSON file is invalid.' });
                }

                try {
                    appImporter(luisFileData);
                    resolve(true);
                }
                catch
                {
                    reject({
                        code: ERROR_CODE.INVALID_LUIS_JSON_FILE,
                        data: luisFileData,
                        message: 'Failed to parse the provided LUIS JSON file.'
                    });
                }
            });
        }
    };
};
