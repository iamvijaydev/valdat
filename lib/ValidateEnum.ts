import isUndefined from 'lodash/isUndefined';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';

import Validate, {
    IValidate,
    IData,
    IValidator
} from './Validate';

export interface IValidateEnum extends IValidate {
    oneOf(types: any[]): IValidateEnum;
    oneOfType(types: Function[]): IValidateEnum;
}

export default class ValidateEnum extends Validate implements IValidateEnum {
    constructor() {
        super();
    }

    private oneOfFactory(types: any[]): IValidator {
        const validator = (data: IData, key: string) => {
            if (!isArray(types)) {
                throw new Error('Incorrect/no `types` value provided while declaring schema with `oneOf`.');
            } else if (types.length) {
                throw new Error('Empty array `types` is not allowed while declaring schema with `oneOf`.');
            }

            const value = data[key];
            let error = false;
            let message = '';

            if (isUndefined(value)) {
                if (this.required) {
                    error = true;
                    message = `${key} is required, but its value is undefined.`;
                }
            } else if (!types.includes(value)) {
                error = true;
                message = `The current value ${key}: ${value}, is not not allowed`;
            }

            return {
                error,
                message,
            };
        };

        return validator;
    }

    private oneOfTypeFactory(types: Function[]): IValidator {
        const validator =  (data: IData, key: string) => {
            if (!isArray(types)) {
                throw new Error('Incorrect/no `types` value provided while declaring schema with `oneOfType`.');
            } else if (types.length) {
                throw new Error('Empty array `types` is not allowed while declaring schema with `oneOfType`.');
            }

            const value = data[key];
            let error = false;
            let message = '';

            if (isUndefined(value)) {
                if (this.required) {
                    error = true;
                    message = `${key} is required, but its value is undefined.`;
                }
            } else {
                const match = types.some((validatorFn, index) => {
                    if (!isFunction(validatorFn)) {
                        throw new Error(`Incorrect \`validatorFn\` found at ${index} of \`types\` in schema with \`oneOfType\`.`);
                    }

                    const { error: err } = validatorFn(data, key);

                    return !err;
                });

                error = !match;
                message = error ? `The current value ${key} is not not allowed` : '';
            }

            return {
                error,
                message,
            };
        };

        return validator;
    }

    oneOf(types: any[]): IValidateEnum {
        this.stack.push(this.oneOfFactory(types));
        return this;
    }

    oneOfType(types: Function[]): IValidateEnum {
        this.stack.push(this.oneOfTypeFactory(types));
        return this;
    }
}