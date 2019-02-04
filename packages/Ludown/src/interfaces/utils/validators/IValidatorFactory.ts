export type IValidatorFactory = (factoryState) => {
    execute: (programState) => Promise<boolean>;
}
