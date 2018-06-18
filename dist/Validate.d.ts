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
    constructor();
    private sameAsFatory;
    /**
     * @inheritdoc
     */
    sameAs(key: string): IValidate;
    /**
     * @inheritdoc
     */
    isRequired(): IValidate;
}
