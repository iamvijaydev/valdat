import isUndefined from 'lodash/isUndefined';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isFunction';

import {
    checkFast,
    isValidateInst
} from './utils';
import Validate, {
    IValidate,
    IData,
    IValidator
} from './Validate';

export interface IValidateArray extends IValidate {
    array(): IValidateArray;
    notEmpty(): IValidateArray;
    ofType(type: object): IValidateArray;
}

export default class ValidateArray extends Validate implements IValidateArray {
    constructor() {
        super();
    }

    private arrayFactory(): IValidator {
        const validator = (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (isUndefined(value)) {
                if (this.required) {
                    error = true;
                    message = `${key} is required, but its value is undefined.`;
                }
            } else if (!isArray(value)) {
                error = true;
                message = `${key} should be an array, recieved ${typeof value}.`;
            }

            return {
                error,
                message,
            };
        };

        return validator;
    }

    private notEmptyFactory(): IValidator {
        const validator = (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (!isArray(value)) {
                error = true;
                message = `${key} should be an array, recieved ${typeof value}.`;
            } else if (!value.length) {
                error = true;
                message = `${key} cannot be an empty array.`;
            }

            return {
                error,
                message,
            };
        };

        return validator;
    }

    private ofTypeFactory(type: any): IValidator {
        if (!isValidateInst(type)) {
            throw new Error('Incorrect/no `type` value provided while declaring schema with `array().ofType`.');
        }

        const validator = (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (!isArray(value)) {
                error = true;
                message = `${key} should be an array, recieved ${typeof value}.`;
            } else {
                let index = 0;
                const incorrectType = value.some((item: any, i: number) => {
                    const schema = {
                        [key]: type
                    };
                    const testData = {
                        [key]: item
                    }
                    const { isValid } = checkFast(schema, testData);

                    if (!isValid) {
                        index = i;
                    }

                    return !isValid;
                });

                if (incorrectType) {
                    error = true;
                    message = `Array item at index ${index} failed to match the expected type`;
                }
            }

            return {
                error,
                message,
            };
        };

        return validator;
    }

    array(): ValidateArray {
        this.stack.push(this.arrayFactory());
        return this;
    }

    notEmpty(): ValidateArray {
        this.stack.push(this.notEmptyFactory());
        return this;
    }

    ofType(type: object): ValidateArray {
        this.stack.push(this.ofTypeFactory(type));
        return this;
    }
}