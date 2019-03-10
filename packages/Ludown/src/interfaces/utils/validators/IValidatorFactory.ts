/**
 * @description
 * Represents a validator function.
 */
export interface IValidator {
	execute(programState): Promise<boolean>;
}

/**
 * @description
 * Represents a factory that creates a validator.
 */
export type IValidatorFactory = (factoryState) => IValidator;
