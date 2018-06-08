import Validate, { IValidate } from './Validate';
export interface IValidateString extends IValidate {
    string(): IValidateString;
    hasLen(length: number): IValidateString;
    matchRegex(regex: RegExp): IValidateString;
}
export default class ValidateString extends Validate implements IValidateString {
    constructor();
    private stringFatory;
    private hasLenFatory;
    private regexFactory;
    string(): ValidateString;
    hasLen(length: number): ValidateString;
    matchRegex(regex: RegExp): ValidateString;
}
