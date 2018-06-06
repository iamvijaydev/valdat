import { IValidate } from './IValidate';

export interface IValidateEnum extends IValidate {
    enum(): IValidateEnum;
    oneOf(types: any[]): IValidateEnum;
    oneOfType(types: Function[]): IValidateEnum;
}