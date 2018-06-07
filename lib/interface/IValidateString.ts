import { IValidate } from './IValidate';

export interface IValidateString extends IValidate {
    string(): IValidateString;
    hasLen(length: number): IValidateString;
    matchRegex(regex: RegExp): IValidateString;
}