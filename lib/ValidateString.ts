import isUndefined from 'lodash/isUndefined';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isRegExp from 'lodash/isRegExp';

import Validate, {
    IValidate,
    IData,
    IValidator
} from './Validate';

export interface IValidateString extends IValidate {
    string(): IValidateString;
    hasLen(length: number): IValidateString;
    matchRegex(regex: RegExp): IValidateString;
}

export default class ValidateString extends Validate implements IValidateString {
    constructor() {
        super();
    }

    private stringFatory(): IValidator {
        const validator = (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (isUndefined(value)) {
                if (this.required) {
                    error = true;
                    message = `${key} is required, but its value is undefined.`;
                }
            } else if (!isString(value)) {
                error = true;
                message = `${key} should be string, recieved ${typeof value}.`;
            }

            return {
                error,
                message,
            };
        };

        return validator;
    }

    private hasLenFatory(length: number): IValidator {
        const validator = (data: IData, key: string) => {
            if (!isNumber(length)) {
                throw new Error('No length provided while declaring schema with hasLen.');
            }

            const value = data[key];
            let error = false;
            let message = '';

            if (!isString(value)) {
                error = true;
                message = `${key} should be a string to check it's length`;
            } else if (value.length !== length) {
                error = true;
                message = `${key} should be of length ${length}.`;
            }

            return {
                error,
                message,
            };
        };

        return validator;
    }

    private matchRegexFactory(regex: RegExp): IValidator {
        const validator = (data: IData, key: string) => {
            if (!isRegExp(regex)) {
                throw new Error('No regex provided while declaring schema with matchRegex.');
            }

            const value = data[key];
            let error = false;
            let message = '';

            if (!isString(value)) {
                error = true;
                message = `${key} should be a string to match regex.`;
            } else if (!regex.test(value)) {
                error = true;
                message = `${key} does not match the regex ${regex}.`;
            }

            return {
                error,
                message,
            };
        };

        return validator;
    }

    string(): ValidateString {
        this.stack.push(this.stringFatory());
        return this;
    }

    hasLen(length: number): ValidateString {
        this.stack.push(this.hasLenFatory(length));
        return this;
    }

    matchRegex(regex: RegExp): ValidateString {
        this.stack.push(this.matchRegexFactory(regex));
        return this;
    }
}