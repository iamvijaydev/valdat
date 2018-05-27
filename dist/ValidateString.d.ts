import Validate, { IData } from './Validate';
export default class ValidateString extends Validate {
    constructor();
    stringFatory(): (data: IData, key: string) => {
        error: boolean;
        message: string;
    };
    hasLenFatory(length: number): (data: IData, key: string) => {
        error: boolean;
        message: string;
    };
    regexFactory(regex: RegExp): (data: IData, key: string) => {
        error: boolean;
        message: string;
    };
    string(): ValidateString;
    hasLen(length: number): ValidateString;
    matchRegex(regex: RegExp): ValidateString;
}
