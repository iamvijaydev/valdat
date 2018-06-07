import { IValidate } from './IValidate';
export interface IValidateEnum extends IValidate {
    oneOf(types: any[]): IValidateEnum;
    oneOfType(types: Function[]): IValidateEnum;
}
