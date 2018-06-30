import isEqual from 'lodash/isEqual';
import isString from 'lodash/isString';

import { getErrorCodes } from '../errorCodes';

const {
    "SAME_AS/INCORRECT_ARG": incorrectArgMsg,
    "SAME_AS/MISMATCH": mismatchMsg
} = getErrorCodes();

/**
 * Interface for generic object with string key an any value.
 */
export interface IData {
    [propName: string]: any;
}

/**
 * Interface for error object returned by a validator function.
 */
export interface IError {
    /**
     * Indicating if error exists.
     */
    error: boolean;

    /**
     * Indicating the error message.
     * It should be empty when error is false
     */
    message: string;
}

/**
 * Interface for the validator function
 */
export interface IValidator {
    /**
     * @param data The whole data object passed along with schema
     * @param key Key in the data object to checked
     * @returns The error object IError
     */
    (data: IData, key: string): IError;
}

/**
 * Interface for state object
 */
export interface IState {
    /**
     * If the value of the key should not be undefined.
     */
    required: boolean;

    /**
     * An arrary of validator functions.
     */
    stack: Function[];

    /**
     * Additional assertion methods that will loaded later
     */
    [propName: string]: any;
}

/**
 * Generate an initial empty internal state of validation
 */
export const getInitialState = (): IState => ({
    required: false,
    stack: []
});

/**
 * Factory that returns the isRequired method
 * @param {object} state The internal state of the validation
 * @returns {function} isRequired method
 */
export const createIsRequired = (state: IState) => ({
    isRequired: () => {
        state.required = true;
        return state;
    }
});

/**
 * Factory that returns the sameAs method
 * @param {object} state The internal state of the validation
 * @returns {function} sameAs method
 */
export const createSameAs = (state: IState) => ({

    /**
     * @param {string} otherKey The other key in the data object with which the current value should match
     */
    sameAs: (otherKey: string): IState => {
        const validator: IValidator = (data: IData, key: string) => {
            if (!isString(otherKey)) {
                throw new Error(incorrectArgMsg);
            }

            const value = data[key];
            const otherValue = data[otherKey];
            let error = false;
            let message = '';

            if (!isEqual(value, otherValue)) {
                error = true;
                message = mismatchMsg(key, otherKey)
            }

            return {
                error,
                message,
            };
        };

        state.stack.push(validator);
        return state;
    }
});