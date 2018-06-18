import Validate, { IValidate } from './Validate';
export interface IValidateBoolean extends IValidate {
    boolean(): IValidateBoolean;
}
export default class ValidateBoolean extends Validate implements IValidateBoolean {
    constructor();
    private booleanFatory;
    boolean(): ValidateBoolean;
}
