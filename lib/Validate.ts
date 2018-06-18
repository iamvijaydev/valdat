import isEqual from 'lodash/isEqual';
import isString from 'lodash/isString';

/**
 * Interface for generic object with string key an any value.
 */
export interface IData {
    [propName: string]: any
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
 * Interface for Validate class
 */
export interface IValidate {
    /**
     * Checks if the value is same as that of the provided key.
     * @returns "this" for currying.
     */
    sameAs(key: string): IValidate;

    /**
     * Set "required" to true, indicating that the value to be validated should exist.
     * @returns "this" for currying.
     */
    isRequired(): IValidate;
}

/**
 * Base class for validation
 */
export default class Validate implements IValidate {

    /**
     * Array of validators functions pushed to test the value.
     */
    protected stack: Function[];
    
    /**
     * The flag which indicate if the value to be validated should exist.
     * If set true then the value cannot be undefined.
     */
    protected required: boolean;

    constructor() {
        this.required = false;
        this.stack = [];
    }

    private sameAsFatory(otherKey: string): IValidator {
        const validator = (data: IData, key: string) => {
            if (!isString(length)) {
                throw new Error('Incorrect/no `key` provided while declaring schema with `.sameAs`.');
            }

            const value = data[key];
            const otherValue = data[otherKey];
            let error = false;
            let message = '';

            if (!isEqual(value, otherValue)) {
                if (this.required) {
                    error = true;
                    message = `The value of ${key} should be same as ${otherKey}`;
                }
            }

            return {
                error,
                message,
            };
        };

        return validator;
    }

    /**
     * @inheritdoc
     */
    sameAs(key : string): IValidate {
        this.stack.push(this.sameAsFatory(key));
        return this;
    }

    /**
     * @inheritdoc
     */
    isRequired(): IValidate {
        this.required = true;
        return this;
    }
}