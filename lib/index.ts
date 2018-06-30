import isFunction from 'lodash/isFunction';

import Validate, {
    IValidate,
    IData,
    IValidator
} from './Validate';
// import ValidateString, { IValidateString } from './ValidateString';
import ValidateNumber, { IValidateNumber } from './ValidateNumber';
import ValidateBoolean, { IValidateBoolean } from './ValidateBoolean';
import ValidateObject, { IValidateObject } from './ValidateObject';
import ValidateArray, { IValidateArray } from './ValidateArray';
import ValidateEnum, { IValidateEnum } from './ValidateEnum';

import validateString from './validateString'

export interface Ivaldat {
    check(schema: IData, data: IData): {
        isValid: boolean;
        errors: IData;
    };
    register(name: string, method: Function): Function;
    custom(validator: Function): {
        stack: Function[];
    };
    number(): IValidateNumber;
    boolean(): IValidateBoolean;
    object(): IValidateObject;
    array(): IValidateArray;
    oneOf(types: any[]): IValidateEnum;
    oneOfType(types: Function[]): IValidateEnum;
    [propName: string]: Function;
}

const valdat: Ivaldat = {
    check: (schema: IData = {}, data: IData = {}) => {
        let isValid = true;
        let errors: IData = {};

        Object.keys(schema)
            .forEach((key) => {
                const stack = schema[key].stack;
                for (let i = 0, j = stack.length; i < j; i++) {
                    const validatorFn = stack[i];
                    const {
                        error,
                        message
                    } = validatorFn(data, key);

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
    register: (name: string, method: Function) => {
        if (!name) {
            throw new Error('Register expects to be called with a name.');
        }
        if (!isFunction(method)) {
            throw new Error('Register expects the method to be function.')
        }

        valdat[name] = method;
        return valdat[name];
    },
    custom: (validator: Function) => {
        if (!isFunction(validator)) {
            throw new Error('Custom expects the validator to be function.')
        }

        return { stack: [validator] };
    },
    number: () => new ValidateNumber().number(),
    boolean: () => new ValidateBoolean().boolean(),
    object: () => new ValidateObject().object(),
    array: () => new ValidateArray().array(),
    oneOf: (types) => new ValidateEnum().oneOf(types),
    oneOfType: (types) => new ValidateEnum().oneOfType(types),
    ...validateString(),
};

export { Validate }
export { IValidate }
export { IValidator }
export { valdat as default };