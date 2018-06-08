import isUndefined from 'lodash/isUndefined';
import isBoolean from 'lodash/isBoolean';

import Validate, {
    IValidate,
    IData,
    IValidator
} from './Validate';

export interface IValidateBoolean extends IValidate {
    boolean(): IValidateBoolean;
}

export default class ValidateBoolean extends Validate implements IValidateBoolean {
    constructor() {
        super();
    }

    private booleanFatory(): IValidator {
        const validator = (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (isUndefined(value)) {
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