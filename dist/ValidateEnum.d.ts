import Validate, { IValidate } from './Validate';
export interface IValidateEnum extends IValidate {
    oneOf(types: any[]): IValidateEnum;
    oneOfType(types: Function[]): IValidateEnum;
}
export default class ValidateEnum extends Validate implements IValidateEnum {
    constructor();
    private oneOfFactory;
    private oneOfTypeFactory;
    oneOf(types: any[]): IValidateEnum;
    oneOfType(types: Function[]): IValidateEnum;
}
