import Validate, { IValidate, IData } from './Validate';
export interface IValidateObject extends IValidate {
    object(): IValidateObject;
    shape(shape: IData): IValidateObject;
}
export default class ValidateObject extends Validate implements IValidateObject {
    constructor();
    private objectFatory;
    private shapeFactory;
    object(): ValidateObject;
    shape(shape: IData): ValidateObject;
}
