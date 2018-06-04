import isObject from 'lodash/isObject';

import Validate, { IData } from './Validate';

export default class ValidateObject extends Validate {
    constructor() {
        super();
    }

    objectFatory() {
        return (data: IData, key: string) => {
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
            }
        }
    }

    keysFactory(shape: IData) {
        return (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            const matchFailed = Object.keys(shape)
                .some((shapeKey) => {
                    const shapeFn = shape[shapeKey];
                    const {
                        error: err,
                    } = shapeFn(value, shapeKey);

                    return err;
                })

            if (matchFailed) {
                error = true;
                message = `The data object does not matche the schema shape`;
            }

            return {
                error,
                message,
            }
        }
    }

    object(): ValidateObject {
        this.stack.push(this.objectFatory());
        return this;
    }

    key(shape: IData): ValidateObject {
        this.stack.push(this.keysFactory(shape));
        return this;
    }
}