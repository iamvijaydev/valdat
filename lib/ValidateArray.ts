import isArray from 'lodash/isArray';

import {
    IData,
    IValidator
} from './interface/common';
import { IValidateArray } from './interface/IValidateArray'
import Validate from './Validate';

export default class ValidateArray extends Validate implements IValidateArray {
    constructor() {
        super();
    }

    private arrayFactory(): IValidator {
        const validator = (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (value === null) {
                if (this.required) {
                    error = true;
                    message = `${key} is required, but its value is undefined.`;
                }
            } else if (isArray(value)) {
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

            if (!value.length) {
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

    private ofFactory(type: Function): IValidator {
        const validator = (data: IData, key: string) => {
            const value = data[key];
            const match = value.some((item: any) => {
                const { error: err } = type({ check: item }, 'check');

                return !err;
            })
            const error = type(data, key)
            const message = error ? 'Failed to match' : '';

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

    of(type: Function): ValidateArray {
        this.stack.push(this.ofFactory(type));
        return this;
    }
}