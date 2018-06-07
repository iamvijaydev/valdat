import { IValidate } from './IValidate';
export interface IValidateArray extends IValidate {
    array(): IValidateArray;
    notEmpty(): IValidateArray;
    ofType(type: Function): IValidateArray;
}
