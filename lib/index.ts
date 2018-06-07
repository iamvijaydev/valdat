import isFunction from 'lodash/isFunction';

import { IData } from './interface/common';
import { IValdat } from './interface/IValdat';
import ValidateString from './ValidateString';
import ValidateNumber from './ValidateNumber';
import ValidateObject from './ValidateObject';
import ValidateArray from './ValidateArray';
import ValidateEnum from './ValidateEnum';

const Valdat: IValdat = {
    check: (schema = {}, data = {}) => {
        let isValid = true;
        let errors: IData = {};

        Object.keys(schema)
            .forEach((key) => {
                const stack = schema[key].stack;
                for (let i = 0, j = stack.length; i < j; i++) {
                    const test = stack[i];
                    const {
                        error,
                        message
                    } = test(data, key);

                    if (error) {
                        isValid = false;
                        errors[key] = message
                        break;
                    }
                }
            });

        return {
            isValid,
            errors
        }
    },
    register: (name, method) => {
        if (!name) {
            throw new Error('Register expects to be called with a name.');
        }
        if (!isFunction(method)) {
            throw new Error('Register expects the method to be function.')
        }

        Valdat[name] = method;
        return Valdat[name];
    },
    custom: (validator) => {
        if (!isFunction(validator)) {
            throw new Error('Custom expects the validator to be function.')
        }

        return { stack: [validator] };
    },
    string: new ValidateString().string,
    number: new ValidateNumber().number,
    object: new ValidateObject().object,
    array: new ValidateArray().array,
    enum: new ValidateEnum().enum,
};

export { Valdat as default };