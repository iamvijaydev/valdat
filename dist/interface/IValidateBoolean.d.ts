import { IValidate } from './IValidate';
export interface IValidateBoolean extends IValidate {
    boolean(): IValidateBoolean;
}
