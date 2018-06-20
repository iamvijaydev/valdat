import isBoolean from 'lodash/isBoolean';
import isArray from 'lodash/isArray';

import { IData } from './Validate';

export const checkFast = (schema: IData = {}, data: IData = {}) => {
    let isValid = true;
    let errors: IData = {};
    const schemaAry = Object.keys(schema);

    for (let i = 0, j = schemaAry.length; i < j; i++) {
        const key = schemaAry[i];
        const stack = schema[key].stack;

        for (let k = 0, l = stack.length; k < l; k++) {
            const validatorFn = stack[k];
            const { error } = validatorFn(data, key);

            if (error) {
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            break;
        }
    }

    return {
        isValid,
        errors
    }
};

export const isValidateInst = (object: any) => {
    const {
        required,
        stack
    } = object;

    return isBoolean(required) && isArray(stack) && stack.length;
}