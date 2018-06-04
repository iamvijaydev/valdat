import isFunction from 'lodash/isFunction';

import { IData } from './Validate';

const Valdat: IData = {};

Valdat.check = (schema: IData = {}, data: IData = {}) => {
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
}

Valdat.register = (name: string, method: Function) => {
    if (!name) {
        throw new Error('Register expects to be called with a name.');
    }
    if (!isFunction(method)) {
        throw new Error('Register expects the method to be function.')
    }

    Valdat[name] = method;
}

Valdat.custom = (validator: Function) => {
    if (!isFunction(validator)) {
        throw new Error('Custom expects the validator to be function.')
    }

    return { stack: [validator] };
}

export { Valdat as default };