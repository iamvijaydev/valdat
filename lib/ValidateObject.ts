import isUndefined from 'lodash/isUndefined';
import isObject from 'lodash/isObject';

import { checkFast } from './utils';
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

            if (isUndefined(value)) {
                if (this.required) {
                    error = true;
                    message = `${key} is required, but its value is undefined.`;
                }
            } else if (!isObject(value)) {
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
            if (!isObject(shape)) {
                throw new Error('Incorrect/no `shape` value provided while declaring schema with `object().shape`.');
            }

            const value = data[key];
            let error = false;
            let message = '';
            const { isValid } = checkFast(shape, value);

            if (!isValid) {
                error = true;
                message = `The data object does not match the schema shape`;
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