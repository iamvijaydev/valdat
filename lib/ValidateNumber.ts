import isUndefined from 'lodash/isUndefined';
import isNumber from 'lodash/isNumber';

import Validate, {
    IValidate,
    IData,
    IValidator
} from './Validate';

export interface IValidateNumber extends IValidate {
    number(): IValidateNumber;
    min(min: number): IValidateNumber;
    max(max: number): IValidateNumber;
}

export default class ValidateNumber extends Validate implements IValidateNumber {
    constructor() {
        super();
    }

    private numberFatory(): IValidator {
        const validator = (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (isUndefined(value)) {
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
            if (!isNumber(min)) {
                throw new Error('Incorrect/no `min` value provided while declaring schema with `number().min`.');
            }

            const value = data[key];
            let error = false;
            let message = '';

            if (!isNumber(value)) {
                error = true;
                message = `${key} should be a number to compare with min`;
            } else if (value < min) {
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
            if (!isNumber(max)) {
                throw new Error('Incorrect/no `max` value provided while declaring schema with `number().max`.');
            }

            const value = data[key];
            let error = false;
            let message = '';

            if (!isNumber(value)) {
                error = true;
                message = `${key} should be a number to compare with max`;
            } else if (value > max) {
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