import isUndefined from 'lodash/isUndefined';
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
            const value = data[key];
            let error = false;
            let message = '';

            if (isUndefined(value)) {
                if (this.required) {
                    error = true;
                    message = `${key} is required, but its value is undefined.`;
                }
            } else {
                const match = types.some((validatorFn) => {
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