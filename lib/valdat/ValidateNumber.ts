import isNumber from 'lodash/isNumber';

import Validate, { IData } from './Validate';
import ValidateObject from './ValidateObject';

export default class ValidateNumber extends Validate {
    constructor() {
        super();
    }

    private numberFatory() {
        const validator = (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (value === null) {
                if (this.required) {
                    error = true;
                    message = `${key} is required, but its value is undefined.`;
                }
            } else if (isNumber(value)) {
                error = true;
                message = `${key} should be number, recieved ${typeof value}.`;
            }

            return {
                error,
                message,
            };
        };

        return validator;
    }

    private minFatory(min: number) {
        const validator = (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (value < min) {
                error = true;
                message = `${key} should be greater than or equal to ${min}.`;
            }

            return {
                error,
                message,
            };
        };

        return validator;
    }

    private maxFatory(max: number) {
        const validator = (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (value > max) {
                error = true;
                message = `${key} should be less than or equal to ${max}.`;
            }

            return {
                error,
                message,
            };
        };

        return validator;
    }

    number(): ValidateNumber {
        this.stack.push(this.numberFatory());
        return this;
    }

    min(min: number): ValidateNumber {
        this.stack.push(this.minFatory(min));
        return this;
    }

    max(max: number): ValidateNumber {
        this.stack.push(this.maxFatory(max));
        return this;
    }
}