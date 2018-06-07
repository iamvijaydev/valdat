import { IData } from './interface/common';
import { IValidateObject } from './interface/IValidateObject';
import Validate from './Validate';
export default class ValidateObject extends Validate implements IValidateObject {
    constructor();
    private objectFatory;
    private shapeFactory;
    object(): ValidateObject;
    shape(shape: IData): ValidateObject;
}
