import Validate, { IValidate } from './Validate';
export interface IValidateArray extends IValidate {
    array(): IValidateArray;
    notEmpty(): IValidateArray;
    ofType(type: Function): IValidateArray;
}
export default class ValidateArray extends Validate implements IValidateArray {
    constructor();
    private arrayFactory;
    private notEmptyFactory;
    private ofTypeFactory;
    array(): ValidateArray;
    notEmpty(): ValidateArray;
    ofType(type: Function): ValidateArray;
}
