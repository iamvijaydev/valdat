import Validate, { IValidate } from './Validate';
export interface IValidateNumber extends IValidate {
    number(): IValidateNumber;
    min(min: number): IValidateNumber;
    max(max: number): IValidateNumber;
}
export default class ValidateNumber extends Validate implements IValidateNumber {
    constructor();
    private numberFatory;
    private minFatory;
    private maxFatory;
    number(): ValidateNumber;
    min(min: number): ValidateNumber;
    max(max: number): ValidateNumber;
}
