import isBoolean from 'lodash/isBoolean';

import {
    IData,
    IValidator
} from './interface/common';
import { IValidateBoolean } from './interface/IValidateBoolean';
import Validate from './Validate';

export default class ValidateBoolean extends Validate implements IValidateBoolean {
    constructor() {
        super();
    }

    private booleanFatory(): IValidator {
        const validator = (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (value === null) {
                if (this.required) {
                    error = true;
                    message = `${key} is required, but its value is undefined.`;
                }
            } else if (!isBoolean(value)) {
                error = true;
                message = `${key} should be boolean, recieved ${typeof value}.`;
            }

            return {
                error,
                message,
            };
        };

        return validator;
    }

    boolean(): ValidateBoolean {
        this.stack.push(this.booleanFatory());
        return this;
    }
}