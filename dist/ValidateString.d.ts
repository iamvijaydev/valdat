import { IValidateString } from './interface/IValidateString';
import Validate from './Validate';
export default class ValidateString extends Validate implements IValidateString {
    constructor();
    private stringFatory;
    private hasLenFatory;
    private regexFactory;
    string(): ValidateString;
    hasLen(length: number): ValidateString;
    matchRegex(regex: RegExp): ValidateString;
}
