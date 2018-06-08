import isObject from 'lodash/isObject';

import Validate, {
    IValidate,
    IData,
    IValidator
} from './Validate';

export interface IValidateObject extends IValidate {
    object(): IValidateObject;
    shape(shape: IData): IValidateObject;
}

export default class ValidateObject extends Validate implements IValidateObject {
    constructor() {
        super();
    }

    private objectFatory(): IValidator {
        const validator = (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (value === null) {
                if (this.required) {
                    error = true;
                    message = `${key} is required, but its value is undefined.`;
                }
            } else if (isObject(value)) {
                error = true;
                message = `${key} should be an object, recieved ${typeof value}.`;
            }

            return {
                error,
                message,
            };
        };

        return validator;
    }

    private shapeFactory(shape: IData): IValidator {
        const validator = (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            const matchFailed = Object.keys(shape)
                .some((shapeKey) => {
                    const validatorFn = shape[shapeKey];
                    const {
                        error: err,
                    } = validatorFn(value, shapeKey);

                    return err;
                })

            if (matchFailed) {
                error = true;
                message = `The data object does not matche the schema shape`;
            }

            return {
                error,
                message,
            };
        };

        return validator;
    }

    object(): ValidateObject {
        this.stack.push(this.objectFatory());
        return this;
    }

    shape(shape: IData): ValidateObject {
        this.stack.push(this.shapeFactory(shape));
        return this;
    }
}