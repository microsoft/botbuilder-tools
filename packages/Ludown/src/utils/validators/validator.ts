export const Validator = {
    validators: [],
    add: (validator) => this.validators.push(validator),
    execute: () => Promise.all(this.validators)
}
