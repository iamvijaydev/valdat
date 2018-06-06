import isNumber from 'lodash/isNumber';

import {
    IData,
    IValidator
} from './interface/common';
import { IValidateNumber } from './interface/IValidateNumber';
import Validate from './Validate';

export default class ValidateNumber extends Validate implements IValidateNumber {
    constructor() {
        super();
    }

    private numberFatory(): IValidator {
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

    private minFatory(min: number): IValidator {
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

    private maxFatory(max: number): IValidator {
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