import { IValidate } from './IValidate';

export interface IValidateNumber extends IValidate {
    number(): IValidateNumber;
    min(min: number): IValidateNumber;
    max(max: number): IValidateNumber;
}